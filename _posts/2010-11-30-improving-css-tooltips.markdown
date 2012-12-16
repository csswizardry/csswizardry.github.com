---
comments: true
date: 2010-11-30 23:55:27
layout: post
slug: improving-css-tooltips
title: Improving CSS tooltips
wordpress_id: 1805
categories:
- Web Development
tag:
- CSS
- CSS3
- Progressive Enhancement
---

But only very slightly... [Jack Osborne](http://twitter.com/jackosborne), whom I have followed on Twitter for a while now, posted some time ago [a tooltip tutorial](http://jackosborne.co.uk/articles/css-tooltips-with-the-pseudo-element/) whereby you utilise the `:after` CSS pseudo-element and the `attr()` function to populate it. His method works by giving an element a `title=""` attribute and a class of `tooltip`, and placing the content of the title attribute after the content, all through CSS.

The only _technical_ downside I can see here is the necessity for that class. Using a simple attribute selector we can ditch that and basically say 'if any element has a title, put that title after it in CSS'. By simply using `[title]` over `.tooltip` we can automate the process and trim some bytes, thus:


    
    <code><a href="http://twitter.com/jackosborne" title="Follow Jack Osborne on Twitter">Jack Osborne</a>
    
    
    [title]{
    	position:relative;
    }
    [title]:after{
    	content:attr(title);
    	color:#fff;
    	background:#333;
    	background:rgba(51,51,51,0.75);
    	padding:5px;
    	position:absolute;
    	left:-9999px;
    	opacity:0;
    	bottom:100%;
    	white-space:nowrap;
    	-webkit-transition:0.25s linear opacity;
    }
    [title]:hover:after{
    	left:5px;
    	opacity:1;
    }</code>
