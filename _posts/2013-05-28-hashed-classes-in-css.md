---
comments: true
date: 2013-05-28 23:05:07
layout: post
slug: hashed-classes-in-css
title: Hashed classes in CSS
categories:
- Web development
tag:
meta: Spoofing the uniqueness of IDs by putting hashes in your classes
---

I gave a talk at [Beyond Tellerrand](http://2013.beyondtellerrand.com/) yesterday
in which I shared some advice concerning the use of IDs in CSS, something which
[I vehemently recommend you avoid](/2011/09/when-using-ids-can-be-a-pain-in-the-class).
[Vitaly](http://twitter.com/smashingmag), who was in the audience,
[tweeted a snippet of the advice](https://twitter.com/smashingmag/status/339029930551676930)
which was, unfortunately, a little out of context. I got a _lot_ of tweets after
that asking that I explain further, so here it is…

---

For a long time now I have advised people _not_ to use IDs in CSS. Use them in
your JS, sure, and as fragment identifiers in HTML, but do not use them to style
things in CSS. The reasons for this are, firstly, lack of reusability and
secondly—and more importantly—_they are a specificity heavyweight_. Instead of
covering the specificity problems again, you can check out [the article I
previously wrote on the subject](/2011/09/when-using-ids-can-be-a-pain-in-the-class)
back in 2011.

Whenever I give this advice I typically get mixed reactions; a lot of people see
how it makes sense and (already) heed the advice; others seem to loathe it.  I
have honestly _never_ heard a genuinely compelling argument for using IDs in
CSS. Not. One. The closest I _have_ heard to a decent argument is along the
lines of:

> Using an ID in my CSS allows me to see _from my markup_ what is intended to be
> unique.

I was addressing this argument
[in my talk](https://speakerdeck.com/csswizardry/architecting-scalable-css-1?slide=34),
which is where the out-of-context tweet came in. I shall attempt to paraphrase
this chunk of my talk below…

This argument, to me, feels very weak. I can’t imagine why you’d ever want to
mark something as being unique, and even if I could I do not think that
introducing such a heavily-specific selector is worth the payoff. _However…_ My
advice that I gave on stage was simply that _if_ you do find value in marking
something as unique, then do this with a naming convention rather than using an
ID. The example I used was this:

<pre><code>&lt;ul class="nav  <mark>#site-nav</mark>"&gt;</code></pre>

Which, of course, would replace:

    <ul class="nav" id="site-nav">

This is valid HTML and [can be styled via CSS](http://jsfiddle.net/HUekN/), like so:

    .\#site-nav{}

The reason for using the `#` should be pretty obvious; it _looks_ like an ID.
The _problem_ with using the hash symbol is that it does need escaping in CSS.
You could use a naming convention like this, instead:

    <ul class="nav  _site-nav">

Which would be [styled with](http://jsfiddle.net/wM5Sh/):

    ._site-nav{}

Of course, this is all just an alias for:

    .this-is-unique-site-nav{}

So my advice was basically:

**If you really need/want to mark something as being unique in CSS, prepend a
class with a ‘reserved’ character to denote this instead of using an overly
specific ID.**

{% include promo-case-studies.html %}

Of course, still use IDs in your JavaScript, but where CSS is concerned they
should always be avoided. You can signal uniqueness via other means, such as a
prefix/namespace.

If you _are_ hooking onto an element by ID in JavaScript, it can be tempting to
also style via this pre-existing hook. This is unwise, as it fails to decouple
your CSS layer and your JS layer; that is to say, deleting the _one_ ID would
remove _both_ your JS _and_ CSS, and these things should have two totally
separate ‘hooks’ on which they bind.

In this situation I would recommend something like this:

    <div class="#foo" id="js-foo">

* `.#foo` is our faux-ID to be used in CSS.
* `#js-foo` is our JS-specific ID that we attach behaviour to.

---

It’s probably worth noting that **I don’t actually like this idea of faux-IDs**,
but if you _do_ need to flag something as being unique in CSS, I _do_ find it
better than using actual IDs themselves.

* Does it make something appear to be unique? **Yes.**
* Does it have a nice, low specificity? **Yes.**
* Is this a good idea? **No.** But that’s because I don’t think that marking
  something as unique is necessary, which renders this idea totally pointless.

**tl;dr** If you need a selector to appear to be unique (though I can’t imagine
why you _would_ want this) then present that uniqueness through a naming
convention and not an overly-specific ID.

Hopefully that clears up some of the confusion.
