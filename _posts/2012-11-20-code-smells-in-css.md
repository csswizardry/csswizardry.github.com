---
comments: true
date: 2012-11-20 23:58:13
layout: post
slug: code-smells-in-css
title: Code smells in CSS
wordpress_id: 3859
categories:
- Web Development
tag:
- CSS
- Front-end architecture
- OOCSS
meta: The things I look out for when writing or reviewing CSS.
---

Chris Coyier [recently answered](http://coding.smashingmagazine.com/2012/07/13/coding-qa-with-chris-coyier-code-smell-type-grid/) someone’s question:

> How can you tell if your CSS code smells? What are the signs that the code is sub-optional, or that the developer hasn’t done a good job? What do you look for in the code to determine how good or bad it is?

I thought I would extend Chris’ great answer with my own, additional take on things…

My day-to-day life is spent working in-house at BSkyB… I work on big websites, the last of which took me over a year to build the front-end for (and it’s still ongoing). For me, in my world, bad CSS is a very specific and troublesome thing; when you’re working on one site for months on end, you can’t afford poor code, be it CSS or otherwise, and any bad code needs righting.

I’m going to share just a few things (there will, no doubt, be things that I have missed) that I look out for in CSS that will give you and idea as to its quality, its maintainability and its integrity…

## Undoing styles

Any CSS that unsets styles (apart from in a reset) should start ringing alarm bells right away. The very nature of CSS is that things will, well, cascade and inherit from things defined previously. Rulesets should only ever inherit and add to previous ones, never undo.

Any CSS declarations like these:

    border-bottom:none;
    padding:0;
    float:none;
    margin-left:0;

…are _typically_ bad news. If you are having to remove borders, you probably applied them too early. This is really hard to explain so I’ll go with a simple example:

    h2{
        font-size:2em;
        margin-bottom:0.5em;
        padding-bottom:0.5em;
        border-bottom:1px solid #ccc;
    }

Here we’re giving all `h2`s our usual `font-size` and `margin` for spacing, but also a bit of `padding` and a keyline on the bottom edge to visually separate it from the next element on the page. But, perhaps we have a circumstance in which we **don’t** want that keyline, perhaps we have a situation where we want a `h2` to not have that `border` and `padding`. We’d likely end up with something like this:

    h2{
        font-size:2em;
        margin-bottom:0.5em;
        padding-bottom:0.5em;
        border-bottom:1px solid #ccc;
    }
    .no-border{
        padding-bottom:0;
        border-bottom:none;
    }

Here we have ten lines of CSS and one ugly class name. What would have been better is this:

    h2{
        font-size:2em;
        margin-bottom:0.5em;
    }
    .headline{
        padding-bottom:0.5em;
        border-bottom:1px solid #ccc;
    }

Here we have eight lines of CSS, no undoing anything, and a nice, sensible class name.

**As you go down a stylesheet you should only ever be adding styles, not taking away.** If you find you are having to undo styling as you go down your document the chances are you jumped the gun and started adding too much too soon.

This was a very timid example, but it helps illustrate my point perfectly. Imagine CSS like this over tens of thousands of lines… that’s a lot of bloat and a lot of unnecessary undoing. Peg things onto simpler things that came before it, do not start too complex and risk having to undo your work later on; you’ll end up **writing more CSS to achieve less styling**.

As soon as I see CSS that undoes previous styling, I can be pretty sure that it’s because something was poorly architected and that the order in which things were built/written needs a rework.

## Magic numbers

These are a particular bugbear of mine. I _loathe_ magic numbers.

A magic number is a value that is used ‘because it just works’. Take the following example:

    .site-nav{
        [styles]
    }
        .site-nav > li:hover .dropdown{
            position:absolute;
            top:37px;
            left:0;
        }

`top:37px;` here is a magic number; the only reason it works, presumably, is because the `li`s inside `.site-nav` _happen_ to be 37px tall, and the `.dropdown` flyout menu needs to appear at the bottom of it.

The problem here is that 37px is _entirely_ circumstantial and as such, we should place no faith in that number. What if someone changes the `font-size` in `.site-nav` and now everything is 29px tall? This number is no longer valid and the next dev needs to know to update it.

What happens when Chrome _does_ render the `li`s at 37px, but IE renders it at 36px? That number only works in one situation.

Never, _ever_ use numbers just because they work. In this situation we’d be far better off replacing `top:37px;` with `top:100%;`, which basically means ‘all the way from the top’.

Magic numbers have several problems associated with them. As above, they cannot be relied upon, but also, with their very ‘just because it works’ nature, it’s difficult to communicate to another dev where that number came from. If you had a more complex example which used a magic number—and that magic number became invalid—you are faced with one or more of the following problems:

* The next dev doesn’t know where the magic number came from, so they delete it and are back at square one.
* The next dev is a cautious dev who, because he doesn’t know where the magic number came from, decides to try and fix the problem without touching that magic number. This means that an old, outdated, hacky magic number stays in the code, and the next dev simply hacks away on top of it. You are now hacking on top of a hack.

Magic numbers are bad news; they soon become out of date, they confuse other developers, they cannot be explained, they cannot be trusted.

There’s nothing worse than hitting someone else’s code and seeing an inexplicable number. You’re left wondering what the hell it does, why it’s needed and whether or not you should dare touch it.

As soon as I see magic numbers in CSS I start asking questions. Why is this here? What does it do? Why does that number work? How can you achieve the same without that magic number?

**Avoid magic numbers like the plague.**

## Qualified selectors

Qualified selectors are ones like:

    ul.nav{}
    a.button{}
    div.header{}

Basically, selectors who are needlessly prepended by an element. These are bad news because:

* They totally inhibit reusability on another element.
* They increase specificity.
* They increase browser workload (decreasing performance).

These are all bad traits. Those selectors can, and should be:
    
    .nav{}
    .button{}
    .header{}

Now I know I can apply `.nav` to an `ol`, I can apply `.button` to an `input`, and—when the site gets ported over to HTML5—I can quickly swap out my header `div` for a `header` element without worrying about invalidating any styles.

With regards performance, this is only a very slight issue, however it is an issue nonetheless. Why make a browser look for a class `.button` on an `a` when you could just ask it to look for `.button` and be done? By qualifying selectors you are increasing a browser’s workload.

More extreme examples might be:
    
    ul.nav li.active a{}
    div.header a.logo img{}
    .content ul.features a.button{}

All of these selectors can be trimmed down massively, or totally rewritten, to:

    .nav .active a{}
    .logo > img {}
    .features-button{}

Which will help us:

* Save actual amounts of code
* Increase performance
* Allow greater portability
* Reduce specificity

As soon as I spot overqualified selectors when I scroll down a stylesheet I instantly want to know why they’re written so verbosely and how we can trim them down to as short as possible.

## Hard-coded/absolute values

Not unlike magic numbers, hard-coded values are also bad news. A hard-coded value might be something like this:
    
    h1{
        font-size:24px;
        line-height:32px;
    }

`line-height:32px;` here is not cool, it should be `line-height:1.333`…

Line heights should always be set relatively in order to make them more forgiving and flexible. If you ever change the `font-size` of a `h1`, you want to know that your `line-height` will track it. Not having a relative `line-height` means that if you ever need to modify a `h1` you will likely end up with something like this:
 
    h1{
        font-size:24px;
        line-height:32px;
    }
    
    /**
     * Main site `h1`
     */
    .site-title{
        font-size:36px;
        line-height:48px;
    }

Here we need to keep on adding fixed `line-heights` indefinitely as our initial one was never flexible enough. With a unitless and/or relative `line-height`, we’d have simply needed:
 
    h1{
        font-size:24px;
        line-height:1.333;
    }
    
    /**
     * Main site `h1`
     */
    .site-title{
        font-size:36px;
    }

This may not seem like a massive difference, but on every text element over a large project, this has a big impact.

**N.B.** this applies to a _lot_ more than just `line-heights`; basically _any_ hard-coded absolute in a stylesheet needs treating with caution and suspicion.

Hard-coded values are not very future proof, flexible or forgiving, and thus should be avoided. The only things that should ever _really_ have hard-coded values are things like sprites which will _always_ need to be a certain size no matter what.

As soon as I see a hard-coded unit in a stylesheet I want to know why it was required and how it could be avoided.

## Brute forcing

This one is in a similar vein to hard-coded numbers, but a little more specific. Brute forcing CSS is when you use hard-coded magic numbers and a variety of other techniques to force a layout to work. Take for example:

    .foo{
        margin-left:-3px;
        position:relative;
        z-index:99999;
        height:59px;
        float:left;
    }

This is _terrible_ CSS. All of these declarations are heavy-handed, brute-forced, layout-affecting declarations which are _clearly_ only used to force something to render as and where it’s wanted.

This type of CSS is indicative of either a poorly coded layout that requires this kind of manipulation, a lack of understanding of box-model and layout, or both.

Well coded layouts should never need brute-forcing, and a _solid_ understanding of box model, layout and taking a look at your computed styles more often should mean that you’d rarely end up in a situation like this.

As soon as I see brute-forced CSS I want to know how it happened, and how far back we need to unpick things before we can lay things out more rationally.

## Dangerous selectors

A ‘dangerous selector’ is one with far too broad a reach. A really obvious and simple example of a dangerous selector might be:

    div{
       background-color:#ffc;
       padding:1em;
    }

This will instantly scream at any developer; why on earth would you want to carpet bomb every `div` on your site? Good question, so why would anyone ever want to have a selector like `aside{}` for example? Or `header{}`, or `ul{}`? Selectors like these are way, _way_ too far reaching and will ultimately lead to us having to undo CSS, as per the section previously.

Let’s look at the `header{}` example more closely…

A lot of people use a `header` element to mark up their site’s main header—which is fine—however, if you style that site-wide header like this:

    header{
        padding:1em;
        background-color:#BADA55;
        color:#fff;
        margin-bottom:20px;
    }

…then that’s not so fine. The `header` element **does not** mean ‘your site’s main header’ and, as per the spec, the `header` element can be used multiple times in multiple contexts. This should be targeted via a selector more like `.site-header{}`, for example.

To give such specific styling to such a generic selector is dangerous. Your styles will leak out into areas they shouldn’t as soon as you start trying to use that element again, and you’ll need to start undoing styles (adding more code to take styles away) in order to combat this.

Make sure your selectors have good [selector intent](http://csswizardry.com/2012/07/shoot-to-kill-css-selector-intent/).

Take the following:

    ul{
        font-weight:bold;
    }
    header .media{
        float:left;
    }

As soon as I see selectors that end in either a type selector or a very basic abstraction class, as above, I start to panic. I know that these selectors are far too broad and will quickly run us into trouble. As soon as we try and reuse those elements we will find that they’re inheriting styles we don’t necessarily want because, somewhere, there’s a really broad selector managing to reach them.

## Reactive `!important`

`!important` is fine. It’s fine and it’s a, well, _important_ tool. However, `!important` should only be used in certain circumstances.

**`!important` should only ever be used proactively, not reactively.**

By this I mean that there are times when you know you will always, _always_ want a style to take precedence, and you will know this up front.

For example, you know that you will _always_ want errors to be red, so this rule is totally fine:

    .error-text{
        color:#c00!important;
    }

If the error occurs in a `div` where the text is always blue, we can be confident that we want to break that rule in the case of errors. We _always_ want errors to be red because it’s an error, and user messaging should always remain consistent. Here we can proactively add `!important` because we know we always want errors to be red.

Where `!important` is _bad_ is when it is used reactively, that is to say, it’s been used to get someone out of a specificity problem, or they’re in a bit of a bind and resort to `!important` to force things to work. This is using `!important` reactively and this is bad news.

Using `!important` reactively is just a way of circumventing the problems caused by ill-formed CSS. It doesn’t fix any problems, it only fixes the symptoms. The problems still exist, but now with and added layer of super-specificity that will take yet more specificity to overcome.

I have no qualms whatsoever with `!important`, as long as it has been used proactively. As soon as I see reactive use of `!important` I know right away that it’s likely because of some poorly architected CSS, and that the solution is a refactor, not a hasty addition of heavy-handed specificity.

## IDs

This one is very specific to me, and to larger teams. [I have written before about how IDs are a bad idea](http://csswizardry.com/2011/09/when-using-ids-can-be-a-pain-in-the-class/) because of their heightened specificity; they are of no use to anyone and should **never be used in CSS**. Use IDs in HTML for fragment identifiers and JS hooks, but never in CSS.

The reasons are simple:

* IDs can _never_ be used more than once in a page.
* Classes can exist only once, or a million times in a page.
* IDs can often have their traits abstracted out into many reusable classes.
* [An ID is **255 times** more specific than one class…](http://codepen.io/chriscoyier/pen/lzjqh)
* This means you’d need **256 chained classes to override one ID**.

If that last bullet point hasn’t convinced you not to use them then I don’t know what will…

As soon as I see an ID in a stylesheet, I want it replaced with a class. Specificity is how projects start to spiral so it is vital to keep it low.

Fun exercise: try **_elegantly_** solving [this problem](http://jsfiddle.net/csswizardry/9wGac/). Clue: [this isn’t elegant](http://jsfiddle.net/csswizardry/9wGac/1/), [nor is this](http://jsfiddle.net/csswizardry/9wGac/2/).

## Loose class names

A ‘loose’ class name is one that isn’t specific enough for its intended purpose. Imagine a class of `.card`. What does this do?

This class name is very loose, and loose class names are very bad for two main reasons:

* You can’t necessarily glean its purpose from the class alone.
* It’s so vague that it could very easily be redefined accidentally by another dev.

The first point is the simplest; what does `.card` mean? What does it style? Is it a Trello-esque concept where a card is a component? Is it a class that you add to a playing card on a poker website? Does it refer to an image of a credit card? It’s difficult to know, because it’s far too loose. Let’s imagine it means credit card; this class would have been much better had it been `.credit-card-image{}`. A lot longer, yes; a lot better, hell yes!

The second problem with loose class names is that they can very easily be (accidentally) reassigned/redefined. Let’s say you’re working on an commerce site using `.card` again, and it refers to the user’s credit card linked to their account. Now imagine another dev comes along and wants to add some functionality whereby you can send a purchase to someone as a present, with the option to add a card with a message on it. Their temptation might be to use `.card` again somewhere, which is _wrong_, but in certain (albeit unlikely events) this could lead to your `.card` class being redefined and overwritten.

All this can be avoided by using much stricter class names. Classes like `.card` and `.user` and suchlike are far too loose, making them hard to quickly understand, and easy to accidentally reuse/override.

As soon as I see loose class names I start having to work out what it actually refers to, and asking what we can rename it to. Class names should be as specific as possible.

## Final word

So there we have it, just a few of the _many_ things I perceive to be code smells in CSS. These are things that I look out for on a daily basis and strive to avoid at all costs. When working on larger projects that last for months and months (and, ultimately, years) it is _vital_ to keep a tight ship, and keeping an eye out for the above—among other things—is paramount. (I can’t stress enough how small a sub-set of things this is; there is a _lot_ more that I look out for.)

Now, of course, there _are_ exceptions to every rule, but they will need assessing on a case by case basis. For the most part, however, these are all things I work hard to avoid, and can spot a mile off in CSS.
