---
layout: post
title: "In Defence of DOM­Content­Loaded"
date: 2023-07-01 00:01:19
categories: Web Development
main: "https://csswizardry.com/wp-content/uploads/2023/06/devtools-dcl.png"
meta: "Is there any reason to still measure the DOMContentLoaded event? Perhaps…"
---

<!-- <img src="/wp-content/uploads/2023/06/playing-cards.png" alt="" width="160" height="157" style="float: left; margin-right: 24px; shape-outside: url(/wp-content/uploads/2023/06/playing-cards.png); shape-margin: 12px;"> -->

Honestly, I started writing this article, for no real reason and somewhat
without context, in December 2022—over half a year ago! But, I left it in
`_drafts/` until today, when a genuinely compelling scenario came up that gives
real opportunity for explanation. It no longer feels like
trivia-for-the-sake-of-it thanks to a recent client project.

I never thought I’d write an article in defence of `DOMContentLoaded`, but here
it is…

For many, many years now, performance engineers have been making a concerted
effort to move away from technical metrics such as `Load`, and toward more
user-facing, UX metrics such as [Speed
Index](https://developer.chrome.com/en/docs/lighthouse/performance/speed-index/)
or [Largest Contentful
Paint](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-largest-contentful-paint/).
However, as an internal benchmark, there are compelling reasons why some of you
may actually want to keep tracking these ‘outdated’ metrics…

## Measure the User Experience

The problem with using diagnostic metrics like `Load` or `DOMContentLoaded` to
measure site-speed is that it has no bearing on how a user might actually
experience your site. Sure, if you have `Load` times of 18 seconds, your site
probably isn’t very fast, but a good `Load` time doesn’t mean your site is
necessarily very fast, either.

<figure>
<img src="{{ site.cloudinary }}/wp-content/uploads/2023/06/dcl.gif" alt="" width="904" height="680">
<figcaption>Which do you think provides the better user experience?</figcaption>
</figure>

In the comparison above, which do you think provides the better user experience?
I’m willing to bet you’d all say B, right? Based on `DOMContentLoaded`, A is
11.292s faster!

`Load` and `DOMContentLoaded` are internal browser events—your users have no
idea what a `Load` time even is. I bet half of your colleagues don’t either. As
metrics themselves, they have little to no reflection on the real user
experience, which is exactly why we’ve moved away from them in the first
place—they’re a poor proxy for UX as they’re not emitted when anything useful to
the user happens.

Or are they…?

## Technically Meaningful

Not all metrics _need_ to be user-centric. I’m willing to bet you still [monitor
TTFB](/2019/08/time-to-first-byte-what-it-is-and-why-it-matters/), even though
you know your customers will have no concept of a first byte whatsoever. This is
because some metrics are useful to developers. TTFB is a good measure of your
server response times and general back-end health, and issues here may have
knock-on effects later down the line (namely with Largest Contentful Paint).

Equally, both `DOMContentLoaded` and `Load` aren’t just meaningless browser
events, and once you understand what they actually signify, you can get some
real insights as to your site’s runtime behaviour from each of them. Diagnostic
metrics such as these can highlight bottlenecks, and how they might ultimately
impact the user experience in other ways, even if not directly.

This is particularly true in the case of `DOMContentLoaded`.

## What Does It Actually Mean?

**[The `DOMContentLoaded`
event](https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event)
fires once all of your `defer`red JavaScript has finished running.**

Therefore, anyone leaning heavily on `defer`—or frameworks that utilise
it—should immediately see the significance of this metric.

If you aren’t (able to) monitoring custom metrics around your application’s
interactivity, hydration state, etc., then `DOMContentLoaded` immediately
becomes a very useful proxy. Knowing when your main bundles have run is great
insight in lieu of more forensic runtime data, and it’s something I look at with
any client that leans heavily on (frameworks that lean heavily on) `defer` or
`type=module`.

<small>More accurately, `DOMContentLoaded` signifies that _all_ blocking _and_
`defer` _and_ `type=module` code has finished running. We don’t have any
visibility on whether it ran successfully but it has at least finished.</small>

## Putting It to Use

I’m working with a client at the moment who is using [Nuxt](https://nuxt.com/)
and currently has their client-side JavaScript split into an eyewatering 121
`defer`red files:

<figure>
  <img src="{{ site.cloudinary }}/wp-content/uploads/2023/06/defer-waterfall-abridged.png" alt="" width="930" height="522" loading="lazy">
  <figcaption>Don’t get me started on their TTFB. <a href="/wp-content/uploads/2023/06/defer-waterfall-full.png">View unabridged.</a></figcaption>
</figure>

Above, the vertical pink line at 12.201s signifies the `DOMContentLoaded` event.
That’s late! This client doesn’t have any RUM or custom monitoring in place (<a
href="/sentinel/">yet</a>), so, other than Core Web Vitals, we don’t have much
visibility on how the site performs in the wild. Based on a 12s
`DOMContentLoaded` event, I can’t imagine it’s doing so well.

The problem with Core Web Vitals, though, is that its only real JavaScripty
metric, [First Input Delay](https://web.dev/fid/), only deals with user
interaction: what I would like to know is <q>with 121 `defer`red files, when is
there something to actually interact with?!</q> Based on the lab-based 12s
above, I would love to know what’s happening for real users. And luckily, while
`DOMContentLoaded` is now considered a legacy metric, we can still get field
data for it from two pretty decent sources…

### Chrome User Experience Report (CrUX)

<figure>
  <img src="{{ site.cloudinary }}/wp-content/uploads/2023/06/defer-crux-dashboard.png" alt="" width="1800" height="1360" loading="lazy">
  <figcaption>Things got a lot worse between March and April 2023</figcaption>
</figure>

[CrUX Dashboard](https://developer.chrome.com/docs/crux/dashboard/) is one of
very few [CrUX resources](https://developer.chrome.com/docs/crux/) that surfaces
the `DOMContentLoaded` event to us. Above, we can see that currently, at the
75th percentile, only 11% of Chrome visitors experience a Good
`DOMContentLoaded`—almost 90% of people are waiting over 1.5s before the app’s
key functionality is available, with almost half waiting over 3.5s!

It would also seem that [Treo](https://treo.sh/) (which is a truly amazing tool)
surfaces `DOMContentLoaded` data [for a given
origin](https://treo.sh/sitespeed/csswizardry.com?metrics=dcl%2Col).

### Google Analytics

Until, well,
[today](https://support.google.com/analytics/answer/11583528?hl=en), Google
Analytics also surfaced `DOMContentLoaded` information. Only this time, we
aren’t limited to just Chrome visits! That said, we aren’t presented with
particularly granular data, either:

<figure>
  <img src="{{ site.cloudinary }}/wp-content/uploads/2023/06/defer-google-analytics.png" alt="" width="1726" height="535" loading="lazy">
  <figcaption>Huge and non-linear buckets make interrogating the data much more difficult.</figcaption>
</figure>

After a bit of adding up (<kbd>2.15 + 10.26 + 45.28 + 25.68 + 13.07</kbd>
= <samp>96.44</samp>), we see that the 95th percentile of `DOMContentLoaded`
events for the same time period (May 2023) is somewhere between five and 10
seconds. Not massively helpful, but an insight nonetheless, and at least shows
us that the lab-based 12s is unlikely to be felt by anyone other than extreme
outliers in the field.

Takeaways here are:

1. **Only about 10% of Chrome visitors have what Google deem to be a Good
   `DOMContentLoaded`.** All `defer`red JavaScript has run within 1.5s for only
   the vast minority of visitors.
2. **3.56% of all users waited over 10s for `DOMContentLoaded`.** This is a 10
   second wait for key `defer`red JavaScript to run.

<small>Given that the `DOMContentLoaded` event fires after the last of our
`defer`red files has run, there’s every possibility that key functionality from
any preceding files has already become available, but that’s not something we
have any visibility over without looking into custom monitoring, which is
exactly the situation we’re in here. Remember, this is still a proxy metric—just
a much more useful one than you may have realised.</small>

## Digging Deeper: The Navigation Timing API

If we want to capture this data more deliberately ourselves, we need to lean on
the [Navigation Timing
API](https://developer.mozilla.org/en-US/docs/Web/API/Performance_API/Navigation_timing),
which gives us access to a suite of milestone timings, many of which you may
have heard of before.

The `DOMContentLoaded` as measured and emitted by the Navigation Timing API is
actually referred to as `domContentLoadedEventStart`—there is no bare
`domContentLoadedEvent` in that spec. Instead, we have:

1. **`domContentLoadedEventStart`:** This is the one we’re interested in, and is
   equivalent to the concept we’ve been discussing in this article so far. To
   get the metric we’ve been referring to as `DOMContentLoaded`, you need
   `window.performance.timing.domContentLoadedEventStart`.
   * Because `defer`red JS is guaranteed to run after synchronous JS, this event
     also marks the point that all synchronous work is complete.
2. **`domContentLoadedEventEnd`:** The end event captures the time at which all
   JS wrapped in a `DOMContentLoaded` event listener has finished running:
   ```js
   window.addEventListener('DOMContentLoaded', (event) => {
     // Do something
   });
   ```
   * This is separate to `defer`red JavaScript and runs after our
     `DOMContentLoaded` event—if we are running a nontrivial amount of code at
     `DOMContentLoaded`, we’re also interested in this milestone. That’s not in
     the scope of this article, though, so we probably won’t come back to that
     again.

Very, very crudely, with no syntactic sugar whatsoever, you can get the page’s
`DOMContentLoaded` event in milliseconds with the following:

```js
console.log(window.performance.timing.domContentLoadedEventStart - window.performance.timing.navigationStart);
```

…and the duration (if any) of the `DOMContentLoaded` event with:

```js
window.performance.timing.domContentLoadedEventEnd - window.performance.timing.domContentLoadedEventStart
```

And of course, we should be very used to seeing `DOMContentLoaded` at the bottom
of DevTools’ _Network_ panel:

<figure>
  <img src="{{ site.cloudinary }}/wp-content/uploads/2023/06/devtools-dcl.png" alt="" width="1500" height="813" loading="lazy">
  <figcaption>They’re some satisfying numbers.</figcaption>
</figure>

## Even More Insights

While `DOMContentLoaded` tells us when our `defer`red code finished
running—which is great!—it doesn’t tell us how long it took to run. We might
have a `DOMContentLoaded` at 5s, but did the code start running at 4.8s? 2s? Who
knows?!

**We do.**

<figure>
  <img src="{{ site.cloudinary }}/wp-content/uploads/2023/06/defer-waterfall-minimal.png" alt="" width="930" height="522" loading="lazy">
  <figcaption><a href="/wp-content/uploads/2023/06/defer-waterfall-full.png">View unabridged.</a></figcaption>
</figure>

In the above waterfall, which is the same one from earlier, only even shorter,
we still have the vertical pink line around 12s, which is `DOMContentLoaded`,
but we also have a vertical sort-of yellow line around 3.5s (actually, it’s at
3.52s exactly). This is `domInteractive`. `domInteractive` is the event
immediately before `domContentLoadedEventStart`. This is the moment the browser
has finished parsing all synchronous DOM work: your HTML and all blocking
scripts it encountered on the way. Basically, the browser is now at the
`</html>` tag. The browser is ready to run your `defer`red JavaScript.

One very important thing to note is that the `domInteractive` event fired long,
long before the request for file 133 was even dispatched. Immediately this tells
us that the delta between `domInteractive` and `DOMContentLoaded` includes code
execution **and any remaining fetch**.

Thankfully, the browser wasn’t just idling in this time. Because `defer`red code
runs in sequence, the browser sensibly fetches the files in order and
immediately executes them when they arrive. This level of orchestration is very
elegant and helps to utilise and conserve resources in the most helpful way. Not
flooding the network with responses that can’t yet be used, and also making sure
that the main thread is kept busy.

This is the JavaScript we need to measure how long our `defer`red activity took:

```js
console.log(window.performance.timing.domContentLoadedEventStart - window.performance.timing.domInteractive);
```

Now, using the Navigation Timing API, we have visibility on when our `defer`red
finished running, and how long it took!

This demo below contains:

1. A slow-to-load, fast-to-run `defer`red JavaScript file.
2. A fast-to-load, slow-to-run inline script set to run at `DOMContentLoaded`.
3. Logging that out to the console at the `Load` event.

```html
<!-- [1] -->
<script src=https://slowfil.es/file?type=js&delay=2000 defer></script>

<!-- [2] -->
<script>
  window.addEventListener('DOMContentLoaded', (event) => {

    // Hang the browser for 1s at the `DOMContentLoaded` event.
    function wait(ms) {
      var start = Date.now(),
      now = start;
      while (now - start < ms) {
        now = Date.now();
      }
    }

    wait(1000);

  });
</script>

<!-- [3] -->
<script>
  window.addEventListener('load', (event) => {

    const timings = window.performance.timing;
    const start   = timings.navigationStart;

    console.log('Ready to start running `defer`ed code: ' + (timings.domInteractive - start + 'ms'));
    console.log('`defer`ed code finished: ' + (timings.domContentLoadedEventEnd - start + 'ms'));
    console.log('`defer`ed code duration: ' + (timings.domContentLoadedEventStart - timings.domInteractive + 'ms'));
    console.log('`DOMContentLoaded`-wrapped code duration: ' + (timings.domContentLoadedEventEnd - timings.domContentLoadedEventStart + 'ms'));

  });
</script>

</body>
</html>
```

<figure>
  <img src="{{ site.cloudinary }}/wp-content/uploads/2023/06/devtools-console.png" alt="" width="1500" height="813" loading="lazy">
  <figcaption>The <q><code>`defer`ed code finished: 3129ms</code></q> lines up
  with DevTools’ own reported 3.13s <code>DOMContentLoaded</code>.</figcaption>
</figure>

Or take a look at [the live demo on Glitch](https://deep-bow-engine.glitch.me/).

## A Better Way?

This is all genuinely exciting and interesting to me, but we’re running into
issues already:

* `DOMContentLoaded` is a proxy for when all your `defer`red JavaScript has run,
  but it doesn’t notify you if things ran successfully, or highlight any key
  milestones as functionality is constantly becoming available for the duration.
* `DOMContentLoaded` tells us how long everything took, but that could include
  fetch, and there’s no way of isolating the fetch from pure runtime.
* If you’re capturing these technical timings, you might as well use the User
  Timing API.

I want to expand on the last point.

If we’re going to go to the effort of measuring Navigation Timing events, we
might as well use the much more useful [User Timing
API](https://developer.mozilla.org/en-US/docs/Web/API/Performance_API/User_timing).
With this, we can emit high-resolution timestamps at arbitrary points in our
application’s lifecycle, so instead of proxying availability via a Navigation
Timing, we can drop, for example, `performance.mark('app booted')` in our code.
In fact, [this is what Next.js
does](https://nextjs.org/docs/pages/building-your-application/optimizing/analytics#custom-metrics)
to let you know when the app has hydrated, and how long it took. These User
Timings automatically appear in the _Performance_ panel:

<figure>
  <img src="{{ site.cloudinary }}/wp-content/uploads/2023/06/devtools-user-timing.png" alt="" width="1500" height="813" loading="lazy">
  <figcaption></figcaption>
</figure>

I use `performance.mark()` and `performance.measure()` in [a few places on this
site](https://github.com/csswizardry/csswizardry.github.com/blob/515d5428c1c816a86064739d1a74d77032d520af/_includes/head.html#L115-L118),
chiefly to monitor how long it takes to parse the `<head>` and its CSS.

The User Timing API is far more suited to this kind of monitoring than something
like `DOMContentLoaded`—I would only look at `DOMContentLoaded` if we don’t yet
have appropriate metrics in place.

Still, the key and most interesting takeaway for me is that if all we have
access to is `DOMContentLoaded` (or we aren’t already using something more
suitable), then we do actually have some visibility on app state and
availability. If you are using `defer` or `type=module`, then `DOMContentLoaded`
might be more useful to you than you realise.

## Back to Work

I mentioned previously that the `DOMContentLoaded` event fires once all
`defer`red JavaScript has run, which means that we could potentially be
trickling functionality throughout the entire time between `domInteractive` and
`DOMContentLoaded`.

In my client’s case, however, the site is completely nonfunctional until the
very last file (response 133 in the waterfall) has successfully executed. In
fact, blocking the request for file 133 has the exact same effect as disabling
JavaScript entirely. This means the `DOMContentLoaded` event for them is an
almost exact measure of when the app is available. This means that **tracking
and improving `DOMContentLoaded` will have a direct correlation to an improved
customer experience**.

### Improving `DOMContentLoaded`

Given that `DOMContentLoaded` marks the point at which all synchronous HTML and
JavaScript has been dealt with, and all `defer`red JavaScript has been fetched
and run, this leaves us many different opportunities to improve the metric: we
could reduce the size of our HTML, we could remove or reduce expensive
synchronous JavaScript, we could inline small scripts to remove any network
cost, and we can reduce the amount of `defer`red JavaScript.

Further, as `DOMContentLoaded` is a milestone timing, any time we can shave from
preceding timings should be realised later on. For example, all things being
equal, a 500ms improvement in TTFB will yield a 500ms improvement in subsequent
milestones, such as First Contentful Paint or, in our case, `DOMContentLoaded`.

However, _in our_ case, the delta between `domInteractive` and
`DOMContentLoaded` was 8.681s, or about 70%. And while their TTFB certainly does
need improvement, I don’t think it would be the most effective place to spend
time while tackling this particular problem.

Almost all of that 8.7s was lost to queuing and fetching that sheer number of
bundles. Not necessarily the size of the bundles—just the sheer quantity of
files that need scheduling, and which each carry their own latency cost.

While we haven’t worked out the sweet spot for this project, as a rule,
a smaller number of larger bundles would usually download much faster than many
tiny ones:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">As a rule, RTT (α) stays constant while download time (𝑥) is proportional to filesize. Therefore, splitting one large bundle into 16 smaller ones goes from 1α + 𝑥 to 16α + 16(0.0625𝑥). Expect things to probably get a little slower. <a href="https://t.co/c0hEsIAwKq">pic.twitter.com/c0hEsIAwKq</a></p>&mdash; Harry Roberts (@csswizardry) <a href="https://twitter.com/csswizardry/status/1352402710688133122?ref_src=twsrc%5Etfw">21 January, 2021</a></blockquote>

My advice in this case is to tweak their build to output maybe 8–10 bundles and
re-test from there. It’s important to balance bundle size, number of bundles,
and caching strategies, but it’s clear to me that the issue here is overzealous
code-splitting.

With that done, we should be able to improve `DOMContentLoaded`, thus having
a noticeable impact on functionality and therefore customer experience.

`DOMContentLoaded` has proved to be a very, very useful metric for us.
