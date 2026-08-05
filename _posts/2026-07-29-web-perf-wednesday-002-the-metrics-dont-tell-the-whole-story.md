---
layout: post
title: "Web-Perf Wednesday 002 – The Metrics Don’t Tell the Whole Story"
date: 2026-07-29 02:00:00 +0000
categories: Web Development
main: ""
meta: "CrUX’s seasonal decline, Safari 27’s user-experience fixes, richer INP attribution, and long-session third-party costs all demand better interpretation."
---

The web’s performance data got both more useful and more awkward this week. CrUX
moved backwards again, Safari described browser fixes that may improve how pages
feel without repairing their underlying architecture, and monitoring tools
continued to expose more detail than many teams know how to use. The common
thread is [interpretation](/2017/01/choosing-the-correct-average/): a metric can
be accurate while the story told about it is still completely wrong at first
glance.

## CrUX Is Context, Not an Alibi

The [June 2026 Chrome UX Report
dataset](https://developer.chrome.com/docs/crux/release-notes/) was published on
14 July and recorded another broad regression. The proportion of origins with
good LCP fell to 67.7%, good INP fell to 85.9%, and those passing all three Core
Web Vitals fell to 55.3%. CLS was the exception, edging up to 81.4%.

The more interesting change was Google’s explanation. May’s decline was
described as mostly Android-heavy, with suspicions but nothing definitive to
share. For June, Google compared the movement with the previous year, called it
seasonal, and expected the numbers to improve over the summer.

That is useful context, particularly when an origin-level dashboard moved in
the same direction, but it is not proof that nothing went wrong locally. A
release, acquisition campaign, consent change, device mix, logged-in traffic,
or new third party can all coincide with an ecosystem-wide shift. ‘The whole
web got slower’ is no more rigorous than blaming the most recent deployment.

The right comparison is not simply this month against last month. Compare the
site’s movement with the global delta, split mobile and desktop, inspect LCP and
INP separately, and look at important templates rather than relying on the
origin alone. Weekly History API data can help place release and campaign dates
inside the rolling 28-day window; without that context, an apparent recovery
may only mean the worst days are gradually ageing out.

This is where aggregate reporting should become diagnosis. If the global pass
rate fell by 1.2 percentage points and one site fell by four, the wider trend
has not explained the difference. Equally, if a site tracks the market almost
perfectly across browsers and devices, launching a frantic code investigation
may waste everyone’s time.

This discipline will become more important as Chrome 151 begins exposing the
[SPA journeys that initial-load metrics currently
miss](/2026/07/web-perf-wednesday-001-spas-are-finally-becoming-measurable/).
A dashboard may soon contain hard navigations, browser-native soft navigations,
and proprietary virtual pages, each drawn from a different browser population.
If those series are blended without qualification, a change in measurement can
masquerade as a change in the product. Browser version, navigation type, RUM
library, and instrumentation release are no longer optional debugging details;
they are part of the metric’s definition.

A useful [performance-monitoring review](/consultancy/) should therefore retain
both the site and its environment. The dashboard needs release annotations,
traffic and device composition, instrumentation versions, and a stable account
of which population each graph represents. CrUX tells us that something moved;
it rarely tells us why.

## Safari Can Hide a Jump Without Fixing It

[Safari 27 Beta adds scroll
anchoring](https://webkit.org/blog/17967/news-from-wwdc26-webkit-in-safari-27-beta/),
which adjusts the scroll position when content is inserted or removed above the
viewport. Images, adverts, comments, and lazy-loaded components should be less
likely to throw the reader away from whatever they were looking at.

That is a real user-experience improvement, but compensation is not prevention.
The document may still reflow because an image lacks dimensions or an advert
resizes; Safari is mitigating one visible consequence. Retest sticky headers,
feeds, consent UI, embeds, and programmatic scrolling, but continue fixing the
layout rather than relying on the browser to disguise it.

## INP Needs Product Context

Most teams can now say whether INP is poor. Far fewer can say which interaction
was responsible, where it occurred in the journey, and what delayed it. The
[INP optimisation guidance](https://web.dev/articles/optimize-inp) divides an
interaction into input delay, processing time, and presentation delay, but
those timings still need a product identity.

Record the component, route, interaction type, application state, experiment,
and important journey stage alongside the metric. ‘INP is 240&nbsp;ms’ identifies
a threshold problem; ‘returning customers hit 240&nbsp;ms when opening the payment
selector’ identifies work worth prioritising. Better attribution connects
browser evidence to an outcome rather than merely decorating a chart.

## Third Parties Also Age

Safari 27 includes fixes for `ResizeObserver` and `IntersectionObserver`
becoming increasingly sluggish, including an O(n²) iteration problem when many
elements were observed. That reinforces a wider third-party lesson: some costs
accumulate with page lifetime, while most synthetic audits stop after a few
seconds.

Initial bytes and startup CPU can miss repeated listeners, retained iframes,
ad-refresh loops, route-level reinitialisation, and observers that are never
disconnected. The standard advice for [loading third-party JavaScript
efficiently](https://web.dev/articles/efficiently-load-third-party-javascript)
still matters, but long-lived publishers, dashboards, trading tools, and SPAs
also need session-age testing. A [third-party performance
audit](/performance-audits/) should compare memory, tasks, frames, and observers
at initial load, after normal interaction, and after repeated route churn.

## Need Help Making Sense of Your Performance Data?

If your dashboards contain CrUX, RUM, synthetic tests, releases, experiments,
and browser-specific behaviour but still leave teams arguing about causality,
I can help turn those signals into a coherent investigation. That might mean
separating ecosystem movement from a genuine regression, enriching INP with
journey context, or testing whether a third party becomes more expensive over
the lifetime of the page.

More data is useful only when it protects the decision made from it. If your
numbers are accurate but their meaning is still uncertain, [get in
touch](/contact/).

### Previous Editions

* [Web-Perf Wednesday 001 – SPAs Are Finally Becoming
  Measurable](/2026/07/web-perf-wednesday-001-spas-are-finally-becoming-measurable/)
