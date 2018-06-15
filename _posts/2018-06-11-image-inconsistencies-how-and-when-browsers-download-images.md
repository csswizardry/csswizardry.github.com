---
layout: post
title: "Image Inconsistencies: How and When Browsers Download Images"
date: 2018-06-11 19:02:54
categories: Web Development
meta: "How and when do browsers download certain types of image? What does that
mean for performance?"
---

This year, I’ve been working closely with the wonderful
[Coingaming](http://coingaming.io/) team out in beautiful
[Tallinn](https://www.google.co.uk/search?q=tallinn&safe=off&tbm=isch). We’ve
been working pretty hard on making their suite of online products [much
faster](https://twitter.com/csswizardry/status/1003881067189800962), and I’ve
been the technical consultant leading the project. It’s been an incredibly fun
and rewarding engagement, and we’ve made some real business- and customer-facing
improvements. One of the key reasons I’ve found the project so fun is that it’s
given me a real chance to get very forensic. Naturally, a team should always
tackle the low-hanging fruit first, but once that’s done, you get to delve much
deeper into the weeds. This blog post comes from there.

## Background

In order to get better control over how a series of thumbnail images are
displayed on the homepage of one of their products, the team opted to build them
not as `<img />` elements, but as CSS `background-image`s: this allowed them to
better size and position the images in their container, and, putting aside any
semantic concerns, it made sense from a styling point of view. My only
reservation was knowing that, because the images are defined in CSS rather than
HTML, their outgoing requests won’t start until the browser has created the
Render Tree: it’s not until all the CSS has been downloaded, parsed, and the
CSSOM constructed that the browser actually knows <q>This `div` with this class
is currently visible on the page and its background is set to be this image: I’d
better download it!</q>.

The waterfall below shows the browser waiting for CSSOM completion before it
dispatches any requests for any images—you can clearly see that the CSS needs to
finish before any images start. This is down to the simple fact that the browser
doesn’t know which (if any) images it will need until the CSSOM has been built:

<figure>
<img src="/wp-content/uploads/2018/06/waterfall-bg.png" alt="" />
<figcaption>Waterfall showing that background images cannot be downloaded until
CSSOM has completed.</figcaption>
</figure>

This is too late for such important content of theirs—users want to see the
thumbnails as soon as possible.

By moving the images to `<img />` elements (which is also semantically more
appropriate), the browser can discover them far sooner—as they become exposed to
the browser’s preload scanner—and dispatch their requests before (or in parallel
to) CSSOM completion:

<figure>
<img src="/wp-content/uploads/2018/06/waterfall-img.png" alt="" />
<figcaption>Waterfall showing how regular image elements can be downloaded
independently of CSSOM construction.</figcaption>
</figure>

This is stuff we already knew:

1. Browsers can’t possibly download `background-image`s until they’ve built the
   CSSOM.
2. Browsers shouldn’t base—thus delay—the downloading of `<img />`s on CSSOM
   completion. More on this later…

Where it gets interesting is when I started to wonder how different browsers
handle different types of image when they’re visible or not: an `<img />`
element with `display: none;` applied to it ideally wouldn’t get downloaded, but
the only way the browser would know that the image is indeed hidden is if it
waits for CSSOM completion, thus slowing down the default behavior of the `<img
/>`: what’s going to happen?

- - -

## `background-image`

I will start with `background-image` as that’s what my client’s initial use case
was. I feel like the behaviour for `background-image` should be the most
predictable as there are certain impossibilities at play (e.g. we can’t download
a `background-image` until we’ve built the CSSOM).

### What I Would Expect

I have a couple of expectations (or hopes) that I predict:

1. Browsers do not (can not) trigger a download for a `background-image` until
   it knows it needs it (i.e. until the CSSOM has been constructed).
2. Browsers would not download `background-image` that is applied to an element
   that is hidden from view (e.g. `display: none;`).

### What Actually Happens

#### Chrome (v67.0.3396.79)

* **Expectedly** Chrome does not download any `background-image` until the CSSOM
  has been constructed:
  <figure>
  <img src="/wp-content/uploads/2018/06/chrome-bg-visible.png" alt="" />
  <figcaption><a href="/wp-content/uploads/2018/06/chrome-bg-visible-full.png">View full size/quality</a></figcaption>
  </figure>
* **Unexpectedly**, Chrome will download a `background-image` that isn’t visible
  to the user:
  <figure>
  <img src="/wp-content/uploads/2018/06/chrome-bg-invisible.png" alt="" />
  <figcaption><a href="/wp-content/uploads/2018/06/chrome-bg-invisible-full.png">View full size/quality</a></figcaption>
  </figure>

#### Safari (v11.1 (13605.1.33.1.4))

* **Expectedly** Safari does not download any `background-image` until the CSSOM
  has been constructed:
  <figure>
  <img src="/wp-content/uploads/2018/06/safari-bg-visible.png" alt="" />
  <figcaption><a href="/wp-content/uploads/2018/06/safari-bg-visible-full.png">View full size/quality</a></figcaption>
  </figure>
* **Expectedly**, Safari will not download a `background-image` that isn’t
  visible to the user:
  <figure>
  <img src="/wp-content/uploads/2018/06/safari-bg-invisible.png" alt="" />
  <figcaption><a href="/wp-content/uploads/2018/06/safari-bg-invisible-full.png">View full size/quality</a></figcaption>
  </figure>

#### Firefox (v60.0.1)

* **Expectedly** Firefox does not download any `background-image` until the
  CSSOM has been constructed:
  <figure>
  <img src="/wp-content/uploads/2018/06/firefox-bg-visible.png" alt="" />
  <figcaption><a href="/wp-content/uploads/2018/06/firefox-bg-visible-full.png">View full size/quality</a></figcaption>
  </figure>
* **Expectedly**, Firefox will not download a `background-image` that isn’t
  visible to the user:
  <figure>
  <img src="/wp-content/uploads/2018/06/firefox-bg-invisible.png" alt="" />
  <figcaption><a href="/wp-content/uploads/2018/06/firefox-bg-invisible-full.png">View full size/quality</a></figcaption>
  </figure>

#### Opera (v53.0.2907.68)

* **Expectedly** Opera does not download any `background-image` until the CSSOM
  has been constructed:
  <figure>
  <img src="/wp-content/uploads/2018/06/opera-bg-visible.png" alt="" />
  <figcaption><a href="/wp-content/uploads/2018/06/opera-bg-visible-full.png">View full size/quality</a></figcaption>
  </figure>
* **Unexpectedly**, Opera will download a `background-image` that isn’t visible
  to the user:
  <figure>
  <img src="/wp-content/uploads/2018/06/opera-bg-invisible.png" alt="" />
  <figcaption><a href="/wp-content/uploads/2018/06/opera-bg-invisible-full.png">View full size/quality</a></figcaption>
  </figure>

#### Edge (v17.17134)

* **Expectedly** Edge does not download any `background-image` until the CSSOM
  has been constructed.
  <figure>
  <img src="/wp-content/uploads/2018/06/edge-bg-visible.png" alt="" />
  <figcaption><a href="/wp-content/uploads/2018/06/edge-bg-visible-full.png">View full size/quality</a></figcaption>
  </figure>
* **Unexpectedly**, Edge will download a `background-image` that isn’t visible
  to the user.
  <figure>
  <img src="/wp-content/uploads/2018/06/edge-bg-invisible.png" alt="" />
  <figcaption><a href="/wp-content/uploads/2018/06/edge-bg-invisible-full.png">View full size/quality</a></figcaption>
  </figure>

### Summary

<small>**N.B.** _Yes_ or _No_ represents factual information. _✓_ and _✗_
represent what I would consider good/expected and bad/unexpected behaviour,
respectively.</small>

|                           | Chrome | Safari | Firefox | Opera | Edge  |
| ------------------------: | :----: | :----: | :-----: | :---: | :---: |
| **Block on CSSOM**        | Yes ✓  | Yes ✓  | Yes ✓   | Yes ✓ | Yes ✓ |
| **Download if Invisible** | Yes ✗  | No ✓   | No ✓    | Yes ✗ | Yes ✗ |

### Verdict

**Firefox** and **Safari** seem to have the most preferred behaviour here: they
won’t download `background-image`s that they know they won’t need.

**Chrome**, **Opera**, and **Edge** will all download `background-image`s that
are applied to invisible elements. This feels wasteful, but I suspect it is
a preemptive optimisation to ensure that the image is on the client before the
potential event that the element becomes visible. I feel that—if this is the
case—this is an optimisation that should be left to the developer.

- - -

## `<img />`

Next, let’s take a look at how browsers handle `<img />`s.

### What I Would Expect

1. **Browsers will download `<img />` completely independently of CSSOM
   construction.** Blocking `<img />` on CSSOM construction seems very
   inefficient, and would lead to delays in downloading content.
2. **Accordingly, browsers will download `<img />` that end up being hidden from
   view**, i.e. `display: none;`. If the browser starts downloading `<img />`
   before CSSOM construction (as I expect) then it has no way of knowing _yet_
   whether that image is needed or not.

### What Actually Happens

#### Chrome

* **Expectedly**, Chrome will not block `<img />` requests on CSSOM
  construction:
  <figure>
  <img src="/wp-content/uploads/2018/06/chrome-img-visible.png" alt="" />
  <figcaption><a href="/wp-content/uploads/2018/06/chrome-img-visible-full.png">View full size/quality</a></figcaption>
  </figure>
* **Expectedly**, as a result of the above, Chrome will download `<img />` that
  ultimately end up invisible:
  <figure>
  <img src="/wp-content/uploads/2018/06/chrome-img-invisible.png" alt="" />
  <figcaption><a href="/wp-content/uploads/2018/06/chrome-img-invisible-full.png">View full size/quality</a></figcaption>
  </figure>

#### Safari

* **Expectedly**, Safari will not block `<img />` requests on CSSOM
  construction:
  <figure>
  <img src="/wp-content/uploads/2018/06/safari-img-visible.png" alt="" />
  <figcaption><a href="/wp-content/uploads/2018/06/safari-img-visible-full.png">View full size/quality</a></figcaption>
  </figure>
* **Expectedly**, as a result of the above, Safari will download `<img />` that
  ultimately end up invisible:
  <figure>
  <img src="/wp-content/uploads/2018/06/safari-img-invisible.png" alt="" />
  <figcaption><a href="/wp-content/uploads/2018/06/safari-img-invisible-full.png">View full size/quality</a></figcaption>
  </figure>

#### Firefox

* **Unxpectedly**, Firefox will block `<img />` requests on CSSOM construction.
  This means that `<img />` requests are not dispatched until the CSSOM has been
  built. This represents a surprising inefficiency:
  <figure>
  <img src="/wp-content/uploads/2018/06/firefox-img-visible.png" alt="" />
  <figcaption><a href="/wp-content/uploads/2018/06/firefox-img-visible-full.png">View full size/quality</a></figcaption>
  </figure>
* **Unexpectedly**, despite Firefox knowing it won’t need the `<img />`—as
  a result of it unexpectedly blocking on CSSOM construction—it will still
  download the `<img />` even if it knows it will not be visible. I find this
  extremely bizarre: it seems to get things wrong on both counts:
  <figure>
  <img src="/wp-content/uploads/2018/06/firefox-img-invisible.png" alt="" />
  <figcaption><a href="/wp-content/uploads/2018/06/firefox-img-invisible-full.png">View full size/quality</a></figcaption>
  </figure>

#### Opera

* **Expectedly**, Opera will not block `<img />` requests on CSSOM
  construction:
  <figure>
  <img src="/wp-content/uploads/2018/06/opera-img-visible.png" alt="" />
  <figcaption><a href="/wp-content/uploads/2018/06/opera-img-visible-full.png">View full size/quality</a></figcaption>
  </figure>
* **Expectedly**, as a result of the above, Opera will download `<img />` that
  ultimately end up invisible:
  <figure>
  <img src="/wp-content/uploads/2018/06/opera-img-invisible.png" alt="" />
  <figcaption><a href="/wp-content/uploads/2018/06/opera-img-invisible-full.png">View full size/quality</a></figcaption>
  </figure>

#### Edge

* **Expectedly**, Edge will not block `<img />` requests on CSSOM
  construction:
  <figure>
  <img src="/wp-content/uploads/2018/06/edge-img-visible.png" alt="" />
  <figcaption><a href="/wp-content/uploads/2018/06/edge-img-visible-full.png">View full size/quality</a></figcaption>
  </figure>
* **Expectedly**, as a result of the above, Edge will download `<img />` that
  ultimately end up invisible:
  <figure>
  <img src="/wp-content/uploads/2018/06/edge-img-invisible.png" alt="" />
  <figcaption><a href="/wp-content/uploads/2018/06/edge-img-invisible-full.png">View full size/quality</a></figcaption>
  </figure>

### Summary

<small>**N.B.** _Yes_ or _No_ represents factual information. _✓_ and _✗_
represent what I would consider good/expected and bad/unexpected behaviour,
respectively.</small>

|                           | Chrome | Safari | Firefox | Opera | Edge  |
| ------------------------: | :----: | :----: | :-----: | :---: | :--:  |
| **Block on CSSOM**        | No ✓   | No ✓   | Yes ✗   | No ✓  | No ✓  |
| **Download if Invisible** | Yes ✓  | Yes ✓  | Yes ✗   | Yes ✓ | Yes ✓ |

### Verdict

**Firefox** appears to block `<img />` on CSSOM construction. This seems like
a bad idea—no `<img />`s will begin downloading until Firefox has downloaded,
parsed, and applied the CSS. This means that if you have blocking stylesheets,
they’re blocking your `<img />`. This would be particularly troublesome if `<img
/>` are key content (think Imgur, Flickr, etc.).

**Firefox** gets weirder still! It waits until it’s constructed the CSSOM before
it fires off any `<img />` requests, which means it knows if the `<img />` will
be visible or not, but if the `<img />` is invisible, it will download it
anyway. This is a double-hit: Firefox blocks `<img />` on CSSOM construction yet
still downloads `<img />` that aren’t visible.

- - -

## Key Takeaways

### The Facts

* **Chrome**, **Opera**, and **Edge** will download `background-image`s that
  aren’t required for first render. This means that hidden DOM nodes that have
  a `background-image` applied to them will still have that `background-image`
  downloaded. **Beware unexpected downloads.**
* **Firefox** will block `<img />` downloads on CSSOM construction, meaning
  later-than-expected downloads. **Beware delays.**
* Further, **Firefox** will still download the `<img />` even if it wasn’t
  needed. **Beware unexpected downloads.**

### How Might this Affect You?

If you’re a product that relies heavily on content imagery (e.g. Flickr, online
publication, photographer) then Firefox will not download any of those images
until it’s dealt with your CSS. You should look into preloading any key image
content.

If you’re making heavy use of background images and, for whatever reason, are
not showing all of them for first render, beware that some browsers will go
ahead and download them anyway: you might want to look into better strategies
for hidden content (e.g. removal from the DOM rather than `display: none;`).
