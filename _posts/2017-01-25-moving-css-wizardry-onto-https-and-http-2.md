---
layout: post
title: "Moving CSS Wizardry onto HTTPS and HTTP/2"
date: 2017-01-25 11:45:58
categories: Web Development
meta: "Improving security and performance on CSS Wizardry"
---

Hopefully by now, you should be able to [read this article over
HTTPS](https://csswizardry.com/2017/01/moving-css-wizardry-onto-https-and-http-2/)
and HTTP/2. (If that link doesn’t work, please hit your back button and [let me
know](https://twitter.com/csswizardry)!) I made the switch yesterday, and all
being well the new DNS settings have propagated through. At some point soon I
will begin forcing all HTTP traffic to HTTPS.

The site is still built with Jekyll and hosted on GitHub Pages, but it’s now
fronted by Cloudflare who offer a plethora of [performance-related
services](https://www.cloudflare.com/performance/). I was only really interested
in HTTPS because it allows me to use, among other things, HTTP/2[^1], Brotli,
and Service Worker (<del>I’m not actually using the latter two yet, but now at
least I can</del> CSS Wizardry is now running on a simple Service Worker!), and
when my buddy [James](https://twitter.com/jameskirkby) tipped me off as to [just
how
simple](https://blog.cloudflare.com/secure-and-fast-github-pages-with-cloudflare/)
the process is, I got stuck in and got it done.

As an aside, I had some issues specific to my domain registrar (not GitHub or
Cloudflare) which my very good friend
[Steve](https://twitter.com/StephenMelrose) helped out with. He’s a very
talented software and Ops engineer who managed to solve in _minutes_ a problem
that had troubled me all day. Thanks, Steve!

## HTTPS

My site is completely static; it doesn’t take any user input, there is no logic
or scripting, no database, so I didn’t feel like the need for HTTPS _from a
security point of view_ was all that pressing[^2]. However, HTTPS is a
prerequisite for a number of other technologies, and having a secure
site—regardless of its content—is never a bad thing. More on the first bit in a
moment, but for now I want to talk a little about security.

I imagine that although most users won’t have much of an understanding as to the
technical implications behind a secure or a not-secure site (I’m hesitant to use
the word _insecure_), they are becoming aware that there is such thing as
security. With Google’s intent to [mark certain webpages as
insecure](https://security.googleblog.com/2016/09/moving-towards-more-secure-web.html),
and the general increase in awareness, users _do_ know that secure websites are
a thing. The implication, therefore, is that any site that isn’t explicitly
marked as being secure must be insecure (whether that’s actually the case or
not).

To this end, I think that HTTPS is as much an exercise in branding and trust as
it is in security, and that it will steadily become more and more ubiquitous.
This is only a good thing.

Further, HTTPS is required in order for certain other technologies to be
utilised:

* **Brotli**, an improved compression algorithm from Google, needs to run over
  HTTPS because of third parties (ISPs, proxies, etc.) infamously trying to
  recompress already compressed transfer. By preventing them getting at it in
  the first place, it means that they can’t try running gzip over a new, unknown
  content encoding (e.g. Brotli).
* **Service Worker** absolutely needs to run over HTTPS, because it’s basically
  a man in the middle. We’re building a proxy that sits in between our users and
  our servers, so the need for security there should be pretty clear.

## HTTP/2

HTTP/2 (or H2, as it’s commonly referred to) is a vast, vast improvement on the
HTTP/1.1 protocol that we’ve been using for almost two decades. It brings many
benefits to both developers and users, but many of its best features are centred
around performance:

* **Compressed headers**: HTTP/1.1 sends its headers uncompressed, which creates
  a surprising amount of overhead. HTTP/2 reduces that by compressing the
  response headers as well as the response body.
* **Multiplexing:** get around head of line blocking and lack of parallelisation
  by sending multiple assets asynchronously over the same TCP connection.
* **Server push**: allows developers to send late requested assets preemptively.

A lot of HTTP/2’s additions will moot the domain sharding, concatenating, and
inlining strategies we came up with as hacks, and will instead allow us to
deliver faster experiences with simpler architectures: we can optimise assets
all we like, but there is no denying that HTTP/2 gives developers an astounding
performance boost right out of the box.

Currently I’m not making that much use of anything HTTP/2 offers me other than
multiplexing and header compression (because I didn’t even have to lift a
finger for those). My site is already pretty slim, and I’m serving so few assets
that one could almost argue over-engineering, but one really great example of
where I will benefit from HTTP/2 multiplexing is this [relatively large list of
images on the homepage](/#section:clients).

## Browser Support

Support for HTTP/2 is [pretty good](http://caniuse.com/#feat=http2), and always
improving. Servers capable of serving over HTTP/2 will also still deliver to
HTTP/1.x clients, so nothing will break.

However, it might not be time for your company to switch over too.
Unfortunately, HTTP/2 best practices become bad practices in HTTP/1.1, and
HTTP/1.1 best practices become bad practices in HTTP/2. Optimising for one will
be detrimental to the other, and it’s pretty hard to satisfy both camps.

Fortunately for me, looking at the data, over the past 24 months over 85%
of CSS Wizardry’s traffic has come from a browser that supports HTTP/2. For me
it’s pretty clear that using HTTP/2 is the right decision. Other companies
(government, ecommerce, etc.) might not have quite such a clear cut view.

## What Next

<del>Next up, I can look at implementing</del> I have now implemented a simple
Service Worker to provide better caching strategies, as well as a simple offline
page for users on poor or non-existent connections. I should also look into
splitting up my CSS into more granular, individually cacheable chunks.

Unfortunately, given that I am still hosting on GitHub Pages, I am limited in
how much I can implement. Things like enabling Brotli will have to be done by
Cloudflare, and utilising Server Push would require access to server-level
configuration. That stuff will have to wait, but I can probably manage without
it whilst I’m serving up a flat-file website with such a small footprint in the
first place.

- - -

With all of this said, despite HTTP/2’s clearly superior approach to optimising
user experiences, there is still great need for fundamental performance
knowledge within teams: optimising assets, structuring more elegant delivery,
and building to support non-HTTP/2 environments are all still very important.

If you’d like any advice or help with any of the above, I am lining up
performance consultancy work for Q2 onward. [Get in touch.](/contact/)

- - -

[^1]: Interestingly, the HTTP/2 standard doesn’t define HTTPS as being mandatory, but almost all browser vendors have stated that they will only support HTTP/2 over a secure connection, which makes it pretty mandatory in practice.
[^2]: I know, I know: there’s a lot more benefit to HTTPS than that.
