---
comments: true
date: 2011-01-31 12:42:58
layout: post
slug: forget-responsive-web-design
title: Forget responsive web design…
wordpress_id: 2359
categories:
- Web Development
tag:
- CSS
- HTML
---

…you need _adaptive_ web design.

**I now completely disagree with nigh-on all of the below. I’ve decided to leave
this post for posterity, but I no longer stand by it.**

The web has been abuzz recently over the advent of responsive web design. Pioneered mostly by [Ethan Marcotte](http://www.alistapart.com/articles/responsive-web-design/), the concept is fantastic. It truly is great and has changed how a lot of projects and builds take shape. Things don’t get much more efficient than a write-once view-many approach, and with the sharp rise in mobile and tablet devices it is proving very popular.

It is however, like most things, not without its downsides. [This article](http://www.cloudfour.com/css-media-query-for-mobile-is-fools-gold/) by [Jason Grigsby](http://twitter.com/grigs) outlines some pretty valid points and [this one](http://www.uxmag.com/design/is-multiscreen-enough-why-write-once-shouldnt-be-the-goal) by [Kevin Suttle](http://twitter.com/kevinsuttle) offers a very interesting insight into some problems with the build-once mentality.

My problem lies a little more closely to home, though. The theory and concept of responsive web design is great but I think there are two problems with its fundamentals:

  1. The name.
  2. The work that the name implies and leads to.

I much prefer the name _adaptive web design_. A website should not respond to changing surroundings, it should _adapt to them once they’ve changed_.

This difference is pretty subtle but very important. Responsive web design changes as the viewport does, adaptive changes once the viewport _has_.

The problem with calling it responsive web design is that by its very nature it implies that it offers feedback (or a response) to a user’s actions.

Responsive web design tends to use fluid layouts to cater for any possible resolution. Adaptive caters for a predefined but **sensible** array. If we consider possible resolutions we could come up with:

  * **Desktop** – 1024px and above (current industry standard)
  * **Legacy desktop** – 800x600px
  * **Tablet** – 768px on the iPad
  * **Mobile** – 480px on the iPhone

The benefit of knowing these presets (and any more that you might choose) is that you don’t need to rely on fluidity (which is generally harder to build); you can also make better use of grids like the 960GS (which offers 700px that will cater for both iPad and 800x600); you don’t need to worry about unsightly, overly-long measures (line-length) on larger resolutions in fluid designs; and finally, you generally just have better control over what you’re displaying when you have metered constraints.

Furthermore for me is the work involved in creating a layout that will accommodate someone who is browsing at a resolution of, say, 913px. Why spend time catering for such arbitrary resolutions? When I build I cater for desktop **and** tablet **and** mobile, but nowhere in between; you can’t be everything to everyone all the time, so why try?

Adaptive web design for me is a far better name and methodology than responsive design. Responsive implies, suggests and relies upon a site responding to changes as they happen. This to me is more work than is necessary. I much prefer working to adaptive web design--letting a website adapt to metered changes once they’ve happened--making my life a whole lot easier than building fluid layouts that will cater for anyone and everyone. If someone is browsing at a ‘non-standard’ resolution, I didn’t ought to have to go out of my way to support it. I choose a sensible preset of resolutions and work to that.

We didn’t have responsive web design a couple of years ago and we got by fine then. Don’t make extra work for yourselves just because you can…

I guess what it mainly boils down to is the name. Responsive just isn’t the right word for me unless you _are_ making a truly responsive site that _will_ cater any resolution possible; but then if you are doing that then I’d dare say that that’s not such a great idea from both a time and effort point of view…

That said, responsive web design _is_ a great tool whether you’re using either method. I _do_ think that adaptive is more sensible than responsive, but I’d never frown upon the latter. Any step toward more efficient and accessible builds is a win in my eyes. We just need to make sure we don’t lose sight of the goal--making money. Web design is a business, and wasting time is bad business…

## Update:

[Paul Gordon](http://twitter.com/pgdev) shares much [the same opinion](http://pgdev.posterous.com/adaptive-or-responsive-design), but beat me to the _publish_ button by a week or so…
