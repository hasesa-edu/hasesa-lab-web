// Runs before `next build`. With CONTENT_FROM_API=1 it downloads the course
// content from hasesa-api into .generated/content.json, which lib/content reads
// instead of the Markdown in content/. If the download fails the build fails,
// and Vercel keeps serving the previous deployment, so the site never goes out
// with missing content. Without the flag the local content/ folder is used.

import fs from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), ".generated", "content.json");
const on = ["1", "true", "yes", "on"].includes((process.env.CONTENT_FROM_API ?? "").trim().toLowerCase());

if (!on) {
  fs.rmSync(OUT, { force: true });
  console.log("content: using the local content/ folder (CONTENT_FROM_API is off)");
  process.exit(0);
}

const base = (process.env.HASESA_API_URL || "https://hasesa-api.vercel.app").replace(/\/+$/, "");
const secret = process.env.HASESA_CLIENT_SECRET;
if (!secret) {
  console.error("content: HASESA_CLIENT_SECRET must be set when CONTENT_FROM_API=1");
  process.exit(1);
}

const auth = Buffer.from(`hasesa-web:${secret}`).toString("base64");
let res;
for (let attempt = 1; attempt <= 3; attempt++) {
  try {
    res = await fetch(`${base}/v1/content/bundle`, { headers: { authorization: `Basic ${auth}` } });
    if (res.ok) break;
    console.error(`content: attempt ${attempt} got HTTP ${res.status}`);
  } catch (e) {
    console.error(`content: attempt ${attempt} failed: ${e}`);
  }
  await new Promise((r) => setTimeout(r, 2000 * attempt));
}
if (!res?.ok) {
  console.error("content: could not download the content bundle from the API");
  process.exit(1);
}

const text = await res.text();
const data = JSON.parse(text);
if (!Array.isArray(data.modules) || !data.modules.length || !Array.isArray(data.concepts) || !data.concepts.length) {
  console.error("content: the API returned an empty or malformed bundle");
  process.exit(1);
}
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, text);
console.log(
  `content: ${data.modules.length} modules and ${data.concepts.length} concept units from ${base} (version ${res.headers.get("etag") ?? "?"})`
);
