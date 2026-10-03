import { readFileSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { readAppRoutes, readBlogRecords, validateBlogSlugs } from "./validate-blog.mjs";

export const SITE_ORIGIN = "https://www.365fitness.ae";
const read = path => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
export const readSitemapInputs = () => ({
  routes: JSON.parse(read("src/data/siteRoutes.json")),
  dates: JSON.parse(read("src/data/sitemapDates.json")),
  posts: readBlogRecords(read("src/data/blogPosts.ts")),
  appRoutes: readAppRoutes(),
});

function checkDate(date) {
  if (date === undefined) return;
  if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      !Number.isFinite(Date.parse(date)) || new Date(date).toISOString().slice(0, 10) !== date) {
    throw new Error(`Invalid ISO calendar date: ${date}`);
  }
}

const latest = dates => dates.filter(Boolean).sort().at(-1);

export function createSitemapEntries({ routes, dates, posts, appRoutes }) {
  validateBlogSlugs(posts);
  const paths = Object.values(routes).map(route => route.path);
  const staticAppRoutes = appRoutes.filter(path => path !== "*" && path !== "/blog/:slug");
  if (new Set(paths).size !== paths.length || new Set(staticAppRoutes).size !== staticAppRoutes.length ||
      paths.length !== staticAppRoutes.length || paths.some(path => !staticAppRoutes.includes(path))) {
    throw new Error("Indexable inventory must match the application's static routes exactly.");
  }
  if (!appRoutes.includes("/blog/:slug")) throw new Error("Missing article route.");
  for (const key of Object.keys(dates.pages ?? {})) {
    if (!routes[key]) throw new Error(`Date record for unknown route: ${key}`);
  }
  for (const record of [...Object.values(dates.pages ?? {}), dates.articleTemplate].filter(Boolean)) {
    checkDate(record.lastmod);
    if (record.lastmod && !record.evidence?.trim()) throw new Error("Reviewed dates require evidence.");
  }
  for (const post of posts) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug)) throw new Error(`Invalid article slug: ${post.slug}`);
    if (!post.datePublished) throw new Error(`Missing publication date: ${post.slug}`);
    checkDate(post.datePublished);
    checkDate(post.dateModified);
    if (post.dateModified && post.dateModified < post.datePublished) throw new Error(`Update before publication: ${post.slug}`);
  }
  const entries = Object.entries(routes).map(([key, route]) => ({
    path: route.path,
    // New publications change the listing. Body-only updates do not.
    lastmod: key === "Blog"
      ? latest([dates.pages?.[key]?.lastmod, ...posts.map(post => post.datePublished)])
      : dates.pages?.[key]?.lastmod,
  }));
  for (const post of [...posts].sort((a, b) => a.slug.localeCompare(b.slug))) {
    entries.push({
      path: `/blog/${post.slug}`,
      lastmod: latest([post.datePublished, post.dateModified, dates.articleTemplate?.lastmod]),
    });
  }
  for (const entry of entries) {
    if (!/^\/(?:[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*)?$/.test(entry.path)) {
      throw new Error(`Invalid canonical path: ${entry.path}`);
    }
  }
  if (new Set(entries.map(entry => entry.path)).size !== entries.length) throw new Error("Duplicate sitemap URL.");
  return entries.map(({ path, lastmod }) => ({ loc: SITE_ORIGIN + path, ...(lastmod ? { lastmod } : {}) }));
}

export function renderSitemap(entries) {
  const escape = value => value.replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" }[char]));
  return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    entries.map(entry => `  <url>\n    <loc>${escape(entry.loc)}</loc>\n${entry.lastmod ? `    <lastmod>${escape(entry.lastmod)}</lastmod>\n` : ""}  </url>`).join("\n") +
    "\n</urlset>\n";
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const inputs = readSitemapInputs();
  const entries = createSitemapEntries(inputs);
  const xml = renderSitemap(entries);
  if (!read("public/robots.txt").split(/\r?\n/).includes(`Sitemap: ${SITE_ORIGIN}/sitemap.xml`)) {
    throw new Error("robots.txt must retain the canonical sitemap reference.");
  }
  if (process.argv.includes("--check")) {
    if (read("public/sitemap.xml").replace(/\r\n/g, "\n") !== xml) throw new Error("Sitemap is stale. Run npm run generate:sitemap.");
  } else {
    writeFileSync(new URL("../public/sitemap.xml", import.meta.url), xml);
  }
  console.log(`Sitemap ${process.argv.includes("--check") ? "verified" : "generated"}: ${entries.length} URLs (${inputs.posts.length} articles).`);
}
