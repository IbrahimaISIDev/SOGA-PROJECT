import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const CONTENT_ROOT = join(process.cwd(), "content");

/**
 * Content JSON files store their sort key under `itemId` (a zero-padded
 * sequential id, e.g. f01, f02...) rather than `id`, because Tina's
 * GraphQL layer reserves the `id` field name on every document. These
 * helpers rename it back to `id` on the way out, so every other file in
 * the app can keep using `.id` as it always has.
 */
type WithItemId = { itemId: string; [key: string]: unknown };

function toIdShape<T>(raw: WithItemId): T {
  const { itemId, ...rest } = raw;
  return { ...rest, id: itemId } as T;
}

/**
 * Reads every .json file in content/<dir>/ and returns their parsed
 * contents, sorted by id. The filesystem's own directory order isn't
 * meaningful (it's filename-alphabetical, not curated) — the zero-padded
 * id encodes the intended display order instead.
 */
export function readCollection<T extends { id: string }>(dir: string): T[] {
  const full = join(CONTENT_ROOT, dir);
  return readdirSync(full)
    .filter((f) => f.endsWith(".json"))
    .map((f) => toIdShape<T>(JSON.parse(readFileSync(join(full, f), "utf-8"))))
    .sort((a, b) => a.id.localeCompare(b.id));
}

/** Reads a single content/<dir>/<name>.json document (no id/itemId field expected). */
export function readDoc<T>(dir: string, name: string): T {
  const full = join(CONTENT_ROOT, dir, `${name}.json`);
  return JSON.parse(readFileSync(full, "utf-8")) as T;
}
