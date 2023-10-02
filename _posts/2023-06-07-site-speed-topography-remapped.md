---
layout: post
title: "Site-Speed Topography Remapped"
date: 2023-06-07 17:11:58
categories: Web Development
main: "https://csswizardry.com/wp-content/uploads/2023/06/site-speed-topography-01.png"
meta: "Revisiting and remapping my Site-Speed Topography technique for assessing web performance at large"
---

<p class="c-highlight"><strong>N.B.</strong> This is an update to my 2020
article <a
href="/2020/11/site-speed-topography/"><cite>Site-Speed
Topography</cite></a>. You will need to catch up with that piece before this one
makes sense.</p>

Around two and a half years ago, I debuted my [<cite>Site-Speed
Topography</cite>](/2020/11/site-speed-topography/)
technique for getting broad view of an entire site’s performance from just
a handful of key URLs and some readily available metrics.

In that time, I have continued to make extensive use of the methodology
(alongside additional processes and workflows), and even other performance
monitoring tools have incorporated it into their own products. Also in that
time, I have adapted and updated the tools and technique itself…

<a href="https://csswizardry.gumroad.com/l/site-speed-topography-remapped" class="btn  btn--full">Get the new spreadsheet!</a>

## What Is Site-Speed Topography?

Firstly, let’s recap the methodology itself.

The idea is that by taking a handful of representative page- or template-types
from an entire website, we can quickly build the overall landscape—or
<i>topography</i>—of the site by comparing and contrasting numerical and
milestone timings.

Realistically, you _need_ to read [the original
post](/2020/11/site-speed-topography/) before this
article will make sense, but the basic premise is that by taking key metrics
from multiple different page types, and analysing the similarities, differences,
or variations among them, you can also very quickly realise some very valuable
insights about other metrics and optimisations you haven’t even captured.

Pasting a bunch of [WebPageTest](https://www.webpagetest.org/) results into
a spreadsheet is where we start:

<figure>
<img src="{{ site.cloudinary }}/wp-content/uploads/2020/10/milestones-spreadsheet.png" alt="" loading="lazy" width="1614" height="250" />
<figcaption>The old <i>Site-Speed Topography</i> spreadsheet. Plugging milestone
timings into a spreadsheet helps us spot patterns and problems.</figcaption>
</figure>

Similar
[TTFB](/2019/08/time-to-first-byte-what-it-is-and-why-it-matters/)
across pages suggests that no pages have much more expensive database calls than
others; large deltas between TTFB and First Contentful Paint highlight a high
proportion of render-blocking resources; gaps between Largest Contentful Paint
and SpeedIndex suggest late-loaded content. These insights gained across several
representative page types allow us to build a picture of how the entire site
might be built, but from observing only a small slice of it.

The backbone of the methodology is—or at least _was_—viewing the data
graphically and spotting patterns in the bar chart:

<figure>
<img src="{{ site.cloudinary }}/wp-content/uploads/2020/10/milestones-chart.png" alt="" loading="lazy" width="3080" height="1452" />
<figcaption>Viewing the data as a bar chart can help highlight some of the
issues.</figcaption>
</figure>

Above, we can see that the Product Listing Page (PLP) is by far the worst
performing of the sample, and would need particular attention. We can also see
that First Paint and First Contentful Paint are near identical on all pages
except the PLP—is this a webfont issue? In fact, [we can see a lot of
issues](/2020/11/site-speed-topography/#building-the-map)
if we look hard enough. But… who wants to look hard? Shouldn’t these things be
easier to spot?

**Yes**. They should.

## Remapping

If you read the original post, the section [<cite>Building the
Map</cite>](/2020/11/site-speed-topography/#building-the-map)
explains in a lot of words a way to spot visually a bunch of patterns that live
in numbers.

Surely, if we have all of the facts and figures in front of us anyway, manually
eyeballing a bar chart to try and spot patterns is much more effort than
necessary? We’re already in a spreadsheet—can’t we bring the patterns to us?

**Yes**. We can.

Here is the new-look <i>Site-Speed Topography</i> spreadsheet:

<figure>
<img src="{{ site.cloudinary }}/wp-content/uploads/2023/06/site-speed-topography-01.png" alt="" loading="lazy" width="1500" height="815" />
<figcaption>A much more colourful spreadsheet provides way more information. <a href="{{ site.cloudinary }}/wp-content/uploads/2023/06/site-speed-topography-01-large.png">View full size/quality (182KB)</a></figcaption>
</figure>

<a href="https://csswizardry.gumroad.com/l/site-speed-topography-remapped" class="btn  btn--full">Get the new spreadsheet!</a>

Now, without having to do any mental gymnastics at all, we can quickly see:

* How pages perform overall across all metrics.
* Which pages exhibit the best or worst scores for a given metric.
* General stability of a specific metric.
* Are any metrics over budget? By how much?
  * We can also set thresholds for those budgets.
* We can begin to infer other issues from metrics already present.

Of course, we can still graph the data, but we soon find that that’s almost
entirely redundant now—we solved all of our problems in the numbers.

<figure>
<img src="{{ site.cloudinary }}/wp-content/uploads/2023/06/site-speed-topography-02.png" alt="" loading="lazy" width="1500" height="726" />
<figcaption>Graphing the data doesn’t provide as much benefit anymore, but it’s
built into the spreadsheet by default.</figcaption>
</figure>

Visually, patterns do still emerge: the PD- and SR-Pages have more dense
clusters of bars, suggesting overall worse health; the Home and Product pages
have by far the worst LCP scores; the SRP’s CLS is through the roof. But this is
only visual and not exactly persistent. Still, I have included the chart in the
new spreadsheet because different people prefer different approaches.

Without looking at a single line of code—without even visiting a single one of
these pages in a browser!—we can already work out where our main liabilities
lie. We know where to focus our efforts, and our day-one to-do list is already
written. No more false starts and dead ends. **Optimise the work not done.**

So, what are you waiting for? [Grab a copy of the new Site-Speed Topography
spreadsheet along with a 15-minute screencast
explainer!](https://csswizardry.gumroad.com/l/site-speed-topography-remapped)

<a href="https://csswizardry.gumroad.com/l/site-speed-topography-remapped" class="btn  btn--full">Get the new spreadsheet!</a>
