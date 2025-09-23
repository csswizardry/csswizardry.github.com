---
layout: post
title: "Making Cloud.typography Fast(er)"
date: 2019-08-13 09:51:11
categories: Web Development
meta: "What issues does Hoefler&Co’s Cloud.typography introduce, and how can we mitigate them?"
---

<small>**Disclaimers:**</small>

* <small>I was not approached or hired by
  [Hoefler&Co](https://www.typography.com/) or
  [Cloud.typography](https://www.typography.com/webfonts) to look into any of
  the following issues.</small>
* <small>I disclosed all of the below to Cloud.typography and gave them ample
  opportunity to work together to solve the issues at the root of the problem.
There was no appetite from them to do so, so I decided to make it all available
for free anyway—a faster web benefits everyone.</small>
* <small>All of the people I have dealt with seem like really, really nice folk.
  Nothing that follows is a reflection on any individuals. Please bear that in
mind as you read.</small>

It all started, as these things often do, with a waterfall:

<figure>
<img src="/wp-content/uploads/2019/08/wpt-cloud.typography-blocking.png" alt="" />
<figcaption>So much to unpack in only a handful of entries! Can you see
it? <a href="/wp-content/uploads/2019/08/wpt-cloud.typography-blocking.png">View
full size (31KB)</a></figcaption>
</figure>

I was doing some cursory research and running a few tests against a potential
client’s site so as to get a good understanding of the shape of things before we
were to work together. Even in just the first 10 entries in the waterfall chart
above, there were so many fascinating clues and tells that were made immediately
apparent. I was struck by some interesting behaviour happening in the very early
stages of the page-load lifecycle. Let’s pick it apart…

0. Entry (9), for `cloud.typography.com`, has very high connection overhead
   (405ms in total), [surprisingly large
   TTFB](/2019/08/time-to-first-byte-what-it-is-and-why-it-matters/)
   (210ms), and returns a `302`
   anyway. What’s going on here? Where are we getting redirected to?
   * It turns out that Cloud.typography is redirecting the request to
     a client-owned CSS file hosted on `fonts.[client].com`: Note a `Location:
     https://fonts.[client].com/[number]/[hash].css` header.
0. Entry (10) lives on a different origin again, so we have more connection
   overhead to contend with, and the file seems to take an incredibly long time
   to download (as evidenced by the sheer amount of dark green—sending data).
   Why does Cloud.typography redirect us to a file we own ourselves? Is there
   some kind of ‘release mechanism’ used to authenticate `[client].com` to use
   the font service? And why is the file so huge?!
   * It turns out that Cloud.typography is a hybrid solution, somewhere between
     cloud- and self-hosted. An outgoing request from a whitelisted domain
     returns a `302`, forwarding the request to a self-hosted CSS file that is
     optimised specifcally for your browser, OS, and UA (Google Fonts do
     something similar). The CSS file(s) that we host is provided by
     Cloud.typography.
       * In case you’re wondering, a non-whitelisted domain returns a `403`
         response.
   * The file is so big because it actually contains all of our fonts as Base64
     encoded data URIs.
0. Finally, entry (3), a large JS file, doesn’t execute until the moment the CSS
   (entry (10)) has completed. From this, I can gather that entry (3) is
   a synchronous JS file that was defined in the HTML sometime after the CSS.
   * How did I know this? Because synchronous JS defined anywhere after
     synchronous CSS will not execute while the CSS in question is in flight. JS
     can be blocked on CSSOM construction. The knock-on effects of this long CSS
     request chain are huge.

So, what are the performance implications of all of this?

First up, even though the request to `cloud.typography.com` returns a `302`
response with a `text/html` MIME type, its outgoing request is for CSS. This
makes complete sense as the request is invoked by a `<link rel="stylesheet" />`.
We can further verify this by noting the presence of an `Accept:
text/css,*/*;q=0.1` request header. Put simply, despite not ‘being’ CSS, this
request sits on our Critical Path and therefore blocks rendering.

To further exacerbate the problem, the `302` response has [a `Cache-Control:
must-revalidate, private`
header](/2019/03/cache-control-for-civilians/#must-revalidate),
meaning that we will always make an outgoing request for this resource
regardless of whether or not we’re hitting the site from a cold or a warm cache.
Although this response has a 0B filesize, we will always take the latency hit on
every single page view (and this response is basically 100% latency). On mobile
connections, this can amount to whole seconds of delays, all sat on the Critical
Path.

Next up, we get sent to `fonts.[client].com`, which introduces yet more latency
for the connection setup. (Please note that this phenomenon is specific to the
way this company has implemented their own assets and has nothing at all to do
with Cloud.typography.) Because this response is CSS, our critical request chain
remains unbroken—this is all work taking place on the Critical Path.

Once we’ve dealt with the connection overhead, we begin downloading a behemoth
CSS file (271.3KB) that is packed with all of the fonts for the project encoded
in Base64 data URIs. [Base64 is absolutely terrible for
performance](/2017/02/base64-encoding-and-performance/),
and, particularly where fonts are concerned, has the following issues:

* Base64 encoding assets into CSS moves more weight (therefore delays) onto the
  Critical Path, holding back our Start Render.
* Base64 compresses terribly, meaning we can’t claw back much of the excessive,
  increased filesize.
* Fonts are not usually downloaded until the Render Tree has been constructed
  and the browser knows that the current page actually needs them. This
  defensive measure by the browser ensures that only the fonts that are actually
  needed will ever be downloaded. By encoding the fonts into the CSS, all of the
  font data is downloaded regardless of whether the current page needs it or
  not: it’s incredibly wasteful.
* By Base64 encoding our fonts, we end up in a situation where, technically, we
  don’t have any fonts at all: we just have CSS. The implication here is that
  we’ve now rendered any font-loading strategies completely ineffective:
  `font-display` can’t work if there are no fonts; the Font Loading API is
  useless if there are no fonts. Technically, what we have here is a CSS
  problem, not a font problem.

The practical upshot of the above is that we have 1,363ms of render blocking CSS
on our Critical Path for a first-time visit on a cable connection. A repeat view
still cost us 280ms:

<figure>
<img src="/wp-content/uploads/2019/08/wpt-cloud.typography-blocking-repeat-view.png" alt="" loading="lazy" />
<figcaption>Because the Cloud.typography ‘CSS file’ has
a <code>must-revalidate</code> header,
we still take the latency hit on repeat views. <a
href="/wp-content/uploads/2019/08/wpt-cloud.typography-blocking-repeat-view.png">View
full size (17KB)</a></figcaption>
</figure>

The final nail in the coffin is the fact that, because there are no font files,
the browser is unable to employ any kind of decision about how to handle missing
typefaces. Most browsers will display invisible text for three seconds and, if
the webfont doesn’t make it onto the device in that time, will instead display
fallback text. Once the webfont does arrive, we then swap to displaying that.
This means that, once the page has started rendering, the user will go for, at
most, three seconds unable to read any content.

This all only works if there are actual font files to be negotiated. Because
Cloud.typography’s fonts are actually just more CSS, the browser is unable to
discern the two, and thus cannot offer a three-second grace period. This means
that there’s a theoretically infinite period where we don’t just block the
rendering of text, but we block the rendering of the whole page.

If you’re interested in seeing a real-world example of this, consider [the
following filmstrip comparison](https://www.webpagetest.org/video/compare.php?tests=190811_VX_b8f581c9bf94c7ce40358174b91e43d5%2C190811_9R_43ce007515d25497c9f86327d6c357c6&thumbSize=200&ival=100&end=visual).

Post-It is a Cloud.typography customer, and the entire page stays blank until
the Cloud.typography CSS file makes it onto the device. Grid By Example, on the
other hand, uses Google Fonts (without any `font-display` configuration), which
allows the browser to begin rendering the page in the absence of the webfonts.

<small>**N.B.** The two test cases are very, very different sites, so I’m not
looking to directly compare any timings—that would be unfair—I merely want to
highlight the phenomenon.</small>

On a 3G connection, Post-It’s Start Render is 16.8s. Removing Cloud.typography
entirely [improves that time by over
48%](https://www.webpagetest.org/video/compare.php?tests=190811_9J_fe8556cdd9c19eecbdc1c35a5cdb49b0%2C190811_9T_98fec8b8ee896f94389a99425561c17f&thumbSize=200&ival=100&end=visual),
bringing it down to 8.7s.

All the above issues combined mean that, unfortunately, Cloud.typography is slow
by default. While [I am a huge fan of the
foundry](https://twitter.com/csswizardry/status/842088778386812930), and some of
the stunning typefaces they have produced, I cannot in good conscience recommend
Cloud.typography as a credible font provider while this is their implementation.
It is actively harmful for performance.

## Solving the Problem for the Client

The solutions I implemented for my client were mitigations at best—the problems
still exist in Cloud.typography, but I was able to do a handful of things to
take the edge off of how the problems were manifesting themselves.

First up, I wanted to unblock the JS execution: there was no need to hold back
the main `app.js` bundles for the sake of the fonts. The fix? Simple: swap their
`<link rel="stylesheet" />` and `<script>` lines around in their HTML:

**Before:**

{% highlight html %}
<link rel="stylesheet" href="https://cloud.typography.com/[number]/[number]/css/fonts.css" />
<script src="https://www.[client].com/packs/application-[hash].js"></script>
{% endhighlight %}

**After:**

{% highlight html %}
<script src="https://www.[client].com/packs/application-[hash].js"></script>
<link rel="stylesheet" href="https://cloud.typography.com/[number]/[number]/css/fonts.css" />
{% endhighlight %}

Yes. As simple as that. Note now that entry (3) executes before the
`fonts.[client].com` file has even begun downloading.

<figure>
<img src="/wp-content/uploads/2019/08/wpt-cloud.typography-unblocking.png" alt="" loading="lazy" />
<figcaption>By loading the CSS after our JS, the JS can run much sooner. <a href="/wp-content/uploads/2019/08/wpt-cloud.typography-unblocking.png">View full size (29KB)</a></figcaption>
</figure>

My second tactic was to pay the connection cost for `fonts.[client].com`
up-front by simply preconnecting to that origin. Early in the `<head>`:

{% highlight html %}
<link rel="preconnect" href="https://fonts.[client].com" />
{% endhighlight %}

Note entry (11) in which we’re dealing with a whopping 397ms of connection
overhead off of the Critical Path.

These two small changes led to a 300ms improvement in Start Render and
a staggering 1,504ms improvement in TTI at the 50th percentile.

**N.B.** Remember, neither of these changes are solving any of the issues
inherently present in Cloud.typography. All I’m doing here is mitigating the
issues as best I can on the client’s end.

{% include promo.html %}

## Solving the Problem for Everyone

We’re over 1,300 words in and I haven’t even explicitly addressed the crux of
the issue: **Cloud.typography doesn’t give us font performance issues, it gives
us CSS performance issues.** Because the fonts are Base64 encoded, **there are
no fonts**. This means that no amount of `font-display`, Font Loading API, Font
Face Observer, etc. are going to help us. How do we solve this problem at the
source? I got in touch with Cloud.typography.

### Reaching Out

Honestly, I started off somewhat confused. With uncacheable, cross-origin
redirects on the Critical Path and Base64 encoded fonts, this seems like a very
slow way of delivering assets. So, naturally, I wanted to check that we weren’t
doing anything wrong. I also wanted to understand the end to end workings of the
solution more thoroughly so I’d be better poised to make recommendations.

I got the details of a member of the team at Hoefler&Co and asked if I could
send them some questions pertaining to their cloud service. If you’re
interested, you can [read the unedited email in full](https://csswz.it/2Mc8pkt).

The response I got shed some light on a few things. To summarise:

* the client was implementing everything correctly;
* the redirect doesn’t ‘release’ the fonts for usage, but actually gathers some
  information about your browser and OS and forwards the request to the correct
one of many CSS files that Cloud.typography provide you to [self
host](/2019/05/self-host-your-static-assets/);
  * The `Location` of the redirect depends heavily on the User Agent making the
    request, so you can’t circumvent the trip to Cloud.typography.
  * (Author’s note: But make no mistake, the redirect exists primarily for usage
    tracking, otherwise they’d cache it.)
* the cloud service is aimed at developers and agencies who might need access to
  a larger library to fulfil many different projects;
* the self-hosted option is aimed at companies who have a limited and
  rigidly-defined font palette (think more enterprisey customers);
* anyone concerned about performance is encouraged to upgrade to the self-hosted
  plan.

I’m incredibly grateful for the person’s time and patience—I just popped on
their radar out of nowhere and had quite a barrage of questions and, I’ll admit,
critique for them. Their replies were insightful and timely.

However, here’s where I end up a little disheartened: despite clearly outlining
the tangible impact that Cloud.typography has on performance, there was no
interest in looking at ways to remedy the problems. There was no appetite for
providing or even documenting the alternative (i.e. not _replacement_—the
current method would remain fully functional and valid) non-blocking loading
strategy.

I came up with a proof-of-concept alternative loading strategy that didn’t block
rendering, instead opting to load the assets asynchronously in exchange for
a flash of fallback text (FOFT), akin to implementing `font-display: swap;`,
I was told <q>Customers overwhelmingly prefer to not have their pages load
sans-fonts and then “pop” into place with the correct fonts…</q> which, of
course, I, every async font loading strategy, and the entire `font-display`/Font
Loading spec disagree with.

I ascertained that approximately 13,100 sites in the HTTP Archive currently use
Hoefler&Co’s Cloud.typography service. That’s approximately [$15.5m
a year](https://www.wolframalpha.com/input/?i=$99+*+13100+*+12) worth of
customers currently bound to a slow-by-design, slow-by-default webfont solution
that we could have helped out!

It’s a real shame, as the solution was trivial and I’d done all the legwork, but
that’s life.

### The Solution

To reiterate: **we don’t have a webfont problem, we have a CSS problem**. With
this in mind, the solution to the problem becomes devilishly simple: we just
need to lazy-load our CSS. By lazy-loading our font stylesheet, we move it off
of the Critical Path and unblock rendering.

Since the advent of Critical CSS, lazy-loading stylesheets has become more and
more commonplace, with [Filament Group’s latest
method](https://www.filamentgroup.com/lab/load-css-simpler/) being by far the
simplest and the most widely supported:


{% highlight html %}
<link rel="stylesheet" href="https://cloud.typography.com/[number]/[number]/css/fonts.css"
      media="print" onload="this.media='all'" />
{% endhighlight %}

The magic lies in the second line. By setting a non-matching media type, the
browser naturally loads the stylesheet with a low priority off of the Critical
Path. Once the file has loaded, the inline `onload` event handler swaps to
a matching media type, and this change then applies the stylesheet to the
document, swapping the fonts in.

The one caveat to this method is that we do now have a flash of fallback text
(FOFT). This method of loading the stylesheet effectively synthesises
`font-display: swap;`, immediately displaying a fallback typeface and replacing
it with our chosen webfonts as soon as they become available. This means it’s
going to be vital that you design a very robust, accurate fallback style for
users to experience while we’re waiting for the proper fonts to arrive.
Thankfully, [Monica](https://twitter.com/notwaldorf) has made that a lot simpler
by giving us [Font Style Matcher](https://meowni.ca/font-style-matcher/).

What makes me particularly fond of this method is that **we’ve gone from arguably
the slowest possible method of loading our assets to what might be the least
intrusive**. A complete inversion of the paradigm.

Here’s a before and after over a 3G connection. The original implementation is
on the left; my fixed version is on the right:

<figure>
<video controls>
  <source src="/wp-content/uploads/2019/08/cloud.typography-before-after.mp4" type="video/mp4" />
  <a href="/wp-content/uploads/2019/08/cloud.typography-before-after.mp4">Not
seeing anything? Click right here!</a>
</video>
</figure>

Yes, we do have a FOFT, but we are getting text in front of the reader much,
much sooner—this is an enormous improvement.

## Closing Thoughts

I was genuinely disheartened by Cloud.typography’s indifference to the problems,
especially considering the ‘fix’ would only require an update to the
documentation. They wouldn’t have had to make any platform or infrastructure
changes on their side. Further, they would still have been able to retain the
same levels of control and fully track font usage, but completely
asynchronously. It would have also been a great press-piece for them, announcing
the release of a much faster method of including the same beautiful typefaces.

That said, if you are a Cloud.typography customer, don’t panic. I would
recommend exploring the asynchronous method I’ve outlined above. Implementation
itself should be trivial, but you will need to invest some time in designing
a suitable fallback style while your CSS is loading.

Specific webfont providers aside, I think this entire situation makes for
a fascinating case study of how things can begin to slide if enough small
mistakes are allowed to consolidate. For me, it was kinda fun to peel back each
layer and see how it impacted the next part of the problem, and I hope my
detailing it has taught people a thing or two in the process.

If I was to summarise this entire piece with one takeaway, it’s that **CSS
performance is absolutely critical**, and with the current trend of overlooking
and dismissing CSS as its own discipline, cases like this are becoming all too
common.

**CSS matters. A lot.**
