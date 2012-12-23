---
comments: true
date: 2012-07-16 18:11:31
layout: post
slug: quasi-qualified-css-selectors
title: Quasi-qualified CSS selectors
wordpress_id: 3745
categories:
- Web Development
tag:
- CSS
- CSS Selectors
- Front-end architecture
- OOCSS
---

This is a bit of an odd post in that the first half deals with qualified selectors, what they are and how they’re bad; the second half is more of a thinking-out-loud tip/trick than anything really substantial or interesting. Let’s see what you make of it...

One really basic way to make your CSS much nicer to work with is to avoid (over) qualified selectors. That is to say, it’s better to write `.nav{}` than `ul.nav{}`. This is for a variety of reasons, chiefly in that—with the _former_ syntax—you can use `.nav` on anything at all, be that a `ul` or an `ol` and, secondly, it also keeps your specificity nice and low. Having an element prefixing the class selector bumps up its specificity unnecessarily and specificity is one of the easiest ways to get your project into a mess; keeping it as low as possible at all times is a very good idea.

For a decent (and very timid) example of how qualifying selectors impacts specificity, take a look at [this fiddle](http://jsfiddle.net/csswizardry/WTmwh/). Here we can see that the qualified `div.promo{}` selector trumps the `.special-promo{}` selector. A sub-optimal fix would be to [qualify the second selector](http://jsfiddle.net/csswizardry/WTmwh/1/). This is no good, because this will just go on and on and on… What we need to do is [_avoid qualifying selectors altogether_](http://jsfiddle.net/csswizardry/WTmwh/2/).

So in short…

* You should never (over) qualify selectors because…
* …qualified selectors, by their very definition, can’t be used on other elements…
* …and qualified selectors increase overall specificity. Bad!
* But sometimes selectors _are_ only ever meant for use on only one type of element…
* …but you still shouldn’t qualify that selector for specificity reasons.
* How do you denote that a selector is to be used on a particular element without _actually_ qualifying it?

To start, a simple enough rule to follow; don’t qualify your selectors. This keeps classes **element agnostic** and keeps specificity low. Awesome!

Sometimes though, you can only really use a class on one element. A well abstracted class should be usable on a variety of elements, but oftentimes you have a class that can only ever really be used on one thing. How can you communicate this in your stylesheet without qualifying your selector? Let’s take an example…

Let’s say I have [the media object](http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/) in my project. The media object is element agnostic, as all good CSS should be. I know I can apply this to any element(s) that need to adopt that visual construct. This means my CSS only ever needs to read (actual styles omitted for brevity):

    .media{
        [styles]
    }
        .img{
            [styles]
        }
        .body{
            [styles]
        }

Here I don’t need to mark the classes for use on any specific elements because they can be used on (almost) anything. My CSS doesn’t care about my HTML and **this is a very good thing**.

However, what happens when I have a class like this:

    .product-page{
        [styles]
    }

Now, to look at, you can guess that this class probably belongs on a high-level container on a product page, but which one? The `html` element? The `body`? A wrapper `div`? The main content area? Well there are several ways I could communicate this to another developer (or myself, in six months time). Let’s, for this example, assume this class should be applied to my `html` element.

The first and most obvious solution to our problem might be do simply have this CSS:

<pre><code><mark>html</mark>.product-page{
    [styles]
}</code></pre>

Now I can immediately see that this class belongs on our `html` element. But here I have unnecessarily increased my specificity. Not by much, but by more than I need to, and more than I ever should. How can I tell the next developer that this class should only go on the `html` element?

Perhaps like this?
    
<pre><code><span class="code-comment">/* Apply this class to the HTML element on a product page. */</span>
.product-page{
    [styles]
}</code></pre>

Which definitely works, but it’s a lot to write. A lot more than we need to, and you can’t glean that information at a glance.

A thing I’m considering starting doing is this:

<pre><code><span class="code-comment">/*html*/</span>.product-page{
    [styles]
}</code></pre>

I write the element in a _comment_ so that it reads properly (a `html` element with a class of `.product-page`) but without altering the specificity at all.

## Risk?

The obvious problem with this is that, if you work in a team, you will have to make sure all devs understand and follow this convention. You need team buy-in before being able to start using this kind of notation so that any devs encountering it understand that this has meaning and isn’t simply some commented out/redundant code.

So yeah, just an idea I’m toying with in order to quasi-qualify some selectors that _are_ intended for use on a specific element but without altering that selector’s specificity.
