---
comments: true
date: 2010-12-21 20:56:15
layout: post
slug: mo-robust-paragraph-indenting
title: 'Mo’ robust paragraph indenting'
wordpress_id: 1970
categories:
- Typography
- Web Development
tag:
- CSS
- Typography
---

I read somewhere once that to space _and_ indent paragraphs of text is not a good idea and that you should pick one _or_ the other. Either indent or space, but never both. I can’t remember where I read this, all I know is that it was in some type book in [Magma, Manchester](http://www.magmabooks.com/content/service/shops.asp) and that I _personally_ agree with it. I don’t know what the type big-wigs think, but for me, I find both indenting and spacing of paragraphs somewhat unsightly.

## [Spaced and indented](/demos/mo-robust-paragraph-indenting/#spaced-indented) – allegedly wrong

[A spaced and indented paragraph](/demos/mo-robust-paragraph-indenting/#spaced-indented) would use the following CSS:

    p{
      margin-bottom:20px;
    }
    p+p{
      text-indent:2em;
    }

## [Spaced only](/demos/mo-robust-paragraph-indenting/#spaced) – looks and works fine

If you just want [a spaced paragraph](/demos/mo-robust-paragraph-indenting/#spaced) it’s just as simple as `p{ margin-bottom:20px; }`. Job done. If you want spaced paragraphs then that’s all you need:

    p{
      margin-bottom:20px;
    }

## [Indented only](/demos/mo-robust-paragraph-indenting/#indented) – doesn’t work

If you want [an indented paragraph](/demos/mo-robust-paragraph-indenting/#indented), simply:

    p{
      margin:0;
    }
    p+p{
      text-indent:2em;
    }

However, as you can see, the problem here is that anything following a paragraph with `margin:0;` will be butted up against that paragraph. There will be no space between _any_ element following a paragraph.

## [Spaced and indented fixed](/demos/mo-robust-paragraph-indenting/#indented-fixed) – perfect

To fix this, give those paragraphs their `margin-bottom:20px;` back, meaning you have the spaced and indented look once again, but then on the `p+p` apply a negative `margin-top` equal to that of the regular `margin-bottom`:

    p{
      margin-bottom:20px;
    }
    p+p{
      text-indent:2em;
      margin-top:-20px;
    }

Here we have the ideal, every paragraph after the first (in a block) is indented and unspaced. The last in a block _is_ spaced meaning a gap between a paragraph and its following element. Easy.
