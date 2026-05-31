---
layout: post
title: "Front-End’s Missing Metric: The TBT Window"
date: 2026-06-01 11:30:00
categories: Web Development
main: "https://csswizardry.com/wp-content/uploads/2026/06/speedcurve-02.png"
meta: "The TBT Window is the FCP-to-TTI interval used to calculate synthetic Total Blocking Time. If FCP or TTI moves, TBT can change even when long tasks do not."
faq:
  - question: "What is the TBT Window?"
    answer: "The TBT Window is the interval between First Contentful Paint and Time to Interactive during which Total Blocking Time counts the blocking portions of long tasks."
  - question: "Why can TBT change when JavaScript has not changed?"
    answer: "TBT can change if FCP or TTI moves, because that changes the measurement window in which long tasks are counted."
  - question: "Can genuine long-task regressions widen the TBT Window?"
    answer: "Yes. Because TTI depends on long-task quietness, more or later long tasks can push TTI later, widening the TBT Window and increasing TBT for legitimate reasons."
  - question: "Why should synthetic tools show the TBT Window?"
    answer: "Plotting TBT Window alongside TBT helps developers tell the difference between more blocking work and a larger measurement window."
---

An incident (and it _was_ an incident!) on a client project got me thinking
about the metrics we use, and the importance of fully understanding their exact
definitions. Bizarrely defined and often overlooked specs sent panic around
a team, but ultimately shed light on a tangible gap in our front-end tooling.

For my client, from one [SpeedCurve](https://www.speedcurve.com/) synthetic test
to the next, their Total Blocking Time (TBT) skyrocketed from **495&nbsp;ms** to
**5,789&nbsp;ms**. That’s more than a tenfold increase! Naturally, it was all
hands on deck to pin down the cause, and I was called in to help out.

What I found was both enlightening and calming, but it did shine a light on
a gap in the way we tend to talk about modern web performance metrics.

This is the story behind a new metric I like to call the _TBT Window_.

{% include promo.html %}

## A Quick Refresher

[Total Blocking Time](https://web.dev/articles/tbt/) is a lab metric intended to
quantify how unavailable the main thread is during page load. It looks at [long
tasks](https://w3c.github.io/longtasks/)—work that occupies the UI thread for
more than 50&nbsp;ms—and counts only the blocking portion of each one.
A 70&nbsp;ms task contributes 20&nbsp;ms to TBT; a 250&nbsp;ms task contributes
200&nbsp;ms. The first 50&nbsp;ms of any task is effectively tolerated, and
anything beyond that is considered blocking time.

This much is probably familiar, but the part that is often overlooked is that
TBT is not an unbounded sum of all blocking work in the trace: it is a sum of
all the blocking time [between First Contentful Paint and Time to
Interactive](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-total-blocking-time/).
This is key to understanding the context of the TBT metric itself.

[First Contentful Paint](https://web.dev/articles/fcp/) (FCP) opens the window
and is the first point in the page-load timeline at which the user can see
something contentful on screen—the page is responding. [Time to
Interactive](https://web.dev/articles/tti/) (TTI) closes the window and is the
point at which the page is considered reliably interactive.

TBT is the blocking work that happens between those two moments.

This is slightly clumsy or even unexpected because TTI itself has largely
disappeared from our day-to-day vocabulary. [Lighthouse 10 removed
TTI](https://developer.chrome.com/blog/lighthouse-10-0/) from the performance
score after a deprecation process that began in Lighthouse 8, and for perfectly
sensible reasons: TTI was highly variable and <q>overly sensitive to outlier
network requests and long tasks</q>. It is also seemingly arbitrarily defined
and hard to reason about:

> 0. Start at First Contentful Paint (FCP).
> 0. Search forward in time for a quiet window of at least five seconds, where
>    quiet window is defined as: no long tasks and no more than two in-flight
>    network GET requests.
> 0. Search backwards for the last long task before the quiet window, stopping
>    at FCP if no long tasks are found.
> 0. TTI is the end time of the last long task before the quiet window (or the
>    same value as FCP if no long tasks are found).

Wow.

<figure>
<img src="{{ site.cloudinary }}/wp-content/uploads/2026/06/tti.svg" alt="Diagram showing the Time to Interactive calculation: from Navigation Start and FCP, the browser searches forward to a five-second quiet window, then works back to the last long task to set TTI." width="750" height="443" loading="lazy">
<figcaption>TTI is found by identifying the quiet window first, then walking back to the last long task before it.</figcaption>
</figure>

The fact that TTI has been retired from the report, however, does not mean it
has stopped influencing the numbers we still care about. If you are monitoring
TBT, TTI still defines the far edge of the measurement window and changes in TTI
scores can impact your TBT scores even in cases you might not expect.

Hopefully now you can see the problem. Per Google’s own documentation, TTI
<q>proved overly sensitive to outlier network requests and long tasks</q>, yet
if TTI also defines the upper bound for TBT, those same outliers can increase
(or decrease) the surface area you’re being tested against.

**A degraded TTI score can degrade your TBT score.** You’re effectively still
being measured against it. This is exactly what happened to my client.

## The TBT Window

{% include cross-sell.html %}

Once you think of TBT as a windowed metric, a few otherwise surprising
behaviours become much easier to explain. The TBT Window is the interval between
FCP and TTI during which TBT is allowed to count blocking work. If FCP moves
earlier, the TBT Window opens earlier, so long tasks that used to sit before FCP
can suddenly fall inside the window. If FCP moves later, the opposite can
happen: long tasks can fall out of scope without having been removed from the
page.

The same is true at the other end. If TTI moves earlier, the window closes
sooner and late long tasks may stop contributing to TBT. If TTI moves later,
the window stays open for longer and more of the tail of the page load can
suddenly become countable.

This is the important bit: in all of these cases, the long tasks themselves may
not have changed in any meaningful way. What changed was the amount of timeline
that TBT was allowed to inspect. That moving interval is what I mean by the _TBT
Window_.

<figure>
<img src="{{ site.cloudinary }}/wp-content/uploads/2026/06/speedcurve.png" alt="SpeedCurve dashboard for Pitchup showing JS Total Blocking Time rising from 495 ms on 25 July to 5,789 ms on 26 July, alongside Time to Interactive rising to 19.98 seconds." width="1500" height="894" loading="lazy">
<figcaption>The clue is that both lines move together: TBT rose as the end of its measurement window moved. <a href="/wp-content/uploads/2026/06/speedcurve-full.png">View full size/quality (416KB)</a></figcaption>
</figure>

In my client’s case, their initial instinct was entirely understandable: a TBT
regression looks like a JavaScript regression, and the SpeedCurve chart even had
the word _JS_ in it, so the first place the team looked was their bundles. They
checked for new packages, third-party changes, tag manager updates, and any new
hydration or framework cost that might have slipped into the release.

It was a sensible line of investigation, but it turned nothing up and didn’t fit
the facts. There had been no meaningful JavaScript-facing change in the
timeframe they were looking at, and the waterfalls told a much more interesting
story. There were plenty of late long tasks, but they had not materially changed
between the before and after traces. What _had_ changed was TTI.

In the waterfalls below, I have annotated the five-second quiet window in yellow
and worked back to TTI which is annotated as a vertical pink line. Note that,
for the most part, both waterfalls share identical hallmarks.

<figure>
<img src="{{ site.cloudinary }}/wp-content/uploads/2026/06/wpt-01.png" alt="Side-by-side WebPageTest waterfalls comparing before and after runs, with yellow quiet windows and pink TTI markers showing the after run’s TTI much later than before." width="1500" height="1043" loading="lazy">
<figcaption>The yellow quiet window is much later after the change, pushing TTI across almost the full waterfall.</figcaption>
</figure>

Next, let’s look specifically at long and blocking tasks. Again, the hallmarks
of main thread blocking activity remain mostly unchanged, but the sheer surface
area being measured is substantially larger:

<figure>
<img src="{{ site.cloudinary }}/wp-content/uploads/2026/06/wpt-02.png" alt="Zoomed WebPageTest main-thread comparison showing broadly similar blocking activity in both traces, but a much longer measured TBT Window after the regression." width="1500" height="489" loading="lazy">
<figcaption>The work did not suddenly appear; the metric simply had much more of the timeline available to count.</figcaption>
</figure>

Before the regression, the page was considered interactive before a lot of that
late activity mattered. After the regression, TTI had moved out toward 20
seconds, which meant the TBT Window stretched much further across the waterfall
and pulled previously out-of-scope work into the metric.

The team did have a TBT regression in terms of pure numbers, but they did not
have the JavaScript regression they thought they had. This is a very important
distinction because those two interpretations lead to entirely different
investigations. One sends you into bundles, dependencies, hydration, and third
parties; the other sends you into the definition of the metric and the
conditions that moved its boundaries.

Without the TBT Window in mind, you can end up trying to optimise code that did
not cause the change. The practical lesson I took from this was simple: if TBT
skyrockets for no obvious JavaScript reason, check the network.

## The LCP Improvement That Tanked TBT

The interesting part of this story is what moved TTI in the first place. We had
been working on LCP, and had added a `preload` for the LCP image on the previous
day. This is exactly the kind of thing I like to see: identify the important
image, get it discovered earlier, help the browser fetch it sooner, improve the
user-visible experience. And it worked: the [LCP
optimisation](/2022/03/optimising-largest-contentful-paint/) was doing what it
was supposed to do.

But, unfortunately, it also changed the shape of the network. TTI’s calculation
does not only care about long tasks; it also looks for a quiet window of at
least five seconds, where quiet means no long tasks and **no more than two
in-flight network `GET` requests**. By introducing just one additional request
via `preload`, the page suddenly fell foul of the network quiet-window
condition. TTI moved later, the TBT Window became much larger, and suddenly long
tasks that had previously sat outside the measurement window were being
included.

This is the sort of thing that makes performance work so interesting and, if we
are honest, sometimes quite annoying. A perfectly sensible optimisation for one
metric made a completely different metric look catastrophically worse. More
specifically, an optimisation intended to improve LCP caused TTI to move later,
which in turn caused TBT to include more of the existing long-task tail.

Two metrics that are, from a user-experience point of view, concerned with
different things became highly dependent on each other through the small print
of their specs.

This is not necessarily a criticism of Lighthouse, SpeedCurve, WebPageTest, or
the metrics themselves (though I do wish TTI would be fully sunset, even as
a windowing metric). It is a reminder that our tooling is doing exactly what it
says on the tin, but we need to read the tin.

## Why TTI Can Move

The weird thing about TTI is that it sounds more intuitive than it actually is.
The name makes it feel like a direct measure of when the page becomes usable,
but the calculation is far more fiddly and esoteric than that. As above, TTI is
jointly dependent on long tasks and network activity.

The latter is the part of TTI that I have never liked. The intent is probably
sensible: a page that is still fetching resources may not be as settled as one
that has gone quiet, but the threshold itself—no more than two in-flight `GET`
requests for five seconds—is inevitably arbitrary, and allows network behaviour
to influence a metric that many people read as interactivity. Frustratingly, in
a world of tag managers, tracking, ads, lazy loading, and more, forensic control
over network activity is seldom within developers’ reach.

That means TTI can move because of long tasks, but it can also move because the
page fails to reach that required network quietness. This is precisely what
happened here—a network optimisation changed the network profile, TTI moved,
and the TBT Window grew.

The long tasks did not get worse, they just became visible to the metric.

## Causality Can Run Both Ways

One thing worth being clear about: an expanded TBT Window does not automatically
mean the TBT regression is a false alarm. Because TTI is calculated from both
network quietness and long-task quietness, a genuine increase in blocking work
can itself push TTI later. Add a large task at 12 seconds, or move a cluster of
tasks further down the trace, and the browser may no longer find its quiet
window where it used to. TTI moves out, the TBT Window grows, and TBT rises for
two reasons at once: there _is_ more blocking work _and_ the metric now has more
timeline in which to count it.

This is a significant distinction. The TBT Window is not a way to explain away
TBT, but a way to avoid guessing. If the window grows because FCP or network
quietness changed, you may be looking at a windowing artefact; if the window
grows because true long-task activity got worse, you have a real TBT regression
with a larger surface area. Either way, plotting the window gives you the
context needed to tell those scenarios apart.

## How We Fixed It

We didn’t. It wasn’t a regression in any real, user-facing sense and we also had
next to no control over the root cause. Reverting the `preload` change would
have improved the numbers, but it would have materially regressed the user
experience.

Instead, I advised that the client put a secondary lever in place and only treat
TBT as a regression if it moves independently (or at a faster rate) than TTI.
All TBT charts now contain a matching TTI score that needs to diverge beyond
a certain threshold before we act. If you’re monitoring TBT, I’d suggest you do
the same.

{% include promo.html %}

{% comment %}
## TBT on csswizardry.com

Since I implemented [Speculation
Rules](/2024/12/a-layered-approach-to-speculation-rules/) on this site, my TBT
has been much harder to keep under control. And while that doesn’t bother me, it
again shines a light on the problem of underpinning TBT with an esoteric metric
like TTI.

Speculation Rules work to fetch potential subsequent pages in the background
during the browser’s idle time. This leads to a long tail of requests.
{% endcomment %}

## Make the Window Visible

This is where I think synthetic tooling could help developers enormously.
Anywhere that plots TBT should also plot the TBT Window alongside it. Not as
a new score per se, but as a sanity check or control.

The data is already there. If the tool knows FCP and TTI, and it has used them
to calculate TBT, it can also show the size of the window between them. That
single extra line on a chart would make a lot of investigations much easier to
reason about. Tools could even correlate window growth with TBT growth and alert
teams to potential false flags and red herrings:

> **N.B.** TBT Window increased by 37% between these two tests—TBT scores may be
> misleading.

In the interim, if you’re already rolling your own dashboards like you can in
SpeedCurve, you just need to plot each of First Contentful Paint, Total Blocking
Time, and Time to Interactive on the same time series:

<figure>
<img src="{{ site.cloudinary }}/wp-content/uploads/2026/06/speedcurve-02.png" alt="SpeedCurve chart titled TBT & TBT Window showing JS Total Blocking Time at 82 ms, Time to Interactive at 2.34 seconds, and First Contentful Paint at 0.78 seconds, with the FCP and TTI lines remaining largely stable from 18 to 31 May." width="1500" height="540" loading="lazy">
<figcaption>The FCP and TTI lines define your TBT Window; any drift between these two may explain changes in TBT, so check there first! Note how stable the TBT Window remains in this screenshot.</figcaption>
</figure>

If TBT goes up and the TBT Window stays flat, you are probably looking at
a genuine increase in blocking work; if TBT goes up and the TBT Window expands
at the same time, you know to ask if or why FCP or TTI moved before assuming
blocking time actually got worse.

Likewise, if TBT improves while the window shrinks, you should be careful about
celebrating too quickly: you may have removed blocking work, or you may simply
have stopped counting some of it.

In the screenshot above, the TBT spike around 19–20 May cannot be explained by
a change in TBT Window and was indeed a genuine TBT regression caused by a third
party:

<figure>
<img src="{{ site.cloudinary }}/wp-content/uploads/2026/06/speedcurve-03.png" alt="SpeedCurve Common Requests table comparing JS CPU Time between two tests, showing several third-party scripts using more CPU in Test Two, including Google Tag Manager rising from 70 ms to 149 ms and Sentry rising from 186 ms to 344 ms." width="1500" height="546" loading="lazy">
<figcaption>This is the other side of the diagnostic: when the TBT Window is stable, a TBT spike is much more likely to be real blocking work.</figcaption>
</figure>

In dashboards, I would probably expose this as TBT and TBT Window. Tracking
changes across both metrics in tandem can highlight genuine regressions versus
a larger surface area.

This is no longer theoretical: synthetic tools can expose the TBT Window today,
and I think they should. In fact, happily, after advising
[Matt](https://www.mattzeunert.com/) on this exact topic, he added it to
[DebugBear](https://www.debugbear.com/) which I believe makes them the first!

<figure>
<img src="{{ site.cloudinary }}/wp-content/uploads/2026/06/debugbear.png" alt="DebugBear lab test dashboard showing Total Blocking Time over time and a highlighted Total Blocking Time Window card reporting 4.42 seconds between FCP and TTI." width="1500" height="908" loading="lazy">
<figcaption>Showing the TBT Window alongside TBT turns this from a hidden implementation detail into useful debugging context.</figcaption>
</figure>

None of this changes the definition of TBT, and none of it makes TBT any less
useful, but it does give teams a better way to interpret any movement they are
already seeing.

{% include cross-sell.html %}

## Closing Thoughts

TBT is still a useful lab metric. It is not a replacement for [Interaction to
Next Paint](https://web.dev/articles/inp/), and it is not a perfect model of
real-user interactivity, but it remains a very practical way to spot main-thread
contention during page load.

Unfortunately, however, I feel it being bounded by the arbitrary definitions of
TTI leaves a lot to be desired—entirely unrelated and unexpected network
activity can completely tank otherwise healthy pages.

TTI may have left the Lighthouse score, but it has not entirely left your
metrics. If you monitor synthetic TBT, keep an eye on your TBT Window as well.
Otherwise, sooner or later, you will find yourself trying to find JavaScript
that didn’t even change.
