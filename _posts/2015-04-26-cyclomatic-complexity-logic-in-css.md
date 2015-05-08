---
layout: post
title: "Cyclomatic Complexity: Logic in CSS"
date: 2015-04-26 12:43:45
categories: Web Development
meta: "A look at how CSS has always contained logic and conditions"
---

For the longest time, we’ve been saying that CSS doesn’t have logic. By that, we
meant that there was no control flow or way of programmatically manipulating it.
This inherent lack of logic has been used as an argument in favour of using
preprocessors (to provide that missing feature), and as an argument against
using preprocessors (CSS was never meant to have logic, so we shouldn’t go
introducing it).

However, I recently hit upon a way of thinking that made me realise that CSS
_does_ include logic, and the fact that it’s rarely viewed as such is probably
also why we end up with such poor CSS at all.

I found myself explaining compound selectors to a client as being made up of the
<i>subject</i>—the thing we’re actually interested in—and its <i>conditions</i>.
For example:

    div.sidebar .login-box a.btn span {
    }

In this compound selector, the subject is `span`, and the conditions are `IF
(inside .btn) AND IF (on a) AND IF (inside .login-box) AND IF (inside .sidebar)
AND IF (on div)`.

That is to say, every component part of a selector is an `if`
statement—something that needs to be satisfied (or not) before the selector will
match.

This subtle shift in the way we look at how we write our selectors can have a
huge impact on their quality. Would we really ever write (pseudo code):

    @if exists(span) {

      @if is-inside(.btn) {

        @if is-on(a) {

          @if is-inside(.login-box) {

            @if is-inside(.sidebar) {

              @if is-on(div) {

                # Do this.

              }

            }

          }

        }

      }

    }

Probably not. That seems so indirect and convoluted. We’d probably just do this:

    @if exists(.btn-text) {

      # Do this.

    }

Every time we nest or qualify a selector, we are adding another `if` statement
to it. This in turn increases what is known as its <i>Cyclomatic Complexity</i>.

## Cyclomatic Complexity

In software engineering, [Cyclomatic
Complexity](http://en.wikipedia.org/wiki/Cyclomatic_complexity) is a metric
which concerns itself with the number of ‘moving parts’ in a piece of code.
These moving parts are usually points within some control flow (`if`, `else`,
`while`, etc.), and the more of them we find, the greater our Cyclomatic
Complexity. Naturally, we want to keep our Cyclomatic Complexity as low as
possible, as greater complexity means that, among other things,

* code is harder to reason about;
* there are more potential points of failure;
* code is harder to modify, maintain, or reuse;
* you’re left with more outcomes and side effects to be aware of;
* and code is more difficult to test.

Applied to CSS, we’re basically looking at the number of decisions a browser has
to make before it can or cannot style something. The more `if` statements in
our selectors, the greater the Cyclomatic Complexity that selector has. This
means our selectors are more fragile, because they have a greater number of
conditions that *must* be satisfied in order for them to work at all. It means
our selectors are less explicit, because introducing `if` statements
unnecessarily can lead to false positive matches. It makes our selectors far
less reusable, because we’re making them jump through way, way more hoops than
they need to.

So Instead of binding onto a `span` inside of a `.btn` (and so on) we would be
far better off creating a new class of `.btn-text` to bind onto. This is far
more direct, as well as being more terse and more robust (more `@if`s lead to
more brittle selectors that have a greater chance of breaking).

The trick is to write your selectors how the browser parses them: right to left.
If your first question is <q>is there a `span`?</q> then your net is being cast
far too wide. This is why you then have to qualify the `span` with so many
conditionals: to narrow the selector’s reach. You need to start at the other
end; write something unambiguous and explicit and forgo the conditions entirely.

**Instead of your selectors casting a really wide net that catch way too much of
the DOM—and then having to trim that catch down via conditions—it is far more
succinct and robust to just catch much less of the DOM in the first place.**

Cyclomatic Complexity is quite an advanced principle to try and apply to CSS,
but if we look at it as just that—a principle—we can start to visualise and even
measure the complexity in the ‘logic’ powering our selectors, and we can then
begin making much better decisions based on it.

Some good rules of thumb:

* **Think of your selectors as mini programs:** Every time you nest or qualify,
  you are adding an `if` statement; read these `if`s out loud to yourself to try
  and keep your selectors sane.
* **Keep your Cyclomatic Complexity to a minimum:** Use a tool like
  [Parker](https://github.com/katiefenn/parker) to actually get metrics about
  your selectors’ mean Cyclomatic Complexity ([Identifiers Per
  Selector](https://github.com/katiefenn/parker/tree/master/docs/metrics#identifiers-per-selector)).
* **If you don’t need the checks, don’t put them in there:** Sometimes nesting
  in CSS _is_ necessary, but most of the time it is not. Even the [Inception
  Rule](http://thesassway.com/beginner/the-inception-rule) should not be
  trusted.
* **Start thinking about your selectors from the right first:** Start with the
  bit you _know_ you want and then write as little extra CSS as possible in
  order to get a correct match.
* **Brush up on [Selector
  Intent](http://csswizardry.com/2012/07/shoot-to-kill-css-selector-intent/):**
  Make sure you’re writing the selectors you _intend_, not just the ones that
  happen to work.

Your selectors are the most fundamental aspect of your CSS architecture; make
sure you’re writing sane and simple ones.
