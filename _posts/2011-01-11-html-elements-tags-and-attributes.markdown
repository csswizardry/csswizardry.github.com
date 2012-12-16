---
comments: true
date: 2011-01-11 22:15:22
layout: post
slug: html-elements-tags-and-attributes
title: HTML elements, tags and attributes
wordpress_id: 2107
categories:
- Web Development
tag:
- HTML
- Markup
---

This article is only a small one, and to the vast majority it won't be of much use, but I'm still astounded that today, in 2011, professional web designers and developers are still making this fundamental mistake. The difference between HTML elements, tags and attributes.



## Elements



An element is a single 'chunk' of code comprising of an opening and closing tag.


    
    <code><div>This is a div element</div></code>



This is a `div` element. Not a `div` tag.

Some elements have only one, self-closing tag:


    
    <code><img /></code>





## Tags



Tags are the bits that make up elements. `<div>` is a tag. An opening and closing tag makes an element:


    
    <code><div></code>



And:


    
    <code></div></code>





## Attributes



An attribute is a piece of code attached to a tag which supplies additional information:


    
    <code><div <mark>class="some-class"</mark>>This is a div element</div></code>



This is an attribute.

So, when people say 'I've used `alt` tags', they haven't; they've used `alt` _attributes_.

When people say 'Don't use tables, use `div` tags.' they mean use `div` _elements_.

When people say 'mark important text up in a `strong` tag' they mean mark important text up in a `strong` _element_ (made up of two `strong` tags).


    
    <code>|<--             --element--            -->|
    <tag attribute="value">Element content</tag></code>



This is probably really very basic for the majority of you, so apologies, but it really winds me up when I see developers making this mistake. Still.



**Note:** I also made [this visual aid](/eta).
