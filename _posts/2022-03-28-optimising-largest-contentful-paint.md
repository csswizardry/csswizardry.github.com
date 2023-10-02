---
layout: post
title: "Optimising Largest Contentful Paint"
date: 2022-03-28 23:02:11
categories: Web Development
main: "https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2022/03/chart-full.png"
meta: "Let’s look at some more technical and non-obvious aspects of optimising Largest Contentful Paint"
---

<!--
https://csswizardry.dev/lcp/img.html
https://csswizardry.dev/lcp/background-image.html
https://csswizardry.dev/lcp/background-image-hack.html
https://csswizardry.dev/lcp/video.html
https://csswizardry.dev/lcp/svg.html
https://csswizardry.dev/lcp/lazyload.html
https://csswizardry.dev/lcp/fade.html
https://csswizardry.dev/lcp/late-modal.html

https://webpagetest.org/video/compare.php?tests=220320_BiDc0C_6AJ%2C220320_BiDc56_6AK%2C220320_AiDc4S_83Z%2C220320_BiDcN0_6AM%2C220320_BiDcJT_6AP%2C220320_BiDc6C_6AQ%2C220320_BiDcD3_6AR%2C220320_BiDcP4_6AS&thumbSize=100&ival=100&end=visual
https://docs.google.com/spreadsheets/d/17Ut1Hgj4aHeimg_Pp_xUi5gkWLMh2FKZBKnqo56RHck/edit#gid=0
-->

[Largest Contentful Paint](https://web.dev/lcp/) (LCP) is my favourite Core Web
Vital. It’s the easiest to optimise, and it’s the only one of the three that
works the exact same in the lab as it does in the field (don’t even get me
started on this…). Yet, surprisingly, it’s the least optimised CWV in CrUX—at
the time of writing, [**only half of origins in the dataset had a Good
LCP**](https://twitter.com/ChromeUXReport/status/1501325517634490376)!

{% include promo.html %}

This genuinely surprises me, because LCP is the simplest metric to improve. So,
in this post, I want to go deep and show you some interesting tricks and
optimisations, as well as some pitfalls and bugs, starting with some very simple
tips.

Let’s go.

## Solve Everything Beforehand

Let’s start with the easy stuff. LCP is a milestone timing—it measures…

> …the render time of the largest image or text block visible within the
> viewport, relative to when the page first started loading.

The important thing to note here is that Google doesn’t care how you get to LCP,
as long as you get there fast. There are a lot of other things that could happen
between the start of the page load lifecycle and its LCP. These include (but are
not limited to):

* DNS, TCP, TLS negotiation
* Redirects
* TTFB
* First Paint
* First Contentful Paint

If any of these are slow, you’re already on the back foot, and they’re going to
have a knock-on effect on your LCP. The metrics above don’t matter in and of
themselves, but it’s going to help your LCP if you can get them as low as
possible.

<figure>
<img src="{{ site.cloudinary }}/wp-content/uploads/2022/03/treo.png" alt="" loading="lazy" width="1500" height="321" />
<figcaption>
  <a href="https://treo.sh/sitespeed/csswizardry.com?formFactor=phone&metrics=ttfb%2Cfcp%2Clcp%2Cfid%2Ccls%2Col">Treo</a>
  is an incredible tool for getting timings data from CrUX.
</figcaption>
</figure>

An analogy I use with non-technical stakeholders goes a little like this:

You need to get the kids to school for 08:30. That’s all the school cares
about—that the kids are there on time. You can do plenty to help make this
happen: prepare their clothes the night before; prepare their lunches the night
before (do the same for yourself). Set appropriate alarms. Have a morning
routine that everyone follows. Leave the house with plenty of time to spare.
Plan in suitable buffer time for traffic issues, etc.

The school doesn’t care if you laid out uniforms the night before. You are being
judged on your ability to get the kids to school on time; it’s just common sense
to do as much as you can to make that happen.

Same with your LCP. Google doesn’t (currently) care about your TTFB, but a good
TTFB is going to help get closer to a good LCP.

Optimise the entire chain. Make sure you get everything beforehand as fast as
possible so that you’re set up for success.

## Optimise Your LCP Candidate

A tip that hopefully doesn’t need me to go into any real detail: if you have an
image-based LCP, make sure it is well optimised—suitable format, appropriately
sized, sensibly compressed, etc. Don’t have a 3MB TIFF as your LCP candidate.

## Avoid Image-Based LCPs

This isn’t going to work for a lot, if not most, sites. But the best way to get
a fast LCP is to ensure that your LCP is text-based. This, in effect, makes your
FCP and LCP synonymous[^1][^2]. That’s it. As simple as that. If possible, avoid
image-based LCP candidates and opt instead for textual LCPs.

The chances are, however, that won’t work for you. Let’s look at our other
options.

## Use the Best Candidate

Okay. Now we’re getting into the fun stuff. Let’s look at which LCP candidates
we have, and whether there are any relative merits to each.

There are several potential candidates for your LCP. Taken straight from
web.dev’s [Largest Contentful Paint (LCP)](https://web.dev/lcp/) page, these
are:

* `<img>` elements
* `<image>` elements inside an `<svg>` element
* `<video>` elements (the poster image is used)
* An element with a background image loaded via the
  [`url()`](https://developer.mozilla.org/docs/Web/CSS/url()) function (as
  opposed to a [CSS
  gradient](https://developer.mozilla.org/docs/Web/CSS/CSS_Images/Using_CSS_gradients))
* [Block-level](https://developer.mozilla.org/docs/Web/HTML/Block-level_elements)
  elements containing text nodes or other inline-level text elements children.

### Demos

For the purposes of this article, I built a series of reduced demos showing how
each of the LCP types behave. Each of the demos also contains a reference to
a blocking in-`<head>` JavaScript file in order to:

1. exaggerate the waterfalls, and;
2. stall the parser to see if or how each LCP type is impacted by the preload
   scanner.

It’s also worth noting that each demo is very stripped back, and doesn’t
_necessarily_ represent realistic conditions in which many responses would be
in-flight at the same time. Once we run into resource contention, LCP
candidates’ discovery may work differently to what is exhibited in these reduced
test cases. In cases like these, we might look to [Priority
Hints](https://web.dev/priority-hints/) or
[Preload](https://web.dev/preload-critical-assets/) to lend a hand. All I’m
interested in right now is inherent differences in how browsers treat certain
resources.

The initial demos can be found at:

* [🔗 `<img>`](https://csswizardry.dev/lcp/img.html)
  ```html
  <img src="lcp.jpg" ... />
  ```
* [🔗 `<image>` in `<svg>`](https://csswizardry.dev/lcp/svg.html)
  ```html
  <svg xmlns="http://www.w3.org/1000/svg">
    <image href="lcp.jpg" ... />
  </svg>
  ```
* [🔗 `poster`](https://csswizardry.dev/lcp/video.html)
  ```html
  <video poster="lcp.jpg" ...></video>
  ```
* [🔗 `background-image: url();`](https://csswizardry.dev/lcp/background-image.html)
  ```html
  <div style="background-image: url(lcp.jpg)">...</div>
  ```

[The WebPageTest
comparison](https://webpagetest.org/video/compare.php?tests=%2C220320_BiDc0C_6AJ%2C220320_BiDcJT_6AP%2C220320_BiDcN0_6AM%2C220320_BiDc56_6AK&thumbSize=200&ival=100&end=full)
is available for you to look through, though we’ll pick apart individual
waterfalls later in the article. That all comes out looking like this:

<figure>
<img src="{{ site.cloudinary }}/wp-content/uploads/2022/03/initial-lcps-sm.png" alt="" loading="lazy" width="1500" height="394" />
<figcaption>
Note a bug in reported LCP with <code>&lt;image&gt;</code> in
<code>&lt;svg&gt;</code>: more on this later. <a
href="{{ site.cloudinary }}/wp-content/uploads/2022/03/initial-lcps.png">(View full size.)</a>
</figcaption>
</figure>

**`<img>` and `poster` are identical in LCP**; **`<image>` in `<svg>` is the
next fastest**, although there is a bug in the LCP time that Chrome reports;
**`background-image`-based LCPs are notably the slowest**.

<figure>
<img src="{{ site.cloudinary }}/wp-content/uploads/2022/03/lcp-by-type.png" alt="" loading="lazy" width="1059" height="656" />
<figcaption>A bug in Chrome ≤101 mistakenly reports a text node as the LCP
element. This is fixed in version 102.</figcaption>
</figure>

As we can see, **not all candidates are born equal.** Let’s look at each in
more detail.

### `<img>` Elements

<figure>
<img src="{{ site.cloudinary }}/wp-content/uploads/2022/03/waterfall-img.png" alt="" loading="lazy" width="930" height="148" />
<figcaption>LCP candidate discovered immediately.</figcaption>
</figure>

Of the image-based LCPs, this is probably our favourite. `<img>` elements, as
long as we don’t mess things up, are quick to be discovered by [the preload
scanner](https://andydavies.me/blog/2013/10/22/how-the-browser-pre-loader-makes-pages-load-faster/),
and as such, can be requested in parallel to preceding—even blocking—resources.

#### `<picture>` and `<source />`

It’s worth noting that the `<picture>` element behaves the same way as the `<img
/>` element. This is why you need to write so much verbose syntax for your
`srcset` and `sizes` attributes: the idea is that you give the browser enough
information about the image that it can [request the relevant file via the
preload scanner](https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/html/parser/html_preload_scanner.cc;l=565?q=HTMLPreloadScanner&ss=chromium)
and not have to wait until layout. (Although, I guess—technically—there must be
like a few milliseconds compute overhead working out which combination of
`<source />`, `srcset`, `sizes` to use, but that will be mooted pretty quickly
by virtually any other moving part along the way.)

### `<image>` in `<svg>`

`<image>` elements defined in `<svg>`s display two very interesting behaviours.
The first of which is a simple bug in which Chrome misreports the LCP candidate,
seemingly overlooking the `<image>` entirely. Depending on your context, this
could mean much more favourable and optimistic LCP scores.

<figure>
<img src="{{ site.cloudinary }}/wp-content/uploads/2022/03/image-m99.png" alt="" loading="lazy" width="1500" height="970" />
<figcaption>At the time of writing, there is a bug in Chrome ≤101 in which
the reported LCP comes back as not-the <code>&lt;image&gt;</code> element. In
our demo, it is actually flagged as being the much smaller
<code>&lt;p&gt;</code> element.</figcaption>
</figure>

Once the fix rolls out in M102 (which is Canary at the time of writing, and will
reach Stable on [24 May, 2022](https://chromiumdash.appspot.com/schedule)), we
can expect accurate measurements. This does mean that you may experience
degraded LCP scores for your site.

<figure>
<img src="{{ site.cloudinary }}/wp-content/uploads/2022/03/image-m102.png" alt="" loading="lazy" width="1500" height="970" />
<figcaption>This bug is fixed in Chrome 102.</figcaption>
</figure>

Because of the current reporting bug, `<image>` in `<svg>` is likely to go from
being (inadvertently) one of the fastest LCP types, to one of the slowest. In
the unlikely event that you are using `<image>` in `<svg>`, it’s probably
something that you want to check on sooner rather than later—your scores are
likely to change.

The bug pertains only to reported LCP candidate, and does not impact how the
browser actually deals with the resources. To that end, waterfalls in all Chrome
versions look identical, and networking/scheduling behaviour remains unchanged.
Which brings me onto the second interesting thing I spotted with `<image>` in
`<svg>`:

<figure>
<img src="{{ site.cloudinary }}/wp-content/uploads/2022/03/waterfall-svg.png" alt="" loading="lazy" width="930" height="148" />
<figcaption>LCP candidate is hidden from the preload scanner.</figcaption>
</figure>

`<image>` elements defined in `<svg>`s appear to be hidden from the preload
scanner: that is to say, the `href` attribute is not parsed until the browser’s
primary parser encounters it. I can only guess that this is simply because the
preload scanner is built to scan HTML and not SVG, and that this is by design
rather than an oversight. Perhaps an optimisation that Chrome could make is to
preload scan embedded SVG in HTML…? But I’m sure that’s much more easily said
than done…

### `<video>` Elements’ `poster` Attribute

I’m pleasantly surprised by the behaviour exhibited by the `<video>`’s `poster`
attribute. It seems to behave identically to the `<img />` element, and is
discovered early by the preload scanner.

<figure>
<img src="{{ site.cloudinary }}/wp-content/uploads/2022/03/waterfall-video.png" alt="" loading="lazy" width="930" height="148" />
<figcaption>LCP candidate discovered immediately.</figcaption>
</figure>

This means that `poster` LCPs are inherently pretty fast, so that’s nice
news.

The other news is that it looks like there’s [intent to take the first frame of
a video](https://bugs.chromium.org/p/chromium/issues/detail?id=1289664) as the
LCP candidate if no `poster` is present. That’s going to be a difficult LCP to
get under 2.5s, so either don’t have a `<video>` LCP at all, or make sure you
start using a `poster` image with it.

### `background-image: url();`

<figure>
<img src="{{ site.cloudinary }}/wp-content/uploads/2022/03/waterfall-css.png" alt="" loading="lazy" width="930" height="148" />
<figcaption>LCP candidate discovered when relevant DOM node is parsed (which is
blocked by synchronous JS).</figcaption>
</figure>

Resources defined in CSS (chiefly anything requested via the [`url()`
function](https://developer.mozilla.org/en-US/docs/Web/CSS/url)) are slow by
default. The most common candidates here are background images and web fonts.

The reason these resources (in this specific case, background images) are slow
is because they aren’t requested until the browser is ready to paint the DOM
node that needs them. You can read more about that in this Twitter thread:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Simple yet significant
thing all developers should keep in mind: CSS resources (fonts, background
images) are not requested by your CSS, but by the DOM node that needs them
[Note: slight oversimplification, but the correct way to think about
it.]</p>&mdash; Harry Roberts (@csswizardry) <a
href="https://twitter.com/csswizardry/status/1436361516534620168?ref_src=twsrc%5Etfw">10 September
2021</a></blockquote>

This means that `background-image` LCPs are requested at the very last moment,
which is far too late. We don’t like `background-image` LCPs.

#### Getting Around `background-image` Issues

If you currently have a site whose LCP is a `background-image`, you might be
thinking of refactoring or rebuilding that component right now. But, happily,
there’s a very quick workaround that requires almost zero effort: let’s
complement the background with a hidden `<img />` that the browser can discover
much earlier.

```html
<div style="background-image: url(lcp.jpg)">
  <img src="lcp.jpg" alt="" width="0" height="0" style="display: none !important;" />
</div>
```

This little hack allows the preload scanner to pick up the image, rather than
waiting until the browser is about to render the `<div>`. This came in 1.058s
faster than the naive `background-image` implementation. You’ll notice that this
waterfall almost exactly mimics the fastest `<img />` option:

<figure>
  <img src="{{ site.cloudinary }}/wp-content/uploads/2022/03/waterfall-bg-hack.png" alt="" loading="lazy" width="930" height="148" />
</figure>

We could also `preload` this image, rather than using an `<img />` element, but
I generally feel that `preload` is a bit of a code smell and should be avoided
if possible.

### Summary

In summary:

* text-based LCPs are almost always going to be the fastest;
* `<img />` and `poster` LCPs are nice and fast, discoverable by the preload
  scanner;
* `<video>` without a `poster` might have its first frame considered as an LCP
  candidate in future versions of Chrome;
* `<image>` in `<svg>` is currently misreported but is slow because the `href`
  is hidden from the preload scanner;
* `background-image`s are slow by default, because of how CSS works;
  * we can sidestep this issue by adding an invisible `<img />`.

- - -

## Don’t Shoot Yourself in the Foot

Alright! Now we know which are the best candidates, is there anything else can
do (or avoid doing) to make sure we aren’t running slowly? It turns out there
are plenty of things that folks do which inadvertently hold back LCP scores.

### Don’t Lazy-Load Your LCP

Every time I see this, my heart sinks a little. Lazy-loading your LCP is
completely counter-intuitive. Please don’t do it!

<figure>
<img src="{{ site.cloudinary }}/wp-content/uploads/2022/03/waterfall-lazyload.png" alt="" loading="lazy" width="930" height="148" />
</figure>

Interestingly, one of the features of `loading="lazy"` is that it [hides the
image in question from the preload
scanner](https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/html/parser/html_preload_scanner.cc;l=601;drc=7fb345a0da63049b102e1c0bcdc8d7831110e324?q=HTMLPreloadScanner&ss=chromium).
This means that, even if the image is in the viewport, the browser will still
late-request it. This is why you can’t safely add `loading="lazy"` to all of
your images and simply hope the browser does (what you think is) the right
thing.

In my tests, lazily loading our image pushed LCP back to 4.418s: 1.274s slower
than the `<img />` variant, and almost identical to the `background-image` test.

### Don’t Fade-In Your LCP

Predictably, fading in our image over 500ms pushes our LCP event back by 500ms.
Chrome takes the end of the animation period as the LCP measurement, moving us
to a 3.767s LCP event rather than 3.144s.

<figure>
<img src="{{ site.cloudinary }}/wp-content/uploads/2022/03/fade.png" alt="" loading="lazy" width="1401" height="236" />
<figcaption>Note the image arrives at 3.5s, yet the LCP is reported at 4s.</figcaption>
</figure>

Avoid fading in your LCP candidate, whether it’s image- or text-based.

### Don’t Host Your LCP Off-Site

Where possible, we should always [self-host our static
assets](/2019/05/self-host-your-static-assets/). This
includes our LCP candidate.

It’s not uncommon for site owners to use third-party image optimisation services
such as [Cloudinary](https://cloudinary.com/) to serve both automated and
dynamically optimised images: on the fly resizing, format switching,
compression, etc. However, even when taking into account the performance
improvements of of these services, the cost of heading to a different origin
almost always outweighs the benefits. [In
testing](https://www.webpagetest.org/result/220329_BiDcEY_A7T/2/details/#request-overlay-step1-2),
the time spent resolving a new origin added 509ms to overall time spend
downloading our LCP image.

By all means, use third party services for non-critical, non-LCP images, but if
you can, bring your LCP candidate onto the same origin as the host page. That’s
exactly what I do for [this site](https://github.com/csswizardry/csswizardry.github.com/blob/a5875b108191f3fcdc580cd13b02e285fee1a5b0/_includes/header--masthead.html#L11-L13).

<small>**N.B.** While `preconnect` may help a little, it’s still highly unlikely
to be faster than not opening a new connection at all.</small>

### Don’t Build Your LCP on the Client

I see this all too often, and it’s part of the continued obsession with
JavaScript. Ideally, a browser will receive your HTML response, and the
reference to the LCP candidate (ideally an `<img />` element) will be right
there immediately. However, if you build your LCP candidate with JS, the process
is much, much more drawn out.

<q>Building your LCP candidate in JS</q> could range from a simple JS-based
image gallery, right the way through to a fully client-rendered page. The below
waterfall shows the latter:

<figure>
<img src="{{ site.cloudinary }}/wp-content/uploads/2022/03/csr-lcp.png" alt="" loading="lazy" width="1012" height="233" />
</figure>

The first response is the HTML. What we’d like to have is an `<img />` right
there in the markup, waiting to be discovered almost immediately. Instead, the
HTML requests a `defer`ed `framework.js` at entry 12. This, in turn, eventually
requests API data about the current product, at entry 50. This response contains
information about related product imagery, which is eventually put into the
virtual DOM as an `<img />`, finally initiating a request for the LCP candidate
at entry 53, well over 7s into the page load lifecycle.

### Don’t Usurp Your Own LCP

This one breaks my heart every time I see it… Don’t late-load any content that
accidentally becomes your LCP candidate. Usually, these are things like cookie
banners or newsletter modals that cover content and get flagged as a very late
LCP. I mocked up a late-loading modal for our tests, and what is important to
remember is that the score is accurate, just not what we are hoping for:

<figure>
<img src="{{ site.cloudinary }}/wp-content/uploads/2022/03/late-modal.png" alt="" loading="lazy" width="1521" height="236" />
<figcaption><a href="{{ site.cloudinary }}/wp-content/uploads/2022/03/late-modal.png">View full size.</a></figcaption>
</figure>

Make sure your LCP candidate is what you expect it to be. Design modals and
cookie banners etc. to:

1. load immediately, and;
2. not actually be your largest piece of content.

- - -

## Summary

Alright. We covered quite a lot there, but the takeaway is pretty simple:
**text-based LCPs are the fastest**, but unlikely to be possible for most. Of
the image based LCP types, **`<img />` and `poster`** are the fastest.
**`<image>`s defined in `<svg>`s are slow** because they’re hidden from the
preload scanner. Beyond that, there are several things that we need to avoid:
**don’t lazy load** your LCP candidate, and **don’t build your LCP in JS**.

<figure>
<img src="{{ site.cloudinary }}/wp-content/uploads/2022/03/chart-full.png" alt="" loading="lazy" width="1059" height="656" />
<figcaption><a href="{{ site.cloudinary }}/wp-content/uploads/2022/03/chart-full.png">View full size.</a></figcaption>
</figure>

[^1]: You’ll need to make sure you’re using `font-display: [swap|optional];` so as to avoid an initial, invisible text paint.
[^2]: I did discover [another bug](https://bugs.chromium.org/p/chromium/issues/detail?id=1310995) while investigating this, though.
