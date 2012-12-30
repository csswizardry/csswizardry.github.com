---
comments: true
date: 2011-12-11 12:15:26
layout: post
slug: on-html-and-css-best-practices
title: On HTML and CSS best practices
wordpress_id: 3457
categories:
- Web Development
tag:
- CSS
- HTML
---

Best practices are exactly that; _best_. Not ‘better’, not ‘good when…’ or ‘best if…’, just best. They’re always the best, no matter what.

This is something I learned whilst undertaking the single biggest project of my career so far; the complete (and not-yet-live) rebuild of one of BSkyB’s most trafficked websites. For years I’d been working on medium-sized projects where I strove to use as few classes as possible, my CSS was so elegant and hand-crafted and everything used the cascade. I thought it was beautiful.

I found my old approach isn’t best practice when working on a big site, therefore it’s not best practice at all… You can scale down the big site mentality to smaller builds, you can’t scale up small site mentality to bigger ones. With this in mind, how you’d build bigger sites is best practice, how you tend to build smaller sites is _typically_ (though, as ever, not always) based on fallacy and myth.

I recently rebuilt my friend [Sam’s design portfolio site](http://sampenrose.co.uk/). Typically I’d have used IDs everywhere, not used any OO and not really paid much attention to the length or efficiency of my CSS selectors. This would have worked but only because the site is small. Any attempts by Sam to scale the site up, add pages, move components or alter the layout would have been hampered by these methods. Instead I decided to apply big-site mentality and dropped any IDs, used an OO approach and made sure every component is reusable. [The resulting code](https://github.com/csswizardry/sampenrose.co.uk) is incredibly flexible, very efficient and still looks nice.

* OOCSS is _always_ best practice.
* DRY is _always_ best practice.
* Efficiency is _always_ best practice.
* Maintainability is _always_ best practice.
* Flexibility is _always_ best practice.

It doesn’t matter if you’re building the next Facebook or if it’s just a site for the builder down the road; best practice is always best. You might not notice an inefficient selector on a small site, but it doesn’t mean that it’s not still inefficient. Just because you don’t notice something it doesn’t mean it’s not still happening.

Build every site like it’s a 1000 page behemoth because then it can scale; it may never need to, but it _can_. Building every site like it’s a piece of art, using convoluted selectors and rigid, ID ridden code, it can never scale, even if you want it to.

Your code might look like the [Sistine Chapel](http://en.wikipedia.org/wiki/Sistine_Chapel), but if it’s a chore to maintain, or you find you can’t pick up a component and drop it anywhere with zero worry, then it’s not powerful. Code is about power before prettiness. You might feel dirty at first, but when you realise how nicely things fall into place using proper best practices you’ll see the benefits.

The only person who cares how pretty your code is is you. Your users want fast UIs, your clients want reliable builds and you and your team want code that is easy to maintain 6 months and a dozen client mind-changes down the line.

**Best always means best, it has no caveats or conditions.**

## Further reading

* [Our Best Practices are Killing Us](http://www.lukew.com/ff/entry.asp?1379) by Nicole Sullivan
* [OOCSS.org](http://oocss.org/)
