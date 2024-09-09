---
layout: page
title: Free Consultations
page-class: page--services  page--free-consultations
meta: "Free, zero-obligation performance consultations!"
permalink: /free-consultations/
indexable: false
main: "https://csswizardry.com/img/content/consultations/cwv-overview.png"
---

**Yes, free.**

Firing off the first email is daunting. How much will this cost? What do I even
need? I’m not sure what to ask for!

I get it. I wouldn’t like to do it either.

To make things much more comfortable, we can start with a free, zero obligation
consultation:

1. You give me a site or a handful of URLs and a little context.
2. I take a look over your Core Web Vitals data.
3. I identify your key liabilities and pain points and provide early triage.
4. I suggest an appropriate level of engagement.
5. You decide how you’d like to proceed.

It’s as simple as that.

<a href="mailto:csswizardry@gmail.com" class="btn  btn--full">Request a Consultation</a>

## Example Consultation

Free consultations are incredibly low fidelity but usually of very high value.
Here is a consultation I did for a potential client:

* Latest Core Web Vitals data shows we need to focus on LCP and CLS:
  <img src="{{ site.cloudinary }}/img/content/consultations/cwv-overview.png" alt="Latest Core Web Vitals data" width="1500" height="433">
  * We regressed in August—does this line up with any changes?
* Huge gaps between milestones hints at client-rendered content:
  <img src="{{ site.cloudinary }}/img/content/consultations/cwv-milestones.png" alt="Gaps between TTFB, FCP, and LCP" width="1500" height="433">
  * Super fast response times but late LCP suggest we’ve moved a lot of work
    into the browser. This is almost never faster.
* Leaning so heavily on CSR also harms CLS—we aren’t placeholding all of the
  nascent content.
* Not only are we client-rendering, we’re also lazily loading the images we
  insert. Slow on top of slow.
  * Only, it actually appears to be broken, so we’re almost definitely incurring
    double downloads (or worse).
* It looks like _Collection_ pages fare worse than actual _Product_ pages—note
  the differing percentages for _Poor_ experiences:
  * Collections:
    <img src="{{ site.cloudinary }}/img/content/consultations/cwv-urls-01.png" alt="" width="1500" height="1125">
  * Products:
    <img src="{{ site.cloudinary }}/img/content/consultations/cwv-urls-02.png" alt="" width="1500" height="1125">
* **I would definitely recommend at least an audit-style engagement to solve
  these Core Web Vitals issues.**

<a href="mailto:csswizardry@gmail.com" class="btn  btn--full">Request a Consultation</a>
