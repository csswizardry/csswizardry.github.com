---
layout: post
title: "Typography for Developers"
date: 2017-02-06 22:22:34
categories: Web Development, Typography
meta: "A look at the simple differences that developers and engineers can make in order to improve the quality of their typography"
---

<style>
._tfd-demo {
  font-family: Georgia, serif;
  font-size: 32px;
  text-align: center;
}
</style>

Since as long as I can remember, I’ve had a soft spot for typography, and when
it makes up so much of the web, typography should be good. Learning how to
design with type, and pair typefaces, is a skill unto itself, but the good news
for us less design-minded developers is that there are a few simple rules we can
follow to get guaranteed better looking text with almost zero effort. And if
there’s one thing developers love, it’s rules.

Time and again I see mis-implemented type that could have been avoided simply by
developers having a better appreciation for, and understanding of, some
typographical nuance. Learn and memorise the rules in this article and you’ll
find that your text will become much more harmonious and polished, and you won’t
have designers bugging you about using the wrong type of dash…

## Ellipses

Let’s start with the simplest one, the ellipsis. The ellipsis represents an
omission or trailing of thought. It is a single glyph comprising three dots,
like so:

<p class="_tfd-demo">To be continued…</p>

Try highlighting the three dots: notice how there’s only one character there,
not three? That because the ellipsis is not three separate period glyphs, and it
most **definitely** isn’t a whole series of periods:

<p class="_tfd-demo">To be continued........</p>

That isn’t a thing at all, so certainly never do that.

If you want to write an ellipsis character, you have a few options:

| Mac   | Win      | HTML       | Output |
| ----- | -------- | ---------- | ------ |
| Alt+; | Alt+0133 | `&hellip;` | …      |

- - -

## Quotes

The quotes you find on your keyboard are ambidextrous, or _dumb_ quotes. They
are big, awful, clumsy, straight lines that look like wedges jammed into your
text. They exist purely because of space constraints on modern keyboards: there
just isn’t enough room to have left and right single- and double-quote marks, so
instead we have quote marks that can do both.

<p class="_tfd-demo">'Single' and "double" dumb quotes. Ugly.</p>

These are the kinds of quotes you’re used to writing in your code, and they’re
fine there, but in any prose we want to make sure we use proper _book_ quotes.
Their purposefully designed shapes are much more sympathetic to the typeface,
and are visually much less jarring:

<p class="_tfd-demo">‘Single’ and “double” book quotes. Beautiful.</p>

### Apostrophes

Apostrophes follow the same rule as quotes, and use the same glyph as a right
single quote:

<p class="_tfd-demo">It's awful like this.</p>

See how awkward and harsh that looks? Like it doesn’t belong?

<p class="_tfd-demo">It’s much nicer like this.</p>

| Mac         | Win      | HTML      | Output |
| ----------- | -------- | --------- | ------ |
| Alt+]       | Alt+0145 | `&lsquo;` | ‘      |
| Alt+Shift+] | Alt+0146 | `&rsquo;` | ’      |

### Sixty-Sixes and Ninety-Nines

When I was at school we were taught that opening quotes look like two sixes, 66,
and that closing quotes look like two nines, 99. This likeness is much more
apparent in serif faces:

<p class="_tfd-demo">“Sixty-sixes and ninety-nines.”</p>

| Mac         | Win      | HTML      | Output |
| ----------- | -------- | --------- | ------ |
| Alt+[       | Alt+0147 | `&ldquo;` | “      |
| Alt+Shift+[ | Alt+0148 | `&rdquo;` | ”      |

However, I seldom use double quotes. I share Jost Hochil’s sentiment that <q>[a]
more attractive appearance is achieved by using single quotation marks for the
more frequently occurring quotations, and the double version for the less
frequent occurrence of quotations within quotations.</q>[^1]

American English tends toward the use of “double quotes”, but I much prefer the
less obtrusive appearance of ‘single quotes’. They look far more subtle in
passages of text, and the best typography always goes unnoticed.

<p class="_tfd-demo">‘Sixes and nines.’</p>

- - -

## Dashes

Dashes are a whole chapter unto themselves. Again, as with the ambidextrous
quotes, physical limitations on keyboards meant that we have just one catch-all
key, the hyphen, that is often called upon to fulfil the role of all kinds of
dash.

### Hyphens

The hyphen on your keyboard is actually only useful for a small number of tasks.
If you need a compound modifier (e.g. a _light-green dress_), a double barrelled
name (e.g. _Robert Bayden-Powell_), or words split over two lines in justified
text, you should use a hyphen. Pretty much everything else has a more specific
type of dash that should be used.

<p class="_tfd-demo">Front-end Developer</p>

| Mac         | Win      | HTML      | Output |
| ----------- | -------- | --------- | ------ |
| -           | -        | `-`       | -      |

### Minuses

If you really want to show off, there’s technically a different character for
minuses. A hyphen is a very close approximation, but is set a little lower and
shorter than a true minus.

<p class="_tfd-demo">Your balance is £-1902.</p>

<p class="_tfd-demo">Your balance is £−1902.</p>

Use this in any math you need to write, or for displaying negative values.
Unfortunately it’s a little harder (read, potentially impossible) to write out
on a Mac.

| Mac         | Win      | HTML      | Output |
| ----------- | -------- | --------- | ------ |
| N/A         | Alt+2212 | `&minus;` | −      |

### En Dashes

The en dash is a slightly longer dash used to denote ranges or relations, e.g.:

<p class="_tfd-demo">Refer to pages 88–93.</p>

<p class="_tfd-demo">Father–son relationship.</p>

It is typically, though not necessarily, half the width of the em dash.

| Mac         | Win      | HTML      | Output |
| ----------- | -------- | --------- | ------ |
| Alt+-       | Alt+0150 | `&ndash;` | –      |

### Em Dashes

The em dash is usually one em wide (hence the name), meaning that it would be 24
points wide in a 24pt font, 12pt wide in a 12pt font, and so on. It represents a
change in thought, and is a slightly more elegant substitute for parenthesis.

<p class="_tfd-demo">It has been said—though I would say otherwise—that I’m
something of a pedant.</p>

It could also be used in place of a colon.

<p class="_tfd-demo">The three technical ingredients for responsive web
design—fluid grids, flexible images, and media queries.</p>

| Mac         | Win      | HTML      | Output |
| ----------- | -------- | --------- | ------ |
| Alt+Shift+- | Alt+0151 | `&mdash;` | —      |

Em dashes are usually set with no space between them and the adjoining
character, however some people prefer to use an en dash set with spaces and
avoid the em dash altogether. I’m not so much a fan of this approach as it can
often look a little ambiguous, but let your decision be guided by your
styleguide and/or the typeface.

<p class="_tfd-demo">Spaced en dashes – like these – can take the place of
ems.</p>

#### Hair Spaces

Again, if you’re feeling particularly fancy, you can set your em dashes with
hair spaces (`&#8202;`) either side of them.

<p class="_tfd-demo">Hair-spaced em dashes&#8202;—&#8202;like
these&#8202;—&#8202;are pretty neat.</p>

| Mac         | Win      | HTML      | Output    |
| ----------- | -------- | --------- | --------- |
| N/A         | N/A      | `&#8202;` | ]&#8202;[ |

- - -

There’s plenty more out there to be learned, but for now I think that would make
a great start. A few simple rules that drastically improve the quality of your
text without you needing any real design knowledge.

- - -

[^1]: [<cite>Detail in Typography</cite>](https://www.amazon.co.uk/Jost-Hochuli-Typography-English-Reprint/dp/2917855665/)
