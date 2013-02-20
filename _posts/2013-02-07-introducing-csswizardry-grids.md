---
comments: true
date: 2013-02-07 00:22:02
layout: post
slug: introducing-csswizardry-grids
title: Introducing csswizardry-grids
categories:
- Web Development
tag:
meta: A responsive, fluid, nestable, Sass-based grid system.
branch-id: 4m2oWizUnII
branch-url: http://branch.com/b/introducing-csswizardry-grids
---

Yesterday I wrote <cite>[Responsive grid systems; a solution?](http://csswizardry.com/2013/02/responsive-grid-systems-a-solution/)</cite>,
all about the principles behind creating the fluid grid system in
[inuit.css](http://inuitcss.com). That post deals with the thoughts, reasonings
and theory behind how such a grid system works. _This_ post is
[csswizardry-grids](http://git.io/csswizardry-grids)’ elevator pitch:

> csswizardry-grids is a simple, fluid, nestable, flexible, Sass-based, responsive
> grid system. It allows you to rapidly construct fully responsive websites whilst
> abstracting all the layout information away from your components, as all good
> grid systems should.

* [csswizardry-grids source on GitHub](http://git.io/csswizardry-grids)
* [Basic demo](http://csswizardry.github.com/csswizardry-grids)

<small>**N.B.** I am a huge proponent of the extra `div`s style grid systems which keep
your page’s layout and content totally separated. To find out more as to why, I
recommend watching my [Breaking Good Habits](http://vimeo.com/44773888?t=20m25s)
talk from Front-Trends, 2012.</small>

csswizardry-grids allows you to configure your gutters and your own breakpoints
to cater to layouts for palm-based, lap-based, portable and stationary devices.
It works on the principle of percentages, rather than absolute columns, meaning
that there are no confusing `.span-6` classes that behave like `.span-12` ones
at smaller sizes.

The grids are also fully (infinitely) nestable, meaning you can apply sizing to
your sub-components as well as to your page-level layout. Furthermore,
csswizardry-grids’ implementation is left entirely up to you, with two options:

1. **To use ‘solid’ classes** which are basically just traditional CSS classes
   like `.one-half`. These need applying directly in your markup, e.g.:
   `<div class="grid__item  one-whole  desk-one-half">`.
2. **To use Sass’ silent classes** which means that the classes sit ‘invisibly’
   in your Sass and never get compiled to CSS until they are actually,
   explicitly used. You can turn this on via the `$use-silent-classes` variable.

Implementing silent classes means that your markup would now be something like:

    <div class="content">

And your CSS:

    .content{
        @extend %grid__item;
        @extend %one-whole;
        @extend %desk-one-half;
    }

Each method has its merits, and it is left entirely to you to decide which you’d
prefer to use.

---

So there you have [csswizardry-grids](http://git.io/csswizardry-grids), a
micro-library for creating fully responsive layouts from breakpoints of your
choosing.
