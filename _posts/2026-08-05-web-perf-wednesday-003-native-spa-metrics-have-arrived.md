---
layout: post
title: "Web-Perf Wednesday 003 – Native SPA Metrics Have Arrived"
date: 2026-08-05 02:00:00 +0000
categories: Web Development
main: ""
meta: "Chrome 151 and web-vitals v6 bring native SPA measurement into production, while new browser controls reshape device and third-party governance."
---

The [SPA measurement
story](/2026/07/web-perf-wednesday-001-spas-are-finally-becoming-measurable/)
has moved quickly. What was an origin trial in spring and a beta feature in July
is now arriving in stable Chrome, with Google’s reference `web-vitals` library
ready to consume it. That closes a genuine monitoring gap, but it also changes
the population behind some very familiar field metrics. More data is not
automatically more truth if the migration now quietly rewrites what the
dashboard means.

## Native SPA Metrics Need a Deliberate Migration

[Chrome 151 began its stable release on 28 July
2026](https://developer.chrome.com/release-notes/151), adding
`soft-navigation` and `interaction-contentful-paint` entries to the Performance
Timeline. Chrome can now recognise interaction-initiated, same-document route
changes, establish a new timing origin, and associate subsequent performance
data with the active route rather than only the original document.

Separately, [`web-vitals` v6 shipped on 21
July](https://raw.githubusercontent.com/GoogleChrome/web-vitals/main/CHANGELOG.md)
with support for those soft-navigation metrics when the browser provides them.
The release also caps `requestIdleCallback` waits at one second, changes
`includeProcessedEventEntries` to default to `false`, and improves reporting of
smaller INP interactions after a back/forward cache restore. Version 6.0.1
followed on 27 July with a guard for environments without
`PerformanceObserver`.

The important detail is that this is not merely a new field in an existing
event. One document may now produce several metric lifecycles. A catalogue,
product page, basket, and account area can each become observable even though
the browser never performed a traditional navigation between them. That should
reveal slow routes that an excellent initial LCP has been hiding for years.

It may also introduce double-counting and discontinuity. A RUM product could
emit its existing virtual page alongside Chrome’s native soft navigation. INP
attribution may cross a route boundary differently. A one-second idle cap may
allow busy sessions that previously failed to report to enter the dataset,
making a percentile look worse because coverage improved. A graph can move even
when the application did not.

Do not replace the production series in place. Run v5 and v6, or existing and
native route models, in parallel. Compare reporting rate per 1,000 sessions,
metric completion, browser and device mix, route detection, bfcache population,
and the distribution of interactions before comparing the headline percentile.
Ask the RUM provider whether hard and soft navigations will be combined and how
duplicate proprietary routes are prevented.

Build the comparison around user journeys, not just implementation events. A
route transition that is correctly detected but attributed to the wrong page
is technically successful and analytically useless. Keep the initiating
interaction, previous route, destination route, visibility state, and ensuing
render milestone together. Then sample sessions at the edges: fast client-side
routes, slow data-backed routes, redirects, modal-style URL changes, restored
history entries, and abandoned transitions. This is where neat aggregate
charts tend to conceal taxonomy errors.

It is also worth agreeing an explicit cutover test before beginning. For
example: native coverage is stable across supported Chrome versions, duplicate
route counts are understood, key route percentiles reconcile within an agreed
tolerance, and analysts can segment old from new collection without rebuilding
the dashboard. That makes the migration a controlled measurement change rather
than a hopeful library upgrade.

Most importantly, treat the implementation as part of the data schema. Retain
the browser, `web-vitals` version, RUM SDK, attribution build, application
release, and navigation classification. A careful [measurement
migration](/consultancy/) should leave historical comparisons intact; otherwise
the new visibility may manufacture false regressions and false wins in equal
measure.

## CPU Tiers Could Improve Device Evidence

Chrome 152 Beta includes a [CPU Performance API
proposal](https://github.com/WICG/cpu-performance) that exposes a coarse device
performance tier. It could be more useful than viewport width, user agent,
device memory, or hardware concurrency when investigating why INP and long
tasks deteriorate for certain users. Certainly, I’m working on incorportating
the working draft into [Obs.js](/Obs.js/demo/).

Treat it as a capability hint, not hardware truth. Users and administrators can
override the value, and a browser-defined cohort can change over time. Record
the tier alongside existing dimensions and test whether it explains variance
before adapting the experience. It complements [real-device performance
testing](/performance-audits/); it does not replace representative [physical
hardware](/2026/07/low-and-mid-tier-mobile-for-the-real-world-2026/).

## Allowlists Give Third-Party Inventories Teeth

Chrome 152 also introduces [Connection
Allowlists](https://github.com/WICG/connection-allowlists), through which a
server supplies authorised endpoints and the browser blocks document or worker
connections that do not match. The feature is primarily a security control,
but its performance implications are substantial.

An inventory can become an enforced contract rather than a record of whatever
happened during one audit. That demands endpoint discovery, named ownership,
staging, expiry rules, and failure testing: a vendor changing CDN or telemetry
destinations could otherwise break production. A [third-party governance
workshop](/workshops/) should connect each allowed destination to a commercial
capability and somebody authorised to retain or remove it.

## Safari Recovers from Missing Service Workers

[Safari 26.6](https://webkit.org/blog/18178/webkit-features-for-safari-26-6/)
fixes registrations whose main or imported service-worker scripts have gone
missing. Previously, the invalid registration might not be removed
automatically, preventing a replacement worker from registering and leaving an
affected user in a persistent bad state.

Retest Safari-only reports that previously required clearing site data, but do
not make browser recovery the deployment strategy. Avoid abruptly removing
worker URLs, keep migration scripts available long enough to unregister cleanly,
and record controller and worker-version state in diagnostics. A fix in Safari
reduces the trap; resilient worker deployment avoids setting it.

## Need Help Migrating to Native SPA Metrics?

If Chrome 151 or `web-vitals` v6 is about to change your monitoring, I can help
map the existing virtual-page model, run native measurement alongside it, and
work out where route detection, attribution, sample coverage, and dashboard
semantics diverge. I can also help retain the instrumentation metadata needed
to explain future movements rather than guess at them.

The goal is richer SPA evidence without sacrificing the history or trust
already invested in the current reporting. If your dashboards are about to
change population underneath you, [get in touch](/contact/).
