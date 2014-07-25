---
comments: true
date: 2014-05-21 16:40:12
layout: post
slug: grouping-related-classes-in-your-markup
title: Grouping related classes in your markup
categories:
- Web Development
tag:
meta: "An interesting way of visually and ‘physically’ grouping multiple class attributes"
---

A few weeks back, [I put out a
Tweet](https://twitter.com/csswizardry/status/439383832920604672) to [a
jsFiddle](http://jsfiddle.net/csswizardry/m2qa9/) describing an idea I’d had in
which I grouped two or more related class attributes to make them easier to
notice when scanning an HTML file, and—coincidentally—trivial to manipulate very
effectively with Vim, my text editor of choice.

I was grouping them by enclosing them in square brackets, and that looks
something like this:

    <div class="[ foo  foo--bar ]  baz">

Since sharing the demo, I’ve used this method on a few builds, and people on
[Twitter](https://twitter.com/csswizardry) have asked me about the presence of
the brackets, so I thought I’d write it up into a full article. Before we get
into things too far though, there are a couple of things I’d like to say up
front.

Firstly, after I shared the link to the jsFiddle, I got a few replies about a
much earlier method [along similar
lines](http://beneverard.co.uk/blog/using-slashes-within-the-html-class-attribute/)
from [Ben Everard](https://twitter.com/_beneverard), so the idea of visually
_separating_ classes isn’t all that new. Where this method differs, however, is
the concept of _grouping_ them, as opposed to just delimiting them. More on that
later.

Secondly, and more importantly, **this article is not a direct endorsement of,
or recommendation for, this method**, this is just a writeup of an idea. It has
benefits and drawbacks—as do most things—so your mileage _may_ vary. I will
discuss relative merits and pitfalls later in the article so that you can decide
whether this is a good thing _for you_, rather than it being a good or bad thing
_in and of itself_.

## How it works

There is no hard and fast rule as to how and when to begin grouping your
classes, but the guidelines I’ve set for myself are:

* There must be more than one ‘set’ of classes.
* One ‘set’ must contain more than one class.

This basically just ringfences any groups that _need_ it, for example:

<pre><code><span class="code-comment">&lt;!-- Only one set. Nothing needs grouping. --&gt;</span>
&lt;div class="foo  foo--bar"&gt;

<span class="code-comment">&lt;!-- Two sets, but only one class in each. Nothing needs grouping. --&gt;</span>
&lt;div class="foo  bar"&gt;

<span class="code-comment">&lt;!-- Two sets, one of which contains more than one class. This set needs grouping. --&gt;</span>
&lt;div class="[ foo  foo--bar ]  baz"&gt;

<span class="code-comment">&lt;!-- Two sets, both of which contain more than one class. These sets needs grouping. --&gt;</span>
&lt;div class="[ foo  foo--bar ]  [ baz  baz--foo ]"&gt;
</code></pre>

If these rules seem a little convoluted—and they might—feel free to experiment
with your own. You could simplify it right down to ‘any groups always need
enclosing’, like so:

    <div class="[ foo  foo--bar ]">

    <div class="[ foo ]  [ bar ]">

    <div class="[ foo  foo--bar ]  [ baz ]">

    <div class="[ foo  foo--bar ]  [ baz  baz--foo ]">

How you group them can be entirely your choice, the concept here just deals with
the fact that we’re grouping things _at all_.

It’s important to note here that I’m using [BEM-style
naming](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/),
which already starts to group classes anyway. If you’re not using BEM, your HTML
might look like this:

    <div class="[ box  promo-box ]  sign-up">

We can see here that the classes `.box` and `.promo-box` are related, and
`.sign-up` is an orphan, for want of a better word.

## Scanning your code

{% include promo-case-studies.html %}

I’ve long been a vocal advocate of using [more classes in your
markup](http://csswizardry.com/2012/10/a-classless-class-on-using-more-classes-in-your-html/):
it just makes for more pragmatic, manageable, scalable development. It does,
however, make your markup a little heavier. This is a small price to pay for the
advantages that a nicely decoupled, [single
responsibility](http://csswizardry.com/2012/04/the-single-responsibility-principle-applied-to-css/)
UI, built on a well-abstracted, highly composable codebase brings, but it’s
always nice to try and mitigate the effects of more verbose HTML. I feel that it
would be nice to have the best of both worlds (hence my proposal for
[<cite>Naming UI components in
OOCSS</cite>](http://csswizardry.com/2014/03/naming-ui-components-in-oocss/)),
so I’m constantly looking for ways to try and keep an even balance.

[BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)
is already an incredibly solid start in making your HTML a lot more transparent:
having namespaces in your classes paints a really clear picture of which classes
are related to one another, if at all. It leaves you with highly descriptive
markup that is simple to work with and debug.

One of BEM’s key strengths is its _scannability_, and, to my mind, there are two
levels of reading code: the first is actually reading it, taking it in, learning
what it is doing; the second is _scanning_ it, which is a really high-level look
over some code, perhaps to find something, perhaps to just give it a once-over
to check its general sanity, or just poking around. I often feel we put a lot of
weight on the former—_reading_ code—and nowhere near enough on the
latter—_scanning_ it.

What I find the square brackets offer me is a very visual way of absorbing (i.e.
scanning) an HTML page. The square brackets become _very_ apparent—very
noticeable—when giving some code a very high-level read, so I can very easily
spot composed patterns without having to get too involved in the code itself.

## Vim

Another absolutely _huge_ benefit of grouping classes inside something (rather
than just delimiting them with something like slashes or pipes) is that you can
begin to manipulate them with certain text editors (my editor of choice being
Vim).

Using commands like `ya[` (yank around square-brackets), `ci[` (change inside
square brackets), `da[` (delete around square brackets), we can, respectively:
copy everything inside the square brackets, including the brackets themselves;
change everything inside of the square brackets, leaving the square brackets
intact; delete everything inside of the square brackets, and delete the square
brackets as well. Once we’ve done this, we can then go and `p`ut (paste) the
copied groups elsewhere.

This means that I can modify, duplicate, move, delete, and generally manipulate
entire groups of classes very rapidly. Powerful stuff, particularly if—like
me—you like to work by composing UIs and patterns in your HTML (think grid
systems, OOCSS, etc.).

I made a very crude screencast of this in action—all commands are done without
needing to reach for a mouse, or nudging around text-selections whilst holding
the `Shift` key.

<figure>
  <iframe name='quickcast' src='http://quick.as/embed/vdwjhl2j' scrolling='no' frameborder='0' width='100%' allowfullscreen></iframe><script src='http://quick.as/embed/script/1.25'></script>
  <figcaption>Working with grouped classes inside of Vim.</figcaption>
</figure>

However, this feature is a combination of Vim’s power _and_ us leaving handy
markers for Vim to work with. If you aren’t using Vim, or a similarly powerful
text editor, then these benefits will not be quite so apparent. If you fancy
learning Vim—and I really would recommend it—simply open your terminal and run:

    $ vimtutor

This will give you a really easy-to-follow, well-paced introduction to Vim.

## Validity

Using square brackets in HTML’s `class` attribute is completely valid. In fact,
where HTML is concerned, `class` attributes can legally contain _any_ character
at all. From the HTML5 spec:

> There are no […] restrictions on the tokens authors can use in the class
> attribute…

In CSS, however, the `[` and `]` characters are _invalid_ in a class, unless it
is escaped. That is to say, this will _not_ work:

    .[ {
        color: red;
    }

However, this will:

    .\[ {
        color: red;
    }

Using square brackets in your class attributes is valid, and won’t trip browsers
up (I’ve tested this personally in browsers as far back as IE7–8).

As we shall see next, though, this being valid does not free us from the chance
of errors occurring.

## Errors

As I mentioned previously, however, this method is not without its drawbacks, so
please take these—and [your own
context](http://csswizardry.com/2013/01/you-know-your-context-on-critical-thinking-and-thinking-for-yourself/)—into
account when considering adopting it.

The first possible pitfall with this method of using square brackets to group
your classes is that it becomes a lot more easy to introduce errors. Traditional
classes are pretty difficult to get wrong. In fact, nine-times-out-of-ten, the
only way you could get a non-matching class would be a simple typo.

When introducing these square brackets, however, we are also introducing a huge
potential for error. Whilst the following is perfectly valid, and will work just
fine:

    <div class="[ foo  foo--bar ]  baz">

Making a mistake by writing the following will invalidate things completely:

    <div class="[ foo  foo--bar]  baz">

This is something to be wary of, because `.foo--bar` and `.foo--bar]` are two
_very_ different things. This becomes even more of a problem in situations
where:

* **You’re writing classes to the view dynamically.** If you have templating
  logic in your markup, it can often be hard to see where these errors might
  occur, and they also become harder to debug.
* **You have team members unfamiliar with the convention.** Seeing something
  like this may well be confusing to a developer who’s never used it before, so
  it is possible that they won’t understand the caveats required for it to work.

## Extra bytes

One response I’ve had more than once is the concern with more bytes over the
wire. This is something of a non-discussion, but I’ll address it anyway: if
you really care about class-attribute bytes over the wire, you should be using a
CSS obfuscater like [Google’s Closure
Stylesheets](https://code.google.com/p/closure-stylesheets/#Renaming).

**Crunching raw HTML bytes is a job for a tool, not a developer.**

## Teams

One of the main drawbacks of this method is its use in team environments, which
is quite ironic considering my work centres a _lot_ around managing codebases in
teams.

The first and foremost—and most obvious—issue is the fact that it needs
explaining at all. The fact I’ve managed to get a few-hundred-word article out
of this _may_ be testament to its unusual and potentially confusing nature.

This will always the case when adopting new methodologies—like BEM, for
instance—but it _is_ an overhead that cannot be ignored. The existing team will
need to learn and be on board with this grouping methodology, and any new hires
will also need teaching. It’s another hurdle; a small one, but definitely
_another_.

## JavaScript

As [Todd Motto](https://twitter.com/toddmotto) pointed out [over
Twitter](https://twitter.com/toddmotto/status/469145603747106816), this method
_may_ have some impact on JavaScript interacting with your classes. I only
ever bind onto `.js-*` classes, so these would typically never get grouped, but
you may hit problems elsewhere. Again, your mileage may vary.

Todd did follow up with:

> Adding classes is okay, even with ‘nested’ grouping […] if you’re using
> `.js-*` then you’ll be fine.

## To use, or not to use?

This is entirely up to you. I’ve been using it on all builds recently, and I’m
really liking it. It has been alien to other developers I’ve been working with,
but I’ve been able to explain it, and I have had _one_ incident of
dynamically-generated classes breaking.

Because I use Vim, I really do get a lot of use out of this, and because I’m a
vocal advocate of using more classes, it helps me spot and manage them in my
markup.
