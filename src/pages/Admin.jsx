import { useEffect, useState } from "react";
import { formatPrice } from "../utils/formatPrice";
import Seo from "../components/common/Seo";

const TOKEN_KEY = "vishwear-admin";

function when(iso) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(new Date(iso));
}

function Stat({ title, report }) {
  return (
    <article className="border border-goldsoft bg-ivory p-5">
      <p className="text-[11px] uppercase tracking-[0.22em] text-burgundy">{title}</p>
      <p className="mt-1 text-sm text-charcoal/60">{report.label}</p>
      <p className="mt-4 font-serif text-4xl text-wine">{formatPrice(report.selling)}</p>
      <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-charcoal/50">{report.orders} {report.orders === 1 ? "order" : "orders"}</p>
      <p className="mt-4 text-sm">Payment received {formatPrice(report.paymentReceived)}</p>
      <p className="text-sm text-charcoal/60">Awaiting {formatPrice(report.awaiting)}</p>
    </article>
  );
}

function PeriodList({ title, rows }) {
  if (!rows.length) return null;
  return (
    <div>
      <h3 className="text-[11px] uppercase tracking-[0.2em] text-charcoal/50">{title}</h3>
      <ul className="mt-3 divide-y divide-goldsoft border-y border-goldsoft">
        {rows.map((row) => (
          <li key={row.key} className="flex items-baseline justify-between gap-4 py-3 text-sm">
            <span>{row.label}</span>
            <span className="text-right">
              <span className="block text-wine">{formatPrice(row.selling)}</span>
              <span className="text-xs text-charcoal/55">Paid {formatPrice(row.paymentReceived)}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Admin() {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY) || "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const [loginError, setLoginError] = useState("");
  const [summary, setSummary] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [busyId, setBusyId] = useState("");

  async function load(nextToken = token) {
    setLoadError("");
    const response = await fetch("/api/admin/summary", { headers: { authorization: `Bearer ${nextToken}` } });
    const body = await response.json().catch(() => ({}));
    if (response.status === 401) {
      sessionStorage.removeItem(TOKEN_KEY);
      setToken("");
      setSummary(null);
      return;
    }
    if (!response.ok) {
      setLoadError(body.error || "The desk could not be opened.");
      return;
    }
    setSummary(body);
  }

  useEffect(() => {
    if (token) load(token);
  }, [token]);

  async function signIn(event) {
    event.preventDefault();
    setLoginError("");
    if (!email.trim() || !password || !pin.trim()) {
      setLoginError("Email, password and PIN are needed.");
      return;
    }
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: email.trim(), password, pin: pin.trim() }),
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      setLoginError(body.error || "Could not sign in.");
      return;
    }
    sessionStorage.setItem(TOKEN_KEY, body.token);
    setToken(body.token);
    setPassword("");
    setPin("");
  }

  async function setPayment(order, status) {
    setBusyId(order.id);
    const response = await fetch(`/api/admin/orders/${encodeURIComponent(order.id)}/payment`, {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    });
    if (response.ok) await load();
    setBusyId("");
  }

  async function removeReview(id) {
    setBusyId(id);
    const response = await fetch(`/api/admin/reviews/${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: { authorization: `Bearer ${token}` },
    });
    if (response.ok) await load();
    setBusyId("");
  }

  return (
    <div className="mx-auto max-w-[1100px] px-5 pb-20 pt-28 md:px-12 md:pt-32">
      <Seo title="Admin" description="Vishwear atelier desk." path="/admin" noIndex />
      <p className="text-[11px] uppercase tracking-[0.32em] text-burgundy">Atelier desk</p>
      <h1 className="mt-3 font-serif text-5xl text-wine md:text-6xl">Orders</h1>

      {!token ? (
        <form onSubmit={signIn} className="mt-10 max-w-md border border-goldsoft p-6" noValidate>
          <label className="text-[11px] uppercase tracking-[0.18em] text-charcoal/60" htmlFor="admin-email">Email</label>
          <input id="admin-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="username" className="mt-2 w-full border-b border-goldsoft bg-transparent py-3 outline-none focus:border-burgundy" />
          <label className="mt-6 block text-[11px] uppercase tracking-[0.18em] text-charcoal/60" htmlFor="admin-password">Password</label>
          <input id="admin-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" className="mt-2 w-full border-b border-goldsoft bg-transparent py-3 outline-none focus:border-burgundy" />
          <label className="mt-6 block text-[11px] uppercase tracking-[0.18em] text-charcoal/60" htmlFor="admin-pin">PIN</label>
          <input id="admin-pin" type="password" inputMode="numeric" maxLength={8} value={pin} onChange={(event) => setPin(event.target.value)} autoComplete="off" className="mt-2 w-full border-b border-goldsoft bg-transparent py-3 outline-none focus:border-burgundy" />
          {loginError ? <p className="mt-3 text-sm text-burgundy">{loginError}</p> : null}
          <button type="submit" className="btn-shimmer mt-6 bg-burgundy px-6 py-3 text-[11px] uppercase tracking-[0.2em] text-ivory hover:bg-wine">Open the desk</button>
        </form>
      ) : (
        <div className="mt-10">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                sessionStorage.removeItem(TOKEN_KEY);
                setToken("");
                setSummary(null);
              }}
              className="text-[11px] uppercase tracking-[0.16em] text-charcoal/50"
            >
              Sign out
            </button>
          </div>
          {loadError ? <p className="mt-4 text-sm text-burgundy">{loadError}</p> : null}
          {!summary ? <p className="mt-6 text-sm text-charcoal/60">Opening the desk…</p> : null}
          {summary ? (
            <>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <Stat title="This week" report={summary.reports.week} />
                <Stat title="This month" report={summary.reports.month} />
                <Stat title="This year" report={summary.reports.year} />
              </div>

              <h2 className="mt-12 font-serif text-3xl text-wine">Orders that came in</h2>
              {summary.orders.length === 0 ? <p className="mt-4 text-sm text-charcoal/70">No orders yet. A bag order on WhatsApp will appear here.</p> : null}
              <ul className="mt-4 space-y-4">
                {summary.orders.map((order) => (
                  <li key={order.id} className="border border-goldsoft p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-serif text-2xl text-wine">{order.name}</p>
                        <p className="mt-1 text-xs text-charcoal/50">{when(order.createdAt)}</p>
                      </div>
                      <p className="font-serif text-2xl text-charcoal">{formatPrice(order.total)}</p>
                    </div>
                    <p className="mt-3 text-sm text-charcoal/80">{order.address}</p>
                    {order.description ? <p className="mt-1 text-sm text-charcoal/60">{order.description}</p> : null}
                    <ul className="mt-3 space-y-1 text-sm">
                      {order.lines.map((line, index) => (
                        <li key={`${line.productId}-${index}`}>
                          {line.qty} × {line.name}
                          {line.size || line.color ? ` · ${[line.size, line.color].filter(Boolean).join(" / ")}` : ""}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <p className="text-[11px] uppercase tracking-[0.16em] text-burgundy">{order.paymentStatus === "received" ? "Payment received" : "Payment awaiting"}</p>
                      <button
                        type="button"
                        disabled={busyId === order.id}
                        onClick={() => setPayment(order, order.paymentStatus === "received" ? "pending" : "received")}
                        className="border border-burgundy px-3 py-2 text-[11px] uppercase tracking-[0.14em] text-burgundy disabled:opacity-50"
                      >
                        {order.paymentStatus === "received" ? "Mark as awaiting" : "Mark payment received"}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <h2 className="mt-12 font-serif text-3xl text-wine">Selling report</h2>
              <div className="mt-6 grid gap-8 md:grid-cols-3">
                <PeriodList title="Weeks" rows={summary.reports.weeks} />
                <PeriodList title="Months" rows={summary.reports.months} />
                <PeriodList title="Years" rows={summary.reports.years} />
              </div>

              <h2 className="mt-12 font-serif text-3xl text-wine">Reviews</h2>
              {summary.reviews.length === 0 ? <p className="mt-4 text-sm text-charcoal/70">No reviews yet.</p> : null}
              <ul className="mt-4 divide-y divide-goldsoft border-y border-goldsoft">
                {summary.reviews.map((review) => (
                  <li key={review.id} className="flex flex-wrap items-start justify-between gap-4 py-4">
                    <div>
                      <p className="text-sm text-wine">{review.name} · {review.rating}/5 · {review.productId}</p>
                      <p className="mt-1 max-w-xl text-sm text-charcoal/80">{review.text}</p>
                    </div>
                    <button type="button" disabled={busyId === review.id} onClick={() => removeReview(review.id)} className="text-[11px] uppercase tracking-[0.14em] text-charcoal/50">
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      )}
    </div>
  );
}
