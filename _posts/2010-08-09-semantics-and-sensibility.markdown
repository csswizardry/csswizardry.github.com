---
comments: true
date: 2010-08-09 16:34:46
layout: post
slug: semantics-and-sensibility
title: Semantics and sensibility
wordpress_id: 1309
categories:
- Web Development
tag:
- HTML
- Markup
- Semantics
---

For a while now, sensible naming conventions and semantics have been confused. Things such as `class="left"` or `class="clear"` have been deemed insemantic, whereas in reality, semantics really doesn't stretch that far… Let me illustrate with some code examples:





## Insemantic code




The following code is just plain wrong, it's insemantic, using the wrong elements for the wrong job:



    
    <code><div class="nav-link"><a href="/">Home</a></div>
    <div class="nav-link"><a href="/about/">About</a></div>
    <div class="page-title">About</div>
    <div>This is some page text about some stuff...</div></code>





## Insensible code




This code is perfectly semantic, it just uses some silly classes:



    
    <code><div class="border">
      <h2 class="red">This is a heading</h2>
    </div></code>





## Semantics concerns itself with elements...




...and not the names assigned to them. Using the correct element for the correct job is as far as semantics goes. Standards concerning naming of those elements is all about _sensibility_.





Semantics sets a standard from which it is very difficult to stray. Headings are marked up with a `<h1-6>`, a list with `<ul/ol/dl>` and so on. You cannot, however, define a convention for naming the IDs and classes of these. `<div id="contact">`, `<div id="kontact">` and `<div id="contact-info">` all bear different names, but are all equally as semantic. All three are examples of semantic _and_ sensible code.





However, take the following examples: `<div id="bottom">`, `<div id="lower-area">` and `<div id="b">`. These examples exhibit semantic code, but with insensible namings.





### Be sensible, for our sake




Semantics should be adhered no matter what--web standards are good. Naming however is totally down to you, you can call your elements whatever you wish. `<div id="a">`, `<div id="b">` and `<div id="c">` are all possible, but not sensible.





> "Always code like you're working in a team, even when you're not."





I have actually seen markup like this, and the developer's reasoning was 'I like to keep my markup as lean as possible, and I know what `a`, `b` and `c` do'.




While this is all correct, and passable, it's not really very sensible. He might know what `a`, `b` and `c` do, but what about the person who inherits the project? For all his justification of code bloat was somewhat advanced (_really_ decreasing markup size), the impression the next guy to see his code will have will be 'WTF was this guy thinking?!' Always code like you're working in a team, even when you're not.





## Final word





> "An ID/class should be as short as possible but as long as necessary.--[Jens Meiert](http://meiert.com/en/blog/20090617/maintainability-guide/)





Semantics and sensibility are not the same. Anyone who tells you that `class="left"` is insemantic is wrong. Be semantic and be sensible. Pick names which are descriptive. An ID/class should be as short as possible but as long as necessary.
