import { existsSync, readFileSync } from "node:fs";

export function readFileSafe(filePath: string | null): string | null {
  if (!filePath || !existsSync(filePath)) return null;
  try {
    return readFileSync(filePath, "utf8");
  } catch {
    return null;
  }
}
