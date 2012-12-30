---
comments: true
date: 2011-08-02 20:31:49
layout: post
slug: more-logo-markup-tips
title: More logo markup tips
wordpress_id: 2988
categories:
- Web Development
tag:
- Logo
- Semantics
- Web Standards
---

In my previous article we determined that [your logo is not a `<h1>`](http://csswizardry.com/2010/10/your-logo-is-an-image-not-a-h1/) and is in fact an image (`<img />`) in its own right. Now let’s cover some nice little tips and snippets for making the most of your markup and creating a nicer UX around it.

The techniques I’m going to cover can be found on my recently launched hub site [hry.rbrts.me](http://hry.rbrts.me), but for the sake of clarity I have [isolated them in a jsFiddle here](http://jsfiddle.net/csswizardry/h7zrY/).

So, if we know a logo needs to be an `<img />` that’s easy enough, but what if we want hover styles on this image? Simple.

We’ll be wrapping the logo in an `<a>` so as to link back to the homepage, a common and good practice:

    <a href="/" id="logo">
      <img src="/img/logo.png" alt="Company logo">
    </a>

What we can do here is utilise this `<a>` and apply a sprited background image to it to provide our on/off hover states, thus:

    #logo{
      display:block;
      width:100px; /* Width of logo */
      height:100px; /* Height of logo */
      background:url(/img/css/sprite.png);
    }

So now we have a background on the `<a>` surrounding our `<img />` that we now need to git rid of.

We could do this by using a simple `display:none;` or more accessibly using:

    #logo img{
      position:absolute;
      left:-9999px;
    }

Now we can no longer see the `<img />` but we _can_ see the background on the `<a>` behind it.

Now all we need is to move the sprite on `:hover`, thus:

    #logo:hover{
      background-position:0 -100px;
    }

So here we have a semantically sound logo, using (as we should be) an `<img />` with the added benefit of being able to use sprites to give the logo hover effects.

## There’s more...

There’s another little thing I’ve started doing which I really like. We have an image in the page semantically, but not functionally. Right clicking the logo won’t yield a _view image_ context menu, instead it’ll just focus on the `<a>`.

What I like to do, which is a nice little touch, is to unhide the `<img />` (i.e. get rid of the absolute positioning above) and instead just hide it with `opacity:0;` (or `filter:alpha(opacity = 0);` for IE). This means that the user can still right click the logo and be interacting with an image, but they still get your nice sprites on hover.

So we have an `<a>` with a background sprite which contains an invisible image that a user can still interact with; [see it in situ](http://hry.rbrts.me) or look at [an isolated case](http://jsfiddle.net/csswizardry/h7zrY/). Try hovering and right clicking...
