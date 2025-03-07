---
layout: post
title: "Why Do We Have a Cache-Control Request Header?"
date: 2025-03-07 15:55:04
categories: Web Development
meta: "Learn how the Cache-Control request header works, how browsers handle refresh and hard refresh caching, and when developers should use it for realtime data and offline-first applications."
---

I’ve [written](/2019/03/cache-control-for-civilians/) and
[spoken](https://slideslive.com/39021005/cache-rules-everything) many, many
times about the `Cache-Control` response header and its many directives, but one
thing I haven’t covered before—and something I don’t think many developers are
even aware of—is the `Cache-Control` _request_ header. Unless you know your
caching well, those two links in the first sentence will make this article a lot
easier to understand. Maybe pop them open in another tab as a reference.

Let’s go!

## `Cache-Control` Recap

As developers, we’re most used to `Cache-Control` as the preferred way of
instructing caches (usually browsers) on how they should store responses (if at
all), and what to do once their cache lifetime is up. Maybe something like this:

```
Cache-Control: max-age=2147483648, immutable
```

There’s a lot more to it than that, which you can read about in my 2019 piece,
[<cite>Cache-Control for
Civilians</cite>](/2019/03/cache-control-for-civilians/)

One thing we’re probably less used to is `Cache-Control`’s employment as
a _request_ header.

## `Cache-Control` as a Request Header

In a nutshell, the `Cache-Control` request header determines whether the browser
retrieves content from the cache or forces a network request. It’s also used by
intermediaries such as CDNs to work out whether they should serve a response
themselves, or keep passing the request back upstream to origin.

It’s a way for the client to force freshness.

This means that the most common way you’re ever likely to see a `Cache-Control`
request header is when you refresh or hard refresh a page. Honestly, that’s
mostly it.

All browsers behave a little differently between refreshes, hard refreshes, and
run of the mill
[revalidation](https://speakerdeck.com/csswizardry/cache-rules-everything?slide=10).

## Refresh

In **Chrome**, even if the page is still
[fresh](https://speakerdeck.com/csswizardry/cache-rules-everything?slide=14),
refreshing it will dispatch a request to the network with the following request
headers:

```
Cache-Control: max-age=0
[If-Modified-Since|If-None-Match]
```

* `Cache-Control: max-age=0` just means after zero seconds, revalidate this
  resource. This isn’t incredibly strictly enforced so it’s technically a weak
  instruction to revalidate. More on that later.
* The `If-Modified-Since` or `If-None-Match` headers are revalidation request
  headers that are used to compare the current version of the response with the
  target version on the network.

All other subresources on the page are fetched as per their caching headers, so
there is no different or specific behaviour here.

In **Firefox** the behaviour is a little different. Refreshing a still-fresh
page results in the following request headers:

```
[If-Modified-Since|If-None-Match]
```

No `Cache-Control` request header at all, just the relevant revalidation
headers.

Again, all of the page’s subresources are treated as normal.

**Safari** is different still, and generally seems much more aggressive with its
cache busting. Refreshing the same still-fresh page in Safari gives the
following request headers:

```
Cache-Control: no-cache
Pragma: no-cache
```

We have a `Cache-Control` request header, this time with a `no-cache` directive.
While this is functionally equivalent to `max-age=0`, the spec speaks much more
clearly that `no-cache` means that <q>a cache MUST NOT use the response to
satisfy a subsequent request without successful revalidation with the origin
server</q>. We also have the first appearance of `Pragma`, also carrying
`no-cache`. `Pragma` is an incredibly outdated header that serves as a backward
compatibility measure for HTTP/1.0 caches. Safari including this here is a very
defensive measure!

Again, all other subresources are treated as they would be normally.

All browsers exhibit some similarities and some differences.

* Even if the main document was still fresh in HTTP cache, a refresh will always
  put a request out onto the network in all browsers.
* Chrome and Firefox emit revalidation headers which mean that, even though
  we’ve refreshed the page, we might still get served our locally cached version
  (`304`) if it’s still valid.
* Firefox doesn’t emit a `Cache-Control` header, making it the least aggressive
  of the three.
* Safari is by far the most aggressive, emitting both `Cache-Control` and
  `Pragma` headers, and no revalidation headers for potential reuse. Safari will
  always return a `200` response to a refresh.

## Hard Refresh

Things are a little different when it comes to a hard refresh. Hard refreshes
are usually a sign of user frustration and that something is badly broken or
outdated. To this end, browsers begin upping the ante here.

In **all browsers**, a hard refresh causes both the main document and all of its
subresources to be requested with the following:

```
Cache-Control: no-cache
Pragma: no-cache
```

Key things to note:

* No browser emits a revalidation header, meaning a `304` is not possible. We’re
  always guaranteed a fresh response.
* Chrome switched from `max-age=0` to `no-cache`. This is a clear signal of
  intent that a hard refresh is more aggressive than a regular one.
* Safari’s behaviour remains unchanged, which means that as far as the main
  document is concerned, a refresh and a hard refresh are equivalent.

Note that this all applies to the main document and all of its subresources—even
[`immutable`](/2019/03/cache-control-for-civilians/#immutable) assets—so
everything on the page is now guaranteed fresh. `304` responses are not
possible.

### `max-age=0` vs `no-cache`

Both of these directives behave incredibly similarly: `max-age=0` means the
response is considered stale after zero seconds and therefore should be
revalidated, and `no-cache` means don’t fetch this response from cache without
revalidating it first.

Where they differ is that `max-age=0` permits caches to reuse a response if
revalidation isn't possible (e.g. no network access); `no-cache` is much
stricter—it means the cache must always revalidate before releasing a response,
or return an error if revalidation fails.

## Revalidation

In the case that a user hasn’t refreshed the page, but instead they have a file
in their cache that is now considered
[stale](https://speakerdeck.com/csswizardry/cache-rules-everything?slide=15),
the browser needs to check with the server whether or not it needs a new copy,
or if it can reuse and renew the previously cached version. This is called
_revalidation_ and is when the `If-Modified-Since` or `If-None-Match` headers
come into play.

* **`If-Modified-Since`** is used to check a file against its `Last-Modified`
  response header.
* **`If-None-Match`** is used to check a file against its `Etag` response
  header.

When a file needs revalidating, **all browsers** behave the same:

```
[If-Modified-Since|If-None-Match]
```

They attach the relevant revalidation header, which will result in either
a `200` or `304` response in most cases. This is unremarkable other than the
fact that no browser attaches a `Cache-Control` request header at this point.

## When to Use a `Cache-Control` Request Header

Each of these use cases was browser-defined, very much out of our hands as web
developers, but there are scenarios when we might want to (and can!) add our own
`Cache-Control` request headers. Think of these scenarios as incredibly
aggressive, incredibly defensive bidirectional caching rules to absolutely
guarantee that no caches anywhere along with request–response lifecycle will
retain a copy of a response. By setting `Cache-Control` at both ends, we have
a double-pronged approach to our strategy. A very cautious approach.

### Realtime Data

Imagine you’re building a sports betting site or stock trading app: realtime
price updates are incredibly important, and all data must be up to date,
_always_. You’d serve your _responses_ with something like:

```
Cache-Control: no-store
```

…and make your _requests_ with something like:

```js
fetch("https://api.website.com/data", {
  method: "GET",
  headers: {
    "Cache-Control": "no-store",
  }
})
```

This is the bare minimum for modern and compliant caches, but the
hyper-defensive version would be more like:

```
Cache-Control: no-store, no-cache, max-age=0, must-revalidate
Pragma: no-cache
```

…on your responses, and this in your requests:

```js
fetch("https://api.website.com/data", {
  method: "GET",
  headers: {
    "Cache-Control": "no-store, no-cache, max-age=0",
    "Pragma": "no-cache"
  }
})
```

The latter two examples are overkill and do contain a lot of redundancy, but
they also won’t do any harm.

<small>Note that if the data is also potentially sensitive and contains
user-specific data, you’d want to [add `private` to your `Cache-Control`
response
headers](https://www.linkedin.com/feed/update/urn:li:activity:7303763824388558848/).</small>

### Offline Applications

If you have an offline application, you can use `only-if-cached` to _only_ serve
a response if it’s in cache, otherwise returning a `504`.

```js
fetch("https://api.website.com/offline-data", {
  method: "GET",
  headers: {
    "Cache-Control": "only-if-cached"
  }
})
```

Adding this request header ensures that the request would never hit the network.

While `only-if-cached` might not be useful for most web pages, it can be handy
for offline-first applications, such as PWAs or news readers that prefer using
stored content rather than attempting a network request that might fail.

## Final Takeaways

* Browsers automatically send a mix `Cache-Control`, `Pragma`, or revalidation
  headers in refresh and hard refresh scenarios.
* `max-age=0` and `no-cache` both trigger revalidation, but `no-cache` is much
  stricter and requires a fresh response.
* You can manually use `Cache-Control` in requests when you need realtime data
  or offline-first apps.
* To force freshness, use:
  ```http
  Cache-Control: no-store, no-cache, max-age=0
  ```
* To build offline-first apps, consider:
  ```http
  Cache-Control: only-if-cached
  ```
