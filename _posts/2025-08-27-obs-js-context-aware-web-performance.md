---
layout: post
title: "Obs.js: Context-Aware Web Performance for Everyone"
date: 2025-08-27 11:23:19
categories: Web Development
main: ""
meta: "Obs.js is a tiny inline script that exposes network, battery, CPU, and memory signals to CSS and JavaScript so you can adapt to user context."
faq:
  - question: "What is Obs.js?"
    answer: "Obs.js is a tiny inline script that reads available browser signals such as network conditions, battery, memory, and CPU, then exposes that context to CSS and JavaScript."
  - question: "How do I install Obs.js?"
    answer: "Obs.js must be pasted as an inline classic script in the head of the document, before any HTML, CSS, or JavaScript that depends on it."
  - question: "Why must Obs.js be inline in the head?"
    answer: "Because it is designed to inform early delivery decisions. Loading it externally or asynchronously would make it later, less reliable, and potentially self-defeating."
  - question: "Does Obs.js work in Safari?"
    answer: "Only partially. Most of the underlying APIs are Chromium-heavy, so you need to decide what fallback experience Safari and other unsupported browsers should receive."
  - question: "Can Obs.js update on long-lived pages?"
    answer: "Yes. If you set `window.obs.config.observeChanges` to `true`, it can listen for changes to the relevant browser signals and update itself on longer-lived pages or SPAs."
---

For the last several weeks, I’ve been working on a new JavaScript library called
[<cite>Obs.js</cite>](https://github.com/csswizardry/Obs.js). If you want the
broader case for why I think this kind of thing matters, I’ve written that up
separately in [<cite>Meet Your Users Where They Are with
Obs.js</cite>](/2026/05/meet-your-users-where-they-are-with-obs-js/). This
post is the more technical counterpart: what Obs.js gives you, how it works,
and where I think it becomes useful.

In a nutshell, Obs.js is a tiny inline script that reads a handful of browser
signals available to us and exposes them as:

* classes on the `<html>` element, and
* properties on a `window.obs` object.

That means we can adapt our UI to the context in which it is being consumed:
avoid web fonts on weak connections, serve lower resolution media when the
browser signals caution, tone down motion when battery is low, or simply beacon
that context off to analytics for later analysis.

## Why It Must Run Early

Obs.js is very simple to install, but intentionally very strict: it needs to be
inlined in the `<head>` before any HTML, CSS, or JavaScript that might depend on
it:

```html
<script>
  // Obs.js here
</script>
```

It will auto-terminate if you attempt to include it via an external file, or
run it asynchronously via `type=module`.

That’s not me being difficult for the sake of it; it is the whole point. If the
script exists to inform early decisions about the page, it needs to be there
early enough to influence those decisions. If it ran asynchronously, or too
late, we’d likely end up doubling work and, ironically, making everything
slower.

Thankfully, Obs.js is under 1.5KB Gzipped and takes less than 5ms to run on
a [low-end device](/2025/08/low-and-mid-tier-mobile-for-the-real-world-2025/),
so the inline cost is very small.

## What It Gives You

At a glance, Obs.js gives you access to a number of CSS classes that are
automatically added to the `<html>` element, and a `window.obs` object that
exposes the same information via JavaScript.

You may see classes along the lines of:

```html
<html class="has-latency-high
             has-bandwidth-low
             has-connection-capability-weak
             has-conservation-preference-conserve
             has-delivery-mode-lite">
```

And in JS:

```js
window.obs.connectionCapability   // 'strong' | 'moderate' | 'weak'
window.obs.deliveryMode           // 'rich' | 'cautious' | 'lite'
window.obs.dataSaver              // true | false
window.obs.batteryLow             // true | false | null
window.obs.deviceCapability       // 'strong' | 'moderate' | 'weak'
```

The full matrix is in the
[README](https://github.com/csswizardry/Obs.js/blob/main/README.md), but the key
idea is that Obs.js gives you a lightweight way to reason about transport,
power, and hardware constraints.

## CSS API

The CSS API is probably the quickest way to get started with Obs.js. On my own
homepage, I use Obs.js to swap the masthead background depending on the
browser’s inferred delivery mode:

```css
.page-head--masthead {
  background-image:
    url(/img/css/masthead-small.jpg), /* Full-res hero image. */
    url(/img/css/masthead-small-lqip.jpg),
    var(--base64);
}

.has-delivery-mode-lite .page-head--masthead {
  background-image:
    url(/img/css/masthead-small-lqip.jpg), /* LQIP only on poorer connections. */
    var(--base64);
}
```

In other words, visitors in `lite` mode get the much cheaper low-quality
placeholder stack rather than the richer image stack. I repeat the same pattern
at larger breakpoints with the medium and large masthead assets, but the
principle is the same: meet the browser where it says the user currently is.

Also, the CSS for my drawer menu:

```css
.has-battery-low .site-nav__list,
.has-battery-critical .site-nav__list {
  transition: none;
  will-change: auto;
}
```

If someone’s battery is low or critical, I simply drop the slide-in transition.
Again, incredibly boring, but a perfectly reasonable little consideration.

## JS API

If you need a little more control, the JS API is there too. For example, let’s
only `preload` a web font if the connection capability is not `weak`:

```js
if (window.obs?.connectionCapability !== 'weak') {
  const preload = document.createElement('link');
  preload.rel = 'preload';
  preload.as = 'font';
  preload.type = 'font/woff2';
  preload.crossOrigin = 'anonymous';
  preload.href = '/fonts/my-font.woff2';
  document.head.appendChild(preload);
}
```

You could just as easily use this to decide whether to instantiate a video,
eagerly load a carousel, or avoid a non-essential enhancement on a weaker
device.

The point is not that Obs.js makes the decision for you, but that it gives you
better information with which to make it yourself.

## Statuses and Stances

Obs.js is based on the two core ideas of _Statuses_ and _Stances_.

A **Status** is a factual piece of information exposed by the browser, for
example:

* the user has Data Saver enabled,
* the observed latency is high,
* the battery is low, or,
* the device appears memory-constrained.

A **Stance** is an opinion Obs.js takes in response:

* the connection looks weak,
* the user may prefer to conserve resources,
* the safest delivery mode is `lite`, or,
* rich media is probably not a great idea right now.

This distinction is useful because it keeps raw signals separate from the
decisions you might make with them. If you want the bare-metal facts, you can
use them; if you want a quicker, more ergonomic answer, you can lean on
`deliveryMode`, `canShowRichMedia`, or `shouldAvoidRichMedia`.

## SPAs and Long-Lived Pages

For most ordinary websites, Obs.js can be dropped into the `<head>` with no
further configuration. It runs once on page load, which is usually enough for
most use cases.

However, if you have a long-lived page or a single-page application, Obs.js may
eventually become stale. To combat that, it exposes a config option:

```html
<script>window.obs = { config: { observeChanges: true } };</script>

<script>
  // Obs.js here
</script>
```

With `observeChanges: true`, Obs.js can listen for changes in the relevant
signals and update its classes and `window.obs` values accordingly, without the
page needing a reload.

## Analytics

Obs.js is not only useful for adaptation, but is also a handy segmentation layer
for analytics. If your analytics tooling supports custom dimensions, you can
beacon some of the Obs.js data off alongside your normal performance telemetry.

I use [SpeedCurve](https://www.speedcurve.com/), so for me that might be as
simple as:

```js
LUX.addData('Latency', obs.rttBucket);
LUX.addData('DeliveryMode', obs.deliveryMode);
```

At that point, your metrics stop being one opaque average and start becoming
more explainable. You can ask how weaker devices fare compared to stronger
ones, or how much high-latency visitors differ from the rest. For example, one
client who uses Obs.js discovered that their conversion rates are higher when
customers are running low on battery. I’ll let you do what you want with that
information…

## Unsupported Browsers

Most of the underlying APIs are only available in Chromium browsers. This means
you need to decide how to handle notable absentees like iOS yourself—Obs.js
does not make that decision for you.

Broadly, your choices are:

1. **default to the richer experience** and let Obs.js selectively dial things
   down, or;
2. **default to the lighter experience** and let Obs.js selectively dial things
   up.

Either is valid, but the important thing is that you choose carefully and
deliberately.

## A Few Quick Wins

If you are wondering where to start, keep it simple. Obs.js is immediately
useful for things like:

* swapping a homepage masthead down to its LQIP-only version for
  `has-delivery-mode-lite`,
* removing transitions when the battery is low or critical,
* avoiding web fonts on weak connections,
* skipping autoplay or rich media unless the browser clearly signals that the
  visitor can afford it, or,
* segmenting analytics by latency, delivery mode, or device capability.

Those are all pretty small interventions, but together they can make the front
end feel a lot more sympathetic to the user’s circumstances.

Obs.js is running on its [demo page](https://csswizardry.com/Obs.js/demo/)
right now, and the repo—including
[`obs.js`](https://github.com/csswizardry/Obs.js/blob/main/obs.js) itself—is
there if you want to inspect the code. It is one of the most quietly useful
little things I’ve built in a long while.

Using Obs.js already? [Open a Pull
Request](https://github.com/csswizardry/Obs.js/fork) to submit your site to the
showcase.
