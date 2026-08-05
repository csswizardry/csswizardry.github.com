---
layout: post
title: "Web-Perf Wednesday 001 – SPAs Are Finally Becoming Measurable"
date: 2026-07-15 02:00:00 +0000
categories: Web Development
main: ""
meta: "Chrome 151 brings native soft-navigation measurement closer, alongside better redirect timing, revealing CrUX data, and more trustworthy browser tooling."
---

## Welcome to Web-Perf Wednesdays!

For a while now, I’ve been curating my own weekly web performance and web
platform reading list through [RSS](/feed.xml), [newsletters](/newsletter/), and
a ChatGPT scheduled task. I decided to write my favourite bits up into
<cite>Web-Perf Wednesdays</cite>, a curated pick of the most pertinent and
interesting developments that week.

<small>The digest is curated on a Monday and written up in time for the
Wednesday. Some drift may appear in the interim which I will endeavour to
correct, but please forgive any slightly-off timings.</small>

## This Week

This week’s most consequential performance news is not a faster API or a new
optimisation trick. It is a change in what the browser can see. Chrome is
getting ready to treat certain Single-Page Application (SPA) route changes as
measurable performance events, which begins to close one of field monitoring’s
longest-standing blind spots. Better visibility is welcome, but the transition
will make otherwise familiar dashboards surprisingly easy to misread already.

## Chrome 151 Makes SPA Journeys Measurable

Chrome 151 Beta introduces two new Performance Timeline entry types:
[`soft-navigation` and
`interaction-contentful-paint`](https://developer.chrome.com/blog/chrome-151-beta).
Together, they give the browser a way to recognise an interaction-driven route
change, establish a new timing origin, and report contentful paints associated
with the updated view.

This matters because the browser and the user have traditionally had very
different ideas of what constitutes a page. A browser sees an SPA as one long
document; the person using it sees a product listing, a product page, a basket,
and a checkout. Most RUM tools bridge that gap with framework hooks, custom
timers, mutation heuristics, or proprietary virtual-page APIs. Those approaches
can be useful, but they do not provide one shared definition that every site
and monitoring product can rely on.

Chrome’s proposed definition is deliberately based on observable user
experience. A qualifying soft navigation needs a user interaction, a visible
URL change, and a visible paint. The [full soft-navigation
guidance](https://developer.chrome.com/docs/web-platform/soft-navigations)
also makes clear that false positives and false negatives remain possible;
framework authors and RUM vendors will still need to test how their own ideas
of a route align with the browser’s.

The immediate opportunity is much better route-level evidence. A respectable
initial LCP can conceal a painfully slow catalogue transition, account screen,
or basket update. Native entries should make those experiences easier to
identify and compare without every organisation inventing its own measurement
model.

The immediate risk is a measurement discontinuity. One document may begin to
produce several metric lifecycles, while an existing RUM integration continues
to emit its own virtual pages. Route-level and initial-load LCP might appear in
one percentile; the same transition might be counted twice; interactions near
a route boundary might move between populations. None of those failures need
to look obviously broken. The dangerous result is a plausible graph whose
meaning changed underneath it.

This is also a measurement launch, not an announcement that Google Search will
immediately assess every SPA route as a separate page. Conflating those two
ideas would create urgency for the wrong reason. The sensible reason to prepare
is that product teams and monitoring vendors can now observe experiences that
were previously awkward to measure consistently. That evidence can improve
engineering priorities long before it has any bearing on search policy.

Before adopting the new entries, run them alongside the existing
instrumentation. Record the route, previous route, browser version,
application release, and measurement-library version, then compare which
transitions each model detects. That kind of [SPA measurement
work](/consultancy/) is less about collecting another metric and more about
protecting every decision already built on the old one.

## Redirect Time Becomes Easier to Assign

Chrome 151 also adds an [opt-in for cross-origin redirect
timing](https://developer.chrome.com/blog/chrome-151-beta). An origin involved
in a redirect can allow the destination to measure that part of the journey,
giving teams better evidence for latency hidden inside authentication, SSO,
campaign tracking, localisation, or payment hand-offs.

The cooperation requirement is important: this does not make every opaque
redirect chain transparent overnight. Where both origins are under your
control, however, it can turn ‘the journey is slow’ into a much more useful
account of which system introduced the wait. Start with commercially important
entry points and ask external providers whether they intend to support the
mechanism.

## CrUX’s Android Regression Needs Context

At the start of this week, the latest published [Chrome UX Report release was
May 2026](https://developer.chrome.com/docs/crux/release-notes/). Google
reported an Android-heavy regression without a definitive cause: good LCP fell
to 68.6%, good INP to 86.6%, and the share of origins passing all Core Web
Vitals to 55.9%.

That wider movement changes the investigation, but it does not excuse a
site-specific decline. Compare mobile and desktop, important templates, browser
versions, traffic composition, and release dates before assigning a cause. A
[performance audit](/performance-audits/) should establish whether a site moved
with the ecosystem or materially underperformed it; the aggregate headline is
context, not a controlled experiment.

## Better Tools Still Need Expert Judgement

[Chrome DevTools 149](https://developer.chrome.com/blog/new-in-devtools-149)
fixed Live Metrics so Core Web Vitals tracking remains pinned to the primary
frame’s execution context. Previously, dynamic iframe churn could reset the
metrics — a particularly unhelpful behaviour on pages full of adverts, embeds,
consent tools, or payment frames.

Meanwhile, WebKit has introduced a [Safari MCP
server](https://webkit.org/blog/18136/introducing-the-safari-mcp-server-for-web-developers/)
that can expose DOM state, network requests, screenshots, console output, and
in-page performance data to compatible agents. It should reduce mechanical
evidence-gathering, but Safari Technology Preview on macOS is not a substitute
for physical-device testing or browser-process diagnosis. Tooling can make a
good investigation faster; it cannot make an incomplete investigation sound.

## Need Help with SPA Measurement?

If your application already has virtual pages, custom route timers, or
vendor-specific SPA instrumentation, Chrome’s new model deserves a careful
parallel trial. I can help compare route detection, attribution, sample volume,
and dashboard semantics; identify where the old and new populations disagree;
and leave you with reporting that remains intelligible through the migration.

The useful outcome is not simply ‘support for Chrome 151’. It is confidence
that a movement in LCP, CLS, or INP still means what everyone thinks it means.
If that is a problem you are about to inherit, [get in touch](/contact/).
