---
comments: true
date: 2012-05-15 19:35:38
layout: post
slug: keep-your-css-selectors-short
title: Keep your CSS selectors short
wordpress_id: 3649
categories:
- Web Development
tag:
- CSS
- CSS Selectors
- Front-end architecture
- OOCSS
- Performance
---

One thing I believe, as a very, _very_ general rule of thumb, is that as sites get bigger, selectors should get shorter.

By this I mean that if you want to create extensible and maintainable, flexible and predictable websites, you should really take care to make your CSS selectors as dev-friendly as possible; i.e. short.

Keeping CSS selectors short helps with a lot of things:

* Increases selector efficiency
* Reduces location dependency
* Increases portability
* Reduces chances of selector breakage
* Decreases specificity
* Can make code more forgiving

This is a very vague list, so I’m going to address each in order. You will find that there is a lot of crossover between each point (e.g. reducing location dependency inherently means your selectors are more portable) but I feel they are all points in their own right.

## Increases selector efficiency

I have written before about CSS selector efficiency. I’m going to gloss over a lot of the intricacies in this post so for a full background understanding I recommend you read [Writing efficient CSS selectors](http://csswizardry.com/2011/09/writing-efficient-css-selectors/) first.

If we ignore actual types of selector (`*{}` is typically the slowest, depending on how it’s being used, IDs are the fastest followed by classes, descendants are comparably quite slow followed by pseudo-selectors) then _in general_ it is safe to say that shorter selectors are faster.

This stands to reason, if we compare these two selectors:

    html body .header .nav{}
    .nav{}

There we can see pretty clearly that in the first example, the browser has to look out for four things, the `.nav` class, then the `.header` class, then the `body` element and then, finally, the `html` element (browsers read selectors right-to-left).

With the second example the browser only needs to look for one thing; the `.nav` class. The browser has _four times_ less work to do to match that selector. Every time you write a selector try and trim as much losable stuff from it as possible. Instead of `ul.nav{}` (two checks) write `.nav{}` (one check). Instead of `.nav li a{}` (three) write `.nav a{}` (two).

Now, [CSS selector performance is—by-and-large—not something we _really_ need to worry about any more](http://calendar.perfplanet.com/2011/css-selector-performance-has-changed-for-the-better/), but that doesn’t mean we should be wasteful. I’m sure none of us would miss a lost £5 but that doesn’t mean we go slipping banknotes into paper shredders… Selector efficiency _does_ exist and you might as well improve it where you **very easily** can.

## Reduces location dependency

By keeping selectors short you are likely to be reducing the amount of descendant (e.g. `.sidebar .promo{}`) and child (e.g. `.sidebar > .promo{}`) selectors. By removing these descending types of selectors you are reducing the necessity for an element to live inside another one. Let’s reuse the `.sidebar .promo{}` example…

By having a selector like `.sidebar .promo{}` we are saying we want to target any promotional item that lives in an element with the class of `.sidebar`. This means that we are tied to always using that styling inside a certain element; we have a dependency on location.

By replacing `.sidebar .promo{}` with something like `.secondary-promo{}` we can now place the element in question _anywhere_ we wish. In the sidebar—as before—but now also in the footer, or in the header, or after an article.

By reducing descendants we can really reduce dependency and make things a lot more portable…

## Increases portability

So now that we’re not tied to locationally dependant selectors, we find that our components are a lot more portable. We can move things a lot more easily because our CSS doesn’t care where a thing lives, it just cares that it exists. Awesome!

Another way to increase portability is to not qualify selectors. A qualified selector is one like `ul.nav{}` or `a.button{}` or `div.content{}`.

Qualified selectors are bad because they reduce efficiency (more checks than we really need) but—more importantly—because they tie us to specific elements. We can’t now use that `.button` class on an `<input>` or a `<button>`, for example. We can’t [apply `.nav` to an `<ol>` to make a breadcrumb](http://csswizardry.com/2011/09/the-nav-abstraction/).

**Selectors should be element-agnostic**. Your CSS shouldn’t care what element you’re wanting to apply styling to.

Another way to make selectors more portable is to drop elements _altogether_. Take this, for example:

<pre><code><span class="code-comment">/* Base widget styling */</span>
.widget{}

<span class="code-comment">/* Style up widget titles */</span>
.widget > h2{}</code></pre>

Here we have a troublesome selector; what if that `<h2>` needs to become a `<h3>`? What if we need to add another, non-titling `<h2>` as a child of `.widget`? We’ve made ourselves a very rigid and unportable selector here. Instead we should have:

<pre><code><span class="code-comment">/* Base widget styling */</span>
.widget{}

<span class="code-comment">/* Style up widget titles */</span>
.widget-title{}</code></pre>

Now we can apply `.widget-title` to _any_ element—let’s say a `<h4>`—and can now also have any number of unclassed `<h4>`s in the widget without them adopting any title styling. Ossom!

## Reduces chances of selector breakage

The longer a selector is, the more things the browser has to satisfy before it can match it. The more checks there are then—naturally—the more chance there is for something to go wrong.

A (very exaggerated) selector like `body > div:nth-of-type(2) > article:first-child > p:first-child{}`—borrowed from my talk [Breaking Good Habits](https://speakerdeck.com/u/csswizardry/p/breaking-good-habits?slide=15)—has _ten_ checks; ten things that must be satisfied in order for the browser to make that match.

All that needs to happen is the location of the `div:nth-of-type(2)` to change or the `p:first-child` to become a `blockquote` or the `article:first-child` to no longer be a child of the `div:nth-of-type(2)` or _any manner_ of things before that selector will break. Simply replacing that with a class of `.intro{}` means that there is only one thing that could possibly break, and the chances of that happening are pretty much zero (you’d have to explicitly delete the class from your HTML to prevent a match).

Shorter selectors mean there is statistically less chance for things to go wrong.

## Decreases specificity

This is the big one! This is where it really matters!

Longer selectors have a higher specificity. Specificity is a nightmare and **you should keep specificity as low as possible all of the time**. We already know that we [**do not use IDs in CSS**](http://csswizardry.com/2011/09/when-using-ids-can-be-a-pain-in-the-class/) but a chain of selectors are often just as bad (though not quite).

A selector like `.widget > h2{}` has a higher specificity (as well as the other problems we discussed) than a selector like `.widget-title{}`.

`.nav li a{}` has a higher specificity than `.nav a` (and is also less efficient). Reducing selector length reduces selector specificity and that is **very important**. High specificity leads to self-induced specificity battles that can only be won by making subsequent selectors _more_ specific (or using `!important`, shame on you). This is a terrible thing. The easiest way to reduce specificity (after _dropping IDs from your CSS **completely**_) is to keep your selectors short.

## Can make code more forgiving

This is a very specific but very decent example of how short selectors can make code more forgiving. However, I will warn you, you can argue two sides of what I’m about to tell you; you can argue that it makes your code a lot more flexible and can gracefully handle breakages **or** you could argue that it allows breakages in the first place by being too lenient. Anyway, here’s a true story…

In working on a pretty huge project at Sky I stuck to my own rules and coded a (vertical) nav bar CSS like so:

<pre><code>.nav{ <span class="code-comment">/* Nav styles */</span> }

<span class="code-comment">/* Note NO .nav li styles as this was a vertically stacking nav. */</span>

.nav a{ display:block; <span class="code-comment">/* More styles */</span> }</code></pre>

Now, there was a CMS error which went undetected where the markup getting spat out was:

    <ul class=nav>
        <a href=#></a>
        <a href=#></a>
        <a href=#></a>
        <a href=#></a>
    </ul>

Spot the problem? No `<li>`s! This is _really_ not cool **but**, as I had used `.nav a{}` instead of `.nav li a{}` nothing broke. My code was a lot more forgiving than if I’d had that third check in there.

Now, this doesn’t make the markup right, and it does actually _allow_ poorer markup than a more verbose selector, but you can see how the CSS was very forgiving of a markup error.

Now I said you could argue both sides here, a more verbose selector means that we’d have spotted the CMS error immediately as no styles would have hit the `<a>`s. But! In the same breath, our CSS was flexible enough to be okay with that. Make of it what you will, because I too am sat on the fence and a little disappointed that the error wasn’t spotted, but here is a very specific example of how shorter selectors can lead to more forgiving CSS.

## Final word

I did mention that this is a rule I’ve applied to larger sites but, honestly, you should apply this everywhere. The things we’ve discussed tend to really come into their own (and their absence painfully aware) on larger builds, but they will definitely, _definitely_ help you on builds of all sizes; small or large.

So, by using more classes and less descendants, keeping selectors short and portable, keeping selectors element-agnostic and generally considering maintenance and chance-of-change when writing our CSS, we can really easily improve the quality of our code infinitely. We can make things more efficient, more forgiving, more flexible and more reusable just by revisiting one of the most simple and fundamental aspects of CSS; our selectors.
