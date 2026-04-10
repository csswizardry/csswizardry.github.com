---
layout: post
title: "font-family Doesn’t Fall Back the Way You Think"
date: 2026-04-10 11:30:00
categories: Web Development
main: ""
meta: "A quick but important reminder that font-family declarations don’t inherit fallback stacks the way many developers assume."
---

There is a small but surprisingly important nuance in the way `font-family`
works that seems to catch a lot of people out. In my [continuing
series](/2026/04/what-is-css-containment-and-how-can-i-use-it/) on [web
performance for design
systems](/2026/03/when-all-you-can-do-is-all-or-nothing-do-nothing/), today
we’ll look at font stacks and how, when improperly configured, they can cause
unsightly flashes of inappropriate or unexpected fallback text, and in more
extreme cases, layout shifts.

Correctly, developers for the most part know that `font-family` is an inherited
property: set a font family on the `:root`/`html`/`body` and, unless told
otherwise, descendants will inherit that font:

```css
body {
  font-family: system-ui, sans-serif;
}
```

So far, so good!

The confusion tends to arrive when we introduce a web or custom font on a child
element, e.g.:

```css
h1 {
  font-family: "Open Sans";
}
```

At a glance, this can feel perfectly sensible. The page should use `system-ui,
sans-serif`; the heading uses `"Open Sans"`; and while the web font is loading,
the browser will presumably just fall back to the parent’s stack—`system-ui,
sans-serif`.

Unfortunately, that isn’t the case.

## `font-family` Fallbacks Are Self-Contained

Once you declare a `font-family` on an element, that declaration stands on its
own. The element does not say: <q>I would like `"Open Sans"`, and if that is
unavailable right now, please work your way back up the DOM and inherit whatever
fallbacks the nearest ancestor might have.</q>

Instead, it says: <q>My `font-family` is `"Open Sans"`.</q> And that’s all it
says.

And if the browser does not yet have `"Open Sans"` available (yet), it resolves
fallback from _that declaration_, not from the parent’s.

Put another way:

```css
h1 {
  font-family: "Open Sans"; /* « The fallback happens inside here… */
}

/**
 * …not here.
 */
body {
  font-family: system-ui, sans-serif;
}
```

## Why You Get a Flash of Times

If the current element’s `font-family` declaration contains only one value, and
that value is not currently available, the browser falls back to its default
**for that element**, and not to an inheritable `font-family` from somewhere
higher up. For most browsers in their default state, that fallback is likely
_Times_ or _Times New Roman_. That is why you so often see a brief flash of
Times New Roman where you were expecting something much more sympathetic or
appropriate.

The browser is not _forgetting_ the parent’s font stack; it’s obeying the
child’s declaration exactly as written, then exhausting the options available in
that declaration, and then falling back to the browser default.

## The Fix Is Simple

Whenever you specify a `font-family`, specify a **complete stack**. I’m looking
at a client’s site right now and I can see this right at the very top of their
CSS:

```css
:root {
  --hero-hero: "Clan Pro";
  --heading-x-large: "Clan Pro";
  --heading-large: "Clan Pro";
  --heading-medium: "Clan Pro";
  --heading-medium-subtle: "Clan Pro";
  --heading-small: "Clan Pro";
  --heading-small-subtle: "Clan Pro";
  --heading-x-small: "Clan Pro";
  --paragraph-title-x-large: "Bernina Sans";
  --paragraph-title-large: "Bernina Sans";
  --paragraph-title-medium: "Bernina Sans";
  --paragraph-title-small: "Bernina Sans";
  --paragraph-title-x-small: "Bernina Sans";
  --paragraph-body-x-large: "Bernina Sans";
  --paragraph-body-large: "Bernina Sans";
  --paragraph-body-medium: "Bernina Sans";
  --paragraph-body-small: "Bernina Sans";
  --paragraph-body-x-small: "Bernina Sans";
  --label-3-x-large: "Clan Pro";
  --label-2-x-large: "Clan Pro";
  --label-x-large: "Clan Pro";
  --label-large: "Clan Pro";
  --label-medium: "Clan Pro";
  --label-small: "Clan Pro";
  --label-x-small: "Clan Pro";
}
```

At the very least, all of these simply need to read:

```css
:root {
  --hero-hero: "Clan Pro", sans-serif;
  --heading-x-large: "Clan Pro", sans-serif;
  --heading-large: "Clan Pro", sans-serif;
  --heading-medium: "Clan Pro", sans-serif;
  --heading-medium-subtle: "Clan Pro", sans-serif;
  --heading-small: "Clan Pro", sans-serif;
  --heading-small-subtle: "Clan Pro", sans-serif;
  --heading-x-small: "Clan Pro", sans-serif;
  --paragraph-title-x-large: "Bernina Sans", sans-serif;
  --paragraph-title-large: "Bernina Sans", sans-serif;
  --paragraph-title-medium: "Bernina Sans", sans-serif;
  --paragraph-title-small: "Bernina Sans", sans-serif;
  --paragraph-title-x-small: "Bernina Sans", sans-serif;
  --paragraph-body-x-large: "Bernina Sans", sans-serif;
  --paragraph-body-large: "Bernina Sans", sans-serif;
  --paragraph-body-medium: "Bernina Sans", sans-serif;
  --paragraph-body-small: "Bernina Sans", sans-serif;
  --paragraph-body-x-small: "Bernina Sans", sans-serif;
  --label-3-x-large: "Clan Pro", sans-serif;
  --label-2-x-large: "Clan Pro", sans-serif;
  --label-x-large: "Clan Pro", sans-serif;
  --label-large: "Clan Pro", sans-serif;
  --label-medium: "Clan Pro", sans-serif;
  --label-small: "Clan Pro", sans-serif;
  --label-x-small: "Clan Pro", sans-serif;
}
```

Remember, any time you declare a `font-family`, declare the whole thing. Even if
that is just a broad
[`<generic-family>`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/generic-family)
And while this is the bare minimum, at least sans-serif web fonts will actually fall
back to sans.

To do a much more thorough job, you can simply [hire me](/contact/) to run my
<cite>Web Performance for Design Systems</cite> workshop.

## Why This Matters

At its most simple, this is a trivial visual issue: a nascent sans heading
briefly rendered in serif just looks wrong.

At the other end of the spectrum, it can have real knock-on effects on Core Web
Vitals: if the fallback face is excessively different in width, height, or
overall proportions, the eventual swap to the web font can have an impact on
your CLS scores.

## Closing Thoughts

If a `font-family` matters enough to override, it matters enough to define
properly. This is one of those small details that feels too small to matter
right up until you notice it everywhere.

My client has had complaints of noticeable layout shifts while migrating to
a new design system, and at the size and scale they’re working at, they were
really, really struggling to pin it down. It only took me a few minutes because
_it’s easy when you know the answer_. That’s exactly why you [hire
consultants](/consultancy/).
