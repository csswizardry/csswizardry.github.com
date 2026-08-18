---
layout: post
title: "Introducing LUX Sidecar: Your SpeedCurve Companion"
date: 2026-08-18 11:30:00
categories: Web Development
main: ""
meta: "LUX Sidecar is a small SpeedCurve RUM plugin that adds browser and navigation context to your real-user performance data."
faq:
  - question: "What is LUX Sidecar?"
    answer: "LUX Sidecar is a small, independent SpeedCurve RUM plugin that adds browser-derived network, navigation, delivery, and timing data to SpeedCurve through its LUX.addData() API."
  - question: "Do I need a SpeedCurve account to use LUX Sidecar?"
    answer: "Yes. LUX Sidecar complements SpeedCurve LUX rather than replacing it, so you need a SpeedCurve RUM account and the standard LUX snippet on your site."
  - question: "Is LUX Sidecar zero-config?"
    answer: "The lux-sidecar.js file needs no runtime configuration, but you still need to create the corresponding custom metrics and dimensions, with the correct types and variable names, in SpeedCurve."
  - question: "How is LUX Sidecar different from Obs.js?"
    answer: "Both read browser context, but Obs.js makes that context available to the current page so it can adapt its experience; LUX Sidecar sends performance context to SpeedCurve so you can segment, chart, and investigate RUM data."
---

I’ve built a small, independent [SpeedCurve](https://www.speedcurve.com/) RUM
plugin called **LUX Sidecar**. It sits alongside SpeedCurve’s LUX agent and
adds browser and navigation context to each page view: network conditions,
cache state, protocol, compression, service worker involvement, navigation
overhead, and more.

It is, quite literally, a sidecar. LUX still does the driving; Sidecar brings
along a little more information for the journey.

I should make one requirement clear from the outset: **LUX Sidecar is a
SpeedCurve plugin, which means you need a SpeedCurve RUM account to use it.**
It isn’t a standalone analytics product, and it doesn’t replace the normal LUX
snippet. It complements an existing SpeedCurve setup by sending extra custom
data through the [`LUX.addData()`
API](https://support.speedcurve.com/docs/rum-js-api).

I adore SpeedCurve. I’ve used it for years, recommend it constantly, and rely
on it for a huge amount of my client work. Over time, though, I found myself
frequently complementing its data with observations of my own: was this page
served from cache? Was the user on an unusually high-latency connection? Did a
service worker intercept the navigation? How much of Time to First Byte (TTFB)
couldn’t be attributed to the phases the browser exposed?

These weren’t replacements for the measurements SpeedCurve already gave me;
they were the surrounding facts that helped me interpret them. After repeating
that work across enough projects, it became obvious that the useful, portable
parts belonged in one small tool.

That tool is [LUX
Sidecar](https://gist.github.com/csswizardry/6dd60f7536835d9c42ff05efd1b75a98).

## Performance Data Needs Context

Real User Monitoring (RUM) is valuable precisely because it shows us what
happened to real page views in the wild. That also makes the data untidy. Two
visitors can request the same page, receive the same code, and have markedly
different experiences because the conditions around those requests were
different.

One may have loaded the document from a local cache while the other crossed a
high-latency mobile connection. One may have negotiated [HTTP/3](https://www.rfc-editor.org/rfc/rfc9114.html) and [Brotli](https://www.rfc-editor.org/rfc/rfc7932.html) while
the other reached an intermediary over [HTTP/2](https://www.rfc-editor.org/rfc/rfc9113.html) and [Gzip](https://www.rfc-editor.org/rfc/rfc1952.html). One may have performed
a conventional navigation while the other restored the page from the
[back/forward cache (bfcache)](https://html.spec.whatwg.org/dev/browsing-the-web.html#note-bfcache) or activated a prerendered document.

If all we look at is a percentile, those page views disappear into the same
line. The line remains useful, but it can’t explain itself.

Sidecar adds some of that explanation. Its data falls broadly into three
groups:

* **User and connection context**, including the browser’s estimates for
  [round-trip time and downlink](https://wicg.github.io/netinfo/), the user’s [Data Saver preference](https://wicg.github.io/netinfo/), and the
  proposed [CPU performance tier](https://wicg.github.io/cpu-performance/) where available.
* **Navigation and delivery context**, including [cache status](https://www.w3.org/TR/resource-timing/#dom-performanceresourcetiming-transfersize), protocol,
  content encoding, [response status](https://www.w3.org/TR/resource-timing/#dom-performanceresourcetiming-responsestatus), [service worker involvement](https://www.w3.org/TR/service-workers/), bfcache
  restoration, and [prerendering](https://wicg.github.io/nav-speculation/prerendering.html).
* **Additional measurements**, including [service worker startup time](https://www.w3.org/TR/resource-timing/#dom-performanceresourcetiming-workerstart), HTML
  compression delta, Unattributed Navigation Overhead (UNO), and Time to Last
  Byte (TTLB).

The point isn’t to collect trivia, but to turn a vague question such as <q>why
did this group of visits get slower?</q> into a set of things we can actually
test.

If TTLB rises only for uncached documents, we have a much more useful lead. If
TTFB appears poor mainly on page views with high round-trip time, we should be
careful not to diagnose all of that delay as slow application code. If
prerendered visits have unusual raw navigation timings, we can segment them
before drawing a conclusion about what users saw after activation.

Sidecar does not answer every question, but it gives us better ones.

## Dimensions Explain Metrics

One particularly useful distinction in SpeedCurve is the difference between a
metric and a dimension.

A **metric** is something we measure: 480&nbsp;ms of UNO, 1.7&nbsp;seconds to the
last byte, or a compression delta of 0.72. A **dimension** describes the page
view: cache hit or network transfer, [`h2`](https://www.rfc-editor.org/rfc/rfc9113.html) or [`h3`](https://www.rfc-editor.org/rfc/rfc9114.html), prerendered or conventional,
service worker or no service worker.

The two become much more useful together. TTLB tells us _how long_; protocol,
cache state, and content encoding help us ask _under which conditions_.
SpeedCurve dimensions can then filter or compare the corresponding RUM data,
while [custom metrics](https://support.speedcurve.com/docs/metrics) can be
plotted and monitored like the rest of the measurements in a dashboard.

This is also why not every number should automatically become a numeric
metric. An HTTP response status or CPU tier may be numeric at the API boundary,
but it is usually more useful as a category for segmentation. `404` isn’t
twice as much response as `202`, and CPU tier `4` doesn’t describe current CPU
load. Types should follow meaning, not JavaScript’s opinion of the value.

Used well, dimensions let us compare populations without pretending that the
label itself is a measurement. For example, we might compare:

* cached and uncached navigations;
* service-worker and network-handled requests;
* [Brotli-](https://www.rfc-editor.org/rfc/rfc7932.html), [Gzip-](https://www.rfc-editor.org/rfc/rfc1952.html), and [Zstandard-encoded HTML](https://www.rfc-editor.org/rfc/rfc8878.html);
* prerendered and non-prerendered page views; or
* different browser-reported connection and CPU tiers.

This is the kind of analysis I was already doing by hand. Sidecar makes the
underlying context repeatable and available in the same place as the rest of
the RUM data.

## A Few Measurements Worth Knowing

LUX Sidecar collects more than I want to catalogue here — the [README contains
the complete and current
reference](https://gist.github.com/csswizardry/6dd60f7536835d9c42ff05efd1b75a98) — but
a handful demonstrate what the tool is for.

### Unattributed Navigation Overhead

[Unattributed Navigation Overhead
(UNO)](https://calendar.perfplanet.com/2024/uno/), a term coined by Tim
Vereecke, describes the part of initial-document TTFB that remains after we
subtract the redirect, DNS, connection, and request-to-response-start phases
that [Navigation Timing](https://w3c.github.io/navigation-timing/) exposes.

It is a residual, not a diagnosis. A high UNO value tells us that the browser
observed time that it couldn’t assign to those named phases; it does not, by
itself, tell us what caused that time. Cross-origin redirect latency is one
common source because browsers may conceal parts of a redirect chain, but the
correct response to UNO is investigation, not assumption.

This is exactly the sort of measurement that benefits from living next to the
rest of a navigation’s data. We can chart it, segment it, and see whether it
moves with TTFB rather than trying to reconstruct the missing time after the
fact.

### Time to Last Byte

TTFB marks the arrival of the first response byte. That is an important
milestone, but a document isn’t finished arriving at its first byte. Time to
Last Byte (TTLB) measures from navigation start until [`responseEnd`](https://www.w3.org/TR/resource-timing/#dom-performanceresourcetiming-responseend), giving us
the complete initial-document response time.

The gap between TTFB and TTLB can matter when the HTML response is large,
[compression](https://www.rfc-editor.org/rfc/rfc9110.html) is ineffective, throughput is constrained, or the server streams
the document over time. Sidecar doesn’t attempt to explain the gap on its own;
it makes the end of the response visible so we can compare it with the other
context available for that page view.

### Cache, Compression, and Protocol

Sidecar records whether the navigation transferred bytes, the
application-layer protocol reported by the browser, and the document’s [content
encoding](https://www.rfc-editor.org/rfc/rfc9110.html) where supported. It also calculates the proportion of HTML body bytes
saved by content encoding.

These values need careful names and equally careful interpretation. A
zero-byte transfer is a useful cache heuristic, not a complete cache taxonomy.
[`nextHopProtocol`](https://www.w3.org/TR/resource-timing/#dom-performanceresourcetiming-nexthopprotocol) may describe a connection to an intermediary rather than the
origin. [`contentEncoding`](https://www.w3.org/TR/resource-timing/#dom-performanceresourcetiming-contentencoding) is not yet available everywhere. Sidecar
feature-detects what it can, omits what the browser doesn’t expose, and leaves
the analysis to us.

That last part is important: missing data is expected. Browser APIs aren’t
uniformly supported, and protected timing information should remain protected.
An absent value is not a failed page view, and we shouldn’t silently turn it
into zero.

## How LUX Sidecar Relates to Obs.js

If you’re familiar with my [Obs.js](https://csswizardry.com/Obs.js/) project,
some of this will sound familiar. Both tools read signals exposed by the
browser, and there is deliberate overlap around connection information such as
round-trip time, downlink, and Data Saver.

They are different tools with different jobs.

Obs.js is concerned with the experience the current page should deliver. It
turns browser context into CSS classes and a `window.obs` object so a site can,
for example, avoid rich media on a constrained connection or react to a
conservation preference. It can inform what the page _does_ next.

LUX Sidecar is concerned with how we understand the page view afterwards. It
adds raw or lightly derived values to SpeedCurve so we can chart, filter,
segment, and investigate them alongside our RUM metrics. It does not add
adaptive classes, choose a delivery mode, or make decisions about the current
experience.

In short, Obs.js helps a page respond to context; LUX Sidecar helps SpeedCurve
retain context. They overlap because they look at some of the same browser
signals, but neither supersedes the other and neither requires the other.

## The Script Is Zero-Config; SpeedCurve Isn’t

The implementation is intentionally boring (which is meant as a compliment).
Once the standard LUX snippet has made `window.LUX.addData()` available,
`lux-sidecar.js` reads the supported browser values and passes them to
SpeedCurve. If LUX isn’t present, Sidecar remains inert. There is no
initialisation call, options object, build step, or site-specific callback.

In that sense, **`lux-sidecar.js` is zero-config**.

However, zero-config JavaScript does not mean zero setup. You still need to
create the relevant custom data in **SpeedCurve » Settings » Custom Data**, use
Sidecar’s compact beacon keys as the variable names, and choose the appropriate
[metric](https://support.speedcurve.com/docs/metrics) or
[dimension](https://support.speedcurve.com/docs/dimensions) for each value.
RTT, service worker startup, UNO, and TTLB are timing metrics collected in
milliseconds; downlink and compression delta are numeric metrics; categorical
and boolean values such as protocol, cache state, response status, and CPU tier
usually belong in dimensions.

Sidecar can put `uno|480` into a LUX beacon, but it can’t decide on your behalf
how your SpeedCurve account should present it. The SpeedCurve-side definition
supplies the human-readable name, type, unit, and role that turn the raw pair
into something useful in charts and dashboards.

I’ve documented the exact script order, current beacon keys, browser caveats,
and complete set of values in the [LUX Sidecar
README](https://gist.github.com/csswizardry/6dd60f7536835d9c42ff05efd1b75a98).
That is the place to go when you install it; this article is intended to explain
why you might want to.

The compact, almost pre-minified beacon keys are an unfortunate
necessity — SpeedCurve limits the combined custom-data names and values in
a page view, so Sidecar keeps readable names in its source while spending fewer
characters in the beacon. You configure the small key in SpeedCurve, then give
it a useful label in the interface.

## Small, Independent, and Deliberately Uneventful

LUX Sidecar is a third-party plugin, not an official SpeedCurve product. It is
a classic browser script with no dependencies beyond the LUX API it is built
to complement, and it only reports values the browser makes available.

My aim is for Sidecar to feel like one extra lens on a tool I already adore. It
takes the small observations I kept making around SpeedCurve data and makes
them consistent, queryable, and shareable. Some page views are slow because of
our code; some are slow because of the conditions in which that code ran. Good
RUM work needs to be able to tell the difference.

If you already use SpeedCurve RUM and find yourself asking for more context
around the numbers, [give LUX Sidecar
a try](https://gist.github.com/csswizardry/6dd60f7536835d9c42ff05efd1b75a98).
Set up its custom metrics and dimensions carefully, and let the sidecar carry
a little more evidence.
