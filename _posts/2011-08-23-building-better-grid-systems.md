---
comments: true
date: 2011-08-23 19:41:31
layout: post
slug: building-better-grid-systems
title: Building better grid systems
wordpress_id: 3050
categories:
- Web Development
tag:
- CSS
- Grids
- HTML
---

With every grid system that gets released--and there are a lot now--I notice the same issue with nigh on _every_ one of them; handling the extra margin/gutter on the last `<div>`.

**N.B.** This post is about the HTML and CSS that powers grid systems, rather than the columns, construct, system and layout itself.

## The problem

If you have a grid system where each grid module is defined with a class of, say, `.grid`, you might have some CSS like this:

<pre><code>.row{
    width:940px;
    overflow:hidden; <span class="code-comment">/* This is just for brevity. Please use a better clearfix: http://nicolasgallagher.com/micro-clearfix-hack/ */</span>
    clear:both;
}
.grid{
    float:left;
    margin-right:20px;
}
...
.col-4{
    width:220px;
}
...</code></pre>

The most important thing to note is that every `.grid` has a `margin-right` of 20px, so--in a 16 column 940px grid system--4 × `.col-4` actually equals 960px (4 × (220px + 20px)). This is 20px (or one margin) _bigger_ than your wrapper. 

The formula for a complete system is:

<var>f</var> = <var>n</var>(<var>c</var>) + <var>n</var>-1(<var>g</var>)

Where:

  * <var>f</var> = full row
  * <var>n</var> = number
  * <var>c</var> = columns
  * <var>g</var> = gutters

Basically, a full row comprises of _n_ columns and _n_-1 gutters; we want one less gutter than we have columns. We need to lose a gutter somehow.

## The current solution(s)

The simplest and most common solution is to use a class of `.last` or `.end` on the last or end grid column to remove its margin:

    .end{
      margin:0;
    }

This would give us:

    <div class="row">
    
      <div class="grid  col-4">
        <p>One box plus one gutter</p>
      </div>
    
      <div class="grid  col-4">
        <p>One box plus one gutter</p>
      </div>
    
      <div class="grid  col-4">
        <p>One box plus one gutter</p>
      </div>
    
      <div class="grid col-4  end">
        <p>One box only</p>
      </div>
      
    </div>

This solves the problem, but it means the developer has to remember to add that class every time they construct a row of grids.

Another problem is that if a programmer needs to dynamically display, say, a series of images in a grid system, they need to do some scripting to say 'if this is the _x_ column then add a class of `.end`'. Not a massive overhead, but an overhead nonetheless.

### The other current solution

Another solution I've seen recently is used on [Twitter's Bootstrap framework](http://twitter.github.com/bootstrap/) and a few other places. This solution is a little more elegant, but still not very robust.

It works by removing the `margin-right:20px;` from `.grid` and applying it as a `margin-left` instead. Then--using the dynamic `:first-child` pseudo-selector (`:first-child` is used as it has better browser support than `:last-child`)--you can target the first `div` in a row and remove its margin, thus:

    .grid:first-child{
      margin:0;
    }

This keeps your markup clean as you don’t have to include the special class and also means your devs don’t have to take the extra class into consideration, However, this is not without its own problems...

The smallest problem with using this method is that the `:first-child` selector is quite an inefficient one, but selector performance is another post for another time.

The most significant drawback is that `:first-child` only ever matches one grid in the row, meaning you can’t have multiple-row grid constructions. Take the following (crude) representations...

* Tildes (~) and broken bars (¦) denote the `.row` `div`
* Hyphens (-) and pipes (|) denote `.grid` `div`s
* <i>x</i> denotes `:first-child`
* <i>!</i> denotes borked

`:first-child` works out fine here as we only have a one-row-deep layout. The first `div` is the _only_ flush-left `div`:

    +~~~~~~~~~~~~~~~~~~~~~~~~~+
    ¦ +---+ +---+ +---+ +---+ ¦
    ¦ | x | |   | |   | |   | ¦
    ¦ +---+ +---+ +---+ +---+ ¦
    +~~~~~~~~~~~~~~~~~~~~~~~~~+

In this following example however, `:first-child` will _not_ work as intended as there are two flush-left `div`s but only one of them is the first child. This is where this method breaks, and **more-than-one-row-deep layouts are not uncommon**:

    +~~~~~~~~~~~~~~~~~~~~~~~~~+
    ¦ +---+ +---+ +---+ +---+ ¦
    ¦ | x | |   | |   | |   | ¦
    ¦ +---+ +---+ +---+ +---+ ¦
    ¦ +---+ +---+ +---+ +---+ ¦
    ¦ | ! | | ! | | ! | | ! | ¦
    ¦ +---+ +---+ +---+ +---+ ¦
    +~~~~~~~~~~~~~~~~~~~~~~~~~+

So `:first-child` kinda works, but not well enough. The solution...?

## The solution

In short, the solution is to not remove that extra margin, but to hide the effects of it.

Essentially the real problem is that **the combined width of a full row is one gutter wider than our container**, right? Well what we need to do is **make our container one gutter wider** but **disguise the extra width** by using **a negative margin equal to one gutter**.

This can be a bit of a headf**k so bear with me. What we need to do is apply the gutter as a `margin-left` on the `.grid`, as Twitter do, but we're not going to remove any of them. No pseudo-classes, no special classes, nothing. It's gonna stay there.

We can hide the effects/breakage caused by the extra gutter by giving the container `.row` a width of _all_ the columns and gutters combined and then a negative `margin-left` _equal to_ one gutter to pull everything back across again, soaking up the effects of the `margin-left`.

Our 940px `.row` now becomes 960px wide to allow for the fact we are no longer removing the end gutter, then we pull it all back over by 20px to remove the visual effects of that extra width, thus:

    .row{
      width:960px;
      margin-left:-20px;
      overflow:hidden;
      clear:both;
    }
    .grid{
      float:left;
      margin-left:20px;
    }
    ...
    .col-4{
      width:220px;
    }
    ...

This way we can have multiple-row constructions and never have to remember the special `.end`/`.last` classes.

To see this technique in action head on over to [inuit.css](http://inuitcss.com) and poke about the page's grid system using Firebug or similar. It's most apparent in the list of features...

## Roll your own...

To transfer this technique, you only need to know three things:

* The number of columns in your grid system
* The width of one column
* The width of one gutter

With these, your formula is simply:

    <pre><code>.row{
      width: <mark>(number of columns * width of one column) + (number of columns * width of one gutter)</mark> px;
      margin-left: -<mark>width of one gutter</mark> px;
      overflow:hidden;
      clear:both;
    }
    .grid{
      float:left;
      margin-left: <mark>width of one gutter</mark> px;
    }</code></pre>

So let’s create one using **12 columns** that are **50px wide** with a **gutter of 25px**:

    <pre><code>.row{
      width:<mark>900px</mark>;
      margin-left:-<mark>25px</mark>;
      overflow:hidden;
      clear:both;
    }
    .grid{
      float:left;
      margin-left:<mark>25px</mark>;
    }</code></pre>

Plugging in our numbers gives us a grid system that doesn’t require special classes, is totally flexible (you can move columns without needing to move a class around), and gives you more varied layouts (multiple rows).

I employ this technique on both [inuit.css](http://inuitcss.com) and [Fluid Grids](/fluid-grids/) and it’s proved perfect so far. Robust, portable and lean.
