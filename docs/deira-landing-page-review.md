# Deira landing-page review — October 18, 2026

Local changes only; no push, deployment, checkout session, enquiry submission or call.

## Implementation

- Content-driven hero with the heading “24/7 Gym in Deira, Al Muraqqabat”, concise location copy and a membership anchor.
- Measure the shared fixed header with ResizeObserver rather than assuming its desktop height. The page uses a viewport-height flex layout: the header and WhatsApp contact dock reserve space, and the middle main landmark scrolls. Contact controls cannot overlay that scrolling area. Membership scrolling happens within that landmark.
- Keep the black/yellow presentation, desktop hero and membership grid. Fix the overflowing lower join CTA at 320px.
- Rename the existing “Ladies Gym” heading to “Fitness Support for Women”; the existing supporting text stays unchanged and no separate ladies area is claimed.
- Scope CSS and new image variants to Deira. Shared Header, Footer, CTA tracking hook, routing, Muhaisnah, Stripe links, FAQ answers, canonical and JSON-LD are unchanged.

## Validation

Before editing, Chrome at 425 × 608 showed the heading starting at y=45.6 beneath the 72px fixed header. The three hero contact CTAs fit within the fixed 547.2px hero at that size; there was no verified bottom clipping there. The floating WhatsApp button occupied y=516–576 over page content.

After editing, inspect screenshots and browser geometry at 320 × 568, 375 × 667, 425 × 608 and 1440 × 900. Repeat checks against the production preview. All four sizes pass:

- Full hero heading, WhatsApp, Call, Directions and membership link accessible; no horizontal overflow.
- Membership anchor reaches its heading below the header.
- Scan controls across the scrolling content: no contact-dock overlap or horizontal overflow.
- All 10 rendered phone/WhatsApp anchors route to +971 54 712 0925.
- Prevent anchor navigation and verify `deira_whatsapp_click`, `deira_call_click` and `deira_directions_click`, with `branch: deira`. Production checks block external network requests. No enquiry or payment action is exercised.
- Directions retains `https://share.google/8ArVq05n3QaSpmVIc`; canonical retains `https://www.365fitness.ae/locations/deira-muraqqabat`.
- Compare source with the existing Git index: Stripe URLs, FAQ/schema block, shared tracking hook and Muhaisnah page remain unchanged.

`npm run build` passes, including 8 blog tests, 8 sitemap tests and the production Vite build. Build notes an outdated Browserslist dataset; dependencies are unchanged.

`npx tsc --noEmit -p tsconfig.node.json` passes. `npx tsc --noEmit -p tsconfig.app.json` fails on the pre-existing modified `src/pages/BlogPost.tsx:270`: `placement` is not declared in `WhatsAppButtonProps` (TS2322). No Deira TypeScript error is reported. Leave the user's blog changes intact.

Native Git exits with Windows status 0xC0E90002 and no output. Read-only Dulwich inspection identified the pre-existing modified blog files and untracked assets before editing. No repository instructions named AGENTS.md were found in the checkout or searched ancestor directories.

## Image comparison

New WebP variants were resized proportionally using Chrome canvas at quality 0.8, without adding project dependencies or replacing shared originals. Hero uses eager loading, high fetch priority, intrinsic dimensions and responsive `srcSet`. All eight gallery images retain lazy loading and asynchronous decoding.

| Image | Original dimensions / bytes | New widths / bytes |
| --- | --- | --- |
| Hero / first gallery photo | 1800 × 1200 / 744,346 | 640 / 66,528; 1280 / 225,770; 1800 / 415,528 |
| deira-branch | 1920 × 1080 / 511,206 | 480 / 34,976; 960 / 95,328 |
| IMG_Deira_01 | 1620 × 1080 / 449,646 | 480 / 35,384; 960 / 103,074 |
| IMG_Deira_02 | 1620 × 1080 / 446,390 | 480 / 31,118; 960 / 94,262 |
| IMG_Deira_03 | 1620 × 1080 / 413,036 | 480 / 31,222; 960 / 95,184 |
| IMG_Deira_04 | 1620 × 1080 / 403,792 | 480 / 30,886; 960 / 92,120 |
| IMG_Deira_05 | 1980 × 1080 / 273,380 | 480 / 15,626; 960 / 37,426 |
| IMG_Deira_06 | 1980 × 1080 / 412,368 | 480 / 21,528; 960 / 56,616 |

The eight original gallery sources total 3,654,164 bytes. Selecting the smallest new variants totals 267,268 bytes (about 93% less). Actual downloads depend on viewport, pixel density and browser caching; the 640px hero was selected at the tested mobile viewports with DPR 1, and the 1800px variant on desktop. This is an asset-size comparison, not a measured Core Web Vitals claim.

## Commercial/content issues requiring owner confirmation

Commercial terms were preserved as requested:

- The visible “Limited-time Offer valid until September 2026” banner has expired as of October 18, 2026. Its wording remains; only its mobile layout changed. Confirm replacement copy or removal before using it as a current promotion.
- Cards show AED 180 monthly with a first-month 10% offer; AED 504 for 3 + 1 months; AED 770 for 6 + 2 months; and AED 1,250 for 12 + 3 months. Each adds 5% VAT at checkout. No prices, durations, discounts or Stripe URLs were changed.
- The visible FAQ and FAQPage schema derive from the same array and match exactly. Both still describe AED 770 for 6 + 2 months as a “confirmed” current offer, conflicting with the expired campaign banner. Neither mentions the cards' additional 5% VAT.
- The FAQ/schema also claim Tabby/Tamara acceptance and 30% FAZAA discount. The membership cards do not explain availability, eligibility or whether discounts combine. These terms cannot be confirmed from the repository; no payment session was opened.
- General group-class copy should be read alongside plan exclusions: monthly and 3-month cards exclude group classes; 6- and 12-month cards include them. All cards exclude personal training. Do not infer that these services are included in every membership.
- Existing training-rate offers also have no validity dates. Their current availability is unverified and their prices/terms remain unchanged.
- The shared footer's existing “Join Now” button has no action, and its Deira “Membership Plans” link returns to the branch route without a section fragment. These shared-footer issues remain outside this focused hero change; the new hero membership anchor works.

These changes improve landing-page usability and local relevance. They cannot guarantee a particular Google Ads Quality Score or Ad Rank. Budgets, bidding, conversion goals, Get Directions and Store Visits settings were not changed.
