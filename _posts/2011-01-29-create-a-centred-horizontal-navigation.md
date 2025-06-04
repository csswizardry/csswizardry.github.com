---
comments: true
date: 2011-01-29 18:53:10
last_modified_at: 2025-06-04
layout: post
slug: create-a-centred-horizontal-navigation
title: Create a centred horizontal navigation
wordpress_id: 2329
categories:
- Web Development
tag:
- CSS
---

{% include promo.html %}

This article was originally written in 2011 and used `text-align`ment and
`display: inline;` to manipulate lists as text-level, inline elements. However,
in 2025, I completely rewrote it to utilise Flexbox: the much more suitable
approach for the times.

It massively simplified the amount of CSS needed to build a horizontally centred
nav, so while this post may now seem a little underwhelming, it does serve as
a great example of just how powerful CSS has gotten in the last decade.

```html
<ul class=c-nav>

  <li class=c-nav__item>
    <a href=# class=c-nav__link>Home</a>
  </li>

  <li class=c-nav__item>
    <a href=# class=c-nav__link>About</a>
  </li>

  <li class=c-nav__item>
    <a href=# class=c-nav__link>Work</a>
  </li>

  <li class=c-nav__item>
    <a href=# class=c-nav__link>Clients</a>
  </li>

  <li class=c-nav__item>
    <a href=# class=c-nav__link>Content</a>
  </li>

</ul>
```

Pretty standard, an unordered list of menu items. The CSS is where it’s at:

```css
.c-nav {
  border: 1px solid #ccc;
  border-width: 1px 0;
  list-style: none;
  margin: 0;
  padding: 0;

  display: flex;
  justify-content: center;
  gap: 10px;
}

  .c-nav__item { }

    .c-nav__link {
      display: block;
    }
```

The workhorses here are simply `display: flex;` and `justify-content: center;`.
This creates a Flex context and forces items to pack from the centre outward.

`gap` optionally spaces the items by `10px`, which creates an un-clickable
‘dead’ zone between each link. Whether you want this or not is entirely up to
you, so feel free to modify or exclude to suit your needs.

## [Demo](/demos/centred-nav/)

[Here’s a quick demo](/demos/centred-nav/)! It works in all major current
browsers.
