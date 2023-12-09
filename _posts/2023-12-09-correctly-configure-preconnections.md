---
layout: post
title: "Correctly Configure (Pre) Connections"
date: 2023-12-09 19:17:04
categories: Web Development
main: "https://csswizardry.com/wp-content/uploads/2023/12/bbc-news-waterfall-initial.png"
meta: "We’re probably familiar with preconnect, but are we getting it right?"
---

A trivial performance optimisation to help speed up third-party or other-origin
requests is to `preconnect` them: hint that the browser should preemptively open
a full connection (<b style="color: #318a90">DNS</b>, <b style="color:
#eb8a30">TCP</b>, <b style="color: #c94bd4">TLS</b>) to the origin in question,
for example:

```html
<link rel=preconnect href=https://fonts.googleapis.com>
```

In the right circumstances, this simple, single line of HTML can make pages
[hundreds of milliseconds
faster](https://andydavies.me/blog/2019/03/22/improving-perceived-performance-with-a-link-rel-equals-preconnect-http-header/)!
But time and again, I see developers misconfiguring even this most basic of
features. Because, as is often the case, there’s much more to this ‘basic
feature’ than meets the eye. Let’s dive in…

## Learn by Example

At the time of writing, the [BBC News homepage](https://www.bbc.co.uk/news) (in
the UK, at least) has these four `preconnect`s defined early in the `<head>`:

```html
<link rel=preconnect href=//static.bbc.co.uk crossorigin>
<link rel=preconnect href=//m.files.bbci.co.uk crossorigin>
<link rel=preconnect href=//nav.files.bbci.co.uk crossorigin>
<link rel=preconnect href=//ichef.bbci.co.uk crossorigin>
```

<small>Readers on narrow screens should know that each of these `preconnect`s
also carries a `crossorigin` attribute—scroll along to see for yourself!</small>

<small>Note that the BBC use schemeless URLs (i.e. `href=//…`). I would _not_
recommend doing this. Always force HTTPS when it’s available.</small>

Having consulted for the BBC a number of times, I know that they make heavy use
of internal subdomains to share resources across teams. While this suits
developer ergonomics, it’s not great for performance, particularly in cases
where the subdomain in question is on the critical path. Warming up connections
to important origins is a must for the BBC.

However, a look at a waterfall tells me that none of these `preconnect`s worked!

<figure>
<img src="/wp-content/uploads/2023/12/bbc-news-waterfall-initial.png" alt="" width="930" height="318">
<figcaption></figcaption>
</figure>

Above, you can see that the browser discovered references to each of these
origins in the first chunk of HTML, before the 1-second mark. This is evidenced
by the light white bars that denote ‘waiting’ time—the browser knows it needs
the files, but is waiting to dispatch the requests. However, we can also see
that the browser didn’t begin network negotiation until closer to the 1.5-second
mark, when we begin seeing a tiny slither of green—<b style="color:
#318a90">DNS</b>—followed by the much more costly <b style="color:
#eb8a30">TCP</b> and <b style="color: #c94bd4">TLS</b>. What went wrong?!

## Working Out Which Origins to `preconnect`

In the example above, we have five connections to the following four domains
(more on that later):

* **`nav.files.bbci.co.uk`:** On the critical path with render-blocking CSS.
* **`static.files.bbci.co.uk`:** On the critical path with
  render-blocking CSS and JS.
* **`m.files.bbci.co.uk`:** On the critical path with render-blocking CSS.
  * The screenshot above marks the CSS as non-blocking because of the way it’s
    fetched—it’s `preload`ed, which _is_ non-blocking, but it’s then
    conditionally applied to the page using `document.write()` (which is its own
    [performance faux pas in itself](/2023/01/why-not-document-write/)).
* **`ichef.bbci.co.uk`:** Not on the critical path, but does host the
  homepage’s LCP element.

<small><strong>N.B.</strong> For neatness, I am omitting the `https://` from
written prose, but it is vital that you include the relevant scheme in your
`href` attribute. All code examples are complete and correct.</small>

Each of these four origins is vital to the page, so all four would be candidates
for `preconnect`. However, the BBC aren’t attempting to `preconnect`
`static.files.bbci.co.uk` at all; instead, they’re `preconnect`ing
`static.bbc.co.uk`, which is also used, but _isn’t_ on the critical path. This
feels more like a simple oversight or a typo than anything else.

As a rule, **if the origin is important to the page and is used within the first
five seconds of the page-load lifecycle, `preconnect` it**. If the origin is not
important, don’t `preconnect` it; if it is important but is used more than five
seconds into the page load lifecycle, your priority should be moving it sooner.

Note that <q>important</q> is very subjective. Your analytics isn’t important;
your chat client isn’t important. Your consent management platform is important;
your [image CDN is important](https://cloudinary.com/).

One easy way to get an overview of early and important origins—and the method
I use when advising clients—is to use WebPageTest. Once you’ve run a test, you
can head to a [_Connection
View_](https://www.webpagetest.org/result/231209_AiDc18_7GP/2/details/#connectionView_fv_1)
of the waterfall which shows a diagram comprising entries per origin, not per
response:

<figure>
<img src="{{ site.cloudinary }}/wp-content/uploads/2023/12/bbc-news-waterfall-connections.png" alt="" width="930" height="335" loading="lazy">
<figcaption>Note that some connections are actually shared across more than one
domain: this is <a
href="https://datatracker.ietf.org/doc/html/rfc7540#section-9.1.1">HTTP2’s
connection coalescence</a>, available when origins share the same IP address and
certificates.</figcaption>
</figure>

As easy as that—that’s your list of potential origins!

## Don’t `preconnect` Too Many Origins

`preconnect` should be used sparingly. Connection overhead isn’t _huge_, but too
many `preconnect`s that either a) aren’t critical, or b) don’t get used at all,
is definitely wasteful.

Flooding the network with unnecessary `preconnect`s early in the page load
lifecycle can steal valuable bandwidth that could have been given to more
important resources—the overhead of certificates alone can exceed 3KB. Further,
opening and persisting connections has a CPU overhead on both the client and the
server. Lastly, Chrome will close a connection if it isn’t used within the first
10 seconds of being opened, so if you act too soon, you might end up doing it
all over again anyway.

With `preconnect`, you should strive for **as few as possible but as many as
necessary**. In fact, I would consider too many `preconnect`s a code smell, and
you probably ought to solve larger issues like [self-hosting your static
assets](/2019/05/self-host-your-static-assets/) and reducing reliance on third
parties in general.

## When to Use `crossorigin`

Okay. Now it’s time to learn why the BBC’s `preconnect`s weren’t working!

This is the third time I’ve seen this problem this month (and we’re only nine
days in…). It stems from a misunderstanding around when to use `crossorigin`.
I get the impression that developers think ‘this request is going to another
origin, so it must need the `crossorigin` attribute’. But that’s not what the
attribute is for—`crossorigin` is used to define the CORS policy for the
request. `crossorigin=anonymous` (or a bare `crossorigin` attribute) will never
exchange any user credentials (e.g. cookies); `crossorigin=use-credentials` will
always exchange credentials. Unless you know that you need it, you almost never
need the latter. But when do we use the former?

If the resulting request for a file would be CORS-enabled, you would need
`crossorigin` on the corresponding `preconnect`. Unfortunately, CORS isn’t the
most straightforward thing in the world. Fortunately, I have a shortcut…

Firstly, identify a file on the origin that you’re considering `preconnect`ing.
For example, let’s take a look at the BBC’s `box.css`. In DevTools (or
WebPageTest if you already have one available—you don’t need to run one just for
this task), look at the resource’s **request** headers:

<figure>
<img src="{{ site.cloudinary }}/wp-content/uploads/2023/12/devtools-request-headers.png" alt="" width="930" height="783" loading="lazy">
<figcaption></figcaption>
</figure>

There it is right there: **`Sec-Fetch-Mode: no-cors`**.

The `preconnect` for `nav.files.bbci.co.uk` doesn’t _currently_ (I’ll
come back to that shortly) need a `crossorigin` attribute:

```html
<link rel=preconnect href=https://nav.files.bbci.co.uk>
```

Let’s look at another request. `orbit-v5-ltr.min.css` from
`static.files.bbci.co.uk` also carries a `Sec-Fetch-Mode: no-cors` request
header, so that won’t need `crossorigin` either:

```html
<link rel=preconnect href=https://nav.files.bbci.co.uk>
<link rel=preconnect href=https://static.files.bbci.co.uk>
```

Let’s keep looking.

How about the font `BBCReithSans_W_Rg.woff2` also from
`static.files.bbci.co.uk`?

<figure>
<img src="{{ site.cloudinary }}/wp-content/uploads/2023/12/devtools-request-headers-02.png" alt="" width="930" height="783" loading="lazy">
<figcaption></figcaption>
</figure>

Hmm. This _does_ need `crossorigin` as it’s marked `Sec-Fetch-Mode: cors`. What
do we do here?

Simple!

```html
<link rel=preconnect href=https://nav.files.bbci.co.uk>
<link rel=preconnect href=https://static.files.bbci.co.uk>
<link rel=preconnect href=https://static.files.bbci.co.uk crossorigin>
```

We just add a second `preconnect` to open an additional CORS-enabled connection
to `static.files.bbci.co.uk`. (Remember earlier when the browser had opened five
connections to four origins—one of them was CORS-enabled!)

Let’s keep going and see where we end up…

As it stands, the very specific example of the homepage right now, needs the
following `preconnect`s. Notice that all origins didn’t need `crossorigin`,
except `static.files.bbci.co.uk` which needed both:

```html
<link rel=preconnect href=https://nav.files.bbci.co.uk>
<link rel=preconnect href=https://static.files.bbci.co.uk>
<link rel=preconnect href=https://static.files.bbci.co.uk crossorigin>
<link rel=preconnect href=https://m.files.bbci.co.uk>
<link rel=preconnect href=https://ichef.bbci.co.uk>
```

This feels comfortable! The browser naturally opened five connections, so I’m
happy to see that we’ve also landed on five `preconnect`s; nothing is
unaccounted for.

## `Sec-*` Request Headers

I’d recommend familiarising yourself with the entire suite of `Sec-*`
headers—they’re incredibly useful debugging tools.
