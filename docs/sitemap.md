# Generated sitemap

Run `npm run generate:sitemap` to regenerate `public/sitemap.xml`.
Both `npm run build` and `npm run build:dev` generate and validate it before Vite
copies it into `dist`. `npm run validate:sitemap` checks coverage, uniqueness,
dates and whether the checked-in XML is stale. Do not hand-edit the XML.

## Sources and scope

- `src/data/siteRoutes.json` is the shared static route inventory used by
  `src/App.tsx`, the sitemap generator and link validation. Add new indexable
  routes here and register their component in App. Checks reject router drift.
- Every entry in `blogPosts` is currently published and routable; there is no
  draft status. The generator reads the actual TypeScript array using the
  existing AST reader, without importing browser image modules. Duplicate
  slugs fail rather than silently choosing an entry.
- The wildcard and `/blog/:slug` template are not sitemap URLs. Each article's
  real slug is included once. The existing 18 static URLs, including agreement
  pages and `/connection`, remain included; this task does not change indexing
  policy or existing page metadata.
- All locations use `https://www.365fitness.ae`. `robots.txt` is unchanged.
- Optional speculative `priority` and `changefreq` values have been removed.

## Date policy and evidence

`src/data/sitemapDates.json` stores reviewed significant changes with Git evidence,
not file modification times or the latest commit touching a file. Missing core-page
dates produce no `lastmod`; the generator never fills them with the build date.
Dates are calendar dates recorded in repository history (the reviewed commits use
Dubai time), not independently verified production deployment timestamps.
Article publication dates are the authors' explicit ISO dates matching their
displayed publication dates, rather than the commit date on which an article
was added. An article can be committed after its stated publication date.

| Pages | Last significant date used | Evidence |
| --- | --- | --- |
| Homepage | 2026-09-04 | `d4a483e`: shared Trainers adds a trainer profile |
| About | 2026-08-24 | `284f41c`: new hero image |
| Gallery, plan/service pages, freelance agreement | 2026-08-07 | `5fa453b`: shared Footer corrects contact information and branch links; supersedes earlier page content changes |
| Connection | 2026-08-07 | `5fa453b`: shared initial-HTML title, description, social metadata and schema correction; this page has no Footer |
| Contact | 2026-10-01 | `afa0fb1`: branch handoff, instructions and manual enquiry links |
| Deira | 2026-08-13 | `7566b0b`: prices, durations and VAT information |
| Muhaisnah | 2026-09-04 | `20be65e`: prices and annual package duration |
| Membership agreement and terms | 2026-08-24 | `e4029c8`: refund/cancellation content |
| Privacy | 2026-08-24 | `9d23902`: policy introduced |
| Blog listing | 2026-10-01 | `452e035`, `ca6d9b6`, `ff05167`: metadata, ordering, excerpts and duplicate removal |
| All existing articles | 2026-10-01 | `452e035`, `ff05167`: article metadata, real headings, contents, contextual/related links and trial CTAs |

Article `lastmod` is the latest of the post's ISO `datePublished`, its optional
`dateModified`, and the reviewed shared article-template change date. Original
publication dates are preserved. A shared template update is a page modification,
not a claim that every article was first published that day. For example, the
merged weight-loss/muscle article keeps July 24 publication and October 1 update;
the removed duplicate's August 9 date does not create a second URL.

The listing uses its reviewed change date or the newest publication date,
whichever is later. Article-body-only updates do not advance the listing date.
When removing an article or changing existing listing titles, excerpts, images
or ordering, update the Blog date/evidence alongside that editorial change.
When changing core content or rendered shared content, update only affected
date records after reviewing the actual change. If the date cannot be established,
remove the affected date instead of guessing. When changing article text, use
`dateModified`; when changing the shared rendered article template significantly,
update `articleTemplate` with evidence. New routes may omit date records entirely.

Excluded from date bumps: image-format optimization without image-content change,
tracking/configuration edits, comments, styling-only changes, route refactoring,
the Footer's minor August 24 link-label wording, optional PageSeo APIs that preserve
core pages' default metadata, unchanged default floating WhatsApp behavior and
hidden modal implementation changes. No payment files or settings were edited.

This follows the distinction between significant main-content, structured-data or
link updates and unrelated edits in
[Google's lastmod guidance](https://developers.google.com/search/blog/2023/06/sitemaps-lastmod-ping).
Generation is deterministic and does not require Git history in build environments.

## Missing URLs restored

The sitemap at audited commit `b883779d94619db79a455d6d93fdee6a92f1ad0f`
had 25 article URLs; the dataset has 35 unique articles. The omissions were
verified against that commit's XML and the current published article inventory.
All ten omissions are included under `/blog/`:

- `best-exercises-for-weight-loss-and-muscle-gain`
- `rest-day-importance-and-recovery-tips`
- `how-to-lose-weight-and-build-muscle-at-the-same-time`
- `bulking-vs-cutting-whats-the-difference`
- `fitness-tips-for-people-working-long-hours-in-dubai`
- `how-many-calories-should-you-eat-to-lose-weight`
- `how-many-days-a-week-should-you-go-to-the-gym`
- `stretching-before-vs-after-a-workout`
- `benefits-of-functional-training-for-everyday-life`
- `ladies-gym-in-muhaisnah-benefits-of-a-dedicated-workout-space`
