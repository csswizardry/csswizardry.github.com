---
comments: true
date: 2010-12-20 21:24:01
layout: post
slug: remote-controlled-hyperlinks-or-multiple-links-in-one-hyperlink
title: Remote controlled hyperlinks (or multiple links in one hyperlink)
wordpress_id: 1935
categories:
- Web Development
tag:
- CSS
- HTML
- Hyperlinks
---

This is a little development technique I dreamt up the other day. I’m not even one-hundred percent sure what to call it, but due to what it does, which you’ll find out in a second, I think _remote controlled hyperlinks_ will (sort of) do... I put it into practice on [Suze’s new site](http://suzannahaworth.com/), in the sidebar.

Imagine you have a piece of running text like ‘read more about me or get in touch’. Here we have two actions; read more and make contact. Let’s also imagine that your about page and contact page are one and the same; the contact section is just your email address on that page. What I wanted was a cool way of giving the impression of two separate links to the same page but also making clear that the two links both did the same thing.

## [Demo](/demos/remote-controlled-hyperlinks/)

What I came up with was [this](/demos/remote-controlled-hyperlinks/), a way of hovering one link whilst giving the impression of hovering any number of quasi-links inside it.

What this does is removes all link styles and evidence of being a link (hover states, cursor and outline) from the `a` and applies those styles to `span`s inside it. When you hover the `a`, only any `span`s inside it change, and when you click anywhere in the link, both `span`s have active, outlined states.

### The code

    <p>Read more <a href="#" class="multi-links"><span>about me</span> and <span>contact me</span></a>.</p>
    
    <p>Why not <a href="#" class="multi-links"><span>search</span> and <span>read</span> my archives</a>?</p>


    a,
    .multi-links span{
        font-weight:bold;
        color:#c00;
        text-decoration:none;
        cursor:pointer;
    }
    .multi-links,
    .multi-links:hover,
    .multi-links:active,
    .multi-links:focus{
        position:static;
        text-decoration:none;
        font-weight:normal;
        color:#333;
        outline:none;
        cursor:text;
    }
    a:hover,
    a:active,
    a:focus,
    .multi-links:hover span{
        text-decoration:underline;
    }
    a:active,
    a:focus,
    .multi-links:active span,
    .multi-links:focus span{
        position:relative;
        top:1px;
        text-decoration:underline;
    }
    .multi-links:active span,.multi-links:focus span{
        outline:1px dotted #c00;
    }

## Caveats

Of course this can only work where the two links are one after the other because
(as you know) you cannot stagger the nesting of tags. This of course limits its
usefulness somewhat.

### Concerns

This presentation and behaviour goes against most known link conventions, it
could well be pretty confusing. If you were to use this at all, I think it’d be
best left for use on a site where the users are likely to be more tech savvy
than your usual.

I think it’d look pretty cool on a portfolio type site, or a personal site such
as Suze’s where the copy lends itself well.

Anyway, there it is, nothing groundbreaking but a pretty cool and interesting
effect.
