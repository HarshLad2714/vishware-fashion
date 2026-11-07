import { getStore } from "@netlify/blobs";
import { handleApi } from "../../server/api.js";

export default async (request) => {
  const store = getStore("vishwear");
  const db = {
    async read() {
      return (await store.get("db", { type: "json" })) || { orders: [], reviews: [] };
    },
    async write(data) {
      await store.setJSON("db", data);
    },
  };
  return handleApi(request, db);
};

export const config = { path: "/api/*" };
