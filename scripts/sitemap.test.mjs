import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { createSitemapEntries, readSitemapInputs, renderSitemap, SITE_ORIGIN } from "./generate-sitemap.mjs";

const inputs = readSitemapInputs();
const missingAtAudit = [
  "best-exercises-for-weight-loss-and-muscle-gain",
  "rest-day-importance-and-recovery-tips",
  "how-to-lose-weight-and-build-muscle-at-the-same-time",
  "bulking-vs-cutting-whats-the-difference",
  "fitness-tips-for-people-working-long-hours-in-dubai",
  "how-many-calories-should-you-eat-to-lose-weight",
  "how-many-days-a-week-should-you-go-to-the-gym",
  "stretching-before-vs-after-a-workout",
  "benefits-of-functional-training-for-everyday-life",
  "ladies-gym-in-muhaisnah-benefits-of-a-dedicated-workout-space",
];

test("covers every real static route and published article exactly once, including all ten omissions", () => {
  const entries = createSitemapEntries(inputs);
  const locations = entries.map(entry => entry.loc);
  assert.equal(new Set(locations).size, locations.length);
  assert.deepEqual(new Set(locations), new Set([
    ...Object.values(inputs.routes).map(route => SITE_ORIGIN + route.path),
    ...inputs.posts.map(post => `${SITE_ORIGIN}/blog/${post.slug}`),
  ]));
  for (const slug of missingAtAudit) assert.ok(locations.includes(`${SITE_ORIGIN}/blog/${slug}`));
  for (const loc of locations) {
    assert.equal(new URL(loc).origin, SITE_ORIGIN);
    assert.equal(new URL(loc).search + new URL(loc).hash, "");
    assert.doesNotMatch(loc, /\*|:slug/);
  }
});

test("rejects duplicate articles, duplicate core routes and inventory/router drift", () => {
  for (const mutate of [
    copy => copy.posts.push(copy.posts[0]),
    copy => { copy.routes.About.path = "/"; },
    copy => { copy.routes.About.path = "/nonexistent"; },
    copy => copy.appRoutes.push("/new-unlisted-page"),
    copy => { copy.appRoutes = copy.appRoutes.filter(path => path !== "/blog/:slug"); },
  ]) {
    const copy = structuredClone(inputs);
    mutate(copy);
    assert.throws(() => createSitemapEntries(copy));
  }
});

test("dates reflect reviewed shared content and explicit publication/update dates, not build time", () => {
  const entries = createSitemapEntries(inputs);
  const date = path => entries.find(entry => entry.loc === SITE_ORIGIN + path).lastmod;
  assert.equal(date("/"), "2026-09-04");
  assert.equal(date("/gallery"), "2026-08-07");
  assert.equal(date("/locations/muhaisnah-first"), "2026-09-04");
  assert.equal(date("/blog"), "2026-10-18");
  assert.equal(date("/blog/beginner-gym-guide-dubai"), "2026-10-01");
  const copy = structuredClone(inputs);
  delete copy.dates.pages.About;
  assert.equal(createSitemapEntries(copy).find(entry => entry.loc.endsWith("/about")).lastmod, undefined);
  assert.doesNotMatch(renderSitemap([{loc: SITE_ORIGIN + "/about"}]), /lastmod/);
  assert.equal(renderSitemap(entries), renderSitemap(createSitemapEntries(inputs)));
});

test("new publications advance the listing; body-only edits advance only that article", () => {
  const copy = structuredClone(inputs);
  copy.posts.push({ id: "test", slug: "future-article", datePublished: "2026-11-01" });
  let entries = createSitemapEntries(copy);
  assert.equal(entries.find(entry => entry.loc.endsWith("/blog")).lastmod, "2026-11-01");
  copy.posts[0].dateModified = "2026-12-01";
  entries = createSitemapEntries(copy);
  assert.equal(entries.find(entry => entry.loc.endsWith("/blog")).lastmod, "2026-11-01");
  assert.equal(entries.find(entry => entry.loc.endsWith(`/blog/${copy.posts[0].slug}`)).lastmod, "2026-12-01");
  assert.deepEqual(inputs.posts, readSitemapInputs().posts);
});

test("reviewed listing changes cover removals and edits without changing article dates", () => {
  const copy = structuredClone(inputs);
  const removed = copy.posts.pop();
  copy.dates.pages.Blog = {
    lastmod: "2026-10-02",
    evidence: "Editorial review: removed an article and revised listing excerpts.",
  };
  const entries = createSitemapEntries(copy);
  assert.equal(entries.find(entry => entry.loc === `${SITE_ORIGIN}/blog`).lastmod, "2026-10-02");
  assert.ok(!entries.some(entry => entry.loc === `${SITE_ORIGIN}/blog/${removed.slug}`));
  assert.equal(entries.find(entry => entry.loc === `${SITE_ORIGIN}/blog/${copy.posts[0].slug}`).lastmod, "2026-10-01");
});

test("article dates use the latest evidenced change while preserving publication metadata", () => {
  const copy = structuredClone(inputs);
  copy.dates.articleTemplate = {
    lastmod: "2026-10-02",
    evidence: "Editorial review: changed the shared article's contextual links.",
  };
  copy.posts[0].dateModified = "2026-10-03";
  const entries = createSitemapEntries(copy);
  assert.equal(entries.find(entry => entry.loc.endsWith(`/blog/${copy.posts[0].slug}`)).lastmod, "2026-10-03");
  assert.equal(entries.find(entry => entry.loc.endsWith(`/blog/${copy.posts[1].slug}`)).lastmod, "2026-10-02");
  assert.equal(copy.posts[0].datePublished, inputs.posts[0].datePublished);
  assert.equal(entries.find(entry => entry.loc === `${SITE_ORIGIN}/blog`).lastmod, "2026-10-18");
});

test("rejects invalid dates, unsupported paths and unevidenced dates", () => {
  for (const mutate of [
    copy => { delete copy.posts[0].datePublished; },
    copy => { copy.posts[0].datePublished = "2026-02-30"; },
    copy => { copy.posts[0].dateModified = "2020-01-01"; },
    copy => { copy.posts[0].slug = "bad&slug"; },
    copy => { copy.dates.pages.About.lastmod = "today"; },
    copy => { delete copy.dates.pages.About.evidence; },
  ]) {
    const copy = structuredClone(inputs);
    mutate(copy);
    assert.throws(() => createSitemapEntries(copy));
  }
});

test("XML output escapes values and robots retains the canonical sitemap reference", () => {
  const xml = renderSitemap([{ loc: 'https://example.test/?a=1&b=<"\'>' }]);
  assert.ok(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>\n'));
  assert.ok(xml.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'));
  assert.ok(xml.includes("&amp;b=&lt;&quot;&apos;&gt;"));
  assert.match(readFileSync(new URL("../public/robots.txt", import.meta.url), "utf8"), /^Sitemap: https:\/\/www\.365fitness\.ae\/sitemap\.xml\r?$/m);
});
