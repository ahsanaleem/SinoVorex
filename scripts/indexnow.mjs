// Submits every URL in the live sitemap to IndexNow (Bing, Yandex, Seznam, Naver…).
// Bing's index also feeds ChatGPT Search and Copilot. Run after each deploy:  npm run indexnow
// The key file is public/c45690fe483bb9f595b7bd03894d610e.txt — keep the two in sync if you change the key.
const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://sinovorex.com").replace(/\/$/, "");
const KEY = "c45690fe483bb9f595b7bd03894d610e";

const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
if (!urlList.length) throw new Error("No URLs found in sitemap.xml");

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urlList.length} URLs`);
if (!res.ok && res.status !== 202) process.exit(1);
