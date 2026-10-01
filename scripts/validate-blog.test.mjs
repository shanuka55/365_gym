import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { readAppRoutes, readBlogRecords, validateBlogSlugs, validateBlogContent } from "./validate-blog.mjs";

const source = readFileSync(new URL("../src/data/blogPosts.ts", import.meta.url), "utf8");

test("the article dataset has exactly one entry per public URL", () => {
  const records = readBlogRecords(source);
  assert.ok(records.length > 0);
  validateBlogSlugs(records);
  assert.equal(records.filter(p => p.slug === "how-to-lose-weight-and-build-muscle-at-the-same-time").length, 1);
});

test("the merged entry keeps the original public URL and publication date", () => {
  const records = readBlogRecords(source);
  const merged = records.find(p => p.slug === "how-to-lose-weight-and-build-muscle-at-the-same-time");
  assert.equal(merged.id, "36");
  assert.equal(merged.datePublished, "2026-07-24");
  assert.ok(merged.dateModified >= "2026-08-09");
  assert.ok(merged.content.some(b => b.type === "heading" && b.text === "Common Mistakes to Avoid"));
  assert.ok(merged.content.some(b => b.type === "heading" && b.text === "Stay Hydrated"));
});

test("the women's article keeps useful local links without keyword lists", () => {
  const post = readBlogRecords(source).find(p => p.slug === "why-women-should-include-strength-training-in-their-routine");
  const content = JSON.stringify(post.content);
  assert.doesNotMatch(content, /\||gym near me/i);
  for (const href of ["/locations/muhaisnah-first", "/locations/deira-muraqqabat", "/services/personal-training", "/blog/beginner-gym-guide-dubai", "/blog/ladies-gym-in-muhaisnah-benefits-of-a-dedicated-workout-space"]) assert.ok(content.includes(href));
  assert.equal(post.content.filter(b => b.type === "heading" && b.id === "training-in-dubai").length, 1);
});

test("all published articles have structured content, valid destinations, dates and related selections", () => {
  validateBlogContent(readBlogRecords(source), readAppRoutes());
});

test("rejects legacy prose, invalid hierarchy and duplicate related URLs", () => {
  const records = readBlogRecords(source);
  for (const mutate of [
    post => { post.content[0] = "Unconverted prose"; },
    post => { post.content.find(b => b.type === "heading").level = 3; },
    post => { post.relatedSlugs.push(post.relatedSlugs[0]); },
    post => { post.content.push({type: "link", text: "Missing article", href: "/blog/missing-article"}); },
  ]) {
    const invalid = structuredClone(records);
    mutate(invalid[0]);
    assert.throws(() => validateBlogContent(invalid, readAppRoutes()));
  }
});

test("rejects the audited duplicate even when article IDs differ", () => {
  const records = readBlogRecords(`export const blogPosts = [
    { id: 36, slug: "how-to-lose-weight-and-build-muscle-at-the-same-time" },
    { id: 43, slug: "how-to-lose-weight-and-build-muscle-at-the-same-time" }
  ];`);
  assert.throws(() => validateBlogSlugs(records), /Duplicate blog slug.*IDs 36 and 43/);
});

test("checks only article slugs, allowing references to the same URL in content", () => {
  const records = readBlogRecords(`export const blogPosts = [
    { id: 1, slug: "first", content: [{ slug: "second" }] },
    { id: 2, slug: "second", relatedSlugs: ["first"] }
  ];`);
  assert.doesNotThrow(() => validateBlogSlugs(records));
});

test("fails visibly for missing or computed slugs", () => {
  assert.throws(() => readBlogRecords('export const blogPosts = [{ id: 1 }];'), /non-empty literal slug/);
  assert.throws(() => readBlogRecords('export const blogPosts = [{ id: 1, slug: getSlug() }];'), /non-empty literal slug/);
});
