---
comments: true
date: 2010-12-06 20:54:23
layout: post
slug: css-camel-case-seriously-sucks
title: 'CSS: CamelCase Seriously Sucks!'
wordpress_id: 1867
categories:
- Web Development
tag:
- CSS
- Syntax
---

Now, I know this is going to instantly ruffle some feathers, but I'm not _normally_ one to tell you how to write your code. Sure, [I dislike single-line CSS](http://www.venturelab.co.uk/devblog/2010/10/i-wont-tell-you-how-to-write-your-css/), but as long as your code is clean, sensible, understandable and consistent then there's not too much to complain about. The most important of these--in my eyes--is consistency. There is however one method that, straight off the bat, is instantly and inherently inconsistent... camel case.



## CSS is a hyphen-delimited syntax



CSS is a hyphen-delimited syntax. By this I mean we write things like `font-size`, `line-height`, `border-bottom` etc. So why then would you introduce another format?


    
    <code>#introPassage{ <span class="code-comment">/* Using one format here */</span>
      font-style:italic; <span class="code-comment">/* And another here */</span>
    }</code>



You just shouldn't mix syntaxes; _it's inconsistent_.



### XHTML is a lower-case language



Furthermore is the inconsistency of placing a mix of upper- and lower-case classes/IDs in a lower-case syntax. Example:


    
    <code><img src="/img/people/harry-roberts.jpg" alt="A picture of Harry Roberts" class="userImageAvatar" /></code>



Here we mix lower-case syntax and plain English content with something that is neither.



### Inconsistency within your own rules



Camel case also adds the scope for inconsistency within your own defined rules. This might be very anal, but take the following:


    
    <code>#content{ ... }
    #subContent{ ... }</code>



There we have two elements used as generic content containers, but one is referred to as `content`, and the other as `Content`. Huh?!



## It's harder to read





But what about underscores?



Camel case is harder to read. Whitespace between words makes them far more legible. We can't have spaces in CSS, so we use hyphens instead. Compare the following:


    
    <code>#someIdIMadeEarlier{
      font-size:2em;
    }
    
    #some-id-i-made-earlier{
      font-size:2em;
    }</code>



I think it's hard to argue that the second is not more readable...



### Scannability



Also there's the issue of scannability, an important factor when writing code. Let's look at the following code:


    
    <code>.navHome a { ... }
    .navAbout a{ ... }
    .navPortfolio a{ ... }
    .navContact a{ ... }
    
    .nav-home a { ... }
    .nav-about a{ ... }
    .nav-portfolio a{ ... }
    .nav-contact a{ ... }</code>



I personally find the second far easier to scan if I'm looking for a particular `nav-` prefixed class.



## Hyphens work better in text editors





This has been true of every text editor I have used.



This is an odd one, but one that definitely, _definitely_ irks me. I can't `Ctrl+Shift+[Arrow key]` single words in a camel case string. Take the following screenshot:

![Selecting camel case strings](http://csswizardry.com/wp-content/uploads/2010/12/camel-case-select.gif)

Here I use the Ctrl+Shift+Left arrow keys to select chunks of text--rather than one character--at at time. The problem here is that the camel case string is treated as one word. What if I just wanted to select `tweet` and change it to `facebook`? I  can't do that with `Ctrl+Shift+[Arrow key]`

With the hyphen delimited version, we get:

![Selecting hyphenated strings](http://csswizardry.com/wp-content/uploads/2010/12/hyphen-select.gif)

This is far nicer as we can select individual parts of a string with ease. Changing `tweet` to `facebook` here could not be simpler.



### Underscores?



I mentioned underscores above; this also poses the same problems with inconsistency and with the inability to select individual segments of a string.



## Final word



The thing to remember is _consistency is key_. The syntax of a language has already been decided for you; you might as well stick with it!
