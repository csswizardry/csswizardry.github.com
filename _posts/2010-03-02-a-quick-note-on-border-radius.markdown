---
comments: true
date: 2010-03-02 10:34:55
layout: post
slug: a-quick-note-on-border-radius
title: A quick note on border radius
wordpress_id: 853
categories:
- Web Development
tag:
- Border Radius
- CSS3
---

This is a quick post concerning the `border-radius` CSS3 property, and the syntax behind it. After coming across [this site](http://www.border-radius.com/) earlier today via [Twitter](http://twitter.com/csswizardry) I remembered my initial frustrations with lack of uniformity across user agents and their required syntax in order to create round corners; Firefox requiring a different format to Webkit and the CSS3 spec was pretty annoying.







However, it's not all that bad. As border-radius.com would have you believe, the syntax to create an element with top-left and bottom-right corners with a 50px round, and top-right and bottom-left corners with 10px rounds would be:




    
    <code>-webkit-border-radius: 50px;
    -webkit-border-top-right-radius: 10px;
    -webkit-border-bottom-left-radius: 10px;
    -moz-border-radius: 50px;
    -moz-border-radius-topright: 10px;
    -moz-border-radius-bottomleft: 10px;
    border-radius: 50px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;</code>





Wrong, you can actually use the `border-radius` shorthand to nail this in three lines:




    
    <code>-moz-border-radius:50px 10px 50px 10px;
    -webkit-border-radius:50px 10px 50px 10px;
    border-radius:50px 10px 50px 10px;</code>





The syntax follows the following rule: `border-radius:top-left top-right bottom-right bottom-left;`. I've tested this in Firefox (`-moz-border-radius`), Webkit (`-webkit-border-radius`) and Opera (`border-radius`) and [it works just fine](http://csswizardry.com/demos/border-radius/).





## Addendum




You'd think Webkit would just be Webkit, right? Wrong. This works in Chrome but _not_ Safari. I've had reports that Safari 4.0.4 (I guess it's _not found it_, get it? Oh never mind.) doesn't work. Useful...




Still, this version will work, and is still considerably shorter:




    
    <code>-webkit-border-radius: 50px;
    -webkit-border-top-right-radius: 10px;
    -webkit-border-bottom-left-radius: 10px;
    -moz-border-radius:50px 10px 50px 10px;
    border-radius:50px 10px 50px 10px;</code>
