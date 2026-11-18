---
layout: post
title: "Web-Perf Wednesday 018 – Soft Navigations Lift the CrUX Pass Rate"
date: 2026-11-18 12:00:00 +0000
categories:
  - Web Performance
tags:
  - Web-Perf Wednesdays
  - Core Web Vitals
  - SPAs
  - RUM
  - Privacy
show_taxonomy: true
meta: "CrUX’s latest data shows how including SPA soft navigations will raise Core Web Vitals pass rates without sites suddenly becoming faster."
---

This week has brought one consequential measurement change and three
developments worth acting on. The October Chrome UX Report (CrUX) release shows
that including soft navigations would raise the share of origins passing all
three Core Web Vitals from 56.3% to 60.3%. Firefox is improving navigation
failure attribution, WPE Android can expose browser work in Perfetto, and an EU
proposal puts fresh scrutiny on personalised advertising. The CrUX change is
the one to prepare for now, because a better result can arrive without the site
itself becoming faster.

## Soft Navigations Lift the CrUX Pass Rate

The [October 2026 CrUX
dataset](https://groups.google.com/a/chromium.org/g/chrome-ux-report-announce/c/tjKgLwe7Mos)
covers 18,070,207 origins. In the current Core Web Vitals data, 68.8% of origins
have good Largest Contentful Paint (LCP), 81.6% have good Cumulative Layout
Shift (CLS), 85.2% have good Interaction to Next Paint (INP), and 56.3% pass all
three.

When the experimental metrics include Single Page Application (SPA) soft
navigations, those figures become 73.6% for LCP, 85.0% for CLS, 87.0% for INP,
and 60.3% for all three. The overall pass rate rises by four percentage points,
or 7.1% relative to the current figure. That is too large to leave as an
unlabelled step in a dashboard.

The result does not mean that SPA sites have just become quicker. As I covered
when [CrUX introduced the experimental
series](/2026/10/web-perf-wednesday-013-crux-adds-soft-navigation-core-web-vitals/),
it is counting more of the journey and dividing a long-lived document into the
views that users recognise as separate pages. Follow-up views often reuse
resources and application state from the initial load; CLS and INP also get
assessed within each recognised navigation rather than accumulating across the
whole session. The experimental population therefore answers a different
question from the hard-navigation-only series.

This month’s release makes that difference easier to diagnose. The [CrUX
APIs](https://developer.chrome.com/docs/crux/api) now expose
`experimental_first_contentful_paint_with_softnavs` and
`experimental_navigation_types_with_softnavs`, while CrUX Vis has added the
same views. First Contentful Paint (FCP) gives teams another paint milestone to
compare, and the navigation-type breakdown can show how much of the population
comes from soft navigations. BigQuery is due to receive these two additions in
the next monthly release.

Google currently [aims to graduate the experimental
metrics](https://web.dev/blog/crux-experimental-soft-navs/) in May 2027,
subject to feedback, after which Search Console is expected to use them. The
existing series remains the reported Core Web Vitals data for now, so this is a
comparison period rather than a reason to change every target today.

Pull both series for the same URLs and form factors, record the size and
direction of the difference, and find the routes that account for it. Then
check whether your RUM provider recognises the same navigations. Keep the
metric name, population, browser support, and planned change date close to the
result; a [field-data review](/consultancy/) can help connect those details to
the journeys your business actually cares about. If the number moves in May,
everyone can then tell whether the site changed or the measurement did.

## Firefox Can Name a Failed Navigation’s Destination

[Firefox 161’s beta
notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/161)
add support for `NavigationTransition.to`. Code outside the `navigate` event
handler can now inspect the `NavigationDestination` for a transition that is
still in progress, including from a `navigateerror` handler.

For SPAs, that makes failed route changes easier to attribute to the URL the
user was trying to reach. Record the destination, failure, and relevant timing
together, while keeping sensitive URL data out of telemetry. Firefox 161 is
scheduled to ship on 24 November, and the notes are still being completed, so
test the beta before making this field part of a required reporting path.

## WPE Android Traces Browser Work Alongside the System

The Igalia WebKit team has [added an ATrace
backend](https://blogs.igalia.com/webkit/blog/2026/wip-86/) to WPE Android.
WebKit trace points and signposts that previously compiled to nothing can now
appear in the same Perfetto timeline as SurfaceFlinger, input dispatch, and the
Android scheduler; WPE also calculates its compositor FPS counter while
tracing is active.

That gives teams building embedded Android web surfaces a much better way to
separate browser work from compositor, input, and scheduling delays. The build
option is enabled by default for Android, but the useful step is still to
capture a slow interaction on representative hardware and follow the work
across processes. A [performance audit](/performance-audits/) can then target
the component that actually held up the frame.

## The EU Proposes New Limits on Personalised Advertising

The European Commission has proposed a [Digital Fairness
Act](https://ec.europa.eu/commission/presscorner/api/files/document/print/en/ip_26_2407/IP_26_2407_EN.pdf)
that would restrict unfair personalised adverts and prices aimed at minors or
using sensitive data. It would also ban certain manipulative marketing tactics
and strengthen enforcement, but it is a proposal: the European Parliament and
Council still need to discuss it.

Performance teams should treat this as a prompt to map personalisation code
before the legal text settles. List which tags choose adverts or prices, which
data they use, when they run, and what they cost in bytes, CPU, and latency.
That joint view lets legal, advertising, and engineering teams change or remove
a tag deliberately if the eventual rules narrow its permitted use, rather
than discovering an undocumented dependency during implementation.

## Need Help Preparing for New Field Data?

If soft navigations change your CrUX results, I can help compare the current
and experimental populations, find the routes behind the movement, and check
whether your RUM dashboards measure the same journey. We can also annotate the
change now, before an apparent improvement reaches a stakeholder report with
the wrong explanation.

You don’t need a finished migration plan. One CrUX URL, an unexpected gap
between two charts, or a route your current RUM setup can’t explain is enough
to begin. If you’d like a second pair of eyes on it, [get in
touch](/contact/).

{% include web-perf-wednesdays.md %}
