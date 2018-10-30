---
layout: post
title: "Improving Your CSS with Parker"
date: 2016-06-01 10:23:16
categories: Web Development
meta: "Using static analysis to learn where to improve your CSS"
lux: Post
---

[Parker](https://github.com/katiefenn/parker/) is an absolutely fantastic,
beautifully simple static analysis tool that gives you some very insightful
metrics about your CSS files. Parker is built and maintained by [Katie
Fenn](http://www.katiefenn.co.uk/), a developer from England who has since
become a friend.

I use Parker almost daily, and regularly go through it with my clients and
workshop attendees. Parker surfaces some really interesting numbers, and if you
know what they represent, you can draw some really valuable insights about your
CSS from them.

(As an aside, I have a pretty cool story about Parker:

I was delivering a workshop for a company in the UK a year or two ago, when a
woman in attendance asked me <q>Do you ever use Parker?</q> My answer was an
enthusiastic <q>Yes! I use Parker all the time! Do you?!</q>, to which she
replied <q>Yeah… I built it.</q> That was how/when I met Katie.)

- - -

Okay. Let’s go.

If you haven’t got it installed already, you’ll want to do that first. Parker
(`parker`) is a command line tool, which can be installed (`install`) globally
(`-g`) using npm (`npm`):

```
$ npm install -g parker
```

You can then run Parker against a compiled stylesheet like so:

```
$ parker path/to/stylesheet.css
```

I’d recommend running your current project’s CSS file through Parker right now.
If you don’t have a stylesheet to hand, [this
one](https://github.com/csswizardry/discovr/blob/67d21cd6948f439462357126d1fb85ee875eb57f/css/main.css)
will work pretty well. That one will give you some output like this:

```
Total Stylesheets: 1
Total Stylesheet Size: 37178
Total Rules: 260
Total Selectors: 365
Total Identifiers: 487
Total Declarations: 522
Selectors Per Rule: 1.4038461538461537
Identifiers Per Selector: 1.6821917808219178
Specificity Per Selector: 9.293150684931506
Top Selector Specificity: 30
Top Selector Specificity Selector: .c-score[data-score^="0."]
Total Id Selectors: 0
Total Unique Colors: 25
Unique Colors: #FFFF00,#000000,#C0C0C0,#F3F3F3,#333333,#378BB5,#FFFFFF,#666666,#E4E4E4,#FF2100,#FF4200,#FF6300,#FF8400,#CC9E00,#999600,#668F00,#338700,#317CA1,#CC0000,#ABC123,#98AB1F,#999999,#CCCCCC,#FFFF88,#4099C5
Total Important Keywords: 60
Total Media Queries: 5
Media Queries: screen and (min-width: 1024px),screen and (min-width: 1280px),screen and (min-width: 720px),screen and (min-width: 480px),screen and (min-width: 1200px)
```

This is the CSS file that I will be using as an example throughout this article.

We’re not going to look at every single one of these metrics in this blog post.
Instead, we’ll look at the slightly more abstract data and work out what it
represents, and what insights it gives us. We have to dig a little deeper for
the implicit meaning in a lot of these values, but once we’ve worked out what
we’re looking for, we open up a whole new world of knowledge.

- - -

Before we get too deep into things, there are a few of things we need to be
aware of when using Parker:

0. **This article was written in context of Parker version `0.0.10`.** If any
   major changes are released, I will endeavour to update this article
   accordingly.
0. **Parker reports mean values.** It would be quite nice to know that ‘most of
   your selectors have class-level specificity’, rather than ‘the average
   specificity across all of your selectors is roughly that of a class’. A
   subtle but significant distinction.
0. **Unfortunately Parker currently reports specificity incorrectly.** Katie and
   I are in active discussions about how best to tackle this, but for now it’s
   technically incorrect. In real terms—unless you have hellishly nested
   selectors using more than 10 classes—it shouldn’t impact you too much, but
   it’s certainly something to be aware of.

With these points in mind, please remember: Parker is not failsafe; it is not
infallible and nor does it claim to be. Parker is best used as a rough guide; a
finger in the air. Parker’s job is just to present you with the numbers; it’s
down to you to know what those numbers represent, and what they mean for your
CSS.

That’s what this article is for.

- - -

## Total Rules, Selectors, Identifiers, Declarations

All of these metrics are very self explanatory, and don’t need any special
mention. However, using two of these metrics we can actually polyfill a very
useful one that isn’t present (Katie and I are discussing its addition).

If we divide Total Declarations by Total Rules, we are left with the mean number
of declarations per ruleset:

**Total Declarations ÷ Total Rules = Declarations Per Ruleset**

Given our data set, we’re left with:

522 ÷ 260 = 2.007692308

We have an average of 2 declarations per ruleset.

What this tells us is how large each of our rulesets are: rulesets with lots of
declarations are probably quite monolithic, and could/should probably be broken
down into smaller composable responsibilities.

Take this example of an overly loaded ruleset:

```
.btn-login {
  display: inline-block;
  padding: 2em;
  background-color: green;
  color: white; 
}
```

There are a number of problems present here. Firstly, the name `btn-login`
describes a very specific use case, making it very difficult to reuse. Secondly,
this is a pretty monolithic ruleset—it handles everything about this button,
mixing up structural and cosmetic responsibilities. Instead, we could break this
out into:

```
.btn {
  display: inline-block; 
}

.btn--large {
  padding: 2em;

}

.btn--positive {
  background-color: green;
  color: white; 
}
```

Three smaller and more composable rulesets, each with a smaller number of
declarations. CSS like this likely adheres to the [Single Responsibility
Principle](http://csswizardry.com/2012/04/the-single-responsibility-principle-applied-to-css/),
meaning we have very well defined and encapsulated rulesets that can be combined
and composed in a very modular fashion.

This is how the Declarations Per Ruleset metric comes in handy.

- - -

## Selectors Per Rule

```
Selectors Per Rule: 1.4038461538461537
```

Selectors Per Rule is pretty simple. The following CSS has one selector per
rule:

```
.c-btn {
  display: inline-block;
  padding: 12px;
}

.c-btn--small {
  padding: 6px;
}

.c-btn--large {
  padding: 24px;
}
```

This CSS has two selectors per rule:

```
h1, .u-h1 {
  font-size: 3rem;
}

h2, .u-h2 {
  font-size: 2rem;
}

h3, .u-h3 {
  font-size: 1.5rem;
}
```

Straightforward enough, but what does this actually tell us?

Well, we want a number as close to one as possible. Lots of selectors per rule
suggests that we’re applying the exact same declarations (styles) to a number of
different selectors. Perhaps we could create a single catch-all selector to
handle all eventualities, making our CSS smaller, and abstracting patterns out
into more reusable selectors. Let’s look at an example of some poorly written
CSS that has lots of selectors per rule:

```
input[type="text"]
input[type="email"],
input[type="password"],
textarea {
  border: 1px solid #ccc;
  background-color: #fff;
  color: #333;
  padding: 4px;
}
```

As we add more input types to this site, that list of selectors continues to
grow. A much simpler and shorter solution would be to tie all of this
information up into a single reusable class, for example:

```
.c-input-text {
  border: 1px solid #ccc;
  background-color: #fff;
  color: #333;
  padding: 4px;
}
```

So no matter if the input handles email addresses, regular text, passwords, or
an input type yet to be invented, we don’t need to maintain a very
implementation-specific list of selectors.

We often end up with lots of selectors per rule for two key reasons:

0. **Fear of using classes in our markup:** The surprisingly still-persistent
   fear and avoidance of judicious use of classes in our HTML often leads to
   developers creating (and subsequently maintaining) unwieldy lists of
   selectors that are all chained to the exact same declarations. By adopting a
   more class-based architecture, we can begin to recycle these rules in a much
   more terse and practical way.
0. **Using Sass’ `@extend`:** Sass’ `@extend` functionality has long been
   considered an anti-pattern for a number of reasons <small>(please see
   [<cite>Extending silent classes in
   Sass</cite>](http://csswizardry.com/2014/01/extending-silent-classes-in-sass/),
   [<cite>When to use `@extend`; when to use a
   mixin</cite>](http://csswizardry.com/2014/11/when-to-use-extend-when-to-use-a-mixin/),
   [<cite>Mixins Better for
   Performance</cite>](http://csswizardry.com/2016/02/mixins-better-for-performance/)).</small>
   `@extend` transplants selectors from one part of your project to all
   converge on another. This has plenty of its own problems—detailed in the
   linked articles—but it ultimately gives us a long, unwieldy list of selectors
   chained to the same declarations; it increases our Selectors Per Rule.

In the extreme, it’s not uncommon to see `@extend` being abused by developers
striving to never repeat the same declaration twice, leading to CSS that looks
like this:

<blockquote class="twitter-tweet" data-lang="en-gb"><p lang="en" dir="ltr">Damn!
I wouldn&#39;t like to be the one who maintains this 125 lines CSS selector! <a
href="http://t.co/0jAEb2h8VF">pic.twitter.com/0jAEb2h8VF</a></p>&mdash; Gaël
Métais (@gaelmetais) <a
href="https://twitter.com/gaelmetais/status/564109775995437057">7 February
2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

A confusing mess of unrelated selectors all grouped together via coincidence as
opposed to reason. This fragments style information across your project, creates
unusual relationships and dependencies, removes encapsulation, and makes using
DevTools far more difficult:

<figure>
  <img src="/wp-content/uploads/2016/05/screenshot-extend-devtools.png"
alt="Screenshot showing the mess created in DevTools by Sass’ extend feature" />
  <figcaption><a href="/wp-content/uploads/2016/05/screenshot-extend-devtools-full.png">View full size/quality (135KB).</a></figcaption>
</figure>

- - -

## Identifiers Per Selector

```
Identifiers Per Selector: 1.6821917808219178
```

Identifiers per selector is **not to be confused with IDs**. Identifiers per
selector is a measure of parts per selector. For example, take the following
CSS:

```
.c-btn {
  /* 1 identifier */
}

.c-btn:hover {
  /* 2 identifiers */
}

.c-widget--large .widget__title {
  /* 2 identifiers */
}

header nav ul li a {
  /* 5 identifiers */
}
```

Nesting, qualifying, and pseudo selectors all increase the Identifiers Per
Selector metric, and we should strive to keep this number as small as possible.
Identifiers Per Selector is effectively our [Cyclomatic
Complexity](http://csswizardry.com/2015/04/cyclomatic-complexity-logic-in-css/).

Having a high number of identifiers per selector brings a few problems:

* **Increased specificity:** The more selectors we have in our compound
  selector, the higher the specificity will be. Specificity is best kept as low
  as possible.
* **Decreased portability:** It’s harder to move styles around the view when
  they’re tightly bound to a specific DOM structure.
* **Increased fragility:** The more parts in a compound selector, the more
  chances there are of something going wrong.
* **Increased filesize:** A minor issue, but any bytes added to your selectors
  cannot be reclaimed by a minifier—they’re dead weight.

For further reading about the problems with long selectors, please refer to my
article [<cite>Keep your CSS selectors
short</cite>](http://csswizardry.com/2012/05/keep-your-css-selectors-short/).

We want to see an Identifiers Per Selector value between 1 and 2 (remember, this
being a mean value means we can end up with decimals). We can’t have smaller
than 1 by definition. Anything over 2 means that, on average, every selector in
the codebase is the equivalent to everything being nested or qualified at least
once.

Our selectors should be as short as possible, but as long as necessary, and
Parker helps us measure this.

- - -

## Specificity Per Selector

```
Specificity Per Selector: 9.293150684931506
```

As mentioned, specificity is reported slightly incorrectly by Parker, but things
should still work okay for the most part.

In CSS, every type of selector has an inherent specificity value:

* **Universal selector:** 0/ignored
* **Element selectors:** 1
* **Class selectors, attribute selectors, pseudo selectors:** 10
* **IDs**: 100

When we look at a complex/compound selector, we add together all like selectors
(i.e. all IDs, all classes, all elements) and present the overall specificity as
three separate integers. For example:

```
#header #nav li a {}
```

…has a specificity of `200, 0, 2` because we have two IDs at 100 each, zero
classes at 10 each, and two elements at 1 each. Unfortunately, Parker reports
this as `202` as a result of adding the three integers together.

```
.c-btn:hover {}
```

…has a specificity of `0, 20, 0` because we have zero IDs at 100 each, two
class-like selectors at 10 each, and zero element selectors at 1 each.

```
input[type="text"] {}
```

…has a specificity of `0, 10, 1` because we have zero IDs at 100 each, one
pseudo class at 10 each, and one element at 1 each. Unfortunately, Parker
reports this as `11` as a result of adding the three integers together.

Because we are (or should be) working to a class-based architecture, we want to
see a number as close to 10 (the specificity of a single class) as possible.
Remember, however, that Parker reports mean values, so if you have lots of
element selectors or (heaven forbid) ID selectors, your reported value may be
skewed as a result.

Because it’s inevitable that we’ll have some nested selectors, and will
certainly have pseudo selectors attached to some of our classes, I would
typically deem a Specificity Per Selector value of anything up to 20 as being
‘safe’. Anything over 20 means that, on average, every selector in the codebase
is the equivalent to two classes worth of specificity.

If your value is over 20, you’ll want to remove any/all IDs you have in the
project, and look to reduce all unnecessary nesting and qualifying to get your
selectors as flat as possible.

- - -

## Total ID Selectors

```
Total Id Selectors: 0
```

This number should be exactly zero, as there is absolutely no good reason
whatsoever to use IDs in CSS. They are infinitely more specific than classes,
and instantly impossible to reuse: both of these traits are diametrically
opposed to the pursuit of modular and reusable CSS.

Further reading: [<cite>When using IDs can be a pain in the
class…</cite>](http://csswizardry.com/2011/09/when-using-ids-can-be-a-pain-in-the-class/),
[<cite>Hacks for dealing with
specificity</cite>](http://csswizardry.com/2014/07/hacks-for-dealing-with-specificity/).

- - -

## Total Unique Colors

```
Total Unique Colors: 25
```

This metric is pretty subjective, and will depend a lot on your project. If
you’re working on a large site with lots of themes and sub-themes, expect to see
a relatively large number. If you’re working on a smaller site with a limited
_obvious_ colour scheme, be suspicious of larger numbers.

Given the small size of the demo project we’re using for this article, a value
of 25 surprises me a little. I should create a design task to look through the
project and begin to audit and rationalise my use of colours.

**Live update:** I actually did just go and explore where all the numerous
unique colours were coming from, and I tracked it down to [my colour-coded
scoring
component](https://github.com/csswizardry/discovr/blob/67d21cd6948f439462357126d1fb85ee875eb57f/css/components/_components.score.scss):
the existence of these colours is, thankfully, both intentional and justifiable.

- - -

## Total Important Keywords

```
Total Important Keywords: 60
```

`!important` isn’t as evil as we like to make out, so if you reported number is
not zero, you don’t necessarily need to panic. Just ensure that any instances of
`!important` are only found against your utility classes.

To understand how and when we should use `!important`, please see my recent
article [<cite>The Importance of `!important`: Forcing Immutability in
CSS</cite>](http://csswizardry.com/2016/05/the-importance-of-important/).

To get a quick look at where `!important` is being used in your project, try
running this inside of your CSS directory:

```
$ git grep --break -C 2 "\!important"
```

This will show you all instances of `!important` with two lines of context (`-C
2`) either side of the result. Hopefully the two lines of context allow you to
see the selectors that the `!important` lives inside; if not, just try
increasing the number.

- - -

## Practical Usage

Let me close with some little tips and tricks for getting some real and
immediate practical value out of Parker…

### The Worst Offender

Initially we’ll want to run Parker over all of our entire compiled project, and
get a report for every single line of CSS we have. Not only does this give us a
handy project-wide overview of things, it tells us what our <i>worst
offender</i> is: it’s our **Top Selector Specificity Selector**.

This is the current worst selector in our project, so  this is the first/next
thing we need to fix. Once we’ve refactored that down and removed it, we run
Parker again. Now we’ll get a new worst offender, and we refactor that, and so
on. This gives us tiny, bitesize chunks of refactoring work where we only ever
have to focus on our worst bit of CSS, rather than being over faced with a
project’s worth of fixes.

### Anomalous Data

**Calculating the mean values means that any anomalous data points will skew our
results.** The problem with means is that if I have one hand in the fire and one
hand in the freezer, on average I’m a comfortable temperature. Means are only
useful when you’re comparing similar data points, so any outliers will affect
the results. This means that running Parker across an entire codebase might not
always give us an entirely representative report (if we have a legacy project
that has lots of nesting, or IDs, those selectors will pull our mean values a
little higher).

To combat this, I often pull out discrete features of the CSS project and run
Parker over those in isolation. For example, copy/paste your button styles out
of your compiled Stylesheet and into its own `buttons.css` file, and run Parker
over that. This means we can study the quality of our CSS in smaller chunks
which has a few key benefits:

0. **We get much better results.** As discussed above, we’re comparing like data
   points, so get more representative metrics.
0. **It isolates any potential refactoring work.** If Parker suggests we need to
   rework or refactor anything, at least we’re only dealing with discrete
   features at a time, and not having to start refactoring our entire project.
0. **We can descope certain bits of our CSS.** There’s little use having Parker
   report back on our reset or Normalize.css, so we can exclude any setup or
   library code.

- - -

Parker is a really useful, valuable tool that presents us with some seemingly
obvious and simple data. As soon as we understand what these numbers represent,
and the principles behind them, we can quickly begin to asses and improve the
quality of our CSS.

I’d really recommend running Parker over your existing project(s) right now, and
then begin to make it a part of your regular development workflow.
