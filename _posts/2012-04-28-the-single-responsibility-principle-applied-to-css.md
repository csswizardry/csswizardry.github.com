---
comments: true
date: 2012-04-28 22:57:37
layout: post
slug: the-single-responsibility-principle-applied-to-css
title: The single responsibility principle applied to CSS
wordpress_id: 3614
categories:
- Web Development
tag:
- Abstraction
- CSS
- Front-end architecture
- HTML
- OOCSS
---

Having just spoken at [the Front-Trends conference in Warsaw](http://2012.front-trends.com/), I’ve decided to expand on something which my talk mentioned a lot: classes.

My talk covered how to build big, scalable front-ends and one of the key factors involved in doing so is sensible and generous use of abstracted classes. One thing that really helps you achieve this is the application of the [single responsibility principle](http://en.wikipedia.org/wiki/Single_responsibility_principle), a method used mainly in OO programming.

Loosely, the single responsibility principle states that every module or chunk of code (a function etc) should do one job well and one job only. The benefits of this are mainly in the way of maintainability and extensibility.

If we don’t adhere to the SRP then we are likely to end up with code which does more than it should, this means that altering one part of that code could negatively impact a seemingly unrelated part of the same snippet. It also makes our code a lot less flexible in that we find our code is trying to do too much; it is too specific in its job to be portable and reusable. Abstracting chunks of functionality into several responsibilities means we can reuse a lot more of our code and recombine it over and over with other similarly abstracted chunks.

The [Wikipedia article](http://en.wikipedia.org/wiki/Single_responsibility_principle) makes a much better job of explaining than I can so I would recommend giving that a quick read (it’s only short).

Also, you will find that a lot of us do this already, and perhaps without even realising. A class of `.wrapper` is a good example of the SRP at play; by having a single, reusable class whose sole job it is to group content we make our code a lot easier to work with. We don’t need to apply lots of widths to lots of elements; we use one extra `div` and delegate the width-constraining responsibility to that.

We do this because it makes sense, but we don’t do it often enough; if we start actually thinking like this all the time we find we can vastly improve our code...

The SRP is normally applied in programming circles but I have definitely found it is _incredibly_ useful when making lean, scalable front-ends. Here’s a quick example of un-abstracted code that **doesn’t** follow the SRP:

    <a href=/product class=promo>Buy now!</a>
    
    
    .promo{
        display:block;
        padding:20px;
        margin-bottom:20px;
        background-color:#09f;
        color:#fff;
        text-shadow:0 0 1px rgba(0,0,0,0.25);
        border-radius:4px;
    }

Here we have a class for a promotional box of content. Here we are doing **two** things—we are defining box model and structure _and_ we are defining cosmetics (colouring etc).

We can refactor this code to adhere to the SRP by splitting those two chunks of functionality into two classes:

    <a href=product class="island  promo">Buy now!</a>
    
    
    .island{
        display:block;
        padding:20px;
        margin-bottom:20px;
    }
    
    .promo{
        background-color:#09f;
        color:#fff;
        text-shadow:0 0 1px rgba(0,0,0,0.25);
        border-radius:4px;
    }

We now have two classes which each carry a single responsibility; `.island` boxes off content and `.promo` applies our promotional styling. This now means that we can do things like this, which previously we couldn’t:

    <h2>Buy now with promo code: <span class=promo>0MG4WE50ME</span></h2>

Previously we couldn’t have managed this as the `.promo` class also carried a lot of box model; by abstracting our code into single responsibilities we can pick and choose what we want to use and where a lot more easily.

We can take this much, much further; now we also have a generic class for boxing off content! Where we once might have had:

    <div id=header>
    </div>
    
    <div id=content>
    </div>
    
    <div id=sub-content>
    </div>
    
    <div id=footer>
    </div>
    
    
    #header{
        padding:20px;
        margin-bottom:20px;
        background-color:#121416;
        color:#fff;
    }
    
    #content{
        width:640px;
        float:left;
        margin-right:20px;
        padding:20px;
        margin-bottom:20px;
    }
    
    #sub-content{
        width:280px;
        float:left;
        padding:20px;
        margin-bottom:20px;
    }
    
    #footer{
        padding:20px;
        margin-bottom:20px;
        background-color:#e4e4e4;
        color:#333;
    }

We would now have:

    <div class="island  header">
    </div>
    
    <div class="island  content">
    
        <h2>Buy now with promo code <span class=<mark>promo</mark>>0MG4WE50ME</span></h2>
    
    </div>
    
    <div class="island  sub-content">
    
        <a href=product class="island  promo">Buy now!</a>
    
    </div>
    
    <div class="island  footer">
    </div>
    
    
    .island{
        display:block;
        padding:20px;
        margin-bottom:20px;
    }
    
    .promo{
        background-color:#09f;
        color:#fff;
        text-shadow:0 0 1px rgba(0,0,0,0.25);
        border-radius:4px;
    }
    
    .header{
        background-color:#121416;
        color:#fff;
    }
    
    .content{
        width:640px;
        float:left;
        margin-right:20px;
    }
    
    .sub-content{
        width:280px;
        float:left;
    }
    
    .footer{
        background-color:#e4e4e4;
        color:#333;
    }

Because we abstracted our code out we now have a really portable class for simply boxing off content!

**N.B.** You should also abstract your layout to a grid system, taking the floats and widths off the page components and leaving that responsibility to the grids.

Just some of the benefits of working like this are:

1. Your CSS is a lot DRYer.
2. You can make far-reaching changes to your designs by simply modifying a base abstraction only once.
3. You can make safer changes because you know that when editing a class you are only ever altering _one_ responsibility.
4. You can combine responsibilities to make a variety of components from a lot of abstracted classes.

Now we can take it further _still_.

Because we have a nice `.island` class whose sole responsibility is to box off content then we can now do things like this:

    <div class="island  content">
        ...
        <form>
            <p class="island  error">Please provide your name.</p>
            ...
            <label class=error>Name:</label>
            ...
        </form>
        ...
    </div>
    
    
    .island{
        display:block;
        padding:20px;
        margin-bottom:20px;
    }
    
    .error{
        background-color:#fce0e2;
        color:#c00;
    }
    .error.island{
        border:5px solid #c00;
        border-radius:4px;
    }

Because we have our chunks of CSS only working on one thing at a time then we can reuse and combine useful things time and time again. I’ve written about this before: [Class based builds are like eating at Subway](https://plus.google.com/u/0/110483125936065828120/posts/DGPQzUdPi84).

## When to use it?

There’s no definite answer to questions like this but as a general rule try and stick to the SRP any time you think that subsets of a style rule could be split out into more manageable and **reusable** abstractions. Any time you are coding a potentially repeatable design pattern then try and split it out as per the single responsibility principle.

### But!

It’s important not to take this too far; classes should be abstracted but ideally not presentational. Classes like `.round-corners` for the sake of SRP are really not all that advisable.
