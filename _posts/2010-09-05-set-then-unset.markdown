---
comments: true
date: 2010-09-05 17:53:29
layout: post
slug: set-then-unset
title: Set then unset (or reset...?)
wordpress_id: 1364
categories:
- Web Development
tag:
- CSS
---

There are countless tutorials on the Internet that preach about exactly how you should write your CSS. From trying to enforce single-line syntax, to specifying the number of spaces you should use and where, I wholeheartedly disagree with any articles of this kind. Your CSS can look however you choose, it just has to be readable, sensible and efficient.



A method I've recently become fond of requires the mass setting and tactical unsetting of style rules across elements. I've been toying with a way of explaining this method for a few days now, but I just can't think of a way to word it. I'll have to rely on code examples, instead...

Take the following, long winded way of styling a `<h1>` and a `<h2>`:


    
    <code>h1{
      font-family:Helvetica, Arial, sans-serif;
      font-size:2em;
      font-weight:bold;
      margin-bottom:20px;
    }
    h2{
      font-family:Helvetica, Arial, sans-serif;
      font-size:1.5em;
      font-weight:bold;
      margin-bottom:20px;
    }</code>



This of course could be written as the much more condensed:


    
    <code>h1,h2{
      font-family:Helvetica, Arial, sans-serif;
      font-weight:bold;
      margin-bottom:20px;
    }
    h1{
      font-size:2em;
    }
    h2{
      font-size:1.5em;
    }</code>



However, for all this is more efficient, it can be taken further still:


    
    <code>h1,h2{
      font-family:Helvetica, Arial, sans-serif;
      font-size:2em;
      font-weight:bold;
      margin-bottom:20px;
    }
    h2{
      font-size:1.5em;
    }</code>



Here we give both the `<h1>` and the `<h2>` the _same_ font size (this being the value we want the `<h1>` to use) and then override/unset this value on the `<h2>`.



## Another example...




    
    <code><span class="code-comment">/* OLD */</span>
    ol,ul{
      margin-bottom:20px;
      font-style:italic;
    }
    ol{
      list-style:decimal outside;
    }
    ul{
      list-style:square outside;
    }
    <span class="code-comment">/* NEW */</span>
    ol,ul{
      margin-bottom:20px;
      font-style:italic;
      list-style:decimal outside;
    }
    ul{
      list-style:square outside;
    }</code>



I'm afraid I can't really offer any more verbal explanation of this technique but the code examples should explain well enough. If you do have any questions though, pop them in the comments.
