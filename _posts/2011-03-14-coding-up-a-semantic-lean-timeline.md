---
comments: true
date: 2011-03-14 18:54:26
layout: post
slug: coding-up-a-semantic-lean-timeline
title: Coding up a semantic, lean timeline
wordpress_id: 2624
categories:
- Web Development
tag:
- CSS
- HTML
- Semantics
---

I absolutely love coding up the more semantic aspects of a build. Usually forms and tables, it’s these massively semantic (read; lots of elements with very specific jobs) that I really love coming up against. They’re not all that challenging, but they’re very fun (to me at least--is that sad?!)

After [Séan](http://twitter.com/walshybhoy) shared [the Financial Times’ timeline](http://aboutus.ft.com/corporate-information/history/) I got to wondering how I’d code my own (albeit massively more simple) timeline.

This is what I came up with: [HTML/CSS timeline](http://dl.dropbox.com/u/2629908/timeline/index.html).

## The markup

The markup is amazingly simple. Semantically I used an `<ol>`. This was quite an obvious choice as this is an ordered list of events. I used one `id=""` and some supporting `datetime` attributes where known (some exact dates are unknown, therefore not included (hopefully you’ll know your exact dates!)), and then that’s it:

    <ol id="timeline">
    
      <li>
        <time datetime="1990-07-04">July 1990</time>
        <p>Born</p>
      </li>
    
      <li>
        <time>September 1994</time>
        <p>Started first school</p>
      </li>
    
      <li>
        <time>September 1999</time>
        <p>Started middle school</p>
      </li>
    
      <li>
        <time>September 2003</time>
        <p>Started high school</p>
      </li>
    
      <li>
        <time>September 2006</time>
        <p>Started 6th Form</p>
      </li>
    
      <li>
        <time datetime="2007-11-19">November 2007</time>
        <p>Registered csswizardry.com</p>
      </li>
    
      <li>
        <time datetime="2008-07-14">July 2008</time>
        <p>Joined Sense Internet as Web Developer</p>
      </li>
    
      <li>
        <time datetime="2009-03-16">March 2009</time>
        <p>Joined Twitter</p>
      </li>
    
      <li>
        <time datetime="2010-01-11">January 2010</time>
        <p>Joined Venturelab as Web Developer</p>
      </li>
    
      <li>
        <time>January 2011</time>
        <p>Became a member of the Smashing Magazine Experts Panel</p>
      </li>
    
      <li>
        <time datetime="2011-03-21">March 2011</time>
        <p>Joined Sky as Senior UI Developer</p>
      </li>
    
    </ol>

I was initially marking the dates up as `<b>`s but as [Mark](http://twitter.com/Renniks/) pointed out [I could use the new HTML5 `<time>` element](http://twitter.com/Renniks/status/47336115753070592).

## The CSS

As far as basic styling goes, I won’t insult your intelligence; I merely set some type styles and background colours on the list items.

The really interesting bits are the odd/even styling, the ‘spine’, the dot and arrow ‘images’ and the branches off the centre of the timeline. I put images in quotes because they’re not actually images at all, they’re `:before` and `:after` pseudo-elements.

### The spine

The spine running down the timeline is actually an image and is applied as a background using the fantastic [Dummy Image](http://dummyimage.com/):

<pre><code>#timeline{
    <mark>background:url(http://dummyimage.com/1x1/f43059/f43059.gif) top center repeat-y;</mark>
    width:820px;
    padding:50px 0;
    margin:0 auto 50px auto;
    overflow:hidden;
    list-style:none;
    position:relative;
}</code></pre>

### The arrow and dot

The arrow and dot, as mentioned above, are actually pseudo-elements. Their CSS is:

<pre><code>#timeline:before, <span class="code-comment">/* The dot */</span>
#timeline:after{ <span class="code-comment">/* The arrow */</span>
    content:" ";
    width:10px;
    height:10px;
    display:block;
    background:#f43059;
    position:absolute;
    top:0;
    left:50%;
    margin-left:-5px;
    
    -webkit-border-radius:20px;
        -moz-border-radius:20px;
            border-radius:20px;
}
#timeline:after{
    margin-left:-7px;
    background:none;
    border:7px solid transparent;
    border-top-color:#f43059;
    width:0;
    height:0;
    top:auto;
    bottom:-7px;
    
    -webkit-border-radius:0;
        -moz-border-radius:0;
            border-radius:0;
}</code></pre>

Here we’ve created two empty pseudo-elements that are shaped like an arrow and a dot and then absolutely position them at the top and bottom of the ordered list. They sit over the top of the spine, giving the illusion of all being connected.

It’s worth saying that I’m not actually a fan of [the border-arrow behaviour](http://jonrohan.me/guide/css/creating-triangles-in-css/), but this _is_ an experimental piece.

### The branches

The branches that span between the list items and the spine are, again, pseudo elements. They are 70px wide and 1px high and have a gradient background which transitions from the colour of the spine to the colour of the list items. The CSS powering those is:

    #timeline li:before,
    #timeline li:after{
      content:" ";
      width:70px;
      height:1px;
      background:#f43059;
      position:absolute;
      left:100%;
      top:50%;
      background:-moz-linear-gradient(0,#d8d566,#f43059);
      background:-webkit-gradient(linear,left top,right top,from(#d8d566),to(#f43059));
    }

So by now we’ve added start and end points, a spine and branches to our timeline with no extra markup whatsoever. Lean!

### Odd/even styling

The odd/even styling of each list item is achieved, as you might expect, using `nth-of-type()` selectors. What we do is move every even list item over the right of the `<ol>` and move its branch to attach to the spine accordingly:

<pre><code>#timeline li:nth-of-type(even){
    float:right;
    text-align:left;
}
#timeline li:nth-of-type(even):after{ <span class="code-comment">/* Move branches */</span>
    background:-moz-linear-gradient(0,#f43059,#d8d566);
    background:-webkit-gradient(linear,left top,right top,from(#f43059),to(#d8d566));
    left:auto;
    right:100%;
}</code></pre>

## CSS feature detection?

This next bit I found quite cool, though a little unorthodox. I set the `<li>`s to have a negative `margin-top` so that they had a slightly overlapped effect on the timeline, so either side is not below the previous one, rather _next to_ and _slightly_ along-side it.

The problem I had here is that, in browsers that don’t support `nth-of-type()` selectors, the list items bunched up, each one slightly covering the previous one.

What I did was use this:

    #timeline li:nth-of-type(odd),
    #timeline li:nth-of-type(even){
      margin:-10px 0 0 0;
    }

Which basically says _if the browser supports `nth-of-type()` selectors then give the list items a negative `margin-top`._

Any browsers that don’t support `nth-of-type()` selectors get the previously defined margin value for the list items, set here:

<pre><code>#timeline li{
    position:relative;
    clear:both;
    float:left;
    width:318px;
    padding:10px;
    background:#fef8c4;
    border:1px solid #d8d566;
    text-align:right;
    <mark>margin:0 0 10px 0;</mark>
    
    -webkit-border-radius:2px;
        -moz-border-radius:2px;
            border-radius:2px;
    -webkit-box-shadow:0 1px #fff inset;
        -moz-box-shadow:0 1px #fff inset;
            box-shadow:0 1px #fff inset;
}</code></pre>

I guess you could call that a small kind of feature detection...?

However, whatever you call it, it means that IE8 users still get a pretty good experience, a linear, one column timeline with no `nth-of-type()` styling.

IE7 however doesn’t support pseudo-elements or `nth-of-type()` selectors, so they just get a single column list with no branches or dots/arrows but they do get a lonely spine...

## Final word

So [there we have it](http://dl.dropbox.com/u/2629908/timeline/index.html), a super lean, semantic and progressively styled timeline in HTML and CSS and one image. No doubt you could make a completely imageless solution, but I’m personally not one for this ‘never use images’ phase that the industry seems to be going through…
