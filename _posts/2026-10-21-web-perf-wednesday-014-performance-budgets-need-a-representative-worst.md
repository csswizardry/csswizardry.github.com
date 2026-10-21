---
layout: post
title: "Web-Perf Wednesday 014 – Performance Budgets Need a Representative Worst"
date: 2026-10-21 12:00:00 +0100
categories:
  - Web Performance
tags:
  - Performance Budgets
  - Measurement
  - Safari
show_taxonomy: true
main: ""
meta: "Performance budgets need a representative worst, while Safari changes identity resolution and Chrome improves module recovery and memory debugging."
---

Plenty has changed since last week, although the most useful development is a
correction to some of my own long-standing advice. A single anomalous result
can make a performance budget so generous that a serious regression still
passes, so the better starting point is a representative worst such as P90 or
P95. Elsewhere, Safari is blocking identity-resolution infrastructure, Chrome
156 can retry failed module loads, and DevTools can point directly to unused
closure variables that are retaining memory.

## Performance Budgets Need a Representative Worst

I’ve made a substantial update to [<cite>Web Performance Budgets,
Pragmatically</cite>](/2020/01/performance-budgets-pragmatically/). The original
advice was to take the worst result from a recent period and make that the
initial budget. It was simple, defensible, and much easier than inventing a
target with no idea whether a team could meet it.

Olga Loboda spotted the problem: the single worst result may be an outlier. If
Largest Contentful Paint (LCP) usually sits around 2.2 seconds but reaches 7.1
seconds once, a 7.1-second budget would allow the site to become dramatically
slower without failing. The threshold would be technically attainable and
practically useless.

The revised approach uses a **representative worst**, perhaps the 90th or 95th
percentile of the recent time series. For a dashboard that records daily P75
LCP, that could mean calculating P90 across those daily P75 values. This isn’t
changing the percentile used to assess Core Web Vitals; it is choosing a robust
point from the sequence of measurements used to set the budget.

I’ve also published [a simple Google Sheet
template](https://docs.google.com/spreadsheets/d/1cxLuF1TKxPd_32xbF4IUfmMUDytOFcLYInxr-kCE7b8/edit?usp=sharing)
that calculates the mean, median, P75, P90, P95, and P99, and suggests P90 as a
starting point. The recommendation still needs judgement. Use enough data to
cover the ordinary variation in releases, traffic, and test conditions, and
keep unlike populations separate. A synthetic mobile test, desktop RUM, and a
third-party request count shouldn’t be combined merely because they share a
dashboard.

The wider principle remains the same: a performance budget is a safeguard. It
records how bad we’re currently prepared to let a chosen metric become; as the
site improves, the budget can come down with it. If the metric regresses, the
budget stays put while the team investigates. Increasing the threshold simply
to make the check pass removes the protection it was meant to provide.

The source data should also match the place where the budget will be enforced.
If a CI check runs one fixed synthetic profile, establish its threshold from
that profile’s history. If a product team acts on field data, define the device,
geography, page type, and percentile that the alert represents. A plausible
number from the wrong population will produce plausible-looking false alarms.

Teams should recalculate the candidate value on a regular cadence, but changes
should still be reviewed rather than applied automatically. Check whether a
new value comes from an improvement, a population change, missing data, or a
different test setup. A [performance-budget review](/consultancy/) can then turn
that evidence into thresholds that are strict enough to catch regressions and
stable enough that people don’t learn to ignore them.

## Safari Blocks Identity-Resolution Infrastructure

[WebKit now says](https://webkit.org/blog/18438/blocking-identity-resolution-infrastructure/)
that Safari in iOS, iPadOS, macOS, and visionOS 27 blocks network access to
identity-resolution infrastructure at the domain level. These services can
send an email address to a third party and return an opaque identifier that is
later used for matching and targeting across sites and devices.

For teams using this class of service, Safari can now change attribution,
audience matching, and the shape of a network waterfall without any site
release. Identify the affected vendors and requests, then compare Safari with
other browsers before explaining a fall in matches or bytes as a product or
performance change. A [third-party performance audit](/performance-audits/)
should account for blocked work as well as work the page still executes.

## Chrome 156 Lets Failed Modules Retry

[Chrome 156 reached the stable
channel](https://chromereleases.googleblog.com/2026/10/stable-channel-update-for-desktop_02018666648.html)
on 20 October. Its [module-loading
change](https://chromestatus.com/release-notes/156) stops caching failed module
loads, so calling `import()` again can make a genuine retry instead of
immediately returning the earlier failure.

This gives applications a better recovery path on unreliable connections,
particularly when a route or feature is loaded on demand. Retrying still needs
to be bounded: record the first failure, wait before trying again, and report
whether recovery succeeded. A tight retry loop can replace one failed request
with repeated network and main-thread work. It is worth adding the failure and
recovery path to a [team workshop](/workshops/), rather than testing only the
successful load.

## DevTools Finds Retained Closure Variables

The latest [Chrome DevTools
update](https://developer.chrome.com/blog/new-in-devtools-november-2026/)
can detect unused closure variables retained in shared V8 execution contexts.
The Memory panel correlates closures with their `Context` objects, highlights
fields that no live closure accesses, and sorts them by memory impact.

That makes a common heap-snapshot problem much easier to investigate. A value
can be unreachable from the code path you care about yet remain in memory
because a long-lived sibling closure retains the shared context. In an SPA,
repeat the same route or interaction before taking the snapshot; the retained
fields that grow with each pass are far more useful than a large heap viewed in
isolation. DevTools now provides a much better place to start that comparison.

## Need Help Setting Better Performance Budgets?

If one outlier determines your current budget, or every alert prompts an
argument about whether the threshold was sensible, I can help choose a
representative period, separate incompatible populations, and turn the result
into a safeguard your team will trust. We can also connect the budget to the
trace, RUM segment, or release evidence needed to investigate a failure.

You don’t need a finished measurement strategy. A chart export, a handful of
recent results, or one alert that keeps firing without leading anywhere is
enough to begin. If you’d like a second pair of eyes on it, [get in
touch](/contact/).

{% include web-perf-wednesdays.md %}
