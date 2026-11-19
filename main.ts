// gta6-meme-x-01 entry program.
//
// The entry is an X post: a GTA 6 meme (WANTED poster) posted from the
// public account @Sellaclt11. The house reads the post itself from X and
// builds the judge dossier from the post's first picture and text, so this
// program has one job: carry POST.json, which names the post, into the
// output directory. Nothing else is written, and nothing written here is
// judged.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const botDir = process.env.MAKEFUN_BOT_DIR || here;
const outDir = process.env.MAKEFUN_OUTPUT_DIR || join(here, "out");

const postPath = join(botDir, "POST.json");
const raw = readFileSync(postPath, "utf8");
const post = JSON.parse(raw);
const match = /^https:\/\/(?:www\.|mobile\.)?(?:x\.com|twitter\.com)\/[^/]+\/status\/(\d+)$/.exec(
  typeof post.url === "string" ? post.url : ""
);
if (!match) {
  throw new Error("POST.json must name an x.com post URL of the form https://x.com/<handle>/status/<id>");
}
const postId = match[1];

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "POST.json"), raw, "utf8");
console.log("post:", post.url, "id:", postId);
