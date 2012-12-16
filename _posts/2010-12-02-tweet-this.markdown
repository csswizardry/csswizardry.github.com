---
comments: true
date: 2010-12-02 20:32:22
layout: post
slug: tweet-this
title: Tweet this!
wordpress_id: 1854
categories:
- CSS Wizardry
tag:
- Twitter
---

This is just a very quick article of no real substance, but that I thought I'd share for all you Twittering bloggers out there. You may have noticed a few weeks ago I added a simple link at the end of every article in order for readers to quickly Tweet the current post with a link and my [Twitter username](http://twitter.com/csswizardry). A very small and trivial addition, which seems to have had massive benefits!

The code for this very subtle addition is simply:


    
    <code><p><a href="http://twitter.com/?status=<?php the_title(); ?>%20by%20@csswizardry%20<?php the_permalink() ?>">Please Tweet this article</a>, it'd be surely appreciated.</p></code>





**Above:** Note the use of the Wordpress template tags.



There we have it, just a simple textual link with a personal-sounding message. This is so trivial that I didn't actually bother putting any metrics into place to track its effectiveness. However, one thing I have noticed is that that subtle, textual link with a polite message (I didn't want a garish 'Tweet me now!' kind of button as that wouldn't have sat properly with the way I've done the rest of CSS Wizardry) has had quite a noticeable impact on articles' tweet rates. It seems to be very very effective!

So yeah, basically if you're wondering how effective something such as that might be, I'd say very--although I don't have numbers to prove it....
