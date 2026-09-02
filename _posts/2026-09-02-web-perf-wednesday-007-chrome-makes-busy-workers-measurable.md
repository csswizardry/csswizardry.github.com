---
layout: post
title: "Web-Perf Wednesday 007 – Chrome Makes Busy Workers Measurable"
date: 2026-09-02 12:00:00 +0100
categories: Web Development
main: ""
meta: "Chrome 153 starts exposing dedicated-worker congestion to RUM, while browser releases tighten privacy, module recovery, and image preloading."
---

There’s been a useful amount of movement since [last
week](/2026/08/web-perf-wednesday-006-faster-browser-releases-change-your-rum-population/),
although most of it is arriving through browser releases rather than grand
announcements. Chrome has started exposing slow work inside dedicated Web
Workers, Firefox now lets failed module loads recover, and WebKit has fixed a
responsive-image preload edge case. Chrome exposes work we couldn’t see,
Firefox can retry a load it had written off, and WebKit asks for the image it
actually selected. Chrome’s worker change offers the most interesting field
data, provided we’re careful about what it actually reports.

## Chrome Makes Busy Workers Measurable

[Chrome 153 has reached Early
Stable](https://chromereleases.googleblog.com/2026/08/early-stable-update-for-desktop_0935803414.html)
for a small percentage of Windows and Mac users, ahead of its full Stable
release on 8 September. Among its performance changes, Chrome is [extending
the Long Animation Frames API to dedicated Web
Workers](https://chromestatus.com/feature/5387465121726464).

Long Animation Frames (LoAF) currently helps explain congested moments on the
main thread by combining long-running script with the rendering work that
follows it. A Worker has no rendering frame of its own, so the name becomes a
little odd here, but the practical result is useful: a long task that blocks a
dedicated Worker’s event loop can produce a `long-animation-frame` entry,
observable from inside that Worker with `PerformanceObserver` and carrying the
usual per-script attribution.

Moving work off the main thread keeps it away from rendering and input
handling, but it doesn’t make the work free. A Worker that spends too long
decoding data, filtering a large catalogue, processing an image, or running a
client-side model can still delay the result the interface is waiting for.
Main-thread INP may look perfectly respectable while the product feels slow
because the useful answer is still queued elsewhere. Worker-side LoAF gives a
[RUM strategy](/consultancy/) a browser-native signal for that missing part of
the journey.

The first implementation is deliberately narrow. It starts with dedicated
Workers and reports a single long task blocking the Worker event loop. Chrome’s
broader idea of identifying congestion caused by a flood of smaller tasks is
follow-up work. A page-level observer also won’t collect Worker entries for us;
the observer needs to run in the Worker, and the application needs to join that
evidence to the user action or task it was meant to complete.

Start with one Worker-backed journey where users already experience a delay.
Feature-detect `long-animation-frame` support inside the Worker, retain the
script attribution and duration, then add an application mark or task ID that
lets the main thread connect the result to the initiating action. Keep the
browser version and instrumentation version alongside it, because Early Stable
is a small cohort and this signal will initially be Chrome-only.

As with main-thread LoAF, collecting every entry is likely to create far more
data than insight. Sample the worst cases, set a threshold that reflects the
product interaction, and compare them with a trace before assigning blame. The
useful outcome is a view of where an asynchronous journey actually waited,
rather than a new chart whose busiest line merely happens to belong to a
Worker.

## Chrome 153 Also Removes Privacy Sandbox APIs

Chrome’s decision to retain its current approach to third-party cookies did not
preserve every API designed for a cookieless browser. Chrome 153 [removes
Related Website Sets](https://chromestatus.com/feature/5194473869017088) and
`document.requestStorageAccessFor()`, and it is also removing the [Attribution
Reporting API](https://chromestatus.com/feature/6320639375966208) alongside
other Privacy Sandbox APIs.

Teams using these features for embedded sign-in, cross-site journeys, or
conversion measurement should inventory production use now and test what the
browser does without them. The continued availability of third-party cookies
doesn’t recreate the same access or attribution model, particularly where
users, browser settings, policy, or consent already restrict those cookies.
Record the Chrome version in any measurement comparison, and make the fallback
an explicit product and privacy decision rather than an accidental return to an
older mechanism.

## Firefox Lets Failed Module Loads Recover

[Firefox 155 was released on 1
September](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/155),
and a failed module load is no longer cached as a permanent failure. If a
network error or incorrect MIME type is corrected, importing the same specifier
again can now succeed. The change covers JavaScript, JSON, CSS, and text
modules, loaded statically or dynamically in windows and Workers.

This is a useful resilience improvement for applications that retry after a
brief CDN or deployment fault. It also means failure testing should check the
whole recovery path: restore the response, retry the import, and confirm that
the interface and telemetry recover without a reload. Firefox also adjusted
`modulepreload` behaviour around already-fetched modules and failed integrity
checks, so include preload failures in [team performance
testing](/workshops/) where modules sit on a critical route.

## WebKit Fixes Responsive-Image Preloads

[Safari Technology Preview
251](https://webkit.org/blog/18194/release-notes-for-safari-technology-preview-251/)
fixes `imagesrcset` failing to override `href` on `<link rel="preload"
as="image">`. In affected builds, a responsive-image preload could fetch the
fallback URL instead of the candidate selected from `imagesrcset`, leaving the
eventual image request to choose something else. The same release also fixes
`as` keywords on preload links being matched case-sensitively.

Neither change makes every responsive preload correct: `imagesizes`, viewport,
device pixel ratio, and the eventual `<picture>` or `<img>` selection still
need to agree. If Safari shows an unexpected early image request, a
[performance audit](/performance-audits/) should compare the preload and image
candidates before treating the wasted transfer as an application bug.

## Need Help Finding Work Your Main-Thread Metrics Miss?

If an interaction looks healthy in the usual main-thread metrics but still
finishes late, I can help trace the complete journey across Workers, network
requests, rendering, and application state. We can decide which Worker tasks
are worth measuring, join them to the actions users actually took, and keep the
result small enough for the team to interpret.

You don’t need a finished instrumentation plan to begin; an awkward trace, a
slow feature, or a result that arrives inexplicably late is plenty. If your
current RUM stops just before the interesting delay, [get in
touch](/contact/).

{% include web-perf-wednesdays.md %}
