---
layout: post
title: "Contextual Styling: UI Components, Nesting, and Implementation Detail"
date: 2015-06-13 16:54:34
categories: Web Development
meta: "How to style specific components when they’re in specific locations"
---

With the recent move toward componenised UIs—that is, instead of building
monolithic, page-based websites, we’re building design systems and UI Toolkits
that come together to form the resulting pages—we’ve yielded a lot of benefits.
UIs are

* faster to construct;
* much more consistent;
* much more flexible, forgiving, and robust;
* far easier to reuse, recycle, or repurpose.

The notion that all UI components are born equal—and should be able to exist
anywhere, at any time, and independently—is a huge move forward for UI
developers in terms of the consistency and quality of the products we work with.

It’s not all a solved problem, though.

Recently, [Simurai](http://simurai.com/blog/2015/05/11/nesting-components/) and
[Philip Walton](http://philipwalton.com/articles/extending-styles/) both wrote
articles discussing way to manage exceptions, chiefly: <q>How do we style a
component when it’s inside of another one?</q>

The example Simurai uses is the idea of styling a button slightly differently
when it’s placed inside of the site’s header. A number of potential solutions
are presented, and he (admirably) admits that

> …there isn’t some awesome solution at the end that solves all the problems.
> It’s just me whining most of the time.

Which is what makes it such a great post: it’s excellent food for thought and
left me pondering the problem for weeks!

This post you’re reading is my take on the conundrum. It isn’t a direct
response, rebuttal, or criticism of his. It’s also going to be a little bit more
philosophical.

---

I’m going to take the approach I take with nearly every problem I come up
against as a developer: I’m not going to solve it, I’m going to remove it
entirely.

**If you need to change the cosmetics of a UI component based on where it is
placed, your design system is failing.** It’s as simple as that. Things should
be designed to be ignorant; things should be designed so that we always just
have ‘this component’ and not ‘this component when inside…’.

The problem here isn’t <q>How do we style this?</q>, it’s <q>Why has this been
designed like this in the first place?</q>. Put another way, **the problem here
doesn’t exist in code, it exists in design**. Back to the drawing board.

The design issue here is solved by subtly inverting the problem: instead of
saying <q>The buttons need to be smaller when they’re in the header</q>, we need
to be saying <q>We have a smaller variant of our buttons, and it’s these that we
use in the header.</q>

It’s that subtle. They’re not smaller **because** they’re in the header, they’re
smaller **and** they’re in the header.

This means our solution (using BEM syntax) is just a case of:

    .btn {
      ...
    }

    .btn--small {
      ...
    }

Implemented like so:

    <div class="header">

      <a href="/log-in" class="btn  btn--small">Log in</a>

    </div>

The header and the button have no idea the other one exists.

Simurai then poses something of a [slippery slope
argument](https://en.wikipedia.org/wiki/Slippery_slope) (emphasis mine):

> This works great too, but could get out of hand quickly. What do you do if at
> some point you want the `font-size` to be `.9em`? Create yet another
> variation? `Button--justALittleSmaller`. **As the project keeps growing, the
> number of variations will too.**

I would argue here that, again, the problem lies in the design. Your UI should
not be designed so arbitrarily, and if it is then that is indicative or a poor
approach that needs solving further back down the line. A good UI Developer
wouldn’t let this happen, and a good UI Designer wouldn’t do it in the first
place.

To provide another example: if a button needs to be full-width when placed
inside, say, a modal overlay, we would choose to completely ignore that modal
overlay. We have to choose to ignore context. Once we begin to do this, the
solution becomes rather clear: we don’t have <q>a button that needs to be
full width when in a modal overlay</q>, we have <q>a variant of our buttons that
is full width that we are able to use wherever we like</q>.

Incorrect:

    .modal .btn {
      width: 100%;
    }

Correct:

    .btn--full {
      width: 100%;
    }

When designing a composable UI, we have to be wilfully ignorant. We aren’t
allowed to know anything about context; we have to make decisions under the
assumption that we know nothing about any other part of the system.

Basically, **cosmetics should not change depending on the location of the
component**. As far as cosmetic changes are concerned, there is no such thing as
context[\*](#fn-01).

## Implementation Detail

Above, I tried to stress the word _cosmetics_ as much as possible. Changing how
something _looks_ based on context is something we just shouldn’t be doing.

_However._ Here’s an interesting one I’ve been thinking about lately: How do we
style implementation detail? How do we style something _not_ when it’s in the
context of another component, but when it’s in the context of an entire project?

When we’re working with componentised UIs, we need to completely ignore layout.
There’s no point designing a nice, decomposed, fluid, context-ignorant UI
Toolkit if we’re just going to stick a load of `width`s and `float`s on all the
components. It completely negates the point of making a
this-will-work-everywhere component if you then go and bake layout and
implementation rules right into it.

Let me give you an example. Imagine a site’s main nav that we’re going to build
as `.nav-primary`:

    .nav-primary {
      /* This is how the nav should always look: */
      margin:  0;
      padding: 0;
      list-style: none;
      font: 12px/1.5 sans-serif;

      /* But this is implementation detail: */
      float: right;
      margin-left: 18px;
    }

Above we can see two distinct types of declaration:

1. We have a group of styles which make `.nav-primary` look like the primary
   nav. These declarations are constant, and should remain intact whether
   `.nav-primary` is placed in our styleguide, or in our project, or in another
   project, or another one, and so on.
2. We then have some styles who are responsible for making `.nav-primary` float
   over to the right and have some leading margin on its left (presumably to
   stop it touching up to the site’s main logo). These styles are **only needed
   when `.nav-primary` is inside the project**. This is implementation detail,
   and doesn’t really belong in this ruleset.

Having the implementation-specific styling baked into the `.nav-primary`
component limits our ability to use it without it automatically jumping over to
the right of its container, which then completely negates the work we’ve done in
designing this componentised UI in the first place.

So how do we apply this implementation-specific styling _on top of_ the
all-the-time styling?

There are three methods I’m toying with, and all have their good and bad sides.

### Nesting

One option would be to use nesting to provide context. Because we’re not
altering cosmetics of the component, it isn’t indicative of a failing in our
design system (in fact, it’s actively working to keep our design system even
more pure).

HTML:

    <header class="page-head">

      <ul class="nav-primary">
        ...
      </ul>

    </header>

CSS:

    .nav-primary {
      margin:  0;
      padding: 0;
      list-style: none;
      font: 12px/1.5 sans-serif;
    }

    .page-head .nav-primary {
      float: right;
      margin-left: 18px;
    }

What we’re doing here is writing CSS where we really do want to change something
based on its context. It’s clear in its intention that `.nav-primary` has a
constant and consistent visual appearance, but when it is inside of something
specific (i.e. `.page-head`) it needs to snap into position.

It’s worth noting here that Simurai wasn’t sure where this nested ruleset should
live:

> This works great but the question is, where should this rule be added?

For me the answer is quite simple: it should stay in the `.nav-primary` file.
This is because the subject (our _key selector_) is still `.nav-primary`; that’s
the thing that’s getting styled, so we’d expect to find any CSS that affects it
inside its (S)CSS file, not something else’s.

#### The Good

Although we are using nesting, we do have good [Selector
Intent](http://csswizardry.com/2012/07/shoot-to-kill-css-selector-intent/): we
really do want to make `.nav-primary` do something different when it’s inside of
`.page-head`. Good Selector Intent means that our CSS is doing the right things
for the right reasons.

This also pins down our implementation detail CSS to a limited scope—we only
get the specific positioning when we’ve put the component into a specific place.

Further, we can have as many implementations as we like/need. We might have a
`.nav-primary` inside of `.page-head`, but also one inside of
`.styleguide-example`. We can have as many specific implementation as we need
whilst keeping them all separate from the constant and global cosmetics. This
is good Separation of Concerns.

#### The Bad

But, of course there are bad bits.

First and foremost, this is violating [the Open/Closed
Principle](http://csswizardry.com/2012/06/the-open-closed-principle-applied-to-css/).
This means that we are editing `.nav-primary` specifically, only we’re doing it
via `.page-head`. We are not extending components here, we are altering them
through conditions (i.e. increasing [Cyclomatic
Complexity](http://csswizardry.com/2015/04/cyclomatic-complexity-logic-in-css/)).

Because of violation of the Open/Closed Principle, we have ended up with a
dictatorial selector. We have written a selector that says <q>If you put that
in here, this **will** happen.</q> This means we are now open to leaking styles:
because the decision is made in our CSS and not in our view, things will happen
whether we like them or not.

Let’s imagine we roll out a suite of new sub-sections of the site and have to
produce a slight variant of `.nav-primary`, perhaps called `.nav-primary--sub`.
We implement this in the DOM like so:

    <header class="page-head">

      <ul class="nav-primary">
        ...
      </ul>

      <ul class="nav-primary  nav-primary--sub">
        ...
      </ul>

    </header>

Because `.nav-primary--sub` sits alongside a class of `.nav-primary`, it’s going
to get shunted over to the right. We probably don’t want this, so we’ll have to
write some CSS to undo it. More CSS to achieve less styling is [a definite Code
Smell](http://csswizardry.com/2012/11/code-smells-in-css/#undoing-styles).

So nesting perhaps isn’t the best solution.

### Utility Classes

Another solution might be to apply the implementation-specific styles via a
suite of utility classes, like so:

HTML:

    <header class="page-head">

      <ul class="nav-primary  u-float-right  u-margin-left">
        ...
      </ul>

    </header>

CSS:

    .nav-primary {
      margin:  0;
      padding: 0;
      list-style: none;
      font: 12px/1.5 sans-serif;
    }

    ...

    .u-float-right {
      float: right !important;
    }

    .u-margin-left {
      margin-left: 18px !important;
    }

#### The Good

The good news here is that this method obeys the Open/Closed Principle, in that
we’re not actually altering `.nav-primary` at all. This also means we have no
leaky styles whatsoever.

We can also, as with the previous example, have as many implementations across
the project as we need. Because we’ve decoupled UI and implementation, we are
free to move `.nav-primary` wherever we want and configure its specifics ‘just
in time’.

We also have a really nice paper trail of intent here: we can see in our HTML
that we have clear separation of concerns. We have classes for component
styling, and classes for bespoke or ‘in situ’ treatments. If we’d adopted
[Namespaces](http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/)
here we’d have _even more_ clarity.

#### The Bad

I feel like if I’m to be entirely objective then I wouldn’t have any problems at
all with this solution: it separates our implementation from our component
styling perfectly, it allows us to have several different implementation
configurations per project, and it avoids any potential leaks or collisions.
But…

Utilities still feel kinda nasty. They have their place, but are only a short
hop away from inline styles (though they are markedly preferable). It will begin
to pollute our readable markup with visual (although readable and purposeful)
noise.

Another problem is that we aren’t being told which utility classes are being
used for implementation-specific styling and which ones are being used just
because we needed a style trump.

### One Stateful Class

The third possibility I’ve been looking at is introducing a simple stateful
class of `.in-situ` which has all of the implementation-specific styles bound to
it. This means our component styles are applied only to `.nav-primary`, and the
implementation styles are applied to `.nav-primary.in-situ`.

HTML:

    <header class="page-head">

      <ul class="nav-primary  in-situ">
        ...
      </ul>

    </header>

CSS:

    .nav-primary {
      margin:  0;
      padding: 0;
      list-style: none;
      font: 12px/1.5 sans-serif;
    }

    .nav-primary.in-situ {
      float: right;
      margin-left: 18px;
    }

#### The Good

This has all of the same benefits as utility classes (obeys the Open/Closed
Principle, doesn’t leak, separates concerns) but has the added benefits of less
visual noise (because we’re only using one additional class, rather than
several), and it also introduces a standard, project-wide convention.

When you have a large codebase, it’s nice to be able to know that everything
related to implementation-specific styling is always going to be bound to the
same class (albeit _always_ chained to something else). This means that reading
through and entire page of HTML you can see immediately which components are
being styled _specifically_ because of where they are.

#### The Bad

The one huge downside to this method is that we can only use it once per
component. We only get one `.nav-primary.in-situ` selector per project.

If we’re limited to only one implementation-specific version of `.nav-primary`,
well then we might as well have just baked it into `.nav-primary` from the
start.

I guess we could replace `.in-situ` with `.in-page-head`, or
`.in-styleguide-example`, so having `in-` as a stateful prefix and the rest of
the classes string would be unique per implementation.

    <header class="page-head">

      <ul class="nav-primary  in-page-head">
        ...
      </ul>

    </header>

This does mean we could end up with a lot of different `.in-*` classes per
component, but we are still managing to separate our concerns.

### The Best Solution

I’m not saying this problem is solved at all, far from it, but from the three
solutions I’ve outlined I’d have to say that, on balance—and speaking purely
objectively—the utility classes is probably the best option.

It has fewer large downsides, such as leaking styles and limited usage, and it
poses no real problems other than subjective ones (like, ‘Eww, utility classes
are icky!’).

## The Takeaway

This post was made up of two main sections. The takeaway from the first would be
that **having to change the cosmetics of a component because it’s in a certain
context is a Design Smell**. It’s indicative of the fact that your UI Toolkit
and/or design system is failing, and the solution to that problem does not lie
in code.

The second key point I’m making is that we need some way of separating component
styles from implementation-specific ones. I cannot overstate this enough:
**applying layout and implementation-specific styles to a component completely
negates the point of componentising it in the first place.**

It’s not a solved problem, but it is something I’m looking at quite closely at
the moment. I think I need to research the `.in-*` approach some more as well.

---

<small id="fn-01">\*Theming is the exception, but it’s a big enough departure
from what we’re discussing here that I feel okay making this general statement.
If you do have to deal with theming, take a look at my recent talk [4½ Methods
for Theming in
(S)CSS](https://speakerdeck.com/csswizardry/4half-methods-for-theming-in-s-css)</small>
