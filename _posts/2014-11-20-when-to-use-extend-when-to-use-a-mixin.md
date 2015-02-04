---
layout: post
title: "When to use @extend; when to use a mixin"
date: 2014-11-20 16:15:48
categories: Web Development
meta: "When is it suitable to use Sass @extend or mixin features, and why?"
---

This is a question I get asked a lot by my clients: <q>When should we use a
mixin, and when should we use `@extend`?</q>

There’s an old rule of thumb which states that <q>mixins without arguments are
bad</q>—that mixins which just duplicate code with no difference between each
instance are nasty. The truth is that the answer is a lot more nuanced than that.

Let’s take a look.

## When to use `@extend`

Let me start by saying that I would generally advise never to use `@extend` at
all. It is something of a [Fool’s
Gold](http://oliverjash.me/2012/09/07/methods-for-modifying-objects-in-oocss.html):
a feature with a lot of promise and twice as many caveats.

If you are definitely, completely set on using `@extend`:

1. Please reconsider.
2. Use the [placeholder hack](http://csswizardry.com/2014/01/extending-silent-classes-in-sass/).
3. Keep an eye on your output.

In theory, `@extend` is great, but, in practice, there is just too much that can
go wrong. I have seen stylesheets more-than-double in size; I have seen source
order get destroyed; and I have seen clients plough right through their [4095
selector budget](http://blogs.msdn.com/b/ieinternals/archive/2011/05/14/10164546.aspx).
It is always better to err on the side of caution and omit any features or tools
that have the potential to cause so much trouble with little or no tangible gain.
Having to shard your stylesheets into less-than-4096-selector-groups as a result
of misusing a productivity tool is very, very counterintuitive.

**N.B.** I feel I should add that this isn’t me hating on `@extend` per se;
there’s just a lot to be aware of and you must remain vigilant if you are going
to use it.

But, if you are going to use `@extend`, when should you?

It is important to realise that **`@extend` creates relationships**. Whenever
you use `@extend`, you are transplanting a selector elsewhere in your stylesheet
in order for it to share traits with other selectors that are also being
transplanted. As a result, you are dictating that these selectors all share a
relationship, and **misusing `@extend` can create relationships around the wrong
criterion**. It would be like grouping your CD collection by the colour of their
covers: doable, but not a useful relationship to create.

**It is vital that you are forming that relationship around the
right characteristics.**

Quite often—and I have been guilty of it myself in the past—I have seen things
like this (and let’s imagine that the `...` denotes an omission of, say, 100
lines):

    %brand-font {
        font-family: webfont, sans-serif;
        font-weight: 700;
    }

    ...

    h1 {
        @extend %brand-font;
        font-size: 2em;
    }

    ...

    .btn {
        @extend %brand-font;
        display: inline-block;
        padding: 1em;
    }

    ...

    .promo {
        @extend %brand-font;
        background-color: #BADA55;
        color: #fff;
    }

    ...

    .footer-message {
        @extend %brand-font;
        font-size: 0.75em;
    }

Which, of course, gives us this:

    h1, .btn, .promo, .footer-message {
        font-family: webfont, sans-serif;
        font-weight: 700;
    }

    ...

    h1 {
        font-size: 2em;
    }

    ...

    .btn {
        display: inline-block;
        padding: 1em;
    }

    ...

    .promo {
        background-color: #BADA55;
        color: #fff;
    }

    ...

    .footer-message {
        font-size: 0.75em;
    }

The issue here is that I have forced a relationship between unrelated rules—that
live hundreds of lines away from one another—based on shared traits that are
purely coincidental. And not only have I forced an unusual relationship, but I
now have a very unusual source order in which specificity is jumbled up. I am
distributing selectors across my codebase for purely circumstantial reasons.
This is [not good news](http://csswizardry.com/2014/10/the-specificity-graph/).

I have transplanted unrelated rulesets to hundreds of lines away from their
source, in order to live with other rulesets, in the incorrect location, based
on purely coincidental and circumstantial similarities. **This is not a good
way to use `@extend`.** (In fact, this is probably a perfect use-case for an
argument-less mixin. We’ll come back to that soon.)

Another case of an abused `@extend` looks a little like this:

    %bold {
        font-weight: bold;
    }

    ...

    .header--home > .header__tagline {
        @extend %bold;
        color: #333;
        font-style: italic;
    }

    ...

    .btn--warning {
        @extend %bold;
        background-color: red;
        color: white;
    }

    ...

    .alert--error > .alert__text {
        @extend %bold;
        color: red;
    }

This, as you would expect, gives us the following:

    .header--home > .header__tagline,
    .btn--warning,
    .alert--error > .alert__text {
        font-weight: bold;
    }

    ...

    .header--home > .header__tagline {
        color: #333;
        font-style: italic;
    }

    ...

    .btn--warning {
        background-color: red;
        color: white;
    }

    ...

    .alert--error > .alert__text {
        color: red;
    }

This weighs 299 bytes.

**Oftentimes, the selectors you’re transplanting may be longer than the
declarations you’re trying to avoid repeating.**

If we were to actually just repeat the `font-weight: bold;` declaration
<var>n</var> times—instead of trying to avoid repeating it at all—we’d actually
achieve a smaller file size: **264 bytes**. This is just a very timid model, but
it should help to illustrate the possibility for diminishing returns.
`@extend`ing single declarations can often be counterproductive.

So, when _do_ we use `@extend`?

We’d use `@extend` to share traits among explicitly related rulesets. A perfect
example:

    .btn,
    %btn {
        display: inline-block;
        padding: 1em;
    }

    .btn-positive {
        @extend %btn;
        background-color: green;
        color: white;
    }

    .btn-negative {
        @extend %btn;
        background-color: red;
        color: white;
    }

    .btn-neutral {
        @extend %btn;
        background-color: lightgray;
        color: black;
    }

Which results in:

    .btn,
    .btn-positive,
    .btn-negative,
    .btn-neutral {
        display: inline-block;
        padding: 1em;
    }

    .btn-positive {
        background-color: green;
        color: white;
    }

    .btn-negative {
        background-color: red;
        color: white;
    }

    .btn-neutral {
        background-color: lightgray;
        color: black;
    }

This is a perfect use-case for `@extend`. These rulesets are inherently related;
their shared traits are shared for a reason, not coincidentally. Further, we
aren’t transplanting their selectors hundreds of lines away from their source,
so our [Specificity Graph](http://csswizardry.com/2014/10/the-specificity-graph/)
stays nice and sane.

## When to use a mixin

The <q>mixins without arguments are bad</q> rule is a well-meaning one, but
unfortunately it’s just not as simple as that.

This rule stems from a slight misunderstanding of the DRY principle. DRY is a
principle that aims for a [Single Source of
Truth](http://en.wikipedia.org/wiki/Single_Source_of_Truth) within a project.
DRY is about not repeating **Yourself**, it is not about completely avoiding
repetition.

If you manually type a declaration 50 times in a project, you are repeating
yourself: this is not DRY. If you can generate that declaration 50 times without
having to manually repeat it, this is DRY: you are generating repetition without
actually repeating yourself. This is quite a subtle but important distinction to
be aware of. **Repetition in a compiled system is not a bad thing: repetition in
source is a bad thing.**

The Single Source of Truth means that we can store the source of a repeated
construct in one place and recycle and reuse it without ever actually
duplicating it. Sure, a system might repeat it for us, but its source only ever
exists once. This means we can change it once and that change will propagate
everywhere; that there will be no duplication of that construct in our source
code; that there is a Single Source of Truth. This is what we mean when we talk
about DRY.

With this in mind, we can begin to realise that mixins without arguments can
actually be very useful. Let’s go back to the `%brand-font {}` example from
earlier on.

Let’s imagine we’re using a particular font in our project that must always be
defined alongside a specific `font-weight`:

    .foo {
        font-family: webfont, sans-serif;
        font-weight: 700;
    }

    ...

    .bar {
        font-family: webfont, sans-serif;
        font-weight: 700;
    }

    ...

    .baz {
        font-family: webfont, sans-serif;
        font-weight: 700;
    }

It would get quite tedious to manually repeat those two declarations over and
over in our codebase; we’d have to remember the number `700` as opposed to the
more familiar `regular` or `bold`; and if we ever change the web font or its
weight, we’d have to go through the project and change it everywhere.

We covered earlier that we should not force relationships by using `@extend`
here, but what we probably should do is use a mixin:

    @mixin webfont() {
        font-family: webfont, sans-serif;
        font-weight: 700;
    }

    ...

    .foo {
        @include webfont();
    }

    ...

    .bar {
        @include webfont();
    }

    ...

    .baz {
        @include webfont();
    }

**Yes, this will compile to repetition. No, we are not repeating ourselves.** It
is important to remember here that these are unrelated rulesets, so we did not
ought to make them related. They are unrelated and just _happen_ to have some
shared traits, so this repetition is sensible, and is to be expected. We _want_
to use those declarations in <var>n</var> places, so we make them appear in
<var>n</var> places.

Argument-less mixins are great for just spitting out repeated groups of
identical declarations whilst maintaining a Single Source of Truth. See it like
a Sassy extension of your copy/paste clipboard: you’re just using it to paste
out a few strings you’ve stored elsewhere earlier on. We have our Single Source
of Truth, which means we can propagate changes to these declarations whilst only
ever making one manual change. Very DRY.

<small>It is also probably worth noting that Gzip favours repetition, so that
will almost entirely negate the costs of the slight added filesize.</small>

Of course, mixins are also really, really useful for generating dynamic values
within repeated constructs: mixins _with_ arguments. I don’t think anyone could
say these are a bad idea: they’re DRY but also allow us to make on-the-fly
modifications to our Single Source of Truth. For example:

    @mixin truncate($width: 100%) {
        width: $width;
        max-width: 100%;
        display: block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    
    .foo {
        @include truncate(100px);
    }

Spitting out the same declarations, but dynamically setting the value of
`width` on a case-by-case basis.

This is the most common and widely agreed upon form of mixin, and I think we can
all agree that these are a good idea.

## tl;dr

Only use `@extend` when the rulesets that you are trying to DRY out are
inherently and thematically related. Do not force relationships that do not
exist: to do so will create unusual groupings in your project, as well as
negatively impacting the source order of your code.

Use a mixin to either inject dynamic values into repeated constructs, or as a
Sassy copy/paste which allows you to repeat the same group of declarations
throughout your project whilst keeping a [Single Source of
Truth](http://en.wikipedia.org/wiki/Single_Source_of_Truth).

### tl;dr;tl;dr

Use `@extend` for same-for-a-reason; use a mixin for same-just-because.
