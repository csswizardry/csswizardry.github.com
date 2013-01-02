---
comments: true
date: 2011-05-31 20:13:32
layout: post
slug: font-sizing-with-rem-could-be-avoided
title: Font sizing with rem could be avoided
wordpress_id: 2770
categories:
- Web Development
tag:
- CSS
- CSS3
- Typography
---

Jonathan Snook [wrote recently](http://snook.ca/archives/html_and_css/font-size-with-rem) about the new font-sizing unit `rem`. Whilst I do find it interesting and potentially useful I do think it possibly solves a problem that doesn’t actually exist…

**N.B.** This article isn’t a response to Jonathan’s, nor am I calling him out, he just happened to have laid some nice foundations with his article that allow me to use it as a base. It is worth noting further that Jonathan a) uses px to declare font-sizes anyway and b) does start with the base he intends to use. This article _isn’t_ a response to his.

Jonathan uses the example:

    body { font-size:62.5%; }
    h1 { font-size: 2.4em; } /* =24px */
    p  { font-size: 1.4em; } /* =14px */
    li { font-size: 1.4em; } /* =14px? */
    li li, li p /* etc */ { font-size: 1em; }
Here he sets his base font-size to 10px then creates a `h1` size of 24px, `<p>`s and `<li>`s of 14px and then children of `<p>`s and `<li>`s at 1em, also 14px.

Here is a problem that developers continuously cause themselves. It’s clear here that, although he sets a body font-size of 10px, the actual base font-size is 14px. Therein lies the problem.

Creating a base font-size that you don’t actually need means you have to redefine nigh on every element to take on the size you _do_ want--you’re creating a rule that you don’t even want and it’s causing you work…

If you want your base font-size to be 14px then set your `<html>` at `0.875em` and you’re done. If you want a 24px `<h1>` then your CSS is simply `h1{ font-size:1.714em; }`.

## The problem with 62.5%

The 62.5% trick is a common one, and does have its uses in two circumstances:

1. You want simpler maths, for example if you are building an elastic layout (`width:30em;` == `width:300px;`)
2. You _actually_ want a base font-size of 10px

If you are doing neither of these then be kind to yourself and set the base you _actually_ want.

The main reason people reset the font-size to 10px is point one; to make maths easier. If your quasi-base is 10px and you want an actual base of 12px it’s simply 1.2em. The maths _is_ easier, we can work with units of ten more easily, but that comes at the cost of maintainability.

If you set your quasi-base at 10px and you want your body copy to be 12px, you have to style every single element that falls under ‘body copy’ individually. Hence Jonathan’s giving font-sizes to list items and paragraphs. This means you’re writing more code than you need and also leads to nasty inheritance problems; problems that rems are supposed to fix. A `<p>` in an `<li>` will be 1.2x12px, whereas it still only needs to be 12px.

If you were to just set your base _at_ 12px in the first place (`body{ font-size:0.75em; }`) then:

1. You don’t need to define every element individually; you style the exceptions rather than rewriting the rule.
2. You don’t get crazy-annoying inheritance issues.

## Being lazy is causing you more work

The main reason, I feel, behind using the 62.5% method is laziness, and that’s a good thing. Good developers are lazy. However that laziness is misguided; it’s actually causing you more work. You have to define font-sizes on all elements rather than just once and letting them inherit _and_ you have to tackle those horrible inheritance issues when an explicitly sized element is placed inside another one.

When setting the base font-size correctly and only once the maths isn’t as nice, I’ll admit. With the 62.5% trick a font is an even ten times its em unit (2.4em = 24px, 5em = 50px and so on). With setting your base to what you actually want the chances are you _will_ end up with a not-as-nice number. If you want your base to be 16px then 2.4em = 38.4px, 5em = 80px. It’s a little more work in your calculator app, but it’s a lot less work when it actually comes down to build.

CSS Wizardry has a base of 16px, so I just leave it at `font-size:100%;`. 16px is the rule, headings are the exception. As such I only need to redefine font-sizes on headings.

My maths is a little harder, my coding is a breeze…

So by all means start using `rem`s, they seem pretty interesting, but it may just be solving a problem you don’t even have…
