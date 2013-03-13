---
comments: true
date: 2011-10-16 13:03:43
layout: post
slug: the-island-object
title: The ‘island’ object
wordpress_id: 3218
categories:
- Web Development
tag:
- Abstraction
- CSS
- DRY
- Front-end architecture
- OOCSS
---

One thing I’ve been doing a lot of lately, since starting at [Sky](http://sky.com/), is writing abstractions. [OOCSS](http://www.oocss.org) is nothing new, but its basic premise is that you can build really simple objects using a base class and then extend that object with more classes to add more styling to make a simple construct progressively more complex and specific.

One abstraction I love is by [Nicole Sullivan](https://twitter.com/stubbornella) (one of the best front-end devs in the world ever); the [media object](http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/). Another I wrote is the more simple [nav abstraction](http://csswizardry.com/2011/09/the-nav-abstraction/).

Today I’m going to share one that’s simpler still; the _island object_...

This super simple object is basically a single class used to box off content, leaving it closed on all sides like, well, an island.

Often you’d find yourself with markup and CSS a little like this:

    <div class=content>
    
      <div class=promo>
          ...
      </div>
    
    </div>
    
    <div class=sub-content>
      
      <div class=twitter>
        ...
      </div>
      
    </div>
    
    .content{
      width:460px;
      float:left;
      padding:20px;
      margin-bottom:20px;
      background-color:#fff;
    }
    .sub-content{
      width:160px;
      float:left;
      padding:20px;
      margin-bottom:20px;
      background-color:#333;
      color:#fff;
    }
    .promo{
      padding:20px;
      margin-bottom:20px;
      border:1px solid #ff8;
      background-color:#ffc;
      color:#333;
    }
    .twitter{
      padding:20px;
      margin-bottom:20px;
      color:#fff;
      background-color:#00a0d1;
    }

Here we see that these are all standalone blocks of boxed off content, but they all share certain things in common. These are essentially all islands of content that are individually adapted to look different.

Instead of repeating these declarations over and over we can make an abstraction to create padded, boxed off areas.

Now, we could use `.box` as a class but this implies square; we could have a redesign where we use rounded corners or even wacky, wavy background images which, although _are_ boxed off, aren’t presentationally boxes. We don’t like presentational classes if we can help it.

Enter the `.island` class. Now our markup and CSS would be:

    <div class="island content">
    
      <div class="island promo">
          ...
      </div>
    
    </div>
    
    <div class="island sub-content">
      
      <div class="island twitter">
        ...
      </div>
      
    </div>
    
    .island{
      padding:20px;
      margin-bottom:20px;
    }
      .island > :last-child{
        margin-bottom:0; /* Remove the margin from the last child of a boxed off area so that we don’t end up with compounded margin/padding spacings. */
      }
    
    .content{
      width:460px;
      float:left;
      background-color:#fff;
    }
    .sub-content{
      width:160px;
      float:left;
      background-color:#333;
      color:#fff;
    }
    .promo{
      border:1px solid #ff8;
      background-color:#ffc;
      color:#333;
    }
    .twitter{
      color:#fff;
      background-color:#00a0d1;
    }

This does make the HTML a tad larger, but the `.island` class is a powerful one that can quickly and rapidly create new areas of content without having to redeclare styles over and over.

Extending the island object with more specific styles means that you can have components that look vastly different but that are built upon the same basic construct. This also means that if you decide you design needs a little more white-space you can up the `.island` padding to, say, 24px in one go and all content blocks will inherit this new style.
