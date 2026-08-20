---
layout: post
title: "When Safari’s ‘Ignore Cache’ Ignored Cache-Control"
date: 2026-08-17 16:11:40
categories: Web Development
meta: "Safari Technology Preview 250 fixed a subtle Web Inspector bug that overwrote page-authored Cache-Control request headers when the resource cache was disabled."
faq:
  - question: "What did Safari Technology Preview 250 fix?"
    answer: "It fixed a Web Inspector bug where disabling the resource cache replaced a page-authored Cache-Control request header with no-cache before the request reached the network."
  - question: "Did the bug overwrite Cache-Control response headers?"
    answer: "No. The WebKit change concerns a Cache-Control request header set by page code, not the Cache-Control response header returned by an origin or CDN."
  - question: "Does Ignore Cache still bypass Safari’s local cache?"
    answer: "Yes. Web Inspector still applies its internal cache-bypass policy, but it now preserves any Cache-Control request header that the page has already supplied."
  - question: "How should I test warm-cache behaviour in Safari?"
    answer: "Keep caching enabled, load the page normally, then reload or revisit it without clearing data. Treat Ignore Cache as a separate diagnostic condition."
---

As you know, I’m a little bit obsessed with caching. I’ve written about
[`Cache-Control`](/2019/03/cache-control-for-civilians/), [how much cache
coverage sites leave on the table](/2024/08/cache-grab-how-much-are-you-leaving-on-the-table/),
[better reuse with
`No-Vary-Search`](/2026/05/better-browser-caching-with-no-vary-search/), and even
[why we have a `Cache-Control` _request_
header](/2025/03/why-do-we-have-a-cache-control-request-header/). That is why
this otherwise rather vague line in the [Safari Technology Preview 250 release
notes](https://webkit.org/blog/18191/release-notes-for-safari-technology-preview-250/)
caught my eye:

> Fixed disabling the resource cache overwriting a `Cache-Control` header
> already set by the page.

At first glance, that almost sounds like the feature working as intended: of
course disabling cache has to override caching somehow. But disabling WebKit’s
local resource cache and replacing a header that the page deliberately added to
its request are two very different things.

The release note piqued my interest, so I dug into [the underlying WebKit
change](https://github.com/WebKit/WebKit/commit/96437189e7eecba977fe0a452b7e35fecc6ea776).
The bug is small, specific, and absolutely fascinating.

{% include promo.html %}

## Web Inspector Was Changing the Outgoing Request

Safari Web Inspector’s [<cite>Ignore
Cache</cite>](https://webkit.org/web-inspector/network-tab/#controlling-resource-caching)
toggle tells WebKit not to use cached resources for future requests while Web
Inspector is open. That is a useful development convenience, particularly when
you need to know that you’re looking at the latest copy of a resource.

Before this fix — i.e., the bug — WebKit did two things when that toggle was
active:

* it set an internal policy that bypassed its resource cache; and
* it set the outgoing request’s `Cache-Control` and `Pragma` headers to
  `no-cache`.

The first behaviour is exactly what we asked for. The second is where things got
interesting: WebKit _set_ those headers even if the page had already supplied
its own. The debugging setup didn’t just change whether Safari could reuse
a local response; it changed the outgoing request that the application sent.

## This Is a `Cache-Control` Request Header

We tend to think of `Cache-Control` as primarily a _response_ header:

```http
HTTP/2 200
Cache-Control: max-age=31536000, immutable
```

That’s an origin telling browsers and other caches how they may store and
reuse its response. But, as [we’ve looked at
before](/2025/03/why-do-we-have-a-cache-control-request-header/),
`Cache-Control` can also appear on a _request_, where the client tells caches
what kind of stored response it is prepared to accept.

A page can add one itself:

```js
fetch('/data.json', {
  headers: {
    'Cache-Control': 'max-age=12345'
  }
});
```

That’s almost the exact case in WebKit’s new regression test. With caching
enabled, the server receives `max-age=12345`. With caching disabled and no
page-authored header, it receives WebKit’s `no-cache`. Crucially, with caching
disabled _and_ the page setting `max-age=12345`, the server should still receive
`max-age=12345`.

Before the fix, it received `no-cache` instead. The value that the page asked
for never reached the network.

## Cache Bypass and Request Semantics Are Now Separate

The fix is pleasingly small. When Web Inspector has disabled caching, WebKit now
adds its `no-cache` headers only if the request doesn’t already contain them. It
still applies its internal `ReloadIgnoringCacheData` policy, so the local
resource cache remains bypassed either way.

In other words:

* Page-authored request header: preserved
* Web Inspector cache bypass: still applied

This is the distinction that the release note hides. Web Inspector can ignore
its local cache without rewriting the application’s request to achieve it.

This also wasn’t a general Safari caching failure. The affected condition was
much narrower: Web Inspector had disabled the resource cache, and the request
already contained a page-authored `Cache-Control` header. The release note
doesn’t establish which shipping Safari versions contained the old behaviour,
only that Safari Technology Preview 250 contains the fix.

## How This Could Have Tripped You Up

Changing `max-age=12345` to `no-cache` is not cosmetic. A shared cache, CDN, or
origin that receives the request may respond differently because `no-cache`
requires a stored response to be successfully validated before reuse. The tool
that was meant to help inspect the request had changed the request’s caching
semantics before it reached the network.

That could lead to some wonderfully confusing investigations. Server logs might
show a `no-cache` header that the application never sent. An endpoint might
behave differently only while Web Inspector is open and <cite>Ignore
Cache</cite> is active. Or a supposed warm-cache test might make every request
look as though the user had explicitly demanded revalidation.

None of those observations would be false, exactly; they would be true only
under the debugging conditions that produced them.

For caching work, I keep the conditions separate:

* **Cold cache:** clear the relevant data once, then load with caching enabled.
* **Warm cache:** load or revisit normally with caching enabled.
* **Cache disabled:** treat this as a separate diagnostic mode, not a warm-cache
  test.

It is also worth recording the browser version, whether Web Inspector was open,
and whether <cite>Ignore Cache</cite> was active. If the request headers
themselves are in question, compare what Web Inspector shows with CDN/origin
logs or another capture outside that setup.

This is a tiny browser bug with a tiny fix, not a particularly harmful caching
failure. But it is a lovely bit of trivia about how developer tools work: before
the fix included in Safari Technology Preview 250, asking Web Inspector to
ignore its own cache could also make it ignore what the page had already said
about caching.

That is exactly the kind of thing that keeps caching interesting interesting to
me long after any sensible person would have moved on!
