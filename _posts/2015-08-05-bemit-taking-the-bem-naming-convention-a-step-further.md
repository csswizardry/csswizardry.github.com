---
layout: post
title: "BEMIT: Taking the BEM Naming Convention a Step Further"
date: 2015-08-05 20:01:58
categories: Web Development
meta: "Adding further meaning and information to the BEM naming convention"
---

Anybody who’s followed me or my work for any length of time will no doubt know
that I’m a huge proponent of [the BEM naming
convention](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/).
What I’m about to talk about in this post is not an alternative or different
naming convention to BEM, but an augmentation: small additions that level BEM up
a notch. This extended BEM syntax has been dubbed <i>BEMIT</i>, as it borrows
some paradigms and patterns from the (as yet unpublished) [Inverted Triangle CSS
architecture](https://twitter.com/itcss_io). BEM + ITCSS = BEMIT.

For a quick recap on BEM, it works by breaking all classes in a codebase down
into one of three groups:

* **Block:** The sole root of the component.
* **Element:** A component part of the Block.
* **Modifier:** A variant or extension of the Block.

Blocks, Elements, and Modifiers: BEM. Absolutely every class in a project fits
into one of these categories, which is why BEM is so great—it’s incredibly
simple and straightforward.

The point of BEM is to give a lot more transparency and clarity in your markup.
BEM tells developers how classes relate to each other, which is particularly
useful in complex or deep pieces of DOM. For example, if I were to ask you to
delete all of the user-related classes in the following chunk of HTML, which
ones would you get rid of?

    <div class="media  user  premium">
      <img src="" alt="" class="img  photo  avatar" />
      <p class="body  bio">...</p>
    </div>

Well we’d definitely start with `user`, but anything beyond that would have to
be a guess, educated or otherwise. However, if we rewrote it with BEM:

    <div class="media  user  user--premium">
      <img src="" alt="" class="media__img  user__photo  avatar" />
      <p class="media__body  user__bio">...</p>
    </div>

Here we can instantly see that `user`, `user--premium`, `user__photo`, and
`user__bio` are all related to each other. We can also see that `media`,
`media__img`, and `media__body` are related, and that `avatar` is just a lone
Block on its own with no Elements or Modifiers.

This level of detail from our classes alone is great! It allows us to make much
safer and more informed decisions about what things do and how we can use,
reuse, change, or remove them.

The one thing missing from BEM is that it only tells us what classes to in
relative terms, as in, how classes are related to _each other_. They don’t
really give us any idea of how things behave, act, or should be implemented in a
global and non-relative sense.

To that end, I decided to extend BEM to become BEMIT. BEMIT doesn’t add any
other types of class—we still only ever have Blocks, Elements, or Modifiers—but
it does add usage and state information.

## Namespaces

So as not to repeat myself, it’s probably best you refer to my post from earlier
this year, [<cite>More Transparent UI Code with
Namespaces</cite>](http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/),
in which I introduce the idea of prefixing every class in a codebase with a
certain string in order to explain to developers what kind of job it does. This
[Hungarian notation](https://en.wikipedia.org/wiki/Hungarian_notation)-like
naming allows us to ascertain exactly what kind of job a class might have, how
and where we might be able to reuse it (if at all), whether or not we can modify
it, and much more. The linked article is pretty sizable, but will give you a
whole load more insight into the technique.

The most common types of namespace are `c-`, for Components, `o-`, for Objects,
`u-`, for Utilities, and `is-/has-` for States (there are plenty more detailed
in the linked post). With this in mind, the above HTML would be rewritten as
this:

    <div class="o-media  c-user  c-user--premium">
      <img src="" alt="" class="o-media__img  c-user__photo  c-avatar" />
      <p class="o-media__body  c-user__bio">...</p>
    </div>

From this, I can see that we have a reusable abstraction in [the Media
Object](http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/)
(`o-media*`) and two implementation-specific components (`c-user*` and
`c-avatar`). These classes are all still Blocks, Elements, or Modifiers: they
haven’t added a new classification, but have added another layer of rich
meaning.

These namespaces tie in with the layers found in the Inverted Triangle CSS
architecture, meaning every class has a specific place to live in our project
(and on our filesystem).

## Responsive Suffixes

The next thing BEMIT adds to traditional BEM naming is responsive suffixes.
These suffixes take the format `@<breakpoint>`, and tell us <q>this class when
at this size</q>:

    <div class="o-media@md  c-user  c-user--premium">
      <img src="" alt="" class="o-media__img@md  c-user__photo  c-avatar" />
      <p class="o-media__body@md  c-user__bio">...</p>
    </div>

So here we have `o-media@md`, which means <q>be the media object at this
breakpoint</q>. Other possible examples:

* `u-hidden@print` – a utility class to hide things when in print context.
* `u-1/4@lg` – a utility to make something a quarter width in the large
  breakpoint.
* `o-layout@md` – a layout object in the medium breakpoint.

The `@` is a human readable and logical way of denoting conditional states. It
allows developers to learn about any potential permutations or appearances that
the piece of UI in question might have, just at a glance.

**N.B.**: You have to escape the `@` symbol in your CSS file, like so:

    @media print {

      .u-hidden\@print {
        display: none;
      }

    }

## Healthchecks

By having these strict and consistent patterns in our HTML we can do a number of
things. Firstly, and most obviously, we can write much more expressive and rich
UI code for our colleagues, meaning they can learn and reason about the state
and shape of a project much more quickly. They can also contribute in the same
consistent manner.

But another happy side effect we get is that we can run a visual healthcheck
against our UI. By using substring selectors, we can target and then visualise
the general makeup of a page based on the types of class it contains:

    /**
     * Outline all classes.
     */
    [class] {
      outline: 5px solid lightgrey;
    }

    /**
     * Outline all BEM Elements.
     */
    [class*="__"] {
      outline: 5px solid grey;
    }

    /**
     * Outline all BEM Modifiers.
     */
    [class*="--"] {
      outline: 5px solid darkgrey;
    }

    /**
     * Outline all Object classes.
     */
    [class^="o-"],
    [class*=" o-"] {
      outline: 5px solid orange;
    }

    /**
     * Outline all Component classes.
     */
    [class^="c-"],
    [class*=" c-"] {
      outline: 5px solid cyan;
    }

    /**
     * Outline all Responsive classes.
     */
    [class*="@"] {
      outline: 5px solid rosybrown;
    }

    /**
     * Outline all Hack classes.
     */
    [class^="_"] {
      outline: 5px solid red;
    }

Of course this isn’t bulletproof—something might be both a Component and an
Element and a Responsive class—but if we write the classes in pretty selective
order (i.e. in the order of least to most important to know about, hence Hacks
coming last), we can begin to get a nice visual snapshot of the makeup of any
given page. You can read more about the benefits of this highlighting in [my
previous article about
namespaces](http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/#highlight-types-of-namespace).

We can enable this healthcheck in multiple ways, but the simplest would probably
be nesting the whole lot in [a Scope
class](http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/#scope-namespaces-s-):

    .s-healthcheck {

      ...

      /**
       * Outline all Responsive classes.
       */
      [class*="@"] {
        outline: 5px solid rosybrown;
      }

      ...

    }

…which you can then add to your `html` element when you want to turn it on:

    <html class="s-healthcheck">

## Final Word

So there we have it, a couple of simple additions to BEM to turn it into BEMIT:
adding information onto the beginning and end of the standard Block, Element, or
Modifier classes to give us more knowledge about how the classes behave in a
non-relative sense. Some more examples:

    .c-page-head {}

    @media screen and (min-width: 15em) {
      .u-text-center\@sm {}
    }

    .o-layout__item {}

    @media print {
      .u-color-black\@print {}
    }
