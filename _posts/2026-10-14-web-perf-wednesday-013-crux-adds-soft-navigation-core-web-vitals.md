---
layout: post
title: "Web-Perf Wednesday 013 – CrUX Adds Soft-Navigation Core Web Vitals"
date: 2026-10-14 12:00:00 +0100
categories:
  - Web Performance
tags:
  - Core Web Vitals
  - SPAs
  - RUM
show_taxonomy: true
main: ""
meta: "CrUX adds experimental Core Web Vitals for SPA soft navigations, while Firefox and Safari improve cache evidence, image delivery, and rendering."
---

A lot has changed since last Wednesday, and this week’s strongest development
takes SPA measurement from a browser capability into public field data. CrUX
now exposes experimental LCP, INP, and CLS variants that include soft
navigations, giving teams a first view of how real SPA journeys differ from the
hard-navigation numbers they’ve reported for years. Firefox 158 also improves
cache evidence and adds JPEG XL support, while Safari Technology Preview 254
fixes several costly browser behaviours. The immediate job is to establish a
clean comparison before the experimental data graduates.

## CrUX Adds Soft-Navigation Core Web Vitals

The September 2026 Chrome UX Report (CrUX) release adds three experimental
metrics that combine hard and soft navigations: Largest Contentful Paint (LCP),
Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS). They’re
available in [BigQuery, the CrUX API, and the CrUX History
API](https://web.dev/blog/crux-experimental-soft-navs/), with destination URLs
receiving their own soft-navigation data when they meet the ordinary CrUX
eligibility rules.

This continues the [native SPA measurement
work](/2026/08/web-perf-wednesday-003-native-spa-metrics-have-arrived/) that
reached stable Chrome in July. Previously, CrUX treated an SPA session as one
long page: it recorded the initial load, attributed the session’s interactions
to that page, and accumulated layout shifts across the document’s lifetime.
The experimental series treats a recognised route change as another view, so a
product listing, product detail, basket, and checkout can each contribute their
own metrics without loading another HTML document.

The headline figures move enough that teams need to keep the two series
separate. In the [September release
notes](https://developer.chrome.com/docs/crux/release-notes/), the share of
origins with good LCP rises from 68.3% in the stable data to 72.1% when soft
navigations are included. Good CLS rises from 81.7% to 85.1%, good INP from
85.4% to 87.4%, and the share passing all three Core Web Vitals from 55.9% to
59.5%.

Those increases describe a different measurement population. Follow-up views
often reuse code and assets from the initial load; INP is assessed per view
instead of retaining the slowest interaction from an entire SPA session; and
CLS is reset for each recognised navigation. Google says around 70% of origins
have little or no soft-navigation traffic, while 35–42% of the top 1,000 sites
use soft navigations for more than half of their page views. The overall shift
is concentrated among large, heavily used SPAs.

Google’s stable Core Web Vitals remain unchanged while the experimental series
is evaluated. It currently aims to graduate the metrics in May 2027, subject to
feedback, and says Search Console will switch to the new data once they
graduate. That gives teams a useful comparison period rather than a reason to
wait.

Start by finding the routes and devices whose experimental and stable
percentiles diverge, then compare them with the navigation model in your RUM
tool. Record which dashboards, alerts, targets, and commercial reports still
use hard-navigation-only data. [CrUX Vis](https://cruxvis.withgoogle.com/) now
shows the experimental series, so even teams without a BigQuery pipeline can
inspect the difference. A careful [RUM measurement review](/consultancy/) can
then show whether the movement reflects faster follow-up views, shorter metric
lifecycles, newly visible routes, or a mismatch between native and
vendor-defined navigations.

## Firefox Exposes Cache Delivery in Resource Timing

[Firefox 158](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/158)
adds support for `PerformanceResourceTiming.deliveryType`. Its initial
implementation reports `cache` when a resource came from cache, giving RUM and
diagnostic code an explicit signal instead of relying only on transfer sizes
and timing heuristics.

The property is deliberately broader than a cache-hit boolean: the API also
defines `navigational-prefetch`, while an empty string means that none of its
known delivery types apply. Firefox currently supports `cache`, so preserve the
raw value and browser version rather than translating every empty value into a
network miss. A [caching investigation](/performance-audits/) can now compare
Firefox’s declared delivery type with response headers, transfer sizes, and CDN
logs, rather than treating any single field as proof of the whole path.

## Firefox Enables JPEG XL by Default

The same Firefox release enables JPEG XL by default and adds `image/jxl` to the
browser’s image `Accept` header. Image services that negotiate formats from
that header may therefore start returning a different asset to Firefox 158
without an application release.

Check the actual `Content-Type`, encoded size, decode behaviour, and LCP rather
than assuming a newer format is automatically the quickest choice. If a CDN or
origin selects the response from `Accept`, make sure the cache key and `Vary`
handling keep formats separate, and retain an ordinary fallback for older
Firefox versions. This is a browser-led delivery change with a clear before-
and-after point, which makes it straightforward to test on representative
images before widening the rollout.

## Safari Removes Several Sources of Browser Work

[Safari Technology Preview
254](https://webkit.org/blog/18420/release-notes-for-safari-technology-preview-254/)
fixes cross-origin stylesheets without CORS never being reused from the parsed
stylesheet cache. It also removes unnecessary style resolution for
`::before` and `::after` rules that can’t generate content, avoids a slower text
measurement path for synthetic bold, and fixes deeply nested column flex
layouts whose percentage `flex-basis` could make layout time grow
exponentially and freeze the page.

These are Technology Preview fixes, so they don’t yet describe the stable
Safari population. They are useful comparison points for expensive Safari
traces, particularly sites with cross-origin CSS, broad pseudo-element resets,
synthetic font weights, or nested flex layouts. Reproduce the journey in stable
Safari and Technology Preview before removing an application workaround; a
[browser-performance review](/performance-audits/) should separate a WebKit fix
from improvements the site still needs across every browser.

## Need Help Comparing SPA Field Data?

If the experimental CrUX series changes your SPA’s LCP, INP, CLS, or overall
assessment, I can help work out which routes entered the population, how the
metric lifecycle changed, and whether your RUM provider is describing the same
navigations as Chrome. We can also preserve a clean comparison with the
hard-navigation series before dashboards and targets move across.

You don’t need a finished migration plan. A CrUX URL, a RUM chart, or one route
whose numbers suddenly make more sense is enough to begin. If you’d like a
second pair of eyes on the change, [get in touch](/contact/).

{% include web-perf-wednesdays.md %}
