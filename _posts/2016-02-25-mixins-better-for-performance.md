---
layout: post
title: "Mixins Better for Performance"
date: 2016-02-25 08:55:12
categories: Web Development
meta: "A look at the performance difference between Sass’ mixins and @extend"
---

When it comes to preprocessors, one of the most frequent questions I’m asked is
<q>Mixins or `@extend`?</q> I’ve always been
[quite](/2014/01/extending-silent-classes-in-sass/)
[vocal](/2014/11/when-to-use-extend-when-to-use-a-mixin/) about this topic, and
I firmly believe you should avoid `@extend` for a number of reasons:

1. It alters your source order, which is always risky in CSS.
2. It creates awkward groupings in your code, putting unrelated selectors
   together.
3. It is very greedy, `@extend`ing every instance of a given subject, not just
   the one you actually wanted..
4. It can get [really out of
   control](https://twitter.com/droob/status/561161783239389185), [really
   fast](https://twitter.com/gaelmetais/status/564109775995437057).

`@extend` is now widely considered an anti-pattern, so its usage is thankfully
fading out, but we’re not quite there yet.

I was workshopping with a client yesterday and was asked about the mixin vs.
`@extend` situation, to which I gave my usual answer of <q>Don’t use `@extend`,
ever!</q>, and in return I was asked <q>But isn’t `@extend` better for
performance? It generates less code.</q>

It is true that `@extend` (when used correctly) will produce less CSS, but my
answer was a firm no: **mixins are better for performance**.

I answered the question with quite some confidence, despite having never
actually done any tests. The reason for my confidence was a pretty solid theory
that I had:

**Because gzip favours repetition, surely we’ll get a better compression ratio
if we share the exact same declarations, say, 1000 times, than if we shared
1000 unique classes twice.**

Y’see, when people talk about the performance of mixins, they’re usually
thinking about filesize on the filesystem. But because we have gzip enabled (you
_do_ have gzip enabled, right?), we should be thinking about filesize _over the
network_.

My thinking was that once we’ve gzipped our CSS, files with greater repetition
of identical strings will end up being smaller than files whose repetition is
less frequent, regardless of the size of the files on the filesystem. I posited
that a bigger file would end up smaller after gzip _if_ that extra filesize was
comprised of repeated string.

I got back to my hotel room and decided to put my theory to the test.

## The Experiment

Here’s what I did.

1. I created two CSS files.
2. Each file had 1000 unique classes, generated using Sass:

       @for $i from 1 through 1000 {
         .#{unique-id()}-#{$i} {
           ...
         }
       }
3. I gave each class a unique declaration, simply reusing the same random string
   that formed the name itself by using the parent selector, and I put some
   nonsense strings either side of that:

       @for $i from 1 through 1000 {
         .#{unique-id()}-#{$i} {
           content: "ibf#{&}jaslbw";
         }
       }
4. I then chose three simple declarations that would remain the same across all
   1000 classes:

       color: red;
       font-weight: bold;
       line-height: 2;
5. In one file, I shared these declarations via a mixin:

       @mixin foo {
         color: red;
         font-weight: bold;
         line-height: 2;
       }

       .#{unique-id()}-#{$i} {
         @include foo;
         content: "ibf#{&}jaslbw";
       }
6. And in the other I shared them via `@extend`:

       %foo {
         color: red;
         font-weight: bold;
         line-height: 2;
       }

       .#{unique-id()}-#{$i} {
         @extend %foo;
         content: "ibf#{&}jaslbw";
       }

<small>All of these test files (and more) are available [on
GitHub](https://github.com/csswizardry/extend-vs-mixin).</small>

This left me with two files made up of totally unique classes and 1000 unique
declarations, and with three identical declarations shared in two different
ways.

The filesizes of these should not surprise you in the slightest:

* `mixin.css` came in at **108K**.
* `extend.css` came in at **72K**.
* This gives a difference in filesize of **36K**.
* **Using mixins was 150% larger than using `@extend`.**

This is exactly what I expected—mixins _do_ produce more CSS than `@extend`
does.

But! We have to remember that we should not be worried about filesize on the
filesystem—we only care about the sizes of our gzipped files.

I minified and gzipped the two files and got the results I expected:

* `mixin.css` came in at **12K**.
* `extend.css` came in at **18K**.
* This gives a difference in filesize of **6K**.
* **Using mixins was 33.333% smaller than using `@extend`.**

Amazing! We’ve gone from mixins being 1.5× larger than using `@extend`, to
mixins being **0.3× smaller** than using `@extend`. My theory seems correct!

## Making Things More Realistic

I do feel that the test files were pretty fair—creating unique strings for class
names was designed to hinder compression, so that we could more accurately test
the effects of gzip on our actual subject: the shared declarations.

That said, the test files were pretty unrealistic, so I decided to make things a
little more reasonable.

I grabbed the compiled CSS from an existing project, made two copies of it, and
I `@import`ed each of my test files into each project respectively. This meant
that my test files were surrounded by some 1794 lines of actual, realistic CSS.

I compiled each new test file and these were the results:

* `mixin.css` came in at **16K**.
* `extend.css` came in at **22K**.
* This gives a difference in filesize of **6K**.
* **Using mixins was 27% smaller than using `@extend`.**

The absolute numbers seem trivial (a mere 6K), but in relative terms, we can
achieve a 27% saving over the wire simply by opting to use mixins to repeat
declarations over and over, as opposed to using `@extend` to repeat a handful of
selectors.

## Mixins Are Better for Performance

My tests showed pretty conclusively that mixins end up being better for network
performance than using `@extend`. The way gzip works means that we get better
savings **even when our uncompresssed files are substantially larger**.

This means that the performance argument for `@extend` is non-existent. As well
as being bad for your CSS, `@extend` is bad for performance. Please stop
using it.
