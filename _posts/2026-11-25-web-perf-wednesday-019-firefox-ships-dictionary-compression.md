---
layout: post
title: "Web-Perf Wednesday 019 – Firefox Ships Dictionary Compression"
date: 2026-11-25 12:00:00 +0000
categories:
  - Web Performance
tags:
  - Web-Perf Wednesdays
  - HTTP
  - Caching
  - Browsers
  - Third Parties
show_taxonomy: true
meta: "Firefox 161 adds Compression Dictionary Transport, making much smaller repeat downloads worth testing while browser support remains limited."
---

Plenty has changed since last week, with one browser capability worth putting
through a controlled trial. Firefox 161 now supports Compression
Dictionary Transport, which can make repeat downloads far smaller when one
version of a resource closely resembles the next. Prebid has corrected its DOM
viewability fallback, WebKit is capping memory used by enormous `will-change`
layers, and WPE has enabled hidden-view throttling. Dictionary compression is
the lead because it can reduce both transfer time and bandwidth, but only if
the whole delivery chain agrees on how to serve it.

## Firefox Ships Compression Dictionary Transport

[Firefox 161 was released on 24
November](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/161)
with support for Compression Dictionary Transport. The idea is wonderfully
practical: if a browser already has one version of a JavaScript, CSS, WebAssembly,
or HTML resource, the server can use that resource as a dictionary and send
mainly what changed in the next version.

The first response declares itself usable as a dictionary with
`Use-As-Dictionary`. When the browser later requests a matching resource, it
sends the dictionary’s hash in `Available-Dictionary` and advertises `dcb`
(Brotli) or `dcz` (Zstandard). The server can then return a response compressed
against the bytes the browser already holds. If no suitable dictionary exists,
ordinary Brotli, Zstandard, or gzip still works as before.

The potential saving is large because bundles often change much less than
their filenames suggest. In the project’s [published example
tests](https://github.com/WICG/compression-dictionary-transport/blob/main/examples.md),
a week-over-week YouTube player bundle was 90% smaller than the same file
compressed with Brotli alone; an older CNN React bundle was 63% smaller. Those
tests used specific historical resources, so they are a reason to measure your
own releases rather than a forecast for every bundle.

The best candidates are therefore not every asset. Look for large files with
frequent releases, high repeat traffic, and a small change set between versions.
A one-off campaign bundle or a file rebuilt from scratch each time gives the
browser much less to reuse. The deployment cadence and cache lifetime also need
to overlap long enough for yesterday’s bytes to remain useful.

This only helps visitors who already have a useful dictionary. It also asks
more of the delivery setup than switching on another content encoding. The
[IETF standard](https://www.rfc-editor.org/rfc/rfc9842) requires secure
contexts, and the browser’s dictionary is tied to the response’s cache
freshness. MDN’s [implementation
guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Compression_dictionary_transport)
notes that `no-store`, `no-cache`, and `max-age=0, must-revalidate` prevent a
response from being used as a dictionary. Cacheable responses must also vary
on `Accept-Encoding` and `Available-Dictionary`, while cross-origin resources
need the appropriate CORS response.

Browser support is still limited, and MDN labels the feature experimental, so
this is a progressive enhancement rather than a new dependency. Start with one
large, frequently updated, same-origin asset whose consecutive versions retain
plenty of identical code. Generate dictionary-compressed variants during the
build, preserve the normal compressed response, and confirm that your CDN keys
and forwards the new request headers correctly. Then compare repeat-view
transfer sizes and timings on a representative connection. A [delivery and
cache review](/consultancy/) can help work out whether it still saves enough
bytes once the build system, CDN, browser cache, and release cadence all have
their say.

## Prebid Corrects DOM Viewability Measurements

[Prebid 11.53.0](https://github.com/prebid/Prebid.js/releases/tag/11.53.0)
fixes its DOM-based viewability fallback. The previous code could reject a
visible descendant, mishandle clipping on one axis, or miss clipping and
opacity across shadow roots. It could also treat an element detached from the
document as though it sat at the top-left of the viewport.

The [fix and its regression
cases](https://github.com/prebid/Prebid.js/pull/16278) are a useful warning for
publishers comparing viewability around an upgrade: a change in the number may
come from corrected geometry rather than a different advert or layout. Test
representative placements with overflow, shadow DOM, collapsed slots, and
hidden ancestors before using the new result in a commercial report.

## WebKit Caps Memory for Huge `will-change` Layers

[Safari Technology Preview
257](https://webkit.org/blog/18652/release-notes-for-safari-technology-preview-257/)
limits the compositing layers created for elements with `will-change` that
cover a very large area, fixing high memory use. The release also fixes
stuttering scrolling on 60 Hz Mac displays and slow rendering on gradient-heavy
pages affected by Adaptive Dark Mode filters.

This is preview software, but it gives teams a good regression target now.
Capture memory and scrolling on pages with full-viewport or long-lived
`will-change` declarations, then remove declarations that no longer precede an
actual animation. A [performance audit](/performance-audits/) should still
find the source of excess layers; the browser’s new limit is a safety net, and
it doesn’t make unnecessary layer promotion free.

## WPE Starts Throttling Hidden Views

WebKit’s WPE port now [suspends CSS animations and throttles DOM
timers](https://blogs.igalia.com/webkit/blog/2026/wip-87/) when a view is
hidden, matching the behaviour already enabled for GTK and Cocoa. WPEPlatform
already knows whether a view is mapped, so the [underlying
change](https://commits.webkit.org/327010@main) uses that state to stop hidden
content running at full pace.

For embedded products with several web views, that should reduce wasted CPU
when only one view is visible. Test the transition in both directions: hide a
view, watch its timers and animations slow or stop, then reveal it and confirm
that time-sensitive state recovers correctly. The change is in WebKit’s main
branch, so embedders should check the version they actually ship before relying
on it.

## Need Help Testing Dictionary Compression?

Compression Dictionary Transport is most promising where large resources
change often but keep most of their contents. I can help identify those assets,
check the cache headers and CDN behaviour around them, and design a pilot that
compares ordinary compression with `dcb` or `dcz` on repeat visits. We can also
make sure unsupported browsers continue receiving the normal compressed
response.

You don’t need to redesign the whole asset pipeline to find out whether this is
worth pursuing. One versioned bundle, two representative releases, and a CDN
configuration are enough to begin. If you’d like a second pair of eyes on the
opportunity, [get in touch](/contact/).

{% include web-perf-wednesdays.md %}
