---
comments: true
date: 2011-11-05 16:03:54
layout: post
slug: build-along-1-reflection-and-reasoning
title: 'Build-along #1, reflection and reasoning'
wordpress_id: 3355
categories:
- Web Development
tag:
- Build-along
- CSS
- Front-end architecture
- HTML
- OOCSS
- Progressive Enhancement
- Responsive web design
---

Here are, in no particular order, just a few thoughts about [the build-along](http://csswizardry.com/2011/11/css-wizardry-build-along-1/) I did last night. These thoughts cover the thinking and reasoning behind the decisions I made. The build-along was a single, small PSD, but the following should apply to builds of any size. Get into the habit of doing the following on tiny sites and you’ll be well equipped to build that next Facebook meets YouTube with a dash of LinkedIn that that prospective client just emailed you about...

Here is [the final build](http://dl.dropbox.com/u/2629908/build-along/index.html) and its code is on [GitHub](https://github.com/csswizardry/build-along-1).

## HTML first

I built this HTML-first. No CSS other than the UA’s _whatsoever_. No images, no styles, no JS, no classes, no containers, nothing. I started with pure text-level and content semantics. No `div`s, no `span`s, nothing that would in any way aid styling. Nail your pure, raw HTML first before even _thinking_ about CSS. This ensures you’re thinking fully about the most important aspect of any site; its content.

## No IDs

The build uses no IDs for styling. This was quite an odd shift for me to make, and I made it [a number of weeks back](http://csswizardry.com/2011/09/when-using-ids-can-be-a-pain-in-the-class/). The main drawback of using IDs is that they introduce a specificity wild card not unlike using `!important` (though obviously not as horrible). By not using them it means that I can’t really get tripped up by overly specific selectors as easily as I could if I _was_ using IDs. I’ve not removed the chance completely, but really easily and quickly lessened it.

## ‘Ugly’ classes to do lots of heavy lifting

There are quite a few classes that some might deem ugly; the media and grid classes instantly spring to mind. The thing here is that **classes aren’t semantic or insemantic**, they’re merely sensible or insensible. If a `div` is 6 columns wide then a class of `.grid-6` is totally sensible, if it needs to change then change it. If you ever redesign you’ll be touching the markup anyway; I’m convinced the pure CSS redesign (in a commercial world) is a myth.

These classes also bring performance benefits, once a class gets called once it becomes free to use again; a performance freebie. If you use `grid-6` once on a page, every subsequent usage is totally free, from a performance point of view.

## Portable sprite icons

The `.s` class is a theoretically horrible class, but as we outlined above, nothing (except micro-formats and similar) reads or even cares what you name your classes. [You can name a class anything you wish and a browser has to honour it](http://jsfiddle.net/csswizardry/YdhEU/), just pick wisely!

So, the `.s` class is one good example. Whenever you want to use an icon background image you ideally want to sprite it, but in fluid elements this isn’t possible. Enter a _spriting element_.

This is just an empty element that gets the sprite applied to it in its own fixed width/height box.

Chris Coyier uses [pseudo elements for this](http://css-tricks.com/13224-pseudo-spriting/) which is great as it’s really clean, but the major drawback for me here is that they’re not very portable. A pseudo element is tied explicitly to an element in the CSS, so you can’t just drop the icon wherever you wish. Using an empty element means you _can_ drop an icon wherever you wish. It’s six-of-one and half-a-dozen of the other; cleanliness versus portability; pick which one you’d rather have.

I can imagine that 75% reading this still think it’s a horrible, but we need to remember that an empty element affects _nothing_. It’s empty so it has no content, if it has no content then screen readers don’t encounter anything in it.

You’re probably also thinking that it’s heavily presentational, but there’s really no difference between:

    <i class="s  star"></i>

And:

    <img src=star.png alt="">

The first is just out-and-out better in that it allows you to sprite that image up!

I was asked why an `i` and not a `span`. I’m almost ashamed of the answer but it’s purely because `i` is shorter, it’s as simple as that. I know that a `span` is probably better suited as it’s devoid of semantics but as there’s no content in the `i` nothing is affected by semantics anyway. Feel free to use whatever element you prefer though, like I said, my reasoning is kind of shameful!

## Mobile first, lay the foundations

I did this build mobile first, sort out the content, the type, the general _feel_ of the site first, then used `min-width` media queries to build **up** the desktop version.

Incidentally I don’t use [respond.js](https://github.com/scottjehl/Respond) or similar to get media queries working in IE et al, they get the mobile version. The layout of the site is not that important because **a PSD is a clue, not a contract**. A PSD tells you how a site should generally appear; the type, the colours, any brand treatments, that kind of stuff.

If you spend enough time on the mobile version that should be good enough to serve as the baseline, anything on top is a bonus for browsers that support media queries.

## Grid systems just make life easier

In a similar vein to the above, grid systems are typically frowned upon as being insemantic, but the joy is that, as we covered, classes are neither semantic or in semantic. Plus--even better than that--a `div` is devoid of any semantics, it’s a generic container element. Adding these to your markup comes free-of-charge. Using a grid system allows developers to quickly construct consistent, robust and efficient layouts in seconds. 

## ‘Extraneous’ `div`s actually make builds far more robust and extensible

You should _never_ add markup where avoidable, but that doesn’t mean you should avoid it at all costs. Sometimes adding an extra `div` will make components a lot less brittle, rather than relying on unpredictable style rules and overly slim markup, sometimes it’s just far better to add another `div` to ensure a more robust build.

Take for example [the media object](http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/). You could probably build that construct using far less HTML, but then would it be as extensible? You could just assume there will only ever be an `img` floated left with a `p` to the right of it, but if you do that and a client asks for a list with that `p` and a caption under the `img` you’re in a bit of a pickle; if you just start out with a `div` on each side to start with then you have the ability to build whatever the client throws at you, and it will always be predictable.

So, add extra markup where it saves you headaches. I’m more impressed by powerful and extensible code than I am with lean and brittle solutions, and I can guarantee which the client will prefer...

## Don’t measure stuff

Throughout this build I only measured one thing; the grid system. I honestly think that, in web design, the pixel’s days are numbered. Build everything without a care as to its dimensions. Everything in the build can be moved around and dropped anywhere else without you needing to worry if it’ll fit. All your components should always be fully fluid and only constrained by their parent, in this case the grid system.

Here’s a challenge, next time your designer sends you a PSD designed on, say, the [960GS](http://960.gs), resize your browser to 800px wide and build it like that. That’ll really put your fluid, responsive skills to the test!

## Be resourceful

During this build I copied and pasted _loads_ of code. I used [my vanilla boilerplate](https://github.com/csswizardry/vanilla), I copied and pasted [the media object](http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/), [the nav abstraction](csswizardry.com/2011/09/the-nav-abstraction/), [the carousel](csswizardry.com/2011/10/fully-fluid-responsive-css-carousel/). If it already exists somewhere then reuse it! There are no prizes for writing more lines of code; be resourceful.

## Take away?

Even on tiny sites, powerful markup is far more quick, robust, extensible and sensible than convoluted, brittle stuff. No one reads your classes except other developers. Users appreciate fast UIs, clients appreciate stable and robust sites and you, the developer, like to save time, be efficient and only solve problems once.

What may at first seem like an ugly class or bloated markup is actually a really quick, predictable and reusable construct.

Websites make us money, so let’s make them as quickly as possible and in the most predictable, future proof way we can.

## Finally

There is a video of the build to go with this, but I need your opinions, do you want the full, several hour epic or do you want it sped up to, say, double speed? I’m going to get that processed as soon as possible.

## Update
As promised, I recorded the whole thing warts and all. You might be interested to know a few things non-code related about the build-along.

* The whole lot was done on an 11″ MacBook Air with no external mouse or keyboard.
* My good friend Jake, who is wanting to learn a little about web development, was next to me the whole time.
* I cooked and ate my (now famous (in tiny, tiny circles)) chili during the build-along.
* Refreshment was courtesy of [Matusalem and Fentimans](http://twitpic.com/78e9yd).
* The songs you saw on my Spotify are not necessarily wholly representative of my taste in music ;)

The normal, non-sped-up recording is now on YouTube. [Part 1](http://www.youtube.com/watch?v=dH-KgnepMUw&hd=1), [Part 2](http://www.youtube.com/watch?v=9NToqlCJzfQ&hd=1). The sped-up version is proving a little more troublesome; crunching over 4 hours of video on an 11″ Air is taking a while...

### Sped-up video

To view the faster video right away, simply opt in to [YouTube’s HTML5 Trial](http://www.youtube.com/html5), open the YouTube URLs above in Chrome and then select the playback speed options that now appear on the player.
