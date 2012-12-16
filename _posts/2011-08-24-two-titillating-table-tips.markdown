---
comments: true
date: 2011-08-24 18:59:46
layout: post
slug: two-titillating-table-tips
title: Two titillating table tips
wordpress_id: 3098
categories:
- Web Development
tag:
- HTML
- Tables
---

Yesterday I was taught two awesome little `<table>` tips from two friends, [Steve Melrose](http://twitter.com/StephenMelrose) and [Jon 'Barry Crayon' Cotton](https://twitter.com/BarryCrayon). I can't believe I never knew about these two, they're so simple but really cool*

*The tips are simple, not Steve and Jon.

The first, which Steve alerted me to, is `colspan="0"` and `rowspan="0"` which basically just makes the cell (`<td>`/`<th>`) to which it is applied span all the columns/rows between itself and the end/bottom of the table respectively.

I tweeted about how cool this was when Jon replied with info about `colspan="100%"`/`rowspan="100%"` which is similar to the above but instead of meaning 'the rest of' it just means 'all of'. This is great if you want a cell to always span the whole width/height of a table but you don't always know how large that table will be.

[See my fiddle!](http://jsfiddle.net/csswizardry/GLuj3/embedded/result/)

As far as I can tell Firefox is the only browser that supports `[col|row]span="0"` but all browsers seem to support `[col|row]span="100%"`. I've not been able to do any more thorough browser testing but if anyone can feed back that'd be great!
