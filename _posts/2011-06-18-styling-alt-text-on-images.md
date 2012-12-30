---
comments: true
date: 2011-06-18 17:41:39
layout: post
slug: styling-alt-text-on-images
title: Styling alt text on images
wordpress_id: 2870
categories:
- Web Development
tag:
- Accessibility
- Images
- UX
---

[I tweeted a tip](http://twitter.com/csswizardry/status/81748007304962048) the other day whereby you add text styles to images so that their `alt` text is differentiated if images, for whatever reason, cannot be loaded.

The tweet sparked more interest than I expected so I thought I would give the technique a more thorough writeup. The CSS is incredibly simple but it’s just one of those things that can make a lot of difference to someone’s UX.

The thinking is that by applying text-styles to images you can affect their `alt` text and how that appears if the image fails to load. This can help users realise there’s something different about a piece of content and that it’s perhaps not directly a part of the current text.

A lot of people weren’t aware this would or does work but if you think about it, any `alt` text you’ve ever seen will have been the same face, colour and style as the rest of the page. `alt` text (and therefore images) can be styled!

## The code

I started doing this a long, long time ago but for some reason completely forgot about it until I started developing [inuit.css](http://inuitcss.com).

I tend to always apply italics to the text and oftentimes a text colour. Italics is fairly failsafe as figures and asides etc are often set in italics.

Text colours can be more troublesome as it could be misconstrued as being a link, so use this wisely and avoid using the same colour as your links appear in.

Another fairly progressive (but potentially unstable) addition is to use the `:after` pseudo-element to append the text ‘(image)’ onto the `alt` text. This only seems to work in Firefox (4).

The code, in full, is simply:

<pre><code>img{
    font-style:italic;
    color:#c00;
}

<span class="code-comment">/**
 * In Firefox we can insert the string ‘(image)’ into the alt text of an image that hasn’t loaded.
 */</span>
img:after   { content:" (image)"; }
img::after  { content:" (image)"; } <span class="code-comment">/* New CSS3 standard notation */</span></code></pre>

So there we have it, a simple, tiny addition to make your users’ experience a little more polished and complete...
