---
layout: post
title: "Unattributed Navigation Overhead (UNO) Is Underrated"
date: 2026-08-20 11:30:00
categories: Web Development
main: ""
meta: "Unattributed Navigation Overhead exposes the part of Time to First Byte that Navigation Timing cannot explain, including hidden cross-origin redirects."
reading-time: 8
faq:
  - question: "What is Unattributed Navigation Overhead?"
    answer: "Unattributed Navigation Overhead is the part of Time to First Byte left after subtracting the redirect, DNS, connection, and request-to-response phases exposed by Navigation Timing."
  - question: "Is Unattributed Navigation Overhead the same as redirect time?"
    answer: "No. Hidden cross-origin redirects are a common source of UNO, but it may also contain browser delays, disk or cache access, previous-page unload work, and resource contention."
  - question: "Why are cross-origin redirects missing from Navigation Timing?"
    answer: "For privacy reasons, Navigation Timing traditionally returns zero for redirect timing and redirect count when any redirect crosses an origin boundary."
  - question: "Can CrUX report Unattributed Navigation Overhead?"
    answer: "No. CrUX reports field TTFB, but it does not expose the individual Navigation Timing phases needed to calculate UNO."
  - question: "How can I measure Unattributed Navigation Overhead?"
    answer: "Use a real user monitoring solution to collect Navigation Timing for each page view, subtract the known TTFB phases, and store the remaining time as a first-class metric."
---

I want to open this post by making very very clear that what follows is not my
own original work or research. Unattributed Navigation Overhead (UNO) was
[coined and brought to wider attention by Tim
Vereecke](https://calendar.perfplanet.com/2024/uno/). It’s one of those ideas
that feels blindingly obvious once someone has shown it to you: measure the
whole journey to the first byte, subtract every phase the browser can name, and
keep whatever is left.

I’m honestly amazing how much the web performance community has been sleeping on
UNO. Since I began deliberately tracking it for a client, it has changed the way
I look at Time to First Byte (TTFB) almost completely. We hadn’t just been
missing a little detail around the edges; in one instance, we uncovered roughly
**270&nbsp;ms of navigation time** that had previously gone entirely
unexplained.

What is left after the subtraction may be difficult to attribute — the clue is
in the name after all — but it is still time that our users paid for. If we
aren’t measuring it, we’re trying to explain an incomplete TTFB with an
incomplete set of timings.

In keeping with my desire to document [front-end’s missing
metrics](/2026/06/front-ends-missing-metric-the-tbt-window/), today is UNO’s
turn.

{% include promo.html %}

## TTFB’s Missing Time

I’ve [written before that TTFB is something of a black
box](/2019/08/time-to-first-byte-what-it-is-and-why-it-matters/). It is often
treated as a synonym for back-end time, but it covers everything from the start
of the navigation until the first byte of the final response reaches the
browser. Redirects, DNS, connection setup, TLS, network latency, CDN and server
work, and browser overhead can all sit inside it.

The [Chrome User Experience Report
(CrUX)](https://developer.chrome.com/docs/crux/) can tell us that field TTFB is
poor, but it can’t decompose that time. It gives us the total and leaves it
there.

The [Navigation Timing
API](https://w3c.github.io/navigation-timing/), on the other hand, exposes much
more of the journey. It gives us timestamps for redirects, DNS lookup,
connection setup, the request, and the arrival of the first response byte. In
principle, that should allow us to account for TTFB as a set of smaller, more
useful phases.

In practice, those phases often don’t add back up to TTFB. There are gaps
between the timestamps, and some timings are deliberately hidden. The browser
still includes all of that time in TTFB; it just can’t or won’t tell us what the
time was.

**UNO is the difference between the TTFB we experienced and the TTFB we can
attribute.**

Adding it to charts begins to plug a very obvious gap:

<figure>
<img src="{{ site.cloudinary }}/wp-content/uploads/2026/08/uno-ttfb-sub-parts.png" alt="SpeedCurve TTFB Sub-Parts chart from 6 to 19 August, showing 0.27 seconds of UNO alongside 1.34 seconds of back-end TTFB, 0.61 seconds of redirects, and smaller DNS and connection timings." width="1500" height="646" loading="lazy">
<figcaption>Adding UNO to the breakdown exposes around 270&nbsp;ms that was already present in TTFB but had no corresponding line or label.</figcaption>
</figure>

Note that all of a sudden, starting 6 August, we have a new 270-ish millisecond
UNO entry: a quarter of a second previously unexplained. The appearance of this
new entry gives us great insight into hitherto unexplained and untracked time.

<small>You’ll also note that, at 610 milliseconds, named redirects actually
account for more than double that of UNO — does this mean UNO is still not as
big a deal as actual redirects…? No. More on that later.</small>

## How UNO Works

UNO is a residual rather than a browser-provided metric. We calculate it by
starting with the full navigation-to-first-byte duration and subtracting the
known phases: `UNO = TTFB − redirect − DNS − connection
− request-to-response-start`

The connection phase already includes secure connection setup, so you don’t need
to subtract TLS a second time. If your tooling splits TCP and TLS for display,
those two parts should add back up to the full connection phase used in the
calculation.

In JavaScript, this is all we need to get UNO:

```js
const navigation = performance.getEntriesByType('navigation')[0];
const span = (end, start) => Math.max(0, end - start);

const uno = Math.max(0, Math.round(
  (navigation.responseStart - navigation.startTime) -
  span(navigation.redirectEnd, navigation.redirectStart) -
  span(navigation.domainLookupEnd, navigation.domainLookupStart) -
  span(navigation.connectEnd, navigation.connectStart) -
  span(navigation.responseStart, navigation.requestStart)
));
```

The result is not a redirect count, but a sum of all the time previously
unaccounted for. And in a sense, it’s still unaccounted for, it just now has
a name.

Tim’s work and [Akamai’s description of the
metric](https://blog.akamai-mpulse.com/blog/2024-02-29-mpulse-feature-release-metrics-2024/)
list several things that may fall into UNO: browser initialisation, delays while
unloading the previous page, disk or cache access, browser resource contention,
and timings hidden by cross-origin restrictions. In other words, UNO is not
another name for redirect time.

However, if a redirect is hidden from Navigation Timing, the time it took still
has to go somewhere. That somewhere is UNO.

## The Redirects We Can’t See

This is where the metric becomes particularly revealing. If a navigation
contains a cross-origin redirect, Navigation Timing traditionally sets
`redirectStart`, `redirectEnd`, and `redirectCount` to zero. The overall TTFB
still includes the redirect, but the redirect itself effectively disappears
from the breakdown.

That includes entirely routine journeys such as:

* an advert or affiliate link passing through a tracking provider;
* a shortened URL resolving to its destination;
* a social network wrapping an outbound link, or;
* `http://example.com` redirecting to `https://example.com`.
  * going from `http://` to `https://` is still cross-origin, even if same-site.

The last one is especially easy to underestimate. A change of scheme means
a change of origin, even if the hostname remains identical. What looks to us
like a harmless first-party canonicalisation can cross the line that causes
Navigation Timing to start hiding redirects.

The impact on campaign-heavy sites can be enormous. The people arriving via
paid search, affiliates, email, or social media may travel through one or more
third parties before they reach the landing page. A typical synthetic test that
starts directly at that landing page won’t traverse the chain. CrUX will fold
the cost into TTFB. Navigation Timing may report a redirect count of zero.

Our users experienced the redirects, but our tooling failed to capture any of
them.

## See the Missing Redirect for Yourself

Here is a tiny demonstration. Open
[`https://tinyurl.com/unattributedNavigationOverhead`](https://tinyurl.com/unattributedNavigationOverhead)
in a new tab, then open DevTools » _Console_ and paste this snippet:

```js
((n) => ({
  redirects: n.redirectCount,
  redirectTime: Math.round(n.redirectEnd - n.redirectStart)
}))(performance.getEntriesByType('navigation')[0])
```

The URL redirected you from TinyURL to this site, but you should see zero
redirects and zero redirect time.

Now, in the same Console, paste the UNO equivalent:

```js
((n) => Math.max(0, Math.round(
  (n.responseStart - n.startTime) -
  (n.redirectEnd - n.redirectStart) -
  (n.domainLookupEnd - n.domainLookupStart) -
  (n.connectEnd - n.connectStart) -
  (n.responseStart - n.requestStart)
)))(performance.getEntriesByType('navigation')[0])
```

This time you should get a non-negative number. Your result will vary with
network, browser, cache, and device conditions, but it captures the part of
TTFB that the named phases did not.

{% comment %}
[ed. Add a durable HTTPS » HTTPS redirect whose every response shares one
origin, ideally on csswizardry.com. Do not use /about: its current HTTP-level
chain is HTTPS » HTTP » HTTPS, which crosses a scheme boundary and makes it
a poor demonstration of same-origin visibility. Once verified in current
Chrome, Firefox, and Safari, add a second exercise here asking readers to open
the URL and run the same snippets. It should return a non-zero redirect count
and redirect duration, demonstrating that known redirect time can be subtracted
from TTFB instead of remaining in UNO.]
{% endcomment %}

The UNO result does not tell you that TinyURL performed one redirect, nor how
many hidden redirects a campaign provider might have used. It tells you only
that there was elapsed time the visible Navigation Timing phases did not
explain. Use this as a clue: use UNO to find a pattern, then use DevTools,
controlled reproduction, and campaign or referrer data to identify the cause.

Now contrast that with the following:

Visit `https://www.bbc.com/news/` exactly. You should be redirected — in one
hop — to `https://www.bbc.com/news` (note the missing training slash). Paste
the two preceding snippets into Console once more.

Provided you followed the steps exactly, you should see a difference: an
enumerated redirect and its associated timing, and a much smaller UNO
respectively.

## Chrome 151 Makes a Welcome Start

Historically, even a permissive `Timing-Allow-Origin` response header could not
make cross-origin navigation redirects visible in the way it can for
subresources. The header’s existing semantics did not provide the forward,
destination-based opt-in that a navigation chain needs.

[Chrome 151 has begun rolling out a cross-origin redirect timing
opt-in](https://developer.chrome.com/release-notes/151/#cross-origin-redirect-timing-opt-in).
Redirecting servers can now use `Timing-Allow-Origin` to permit the destination
origin to measure redirects that are under their control. This is an excellent
change, and one I hope other browsers and redirect providers adopt quickly.

{% include cross-sell.html %}

This won’t make UNO obsolete. Every relevant response in a chain needs to opt
in, existing shorteners and campaign platforms won’t necessarily all add the
header, and browser support will still leave a lot invisible to us. More
importantly, cross-origin redirects are only one possible source of UNO. The
data is still valuable even as browsers expose more of the navigation’s
constituent parts to developers.

## CrUX Can’t Give Us This

CrUX is an extraordinarily useful RUM dataset, but it is not an observability
platform for our own site. For this particular job, it stops one level too
soon: it can tell us that TTFB is high, but not whether the problem was DNS,
connection setup, a visible redirect, server response, or 500&nbsp;ms that none
of those phases account for.

Without the individual parts, there is no meaningful way to calculate the
remainder. In CrUX, all of TTFB is effectively unattributed.

That is why UNO is such a compelling argument for a proper real user monitoring
(RUM) solution. By ‘proper’, I don’t mean that it has to be expensive or belong
to a particular vendor. I mean that it should collect the browser’s detailed
navigation timings for our actual users, preserve useful page-view context,
and let us query the result rather than reducing everything to one percentile.

At minimum, I want to be able to:

* chart UNO alongside redirect, DNS, connection, server response, TTFB, and
  Largest Contentful Paint (LCP);
* compare its duration and occurrence count rather than looking only at one
  percentile;
* break it down by landing page, campaign, referrer, browser, device, and
  connection type;
* see whether UNO and TTFB move together, and;
* isolate representative page views for analysis in DevTools.

This is how an unattributed metric becomes useful. One value can tell us that
something is missing; a few million values with the right dimensions can tell
us where to investigate.

<figure>
<img src="{{ site.cloudinary }}/wp-content/uploads/2026/08/uno-ttfb-sub-parts-per-page.png" alt="SpeedCurve TTFB Sub-Parts per Page table comparing ten paths by page-view share and RUM timing phases. UNO ranges from 0.02 to 0.35 seconds, with the redacted quiz page highest at 0.35 seconds." width="1500" height="721" loading="lazy">
<figcaption>Note that <code>/[redacted]/veiligheid/quiz-voorrangsregels</code> has
a significantly higher UNO than other pages. Something to
investigate.</figcaption>
</figure>

## Seven Million Things We Weren’t Measuring

I recently added UNO to a client’s SpeedCurve RUM setup because their LCP is
highly susceptible to TTFB regressions. I already knew their TTFB was difficult;
I did not appreciate quite how much of it we had never accounted for.

While this site clearly appeared to suffer redirects (0.3&nbsp;s) much more than
UNO (0.04&nbsp;s), the sheer amount of UNO they were incurring completely
dwarfed the number of redirects:

<figure>
<img src="{{ site.cloudinary }}/wp-content/uploads/2026/08/uno-ttfb-sub-parts-occurrences-uno.png" alt="SpeedCurve UNO occurrence histogram with the 0 to 0.2-second bucket selected, showing 7,131,737 page views; the remaining buckets taper sharply towards one second." width="1500" height="662" loading="lazy">
<figcaption>The first UNO bucket alone contains 7,131,737 page views, showing that small amounts of unexplained navigation time were pervasive.</figcaption>
</figure>

Across the same reporting period, we collected **7,131,737 UNO observations**
and only **166 detectable redirects**. I’m not claiming that all seven million
UNO were hidden redirects — that would be precisely the mistake the word
_unattributed_ warns us against — but the disparity shows how little the
redirect count alone tells us about real navigations. But the takeaway here is
that although named redirects are about 7.5 times slower than UNO, named
redirects occurred about **99.997672376% less frequently**.

<figure>
<img src="{{ site.cloudinary }}/wp-content/uploads/2026/08/uno-ttfb-sub-parts-occurrences-redirects.png" alt="SpeedCurve redirect occurrence histogram with the 0 to 0.2-second bucket selected, showing only 166 page views; the summary above reports 0.3 seconds of redirect time." width="1500" height="662" loading="lazy">
<figcaption>The chart reports 0.3&nbsp;s for redirects versus 0.04&nbsp;s for UNO, yet only 166 page views recorded a visible redirect.</figcaption>
</figure>

SpeedCurve happens to be where I’m collecting and charting the data, but the
principle is vendor-independent. A commercial platform, an open-source stack,
or your own RUM pipeline can all calculate UNO from Navigation Timing. What
matters is retaining enough context to segment it.

This is also one of the reasons I recently built [LUX
Sidecar](/2026/08/introducing-lux-sidecar/). Sidecar augments SpeedCurve’s LUX
beacons with details that I want available during real investigations,
including UNO. The [small source and full metric
reference](https://gist.github.com/csswizardry/6dd60f7536835d9c42ff05efd1b75a98)
are public if you want to see or adapt the implementation.

{% include promo.html %}

## Start Measuring What Is Missing

I don’t think UNO should remain a niche custom metric. If we monitor TTFB, we
should monitor how much of it we can’t explain. Otherwise, we risk sending CDN,
platform, database, and application teams after their few visible milliseconds
while a campaign redirect, browser delay, or other unknown consumes hundreds
more.

UNO won’t always give us the culprit, but it gives us the missing magnitude:
proof that the timings in front of us are not always the whole journey. Proper
RUM then gives us the volume, context, and segmentation needed to turn that
proof into a useful line of enquiry.

Tim was absolutely right to make a song and dance about UNO. I’m just surprised
the rest of us haven’t been making much more noise!
