---
comments: true
date: 2011-03-01 09:43:26
layout: post
slug: problems-with-the-sans-serif-hack
title: Problems with the sans-serif hack
wordpress_id: 2605
categories:
- Web Development
tag:
- CSS
- Typography
---

Chris Coyier’s [sans-serif hack article](http://css-tricks.com/sans-serif/) has been doing its rounds lately, however it isn’t without its drawbacks... and it _is_ a hack.

For those who aren’t familiar with it, the trick is to specify `font-family:sans-serif;` as opposed to a detailed font stack in order to serve Helvetica to a Mac and Arial to a PC. Helvetica doesn’t look too great as body copy on a PC, and using Arial on a Mac where you could be using Helvetica seems daft, so enter the sans-serif hack; each OS gets its default.

However there are problems.

1. What if the user has changed their system’s default sans?
2. There are more platforms than Mac and PC...

The chances of a user altering their default sans is admittedly pretty slim, but it could certainly be a possibility. And who’s to say that the OS vendors themselves won’t change the default sans? What if the next Windows release starts using Calibri as its default? Then you’re serving Helvetica on a Mac, Calibri on Windows 8 and Arial on Windows 7 and under. This is speculation, but worth bearing in mind.

The second issue lies with the fact that it assumes everyone has either a PC or a Mac... according to [this forum entry](http://ubuntuforums.org/showthread.php?t=1675235) the default sans on Ubuntu is _DejaVu Sans_. I have no definite confirmation of this so if anyone has a definite answer please let me know. A number of people have told me the latest sans on Unbuntu is, well _Ubuntu_.

The hack itself is kinda useful, and I’ve used it myself. I actually write about it in an upcoming article I’ve written for Smashing Magazine where I _do_ actually elaborate on the drawbacks.

Furthermore, I have actually used this hack myself before. It’s not the worst hack in the world, but it’s vital to understand that it _is a hack_, and what its implications are.

It’s a shame that Chris didn’t outline these himself in his article, but several readers have left comments to this effect.

Don’t just use code out-of-the-box, look at its flaws and understand them fully before putting anything into practice.

## Addendum

Okay so one or two people have said that this isn’t a hack. In _this context_ it is, and here’s why...

It exploits a behaviour that we cannot be certain of. That’s what hacks do… You’re using code that will only work on hope and chance to serve a specific font. You’re exploiting an inexplicit feature (standard fonts) to achieve an explicit effect. The motivation behind serving up a specific font based on chance and hope is nothing **but** a hack, and hacks are bad…

In the context of saying ‘Hey, I really don’t mind what font this site uses, the users’ preference will do just fine’ then this isn’t a hack, _you know what the outcome will be_, you _want_ the default. If you’re hoping that that default will be Helvetica or Arial, then you can’t be certain. You’re leveraging a _possibility_. You’re using a hack.

### Update

[Paul Annett](http://twitter.com/nicepaul) just shared [an interesting article with me along similar lines](http://blog.mhurrell.co.uk/post/2946358183/updating-the-helvetica-font-stack).
