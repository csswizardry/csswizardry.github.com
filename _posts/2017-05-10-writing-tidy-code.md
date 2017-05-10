---
layout: post
title: "Writing Tidy Code"
date: 2017-05-10 12:45:56
categories: Web Development
meta: "Even the most inexperienced developers can write great looking code"
---

My friend [Tom](https://twitter.com/TomNomNom) recently gave an excellent talk
titled [_Writing Readable Code_](https://www.youtube.com/watch?v=OVf0xP4BLq0).
It’s only 15 minutes long, and is packed full of great little tips and pearls of
wisdom. I’d highly recommend watching it.

After viewing Tom’s talk (three times now) I decided to jot down some of my own
thoughts about what I find not necessarily _readable_ code, but neat and tidy
code.

- - -

I spend a _lot_ of time reading [other peoples’ code](/code-reviews/), and
honestly, most of us could do better. Something I urge everyone to bear in mind
is that **pride in your work is something that transcends all skills levels**.

One thing that the best developer in the world and the newest developer in the
world both have in common is that either can be just as neat and tidy as the
other: tidiness is divorced from skill or quality, and that’s some good news.

Pride in your work speaks for a lot, and leaving clean and tidy code behind you,
among other things:

1. gets you in the correct frame of mind for valuing quality, and;
2. sets the bar nice and high for the rest of your colleagues.

It seems like a very superficial thing to worry about, but to my mind, tidy code
signals something more important: I would assume that a tidy developer has
better attention to detail, is more likely to follow process, and is more likely
to spot mistakes. Rightly or wrongly, I see it as a litmus test for more general
approaches and attitudes.

## What Is Tidy Code?

Naturally this is very subjective, but to my mind tidy code is code
that—separately to its function—is well documented, formatted, and presented.
It’s more about cosmetics than it is about quality. So I guess herein lies
a warning: **bad code can still look tidy!**

This means that one could conceivably write code littered with IDs and ridden
with `!important`s and it could still look pleasing. The alternative title for
this article is _Making Bad Code Look Good_. You have been warned.

## Whitespace

I cannot stress this enough: whitespace is free—use as much as you like!

Nothing feels more untidy, cramped, and claustrophobic than opening a file with
a complete lack of whitespace:

```
.c-btn {
  display: inline-block;
  vertical-align: middle;
  text-decoration: none;
  text-align: center;
  background-color: #C0FFEE;
  padding: 0.5em 1em;
  &:hover,
  &:focus {
    background-color: #BADA55;
  }
}
.c-btn--secondary {
  background-color: #BADA55;
  &:hover,
  &:focus {
    background-color: #C0FFEE;
  }
}
.c-btn--tertiary {
  background-color: #DE1E7E;
  &:hover,
  &:focus {
    background-color: #C0DEC5;
  }
}
.c-btn--small {
  padding: 0.25em 0.5em;
}
.c-btn--large {
  padding: 1em 2em;
}
```

I mean, that just looks plain _wrong_, no?

When we scan text, we do so in _saccades_, which
are _rapid movements of the eye between fixation points_. Whitespace creates
these fixations points which help to guide the reader thematically: blank space
between lines tells me that two or more blocks are separate; lack of blank
spaces tells me that all code in a block is related. This helps people to focus
on the smallest or most concentrated area at a time, allowing them to ignore
anything that might not be immediately relevant.

```
.c-btn {
  display: inline-block;
  vertical-align: middle;
  text-decoration: none;
  text-align: center;
  background-color: #C0FFEE;
  padding: 0.5em 1em;

  &:hover,
  &:focus {
    background-color: #BADA55;
  }

}





.c-btn--secondary {
  background-color: #BADA55;

  &:hover,
  &:focus {
    background-color: #C0FFEE;
  }

}

.c-btn--tertiary {
  background-color: #DE1E7E;

  &:hover,
  &:focus {
    background-color: #C0DEC5;
  }

}





.c-btn--small {
  padding: 0.25em 0.5em;
}

.c-btn--large {
  padding: 1em 2em;
}
```

Immediately—even without syntax highlighting—that is instantly more readable,
more parsable. At a glance I get a rough idea of the chunking of the code;
I know that some pieces are closely related, and others less related, to the
rest. The size of the gaps in the code are proprtional to the relation.

Let your code breathe.

### Whitespace Can Be Semantic

As well as being useful for glancing at files, whitespace can also provide
actual meaning. When I talk about semantic whitespace, I’m not necessarily
talking about whitespace sensitive languages (like Sass or Python or Haskell),
but about manipulation within a text editor or regular expression.

In my text editor, Vim, whitespace is actually meaningful—I can use empty lines
to navigate, delete, move, or otherwise manipulate code. In Vim, hitting `{`
will jump my cursor to the previous empty line, and `}` will jump me to the
next. This means that I can jump around blocks of code just by using these keys.

But it gets better: I can combine the brace keys with other useful options and
begin to manipulate code by the block:

* `d{}}}p`: Delete the block of code above my cursor, jump three blocks down the
  file, paste the block back in.
* `>}`: Indent the block below my cursor by one level.
* `gU{`: Convert the block above the cursor to uppercase.

<figure>
<img alt="" src="/wp-content/uploads/2017/05/screencast-vim-brace.gif" />
<figcaption markdown="1">
Gif showing the `{`, `}` command in Vim. [View full size (3.0MB)](/wp-content/uploads/2017/05/screencast-vim-brace.gif).
</figcaption>
</figure>

For anyone whose editors have similar capabilities, whitespace isn’t just useful
for scanning documents, but fundamental to the way we manipulate and edit them.
A lack of whitespace is crippling, really giving productivity a huge knock.

## Comments

To my mind, comments provide two key functions:

1. They signal the intent of a piece of code, or an entire file, acting more
   like waymarkers and context.
2. They document intricacies and oddities in specific pieces of code.

```
/* ==========================================================================
   #BUTTONS
   ========================================================================== */

/**
 * Buttons can be applied to any HTML element that is used to trigger a user
 * action (e.g. following a call to action link, submitting a form).
 *
 * 1. Line differently sized buttons up a little nicer.
 */

.c-btn {
  display: inline-block;
  vertical-align: middle; /* [1] */
  text-decoration: none;
  text-align: center;
  background-color: #C0FFEE;
  padding: 0.5em 1em;

  &:hover,
  &:focus {
    background-color: #BADA55;
  }

}





/* Style variants
   ========================================================================== */

.c-btn--secondary {
  background-color: #BADA55;

  &:hover,
  &:focus {
    background-color: #C0FFEE;
  }

}

.c-btn--tertiary {
  background-color: #DE1E7E;

  &:hover,
  &:focus {
    background-color: #C0DEC5;
  }

}





/* Size variants
   ========================================================================== */

.c-btn--small {
  padding: 0.25em 0.5em;
}

.c-btn--large {
  padding: 1em 2em;
}
```

The main comment at the top acts as a title, and is prefixed with a hash (`#`)
so that I can very easily grep for specific pieces of code (useful when looking
through compiled stylesheets). It grounds the file and introduces its intent.

Subsequent comments guide me around the sub-components of the file, or provide
more granular details about the code itself.

Write more comments.

## Invisibles

Tabs vs. spaces: it doesn’t matter which you use (as long as it’s spaces…) but
what does matter is that you’re consistent. If you don’t have invisibles turned
on in your editor then stop reading this post _right now_ and go and enable
them. If you’re not sure how to enable them, click [this
link](https://www.google.com/search?q=turn+on+invisibles+[EDITOR]). If you use
Vim:

```
" Show invisibles
set list
set listchars=tab:»-,trail:·,eol:¬
```

Once you’ve turned invisibles on, your text might go from looking like this:

```
.c-banner {
  display: block;
  padding:       1em;
  margin-bottom: 1em;
  background-color: hotpink;
}
```

…to looking something like this:

```
.c-banner {¬
  display: block;¬
»-padding:»-»-»- 1em;¬
»-margin-bottom: 1em;···¬
  background-color: hotpink;¬
}·¬
```

Ewww! What’s all that? Was that there the whole time?

Yes, it was.

By turning on invisibles, we’ve immediately seen what a hidden mess our code
was—mixtures of tabs and spaces, and a bunch of trailing spaces.

So many times I have opened a file that superficially seems tidy only to find
that it’s a real mess of poor and inconsistent formatting. Turn on invisibles
and ensure that you’re not leaving a total mess in your wake.

## Automation

One thing that I really believe is that we should make it easy for people to
follow our rules: I want them to have as few barriers as possible preventing
them from doing the right thing.

### EditorConfig

Everyone has their own preferences, but a project should have its own consistent
code style, and that may well differ from yours. This kinda sucks, but it’s just
one of those things.

However, it does leave us with a bit of a dilemma:

1. Do we change our coding style to match that of the project? What happens when
   we move to another project that is different still?
2. Do we update our text editor’s settings every time we move from one project
   to the next? I don’t think any of us are that conscientious.

So it’s quite likely that people are not going to adapt to a different but
consistent coding style very readily. We need to automate it.

[EditorConfig](http://editorconfig.org/) is a project designed to help…

> …developers define and maintain consistent coding styles between different
> editors and IDEs.

It takes the form of a small dotfile, `.editorconfig`, that lives in the root of
your project and defines simple rules for specific and/or all types of text file
you might edit. Two spaces by default, but four for Python? Easy. Delete all
trailing whitespace, except in Markdown where it’s meaningful? Done.

```
# editorconfig.org
root = true

[*]
charset = utf-8
indent_size = 2
indent_style = space
trim_trailing_whitespace = true

[*.js]
indent_size = 4

[*.py]
indent_size = 4

[*.{md,markdown}]
trim_trailing_whitespace = false
```

The beauty of this is that you don’t have to manually or consciously change your
own coding style; you just carry on as you ever would and everything is taken
care of for you.

Your editor probably supports EditorConfig, so you should definitely [check it
out](https://www.google.com/search?q=editorconfig+[EDITOR]). Then define your
team’s style (best of luck) and check your agreed `.editorconfig` into your
project.

### Git

Git has a bunch of whitespace related settings that will mark errors with mixed
tabs and spaces in `diff`s. Take a read of the docs:

```
$ git --help config
```

…and then once in your pager, search for `core.whitespace` by first hitting `/`
(forward slash) to enter search mode, and then typing:

```
core\.whitespace
```

Taking a look through those settings, you’ll likely be able to enforce some
rules specific to your project, for example:

```
$ git config core.whitespace tab-in-indent
```

…will mark lines starting with tabs as being errors.

Read more [in the
documentation](https://git-scm.com/book/en/v2/Customizing-Git-Git-Configuration#__code_core_whitespace_code).

### Templates

Something I’ve implemented with a few clients now is the idea of a template
which they use to pre-populate all new files with. The template can contain
exactly as much or as little as you like, and should be used to get developers
started with a file containing the correct formatting and layout for them to
build upon.

I set up a template file for [inuitcss](https://github.com/inuitcss/)’
[maintainers](https://github.com/orgs/inuitcss/teams/core) to use so that they
could very easily follow the code style we laid out. That [template
file](https://github.com/inuitcss/template/blob/master/_layer.file.scss) looks
like this:

```
/* ==========================================================================
   #TITLE
   ========================================================================== */

/**
 * Long-form comment.
 *
 * This spans multiple lines and is also constrained to no longer than 80
 * characters in width.
 *
 * 1. Provide line-comments like this.
 */

.X-class {
  color: red; /* [1] */
}





/* Sub-title
   ========================================================================== */
```

Right out of the box we get:

1. Titling rules
2. Sub-titling rules
3. 80th column markers (ends of the `=== */` lines)
4. Spacing rules
5. Doc-block comment style
6. Line-comment style
7. Class-namespacing rules

If we want to do things relatively long-hand, developers can simply duplicate
this file and rename it on the filesystem, but that feels a little cumbersome…
Because this file lives in [its own GitHub
repository](https://github.com/inuitcss/template), it is accessible at an HTTP
endpoint. This means it’s `curl`able: from right there on the CLI, a developer
can run [the following
command](https://explainshell.com/explain?cmd=curl+-L+git.io%2Finuitcssnew+-o+_layer.file.scss):

```
$ curl -L git.io/inuitcssnew -o _layer.file.scss
```

…which will create a brand new, on-spec inuitcss file called `_layer.file.scss`
on their machine.

**N.B.** I’m using [GitHub’s own URL
shortener](https://github.com/blog/985-git-io-github-url-shortener) to have
a nice short URL as opposed to something more verbose.

If we don’t want to save the file to disk immediately, or we’d rather just get
to work right away, we can pipe the curl output straight into our text editor:

```
$ curl -L git.io/inuitcssnew | vim -
```

**N.B.** Passing the `-` flag to Vim opens it with the contents of STDIN.

Or—another bonus for the Vim users—we can open a totally blank file that does
not yet exist:

```
$ vim _components.buttons.scss
```

…and then use the `read` command to read the contents or a local template file
into the current, empty buffer:

```
:read ../path/to/_template.scss
```

You can see [a GIF of
that](https://twitter.com/vimgifs/status/842015277235769348) in action.

## Closing

As superficial at it may seem, writing neat and tidy code can be a very valuable
exercise, and I don’t think I can overstate this enough: no matter your
experience or skill level, you can all write neat and tidy code.

* **Use as much whitespace as you like** to open your code up and let it
  breathe. It’s scannable and often meaningful.
* **Use more comments** to help people navigate your files. It’s difficult to
  write too many comments, so just go for it.
* **Turn on invisibles** and make sure you’re not accidentally leaving behind
  a tangled mess. You might be surprised just how messy your project is.
* **Automate** things to make it as easy as possible for people to do the right
  thing. Configure your editor and your VCS to fix and/or detect issues; use
  templates to provide your team with a solid starting point.
