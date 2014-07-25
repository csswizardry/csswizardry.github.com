---
comments: true
date: 2013-05-22 17:44:11
layout: post
slug: scope-in-css
title: ‘Scope’ in CSS
categories:
- Web development
tag:
meta: Applying the concept of scope to our CSS
---

One thing you will no doubt be familiar with, as a web developer, is the idea of
<i>scope</i>. Wikipedia’s introduction to the subject:

> In computer programming, a scope is the context within a computer program
> in which an identifier is in effect, and can be resolved to an entity – when
> the entity is <em>visible</em>.

A super simple example of scope in JavaScript:

    var foo = "foo";

    function myFunction() {
        var bar = "bar";
    }

    console.log(foo);
    console.log(bar);

Running this, and keeping an eye on your console, you should see two lines:

    foo
    Uncaught ReferenceError: bar is not defined

The first line reads <i>foo</i>. This is because `foo` is defined in
<i>global</i> scope and is later logged in global scope. `bar` is also logged in 
global scope, but is _defined_ in ‘local’ scope, inside `myFunction()`, which is
why the second line reads `Uncaught ReferenceError: bar is not defined`. We
don’t have access to the `bar` variable because it exists in a different scope.

Scope basically deals with what is visible to a program based on the current
scope, and the scope of the thing the program is trying to interact with.

## Global scope

Now, I am _far_ from a programmer. I have a theoretical understanding of scope,
but most, if not all practical, real life knowledge is nonexistent. Please
forgive me if my details are a little rough around the edges.

Global scope is typically a bad thing in programming. Global scope means
defining and using variables with no sandboxing; variables in global scope are
unpredictable because:

* When you access them later in your program, you have no _sure_ way of knowing
  what state they will be in.
* They can be accidentally called in other parts of the program.
* They can be accidentally reassigned by other global variables.

{% include promo-case-studies.html %}

Let’s take a simple PHP-based example. Let’s imagine you have a variable in
global scope called `$name`:

    $name = <holds the name of the logged in user>;

We can use this to display a message to the user on the homepage:

    <h1>Hi there, <?php echo $name; ?>!</h1>

This is all very simple, and it works a treat, however, what happens later in
our program when we want to list the name of the user’s friends and, forgetting
about our previous definition, we redefine `$name` again?

    $name = <holds the name of the logged in user’s friend>;

`$name`—which used to hold the logged in user’s name—now holds completely
different data. We have lost the old variable and reassigned it because we were
dealing with the two in the same scope.

Of course, no one would ever write any code like this, even someone like me can
see that it’s an accident waiting to happen! Yet, we seem to have no problems
with writing CSS this way…

## Loose selectors

<i>Loose selectors</i> are something [I have written about before](http://csswizardry.com/2012/11/code-smells-in-css/),
but it is recently that I have noticed a parallel that can be drawn between them
and scope in programming. Please do note that **this is only a metaphor**. CSS
does not have scope like programming languages do; I am merely trying to use
scope as an analogy for helping explain the impact and danger of loose selectors.

A loose selector in CSS might be very much like the `$name` we used previously;
whilst this is accurate, it is not explicit or sandboxed enough. We might
initially have `.name{}` to style up a form field. Then, six months later,
another developer might come along and need to style up a user’s profile page,
where he wraps the user’s name in a heading with a class of, you guessed it,
`.name{}`!

The problem we have here is that styling meant for the user’s name will leak
into the form field styling and, conversely, the styling on the form field will
pick up styling meant for the user’s name.

A lot of the time, a loose selector is just one which is poorly named, so it’s
not always necessarily about scope, but coupling better naming with the idea of
at least quasi-scoping CSS can solve a lot of our problems.

## Scope in CSS

CSS doesn’t have scope in quite the same way programming languages do, but let’s
take a look at the following:

    /**
     * ‘Global’ scope.
     */
    .some-widget{
    }

        .title{
        }

Here we can see we have a component called `.some-widget{}` and a class of
`.title{}`. Some widget is a kind of scope unto itself; it’s a discrete chunk
of CSS that styles everything to do with `.some-widget{}`. In terms of scope,
this is certainly a start.

With `.some-widget{}` we also have a class of `.title{}`, a very loosely named
class which exists in a quasi global scope. `.title{}` is meant to be part of
`.some-widget{}` but it completely lacks any scope at all and is very loose,
much like our `.name{}` example. We could quite accidentally reassign or
accidentally reuse this class now because it exists in a quasi global scope;
what’s to stop another developer using this `.title{}` class on a
‘Mr/Mrs/Ms’-style form input six months down the line?

This is CSS’ equivalent of global scope.

### Nesting?

We could, of course, give our classes definite scope by nesting them! If we were
to look at a piece of Sass we can actually _see_ how the scoping might work,
because it looks almost programmatic:

    /**
     * ‘Local’ scope, best illustrated with Sass.
     */
    .some-widget{

        .title{
        }

    }

Looking at that it is really easy to see a nice, explicit scoping; a `.title{}`
_inside_ of `.some-widget{}`. Now any styles on this titling element will only
apply if it exists in the _scope_ of the widget! Perfect… or is it?

### No nesting!

Unfortunately, for all this Sass gives us the scope we were after, it compiles
out to the following, which is overly specific:

    .some-widget{
    }

    .some-widget .title{
    }

[Nesting in CSS is a **bad idea**.](http://www.youtube.com/watch?v=R-BX4N8egEc&hd=1&t=27m02s)

I have [written](http://csswizardry.com/2012/05/keep-your-css-selectors-short/)
[a](http://csswizardry.com/2012/07/shoot-to-kill-css-selector-intent/)
[few](http://csswizardry.com/2012/07/quasi-qualified-css-selectors/)
[times](http://csswizardry.com/2011/09/writing-efficient-css-selectors/)
about the importance paying attention to your CSS selectors, and nesting is one
of the easiest ways to fly in the face of that.

The main, and most fundamental problem with nested selectors is that
**they unnecessarily increase specificity**, and
[specificity is a bad thing](http://csswizardry.com/2011/09/when-using-ids-can-be-a-pain-in-the-class/).

So, even though nesting gives us rock solid scope (and about as close to actual
scope in CSS as you’ll ever get), it’s not the right answer. So what is?

### BEM

The best way to handle ‘scope’ in CSS is with a quasi, _implied_ scope, and the
best way to achieve this, in my opinion, is <i>BEM</i>.

    /**
     * ‘Implied’ local scope, using BEM.
     */
    .some-widget{
    }

        .some-widget__title{
        }

BEM is a naming convention that
[I have written about previously](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/),
so you can familiarise yourself with it there. The way BEM helps us with scope
is to imply it by namespacing your selectors with the scope in which they
function. A class of `.bar{}` operating in the scope of `.foo{}` would now be
`.foo__bar{}`.

This now means our loose `.name{}` example becomes a nicely scoped
`.profile__name{}` or `.form__name{}`. We have a very detailed class which would
be nigh on impossible to reuse or reassign!

## Scope all the things?

Not everything in CSS needs a scope, some things _do_ need to exist globally.
Your `.left{}` helper class, for example, does not have a scope _inside_ of
something else.

However, `.left{}` is still a fairly loosely named class. Although it doesn’t
necessarily require scope as such, it might be better named `.float--left{}`.
This removes any ambiguity and decreases the chance of someone marking up, say,
map directions using a class of `.left{}`. This is another similarity between
CSS and programming; the need to name things.
[Naming things is very difficult](http://martinfowler.com/bliki/TwoHardThings.html),
but we need to get better at it.

Write longer classes; instead of a class like `.logo{}`, opt for `.site-logo{}`.
Make your classes a lot less loose by naming them a lot more specifically.
It might not always be a case of scoping, it might just be a case of picking a
better name for something with global scope.

## In summary

Make sure any classes you write aren’t loose; make sure they’re always well
named, and scoped if they need to be. Nesting selectors is a **bad** way of
scoping, so use a naming convention like BEM to provide a quasi scoping.

Global scope and poorly named variables are absolute programming basics; there
is no reason for our CSS to have the same unpredictable and loose traits that
developers spend so much time avoiding.
