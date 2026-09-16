---
layout: post
title: "Web-Perf Wednesday 009 – CrUX Makes Ad Weight Public"
date: 2026-09-16 12:00:00 +0100
categories:
  - Web Performance
tags:
  - RUM
  - Third Parties
show_taxonomy: true
main: ""
meta: "CrUX adds public ad count, density, CPU, and network metrics, giving publishers and advertisers a shared view of real ad weight."
---

This week has produced one genuinely useful measurement change and a handful
of practical browser fixes. Chrome has added four experimental ad-experience
metrics to CrUX, giving publishers and advertisers a shared public view of how
many ads users see and how much CPU time and network data they use. Firefox 156
improves PDF and large-image performance and adds an experimental Container
Timing implementation, while WebKit has fixed hidden pages escaping timer
throttling.
The ad metrics lead because they can turn a familiar argument into evidence.

## CrUX Makes Ad Weight Public

Chrome has [added four experimental ad metrics to the Chrome UX Report
(CrUX)](https://developer.chrome.com/blog/crux-ad-metrics): Ad Count, Ad
Density, Ad Weight: CPU, and Ad Weight: Network. Together, they describe how
many ads were visible, how much of the viewport they occupied, how much CPU
time ad frames consumed, and how many compressed bytes ad resources
transferred during real page visits.

Count and density are sampled once a second throughout the visit, then
averaged for that session. CPU and network weight accumulate over the life of
the page. CrUX aggregates those visits and reports the 75th percentile at URL
and origin level, using the usual CrUX eligibility rules. This gives teams a
field-data view of ad load rather than one lab run with one set of creatives.

There are important limits. The metrics are experimental, aren’t part of Core
Web Vitals, and have no suggested targets. CrUX only reports them for pages
with ads, and pages or origins need at least one authorised seller in
`ads.txt`. [CPU weight covers ad frames and their
subresources](https://developer.chrome.com/docs/ads/metrics/weight-cpu), but
excludes CPU time from ad scripts running in the main frame. That omission can
be substantial on sites where tags execute high in the document and create
the ad frames later.

Teams also can’t reproduce the same figures in their own RUM today. Chrome
says cross-origin iframes make equivalent JavaScript collection impractical,
so there’s no public JavaScript API. The figures are available through the
CrUX API, CrUX History API, and the DevTools Ads panel; [BigQuery support is
still planned](https://developer.chrome.com/docs/ads/metrics/count). Chrome
also expects availability to increase over the next month, which makes early
gaps a poor basis for firm conclusions.

The DevTools panel is the right companion to the aggregate data. Chrome
classifies ads using a filter list derived from EasyList and by following
requests made from recognised ad-script stacks. An ad frame keeps that
classification after navigation, while the main frame itself is never marked
as an ad frame. [DevTools can show the classification in the Application,
Network, and Elements
panels](https://developer.chrome.com/docs/ads/detection), which helps explain
what CrUX counted before anyone takes a new number into a vendor meeting.

I’d begin with a baseline across the templates and markets that carry the most
advertising revenue. Compare count, density, CPU, and network weight with Core
Web Vitals, engagement, and commercial outcomes, but keep the separate
eligibility and attribution rules visible. A [third-party performance
review](/consultancy/) can then test whether a heavy result belongs to the ad
format, the delivery stack, the page around it, or some combination of all
three.

These metrics won’t settle every discussion between publishers, advertisers,
and vendors, but they do give those discussions a public and repeatable
starting point. Used carefully, they can make ‘the ads are too heavy’ specific
enough to investigate and improve.

## Firefox 156 Speeds Up PDFs and Large Images

[Firefox 156](https://www.firefox.com/en-US/firefox/156.0/releasenotes/) was
released on 15 September with two useful performance changes. Mozilla says
the built-in PDF viewer now starts up to 45% faster, and Firefox uses less
memory and CPU when displaying large JPEGs scaled down to fit a page. Windows
on ARM64 may also use hardware H.264 decoding for WebRTC calls instead of
software decoding.

The PDF figure is an ‘up to’ result rather than a promise for every document.
Still, teams whose products depend on statements, manuals, tickets, or other
embedded documents should include Firefox 156 in their next [journey-level
performance test](/performance-audits/). Large-image pages are worth checking
on memory-constrained devices too, especially where the delivered image is
much larger than its rendered size.

## Firefox Starts Testing Container Timing

Firefox 156 also includes an [experimental Container Timing
implementation](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/156),
disabled by default behind `dom.enable_container_timing`. The API reports
contentful paints inside an annotated DOM region, allowing teams to observe
how a product summary, results list, or dashboard component appears rather
than relying only on page-level paint metrics.

This remains an experiment, not production-wide support. It does, however,
give another browser implementation to test against Chrome’s work. If you’re
already [measuring component performance with Container
Timing](/2026/07/meaasuring-component-performance-with-the-container-timing-api/),
compare entry shapes and edge cases in Firefox before assuming today’s
Chromium behaviour defines the eventual cross-browser API.

## WebKit Fixes Hidden-Page Timer Throttling

[Safari Technology Preview
252](https://webkit.org/blog/18304/release-notes-for-safari-technology-preview-252/)
fixes hidden-page timer throttling not being applied correctly to newly created
pages. The underlying WebKit change explains that a new process, or a new page
in an existing process, could start with stale throttling state. The problem
occurred more often with Site Isolation when a hidden page created a new
cross-origin iframe.

This is Technology Preview, so it isn’t evidence that every current Safari
user has the fix. It is still worth testing background activity in apps that
create frames after `visibilitychange`, particularly dashboards, media tools,
and long-lived sessions. Unexpected timers in hidden frames can waste CPU and
battery, and a foreground-only trace won’t show the behaviour that triggered
this fix.

## Need Help Measuring Ad Weight?

If advertising keeps a product commercially viable but its performance cost
is hard to pin down, I can help connect the new CrUX metrics with traces, Core
Web Vitals, RUM, consent state, and revenue data. We can establish what Chrome
is counting, identify the pages and partners behind the worst results, and
turn a broad complaint about ‘heavy ads’ into a decision that engineering and
commercial teams can act on.

You don’t need a complete dataset to begin. A suspicious template, an awkward
vendor conversation, or one ad-heavy trace is enough to start. If you’d like
to work out what the ads genuinely cost your users, [get in touch](/contact/).

{% include web-perf-wednesdays.md %}
