---
layout: post
title: "Immutable CSS"
date: 2015-03-11 19:40:23
categories: Web Development
meta: "Treating CSS rules as being immutable"
---

In my recent article, [<cite>More Transparent UI Code with
Namespaces</cite>](http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/),
I mentioned a number of times that certain classes cannot or should not be
changed, bound onto, reassigned, or otherwise modified after their initial
creation. We had phrases like:

> Making modifications to these types of class could potentially have knock-on
> effects in a lot of other unrelated places. Tread carefully.

And:

> It has a very specific role (often providing only one declaration) and should
> not be bound onto or changed.

As well as:

> …we need to let others know that this class is less than ideal, and hopefully
> temporary (i.e. <q>do not bind onto this</q>).

Followed by:

> Avoid modifying their styles.

With a bit of:

> We do not want anyone trying to bind onto these in future selectors.

And then I said:

> …do not bind onto, reuse or otherwise interface with it. […] [Hack classes]
> should not be relied upon or reused by other developers.

With this next:

> …do not reuse or bind onto their classes.

And this:

> A number of things I can reuse, but not bind onto or alter (Objects and
> Utilities).

And then this:

> …but cannot be reused, modified, or moved.

Jeez. Wow. I guess I was really, really trying to drive a point home there.
Basically that modifying, reassigning, or otherwise interfering with certain
types of rule can be dangerous, and is therefore strictly prohibited.

The idea was to use pre-agreed namespaces in order to signal which rules these
were; those namespaces were `o-` for Objects, `u-` for Utilities, and `_` for
Hacks.

We need to make sure we never touch these once they’ve been created, as to do so
could have potentially terrible knock-on effects for other developers and/or
other parts of the system. We need to remain confident that the use of these
rules never comes with side effects.

Well, it turns out there’s already a name for things like this: [<i>Immutable
Objects</i>](http://en.wikipedia.org/wiki/Immutable_object).

As with a lot of my work, I try to borrow paradigms from software engineering.
Software Engineers have been solving these problems since long before I was even
a twinkle in my father’s eye, so it’s probably going to be in my interests to
see how they’d go about it.

It turns out that immutable objects are objects <q>whose state cannot be
modified after [they have been] created</q>. That’s _exactly_ what we’re aiming
for with certain types of rule in our CSS! After we’ve created certain rulesets,
they want to behave almost like constants: never changing, closed to
modification, immutable.

From the Wikipedia page:

<blockquote class="pull-quote">
  <p>Other benefits are that they are simpler to understand and reason about and
offer higher security than mutable objects.</p>
<b class="pull-quote__source"><a href="http://en.wikipedia.org/wiki/Immutable_object"><cite>Immutable object</cite></a>—Wikipedia</b>
</blockquote>

Perfect! **<q>simpler to understand</q>** and **<q>offer higher security</q>**.
This is exactly what the namespacing gives us: knowledge and, subsequently,
security.

More gold from the Wikipedia page:

> …if any user of a reference to a mutable object changes it, all other users of
> that reference will see the change. If this is not the intended effect, it can
> be difficult to notify the other users to have them respond correctly.

Heck yeah! This is exactly what we’re talking about with our CSS. If someone
modifies a base Object or a global Utility, we’re going to propagate that change
out everywhere, and we probably don’t want that.

It gets better:

> In these situations, defensive copying of the entire object rather than the
> reference is usually an easy but costly solution.

Uh oh! Ever copied and pasted (or `@extend`ed) some declarations in order to
reuse them under a safer selector? Duplicating things (or their references) in
order to use them again with no side effects?

## Enforcing Immutability

It’s all well and good knowing what immutability is, but we need to be able to
enforce it. One potential (untested) approach would be to simply see if any
class appears more than once in a project. For example:

    .o-media {}

    ...

    .c-footer .o-media {}

Here we’ve reassigned `.o-media`; it exists once, where it should do, but we’ve
also got a modified version of it when it exists inside of `.c-footer`. This
nesting introduces a caveat (<q>`.o-media` when…</q>) which in turn produces
side effects.

Perhaps a Grunt task to find reassigned classes and show developers a warning:

    WARNING: Immutable object `.o-media` has been reassigned on line 2214.

Or perhaps preprocessors could provide a specific type of selector that is
immutable. We have placeholder classes that never get written out to the
compiled CSS, and they use the `%` symbol in place of the period (`.`). How
about something _like_:

    ^o-media {}

Which would get compiled out to:

    .o-media {}

But would throw an error if we tried to do this:

    .c-footer {

        ^o-media {}

    }

For example:

    error _components.footer.scss (Line 86: Cannot reassign immutable object: “^o-media”.)

<small>Totally just thinking out loud there—there will be a number of reasons
why this is impractical, I’m sure.</small>

## Working Immutably

Until we actually get ways of creating truly immutable objects in CSS, there are
a number of rules and principles we can stick to:

Firstly, utilise and **stick to** [our
namespacing](http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/).
Even though we can get around or break these rules, they’re a great start. If we
make sure we signal these types of rule, at least we have a better chance of
people modifying CSS safely.

The second thing we can do is make sure we strongly adhere to [the Open/Closed
Principle](/2012/06/the-open-closed-principle-applied-to-css/). Ensure that we
never modify rules directly, and that we add new classes (using BEM) to extend
changes forward. This ensures that we’re never going back and changing
fundamental rules that underpin many other more complex bits of UI, meaning no
regressions or side effects. Our immutable rules (Utilities, Objects, Hacks)
remain immutable by never reassigning them and adding caveats.
