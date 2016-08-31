---
layout: post
title: "Refactoring CSS: The Three I’s"
date: 2016-08-30 20:11:12
categories: Web Development
meta: "Three key steps to help you refactoring legacy code"
---

In a recent interview, I was asked about simple and/or replicable steps to take
when refactoring CSS. The topics of legacy, Technical Debt, and refactoring are,
for one reason or another, at the front of my mind at the moment, so I thought I
would write up a short post on an approach to refactoring CSS (or any language)
that I call <i>The Three I’s</i>: Identify, Isolate, Implement.

## Identify

It’s all well and good knowing that ‘your CSS is a mess’, but which bits
specifically? Which parts of your codebase are causing you problems right now?
Which ones will be the quickest to refactor? Which parts will provide you with
the most benefit once refactored? It is important to identify prime candidates
for refactoring.

For example, the CSS for your nav might be cumbersome and hard to work with, but
if the nav works correctly, is accessible, and you rarely have to edit the CSS
for it, refactoring it will likely not provide you with much immediate value: we
can probably afford to leave it as it is for a little while longer. However,
your layout/grid system might be incredibly fragmented and inconsistent, it
might have cross-browser issues, its responsiveness may have been bolted on as
an afterthought, and of course it is probably used extensively and frequently.
As a result, you might get a lot of value from tackling that first.

**Have a clear idea of which parts of your project should be refactored, if at
all.**

**Tip:** Try to limit refactoring work to the scope of single features. It’s
much safer to refactor a single feature than it is to refactor your entire
naming convention, for example. For further detail on this, and much more, you
can see my <i>Refactoring CSS Without Losing Your Mind</i> talk at [a number of
events throughout the rest of 2016](/speaking/).

## Isolate

Once we have identified candidates for refactoring, we need to isolate them
before and during working on them. Suppose we have decided to refactor our
layout system first, we should rewrite this in isolation, outside of our
project.

In order to do this, open a new [jsFiddle](http://jsfiddle.net),
[CodePen](http://codepen.io), etc. and begin work there. Do not refactor
features back into a stale codebase, as doing so runs the risk of making use of
legacy CSS that may itself be refactored in future. For example, we might be
using a traditional reset in the current project, which may be replaced by
Normalize.css in future—we don’t want to build our brand new layout system on
top of a reset that will be removed in six months time.

**Build the new/refactored version of your feature in complete isolation so that
you know it is well encapsulated, and it’s not making use of any legacy.**

## Implement

The final step is to implement your refactored feature. Copy and paste the
jsFiddle CSS into the relevant part of your project, and see what happens. 90%
of the time, you’ll find that there are some problems: conflicts with existing
CSS, naming collisions, existing styles leaking into your new code, etc.

We tackle these details at implementation stage, and we need to give careful
consideration as to where we place the fixes. If the fix solves a problem with
the layout system itself, it is usually best to place the fix in the layout
system’s partial. If the fix addresses problems arising from conflicts with
legacy code, it is often best to place it in a
[shame.css](http://csswizardry.com/2013/04/shame-css/) file. This keeps the
legacy fix away from greenfield CSS, meaning it will be much easier to remove
once we’ve refactored whatever legacy was causing the problem in the first
place.

**Move the refactored feature back into the project and tidy things up here.**

- - -

In short:

1. **Identify** sensible candidates for refactoring: not all legacy is born
   equal.
2. **Isolate** the feature in order to rebuild it: do not lean on out of date
   code.
3. **Implement** the refactored feature into the project: do any cleanup work at
   this point, and in the right place(s).
