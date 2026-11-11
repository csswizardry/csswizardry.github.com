---
layout: post
title: "Web-Perf Wednesday 017 – Prebid Stops Re-downloading Its Manifest"
date: 2026-11-11 12:00:00 +0000
categories:
  - Web Performance
tags:
  - Web-Perf Wednesdays
  - Prebid
  - Advertising
  - Third Parties
  - Safari
show_taxonomy: true
meta: "Prebid 11.48 makes its jsDelivr manifest cacheable, removing 67 KB of repeat downloads for sites that use the web bundler."
---

This has been a busier week for small, practical improvements than for sweeping
browser releases. The strongest comes from Prebid.js, where two small-looking
loader decisions had made browsers repeat avoidable work on every page view.
Version 11.48 fixes both, and the result is a good reminder for any site that
depends on advertising code: the machinery around a third party can be
substantial in its own right, so it deserves the same scrutiny as the bundle
you deliberately shipped.

## Prebid Stops Re-downloading Its Manifest

[Prebid 11.48](https://github.com/prebid/Prebid.js/releases/tag/11.48.0)
changes the relatively new jsDelivr web bundler, which lets publishers assemble
Prebid in the browser by naming the modules they need in a `bundle.js` URL. The
loader fetches a manifest, works out the dependencies, verifies their checksums,
and then loads the required files.

Until now, that manifest carried a randomly generated callback name in its
query string. Every page view therefore requested a different URL, so the
browser could not reuse the response even though jsDelivr served it as
immutable with a one-year cache lifetime. For Prebid 11.46, the manifest was
169 KB uncompressed or 67 KB over the wire with Brotli. The [merged change
records](https://github.com/prebid/Prebid.js/pull/16115) that a typical module
set was 89 KB compressed with gzip, which puts the supposedly supporting file
uncomfortably close to the advertising code it described.

Prebid 11.48 removes the changing query string. A repeat view can now reuse
`manifest.js` from the browser cache, and the project’s test saw one manifest
request across two page loads instead of two. The first visit still downloads
the file, and a new pinned Prebid version has a new URL, so this is not 67 KB
magically removed from every load. It is repeat work that the browser can
finally avoid.

The release also splits out checksums for module disclosure metadata. In 11.46,
747 of the manifest’s 1,642 checksums described `.metadata.js` files used only
when the `storageControl` module was requested. Sites that do not use that
module no longer receive those checksums; sites that do need them fetch the
separate metadata manifest alongside the main one.

This only affects sites using Prebid’s [jsDelivr `bundle.js`
loader](https://docs.prebid.org/download.html#option-3-load-from-the-jsdelivr-cdn),
introduced in 11.40. A downloaded custom build, an npm bundle, or another
integration does not inherit this particular saving. Check the page source or
waterfall for `/prebid.js@.../dist/bundle.js`, then compare a first and repeat
navigation with DevTools’ _Disable cache_ option left off. After upgrading,
`manifest.js` should transfer on the first view and come from cache afterwards.

Advertising code tends to run early, touch many partners, and sit close to
revenue, which makes casual upgrades a bad idea. Test bidding and consent
behaviour as well as bytes, but do put 11.48 on the upgrade list if this loader
is in use. A [third-party performance review](/consultancy/) should account for
the bootstrapping code around the auction, not stop at the familiar bidder
scripts.

## Prebid Now Clears Out User-Sync Iframes

The preceding [Prebid 11.47
release](https://github.com/prebid/Prebid.js/releases/tag/11.47.0) also removes
user-sync iframes automatically, 15 seconds after insertion by default. The
change was prompted by one measured sync hub growing into 450–1,000 nested
frames from roughly 174 hosts within 25 seconds. Those frames consume memory
and main-thread time, and they previously remained in the document.

The delay is configurable, and automatic removal can be disabled, so publishers
should test identifier matching and revenue rather than assume the default fits
every setup. On long-lived pages, compare frame counts, memory, and CPU after
the initial auction; a [performance audit](/performance-audits/) can also show
whether the cleanup changes responsiveness after the ads have settled.

## Renderer Failures Become Visible and Retryable

Prebid 11.48 also [stops caching failed renderer-script
loads](https://github.com/prebid/Prebid.js/pull/15994), allowing a later attempt
to retry instead of inheriting the original failure. It now emits
`adRenderFailed` when the script cannot load or its `render()` method throws,
and `adRenderSucceeded` when rendering completes.

That is operationally useful. A winning bid followed by a broken renderer is
not the same as no demand, yet a dashboard may make both look like an empty ad
slot unless the failure is recorded. Feed those events into existing telemetry,
separate network and render errors, and watch the rate through the upgrade.
[Ongoing technical guidance](/mentoring/) can help turn that signal into an
owner, a threshold, and a response rather than one more event nobody checks.

## Safari Makes Idle Work Less Likely to Miss a Frame

[Safari Technology Preview
256](https://webkit.org/blog/18602/release-notes-for-safari-technology-preview-256/)
fixes `requestIdleCallback()` scheduling so WebKit uses the actual 60 Hz frame
period instead of offering an idle period just before the frame deadline. It
also caches `document.querySelector()` results, avoids unnecessary style
invalidation when scroll-driven animation timing has not changed, and fixes
slow repaints and long hangs involving many CSS Custom Highlights.

These are preview fixes, not a promise about the Safari version your visitors
have today. If an editor, search interface, or animation-heavy page exercises
the affected code, reproduce it in the preview and keep the trace. A focused
[team workshop](/workshops/) can use that comparison to distinguish browser
work already fixed upstream from application work the team still owns.

## Need Help Finding Third-Party Waste?

Third-party performance problems often hide in loaders, manifests, sync frames,
and failure handling rather than the headline script. I can help map that whole
chain, measure its cost on first and repeat visits, and work out which change is
safe without accidentally disrupting consent, advertising, or revenue.

You do not need a finished diagnosis. A heavy waterfall, an ad slot that fails
intermittently, or a page that gets slower the longer it remains open is enough
to begin. If you would like a second pair of eyes on it, [get in
touch](/contact/).

{% include web-perf-wednesdays.md %}
