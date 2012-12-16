---
comments: true
date: 2010-09-27 21:37:07
layout: post
slug: keeping-code-clean-with-content
title: Keeping code clean with content
wordpress_id: 1388
categories:
- Web Development
---

The CSS `content` property is one that has been around for a while. It's not new, nor is it particularly ground-breaking. It is however, at least in my opinion, extremely useful and extremely underused. For those not in the know, `content` sets, well, the content of an element via CSS. That is to say it gets rendered in the page but doesn't appear in the markup. Coupled with the `:before` or `:after` pseudo-elements you can prepend or append content to an element respectively:




    
    <code><span class="code-comment">/* Add a pilcrow before paragraphs */</span>
    p:before{
      content:"¶ ";
    }
    <span class="code-comment">/* Add a bullet after the last paragraph */</span>
    p:last-of-type:after{
      content:" •";
    }</code>



The benefit of this is that things that are technically stylistic that could only really be placed in the markup in order to make an appearance can actually be 'injected' into the page through CSS. This keeps your code free from any stylistic markup that adds non-semantic value, and means that any markup-like elements are added through the stylesheet.

A particular example I have been using lately is simply:


    
    <code><span class="code-comment"><!-- Markup --></span>
    <dl>
      <dt>Name</dt>
      <dd>Harry</dd>
      <dt>Age</dt>
      <dd>20</dd>
    </dl>
    
    <span class="code-comment">/* CSS */</span>
    dt:after{
      content:":";
    }</code>



The great thing here, and this is _extremely_ die-hard web standards and semantics, is that an item's title is not _technically_ 'Name:' or 'Age:', rather it is just 'Name' and 'Age'. The colon is, if you are being very anal, just stylistic.

Also, another benefit is data-purity in a database. Imagine, for whatever reason, you're populating that `<dl>` from a database, you might end up storing 'Name:' and 'Age:' in there as opposed to the more clean and accurate 'Name' and 'Age'. Either that or your markup might look something like:


    
    <code><dl>
      <dt><?=$userNameTitle; ?>:</dt>
      <dd><?=$userName; ?></dd>
      <dt><?=$userAgeTitle; ?>:</dt>
      <dd><?=$userAge; ?></dd>
    </dl></code>



Notice the trailing colons on the `<dt>`s? This can be avoided simply by utilising the `content` property.



## Encoding



One point I will make is that, for certain symbols, you might need to encode them in the CSS file. If you know the symbol's numeric value (e.g. an em dash is `&#151;`) simply fire it into [this converter](http://www.evotech.net/articles/testjsentities.html) and paste the result into your CSS:


    
    <code>h2:after{
      content:"\0097"; <span class="code-comment">/* Add an em dash after headings */</span>
    }</code>
