---
layout: post
title: "The Fastest Google Fonts"
date: 2020-05-19 17:35:04
categories: Web Development
meta: "Google Fonts is fast. Now it’s faster. Much faster."
---

<!--
* The Wiz: https://www.webpagetest.org/video/compare.php?tests=200518_3N_cb4cdd57dd6eb154cdaacdd563253fd1
200518_2J_70c5f6c1c92a1cd436e525ac2b895f51
200518_AY_290d20f93c0e4b469e0bbe60a63f678e
200518_8F_49cb76e22485f51fad729e085a8bd08e
200518_4W_7d70995268b4aa4f495304063d449ae3&thumbSize=150&ival=100&end=all
* harry.is: https://wpt1.speedcurve.com/video/compare.php?tests=200518_W4_fc45dbb9bc1ce576f670d591d8b3dc6e%2C200518_PR_df4e11518dd3daae51841501e0d38f84%2C200518_ZC_867eb106ecbcf59739e05d2747a0a96a%2C200518_DZ_b6c3032d6d3ac7fd78a1d7eadca76b54%2C200518_0N_2c58f89634840837db9162bc01128251&thumbSize=150&ival=16.67&end=visual
-->

For the most part, web fonts nowadays are faster than ever. With more
standardised FOUT/FOIT behaviour from browser vendors, to the newer
`font-display` specification, performance—and therefore the user—seems to have
been finally been put front-and-centre.

It’s widely accepted that self-hosted fonts are the fastest option: same origin
means reduced network negotiation, predictable URLs mean we can `preload`,
self-hosted means we can set our own [`cache-control`
directives](https://csswizardry.com/2019/03/cache-control-for-civilians/), and
full ownership mitigates [the risks that come with leaving static assets on
third-party
origins](https://csswizardry.com/2019/05/self-host-your-static-assets/).

That said, the convenience of a service like Google Fonts cannot be overstated.
Their ability to serve the tiniest possible font files tailored to specific user
agents and platforms is amazing, and with such a huge, freely-available library
served from Google-grade CDNs… I definitely see why people continue to turn to
it.

On this site, in which performance is the only name of the game, I forgo web
fonts entirely, opting instead to make use of the visitor’s system font. This is
fast, incredibly well suited to the device in question, and has almost zero
engineering overhead. But, on [harry.is](https://harry.is), I really wanted to
throw caution to the wind. To hell with it! Let’s have a web font!

However, I still needed to be fast.

While prototyping, I turned to Google Fonts, and with their recent ability to
support `font-display` via a URL parameter (`&display=swap`), I knew that things
would stay pretty speedy. Then I had an idea.

It started with a tweet:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">TIP: If you’re going to
use `font-display` for your Google Fonts then it makes sense to asynchronously
load the whole request chain. <a
href="https://t.co/k6obyVZGZP">pic.twitter.com/k6obyVZGZP</a></p>&mdash; Harry
Roberts (@csswizardry) <a
href="https://twitter.com/csswizardry/status/1259790019067351045?ref_src=twsrc%5Etfw">11
May, 2020</a></blockquote>

While `font-display: swap;` is a huge win, there are still a lot of things
leaving me feeling uneasy. What else could I do to make Google Fonts _fast_?

Suffice to say, I ended up going down a little rabbit hole…

## Testing

I ran the same suite of tests against the [harry.is](https://harry.is) and
[csswizardry.com](https://csswizardry.com) homepages. I started out with
harry.is because that’s where I was using Google Fonts, but I felt it was a page
too simple to be realistic. So, I cloned the CSS Wizardry homepage a bunch of
times and implemented the various different methods there. For each section of
this post, I will list the results for both sites. My variants are:

* **Legacy:** Google Fonts with no `font-display`.
* **`font-display: swap;`:** Using Google Fonts’ new default.
* **Async CSS:** Loading the Google Fonts File asynchronously.
* **`preload`:** `preload`ing the CSS file to increase its priority.
* **`preconnect`:** Warming up the `fonts.gstatic.com` origin myself.

Further, each variant is additive—it includes the previous variant as well as
its own additions. I didn’t try _just_ `preload` or _just_ async, because it
would be pointless—we know that a combination will fare better than any on their
own.

For each test, I captured the following metrics:

* **First Paint (FP):** To what extent is the critical path affected?
* **First Contentful Paint (FCP):** How soon can we actually read something,
  whether it’s a web font or not?
* **First Web Font (FWF):** At what point has the first web font loaded?
* **Visually Complete (VC):** When has everything settled down (a proxy, but not
  equivalent to, Last Web Font)?
* **Lighthouse Score:** Does it even count if it wasn’t on Lighthouse?

**N.B.** All tests were conducted using a private WebPageTest instance
(WebPageTest is down right now so I was unable to use the public instance, which
means I can’t share any URLs—apologies). The specific profile was a Samsung
Galaxy S4 over 3G.

To make the snippets easier to read, I’m going to replace all instances of
`https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400;1,700`
with `$CSS`.

## Default/Legacy

Google Fonts played a really great move in the last year or so. By default, any
newly created Google Font snippet comes with the `&display=swap` parameter that
injects `font-display: swap;` into all of the `@font-face` at-rules. The value
of the parameter can be any of `swap`, `optional`, `fallback`, or `block`. You
can [read more on
MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display).

For my baseline, however, I was going to trim the `font-display` back off. This
is the legacy format that a lot of sites will likely still use, and it makes for
a more suitable baseline to compare against.

**Snippet:**

{% highlight html %}
<link rel="stylesheet"
      href="$CSS" />
{% endhighlight %}

There are two key issues here:

1. A synchronous, ergo render-blocking, CSS file on a third-party origin.
2. A file containing `@font-face` at-rules with no `font-display` descriptors.

It’s synchronous on top of synchronous—not good.

**Results (s) – harry.is:**

| FP  | FCP | FWF | VC  | Lighthouse |
|----:|----:|----:|----:|-----------:|
| 3.4 | 4.6 | 4.9 | 5.0 |         98 |

**Results (s) – CSS Wizardry:**

| FP  | FCP | FWF | VC  | Lighthouse |
|----:|----:|----:|----:|-----------:|
| 3.4 | 4.3 | 4.4 | 4.4 |         96 |

Alright. Here’s our baseline. The Google Fonts file is the only render-blocking
external resource either of the two tests has, and we can see they both have the
exact same first paint. One thing I was happily surprised by during these
experiments was the consistency of Google Fonts.

At this point, Lighthouse is giving one error and one warning:

* <q>(Error) Ensure text remains visible during webfont load</q>
* <q>(Warning) Eliminate render-blocking resources</q>

The first is a result of not having a web font loading solution (e.g.
`font-display`); the second is a result of the synchronous Google Fonts CSS
file.

Now, let’s start adding some progressive changes and, hopefully, improvements.

## `font-display: swap;`

For this test, I added the `&display=swap` back in. In effect, this makes the
font files themselves asynchronous—the browser immediately displays our fallback
text before `swap`ping to the web font whenever it arrives. This means we’re not
going to leave users looking at any invisible text (FOIT), which makes for both
a faster and more pleasant experience.

**N.B.** It’s only more pleasant if you make the effort to define a suitable
fallback to display in the interim—flashing a page full of Times New Roman
before settling on Open Sans would likely be a net worse experience. Thankfully,
[Monica](https://twitter.com/notwaldorf) has made this process not only easy,
but surprisingly fun. I wouldn’t be able to do this bit without her [_Font Style
Matcher_](https://meowni.ca/font-style-matcher/).

**Snippet:**

{% highlight html %}
<link rel="stylesheet"
      href="$CSS&display=swap" />
{% endhighlight %}

**Results – harry.is:**

|                       | FP  | FCP  | FWF  | VC   | Lighthouse |
|-----------------------|----:|-----:|-----:|-----:|-----------:|
|                       | 3.4 |  3.4 |  4.5 |  5.2 |         99 |
| Change from Baseline: |   0 | −1.2 | −0.4 | +0.2 |         +1 |

**Results – CSS Wizardry:**

|                       | FP   | FCP  | FWF  | VC   | Lighthouse |
|-----------------------|-----:|-----:|-----:|-----:|-----------:|
|                       |  3.6 |  3.6 |  4.6 |  4.6 |         95 |
| Change from Baseline: | +0.2 | −0.7 | +0.2 | +0.2 |         −1 |

We haven’t removed any render-blocking resources from the critical path, so
I wasn’t expecting to see any improvements in first paint. In fact, while
harry.is remained identical, CSS Wizardry got 200ms slower. What we do see,
however, is **a dramatic improvement in first contentful paint**—over a second
on harry.is! **First web font improved on harry.is**, but not on
csswizardry.com. Visually complete was 200ms slower.

I’m happy to say, for the metrics that matter the most, **we are 700–1,200ms
faster**.

While this does massively improve the time it takes the web font to render, it’s
still defined inside a synchronous CSS file—we can only expect so much
improvement from this move.

Predictably, Lighthouse now only gives one warning:

* <q>(Warning) Eliminate render-blocking resources</q>

Therefore, the next step is to solve the synchronous CSS file.

To quote, err, myself: <q>If you’re going to use `font-display` for your Google
Fonts then it makes sense to asynchronously load the whole request chain.</q> It
was this initial thought that led to my tweet in the first place—if I’ve
effectively made the contents of the CSS file asynchronous, then it kinda sucks
to leave the CSS file itself fully synchronous.

**`font-display: swap;` is a good idea.**

## Async CSS

Making your CSS asynchronous is one of the key techniques involved in employing
Critical CSS. While there are a number of ways to achieve this, I’d dare say the
simplest and most ubiquitous is [Filament Group’s print media type
trick](https://www.filamentgroup.com/lab/load-css-simpler/).

This will implicitly tell the browser to load the CSS file in a non-blocking
fashion, applying the styles only to the `print` context. However, the moment the
file arrives, we tell the browser to apply it to `all` contexts, thus styling
the rest of the page.

**Snippet:**

{% highlight html %}
<link rel="stylesheet"
      href="$CSS&display=swap"
      media="print" onload="this.media='all'" />
{% endhighlight %}

While the trick is devilishly simple—which is what makes it so cool—**I’ve long
had my reservations**. Y’see, a regular, synchronous stylesheet blocks
rendering, so a browser will assign it _Highest_ priority. A print stylesheet
(or any stylesheet that doesn’t match the current context) is assigned the
priority at the complete opposite end of the spectrum: _Idle_.

This means that as browsers begin making requests, the asynchronous CSS file
often gets grossly under-prioritised (or rather, it’s prioritised correctly, but
probably way less than you expect). Take for example Vitamix, a client for whom
I implemented asynchronous CSS for their own font provider(s):

<figure>
<img src="/wp-content/uploads/2020/05/waterfall-vitamix.png" alt="" />
<figcaption>While Chrome can do asynchronous DNS/TCP/TLS, it will serialise and
stall non-critical requests on slower connections.</figcaption>
</figure>

The browser is doing exactly what we told it: request these CSS files with
a print-stylesheet’s worth of priority. Thus, on a 3G connection, it takes over
nine seconds to download each file. The browser puts almost everything else,
including in-`body` resources, ahead of our print stylesheets. This means that
the page in question didn’t render its custom font until an eyewatering 12.8s on
3G.

Thankfully, while dealing with web fonts, this isn’t the end of the world:

* they should always be considered an enhancement anyway, so we need to be able
  to cope without them;
* we can and should design decent fallbacks for use during their absence, and;
* if we expect delays of such severity, we should use `font-display: optional;`.

For below the fold CSS, however, delays of almost 10 seconds are
unacceptable—it’s almost 100% certain that a user will have scrolled within that
timeframe.

Still! What happens to Google Fonts if we load it asynchronously?

**Results – harry.is:**

|                       | FP   | FCP  | FWF  | VC   | Lighthouse |
|-----------------------|-----:|-----:|-----:|-----:|-----------:|
|                       |  1.8 |  1.8 |  4.5 |  5.1 |        100 |
| Change from Baseline: | −1.6 | −2.8 | −0.4 | +0.1 |         +2 |
| Change from Previous: | −1.6 | −1.6 |    0 | −0.1 |         +1 |

**Results – CSS Wizardry:**

|                       | FP   | FCP  | FWF  | VC   | Lighthouse |
|-----------------------|-----:|-----:|-----:|-----:|-----------:|
|                       |  1.7 |  2.2 |  4.9 |  5.0 |         99 |
| Change from Baseline: | −1.7 | −2.1 | +0.5 | +0.6 |         +3 |
| Change from Previous: | −1.9 | −1.4 | +0.3 | +0.4 |         +4 |

**These results are tremendous.**

I’m really happy with these outcomes. **First paint was a staggering 1.6–1.7s
improvement** on our baseline, and **up to a 1.9s improvement on the previous
variant** in the case of CSS Wizardry. **First contentful paint was improved as
much as 2.8s** against our baseline, and **Lighthouse scores hit 100** for the
first time.

As far as the critical path is concerned, this was a huge win.

However—and this is a big _however_—as a result of lowering the priority of the
CSS file, our **first web font is up to 500ms slower** in the case of CSS
Wizardry against our baseline. This is the danger of the print media hack.

Asynchronously loading Google Fonts is a net good idea, but reducing the
priority of the CSS file has actually slowed down the rendering of our custom
font.

**I’m going to say that asynchronous CSS is an overall good idea but I need to
somehow mitigate the priority issue.**

## `preload`

Okay, so if print CSS is _too_ low priority, what we need is a high priority
asynchronous fetch. Enter `preload`.

Complementing our media-trick stylesheet with a `preload` ensures we get the
best of all worlds:

1. an asynchronous high priority fetch that will work in almost all modern
   browsers, and;
2. a very widely supported method for reapplying CSS that we loaded
   asynchronously.

**N.B.** We can’t go full `preload` as it isn’t widely enough supported. In
fact, at the time of writing, about 20% of this site’s visitors would be unable
to make use of it. Consider the print stylesheet a fallback.

**Snippet:**

{% highlight html %}
<link rel="preload"
      as="style"
      href="$CSS&display=swap" />

<link rel="stylesheet"
      href="$CSS&display=swap"
      media="print" onload="this.media='all'" />
{% endhighlight %}

**N.B.** In future, we should be able to use Priority Hints to solve this issue.

**Results – harry.is:**

|                       | FP   | FCP  | FWF  | VC   | Lighthouse |
|-----------------------|-----:|-----:|-----:|-----:|-----------:|
|                       |  1.8 | 1 .8 |  4.5 |  5.3 |        100 |
| Change from Baseline: | −1.6 | −2.8 | −0.4 | +0.3 |         +2 |
| Change from Previous: |    0 |    0 |    0 | +0.2 |          0 |

**Results – CSS Wizardry:**

|                       | FP   | FCP  | FWF  | VC   | Lighthouse |
|-----------------------|-----:|-----:|-----:|-----:|-----------:|
|                       |  2.0 |  2.0 |  4.3 |  4.3 |         98 |
| Change from Baseline  | −1.4 | −2.3 | −0.1 | −0.1 |         +2 |
| Change from Previous  | +0.3 | −0.2 | −0.6 | −0.7 |         −1 |

While first paint either remained the same or got slower, **first contentful
paint either remained the same or got faster**, and in the case of CSS Wizardry,
**first web font was a staggering 600ms faster** than the previous iteration.

In the case of harry.is, almost nothing changed since our previous variant.
**Visually complete was 200ms faster**, but any first- metrics were untouched.
It was seeing these results that actually spurred me to also test against CSS
Wizardry. Because harry.is is such a small and simple page, there wasn’t much
network contention for a print stylesheet to yield to—changing its priority
didn’t really help it out much at all.

In the case of CSS Wizardry, we see first paint 300ms slower, which is
unexpected but unrelated (there is no render blocking CSS, so changing the
priority of an asynchronous CSS file can have no bearing here—I’m going to chalk
it up to an anomaly in testing). Happily, **first contentful paint improved by
200ms**, **first web font was 600ms faster**, and **visually complete was 700ms
faster**.

**`preload`ing Google Fonts is a good idea.**

## `preconnect`

The last piece of the puzzle I wanted to solve the trip to yet-another origin.
While we link out to `fonts.googleapis.com` for our CSS, the font files
themselves are hosted on `fonts.gstatic.com`. On a high-latency connection, this
spells bad news.

Google Fonts are good to us—they `preconnect` the `fonts.gstatic.com` origin
preemptively via an HTTP header attached to the `fonts.googleapis.com` response:

<figure>
<img src="/wp-content/uploads/2020/05/screenshot-header.png" alt="" />
<figcaption>While not all that effective in these demos, I wish more third-party
providers would do things like this.</figcaption>
</figure>

However, the execution of this header is bound by the response’s TTFB, which on
high-latency networks can be very, very high. The median TTFB (including request
queueing, DNS, TCP, TLS, and server time) for the Google Fonts CSS file across
all tests was 1406ms. Conversely, the median download time for the CSS file was
just 9.5ms—it took 148× longer to get to the headers of the file than it did to
download the file itself.

Put another way: even though Google are `preconnect`ing the `fonts.gstatic.com`
origin for us, they’re only gaining about a 10ms head-start. Put another-other
way, this file is [latency-bound, not
bandwidth-bound](https://csswizardry.com/2019/01/bandwidth-or-latency-when-to-optimise-which/).

If we implement a first-party `preconnect`, we should stand to make some pretty
huge gains. Let’s see what happens.

**Snippet:**

{% highlight html %}
<link rel="preconnect"
      href="https://fonts.gstatic.com"
      crossorigin />

<link rel="preload"
      as="style"
      href="$CSS&display=swap" />

<link rel="stylesheet"
      href="$CSS&display=swap"
      media="print" onload="this.media='all'" />
{% endhighlight %}

We can visualise the benefits well in WebPageTest:

<figure>
<img src="/wp-content/uploads/2020/05/anim-preconnect.gif" alt="" />
<figcaption>See just how much we can bring connection overhead forward with
<code>preconnect</code>.</figcaption>
</figure>

**Results – harry.is:**

|                       | FP   | FCP  | FWF  | VC   | Lighthouse |
|-----------------------|-----:|-----:|-----:|-----:|-----------:|
|                       |  1.8 |  1.8 |  3.8 |  4.4 |        100 |
| Change from Baseline  | −1.6 | −2.8 | −1.1 | −0.6 |         +2 |
| Change from Previous  |    0 |    0 | −0.7 | −0.9 |          0 |

**Results – CSS Wizardry:**

|                       | FP   | FCP  | FWF  | VC   | Lighthouse |
|-----------------------|-----:|-----:|-----:|-----:|-----------:|
|                       |  1.9 |  1.9 |  3.5 |  3.6 |         99 |
| Change from Baseline  | −1.5 | −2.4 | −0.9 | −0.8 |         +3 |
| Change from Previous  | −0.1 | −0.1 | −0.8 | −0.7 |         +1 |

Here we go! First (contentful) paint is realistically untouched. Any changes
here are unrelated to our `preconnect` at the `preconnect` only impacts
resources after the critical path. Our focus is on first web font and visually
complete, both of which show tremendous improvement. **700–1,200ms improvement
on first web font** and **700–900ms improvement on visually complete** against
our previous variant, and **600–900ms and 600–800ms respective improvements**
against our baseline. **Lighthouse scores are sitting pretty at 100 and 99.**

**`preconnect`ing `fonts.gstatic.com` is a good idea.**

## Bonus: `font-display: optional;`

Using asynchronous CSS and `font-display` leaves us susceptible to FOUT (or,
hopefully, FOFT if we’ve designed our <i>F</i>allbacks properly). To try and
mitigate this, I decided to run a test using `font-display: optional;`.

This variation tells the browser that web fonts are considered optional, and if
we can’t get hold of the font files during our <q>extremely small block
period</q> then we offer <q>no swap period</q>. The practical upshot of which is
that in the event that the web fonts takes too long to load, that pageview won’t
utilise it at all. This helps to prevent the FOUT which will in turn lead to
a more stable experience for your user—they won’t see text restyle part-way
through their pageview—and a better Cumulative Layout Shift score.

However, this proved consistently troublesome when using asynchronous CSS. When
the `print` stylesheet gets turned into an `all` stylesheet, the browser updates
the CSSOM then applies it against the DOM. In this moment, the page is told it
needs some web fonts, and the <q>extremely small block period</q> kicks in,
showing a FOIT midway through the page load lifecycle. To make things worse, the
browser will replace the FOIT with the same fallback it started with, so the
user doesn’t even get the benefit of a new font. It basically looks like a bug.

It’s much easier to visualise it than it is to explain, so here’s a screenshot
of the filmstrip:

<figure>
<img src="/wp-content/uploads/2020/05/filmstrip-foit.png" alt="Screenshot
showing missing text midway through two separate page loads." />
<figcaption>Note the FOIT at 3.4–3.5s and 3.2s respectively.</figcaption>
</figure>

And a video showing the issue in DevTools:

<figure>
<video controls width="100%" height="auto">
  <source src="/wp-content/uploads/2020/05/video-devtools-foit.mp4"
          type="video/mp4" />
</video>
<figcaption>
<a href="/wp-content/uploads/2020/05/video-devtools-foit.mp4">Can’t see the
video? Click here.</a>
</figcaption>
</figure>

**I would not recommend using `font-disply: optional;` alongside asynchronous
CSS**; I would recommend using asynchronous CSS. Ergo, I would not recommend
`font-display: optional;`. It’s better overall to have non-blocking CSS with
a FOUT than it is to have the needless FOIT.

## Comparisons and Visualisations

In these slow-motion videos, you can see the differences quite clearly.

**harry.is**

<figure>
<video controls width="100%" height="auto">
  <source src="/wp-content/uploads/2020/05/video-comparison-harry.is.mp4"
          type="video/mp4" />
</video>
<figcaption><a
href="/wp-content/uploads/2020/05/video-comparison-harry.is.mp4">Can’t see
the video? Click here.</a></figcaption>
</figure>

* Async, `preload`, and `preconnect` all start rendering at 1.8s.
  * This also represents their first contentful paints—useful information in the
    first render.
* Legacy and `swap` both start rendering at 3.4s.
  * Though legacy is missing any text—FOIT.
* `preconnect` loads its web font at 3.8s.
  * It’s deemed visually complete at 4.4s.
* Legacy makes its first contentful and first web font paint at 4.5s.
  * They’re one and the same as everything is synchronous.
* Legacy’s visually complete is at 5s.
* Async’s visually complete comes in at 5.1s.
* `swap` is deemed complete at 5.2s.
* `preload` is deemed visually complete at 5.3s.

**CSS Wizardry**

<figure>
<video controls width="100%" height="auto">
  <source src="/wp-content/uploads/2020/05/video-comparison-csswizardry.com.mp4"
          type="video/mp4" />
</video>
<figcaption>
<a href="/wp-content/uploads/2020/05/video-comparison-csswizardry.com.mp4">Can’t
see the video? Click here.</a>
</figcaption>
</figure>

* Async starts rendering at 1.7s.
* `preconnect` starts rendering at 1.9s.
  * Its first contentful paint is also 1.9s—useful information in the first
    render.
* `preload` starts rendering at 2s.
  * Its first contentful paint is also at 2s.
* Async renders content at 2.2s.
* Legacy starts rendering at 3.4s.
* `swap` makes it first- and first contentful paint at 3.6s.
* `preconnect` is deemed visually complete at 3.6s.
* Legacy makes its first contentful paint at 4.3s.
* `preload` is visually complete at 4.3s.
* Legacy is considered visually complete at 4.4s.
* `swap` completes at 4.6s.
* Async comes in last at 5s.

**`preconnect` is fastest across all metrics**

## Findings

While self-hosting your web fonts is likely to be the overall best solution to
performance and availability problems, we’re able to design some fairly
resilient measures to help mitigate a lot of these issues when using Google
Fonts.

A combination of asynchronously loading CSS, asynchronously loading font files,
opting into FOFT, fast-fetching asynchronous CSS files, and warming up external
domains makes for an experience several seconds faster than the baseline.

**This is something that I strongly recommend adopting if you are a Google Fonts
user.**

If Google Fonts isn’t your only render-blocking resource, and if you’re
violating any of the other [principles for fast
CSS](https://csswizardry.com/2018/11/css-and-network-performance/) (e.g. if
you’re `@import`ing your Google Fonts CSS file), then your mileage will vary.
These optimisations are most beneficial on project where Google Fonts is posing
one of your biggest performance bottlenecks.

## Google Fonts Async Snippet

There a lot of techniques combined here, but the resulting code is still slim
and maintainable enough that it should’t pose a problem. The snippet doesn’t
need breaking apart and can all be kept together in the `<head>` of your
document.

Here is the optimum snippet to use for fast Google Fonts:

{% highlight html %}
<!--
  - 1. Preemptively warm up the fonts’ origin.
  -
  - 2. Initiate a high-priority, asynchronous fetch for the CSS file. Works in
  -    most modern browsers.
  -
  - 3. Initiate a low-priority, asynchronous fetch that gets applied to the page
  -    only after it’s arrived. Works in all browsers with JavaScript enabled.
  -
  - 4. In the unlikely event that a visitor has intentionally disabled
  -    JavaScript, fall back to the original method. The good news is that,
  -    although this is a render-blocking request, it can still make use of the
  -    preconnect which makes it marginally faster than the default.
  -->

<!-- [1] -->
<link rel="preconnect"
      href="https://fonts.gstatic.com"
      crossorigin />

<!-- [2] -->
<link rel="preload"
      as="style"
      href="$CSS&display=swap" />

<!-- [3] -->
<link rel="stylesheet"
      href="$CSS&display=swap"
      media="print" onload="this.media='all'" />

<!-- [4] -->
<noscript>
  <link rel="stylesheet"
        href="$CSS&display=swap" />
</noscript>
{% endhighlight %}
