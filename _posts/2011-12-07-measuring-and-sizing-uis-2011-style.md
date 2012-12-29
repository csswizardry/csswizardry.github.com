---
comments: true
date: 2011-12-07 13:10:21
layout: post
slug: measuring-and-sizing-uis-2011-style
title: Measuring and sizing UIs, 2011-style (and beyond)
wordpress_id: 3420
categories:
- Web Development
tag:
- CSS
- Sizing
- Typography
- Units
---

For years we used pixels to lay out web pages. Then, not so long ago, we were dabbling with ems to make our pages _elastic_. Now, in 2011, most of us are adopting a responsive approach and using fluid grids and percentages.

These methods seem to have all happened sequentially, with us each time dropping the last. I’ve decided, though, that the best builds use aspects of all previous methods; fixed, elastic and fluid.

## Using percentages…

Let’s forget responsive design for a second. Responsive design is a three-tiered approach but here we’re only interested in fluid layouts (N.B. not even necessarily fluid grids). A fluid layout, as you all know, is one that is size-agnostic; it acts like a liquid, occupying a constant percentage of a varying space.

Now, fluid grids are a little tricky as they’re based around full grid systems. Luckily I’ve created a simple [fluid grid calculator](http://csswizardry.com/fluid-grids/) to work these behemoths out, but in more simple terms it’s remarkably easy to set a fluid layout even if that was never the intention.

If your designer sends you a two-column design then all you need to do is work out **not** how big the respective columns are, but instead work out _how much bigger one is than the other_. That is to say; stop thinking ‘this content area is 600px and the sidebar is 300px’ and _start_ thinking ‘this content area is twice as big as the sidebar’. Percentages work well whether you’re going responsive or not!

Design is about proportions, not absolutes, and in ignoring actual pixel measurements in favour of relative ones you can ensure that designs are not tethered to numbers, but to proportions.

So the next PSD you get sent that is not meant to be responsive, just try this method out and at least make it fluid. If your sidebar is 220px wide and your content area is 640px then take that as meaning ‘the content area is 2.909 times bigger than the sidebar’.

### …or using nothing at all

Even better than using percentages is to use no measurement at all. All components you build (navs, tables, figures, thumbnail galleries, banners, you name it) should never have widths (and never _ever_ have heights) applied to them. They should be constrained only by their parents.

An element without measurements is inherently fluid, but in the best possible way; _it will work wherever you put it_. Ironically, the most important takeaway from this--an article about setting measurements--is simply ‘don’t’. Every time you can avoid setting a measurement, you should.

## Using ems

Ems are an old favourite. They’re great for setting type, and with ems it’s _all_ about the type.

As I outline in the next section, I don’t actually set font-sizes in ems; I use rems which is essentially _ems-with-benefits_. What I do set in ems is things _to do with_ type; `margin-bottom`s on paragraphs, lists, headings and the like; paddings on buttons, nav links and promos and other such measurements; borders on promos etc.

What this does is ensure that the ‘feel’ of the design is maintained no matter how far a user wishes to scale their text.

Let’s take an example. A designer has made a PSD with a nav in it. The nav links are blocks with a font-size of 12px (0.75em) and a padding of 5px, [thus](http://jsfiddle.net/csswizardry/NZLwc/).

Now, as I stated previously, a lot of design isn’t about numbers, it’s about _proportions_. It’s not about 12px and 5px looking best here, it’s about _a link looks best when its padding is just under half its own font-size_.

It can be a confusing way of looking at things at first, but once you realise that the 12 and 5 are actually totally irrelevant here and that it’s about their _relation_ to one another, you should soon get the hang of things.

Let’s assume the user doubles their font-size, now you have a link that is 24px in size but still has a padding of 5px. That’s going to look very cramped. This is why we need to set paddings on text in ems, so that they track the font-size. In this case 5px as an em unit of 12px is 0.417, so now [our code looks like this](http://jsfiddle.net/csswizardry/NZLwc/2/). Try scaling up these two examples up and see how the second looks a lot nicer when the padding scales too.

So, whenever you are setting a measurement because it looks good when set against nearby type (think borders, paddings, margins etc) try and forget the absolutes and begin thinking ‘this padding needs to be just under half of whatever the font-size needs to be’.

Not convinced that users scale their text all that much? Well I have no data but I love [this thought provoking analogy](https://twitter.com/5minuteargument/status/134682811683717121) from [@5minuteargument](https://twitter.com/5minuteargument/):

> I’m going to start using TV volume as a CSS font analogy: not everyone is listening to your programme at the same volume…

**Please note that when I refer to scaling I don’t mean the browser’s Ctrl+[+/-] scaling/zooming, I mean a user stylesheet or design alteration that changes the base font-size of the document.**

### Line-heights

There are several ways of setting line-heights. A general rule of thumb is to never set them in pixels as this, as discussed above, won’t track your font-size. In this case you’d set them in ems or percentages, so that you never end up with ‘a font-size of 12px and a line height of 18px’, you’d get ‘text whose line-height is 1.5 times its font-size’.

However, even better than using ems, you just set them unitless. Work out the em value, but drop the em _from_ the value, so `line-height:1.5em;` would just be `line-height:1.5;`. Eric Meyer explains this nicely [over on his site](http://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/).

To work out unitless line-heights is simple. Use the following equation: the line-height I want ÷ the font-size I have. Want a 20px heading to have a 30px line-height? 30 ÷ 20 = 1.5. A 12px button to have a 24px line-height? 24 ÷ 12 = 2.

## Using rems

Despite [my initial thoughts](http://csswizardry.com/2011/05/font-sizing-with-rem-could-be-avoided/), I have now started setting type in rems (with a pixel fallback).

This gives us two things, firstly we have what I call ‘progressive accessibility’ in that it brings the accessibility benefits of ems but only in more advanced browsers.

Secondly, and more importantly, it gives us the confidence of pixels plus the scaling properties of ems. This is ridiculously cool. What this means is that we avoid the annoying compounding issues that ems can give us (a `small` in a smaller-than-body-copy promo springs to mind) but we can also keep their feature of scalability; we can alter the (font-)size of an entire document based on a parent rather than having to redeclare each individual elements’ font-size over and over. It really is the best of both worlds.

Take [this example](http://jsfiddle.net/csswizardry/6CEjX/). Try changing the `html`’s font-size to 2em, does the page scale up as a whole? Nope. [Try this one](http://jsfiddle.net/csswizardry/6CEjX/1/). See how just changing the `html` element’s font-size will make your entire page act accordingly. This is something that pixels can’t give us...

Interestingly, [I also set `margin-bottom` in rems](https://github.com/csswizardry/hry.rbrts.me/blob/master/css/style.css#LC152) so as to always maintain a consistent vertical rhythm around my [magic number](http://coding.smashingmagazine.com/2011/03/14/technical-web-typography-guidelines-and-techniques/#tt-magic-number).

## Using pixels

I’ve said before today that the pixel’s day is numbered in the web design world. Most of my work involves ems, rems, percentages or nothing at all. The only time I ever really use pixels is if I have a known and fixed dimension to work to; nearly all the time this is images and icons.

Most pixel based measurements pertain to laying out fixed-size images like avatars or sprited elements who require fixed-size background images applying to them. Nearly everything else is best suited to proportional sizing with ems or to non-sizing with just being left fully fluid.

There really isn’t much work left for the old pixel in 2011.

## An example

A fairly decent pre-existing example of the techniques discussed would be my [hry.rbrts.me](http://hry.rbrts.me/) hub-site.

If you open that page and fire up your inspector you should see that:

<dl>
  <dt>Percentages</dt>
  <dd>The `body` and `article`s all have their structure set in percentages.</dd>

  <dt>Nothing
  <dd>The social icons _component_ is free of dimensions, it’s fully fluid and will always occupy its parent, wherever you put it.</dd>

  <dt>Ems</dt>
  <dd>The indentations of `ul`s, `ol`s and `dd`s are all set in ems so that they will scale with the lists’ font-size. The gaps between sections are also set in ems so that if the font-size ever increases, so will the space around sections of text.</dd>

  <dt>Line-heights</dt>
  <dd>These are all set unitlessly (except the tagline which needs to line up with the logo).</dd>

  <dt>Rems</dt>
  <dd>Type styles are all set in rems to allow us scaling with control.</dd>

  <dt>Pixels</dt>
  <dd>Only the social media icons and the logo, which are fixed in size before we even start thinking about CSS, are set in pixels.</dd>
</dl>


If you’d prefer, you can poke through the nicely formatted and commented CSS [on GitHub](https://github.com/csswizardry/hry.rbrts.me/blob/master/css/style.css).

## Key points

The key things to take away from this article are:

* **Set structure in percentages.** This includes content areas, sidebars etc.
* **Set type in rems** with a pixel fallback for older browsers. This gives us a great amount of control with added scalability.
* **Set type-_related_ items in ems** so that paddings et al scale with the font-size.
* **Set line-heights in relative units.** Or, even better, with no units at all.
* **Don’t set measurements on components at all.** They should remain fully fluid and ‘just work’ wherever you drop them.

So there are a few tips and guidelines on sizing UIs and designs in 2011. We have a whole host of brilliant methods at our disposal and we can just cherry-pick them whatever they’re best suited to.
