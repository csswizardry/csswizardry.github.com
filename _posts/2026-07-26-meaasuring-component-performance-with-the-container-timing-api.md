---
layout: post
title: "Measuring Component Performance with the Container Timing API"
date: 2026-07-26 13:51:29
categories: Web Development
main: ""
meta: "Measure how entire components render with the Container Timing API: how it differs from Element Timing, where it helps, and how to try it today."
faq:
  - question: "What is the Container Timing API?"
    answer: "The Container Timing API reports when new, contentful parts of an annotated DOM subtree are painted, allowing developers to measure how whole components and page regions render."
  - question: "How does Container Timing differ from Element Timing?"
    answer: "Element Timing measures the render of an individual annotated image or piece of text. Container Timing accumulates paint information across an annotated element and its descendants, emitting updated entries as new areas receive contentful paint."
  - question: "Does Container Timing report when a component is complete?"
    answer: "No. A browser cannot know whether a component will receive more content later, so the API emits a series of paint updates and leaves the site to define which update is meaningful for its own product."
  - question: "Does Container Timing measure interactivity?"
    answer: "No. It measures contentful paint inside a container; it does not prove that event handlers are attached, data is current, or the component is ready to accept input."
  - question: "Which browsers support Container Timing?"
    answer: "At the time of writing, Container Timing is experimental. Chrome is running an origin trial from versions 148 to 153, and the API can also be enabled locally with Chrome’s experimental web platform features flag."
---

The browser is very good at telling us when _a page_ looked ready. [Largest
Contentful Paint](https://web.dev/articles/lcp), for example, gives us a useful
high-level signal for the point at which the largest thing in the viewport was
rendered. It is much less good at telling us when _our things_ looked ready.

An ecommerce site might care when its product gallery and buy box rendered;
a publisher might care about its lead story; a financial application might care
about the quote panel that its customers actually opened the page to see. None
of those necessarily maps neatly to the largest image or block of text.

We can get closer with the [Element Timing
API](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceElementTiming),
but a component is rarely one element. A useful product card might contain an
image, title, price, stock status, rating, delivery estimate, and call to action.
Knowing that the image rendered at 700&nbsp;ms is helpful, but it does not tell
us how the card as a whole came together.

Enter the [Container Timing
API](https://github.com/WICG/container-timing): an experimental performance API
that allows us to annotate a whole region of the DOM and receive entries as new,
contentful parts of it are painted. Developed by [Bloomberg and
Igalia](https://developer.chrome.com/blog/container-timing-origin-trial/), it is
currently available in a [Chrome origin
trial](https://developer.chrome.com/origintrials/) and is one of the more
interesting additions to the performance timeline in a while.

The syntax is very simple. The implications are more interesting.

{% include promo.html %}

## What Problem Does Container Timing Solve?

Most of the web performance metrics that we use day to day are necessarily
generic. The browser can tell us when the first content appeared, which
contentful element was largest, whether the page shifted around, or how long an
interaction took. It cannot know which parts of our product matter most to our
users.

This is the distinction I was getting at when I wrote [<cite>Measure What You
Impact, Not What You
Influence</cite>](/2022/08/measure-what-you-impact-not-what-you-influence/).
Standard metrics are enormously valuable, but they describe things that our
work _influences_. Product-specific metrics describe the things that our teams
actually build and _impact_.

Before Container Timing, we broadly had three choices:

* use a generic milestone such as LCP and hope the important component happened
  to be represented by it;
* annotate one or more individual images or text elements with
  [`elementtiming`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/elementtiming)
  and attempt to reconstruct the component from those entries; or
* instrument application milestones with [User
  Timing](https://developer.mozilla.org/en-US/docs/Web/API/Performance_API/User_timing)
  and accept that <q>the JavaScript finished</q> is not the same as <q>the
  result was painted</q>.

All three can be useful, but none asks the rendering engine the question we
actually have: <q>How did this whole section appear to the user?</q>

It is possible to approximate that in userland by adding `elementtiming` to
everything in a subtree, watching for new nodes with a
[`MutationObserver`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver),
and keeping track of all of their rectangles. In fact, an early Container
Timing polyfill did roughly that, and the explainer still documents the
[user-space approach and its
drawbacks](https://github.com/WICG/container-timing#user-space-polyfill-in-javascript).
Unfortunately, the setup needs to happen before content paints, and doing
geometry accounting in JavaScript is both race-prone and expensive. The
polyfill is now [deprecated in favour of the native
implementation](https://blogs.igalia.com/dape/2026/02/10/container-timing-measuring-web-components-performance/).

Container Timing moves that work into the rendering engine, which already knows
what painted, when it painted, and where it painted.

## How the Container Timing API Works

We begin by adding a `containertiming` attribute to the root of the component or
region that we want to observe:

```html
<section containertiming="product-summary">
  <img src="/products/boots.jpg" alt="A pair of brown walking boots">
  <h1>Ridgeline Walking Boots</h1>
  <p>£129</p>
  <p>In stock</p>
  <button>Add to basket</button>
</section>
```

The attribute’s value becomes the container’s `identifier` in the performance
entries, so give it a stable, meaningful name. `thing`, `wrapper`, and
`component-7` will become annoying in analytics extremely quickly.

We then observe entries of type `container` with the familiar
[`PerformanceObserver`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver)
API:

```js
if (typeof PerformanceContainerTiming !== 'undefined') {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      console.log({
        identifier: entry.identifier,
        firstRenderTime: entry.firstRenderTime,
        latestPaintTime: entry.startTime,
        size: entry.size,
        lastPaintedElement: entry.lastPaintedElement
      });
    }
  });

  observer.observe({
    type: 'container',
    buffered: true
  });
}
```

As different contentful parts of `product-summary` paint, the observer receives
new [`PerformanceContainerTiming`
entries](https://wicg.github.io/container-timing/#sec-performancecontainertiming).
Each one contains:

* `identifier`: the value of the `containertiming` attribute;
* `firstRenderTime`: when the first contentful part of the container rendered;
* `startTime`: the latest qualifying paint time represented by this entry;
* `size`: the cumulative area that has received qualifying paint;
* `intersectionRect`: the bounding rectangle of the painted region accumulated
  so far;
* `lastPaintedElement`: the element that contributed the largest new painted
  area in that frame;
* `rootElement`: the element carrying the `containertiming` attribute; and
* `duration`: always `0`, because these entries represent moments, not spans.

The precise [processing model](https://wicg.github.io/container-timing/#processing-model)
is more involved, but the practical shape is straightforward. Imagine our
product summary renders in three stages:

1. at 480&nbsp;ms, its title and price appear;
2. at 710&nbsp;ms, the main product image appears; and
3. at 940&nbsp;ms, stock status and the call to action arrive.

Those figures are illustrative, but we would expect a series of entries whose
`firstRenderTime` remains at roughly 480&nbsp;ms while `startTime` and `size`
move forward as more of the component receives its first contentful paint.

That series is the useful bit. Container Timing does not merely give us
a single answer; it gives us the _shape_ of the component’s render.

## What Counts as an Update?

Container Timing is not a general-purpose record of every repaint in a DOM
subtree. That would be extremely noisy, not to mention expensive.

Instead, an entry is generated when content paints into an area of the
container that has not previously been counted. The [current
specification](https://wicg.github.io/container-timing/#sec-report-container-timing)
builds up a cumulative painted region from contentful image and text paints,
emitting updated information after relevant rendering frames.

This leads to a few behaviours worth understanding:

* A blank box or CSS-only skeleton does not make the container ‘contentful’.
* Adding text to an empty element can create an entry because that area is
  receiving its first contentful paint.
* Changing text inside an area that has already been counted does not endlessly
  create new entries merely because its pixels changed.
* Adding a new image or block of text in a previously unpainted part of the
  component can create another entry.
* Pure decoration is not the point of the API, and composite content such as
  Canvas, SVG, and Shadow DOM has [important early
  limitations](https://github.com/WICG/container-timing#non-goals).

The API is also concerned with what was painted _in the viewport_. Its
rectangles are maintained in viewport coordinates and clipped to the visual
viewport. A below-the-fold component may therefore begin producing useful
entries when the user scrolls it into view, rather than when its DOM was first
constructed off-screen.

That is potentially very useful for lazy-rendered interfaces, but it also means
we need to distinguish load timing from exposure timing in our analysis. If
a container appears at 12 seconds because the user did not scroll to it until
then, the API has not found a 12-second network regression.

There is another trial-era edge case hiding in that geometry. The [painted
region is cumulative in viewport
coordinates](https://wicg.github.io/container-timing/#painted-region), so
movement can expand it into new coordinates. Components that move substantially
during load need particularly careful interpretation.

## A Container Is Never Necessarily ‘Finished’

Here is the most important thing to understand about Container Timing:
**the browser does not tell us when the container is complete**.

It cannot.

A news feed could append another story. A stock widget could receive a delayed
market status. A product card could add a promotion after a personalisation
request. An application could render a validation message after an interaction.
From the browser’s point of view, there is no reliable way to know whether
a subtree has finished forever or is merely quiet for the moment.

This is why the API [emits updated entries as new areas
paint](https://developer.chrome.com/blog/container-timing-origin-trial/#how-the-container-timing-api-works)
rather than inventing an authoritative `completeTime`. LCP likewise produces
a sequence of candidates as the page renders, but has defined interaction and
visibility cut-offs for deciding when that sequence ends.

I recently made a similar case in [Front-End’s Missing Metric: The TBT
Window](/2026/06/front-ends-missing-metric-the-tbt-window/): metrics are shaped
as much by their bookends and boundaries as by what happens between them.
Container Timing is particularly interesting because its definition gives us
a beginning, but deliberately no equivalent end.

The difference is that Container Timing does not currently impose one universal
cut-off. The application needs to decide which interpretation fits:

* the first entry, for _time to first component content_;
* the final substantial area increase during initial load;
* the final entry before the user first interacts with the component;
* the latest entry within a product-defined loading window; or
* the whole sequence, so that we can study how progressively the component
  filled in.

This sounds less convenient than a single metric because it is. It is also more
honest.

A useful first origin-trial implementation would retain the sequence, at least
for a small sample of sessions, rather than immediately collapsing it into one
number:

```js
const containerPaints = new Map();

if (typeof PerformanceContainerTiming !== 'undefined') {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const paints = containerPaints.get(entry.identifier) || [];

      paints.push({
        firstRenderTime: entry.firstRenderTime,
        startTime: entry.startTime,
        size: entry.size,
        lastPaintedTag: entry.lastPaintedElement?.localName || null
      });

      containerPaints.set(entry.identifier, paints);
    }
  });

  observer.observe({
    type: 'container',
    buffered: true
  });
}
```

From there, we can inspect:

* **first render:** `paints[0].firstRenderTime`;
* **latest observed paint:** `paints.at(-1).startTime`;
* **initial paint span:** latest paint minus first render;
* **progressiveness:** how many meaningful steps occurred between the two; and
* **largest jump:** which update contributed the greatest increase in `size`.

I would not ship every raw entry from every component in every session to
analytics indefinitely. The cardinality will become expensive and tedious. But
during the trial, a bounded, sampled series is exactly the evidence we need in
order to decide which reduction actually reflects our product.

{% include cross-sell.html %}

## Container Timing vs. Element Timing

Container Timing is described as an extension of [Element
Timing](https://w3c.github.io/element-timing/), and its Chromium implementation
deliberately [reuses much of the same machinery](https://blogs.igalia.com/dape/2026/02/10/container-timing-measuring-web-components-performance/).
The APIs look related because they are related:

```html
<img elementtiming="product-image" ...>

<section containertiming="product-summary">
  ...
</section>
```

Their jobs are materially different, though.

<figure>
<table>
  <thead>
    <tr>
      <th>&nbsp;</th>
      <th>Element Timing</th>
      <th>Container Timing</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Unit of interest</th>
      <td>One annotated image or piece of text</td>
      <td>An annotated element and its descendant subtree</td>
    </tr>
    <tr>
      <th>Question</th>
      <td>When did this content render?</td>
      <td>How did this region come together?</td>
    </tr>
    <tr>
      <th>Entry type</th>
      <td><code>element</code></td>
      <td><code>container</code></td>
    </tr>
    <tr>
      <th>Geometry</th>
      <td>The chosen element’s viewport rectangle</td>
      <td>A cumulative region of newly painted content</td>
    </tr>
    <tr>
      <th>Useful detail</th>
      <td>Render/load times, URL, intrinsic image size, element</td>
      <td>First/latest paint, cumulative size, last contributor, root</td>
    </tr>
    <tr>
      <th>Typical use</th>
      <td>Hero image, headline, poster, critical text</td>
      <td>Buy box, search results, widget, navigation, content section</td>
    </tr>
  </tbody>
</table>
</figure>

### The Material Change

Element Timing is intentionally narrow. The [`PerformanceElementTiming`
interface](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceElementTiming)
can tell us about the selected element’s `renderTime`, `loadTime`, URL,
intrinsic dimensions, and visible rectangle. That is exactly the information we
want when the element _is_ the thing we care about.

Container Timing trades some of that element-specific detail for aggregation.
It watches contentful paint throughout a subtree, maintains a union of the
painted areas, and tells us which element contributed the largest new area in
the latest relevant frame.

Element Timing might tell us when the product image appeared. Container Timing
can tell us that the buy box started to appear at 480&nbsp;ms, gained most of
its area at 710&nbsp;ms, and received its final substantial initial update at
940&nbsp;ms.

The former is atomic; the latter is cumulative.

### The Philosophical Change

The more interesting difference is one of ownership.

With Element Timing, we point to a browser-recognisable piece of content and ask
for its timestamp. The object being measured is still largely a rendering
primitive: an image, a background image, or a group of text nodes.

With Container Timing, we define the boundary. A `section` is not inherently
a buy box, a lead story, or a flight-search result. _We_ say that it is, because
we understand our product and our users in a way that the browser never can.

That moves the API one layer closer to product semantics:

* from individual DOM artefacts to user-recognisable regions;
* from a single render timestamp to a progressive sequence;
* from browser-defined significance to author-defined significance; and
* from <q>largest content</q> to <q>the content our users came for</q>.

This is why I think Container Timing is more than merely ‘Element Timing, but
for a parent’. It accepts that modern interfaces are assembled from components,
and that the meaningful unit of performance is often the component rather than
any one of its implementation details.

The cost of that extra meaning is responsibility. The browser supplies evidence
but does not name our metric for us. If we choose to call the final update
_Product Summary Ready_, we need to document exactly how we selected it.

## Realistic Uses for Container Timing

The best candidates are components that are meaningful to a user, assemble in
more than one step, and are currently awkward to represent with a standard
metric.

### Ecommerce Product Summary

A product detail page’s LCP is often its main image, but customers need rather
more than a photograph before they can buy anything.

```html
<section containertiming="product-summary">
  <div class="product-gallery">
    ...
  </div>

  <div class="product-details">
    <h1>Ridgeline Walking Boots</h1>
    <p class="price">£129</p>
    <p class="availability">In stock</p>
    <button>Add to basket</button>
  </div>

  <aside containertiming-ignore>
    <!-- Non-critical recommendations or an advert. -->
  </aside>
</section>
```

Here, Container Timing can show whether the image, commercial information, and
call to action arrive together or in a long, awkward procession. The current
Chromium implementation lets us exclude irrelevant descendants with
[`containertiming-ignore`](https://chromium.googlesource.com/chromium/src/+/76d4b3fafe2bb8673115a5d322bc07af45135f80);
the attribute’s exact design is [still open to origin-trial
feedback](https://developer.chrome.com/blog/container-timing-origin-trial/#how-the-container-timing-api-works).

Do not call this _Buy Box Interactive_, though. Container Timing proves that
content painted; it does not prove that the JavaScript required to choose
a size or add the item to the basket is ready. Pair it with application
instrumentation or [Event
Timing](https://w3c.github.io/event-timing/) if interactivity is part of the
claim.

### Search Results and Product Grids

Search pages often render a shell, then a result count, then cards, images,
prices, badges, and personalisation. LCP may pick one card image and tell us
almost nothing about the grid as a whole.

Annotating the results region would let us study:

* time to first visible result;
* how long the initial visible result set takes to fill in;
* whether images arrive as a useful progression or a late wall of pixels; and
* whether one release added an extra paint stage to every search.

I would begin with one container around the visible result set, not
`containertiming` on 48 individual cards. The latter may be useful for focused
diagnosis, but the former better matches what the user is waiting for and keeps
the analytics manageable.

### Dashboards and Data-Heavy Widgets

A dashboard tile might contain a heading and latest value immediately, then
gain comparative data, a chart, annotations, and controls after one or more API
requests.

Container Timing can expose the difference between:

* a tile that appears nearly complete in one frame;
* a tile that shows useful numbers quickly but gains secondary context later;
  and
* a tile whose apparently small final dependency holds back most of its visible
  area.

Be careful with charts rendered solely in Canvas or complex SVG. The API’s
first version is built around the same contentful paint concepts as Element
Timing, and built-in composite content is [not yet one of its
goals](https://github.com/WICG/container-timing#built-in-containers). A widget
with HTML labels and values may still produce useful entries, but we should
verify what the actual chart contributes before naming a metric after it.

### Publisher Homepages and Article Regions

Publishers routinely care about much more than the largest story image. A lead
package might contain a headline, standfirst, image, timestamp, live status, and
related links, all delivered by different parts of the stack.

Container Timing can measure that package as one editorial unit while
`containertiming-ignore` excludes an ad slot, recommendation rail, or live blog
that is expected to continue changing.

This is also where the ‘last entry’ trap becomes obvious. An article page with
comments, related content, ads, and lazy-loaded media may continue receiving
new contentful paints for minutes. Container boundaries should reflect the
reader-facing unit we actually mean to measure, not merely whichever `<main>`
happens to wrap most of the page.

### Component and Team-Level Performance

For a large application or design system, stable `containertiming` identifiers
could become a useful contract between component owners and RUM:

* `global-navigation`
* `account-summary`
* `quote-panel`
* `checkout-form`
* `order-confirmation`

Teams could compare the first render, initial paint span, and number of
substantial updates for their own surfaces across releases. This gives
performance ownership a much more recognisable shape than asking every team to
explain its contribution to page-level LCP.

The identifiers need governance. Renaming `quote-panel` to `quote-card-v2` or
reusing the same identifier for different experiences will silently break the
time series. Treat them like analytics event names, not CSS classes.

## What Container Timing Is Not

New performance APIs are very easy to over-promote, so a few boundaries are
worth making explicit.

### It Is Not a New Core Web Vital

Container Timing does not change [the LCP
algorithm](https://github.com/WICG/container-timing#lcp-integration), and its
entries are not a new metric in CrUX or the Core Web Vitals programme. It is
application instrumentation built on the performance timeline.

That is a feature. The whole point is to represent regions that only the
application can identify.

### It Is Not ‘Component Ready’

Paint is not readiness.

A form can paint before its validation code is available; a chart can appear
while its data is stale; a button can render before its event listener is
attached. If the metric name promises interactive, usable, hydrated, accurate,
or complete, Container Timing alone is insufficient evidence.

Name the result after what it actually measures: _Product Summary Latest
Contentful Paint_ is clumsy but honest; _Product Summary Ready_ needs more
proof.

### It Is Not Visual Completeness

The `size` property is not a percentage. It is the cumulative area of qualifying
painted regions, with no authoritative denominator for what the component will
eventually become. The container may grow, move, reveal below-the-fold content,
or add new descendants later.

We can derive a product-specific progress model if we control the final
geometry, but the API does not hand us ‘83% complete’.

### It Is Not Free Reinstrumentation

The [Blink intent](https://groups.google.com/a/chromium.org/g/blink-dev/c/1uvAGNd2uME)
says overhead is limited to pages that enable the feature, with the
implementation piggybacking on rendering work that already happens. That is
encouraging, but it is not an invitation to annotate every `<div>`.

Use it on a small number of important, semantic regions; sample RUM collection;
and measure the measurement on the devices your users actually have.

## Trying the Chrome Origin Trial

At the time of writing, Container Timing is experimental and the [WICG
explainer lists an origin trial from Chrome 148 to
153](https://github.com/WICG/container-timing#container-timing-explainer).
The API was developed by Bloomberg, implemented in Chromium by Igalia, and the
trial is intended to test its instrumentation model, entry shape, buffering,
nesting behaviour, and real-world ergonomics.

That is what an origin trial is for. It is access to a proposed feature for
field testing, not a promise that every name and behaviour is now permanent.

To enable it for real visitors:

1. register for Container Timing on Chrome’s [origin-trial
   site](https://developer.chrome.com/origintrials/);
2. add the origin-specific token to the relevant pages, either as an HTTP
   response header:

   ```http
   Origin-Trial: TOKEN_GOES_HERE
   ```

   or in the document `<head>`:

   ```html
   <meta http-equiv="origin-trial" content="TOKEN_GOES_HERE">
   ```

3. add `containertiming` to the important regions in the server-rendered HTML;
   and
4. feature-detect before registering the observer.

Chrome’s [origin-trial
documentation](https://developer.chrome.com/docs/web-platform/origin-trials)
explains token scope, renewal, iframes, and how to verify enrolment in DevTools.

For local development without a token, enable _Experimental Web Platform
features_ at:

```text
chrome://flags/#enable-experimental-web-platform-features
```

Alternatively, launch Chrome with:

```sh
--enable-blink-features=ContainerTiming
```

The `containertiming` attribute itself is harmless in browsers that do not
support the API. Feature-detect the observer code like this:

```js
if (typeof PerformanceContainerTiming !== 'undefined') {
  // Register the PerformanceObserver here.
}
```

During the trial, this constructor check is preferable to relying only on
`PerformanceObserver.supportedEntryTypes`. Chrome’s guidance warns that the
latter is frozen on first access and can misreport if it is read before the
origin-trial token has been processed.

Finally, put the attribute in the original HTML or set it before inserting the
element into the document. Adding it after the component has already started
painting means those earlier paints are gone; the observer can only report
subsequent qualifying updates.

## Browser Support and Standardisation

Container Timing is not Baseline and should not yet be treated as a universally
available production primitive.

Chromium has the implementation and origin trial. Mozilla has recorded
a [positive standards position](https://github.com/mozilla/standards-positions/issues/1155)
and has been working on an implementation; WebKit’s [standards-position
request](https://github.com/WebKit/standards-positions/issues/442) remains open.
The proposal itself is still in the [Web Incubator Community
Group](https://wicg.github.io/container-timing/), with discussion taking place
in and around the W3C Web Performance Working Group.

The specification also has known gaps. Shadow DOM is out of scope for this first
version, composite elements such as SVG and MathML are not automatically
treated as containers, and the ignore mechanism may still change.

Progressive enhancement is easy enough here: unsupported browsers continue as
normal, and our RUM receives Container Timing data only where the feature
exists. The harder problem is analytical bias. An origin-trial dataset is
Chromium-heavy by definition, so do not mistake its numbers for a
browser-neutral population.

{% include promo.html %}

## What I Would Measure First

I would not begin by inventing one new company-wide metric called _Container
Ready_.

I would choose one important component that:

* appears on a high-volume journey;
* contains several independently rendered parts;
* is not represented well by LCP or one Element Timing entry; and
* has a clear owner who can explain how it is assembled.

A product summary, search-results region, account overview, or flight-search
result would all be good candidates.

For a sampled group of Chromium sessions, I would collect:

* the container’s first render time;
* every cumulative `size` and `startTime` during the initial loading window;
* the tag name of `lastPaintedElement` for diagnosis;
* the first user interaction time within that component; and
* the standard page-level metrics alongside it.

Then I would look at the evidence before naming the metric. Perhaps first render
correlates best with user behaviour. Perhaps the last large area increase is
more stable. Perhaps the interesting finding is not the endpoint at all, but
that one release turned a two-stage component into a six-stage one.

That, to me, is the promise of Container Timing. It does not try to replace
Core Web Vitals, and it does not pretend that the browser understands our
product. It gives us lower-level rendering evidence at a much more useful
boundary, then lets us apply our own domain knowledge.

Element Timing asks when one thing rendered. Container Timing lets us ask how
the thing our user actually recognises came together.

That is a materially larger—and philosophically much more interesting—step.
