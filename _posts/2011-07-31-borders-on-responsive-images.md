---
comments: true
date: 2011-07-31 14:28:08
layout: post
slug: borders-on-responsive-images
title: Borders on responsive images
wordpress_id: 2981
categories:
- Web Development
tag:
- Images
- Responsive web design
---

This is a quick-tip type post, nothing major but a simple and effective tip for getting responsive borders on responsive images in your responsive designs.

As we know all too well, we can’t specify borders as percentages. This is a major annoyance if you’re working (or attempting to work) large borders into a responsive design. It may not be all that difficult with images, it turns out.

Instead of applying something like this:

    img{
      max-width:100%;
      border:5px solid red;
    }

Simply use:

<pre><code>img{
    max-width:98%;
    padding:1%; <span class="code-comment">/* A percentage that, when doubled and added to the above, makes 100%. */</span>
    background:red; <span class="code-comment">/* Color of the faux border. */</span>
}</code></pre>

## [Demo](http://jsfiddle.net/csswizardry/eqE9J/show/)

I made [a jsFiddle](http://jsfiddle.net/csswizardry/eqE9J/) and [here is its output](http://jsfiddle.net/csswizardry/eqE9J/show/).

Now this does seem ridiculously obvious but a quick bit of Googling (other search engines are available) yielded nothing similar. Apologies is someone’s beaten me to this and I’m retreading old ground.
