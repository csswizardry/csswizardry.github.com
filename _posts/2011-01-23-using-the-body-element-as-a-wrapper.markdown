---
comments: true
date: 2011-01-23 14:19:23
layout: post
slug: using-the-body-element-as-a-wrapper
title: Using the &lt;body&gt; element as a wrapper
wordpress_id: 2247
categories:
- Web Development
---

This is a tiny little blog post that a lot of you will already be aware of, however in _my_ experience I've found that for every one person that does realise this, there are about two who don't.

A lot of developers will have a _wrapper_ `<div>` in their markup in which the page is contained. It might look something like this:




    
    <code><span class="code-comment"><!-- Markup --></span>
    <body>
    
      <mark><div id="wrapper"></mark>
      
        [content]
        
      </div>
      
    </body>
    
    <span class="code-comment">/* CSS */</span>
    body{
      font-family:sans-serif;
      background:#fff;
      color:#333;
    }
    <mark>#wrapper{</mark>
      width:940px;
      margin:0 auto;
    }</code>



It _most_ situations this could be simply rewritten:


    
    <code><span class="code-comment"><!-- Markup --></span>
    <body>
    
      [content]
      
    </body>
    
    <span class="code-comment">/* CSS */</span>
    body{
      font-family:sans-serif;
      background:#fff;
      color:#333;
      width:940px;
      margin:0 auto;
    }</code>



You `<body>` _is_ a container.

Obviously there will be _some_ instances where this won't be suitable--and you'll spot what those are as you come across them--but for the most part, you can drop that unnecessary wrapper `<div>` and **use the `<body>` element as a wrapper**.

Hat-tip to [Simon Wiffen](http://twitter.com/simonwiffen) for showing me this a while ago.
