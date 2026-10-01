import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import ts from "typescript";

function literal(node) {
  if (!node) return undefined;
  if (ts.isStringLiteral(node)) return node.text;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (ts.isArrayLiteralExpression(node)) return node.elements.map(literal);
  if (ts.isObjectLiteralExpression(node)) return Object.fromEntries(node.properties.map(p => {
    if (!ts.isPropertyAssignment(p)) throw new Error("Expected explicit blog data properties.");
    return [p.name.getText().replace(/["']/g, ""), literal(p.initializer)];
  }));
  throw new Error("Expected literal blog metadata and content.");
}

// Read actual top-level article records without loading browser-only image imports.
export function readBlogRecords(source) {
  const file = ts.createSourceFile("blogPosts.ts", source, ts.ScriptTarget.Latest, true);
  let articles;
  for (const statement of file.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (declaration.name.getText(file) === "blogPosts") articles = declaration.initializer;
    }
  }
  if (!articles || !ts.isArrayLiteralExpression(articles)) {
    throw new Error("Expected blogPosts to be an explicit array of articles.");
  }
  return articles.elements.map((article) => {
    if (!ts.isObjectLiteralExpression(article)) throw new Error("Expected an explicit article object.");
    const properties = new Map(article.properties.filter(ts.isPropertyAssignment).map((p) => [p.name.getText(file).replace(/["']/g, ""), p.initializer]));
    const slug = properties.get("slug");
    if (!slug || !ts.isStringLiteral(slug) || !slug.text.trim()) throw new Error("Every article needs a non-empty literal slug.");
    return {
      slug: slug.text,
      id: properties.get("id")?.getText(file) ?? "unknown",
      ...Object.fromEntries(["title", "excerpt", "content", "relatedSlugs", "trialType", "datePublished", "dateModified", "seo"].map(key => [key, literal(properties.get(key))])),
    };
  });
}

export function validateBlogContent(records, routes = []) {
  validateBlogSlugs(records);
  const slugs = new Set(records.map(p => p.slug));
  const paths = new Set([...routes, ...records.map(p => `/blog/${p.slug}`)]);
  for (const post of records) {
    const fail = message => { throw new Error(`${post.slug}: ${message}`); };
    const checkLink = link => {
      if (!link.text?.trim() || !link.href) fail("Links need descriptive text and a destination.");
      if (link.href.startsWith("/")) {
        if (!paths.has(link.href)) fail(`Unknown internal destination: ${link.href}`);
      } else if (!/^tel:\+\d+$/.test(link.href) && !/^mailto:[^\s]+$/.test(link.href) && !/^https:\/\//.test(link.href)) {
        fail(`Unsupported link: ${link.href}`);
      }
    };
    const checkInline = content => {
      if (!Array.isArray(content) || !content.length) fail("Inline content must not be empty.");
      for (const item of content) {
        if (typeof item === "string") {
          if (/(?:054\s?712\s?092[57]|\+971\s?54\s?712\s?092[57])/.test(item)) fail("Contact numbers must be clickable links.");
        } else if (item?.type === "link") checkLink(item);
        else fail("Unsupported inline content.");
      }
    };
    if (!post.title?.trim() || !post.excerpt?.trim()) fail("Title and description are required.");
    for (const date of [post.datePublished, ...(post.dateModified ? [post.dateModified] : [])]) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || new Date(date).toISOString().slice(0, 10) !== date) fail("Dates must be valid ISO calendar dates.");
    }
    if (post.dateModified && post.dateModified < post.datePublished) fail("Update date precedes publication.");
    if (!["strength", "general"].includes(post.trialType)) fail("An explicit trial type is required.");
    if (!Array.isArray(post.relatedSlugs) || !post.relatedSlugs.length || post.relatedSlugs.length > 3) fail("Select one to three relevant articles.");
    if (new Set(post.relatedSlugs).size !== post.relatedSlugs.length) fail("Duplicate related article URL.");
    for (const related of post.relatedSlugs) if (related === post.slug || !slugs.has(related)) fail(`Invalid related article: ${related}`);
    if (!Array.isArray(post.content) || post.content[0]?.type !== "paragraph") fail("Begin with a structured introduction paragraph.");
    let level = 1;
    let hasH2 = false;
    const ids = new Set();
    for (const block of post.content) {
      if (typeof block === "string") fail("Published articles must use explicit content blocks.");
      if (["heading", "faq"].includes(block.type)) {
        const next = block.type === "faq" ? 3 : block.level;
        if (![2, 3].includes(next) || next > level + 1) fail("Heading hierarchy must follow H1, H2, H3.");
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(block.id) || ids.has(block.id)) fail("Heading IDs must be stable and unique.");
        ids.add(block.id);level = next;hasH2 ||= next === 2;
      }
      switch (block.type) {
        case "paragraph": checkInline(block.content); break;
        case "heading": if (!block.text?.trim()) fail("Empty heading."); break;
        case "list":
          if (!Array.isArray(block.items) || !block.items.length) fail("Lists need items.");
          block.items.forEach(checkInline); break;
        case "faq": if (!block.question?.trim()) fail("Empty FAQ question."); checkInline(block.answer); break;
        case "link": checkLink(block); break;
        default: fail(`Unknown content block: ${block.type}`);
      }
    }
    if (!hasH2) fail("At least one H2 is needed for the table of contents and introduction CTA.");
  }
}

export const readAppRoutes = () => [...readFileSync(new URL("../src/App.tsx", import.meta.url), "utf8").matchAll(/<Route path="([^"]+)"/g)].map(m => m[1]);

export function validateBlogSlugs(records) {
  const seen = new Map();
  for (const article of records) {
    if (seen.has(article.slug)) {
      throw new Error(`Duplicate blog slug "${article.slug}" (IDs ${seen.get(article.slug)} and ${article.id}). Keep one authoritative entry per URL.`);
    }
    seen.set(article.slug, article.id);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const records = readBlogRecords(readFileSync(new URL("../src/data/blogPosts.ts", import.meta.url), "utf8"));
  validateBlogSlugs(records);
  validateBlogContent(records, readAppRoutes());
  console.log(`Validated ${records.length} unique blog URLs.`);
}
