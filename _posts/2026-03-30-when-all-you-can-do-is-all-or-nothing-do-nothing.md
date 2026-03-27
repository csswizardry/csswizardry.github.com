---
layout: post
title: "When All You Can Do Is All or Nothing, Do Nothing"
date: 2026-03-30 11:30:00
categories: Web Development
main: ""
meta: "If your design system can only apply `loading=lazy` or `fetchpriority=high` blindly, it may be safer not to apply them at all."
---

I’ve been working a lot over the last few years on the idea of **web performance
for design systems**. While a lot of my clients want me to start at the end and
work back (<q>we have a slow site, how can we make it faster?</q>), particularly
ambitious clients ask <q>how can we bake web performance in from the start?</q>
This post comes from a specific bit of advice I gave a client recently.

Their design system sits on top of a highly permissive CMS. Editors have a lot
of freedom—which is great—but it means the system often does not know, or cannot
tell, if a component will render above or below the fold, on or off screen, or
whether it will appear once or many times on the page.

This makes things like `loading=lazy` and `fetchpriority=high` awkward: if an
image might be an LCP candidate, then `loading=lazy` is bad news; if several
images might be LCP candidates, then `fetchpriority=high` on all of them is bad
news, too—when everything is high priority, nothing is.

And so my take is this: **when all you can do is all or nothing, _do nothing_.**

## Tools and Context

`loading=lazy` only helps if you apply it to things the user does not yet need,
but apply it to something needed immediately and you may have made the page
worse.

Similarly, `fetchpriority=high` only helps if you use it to identify one likely
winner among a field of contenders: apply it to all contenders and you have not
clarified anything, you’ve just added noise.

These are not magic <i>make it faster</i> attributes, they are hints, and hints
are only useful when they are specific and contextual.

## Dumb Design Systems

A design system (or any system, really) should never try to know more than it
really does. Imagine a reusable card component:

```html
<article class=c-card>
  <img src=/img/promo.jpg
       alt="Promotional image"
       width=640
       height=360
       loading=lazy>

  <h2>Spring Collection</h2>
  <p>Discover the latest arrivals.</p>
</article>
```

If this component always lived in a product grid halfway down the page, sure,
lazy-load it. But if CMS users can also use it:

* as a hero/LCP candidate;
* as the first component below the masthead;
* in a two-up where one card is above the fold and the other beneath;
* or in a genuinely off-screen position;

…then the design system doesn’t have the right to guess.

In that world, this version is safer:

```html
<article class=c-card>
  <img src=/img/promo.jpg
       alt="Promotional image"
       width=640
       height=360>

  <h2>Spring Collection</h2>
  <p>Discover the latest arrivals.</p>
</article>
```

In other words, I would recommend you leave the browser to handle it.

That might mean you load a handful of below-the-fold images a little earlier
than ideal, and that’s fine. I would certainly rather this be the baseline than
potentially inadvertently lazily loading content that doesn’t need it.

<small>As a brief but important side note: `loading=lazy` does not necessarily
mean <i>below the fold</i>.</small>

<small>There are plenty of perfectly reasonable above-the-fold use cases for
`loading=lazy`:</small>

* <small>the second image onward in a carousel;</small>
* <small>thumbnail images in a larger image gallery;</small>
* <small>assets hidden in a hamburger or flyout menu;</small>
* <small>imagery that is present in the DOM but not meaningfully useful until
  some JS has initialised the relevant UI.</small>

<small>Those are all cases where an image may be in or near the initial viewport
but still not needed _yet_.</small>

<small>That is the distinction I care about: not strictly below the fold, but
not immediately necessary.</small>

## `fetchpriority=high`

The same thinking carries through to `fetchpriority`. Consider a larger media
component:

```html
<img src=/img/campaign.jpg
     alt="Campaign image"
     width=1200
     height=675
     fetchpriority=high>
```

If you know this is _the_ LCP candidate, then that is a sensible hint! But if
the CMS allows three of these near the top of the page, then you end up with:

```html
<img src=/img/hero-1.jpg fetchpriority=high alt="" width=1200 height=675>
<img src=/img/hero-2.jpg fetchpriority=high alt="" width=1200 height=675>
<img src=/img/hero-3.jpg fetchpriority=high alt="" width=1200 height=675>
```

At that point, you are no longer really prioritising anything. The browser is
already trying to work out which requests matter most. If your design system or
CMS cannot confidently identify one winner, it shouldn’t flood the network
claiming that several things are equally urgent. **When everything is high
priority, nothing is.**

## The Browser Default Is Not Failure

Doing nothing here is not negligent, but normal. We didn’t even have these
primitives a few years ago. Omitting them is not some devolution; it is just
falling back to the norm. The browser discovers images, requests them, and
prioritises them as best it can. In ambiguous systems, that is often the most
honest and least harmful baseline. Put another way…

Given three options, and the first is taken away from you, would you rather:

1. <s>do the right thing,</s>
2. do the wrong thing, or
3. do nothing?

I think we’d all opt for the latter. Doing nothing is better than doing the
wrong thing. This leads me nicely on to…

## Missed Opportunities Are Safer Than Bad Optimisations

If I fail to lazy-load an image that turns out not to be needed immediately,
I have left a little performance gain on the table,  but if I lazy-load an LCP
candidate, I have actively made the page worse. Without lazy loading, the worst
case scenario is that the browser puts the request(s) out to the network
a little eagerly, but it will fall back to other heuristics to prioritise from
there.

Likewise, if I omit `fetchpriority=high` from a hero image, perhaps the browser
takes a fraction longer to realise its importance, but if I add
`fetchpriority=high` to every possible hero, I have turned a useful hint into
noise. Without `fetchpriority=high`, the worst case scenario is that the browser
puts the request(s) out to the network a little slowly, but **it will fall back
to other heuristics to prioritise from there**.

Both scenarios have great safety nets.

## Use Hints Where You Have Certainty

Naturally, this is not an argument against either hint. If your design system
really _does_ know that:

* article-body images after paragraph three are below the fold;
* the homepage hero is always first, or;
* carousel slides after the first are off-screen;

…then use them! If you have enough context to be precise, be precise. But if you
do not, don’t risk it.

## Do Nothing, Deliberately

Sometimes, at design system level, the least clever option is the safest. If all
you can do is lazy-load everything or lazy-load nothing, choose nothing; if all
you can do is mark several possible winners as high priority, choose none.

And I don’t mean forever, I mean until your system has the knowledge to do more.
If or when you can communicate more to the front end, err on the side of caution
and do nothing at all.

When all you can do is all or nothing, **do nothing**.
