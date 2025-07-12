---
layout: post
title: "Setting a New Standard for ISO.org"
meta: "How I helped ISO.org achieve all-green Core Web Vitals for the first time ever. LCP down 29%, CLS down 94%."
permalink: /case-studies/iso-org/
next-case-study-title: "Cache in the cloud—fixing caching at Cloudinary"
next-case-study-url: /case-studies/cloudinary/
hide-hire-me-link: true
case-study: true
lux: "Case Study"
toc: false
---

ISO is _the_ standard in standards. So imagine my delight when they got in touch
asking me to make ISO.org faster for their millions of monthly visitors!

<img src="{{ site.cloudinary  }}/img/content/case-studies/iso-org/iso-logo.png" alt="" width="128" height="106"
     class="u-outdent"
     style="float: left;
            margin-right: 24px;
            shape-outside: url({{ site.cloudinary  }}/img/content/case-studies/iso-org/iso-logo.png);">

I love a spec, I love a standard, so working with _the_ [International
Organization for Standardization](https://www.iso.org/) is a bit of a dream come
true! As a Brit, [ISO
8601](https://www.iso.org/iso-8601-date-and-time-format.html) and [ISO
3103:2019](https://www.iso.org/standard/73224.html) are particularly close to my
heart, so to work with the folk that wrote them…? It’s a yes from me.

Conversations started in October 2024 with a view to kicking off the project in
spring 2025. This gave us ample time to [design the perfect
engagement](/services/) and be very well prepared into the run-up. The brief was
simple: <q>improve the user experience</q>. The focus wasn’t on
[SEO](/2023/07/core-web-vitals-for-search-engine-optimisation/) or revenue, but
simply on improving the user experience. After all, improve UX, and all else
follows. It’s a wise move!

We decided to benchmark against [Core Web
Vitals](/workshops/core-web-vitals-on-ios/) as they’re arguably the most
sensible place to start for a fledgling project. Their biggest sticking points
were Largest Contentful Paint and Cumulative Layout Shift. Interaction to Next
Paint wasn’t much of a concern for them as they’d made smart decisions in the
past and not gone all-in on JavaScript.

The project was to be incredibly tactical—a quick-fire round of specific
improvements built out into a backlog that the team could pick up as and when
they were ready. What was nice about this approach, and not running a big
reveal-style project, is that we were able to realise performance improvements
while the project was in flight. Not only was this highly motivating, it
demonstrated immediate value. It was definitely the right thing to do!

And how did it go? It went very well:

<figure>
<img src="{{ site.cloudinary  }}/img/content/case-studies/iso-org/crux.png" alt="Graphs showing significant and sustained improvements in all three Core Web Vitals since the project started" width="1500" height="348" loading="lazy">
<figcaption>I think the numbers speak for themselves… <a href="{{ site.cloudinary  }}/img/content/case-studies/iso-org/crux.png">View full sie (32.5KB)</a></figcaption>
</figure>

You can see in the graphs above that our first performance-facing deployments
began in the last week of March. Taking the CrUX data for then versus the time
of writing (July 2025), the headline results are:

* **LCP was improved by 800ms**, from 2.8s down to 2s.
  * A 29% improvement!
* **INP was improved by 7ms**, from 85ms down to 78ms.
  * It’s an 8% improvement, but at this scale it simply doesn’t count.
* **CLS was improved by 0.08**, from 0.18 down to 0.01.
  * This represents a 94% improvement!

<!--
| Metric  | Before  | After | Δ%    |
|:--------|--------:|------:|------:|
| **LCP** | 2.8s    | 2.0s  | −29%  |
| **INP** | 85ms    | 78ms  | −8%   |
| **CLS** | 0.18    | 0.01  | −94%  |
-->

The team—and I!—are understandably very very happy with these results. The
project was a short one, and I have ideas of how we can take these numbers even
further with a little bit more of a push, but for the first time _ever_, ISO.org
is all green.

As is customary, I handed over a full [Trello](/2014/05/my-trello-workflow/)
backlog (half of which was already live), and an Executive Summary document for
the non-technical stakeholders and sponsors.

It was about as targeted as a [web performance audit](/performance-audits/) can
get: in and out, job done.

If you need some of the same, [get in touch](/contact/).

---

{% include promo-next.html %}
