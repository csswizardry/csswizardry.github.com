---
layout: post
title: "Better Browser Caching with No-Vary-Search"
date: 2026-05-07 21:31:40
categories: Web Development
main: ""
meta: "No-Vary-Search lets HTTP caches ignore irrelevant query parameters such as UTM tags, while still keeping meaningful ones like product variants in the cache key."
---

I’ve [written](/2019/03/cache-control-for-civilians/),
[spoken](https://speakerdeck.com/csswizardry/cache-rules-everything), and
generally [gone on](/2025/03/why-do-we-have-a-cache-control-request-header/) [at
length](/2024/08/cache-grab-how-much-are-you-leaving-on-the-table/) [about
caching](/2023/10/the-three-c-concatenate-compress-cache/) for years now, but
a newer addition to the conversation is `No-Vary-Search`: an HTTP response
header that helps us solve a surprisingly common problem with cache keys in HTTP
cache (or _browser cache_).

The short version is, URLs that are materially the same often fail to reuse the
same cached response simply because their query strings differ. Sometimes that
difference matters to the content and, therefore, the end user. For example:

* `?colour=red`
* `?colour=blue`

And sometimes, it really doesn’t matter at all:

* `?utm_source=google`
* `?utm_source=chatgpt`

The former are very likely different pages, or at least pages that ought to
produce different content. We would not want them cached under the same key.

The latter should, in almost every sane setup, return the exact same HTML. They
are the same page, just with different tracking baggage attached.

And yet, to an HTTP cache, different query strings traditionally equate to
completely different URLs, which means different cache entries. That is wasteful.

## The Problem We’re Solving

By default, caches are cautious. If the URL differs, the cache key differs, and,
in a cautious world, that is usually the right thing to do.

This is why:

* `/products/shoes?colour=red`
* `/products/shoes?colour=blue`

…should remain distinct. The query parameter materially changes the content of
the page.

But this also means the cache will usually treat these as distinct pages,
too—even if all three return byte-for-byte identical HTML.

* `/sale?utm_source=google`
* `/sale?utm_source=chatgpt`
* `/sale?utm_source=newsletter`

At best, that means wasted cache space; at worst, it means unnecessary trips
across the network because the browser cannot reuse a perfectly good response
that it already has stored.

**This is exactly what `No-Vary-Search` addresses.**

## What `No-Vary-Search` Does

[`No-Vary-Search`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/No-Vary-Search)
is a response header that tells the cache how to treat query parameters when
matching a URL to an existing cache entry.

In other words, it lets the server say, via a header, <q>these search parameters
do not meaningfully change the response, so do not let them fragment the
cache</q>.

This is a little reminiscent of the well known
[`Vary`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Vary)
header, but aimed squarely at URL search parameters rather than request headers.

That distinction matters. `Vary` says <q>this response depends on
`Accept-Language`</q> or <q>this response depends on `Accept-Encoding`</q>, for
example. `No-Vary-Search` says <q>this response does _not_ depend on
`utm_source`</q> or <q>the order of these parameters should not matter</q>, and
so on.

If you know that certain parameters are irrelevant to the response body, you can
tell the cache to ignore them, effectively allow- or blocklisting them for cache
key purposes.

## A Simple Example

Imagine a landing page that is heavily used in campaigns, ads, email, and
social posts:

* `/offer?utm_source=google`
* `/offer?utm_source=chatgpt`
* `/offer?utm_source=linkedin`

If those all return the same page, you can tell the cache to ignore
`utm_source`:

```http
No-Vary-Search: params=("utm_source")
```

Now, as far as cache matching is concerned, those URLs may all reuse the same
stored response. They will no longer be treated as separate cache entries just
because of the different `utm_source` values. Much more effective reuse of
cached content.

That is the crucial thing to understand: `No-Vary-Search` is not changing the
URL, and it is not rewriting requests. It is changing how cache matching treats
the differing query string.

## `No-Vary-Search` Syntaxes

The header has a few useful, different forms.

### Ignore Specific Parameters

This is the form I suspect most people will use most often:

```http
No-Vary-Search: params=("utm_source" "utm_medium" "utm_campaign" "fbclid" "gclid")
```

This says: if the only differences between two URLs are those parameters, treat
them as the same cache key.

This is ideal for analytics and campaign tagging, where the query string is
useful to _you_ but should not change the response for the user. These standard
tracking and social parameters could probably be safely applied to most, if not
all, sites.

### Ignore All Parameters

If your page genuinely does not vary by query string at all, you can be much
broader:

```http
No-Vary-Search: params
```

That is the boolean form of `params`, and it tells the cache to ignore _all_
search parameters for matching purposes. This works perfectly for my site which
has zero back end, and thus cannot possibly vary by query string.

This is obviously powerful, but also the easiest way to shoot yourself in the
foot, so only use it if you really mean it.

### Ignore Everything _Except_ Certain Parameters

Sometimes the inverse is easier to express. Perhaps most parameters are
irrelevant, but a small number genuinely change the response:

```http
No-Vary-Search: params, except=("colour" "size")
```

This says: ignore all query parameters _except_ `colour` and `size`.

That would be a decent fit for a page where:

* `utm_*` tags do not matter,
* client-side sorting/filtering or tracking parameters do not matter (remember,
  the HTML itself doesn’t change) but,
* product variants (`?colour`, `?size`) do.

In that world:

* `/products/shoes?utm_source=google&colour=red`
* `/products/shoes?utm_source=chatgpt&colour=red`
* `/products/shoes?colour=red&sort=price`

could share a cache entry, but:

* `/products/shoes?colour=red`
* `/products/shoes?colour=blue`

should not.

### Ignore Parameter Order

Sometimes the parameters themselves matter, but their order does not:

* `/search?q=shoes&sort=price`
* `/search?sort=price&q=shoes`

These should usually be treated as equivalent. For that, there is `key-order`:

```http
No-Vary-Search: key-order
```

That tells the cache not to create separate entries just because the same
parameters arrived, only in a different order.

### Combining `No-Vary-Search` Rules

You can combine directives:

```http
No-Vary-Search: key-order, params, except=("colour" "size")
```

That tells the cache:

* parameter order does not matter, and
* all parameters may be ignored except `colour` and `size`.

This means the three following URLs could all share a cache entry:

* `/products/shoes?utm_source=google&colour=red`
* `/products/shoes?colour=red&sort=price`
* `/products/shoes?sort=price&colour=red`

That is probably the most expressive form, and in real systems it may prove the
most useful. This is phenomenally powerful.

## A Small Syntax Gotcha

`No-Vary-Search` uses [Structured
Fields](https://www.rfc-editor.org/rfc/rfc8941) syntax, so the parameter lists
are space-separated quoted strings:

```http
No-Vary-Search: params=("utm_source" "utm_medium" "gclid")
```

…not comma-separated values that you may be used to in most other places.

That is a small detail, but one worth being aware of.

## A Small Debugging Gotcha

Note that this also creates a slightly unusual debugging scenario. A very common
way to force what we assume will be a fresh trip to the server is to throw
a random search parameter on the end of the URL. I’m sure we’ve all done
something like this before:

* `/?foo`
* `/?test`
* `/?asdf`

Usually, that gives us a different URL and therefore a different cache key. But
if the main document is using `No-Vary-Search`, that assumption may no longer
hold. Appending search params may not bypass cache for this document because the
cache has explicitly been told those parameters do not matter.

Honestly, I would love DevTools to surface this more clearly. Something like the
existing ⚠️ iconography in the _Network_ panel’s title would be really helpful
here: not because anything is wrong per se, but because the browser may be doing
something surprising unless you know to look for the `No-Vary-Search` header.

## Use It Carefully

This header is only as good as the assumptions behind it: if two URLs really do
return meaningfully different content, then they _need_ different cache entries.
I’d rather be served the correct page a little more slowly than the wrong page
quickly.

This means `No-Vary-Search` is best suited to parameters that are:

* purely analytical;
* purely presentational on the client side, or;
* otherwise irrelevant to the server-rendered response.

If a parameter affects the HTML, do not ignore it.

It’s also worth noting that, at the time of writing, this is still an
experimental feature and support is not yet universal, so I would treat it as
a progressive enhancement rather than a foundational part of your caching
strategy. That’s exactly what I’ve done with my site for now.

## A Nice Fit for Messy Real-World URLs

What I like about `No-Vary-Search` is that it acknowledges how the web actually
works. URLs pick up baggage: marketing tags get appended, tracking parameters
are added, client-side state makes its way into the address bar. Two URLs that
are materially the same page often arrive looking totally different.

Historically, caches had to treat those as entirely separate keys, but
`No-Vary-Search` gives us a way to be a little more deliberate. If the response
is the same, we can say so. And if only certain parameters matter, we can say
that, too.

For teams who care about getting more out of the HTTP cache, that is a very welcome
addition!
