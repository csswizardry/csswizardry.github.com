---
layout: post
title: "Continue Normalising Your CSS"
date: 2016-10-19 12:40:58
categories: Web Development
toc: false
meta: "Why we should still be using Normalize.css"
---

Shaun Rashid’s 2015 article [<cite>Normalize (CSS) No
More</cite>](http://shaunrashid.com/2015/09/15/normalize-css-no-more/) has been
making its way round the Twittersphere again recently, and it’s brought a few
questions to my mind. This post isn’t a direct rebuttal or criticism of Shaun’s
article, but rather my own take on things in the form of a response.

In Shaun’s article, the argument is made that normalising CSS (specifically via
[Normalize.css](http://necolas.github.io/normalize.css/), but presumably the
argument extends to anything of its ilk, like a more traditional reset) goes
against the philosophy that [websites do not need to look the same in every
browser](http://dowebsitesneedtolookexactlythesameineverybrowser.com/): a stance
we fought very very hard to achieve. Whilst I absolutely agree that websites do
not need to look the same in every browser—doing so is very time consuming,
usually very frustrating, and seldom worth the time or effort—this argument is
made on a false assumption: that Normalize.css exists to make websites look the
same in every browser.

**When we talk about making websites look the same in every browser**, we’re
usually discussing the fact that it’s okay for round corners to be absent in
browsers that don’t support `border-radius`, or that we can live with subtle
layout shifts from one browser to another, or that we can progressively enhance
visual features where possible. This is something I agree with wholeheartedly.

**When we talk about Normalize.css**, we’re not talking about making websites
look the same in every browser, we’re talking about providing a consistent and
bug-free baseline. We’re talking about making a consistent baseline to make
development easier. Normalize.css isn’t for our users or our clients, it’s for
us as developers. We should always put the user first, but developer convenience
is still a thing.

From Nicolas’ [article in which he introduces
Normalize.css](http://nicolasgallagher.com/about-normalize-css/):

> Resets impose a homogeneous visual style by flattening the default styles for
> almost all elements. In contrast, [N]ormalize.css retains many useful default
> browser styles.

So please, do keep using Normalize.css. It makes your life easier, and with an
absolute minimal overhead: v5.0.0 is a mere 984 bytes after gzip. For context,
that represents [less than 1.3% of the average CSS
project](http://httparchive.org/interesting.php#bytesperpage).

Or, at the very least, try not to dismiss it based on an incorrect
understanding.

<figure>
  <img src="/wp-content/uploads/2016/10/screenshot-normalize-filesize.png"
       alt="Screenshot showing filesizes of compressed and uncompressed versions of Normalize.css" />
</figure>
