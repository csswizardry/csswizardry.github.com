---
layout: post
title: "Web-Perf Wednesday 005 – RUM Needs More Than a Percentile"
date: 2026-08-19 12:00:00 +0100
categories: Web Development
meta: "LUX Sidecar adds context to RUM, while browser-tool fixes show why measurement conditions and small debugging details matter."
---

There’s more to work with than there was [last
week](/2026/08/web-perf-wednesday-004-a-quiet-week-is-time-to-investigate/),
although the useful changes are less about new headline metrics than the context
around them. I released a small SpeedCurve companion that keeps more of that
context alongside RUM data, WebKit fixed a developer-tool setting that could
change the request under inspection, and browser work made two small but useful
parts of debugging and delivery less awkward. This week is really about making
the evidence easier to explain.

## RUM Needs Context It Can Keep

I released [LUX
Sidecar](/2026/08/introducing-lux-sidecar/) this week: a small, independent
plugin that runs alongside SpeedCurve’s LUX agent and sends extra custom data
through its [`LUX.addData()`
API](https://support.speedcurve.com/docs/rum-js-api). It needs an existing
SpeedCurve RUM account and doesn’t replace the normal LUX snippet; its job is to
retain some of the browser and navigation context that helps explain the
measurements SpeedCurve already collects.

That context includes the browser’s reported round-trip time and downlink,
cache state, protocol, content encoding, service-worker involvement, bfcache or
prerender use, and a handful of additional timings such as Time to Last Byte
(TTLB) and Unattributed Navigation Overhead (UNO). Browser support varies, so
Sidecar feature-detects each value and omits what isn’t available rather than
turning missing evidence into a misleading zero.

The distinction between metrics and dimensions is particularly useful here.
TTLB and UNO are values we can chart; cache state, protocol, and service-worker
involvement describe the page views we want to compare. An origin-level p75 can
tell us that performance moved, but it can’t tell us whether the slower visits
crossed a high-latency connection, transferred an uncached document, or waited
for a service worker to start.

None of those dimensions supplies a diagnosis on its own. A high reported RTT
doesn’t absolve the application, a zero-byte transfer isn’t a complete cache
taxonomy, and `nextHopProtocol` may describe a connection to an intermediary
rather than the origin. Their value is in turning one broad population into
comparisons we can test. If TTLB rose only for uncached documents, or TTFB looks
poor mainly among high-RTT visits, we have a much better place to begin.

For teams already using SpeedCurve, the practical work is to create the custom
metrics and dimensions with the correct types, deploy Sidecar after LUX, and
record the script version with release annotations. Start with a question the
current dashboard can’t answer rather than enabling every value because it is
available. A careful [RUM measurement review](/consultancy/) should add enough
context to separate useful cohorts while keeping the dashboard comprehensible
to the people who need to act on it.

The broader point applies well beyond this plugin. Performance data is rarely
short of numbers; it is usually short of the delivery, device, navigation, and
release context that explains why those numbers differ. Collecting that context
at the same time as the page view is considerably easier than trying to
reconstruct it once an aggregate graph has moved.

## Safari’s ‘Ignore Cache’ Was Changing Requests

[Safari Technology Preview 250](https://webkit.org/blog/18191/release-notes-for-safari-technology-preview-250/)
fixed Web Inspector’s <cite>Ignore Cache</cite> setting overwriting a
page-authored `Cache-Control` request header. As I [explained in more
detail](/2026/08/when-safaris-ignore-cache-ignored-cache-control/), WebKit could
bypass its local resource cache _and_ replace the header the application meant
to send with `no-cache`.

The fix preserves an existing request header while retaining WebKit’s internal
cache-bypass policy. That matters when an origin, CDN, or shared cache responds
differently to `no-cache`: the debugging condition could otherwise change the
behaviour being investigated. The release note establishes the fix in
Technology Preview 250, not a particular stable Safari version, so record the
browser and Inspector settings in caching tests and keep cold-, warm-, and
disabled-cache measurements separate. A [cache-behaviour
investigation](/performance-audits/) needs the request that the application
actually made.

## DevTools’ Request Numbers Move Left

In June, I [reported that Chrome DevTools’ optional ‘Request #’
column](https://issues.chromium.org/issues/525848667) appeared after ‘Name’ in
the Network panel even though columns couldn’t be rearranged, and recommended
pinning the index first. Chromium reproduced the behaviour, the DevTools team
agreed with the change, and the linked implementation was merged on 20 July.

The issue’s verifier says the fix worked in Canary 152.0.7962.0, where enabling
the column put it in position one. However, the public issue is still marked
‘In Progress (Accepted)’, and the evidence does not establish a stable release,
so it would be premature to call this shipped generally. It is a small change,
but a useful one: request numbers are much easier to scan and discuss when the
index sits at the edge of the table rather than after a wider column such as
‘Name’.

## Safari Begins Streaming Fetch Uploads

Technology Preview 250 also adds initial support for using a `ReadableStream`
as a `fetch()` request body, together with the required `duplex` option on
`Request`. This could eventually let generated or large request bodies begin
uploading as their data becomes available instead of waiting for the complete
body.

‘Initial’ is doing important work. The [underlying WebKit
change](https://github.com/WebKit/WebKit/commit/0a676123bd679af5b6d5f7c9be6e967b4437fab3)
describes follow-up work and limitations around service workers and networking
backends. Treat this as an interoperability signal to test, not a stable
cross-browser foundation: exercise the real protocol, redirects, cancellation,
server behaviour, and any service-worker path before changing an upload
architecture.

## Need Help Adding Context to Your RUM?

If a RUM graph tells you that performance changed but not why, I can help work
out which navigation, delivery, device, and release dimensions would make the
data useful. That may mean adding carefully chosen context, checking whether a
debugging tool altered the conditions, or designing comparisons that separate a
real product regression from a change in the population.

The aim isn’t a dashboard with more fields; it is evidence that leads to a
decision with less guesswork. If your percentiles are accurate but still leave
the team arguing about the cause, [get in touch](/contact/).

{% include web-perf-wednesdays.md %}
