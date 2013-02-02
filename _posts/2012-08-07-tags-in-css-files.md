---
comments: true
date: 2012-08-07 19:18:52
layout: post
slug: tags-in-css-files
title: Tags in CSS files
wordpress_id: 3815
categories:
- Web Development
tag:
- CSS
- OOCSS
- Tips
- Tricks
---

When working with large (and particularly OO) CSS your chunks of code in a
stylesheet(s) are less likely to be separated by type, but rather by function.
That is to say, you might have objects that both deal with images but live
nowhere near each other in the stylesheet.

**N.B.** please refer to [this gist](https://gist.github.com/3288478)
before/whilst reading this article.

For as long as I can remember I’ve always placed a dollar sign before any
section titles in my CSS; this is so that I can find a section quickly (and
limit my search scope to sections only) simply by running a find for
`$[SECTION NAME]`.

This is all well and good when I know what section I’m after, but what if I want
to find any section that handles images, or perhaps I need to know what CSS is available for use on lists? I need a way of searching _within_ sections, not just their titles. Enter _CSS tags_…

If you take a look at [the example CSS](https://gist.github.com/3288478) you
should see that with each section title I have a list of tags.
[The media object](http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/)’s
tags are `^images ^text ^layout ^structure`, the sprite object carries the tags
`^images ^icons`. If I want to find any objects that pertain to certain types of
component then my search now is simply `^[tag name]`.

By prepending the tags with another character (I chose the caret as it isn’t a
frequently occuring glyph in CSS) I can limit my search scope to **just** tags.

So now if I want to style up some image content I know all I need to do is a
find for `^images` and I can see exactly what objects I already have at my
disposal. If nothing appropriate exists I create a new component or object and
give that a tag of `^images` for the next dev to find!

As with [my recent quasi-qualified selectors tip](csswizardry.com/2012/07/quasi-qualified-css-selectors/),
this is only really of any use of the whole team buys into it, but I think it
could be super useful and is something I’m hoping to implement soon.
