import "server-only";

import { readdir } from "node:fs/promises";
import path from "node:path";

const LOGO_DIR = path.join(process.cwd(), "public", "image", "logo");
const EXCLUDED_FILES = new Set(["favicon.svg"]);
const VALID_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".svg"]);

export type LogoAsset = {
  id: string;
  src: string;
  alt: string;
  label: string;
};

function formatLogoLabel(fileName: string) {
  return path
    .parse(fileName)
    .name
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export async function getLogoAssets(): Promise<LogoAsset[]> {
  const files = await readdir(LOGO_DIR, { withFileTypes: true });

  return files
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((fileName) => {
      const lower = fileName.toLowerCase();
      return (
        VALID_EXTENSIONS.has(path.extname(lower)) &&
        !EXCLUDED_FILES.has(fileName) &&
        !lower.includes("mockup")
      );
    })
    .sort((a, b) => a.localeCompare(b))
    .map((fileName) => {
      const label = formatLogoLabel(fileName);

      return {
        id: fileName,
        src: `/image/logo/${encodeURIComponent(fileName)}`,
        alt: `${label} logo created by INK DABBA`,
        label,
      };
    });
}
