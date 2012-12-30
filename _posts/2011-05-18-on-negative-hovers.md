---
comments: true
date: 2011-05-18 20:26:07
layout: post
slug: on-negative-hovers
title: On negative hovers
wordpress_id: 2702
categories:
- Web Development
tag:
- CSS
- HTML
- UI
- UX
---

I’ve been <del>mentioning</del> moaning about something called _negative hovers_ on Twitter for ages now, so it’s about time I wrote a quick post on them.

At their most basic a negative hover is a link whose appearance is subtracted from on hover rather than added to. This might mean they go from:

<dl>
  <dt>Normal</dt>
  <dd>Dark colour</dd>
  <dd>Underlined</dd>
  <dd>A background</dd>

  <dt>On <code>:hover</code></dt>
  <dd>Paler colour</dd>
  <dd>Not underlined</dd>
  <dd>No background</dd>
</dl> 


Or any combination of the above.

It is in my (and lots of other people’s) opinion that these are a _bad thing_. Here I’ll try and explain why I don’t like them. Be sure to look at [the negative hovers example](http://jsfiddle.net/csswizardry/WtNqs/) so the rest makes sense to you.

## Spot the odd one out

Hovering any of the links in the list or the paragraph removes their underline or background which puts them on the back seat, surrounded by the overpowering underlines/backgrounds of the other links surrounding it. The hovered link is the odd one out, but in the wrong direction. The odd one out should be _more_ apparent than its neighbours, not less.

Hover [any link on this page](http://jsfiddle.net/csswizardry/WtNqs/) and see how hard it is to quickly see which one is hovered. It’s pretty difficult, because its appearance is so much more modest than the links that aren’t even being hovered at all!

Now compare that with [this page](http://jsfiddle.net/csswizardry/aj6sN/).

Imagine a user has tabbed to those link. They don’t have their mouse cursor over the ‘current’ link as a visual cue, they’re lost looking for an non-underlined link in a sea of underlined ones. This makes the whole experience more difficult than it needs to be.

## Underlines are obtrusive

Underlines are just plain ugly. Especially when you’ve got a few links in continuous text. If you start off with underlined links all you can notice _is_ lines. The text becomes secondary to the underlined links and that makes reading and scanning a chore. You don’t want to interrupt someone’s reading experience with unsightly underlines.

## Intuition

The least quantifiable/solid argument is that _it just feels wrong_. That doesn’t sound like a great argument, but bear with me...

If you hover or _act_ on something in a positive way (giving it attention, wanting to perform something), you would expect that to respond in a positive way, right? If you want to click a link that will, say, take you to another page, you don’t want that link to ‘shy away’ from you, do you? It feels more intuitive that that link would ‘stand forward’ and act positively, becoming more-than-it-was as soon as you focus your attention upon it.

As a UI designer/developer I think this ‘feeling’ speaks volumes. It doesn’t seem right that a positive* action would result in a negative appearance...

*Positive meaning ‘doing something’, even if that something is negative (such as a deletion). Does that even make sense?

## The answer?



[Positive hovers](http://jsfiddle.net/csswizardry/aj6sN/), of course!

If you started with a pale blue, make it darker on `:hover`. If you started on a non-underlined link, underline it on hover, or give it a background colour. Simply make its appearance _more_ than what it was before you hovered it.

<dl>
  <dt>Normal</dt>
  <dd>No underline</dd>
  <dd>Underlined</dd>
  <dd>Background</dd>

  <dt>On <code>:hover</code></dt>
  <dd>Underlined</dd>
  <dd>Add a background colour</dd>
  <dd>Darken/increase contrast</dd>
</dl>

### Issues

There is only one issue I can think of, specifically when starting off non-underlined; accessibility. Colour blind users may not necessarily be able to distinguish a link based on colour alone. Try and use a decent contrasting colour to avoid this...

## Final word

So there you have my thoughts on negative hovers. They’re counter-intuitive and can be obtrusive, but do you agree? Let me know! I’d be interested to hear any counter arguments.
