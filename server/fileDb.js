import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const file = path.join(process.cwd(), ".data", "db.json");

export function createFileDb() {
  return {
    async read() {
      try {
        return JSON.parse(await readFile(file, "utf8"));
      } catch {
        return { orders: [], reviews: [] };
      }
    },
    async write(data) {
      await mkdir(path.dirname(file), { recursive: true });
      await writeFile(file, JSON.stringify(data, null, 2));
    },
  };
}
