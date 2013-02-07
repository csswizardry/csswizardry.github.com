---
comments: true
date: 2013-02-06 21:41:22
layout: post
slug: responsive-grid-systems-a-solution
title: Responsive grid systems; a solution?
categories:
- Web Development
tag:
meta: A look at building a practical, robust,  flexible, usable responsive grid system.
branch-id: h0JFB-nqvjk
branch-url: http://branch.com/b/responsive-grid-systems-a-solution
---

Grid systems in responsive design are something of a hot topic; a lot of people
are trying to solve them but I don’t feel we’re there quite yet.

However! The solution I have devised for [inuit.css](http://inuitcss.com) – I
feel – is probably one of the best currently available. In this article I’m
going to cover how it works, and the principles behind it.

Before we dive into it, let’s outline some of the problems and requirements we
face with responsive grid systems:

* **Must have different traits at different sizes** because you need to be able
  to tell a column to be – for example – full-width on narrow devices and
  half-width on wider ones.
* **Must be fluid between breakpoints** because we need to cover all bases.
* **Must have enough control to decide which columns will transform and at which
  point** because a blanket rule of, say, ‘all half-width columns become
  full-width at XYZ breakpoint’ are no good; we might want to collapse some but
  leave others half-width.
* **Classes should ideally still make sense at all breakpoints** because
  `.span-6` doesn’t make sense when it’s transformed to behave like a `.span-12`
  on narrow screens.

The easy solution to the responsive grid problem might be to make a huge upfront
decision. For example, deciding that, at a certain device width, you are going
to make _all_ columns halve, and then at the narrowest width you want them _all_
to collapse into full-width columns.

This _might_ work, but is a huge design decision that will likely prove _very_
restrictive. You might not want _all_ your layout to linearise, but a grid
system like this would cause it to.

If you’re using Sass, it might be nice to do something like:

    .content{
        @extend .span-12;
        @media screen and (min-width:720px){
            @extend .span-6;
        }
        @media screen and (min-width:1200px){
            @extend .span-8;
        }
    }

But of course, you currently can’t `@extend` _out of_ a media query. Where does
that leave us?

## Taking stock

Sometimes I think we all need to slow down, sit back, look at what we’ve got,
and take stock of things. Take things way, _way_ back to basics and start again.

If we redefine our problem, and think on much more simple terms, then we’re
looking at this:

> I want elements to take on multiple different and conflicting forms at
> different points.

Basically, we want one thing (a grid column) to be several things (different
widths) at different states (breakpoints).

The easiest way to make one thing behave in multiple _different_ ways is,
simply, multiple style hooks (i.e. classes). To make one thing behave in a
variety of different (and opposing; remember, a grid cannot be full-width _and_
half-width at the same time) ways is to have a separate class for each of those
states.

Even with media queries, it is naive to think you can simply, consistently and
cleanly make an arbitrary array of things all behave completely differently.
**If you want a `div` to have three states then it’s somewhat naive to think you
can handle that nicely without three corresponding classes.**

We also have to think with some degree of pragmatism; one valiant but misguided
attitude a lot of developers seem to have is the desire to be all things to all
men. This is admirable, but often counter-intuitive and counter-productive. We
need to accept that – when faced with complex problems such as responsive grids
– we cannot be everything to everyone.

So, if we act pragmatically and take stock of our situation then we have a much
more defined baseline to start building on.

**Clean HTML purists, please stick with me!**

## Building the grid system

In order to combat our `.span-12` style of inappropriate classes, we need to
think about working with classes like `.one-whole`, `.three-fifths`,
`.five-twelfths` and so on. These mean that, instead of spanning <var>x</var>
columns, we are now telling a column to take up <var>x</var> percentage of the
available width.

What I do with [inuit.css](http://inuitcss.com) is abstract
[these widths](https://github.com/csswizardry/inuit.css/blob/master/inuit.css/generic/_widths.scss)
right out and away from the grid system entirely. This means that, although they
can be used on the grid system, they are not exclusive to it. The benefit of
this is that I could have, say, a photo that I wish to take up half the width of
my page: `<img src="foo.jpg" alt="" class="one-half">`. This would not
previously, _necessarily_, have been possible if they were tied into the grid
system too much.

This now means that [the grid architecture](https://github.com/csswizardry/inuit.css/blob/master/inuit.css/objects/_grids.scss)
itself is very slim, just some floats and some clearfixing, as well as some
gutter settings.

So, my structural grid stuff lives alone, and the widths merely lay on top of
this architecture to provide the sizing.

We still have the problem, however, that `.one-half` doesn’t make sense if I
want to make it a `.one-whole` at a certain breakpoint…

## Defining the breakpoints

The beauty of high-level page layout (i.e. a grid system) is that this is
something that _is_ based on device/screen/viewport size.

Grid systems are incredibly high-level scaffolding and page structure, so they
will likely only change in the shift between breakpoints (and often devices),
for example a layout might **typically** be linear for mobile (or smallest
screens), a little wider for tablet (smaller screens), wider still for desktop
(or wider screens).

Using [this diagram](https://a248.e.akamai.net/camo.github.com/25e9301f3467146dd759144c85e253bf410d2c12/687474703a2f2f7374617469632e6c756b65772e636f6d2f756e69666965645f6465766963655f64657369676e2e706e67)
from none other than [Luke Wroblewski](https://twitter.com/lukew) we can choose
our _layout-specific_ breakpoints as being:

* **Palm** for things that fit in our hands (like phones).
* **Lap** for devices that are not handheld, but ‘lap’ devices (like tablets).
* **Portable** for either of the above.
* **Desk** for stationary devices (like TVs, PCs etc).

If we accept this generalisation that means we can have multiple width classes
like `.one-half`, `.palm-one-half` that all live in media queries:

    /**
     * Palm-sized devices
     */
    @media screen and (min-width:[width of your choosing]){
        .palm-one-whole{
            width:100%;
        }
        ...
    }
    
    /**
     * Lap-sized devices
     */
    @media screen and (min-width:[width of your choosing]){
        .lap-one-whole{
            width:100%;
        }
        ...
    }

And so on…

Now we have a range of classes that only do certain things at certain sizes,
tied to our targeted device sizes:

    <div class="one-whole  lap-three-fifths  desk-one-half">

**N.B.** It is widely regarded (and rightly so) that you should not base media
queries on device sizes but on ‘what looks best’. This, for the most part, is
very true, but we need to think pragmatically. If we want a flexible, recyclable
and efficient grid system then we need these absolutes in place.

Because we _are_ writing a grid system to fire at fixed breakpoints it is
important to:

1. Make sure the values you use for your breakpoints aren’t based on actual
   devices (e.g. iPhone in portrait) but are based on numbers that work best.
2. Ensure that your grid remains fluid between breakpoints so that even if it
   doesn’t reformat, it will still resize.

This all comes back to needing to think pragmatically and not trying to be all
things to all people; if we want the ability to rapidly create pages with a
responsive grid system then we also have to accept that we need to use concrete
values.

## Lots of classes in the CSS

A problem you may have noticed is that we are now creating a whole new grid
system for each of our breakpoints. Now it’s no longer just `.one-whole`,
`.one-half`, `.one-quarter` etc, but one of those classes for _every_ media
query we have. Initially this seems like a lot, **but**…

This level of repetition will compress _incredibly_ well. We all know [we should
be gzipping our plain text assets anyway](http://csswizardry.com/2013/01/front-end-performance-for-web-designers-and-front-end-developers/#section:gzipping-and-minifying),
but it’s more important than ever with things like this. Gzip works best on
repeated strings, so the more repeated strings in your code then the better
compression ratio you will get. Although repetition in code is bad (usually more
maintenance, less efficient etc) it’s actually better in terms of compression.
Experimenting with the width classes covered in this blog post, I managed to
achieve a compression ratio of **81%**. This basically means that the compressed
size of the classes is actually less than one fifth its original size over the
wire. **Five breakpoints worth of classes actually compress to less than one
uncompressed one on its own.**

That all seemed pretty long winded but it’s an important point that needs
making; the flexibility a grid system gives us is worth the extra classes if
we’re compressing our CSS.

## Implementation

Now we’re at a point where we can start building things! We can construct
responsive layouts like:

    <div class="content  one-whole  desk-three-quarters">
        ...
    </div>
    <div class="sub-content  one-whole  desk-one-quarter">
        ...
    </div>

That’s a very timid example, but you can see how extensible, flexible and
reusable that is. It also allows for _incredibly_ quick development, both prototyping _and_ production.

## Recap

So, to let that all sink in, let’s go over what we’re doing…

* We have a series of breakpoints for our device classifications (palm, desk
  etc).
* Each breakpoint’s media query contains its corresponding width classes (e.g.
  `.desk-one-tenth`, `.palm-two-thirds` etc).
* We have the ability to use those classes in our HTML knowing that they only
  ever work in their respective media query range.

## Lots of classes in the HTML?

A lot of people cringe at the thought of so many classes in their HTML, but get
this…

**Although we can’t `@extend` out of media queries, we can `@extend` into them!**

That means that instead of having:

    <div class="content  one-whole  desk-three-quarters">

You could just have this Sass:

    .content{
        @extend .one-whole;
        @extend .desk-three-quarters;
    }

Even better, if you use Sass’ silent classes you could use:

    .content{
        @extend %one-whole;
        @extend %desk-three-quarters;
    }

This means that the classes won’t get rendered into your CSS at all, and you can
avoid using them in your HTML! This means that, if you are using Sass and its
silent classes, you will have a class available to you for every width at every
breakpoint, but they won’t get created until you call them.

## Final word

So there we have it, a fully responsive grid system. All the power of an
abstracted grid system with responsiveness baked in.

I have bundled all this up into a micro library called
[csswizardry-grids](https://github.com/csswizardry/csswizardry-grids).  Please
feel free to try it and use it.
