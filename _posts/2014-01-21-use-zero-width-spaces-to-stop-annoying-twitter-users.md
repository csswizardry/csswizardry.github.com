---
comments: true
date: 2014-01-21 09:55:11
layout: post
slug: use-zero-width-spaces-to-stop-annoying-twitter-users
title: Use zero-width spaces to stop annoying Twitter users
categories:
- Tips
tag:
meta: "A little trick to stop mentioning Twitter users when you write @import, etc."
---

Being the typically-polite Brit that I am, I often find myself feeling
sympathetic when I see people tweet things like <q>I used Sass’ @extend</q>, and
that <i>@extend</i> mentions a Twitter user who doesn’t want to see that tweet
at all. This doesn’t just apply to <i>@extend</i>, either; what about
<i>@media</i>, or <i>@import</i>, or anyone who has a Twitter handle that’s also
a CSS at-rule?

This morning, I had an idea that might ease their suffering: use zero-width
spaces to avoid mentioning people when you don’t mean to. Instead of writing
<i>@import</i>, you’d write <i>@[zero-width-space-here]import</i>.

The only problem with this is that, on a Mac, at least, there is no shortcut for
a zero-width spaces. Copying and pasting it—which, as you can imagine, is quite
difficult—from Wikipedia is too much effort to even bother…

I’ve [long been a fan](https://twitter.com/csswizardry/status/413660033688567808)
of iOS’ (and now Mavericks’) keyboard shortcut mappings, so I decided to make
use of these again. I’ve mapped the following pairs:

    !@import    @​import
    !@media     @​media
    !@extend    @​extend

The reason for the exclamation mark is so that I can still actually write
<code>@import</code> when I need it in my CSS/Sass; the <i>!@import</i> version
is just for use on Twitter.

To add these shortcuts on your Mac:

1. System Preferences
2. Keyboard
3. Text

On your iPhone:

1. Settings
2. General
3. Keyboard
4. Shortcuts

Copy/paste the above rules into their respective boxes, and done. Add any more
that you think might be useful.

I just used this for the first time, [it worked a
treat](https://twitter.com/csswizardry/status/425567689684566016).
