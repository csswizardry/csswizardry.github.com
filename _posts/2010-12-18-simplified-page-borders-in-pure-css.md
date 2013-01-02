---
comments: true
date: 2010-12-18 16:26:40
layout: post
slug: simplified-page-borders-in-pure-css
title: Simplified page borders in pure CSS
wordpress_id: 1926
categories:
- Web Development
tag:
- CSS
- Progressive Enhancement
---

You may well be familiar with [John Hicks](http://hicksdesign.co.uk/)’ page
borders that he uses on his site. These are a series of fixed position `<b>`
elements that are placed top, right, bottom and left of the viewport over the
content, giving the illusion of a fixed border. I wanted to achieve a similar
effect recently but, given [my militant approach to progressive enhancement](http://csswizardry.com/2010/12/the-implementation-appreciation-rule/),
I decided to drop the insemantic markup and fashion a pure CSS alternative. For
a live demo please visit [suzannahaworth.com](http://suzannahaworth.com/).

<pre><code><span class="code-comment">/*------------------------------------*\
    BORDERS
\*------------------------------------*/</span>

<span class="code-comment">/* Create a series of empty pseudo-elements... */</span>
html:before,html:after,body:before,body:after{
    content:"";
    background:#dad8bb;
    position:fixed;
    display:block;
    z-index:5;
}

<span class="code-comment">/* ...and position them! */</span>
html:before{
    height:10px;
    left:0;
    right:0;
    top:0;
}
html:after{
    width:10px;
    top:0;
    right:0;
    bottom:0;
}
body:before{
    height:10px;
    right:0;
    bottom:0;
    left:0;
}
body:after{
    width:10px;
    top:0;
    bottom:0;
    left:0;
}</code></pre>
