---
layout: post
title: "Web-Perf Wednesday 010 – Safari Keeps Scrolled Content in Place"
date: 2026-09-23 12:00:00 +0100
categories:
  - Web Performance
tags:
  - Safari
  - Caching
  - Tooling
show_taxonomy: true
main: ""
meta: "Safari 27 adds scroll anchoring, tighter HTTP caching, and static Service Worker routes, while Chrome improves performance tooling."
---

A fair amount has changed since last Wednesday, and Safari accounts for most
of what matters here. Safari 27 can now keep scrolled content in place when
something is inserted above it, follows several more HTTP caching rules, and
lets Service Workers declare routes that bypass their own fetch handlers.
Chrome DevTools has also completed its soft-navigation workflow and added
reproducible CPU-tier controls. The common thread is browser behaviour that can
change a user’s experience without a site deployment.

## Safari Keeps Scrolled Content in Place

Safari 27 adds [scroll anchoring](https://webkit.org/blog/18325/webkit-features-for-safari-27-0/),
which adjusts the scroll position when content is inserted above the part of a
page someone is currently viewing. An image, advert, comment, or other late
content can still change the document’s layout, but the browser compensates so
that the text or interface already on screen stays in place.

This brings Safari into a part of the platform that Chrome and Firefox users
have had for some time. The [CSS Scroll Anchoring
specification](https://drafts.csswg.org/css-scroll-anchoring/) describes how a
scrolling box selects an anchor node and adjusts its offset after a layout
change. It only applies once the box has been scrolled away from its origin,
and `overflow-anchor: none` lets developers opt a container or subtree out.
The default is `auto`, so most sites receive the new behaviour without making
a code change.

That default is helpful, particularly for long articles, feeds, product lists,
and ad-supported pages where content can arrive above the reader. It also
creates a clear before-and-after point for Safari testing and field data.
Safari 27 users may experience a steadier page than Safari 26 users even though
the application, advert stack, and reserved space are identical.

Scroll anchoring doesn’t reserve space or stop the layout from changing. Pages
should still give images dimensions, allocate space for adverts and embeds,
and avoid inserting avoidable content above the viewport. Those fixes help
from the first paint and across browsers; anchoring applies later, once the
user has scrolled, and deals with a narrower symptom.

There are also interactions to test. Safari 27’s release notes contain fixes
for anchoring around smooth scrolling, rubber-banding, scroll snapping, and
dynamic `scroll-padding`. Sites with infinite feeds, sticky controls, in-page
navigation, or their own scroll-compensation JavaScript should compare Safari
26 and 27 on real journeys rather than assuming the default can’t disturb
existing behaviour.

One useful diagnostic is to replay the same journey with the default, then
disable anchoring only on the suspected scroller. That shows whether browser
compensation is hiding a page-level shift or causing a second correction. Keep
the opt-out narrow: the specification makes `none` exclude the element and its
descendants for that scrolling box, so a broad rule can remove the protection
from much more of the page than intended. Record the Safari version, selector,
and scroll position with the result so somebody else can reproduce it.

I’d segment Safari RUM and replay data by major version, then run a
[journey-level performance test](/performance-audits/) on pages that inject
content after the reader has moved down the page. Look for sudden scroll
offsets, double compensation, missed anchors, and controls that end up under a
sticky header. A quieter experience is useful; knowing whether the browser or
the site produced it is what makes the result actionable.

## Safari Tightens Its HTTP Cache Behaviour

The same Safari release fixes several HTTP-cache behaviours. WebKit now says
it honours the `max-age`, `min-fresh`, and `no-store` request directives,
updates cached entries with `Content-*` headers from `304` responses, honours
`Cache-Control: public` on responses with unknown status codes, and stores
responses with explicit freshness across all status codes.

The details need a little care. [RFC
9111](https://www.rfc-editor.org/rfc/rfc9111.html#section-5.2.1) defines request
directives as advisory, while response directives carry different
requirements. Even so, Safari changing its implementation can alter cache
reuse, revalidation, and network traffic after an operating-system update. If
a Safari cohort suddenly behaves differently, compare requests and response
headers before attributing the movement to the CDN or application. A focused
[caching review](/consultancy/) should compare the behaviour before and after
the Safari update.

## Static Routes Can Avoid Service Worker Startup

Safari 27 also supports the [Service Worker static routing
API](https://www.w3.org/TR/service-workers/#dom-installevent-addroutes). During
installation, `event.addRoutes()` can declare conditions based on URL, request
method, mode, destination, or Worker state, then choose the network, a cache,
the fetch handler, or a race between network and handler.

[MDN’s compatibility data](https://github.com/mdn/browser-compat-data/blob/v8.1.4/api/InstallEvent.json)
records support from Chrome and Edge 123 and Safari 27, including Safari on
iOS; Firefox remains unsupported. Feature-detect `addRoutes` on the install
event and retain the ordinary fetch handler for Firefox and older browsers.

Network and cache routes can avoid Worker startup and `fetch` dispatch. Start
with a small, measurable route set and compare cold and warm navigations; a
[PWA performance review](/performance-audits/) should prove that the declared
route matches the application’s real caching and offline requirements.

There’s also a registration gotcha: `fetch-event` and
`race-network-and-fetch-handler` both require a registered `fetch` listener,
otherwise `addRoutes()` rejects with a `TypeError`. Handle rejection and test
the fallback. The API extends installation automatically, but its internal
lifetime promise stays fulfilled; rejection alone doesn’t fail installation.
Passing the rejected promise to `event.waitUntil()` does, so decide whether
static routes are required or optional. [OpenPWA’s static-routing reference](https://openpwa.net/reference/service-worker/static-routing/)
has practical examples and Chromium’s diagnostic messages.

## Chrome DevTools Makes Comparisons More Reproducible

[Chrome DevTools’ latest release
summary](https://developer.chrome.com/blog/new-in-devtools-october-2026/) adds
soft-navigation analysis to Performance Insights, completing the workflow that
already covered Live Metrics and trace views. DevTools can also configure a
calibrated CPU performance tier through the Chrome DevTools Protocol, rather
than relying only on an arbitrary slowdown multiplier tied to the machine
running the test.

Both additions make comparisons easier to defend. Developers can now inspect
a soft navigation and its insights in the same place, while automation can
target a repeatable hardware tier across different developer and CI machines.
Teams should record the Chrome version, selected tier, trace settings, and
application build with every result. A [performance workshop](/workshops/) can
then turn the tooling into a shared test method instead of a collection of
screenshots produced under unknown conditions.

## Need Help Explaining a Browser-Led Change?

When a browser release changes scrolling, caching, or Service Worker routing,
the effect can resemble an application improvement or regression even when the
site itself hasn’t deployed. I can help separate browser behaviour from site
behaviour, compare the right cohorts, and turn the difference into a test or
fix that the team can own.

A Safari version split, an unexpected cache trace, or one PWA navigation that
feels slower than it should is enough to begin. If you’d like help working out
what changed and what to do next, [get in touch](/contact/).

{% include web-perf-wednesdays.md %}
