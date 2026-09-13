import fs from "node:fs";
import path from "node:path";
import { CV_CONFIG } from "./cv";

let warned = false;

/** Build-time / server-only warning when CV PDF is missing from public/. */
export function warnMissingCv(): void {
  if (warned || typeof window !== "undefined") return;
  try {
    const filePath = path.join(process.cwd(), "public", CV_CONFIG.tr.replace(/^\//, ""));
    if (!fs.existsSync(filePath)) {
      console.warn(
        `[cv] Missing file: ${CV_CONFIG.tr}. Place the PDF under public/documents/ or set CV_CONFIG.available.tr = false.`
      );
      warned = true;
    }
  } catch {
    /* ignore */
  }
}
