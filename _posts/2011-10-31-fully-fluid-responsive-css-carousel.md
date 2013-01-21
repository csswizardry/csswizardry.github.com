---
comments: true
date: 2011-10-31 22:46:10
layout: post
slug: fully-fluid-responsive-css-carousel
title: Fully fluid, responsive CSS carousel
wordpress_id: 3288
categories:
- Web Development
tag:
- Animation
- CSS
- CSS3
- HTML
- Progressive Enhancement
- Responsive web design
---

If you [follow me on Twitter](http://twitter.com/csswizardry) you’ll know I’ve been pretty enthused about this [fluid CSS carousel](http://dl.dropbox.com/u/2629908/sandbox/fluid-css-carousel/index.html) of mine. There are two aspects to it; the fluidity and the CSS functionality.

## [Demo](http://dl.dropbox.com/u/2629908/sandbox/fluid-css-carousel/index.html)

The demo features photos of me, taken on various mountains by [Suze](http://twitter.com/suzehaworth). Cheers to her for the content.

## The fluidity

Making a carousel fluid is actually ridiculously simple. Let us assume you have five panels. Remember that number!

A carousel is made up of three basic components:

1. A viewport
2. A wrapper for the panes
3. A pane

Thus, our markup is:

    <div class=carousel>
    
      <ul class=panes>
    
        <li>
          <h2>Pane 01 title</h2>
          <img src=pane-01.jpg alt="">
        </li>
    
        <li>
          <h2>Pane 02 title</h2>
          <img src=pane-02.jpg alt="">
        </li>
    
        <li>
          <h2>Pane 03 title</h2>
          <img src=pane-03.jpg alt="">
        </li>
    
        <li>
          <h2>Pane 04 title</h2>
          <img src=pane-04.jpg alt="">
        </li>
    
        <li>
          <h2>Pane 05 title</h2>
          <img src=pane-05.jpg alt="">
        </li>
    
      </ul>
    
    </div>

Now, the viewport defines what we see, we slide our panes behind it and they poke through. We just slide these behind the viewport to show a certain amount at a time, et voilà; carousel. But, you all know how carousels work, right…?

To make this fluid is so simple. The viewport needs to fill its container, so this gets `width:100%;`. Easy.

One pane needs to fit nicely in the viewport, so this needs to occupy 100% of the viewport. With this in mind...

We have five panes, remember, so the `ul` needs a width of 500%. Five panes that are each the same width as the viewport gives us a width of **500%**.

Now we know:

    .carousel{
      width:100%;
    }
    .panes{
      width:500%;
    }

So if `.panes` holds five panes, each pane should be 20% its width. This is where it might get a little confusing...

The viewport is 100% width, the wrapper is five times as big as that and each pane is one fifth the width of the wrapper.

Our code is left at:


    
<pre><code><span class="code-comment">/*------------------------------------*\
    $CAROUSEL
\*------------------------------------*/</span>
.carousel{
    overflow:hidden;
    <mark>width:100%;</mark>
}
.panes{
    list-style:none;
    position:relative;
    <mark>width:500%;</mark> <span class="code-comment">/* Number of panes * 100% */</span>
    overflow:hidden; <span class="code-comment">/* This is used solely to clear floats, it does not add functionality. */</span>
        
    -moz-animation:carousel 30s infinite;
    -webkit-animation:carousel 30s infinite;
    animation:carousel 30s infinite;
}
.panes > li{
    position:relative;
    float:left;
    <mark>width:20%;</mark> <span class="code-comment">/* 100 / number of panes */</span>
}
.carousel img{
    display:block;
    width:100%;
    max-width:100%;
}
.carousel h2{
    font-size:1em;
    padding:0.5em;
    position:absolute;
    right:10px;
    bottom:10px;
    left:10px;
    text-align:right;
    color:#fff;
    background-color:rgba(0,0,0,0.75);
}</code></pre>

The basic equation for making a carousel with any number of panes is:

    <pre><code>.carousel{
      width:100%;
    }
    .panes{
      width:<mark>100 * number of panes</mark>%;
    }
    .panes > li{
      width:<mark>100 / number of panes</mark>%;
    }</code></pre>

So, a four-pane carousel would be:

    <pre><code>.carousel{
      width:100%;
    }
    .panes{
      width:<mark>400</mark>%;
    }
    .panes > li{
      width:<mark>25</mark>%;
    }</code></pre>

It really is that simple. That’s all there is to making a fluid carousel.

## CSS powered

Okay, in this carousel I decided I was going to power it with CSS. This is super unorthodox so if you’re yelling WTF at your screen please read on!

It was going to be (and actually is) used on my good friend [Sam Penrose’s new design portfolio](http://sampenrose.co.uk/), so knowing we had free reign and a little chance to experiment I decided to opt for a pure CSS solution.

This is simple in theory but the maths gets _so_ tricky.

All we do is animate `.panels` from right to left then back again. We animate for a bit, we pause, we animate again, pause again and so on until it’s done. Then we loop it infinitely.

The CSS is:

    @keyframes carousel{
        0%    { left:0; }
        11%   { left:0; }
        12.5% { left:-100%; }
        23.5% { left:-100%; }
        25%   { left:-200%; }
        36%   { left:-200%; }
        37.5% { left:-300%; }
        48.5% { left:-300%; }
        50%   { left:-400%; }
        61%   { left:-400%; }
        62.5% { left:-300%; }
        73.5% { left:-300%; }
        75%   { left:-200%; }
        86%   { left:-200%; }
        87.5% { left:-100%; }
        98.5% { left:-100%; }
        100%  { left:0; }
    }

The numbers are so tricky to work with and if anyone can come up with a decent equation to describe it I would be so happy. I’ve got [Nick](http://twitter.com/makeusabrew) on the job, but I’ve not worked it out yet; I can’t quite grasp the relation between five panes and the numbers above in a way that I could do some quick maths to work out the animations for a four-pane carousel.

The problem is that you have to know how many full moves and pauses are needed for a full iteration of the carousel (before it starts on its infinite loop), and then how to evenly space these numbers between 0 and 100%. My animations last for 1.5% and pause for 11%, these numbers are perfect for adding up to 100%.

## Update

Massive thanks to Clay who’s worked out that the number of steps is 4n-3 and that the total time between start of one animation and the next is 100 / 2(n-1) (where n is the number of panes). See [his full comment](http://csswizardry.com/2011/10/fully-fluid-responsive-css-carousel/#comment-95396).

But, the code above will sort you out a perfect animation for a five panes so feel free to nab it! I’ll update if and when I crack some maths!

### Wait, CSS?!

Using CSS for this is really, really unorthodox so comes with some massive caveats.

Do not use CSS to animate this carousel if:

1. You require the contents of every pane to be visually accessible to the user.
2. You require full browser support.
3. You do not require interactions (like stopping the animation or clicking between panes).

If you are going to use this CSS-only method then ensure that:

1. The user can still use the site fully without the contents of the panes.
2. You are okay with older browsers not animating and just displaying the first pane.
3. You do not want or require users to be able to interact with the carousel.

If you can’t use CSS then combine the fluidity above with plain ol’ trusty JS.

I will happily say that the fluidity is the most important, useful and impressive thing about this technique. Until I, or anyone, can get you a decent equation to substitute your numbers into, the CSS animations are too cumbersome and restrictive to be of large-scale use to most people.
