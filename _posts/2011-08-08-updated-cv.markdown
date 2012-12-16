---
comments: true
date: 2011-08-08 11:00:38
layout: post
slug: updated-cv
title: Updated CV
wordpress_id: 3005
categories:
- Personal
tag:
- CSS
- CV
- HTML
---

Last week I got round to updating [my CV](/cv/), adding on my new job at Sky. I decided to take the opportunity to do something a little different with it this time round.

Being a web developer, with a strong focus on CSS, I chose to make the CV relevant by writing it as (obviously made-up/invalid) CSS.

Initially I actually just wrote everything out in one giant `<pre>` with `<span>`s just for colouring in, a little like this:


    
    <code><pre>
    /*------------------------------------*\
        PERSONAL
    \*------------------------------------*/
    #me{
        name:"Harry Roberts", Harry;
        age:21years;
    }
    ...
    ...
    </pre></code>



So far in I thought that that seemed a little too easy/lazy, and it also came with the massive issue of not being semantic, meaningful or just plain proper markup. A CV is a series of headings and lists, not a single block of preformatted text.

I got to work rewriting, refactoring and tidying and marked it all up properly, and moved any braces, comments and quotes etc out of the HTML and into the CSS making [massive use of the `content:;` property](http://csswizardry.com/2010/09/keeping-code-clean-with-content/).

The resulting document is a semantically sound, properly marked up CV that is transformed into a CSSesque appearance using, well, CSS.

CSS is so humbly powerful...

So, what does anyone think? Good idea? Too novelty? Seen any other cool developer CVs?

**N.B.** it may be worth noting that even though I've updated my CV, I'm not looking for a new job.
