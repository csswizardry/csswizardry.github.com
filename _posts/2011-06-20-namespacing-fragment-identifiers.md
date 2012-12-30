---
comments: true
date: 2011-06-20 18:28:14
layout: post
slug: namespacing-fragment-identifiers
title: Namespacing fragment identifiers
wordpress_id: 2902
categories:
- Web Development
tag:
- CSS
- HTML
- Semantics
---

I just stumbled upon something amazing. [HTML allows colons (:) and periods (.) in ID tokens.](http://www.w3.org/TR/html401/types.html#type-name)

At first I thought this was awesome because, well, how cool is that?! But then I realised that neither of these are any use in CSS:

<pre><code>#foo:bar{ <span class="code-comment">/* Looks for an element with an ID of foo and a pseudo-selector(class/element) of bar */</span> }
#foo.bar{ <span class="code-comment">/* Looks for an element with an ID of foo and a class of bar */</span> }</code></pre>

So, whilst these are perfectly valid in HTML, <del>they’re useless in CSS</del> they _can_ be [styled with CSS](http://csswizardry.com/2011/06/namespacing-fragment-identifiers/#addendum:escaping). Kinda sucks, huh? But! If we know they’re okay in HTML and totally pointless in CSS, can we use that to our advantage?

Answer: yes!

## Fragment identifiers

This is just the fancy name for when you link to an element with an ID on it, e.g. `<a href="#content">Skip to content</a>`.

I regularly use fragment identifiers when writing long articles with certain sections in them. The best and most relevant example I have is [my epic on web type on Smashing Magazine](http://coding.smashingmagazine.com/2011/03/14/technical-web-typography-guidelines-and-techniques/).

Here I have a list of links to sections in the article, but you should notice I prefix each ID (and therefore its corresponding link’s `href`) with `#tt-`. This is so that I know that my sections will (almost definitely) not be picked up by Smashing’s CSS. If I had a section called `#face` and, for whatever crazy reason, Vitaly had a huge photo of himself with an ID of `#face` there would have been conflicts.

This was a situation where I needed IDs for _no_ styling whatsoever, but rather to be used as fragment identifiers. And, to circumvent any of these potential hiccups, I namespaced all my fragment identifiers with `#tt-`, standing for _technical type_.

Here enters my little discovery…

If we want an ID that won’t be styled with CSS because we only want to link to it then we can use a colon or a period in there to:

1. Ensure that CSS _cannot_ touch the element even if it wanted to.
2. Namespace the fragment identifier to show that it is meant as a link hook and give it some more human-friendly semantics.

## [Demo](http://dl.dropbox.com/u/2629908/sandbox/namespacing/index.html)

I’ve made [a demo page of this](http://dl.dropbox.com/u/2629908/sandbox/namespacing/index.html) to a) prove that it works and b) show you how it works in situ.

[Run it through the validator](http://validator.w3.org/check?verbose=1&uri=http%3A%2F%2Fdl.dropbox.com%2Fu%2F2629908%2Fsandbox%2Fnamespacing%2Findex.html), see, it works!

I’ve also tested it in IE7+, Chrome and Firefox Mac and Win.

## Problems?

Not that I can think of right away, but bear in mind that these elements cannot be styled via that ID.

For the most part the elements will be styled on an element-level basis (e.g. `table{}`, `pre{}` and so on) so styling them explicitly should not be too important.

If you do find you need to style them individually you could:

* Use a class.
* Revert to the tried and tested non-colon-or-period syntax.

## A standard

I’ve never ever seen this anywhere before but I am already thinking it will be incredibly useful to me and any others who write documentation, articles or anything else with sections.

I propose a (loose) standard whereby you namespace your fragment identifiers with relevant information, so if you’re linking to a table in a document give the table an ID of `#table:sales-figures`, a figure showing a technical drawing an ID of `#figure:engine-section`, a section of an article an ID of `#section:intro` and so on.

## Addendum

Ben ‘[Cowboy](https://twitter.com/#!/cowboy)’ Alman [points out](http://csswizardry.com/2011/06/namespacing-fragment-identifiers/#comment-61782) that [escaping the colon will allow you to style the ID via CSS, as will escaping the period](http://jsfiddle.net/csswizardry/ZYhhS/):

<pre><code>#foo\:bar{ <span class="code-comment">/* Works! */</span> }
#foo\.bar{ <span class="code-comment">/* Works! */</span> } </code></pre>
