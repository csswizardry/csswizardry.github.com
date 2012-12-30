---
comments: true
date: 2011-09-17 16:40:36
layout: post
slug: ordered-and-numbered-lists-the-differences
title: Ordered and numbered lists; the differences
wordpress_id: 3191
categories:
- Web Development
tag:
- CSS
- HTML
- Semantics
---

This is a really small blog post about ordered lists and numbered lists and their subtle differences.

Have you ever wanted to say something like ‘There are three things to look out for:’ and then follow with a numbered list with the three things in?

I’m pretty sure we all have, and that we’d all normally use an `<ol>` to get the numbers, right? That’s how you get numbers next to list items after all...

Well the problem here is that the numbering defines an amount, not an order. The order is _usually_ irrelevant in this scenario.

To make more sense I’ve drawn up [a small fiddle of examples](http://jsfiddle.net/csswizardry/sdrth/) and the reasoning in each.

Here we can see that, although we want numbers, we don’t always want order.

The trick I’ve started employing is is to have a `.numbered` class which I can apply to a `<ul>` to make it mimic the appearance of an ordered list, without semantically carrying the ordered weight. This is how I do it:

<pre><code>ul,
ol{
    margin-bottom:1.5em;
}
li ul,
li ol{
    margin-bottom:0;
}
ul{
    list-style:square outside;
}
ol,
<mark>.numbered</mark>{
    list-style:decimal outside;
}</code></pre>

There. As simple as that. These are pretty much my default list styles now, and all I’m really doing is making an unordered list with a class of _numbered_ look the same as an `<ol>`.
