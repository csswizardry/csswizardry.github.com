---
layout: post
title: "Subtleties with Self-Chained Classes"
date: 2015-06-11 15:54:28
categories: Web Development
meta: "A brief note on some of the subtleties and oddities when chaining classes
with themselves."
---

This is a really short post to publish an email thread I just had with a
client-turned-friend who’d emailed me asking for a bit of advice concerning
self-chained classes (e.g. `.foo.foo {}`).

The question was basically surrounding the number of ‘links’ in the chain and
its relation, if any, to the number of times that class appears in the HTML.
That is to say, does `.foo.foo {}` equate to specifically `class="foo foo"`, and
`.foo.foo.foo {}` to `class="foo foo foo"`, and so on?

**Client, to me:**

> Hi there,
> 
> Hope you are well.
> 
> I wanted to check with you on a CSS thingy: I was convinced that this would
> render three differently coloured texts, but it doesn’t [they’re all blue]
> and I can’t find any explanation online:
>
    .column { color: red; }
    .column.column { color: green; }
    .column.column.column { color: blue; }
>
> Demo: [jsfiddle.net/otk9661u](https://jsfiddle.net/otk9661u/).
> 
> Why does it do that?

**Me, to my client:**

> Hey!
> 
> All good here thanks. In sunny London working for a really cool client. How
> are you? And everyone else…?
> 
> Hmm. This is a funny one! Surprisingly, they’re all the same selector.
> 
> `.color {}` says ‘Is there a class of `color`?’
> 
> `.color.color {}` doesn’t say ‘Are there two classes of `color`?’, it just
> asks the same question twice. It doesn’t actually do any ‘counting’ in the
> HTML. It’s a subtle but important difference, as you’ve found out!
> 
> If you do want to style based on ‘counting’ the number of classes in your
> markup, you could rewrite it as this:
>
    [class="column"] { color: red; }
    [class="column column"] { color: green; }
    [class="column column column"] { color: blue; }
>
> Demo: [jsfiddle.net/ssj4recq/1](https://jsfiddle.net/ssj4recq/1/).
> 
> This will give you the expected behaviour, and handily all three selectors
> have the same specificity as each other. You’ll remember from the workshop
> how self-chaining classes increases the selector’s specificity correspondingly
> (allowing us to [Hack
> Specificity](http://csswizardry.com/2014/07/hacks-for-dealing-with-specificity/)).
> Well that’s not going to be a side effect here.
>
> What’s the use case for it anyway? Seems a little funky to be honest. :P
> Naturally I would suggest trying to avoid doing either.

So yeah. Chaining classes doesn’t actually count (or look out for) <var>n</var>
classes in your markup, it just asks the same question <var>n</var> times.

If, for whatever reason, you do need to ‘count’ the number of classes, you’ll
need to hard-code an attribute selector with the exact number in there. This
will be quite brittle as the whitespace is stringified as well, so if your
template puts classes on a new line (or anything like that) the string will no
longer match. Plus, we’re not technically counting anything: we’re looking out
for an exact string that we just happen to have typed the same sequence of
characters into several times.
