---
layout: post
title: "Web-Perf Wednesday 006 – Faster Browser Releases Change Your RUM Population"
date: 2026-08-26 12:00:00 +0100
categories: Web Development
main: ""
meta: "Chrome and Firefox are moving to two-week releases, making browser cadence part of how teams interpret RUM and plan performance testing."
---

Quite a lot has changed since last week, but the browser calendar is the one
most likely to alter performance data without anybody deploying a thing.
Chrome and Firefox are both preparing to release major versions every two
weeks, Chrome DevTools can now show Core Web Vitals for soft navigations in
Live Metrics, and my latest field-data investigation exposes time inside TTFB
that our usual breakdowns can’t explain. Taken together, this is another week
where understanding the population matters as much as reading the percentile.

## Faster Chrome Releases Change Your RUM Population

[Chrome will move from a four-week to a two-week release
cycle](https://developer.chrome.com/blog/chrome-two-week-release) from Chrome
153, whose Stable release is scheduled for 8 September. A new Beta and Stable
version will arrive every two weeks on Desktop, Android, and iOS; Dev and
Canary are unchanged, while Extended Stable keeps its existing eight-week
cycle. Chrome also says each Beta will precede Stable by three weeks.

The schedule is Chrome’s; the RUM implications are my own and are something I’d
expect teams to test. Browser version is about to become a faster-moving RUM
dimension.

Segmenting by exact Chrome major will probably produce smaller, shorter-lived
cohorts, particularly on lower-traffic routes or when browser, device, country,
and experiment dimensions are combined. A 28-day chart will contain more
release boundaries, and a movement that appears between two dates may reflect
a different mixture of Chrome versions rather than a product release. Extended
Stable will add a longer-lived cohort of managed users to that mixture.

This also changes how teams should compare before-and-after data. A fortnightly
cadence can put two Chrome milestones inside one reporting window, so a
browser-specific p75 may be dominated by whichever version had enough samples
on that day. Set minimum sample and completion thresholds before slicing by
major, and fall back to a broader Chrome cohort when the exact-version view is
too thin. Otherwise, the segmentation intended to explain one movement can
manufacture a second, noisier chart.

None of this makes a percentile wrong; it changes the questions needed to
interpret it. If LCP moves while application and delivery releases remain
quiet, compare Chrome-major distribution, sample count, device mix, and metric
completion before declaring a regression. Keep an unsegmented series as the
view of users’ overall experience, but retain enough browser detail to explain
why its population changed.

Release annotations will also need a named owner. With a major version every
fortnight, adding browser dates only after a graph has moved is too late. Pull
the Chrome schedule into the same release calendar used for application, CDN,
tag-manager, and RUM changes; record Beta and Stable dates; and preserve the
instrumentation version alongside each page view. A careful [RUM
strategy](/consultancy/) should let an analyst distinguish a site change from
a browser-population change without rebuilding the history by hand. Treat the
date as an annotation rather than a claim that every user updated at once;
chart the actual version share alongside it.

The three-week Beta lead time matters too. Test the real journeys and
instrumentation in Beta, including route detection, metric completion,
bfcache, and any browser-specific dimensions, rather than treating Beta as a
late compatibility check. Faster releases reduce the time between a browser
change reaching users and its effect appearing in production RUM. The calendar
now belongs in the measurement model.

## Firefox Is Moving Fortnightly Too

Mozilla has also [set out its move to a two-week Firefox release
cycle](https://blog.mozilla.org/sumo/2026/08/19/firefox-new-release-cadence-and-what-to-expect/).
Firefox 155 is due on 1 September, two weeks earlier than originally planned;
Mozilla says this doesn’t mean twice as many features, and dot releases may
still happen when needed. The [underlying
announcement](https://groups.google.com/a/mozilla.org/g/dev-platform/c/qlaQ1YSlOP8)
describes the change as an experiment for Firefox Desktop and Android.

Teams will need the same release-aware analysis for Firefox. Keep its calendar
beside Chrome’s, check whether exact major-version cohorts remain large enough
to trust, and make Beta coverage a routine part of [team performance
testing](/workshops/). The useful question isn’t merely which version a slow
visit used, but whether a release changed the make-up of visits entering the
chart.

## Soft-Navigation Vitals Reach Live Metrics

[Chrome 152 DevTools](https://developer.chrome.com/blog/new-in-devtools-152)
now reports Core Web Vitals for client-side soft navigations in the Performance
panel’s Live Metrics view by default, powered by `web-vitals` v6. That gives SPA
teams a much quicker way to inspect a route transition locally before comparing
it with RUM.

The same release notes now document the Network panel’s pinned ‘Request #’
column, which [last week](/2026/08/web-perf-wednesday-005-rum-needs-more-than-a-percentile/)
was verified only in Canary while the public issue remained in progress. Both
make routine debugging easier: one makes route-level performance visible, and
the other makes the requests behind it easier to reference. Live Metrics still
isn’t a production population, so use it to reproduce and explain field
evidence rather than as a replacement for it.

## Start Accounting for TTFB’s Missing Time

In [my new article on Unattributed Navigation
Overhead](/2026/08/uno-is-underrated/), I show how to calculate the part of
TTFB left after subtracting the redirect, DNS, connection, and
request-to-response phases exposed by [Navigation
Timing](https://w3c.github.io/navigation-timing/). In one client dataset, I
found 7,131,737 UNO observations beside only 166 visible redirects. That
doesn’t make every unexplained millisecond a hidden redirect; it shows how much
navigation time a redirect count alone can miss.

Add UNO to RUM as both a duration and an occurrence count, then segment it by
landing page, campaign, referrer, browser, and connection. When it rises, use a
[performance investigation](/performance-audits/) to reproduce representative
journeys and identify whether redirects, browser work, cache access, or another
gap explains it. A named remainder is not a diagnosis, but it stops missing
time from quietly being assigned to the server.

## Need Help Keeping Browser Releases and RUM Aligned?

If browser releases are changing the make-up of your RUM population faster than
the team can explain the graphs, I can help build a measurement model that
keeps browser, instrumentation, application, and delivery changes together. We
can check whether version cohorts are statistically useful, decide which
release dates need annotations, and test the journeys most likely to expose a
collection or attribution change.

The aim is to keep faster browser delivery from turning every unexplained RUM
movement into a product incident. If your charts are changing while your site
isn’t, [get in touch](/contact/).

{% include web-perf-wednesdays.md %}
