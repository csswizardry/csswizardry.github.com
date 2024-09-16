---
layout: post
title: "Cloudinary: Improving Caching at Scale"
meta: "Cache in the cloud: fixing caching at Cloudinary"
permalink: /case-studies/cloudinary/
next-case-study-title: "Preparing Raspberry Pi for their upcoming changes"
next-case-study-url: /case-studies/raspberry-pi-code-club-workshop/
hide-hire-me-link: true
case-study: true
lux: "Case Study"
---

Right away, there are two important bits of information about this case study:

1. **I am a Cloudinary [_Media Developer
   Expert_](https://cloudinary.com/blog/announcing_cloudinary_s_media_developer_experts_program).**
   I am somewhat affiliated with (and love) Cloudinary, but that doesn’t impact
   the content of this case study.
2. **This was an unpaid project that I conducted as part of fixing issues that
   I discovered while working on a paid client engagement.** In exchange for
   notifying Cloudinary about the problem, they said I could write it up.

Some time ago, I was helping a firm in Germany get a handle on their Core Web
Vitals. It was a fairly routine engagement: they told me what they needed help
with, I got to work, we deployed a series of fixes to resounding success:

<figure>
<img src="/img/content/case-studies/cloudinary/cwv.jpeg" alt width="1780" height="862" style="mix-blend-mode: multiply">
<figcaption>The majority of my client’s issues were on desktop, so that became
the key focus of the engagement.</figcaption>
</figure>

As part of my investigations, I noticed some oddities with images served from
[Cloudinary](https://cloudinary.com/). Cloudinary is an amazing tool for
automagically optimising and formatting images on demand without having to
reprocess your entire digital asset library—this is almost always a performance
win. However, issues in their caching headers were causing unexpected results…

## Reporting the Issue

Being a _Media Developer Expert_, I have a good line in to Cloudinary, so
I dropped [Tamas Piros](https://x.com/tpiros) a message on Twitter and he put me
in touch with the relevant engineers at the company. What follows is a loose
transcript of that email thread:

### Initial Report

The caching headers set by Cloudinary were a little off: one thing was
a definite error, another was a minor contradiction, and another was an
opportunistic upgrade. I fired over an email to the following effect:

Hi all,

I know you’ve given this a lot of thought already, so please don’t think I’m
trying to correct you. I’m just going to describe the problem as I see it and
let you correct me afterwards if that’s okay…?

I’ve run into some caching headaches with a recent client, and it is most likely
down to conflicting cache-related headers on image responses.

Let’s take an image at random:
`https://res.cloudinary.com/[client]/image/upload/[path]/[params]`

This carries the following response headers (I’ve marked the cache-related ones):

```bash
$ curl -I https://res.cloudinary.com/[client]/image/upload/[path]/[params]

  HTTP/2 200
  content-type:                  image/jpeg
» etag:                          "e84b0695cd46714fdf658419b4faeb0d"
» last-modified:                 Sat, 02 Jul 2022 02:34:08 GMT
  date:                          Tue, 01 Aug 2023 12:19:06 GMT
  vary:                          Accept,User-Agent
  strict-transport-security:     max-age=604800
» cache-control:                 private, no-transform, immutable, max-age=2592000
  server-timing:                 cld-fastly;dur=2;cpu=1;start=2023-08-01T12:19:06.143Z;desc=hit,rtt;dur=31
  server:                        Cloudinary
  timing-allow-origin:           *
  access-control-allow-origin:   *
  accept-ranges:                 bytes
  x-content-type-options:        nosniff
  access-control-expose-headers: Content-Length,ETag,Server-Timing,Vary,X-Content-Type-Options
  content-length:                11666
```

The problems I’ve run into are:

1. **`ETag` and `Last-Modified` collide.** A minor issue with minimal
   side-effects.
2. **`immutable` should not be used here.** This is much more severe and is
   causing issues for customers.

### `ETag` and `Last-Modified`

`ETag` and `Last-Modified` both do the same job—revalidate. However, we don’t
need both and would prefer `ETag` over `Last-Modified`. `ETag` only updates if
the file _actually_ changes, whereas `Last-Modified` will change any time some
metadata changes—`Last-Modified` is a proxy for actual change. This means
`Last-Modified` can cause unnecessary downloads due to false positives.

#### Recommendation

Given that we’re already outputting `ETag` headers, drop `Last-Modified`.

**The benefit to customers** is that they don’t incur re-transferred data, thus
reducing their costs.

**The benefit to end users** is more cache hits and, therefore, improved
performance.

**The benefit to Cloudinary** is reduced processing, but the drawback is reduced
billing (if billing is based on data transfer).

### `immutable`

The second thing is much more problematic: we’re using `immutable` in
a situation where we shouldn’t use `immutable` at all. `immutable` is like
a contract with the browser that says <q>This content will never change and
therefore never needs revalidating, even if a user refreshes, etc.</q> You can
only safely use `immutable` on files like `app.ca51e8.js`, whose filename is
also immutable.

This behaviour compounds with the first problem in that we’ve got colliding
revalidation's headers, and a directive that tells the browser not to revalidate
anyway. This renders the revalidation headers ineffective as the browser, as
a result of `immutable`, should never emit `If-None-Match` or
`If-Modified-Since` request headers

The impact of all of this is that we will very aggressively cache these
responses with no way to actually cache-bust them on the client (`private`) for
a month (`2592000`).

#### Recommendation

Remove `immutable`.

**The benefit to customers** is that they new assets are not aggressively cached in
unreachable environments.

**The benefit to end users** is they are far more likely to see correct and
up-to-date content.

**The benefit to Cloudinary** is that you’ll now serve _more_ data, which means
more earnings if you bill based on throughput.

### `stale-while-revalidate`

This isn’t a current issue, rather something I thing we as an image provider
could make great use of…

Given that images (though obviously very important) won’t ever break a site if
they’re wrong or out of date (in the way that a wrong JavaScript file might),
we’re in the luxurious position to also make use of `stale-while-revalidate`!

We can tell the browser to cache and reuse the file for [however long we have
already
decided](https://cloudinary.com/glossary/caching-images#:~:text=Caching%20images%20with%20Cloudinary)
(`max-age`), but also offer a grace period where the browser is permitted to
reuse a stale image for a short time while it fetches the new one in the
background.

Therefore, I propose a new `Cache-Control` header of:

```
Cache-Control: private,
               no-transform,
               max-age=2592000,
               stale-while-revalidate=600
```

#### Recommendation

* **Keep `private` and `no-transform`**—they’re sensible for sure!
  * Although `no-transform` is technically redundant for us as we’re running
    over HTTPS. Leaving it in will have no adverse effects.
* **Drop `immutable`** as the assets themselves are not immutable.
* **Keep the `max-age`** you’ve already defined.
* **Add `stale-while-revalidate`** to offer a 10-minute grace period so that
  users aren’t left looking at nothing at all.
* **Drop `Last-Modified`** in favour of `ETag` as before.

## Reception

The unsolicited feedback was well received! The inclusion of `immutable` was
indeed a mistake, so we got that removed with a matter of urgency.

> The `immutable` point is interesting – and in fact is indeed a bug; this
> should only be sent for a versioned URL, not the unversioned one as in your
> example. I have created a task to resolve this – thanks for pointing it out!

The `Last-Modified` and `ETag` situation had a few more moving parts, but was an
overall happy ending:

> With regard to the use of both `Last-Modifiied` and `ETag` – in fact with our
> platform this should be correctly handled as we don't update the modification
> date unless something _actually_ changes – simply re-uploading into your Media
> Library should not update the date.
>
> We have customers who still rely on `Last-Modified` for validation in some
> embedded systems (part of the reason we handle it as we do). However I am
> going to create a QA task internally to ensure there is not a regression
> somewhere that has affected that.

This is fair! Great context, and, actually, clients that understand both `ETag`
and `Last-Modified` prefer `ETag` anyway: we can safely leave both and satisfy
all of our needs—no false positives, and supporting their outlier customers.

> I like the idea of `stale-while-revalidate` – this is something I hadn't
> considered and is nice and safe for legacy clients that wouldn't support it so
> including it should be nice and safe – again, thanks for pointing this out!

We didn’t get `stale-while-revalidate` out yet, but I still think it would be
a neat addition.

Although Cloudinary didn’t hire me directly, I like these kind of collaborative
efforts to make far reaching improvements. At Cloudinary’s scale, that’s a lot
of people!

- - -

{% include promo-next.html %}
