---
comments: true
date: 2011-08-18 12:50:27
layout: post
slug: good-developers-are-illusionists
title: Good developers are illusionists
wordpress_id: 3027
categories:
- Web Development
tag:
- CSS
- HTML
---

A major part of being a good developer is efficiency. Not just with efficient code, but efficiency in making your life easier, being cleverly lazy, and making code do the hard work for you.





A good way to be efficient is through illusion. A great example of this is faux columns; overcoming a complex problem with minimal code and a clever illusion. Faux columns is still, today, one of the best little bits of web development illusion which quickly solves a problem that would otherwise take a lot of time and markup. Illusion is efficiency.





Another practical example of this is something I helped someone out with recently and have actually built myself for use at work. I'm sure we've all seen search forms laid out like this before:





![Incorrect structure](http://csswizardry.com/wp-content/uploads/2011/08/incorrect.gif)





What we have here is a search button laid over the top of our text input. Or do we...?





If we were to use just `<input type="text">` and `<input type="image">` to achieve this effect here we'd need to use some positioning to move the button over the search field, possibly some `z-index`, some big paddings to stop text going underneath the button and, more than likely, a lot of hard-coded numbers, cross-browser issues and headaches.





Enter the magic of illusion. Here's how I tackled that problem:





![Correct structure](http://csswizardry.com/wp-content/uploads/2011/08/correct.gif)



Instead of trying to make two sibling elements appear as though one contains the others, why not spoof the effect with an element that _does_ contain it; the `<fieldset>`?

If that doesn't make sense, I've made [a demo of this on jsFiddle](http://jsfiddle.net/csswizardry/HdqNN/show/) as well as [hosting the code](http://jsfiddle.net/csswizardry/HdqNN/). Be sure to pick through it with Firebug or similar to actually get what's going on.

This method works perfectly in IE7+ (not checked IE6, but nor have I walked my dinosaur today) and all other browsers.


    
    <code><span class="code-comment"><!-- HTML --></span>
    <form id="search-form" action="#">
        <fieldset>
            <legend class="accessibility">Search our archives</legend>
            <label for="search" class="accessibility">Search terms</label>
            <input id="search" placeholder="Keywords&hellip;" type="text">
            <input id="btn" type="image" src="http://dl.dropbox.com/u/2629908/misc/search.png" alt="Search">
        </fieldset>
    </form>
    
    <span class="code-comment">/* CSS */</span>
    .accessibility{
        position:absolute;
        left:-9999px;
    }
    
    <span class="code-comment">/* Form */</span>
    fieldset{
        padding:0;
        width:275px;
        border:1px solid #4885d8;
        background:rgba(0,0,0,0.25);
    
        -moz-border-radius:4px;
        -webkit-border-radius:4px;
        border-radius:4px;
        -moz-box-shadow:0 0 10px rgba(0,0,0,0.75) inset;
        -webkit-box-shadow:0 0 10px rgba(0,0,0,0.75) inset;
        box-shadow:0 0 10px rgba(0,0,0,0.75) inset;
    }
    input{
        font-size:1em;
    }
    #search,
    #btn{
        float:left; <span class="code-comment">/* Make the fieldset hug the inputs */</span>
        cursor:pointer;
    }
    #search{
        width:200px;
        padding:15px;
        background:none;
        border:none;
        color:#fff;
    }
    #search:active,
    #search:focus{
        outline:none;
        cursor:text;
    }
    #btn{
        float:right;
        position:relative;
        top:9px; <span class="code-comment">/* Some unfortunate hard-coded numbers, but these will need setting/altering accordingly. */</span>
        right:9px;
        width:32px; <span class="code-comment">/* Same width and height as original image file. */</span>
        height:32px;
    }</code>





We're building a form, we have `<fieldset>`s and other great little semantic elements all over the place. Let's put these to work and achieve this effect with some illusion... Why wrestle the button and input to sit awkwardly when you have a wrapper already there with the `<fieldset>`?





Be clever, use illusion to create the desired look using other, more robust elements. Think outside the box and see where other elements/bits of markup can be used to make a more sturdy build _and_ make your life easier.



Any more good examples of this kind of thing that anyone's built? Let me know!
