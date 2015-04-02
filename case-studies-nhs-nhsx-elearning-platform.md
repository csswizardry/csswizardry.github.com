---
layout: post
title: NHS – NHSx eLearning platform
meta: "Working in intense sprints to help build an eLearning platform for the NHS"
permalink: /case-studies/nhs-nhsx-elearning-platform/
next-case-study-title: "An intense week of workshop and hack days in Copenahgen."
next-case-study-url: /case-studies/better-collective/
hide-hire-me-link: true
---

I must admit, when I saw an email from the NHS asking me if I’d like to help
them on a project, my first thought was one of much uncertainty. Usually, in
British media, most reports about IT in the public sector are horror stories,
with multi-million pound contracts awarded to huge ‘Enterprise’ contractors who
do a terrible job, take their cheque, and leave somebody else to clean up the
mess.

Another one of my reservations was about technology and approach. The NHS,
being public sector, has to serve a lot of people, which means a lot of older
browsers, etc. I was worried we’d have to support IE6, and not get to use any
new or emerging tech; I imagined that responsive wouldn’t be a requirement, and
that the site would have to look exactly the same in every browser.

**This project couldn’t have been more different**: responsive, mobile first,
built on Rails, HTML5, and Sass, and all run very agile (using GitHub and
[Trello](/2014/05/my-trello-workflow/)) by a lean team of just four people.

<figure>
  <img src="/img/content/case-studies/nhs/01.png" alt="">
  <figcaption><a href="/img/content/case-studies/nhs/01-full.png">View full size/quality (113KB).</a></figcaption>
</figure>

## Responsibilities and deliverables

A few of my key responsibilities on this project included:

* Design and product rationalisation
* UI development
  * Architecture
  * UI Toolkit
  * Responsive development
  * Product integration
* Performance engineering
  * ‘Traditional’ optimisations (HTTP optimisation, optimised code, etc.)
  * Rendering performance

I left the NHS with:

* **A clear CSS architecture and framework**, to allow the product to be scaled
over time.
* **A UI Toolkit**, for new developers and/or software engineers to grow the
product off of the back of a consistent library of UI Components.
* **Phase 1 of an integrated UI**, i.e. working alongside software engineers to
build the UI Toolkit into a working product.

## First contact

I got an email from [Jason](https://twitter.com/jasonbrewster), the NHS
Leadership Academy’s Programme Lead, asking if I’d be interested in working my
design rationalisation magic on an ambitious new project of theirs, as well as
joining to build the front-end of the entire product: an eLearning platform
which aimed to bring all the NHS’ many fragmented learning resources under one
roof, accessible to all members of NHS staff.

{% include promo.html %}

It was clear from Jason’s opening email that this project was not going to be
fraught with the same kind of problems you read about in the press. Jason was
clued up and open to healthy dialogue: rereading our initial emails reminds me
how, right from the beginning, we were clearly walking a two-way street
here—Jason had clear vision for the product, but wasn’t afraid to hand a lot of
responsibility over to others.

We were also joined by Ruby developer and [Hey!Stac
micro-conference](http://hey.wearestac.com/) organiser [Josh
Nesbitt](https://twitter.com/joshnesbitt), who had just wrapped up a contract
with a large client in the next city over.

<small>**Aside:** Josh has also written up a case study covering [his side of
the NHSx project](http://wearestac.com/blog/case-study-nhsx).</small>

Next, the three of us set up an informal meeting at the NHS offices to meet
each other, and decide how we would go about tackling the project.

<figure>
  <img src="/img/content/case-studies/nhs/02.png" alt="">
  <figcaption><a href="/img/content/case-studies/nhs/02-full.png">View full size/quality (95KB).</a></figcaption>
</figure>

## The process

It was very clear that we’d all have to work very quickly and very coordinated:
there was a deadline on the project which, although definitely attainable, did
put some pressure on us all.

The team of four (Jason, Product Owner and Designer; Me, UI Developer; and Josh
and Dave, Software Engineers) had to work in a very agile manner. We all
started our respective work streams at the same time, so I wasn’t waiting for
designs to build, and Josh and Dave weren’t waiting for a UI Toolkit to
implement: whilst Jason spent the first few days roughing together some UI
comps in Sketch, I was setting up the UI’s architecture, whilst Josh and Dave
we’re working on a fairly complex architecture for the application itself.

This meant a lot of collaboration, realising designs in the browser,
prototyping stuff, experimenting, and even a teardown. I was building and
tweaking/rationalising the designs as they landed, meaning that—although the
site was designed statically in Sketch—it found its final form in code.

This allowed us to work very fast, but also for the design phase to happen much
more quickly; because we weren’t waiting on high-fidelity comps it meant that
Jason could work much more rapidly and, for want of a better word, much more
messily. The Sketch files only really needed to give an idea of what the
product will look like—its _Design Atmosphere_—and Jason and I collaborated to
finalise things in CSS. This meant that he could completely steer the design
direction, but wasn’t bogged down with having to create a complete Sketch comp
for every last little detail. Agile design that worked very, very effectively.

It’s also worth noting that throughout all of this, I was still travelling
around a lot to work with other consultancy clients, run workshops, and speak
at conferences. Jason fully understood and allowed that I work in a fairly
remote, satellite manner. It was understood that we had a brief and a deadline
and, as long as both were met, it didn’t matter how it got done. This was
really great from my point of view; I felt very trusted and unrestricted, and
it all worked out perfectly.

## The tech

One of the first things I was sure to do during our initial meetings was to
define and underline browser support: which browsers are going to get serviced
at all, and which features will all of those browsers receive? In the interests
of longevity (do we really want to have a codebase full of OldIE polyfills that
we’ll have hanging round for years to come), pragmatism (the clock was
ticking), and the sake of quality (let’s not pollute the product’s codebase
with hacks to force legacy browsers to work), I made a few fundamental
decisions:

* **Let’s go responsive.** It was noted that people using NHSx would often do
so in non-work environments. Whilst the NHS can be fairly sure of its own IT
policies (browsers, devices, etc.) there was a very high chance that users
would visit from their devices at home: tablets, smartphones, laptops,
desktops, you name it.
* **Let’s go mobile first.** Not only is it just ‘best practice’—and a very
efficient, nice way of writing responsive code—going mobile-first really helped
up to not have to worry about making things work in older browsers, because we
decided:
* **Let’s serve OldIE the ‘mobile’ layout.** If we focussed on making a good
enough small-screen layout, then a large-screen view would just become an
_advancement_ of that layout—the epitome of progressive enhancement. This meant
that users of older browsers still got a great-looking experience, but also
meant that we didn’t have to shoehorn any responsive polyfills into the
codebase. We were removing potential tech-debt before we’d even accrued it.
* **Let’s support IE7+.** We couldn’t avoid the fact that we would have a
fairly long-tail of browser support, and we settled on IE7 as our lowest. Due
to taking such a pragmatic approach, and ensuring the UI was a simple and
non-complex as possible, it meant **I could serve all IEs back to IE7 in just
50 extra lines (or 352 gzipped bytes) of CSS**.

The NHSx site is built on [inuitcss](http://inuitcss.com/)—a Sass-based, OOCSS
framework with a strong focus on scalability and performance—and
[ITCSS](http://itcss.io/)—a proprietary CSS architecture which lends itself
well to managed UIs, smaller footprints, and a more sane, manageable codebase.
Because inuitcss and ITCSS focus so heavily on performance and a small
footprint, **the entire products gzipped CSS weighs in at under 9KB**. And, by
using inuitcss, I managed to have the entire CSS architecture in place within
half a day.

Setting up your architecture separately to your actual UI code is hugely
important when working in a changing and/or product environment. A few days
into building the initial UI, Jason soon realised that his initial designs
weren’t quite on the right tracks, so completely redid them. The result, the
entire team agreed, was a much, much better UI, far more suited to the type of
product that NHSx was to become. Having set up the architecture separately to
the UI work I’d started doing meant that there was very little waste or
overhead in starting again, and a good 75% of the code I’d written so far was
completely recyclable, despite the designs now being totally, entirely
different.

Our time together was drawn to a close with a day-long workshop which I ran for
staff at the Leadership Academy involved in the NHSx project. This workshop
served as something of a handover, but also included:

* Principles behind a solid and scalable CSS architecture.
* An in-depth look at [ITCSS](http://itcss.io).
* Managing layout in component-based and responsive builds.
* Naming conventions and Sass usage.
* Performance optimisation techniques, as well as covering the work I’d done so
  far to keep NHSx snappy.
* A hands-on Q&A and hack session.

A great way to end a fantastic project.

## Summary

In total, I spent 21 dev days working in a remote, very agile manner, to build
the NHS a highly performant architecture and framework, building a UI Toolkit,
and then implementing it alongside Josh and Dave right onto the product.

This project helped show that, with (a focus on) the right people, even
companies as large as the NHS can work quickly and adaptively, in a modern,
agile way, that doesn’t cost millions of pounds. It was a fantastic product to
be a part of, and I hope Jason manages to fan out this way of working further
across the NHS’ departments.

---

{% include promo-next.html %}
