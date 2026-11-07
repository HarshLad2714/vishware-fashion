import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { products } from "../src/data/products.js";

const productIds = new Set(products.map((product) => product.id));

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function clean(value, max) {
  return String(value ?? "")
    .replace(/[\u0000-\u001F]/g, "")
    .trim()
    .slice(0, max);
}

function secrets() {
  return {
    email: (process.env.ADMIN_EMAIL || "").trim().toLowerCase(),
    password: process.env.ADMIN_PASSWORD || "",
    pin: (process.env.ADMIN_PIN || "").trim(),
  };
}

function configured() {
  const current = secrets();
  return Boolean(current.email && current.password && current.pin);
}

function same(given, expected) {
  const left = Buffer.from(String(given));
  const right = Buffer.from(String(expected));
  if (!expected || left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

function adminToken() {
  const current = secrets();
  return createHmac("sha256", current.password).update(`vishwear-admin-v2:${current.email}:${current.pin}`).digest("base64url");
}

function isAdmin(request) {
  const header = request.headers.get("authorization") || "";
  const token = header.replace(/^Bearer\s+/i, "");
  const expected = adminToken();
  if (!configured() || !token || token.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(token), Buffer.from(expected));
}

function emptyDb() {
  return { orders: [], reviews: [] };
}

const writeQueues = new WeakMap();

async function update(db, mutator) {
  const previous = writeQueues.get(db) || Promise.resolve();
  const run = previous.then(async () => {
    const current = (await db.read()) || emptyDb();
    const draft = {
      orders: Array.isArray(current.orders) ? current.orders : [],
      reviews: Array.isArray(current.reviews) ? current.reviews : [],
    };
    const next = (await mutator(draft)) || draft;
    await db.write(next);
    return next;
  });
  writeQueues.set(
    db,
    run.then(
      () => {},
      () => {}
    )
  );
  return run;
}

function kolkataYmd(date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function weekStart(ymd) {
  const [year, month, day] = ymd.split("-").map(Number);
  const utc = new Date(Date.UTC(year, month - 1, day));
  const dow = utc.getUTCDay();
  utc.setUTCDate(utc.getUTCDate() - (dow === 0 ? 6 : dow - 1));
  return utc.toISOString().slice(0, 10);
}

function addDays(ymd, days) {
  const [year, month, day] = ymd.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day + days)).toISOString().slice(0, 10);
}

function formatDay(ymd) {
  const [year, month, day] = ymd.split("-").map(Number);
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

function monthLabel(key) {
  return new Intl.DateTimeFormat("en-IN", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${key}-01T00:00:00Z`));
}

function summarize(orders) {
  const paid = orders.filter((order) => order.paymentStatus === "received");
  const pending = orders.filter((order) => order.paymentStatus !== "received");
  const sum = (list) => list.reduce((total, order) => total + (Number(order.total) || 0), 0);
  return {
    orders: orders.length,
    selling: sum(orders),
    paymentReceived: sum(paid),
    awaiting: sum(pending),
  };
}

function group(orders, keyFn) {
  const map = new Map();
  for (const order of orders) {
    const key = keyFn(kolkataYmd(new Date(order.createdAt)));
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(order);
  }
  return map;
}

export function buildReports(orders) {
  const today = kolkataYmd(new Date());
  const thisWeek = weekStart(today);
  const thisMonth = today.slice(0, 7);
  const thisYear = today.slice(0, 4);
  const inWeek = orders.filter((order) => weekStart(kolkataYmd(new Date(order.createdAt))) === thisWeek);
  const inMonth = orders.filter((order) => kolkataYmd(new Date(order.createdAt)).startsWith(thisMonth));
  const inYear = orders.filter((order) => kolkataYmd(new Date(order.createdAt)).startsWith(thisYear));

  const weeks = [...group(orders, weekStart).entries()]
    .sort((a, b) => b[0].localeCompare(a[0]))
    .slice(0, 12)
    .map(([start, list]) => ({
      key: start,
      label: `${formatDay(start)} – ${formatDay(addDays(start, 6))}`,
      ...summarize(list),
    }));
  const months = [...group(orders, (ymd) => ymd.slice(0, 7)).entries()]
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([key, list]) => ({ key, label: monthLabel(key), ...summarize(list) }));
  const years = [...group(orders, (ymd) => ymd.slice(0, 4)).entries()]
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([key, list]) => ({ key, label: key, ...summarize(list) }));

  return {
    week: { label: `${formatDay(thisWeek)} – ${formatDay(addDays(thisWeek, 6))}`, ...summarize(inWeek) },
    month: { label: monthLabel(thisMonth), ...summarize(inMonth) },
    year: { label: thisYear, ...summarize(inYear) },
    weeks,
    months,
    years,
  };
}

function parseOrder(body) {
  const name = clean(body.name, 80);
  const address = clean(body.address, 400);
  if (!name || !address) return { error: "Name and address are required." };
  if (!Array.isArray(body.lines) || body.lines.length === 0 || body.lines.length > 30) {
    return { error: "Add at least one piece." };
  }
  const lines = [];
  for (const line of body.lines) {
    const product = products.find((item) => item.id === line.productId);
    if (!product) return { error: "Unknown piece." };
    const qty = Math.round(Number(line.qty));
    if (!Number.isFinite(qty) || qty < 1 || qty > 20) return { error: "Quantity looks wrong." };
    const size = clean(line.size, 12);
    const color = clean(line.color, 40);
    if (size && !product.sizes.includes(size)) return { error: "Unknown size." };
    if (color && !product.colors.some((swatch) => swatch.name === color)) return { error: "Unknown colour." };
    const unitPrice = product.price == null ? null : product.price;
    lines.push({
      productId: product.id,
      name: product.name,
      qty,
      size,
      color,
      unitPrice,
      lineTotal: unitPrice == null ? null : unitPrice * qty,
    });
  }
  return {
    order: {
      id: `ord_${randomBytes(6).toString("hex")}`,
      createdAt: new Date().toISOString(),
      name,
      address,
      description: clean(body.description, 500),
      lines,
      total: lines.reduce((sum, line) => sum + (line.lineTotal || 0), 0),
      paymentStatus: "pending",
    },
  };
}

function parseReview(body) {
  const productId = clean(body.productId, 20);
  if (!productIds.has(productId)) return { error: "Unknown piece." };
  const name = clean(body.name, 80);
  const text = clean(body.text, 600);
  const rating = Math.round(Number(body.rating));
  if (!name || !text) return { error: "Name and a review are required." };
  if (!Number.isFinite(rating) || rating < 1 || rating > 5) return { error: "Choose a rating from 1 to 5." };
  return {
    review: {
      id: `rev_${randomBytes(6).toString("hex")}`,
      productId,
      name,
      rating,
      text,
      createdAt: new Date().toISOString(),
    },
  };
}

export async function handleApi(request, db) {
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/+$/, "") || "/";
  const method = request.method.toUpperCase();

  try {
    if (method === "POST" && path === "/api/orders") {
      const parsed = parseOrder(await request.json());
      if (parsed.error) return json({ error: parsed.error }, 400);
      await update(db, (draft) => {
        draft.orders.unshift(parsed.order);
        return draft;
      });
      return json({ id: parsed.order.id }, 201);
    }

    if (method === "GET" && path === "/api/reviews") {
      const productId = clean(url.searchParams.get("product"), 20);
      if (!productIds.has(productId)) return json({ error: "Unknown piece." }, 400);
      const data = (await db.read()) || emptyDb();
      const reviews = (data.reviews || [])
        .filter((review) => review.productId === productId)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      return json({ reviews });
    }

    if (method === "POST" && path === "/api/reviews") {
      const parsed = parseReview(await request.json());
      if (parsed.error) return json({ error: parsed.error }, 400);
      let saved = parsed.review;
      await update(db, (draft) => {
        const existing = draft.reviews.find(
          (review) =>
            review.productId === parsed.review.productId &&
            review.name.toLowerCase() === parsed.review.name.toLowerCase() &&
            review.text === parsed.review.text
        );
        if (existing) saved = existing;
        else draft.reviews.unshift(parsed.review);
        return draft;
      });
      return json({ review: saved }, 201);
    }

    if (method === "POST" && path === "/api/admin/login") {
      if (!configured()) return json({ error: "Admin is not configured." }, 503);
      const body = await request.json().catch(() => ({}));
      const current = secrets();
      const emailOk = same(String(body.email || "").trim().toLowerCase(), current.email);
      const passwordOk = same(body.password || "", current.password);
      const pinOk = same(String(body.pin || "").trim(), current.pin);
      if (!emailOk || !passwordOk || !pinOk) return json({ error: "Email, password or PIN is not right." }, 401);
      return json({ token: adminToken() });
    }

    if (!path.startsWith("/api/admin")) return json({ error: "Not found." }, 404);
    if (!configured()) return json({ error: "Admin is not configured." }, 503);
    if (!isAdmin(request)) return json({ error: "Sign in required." }, 401);

    if (method === "GET" && path === "/api/admin/summary") {
      const data = (await db.read()) || emptyDb();
      const orders = [...(data.orders || [])].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      const reviews = [...(data.reviews || [])].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      return json({ orders, reviews, reports: buildReports(orders) });
    }

    const payment = path.match(/^\/api\/admin\/orders\/([^/]+)\/payment$/);
    if (method === "POST" && payment) {
      const id = decodeURIComponent(payment[1]);
      const body = await request.json().catch(() => ({}));
      const status = body.status === "received" ? "received" : body.status === "pending" ? "pending" : "";
      if (!status) return json({ error: "Unknown payment status." }, 400);
      let found = false;
      await update(db, (draft) => {
        const order = draft.orders.find((item) => item.id === id);
        if (!order) return draft;
        order.paymentStatus = status;
        found = true;
        return draft;
      });
      if (!found) return json({ error: "Order not found." }, 404);
      return json({ ok: true, paymentStatus: status });
    }

    const reviewPath = path.match(/^\/api\/admin\/reviews\/([^/]+)$/);
    if (method === "DELETE" && reviewPath) {
      const id = decodeURIComponent(reviewPath[1]);
      await update(db, (draft) => {
        draft.reviews = draft.reviews.filter((review) => review.id !== id);
        return draft;
      });
      return json({ ok: true });
    }

    return json({ error: "Not found." }, 404);
  } catch {
    return json({ error: "Something went wrong." }, 500);
  }
}
