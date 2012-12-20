---
comments: true
date: 2012-10-16 21:04:21
layout: post
slug: a-classless-class-on-using-more-classes-in-your-html
title: A classless class—on using more classes in your HTML
wordpress_id: 3849
categories:
- Web Development
meta: An analogy to explain why it <em>is</em> a good idea to use more classes.
---

This article is a pretty basic one, but it’s aimed at developers struggling to shake the idea that classes in your HTML are somehow a bad thing. Quite often, developers new to OOCSS find it hard to transition from adding no classes to anything to adding as many as you need (i.e. a lot more than you were).

Imagine a classroom full of children with no names. In order to organise and refer to them the teacher has a system; the guy two rows from the back, the kid next to the girl next to the kid under the light, the girl near the window, the first guy sat in the carpeted area…

Her seating plan reads like a board game. As soon as the guy next to the window swaps places with the girl next to the radiator then she has to remember that it’s now the guy near the window, and that the girl near the guy near the window is now near the _girl_ near the window.

As soon as anything moves or changes she has to do a lot of rethinking and making sure things still check out. If the guy near the door is now the guy under the AC unit then is that definitely the right girl next to the guy who used to be the _girl_ under the AC unit? Who knows?

This is obviously madness, but…

…this is how a lot of people are trying to write HTML.

This little analogy was born the other day when someone Tweeted:

> Struggling to switch to OOCSS. I’m not used to classing everything up, for so long it was all about super-clean HTML…

And I replied with:

> Imagine a teacher trying to control a class of kids who have no names. That’s how we used to write our HTML >.<

When things aren’t explicitly named, and we try and rely on coincidental and circumstantial situations to try and refer to and target them, we find ourselves in a real mess where things quickly become invalid or break/fail. Things are hard to manipulate and work with. We have to try and remember the dependencies our references have on our structure. Things are basically unstable and chaotic.

The above analogy sits _perfectly_ with the kind of HTML we often wrote, and the selectors we used to target it:

* **The guy two rows from the back** is like `nth-of-type(){}`
* **The kid next to the girl next to the kid under the light** can be likened to `el el + el{}`
* **The girl near the window**—`el + el{}`
* **The first guy sat in the carpeted area**—`el > el:first-of-type{}`

Things are much, _much_ easier to select when we explicitly name them. How much easier is it to say ‘Ben’ rather than ‘You near the stationery cupboard’? How much more easily can you swap James and Becky round when they have names, instead of saying ‘AC dude, swap with her next to her next to him near the sandpit’?

Loads more.

This is how we should start imagining our HTML. For the longest time we strove to keep our HTML free of classes, that meant that the only way of targeting things was through the convoluted selectors like I outlined above. I mean, no one really goes as far as to drop _all_ classes _entirely_ (there are a few notable exceptions), but the comparison still stands.

In a similar vein to my previous article, [Shoot to kill; CSS selector intent](http://csswizardry.com/2012/07/shoot-to-kill-css-selector-intent/), your selectors should be just as specific as an elements purpose/function. Don’t use `.header ul{}` if what you _really_ mean is `.site-nav{}`.

Of course, not everything needs a class, but going back to the classroom analogy the teacher might want to select a subset of people, perhaps all the girls. This you could liken to an element; boys, girls, teachers, janitors are all like types of element and these it often _does_ make sense to select on (all links need to be red, all `h1`s need to be a certain size etc). But what if you want to single out all milk-monitors or all people over 6 years old…? These subsets are explicit and reasoned, therefore the way you select them should be too. **Your selectors should be as explicit as your reason for wanting to select something.**

The long and short of this story is that it _is_ difficult to transition from the older (and frankly naïve) ways of working, but when you stop and think _why_ we name things you soon realise that it’s the only sensible way. Next time you’re building away stop and think of the kids with no names; only this time it’s not a classroom, it’s a website, and they’re not kids but components and elements and chunks of HTML. It just makes sense to give them nice explicit names, because the way you’d manage it otherwise is just daft…
