---
comments: true
date: 2010-12-21 18:13:42
layout: post
slug: media-queries-handier-than-you-think
title: Media queries, handier than you think
wordpress_id: 1946
categories:
- Web Development
tag:
- CSS
- Media Queries
---

A lot of people are using media-queries of late to do full site changes to
rework an entire page – or set of pages – based on a screen-size; from mobile
through iPad, to 800x600, up to more ‘modern’ sizes. They can however have much
more humble (but equally, if not more, nifty) applications. Here I’ll share with
you just two such applications I used recently on a real site.

To begin, head to [suzannahaworth.com](http://suzannahaworth.com/).

First off, have your browser (if possible) at a resolution of 1024x768px. You
should see the main content (`<body>`) is centered in a [960GS](http://960.gs/)
layout. I support 1024x768 as the smallest desktop screen-size. The code is simply:

    body{
    	width:940px;
    	padding:0 10px;
    	margin:100px auto 0 auto;
    	...
    }

Now size your browser up to 1280x1024px if you are able to. You should see that
the main content (`<body>`) is 150px from the top of the screen and 100px from
the left. I chose the arbitrary values to give the page a non-centered layout
which was my ideal look. The code for this:

    /*------------------------------------*\
    	WIDE VERSION
    \*------------------------------------*/
    @media (min-width: 1100px){
        body{
            margin:150px 0 0 100px;
        }
    }

As simple as that.

The other thing, and the one I like most, is the sidebar. With a resolution
1024x768px or above, visit the site and scroll the page. The sidebar is fixed, 
right? Now make that something more like 1024x500px and scroll, the sidebar
scrolls too!

I’m quite fond of this effect but unfortunately at certain screen sizes (such as
my netbook) the sidebar runs off the page and can’t be viewed because it won’t
scroll. This has always stopped me using fixed positioning much, until I had the
idea to use CSS to say ‘if the screen is big enough, give it position fixed,
otherwise let it scroll!’

The default code is:

    #sub-content div{
    	position:fixed;
    	width:220px;
    }

Which is overwritten (if applicable) by this:

    /*------------------------------------*\
    	SHORT VERSION
    \*------------------------------------*/
    @media (max-height: 540px){
        #sub-content div{
            position:static;
        }
    }

It really is that simple!

So there you have it, media queries aren’t just for major grunt and massive
amounts of donkey work; small snippets can adapt the tiniest bits of your site
to add changes where necessary, meaning you can preserve the features you want
whilst not sacrificing the experience in situations where those features won’t work!
