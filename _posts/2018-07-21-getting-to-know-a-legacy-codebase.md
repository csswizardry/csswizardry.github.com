---
layout: post
title: "Getting to Know a Legacy Codebase"
date: 2018-07-21 13:02:54
categories: Web Development
meta: "What should you do when you first get launched into an old, sprawling CSS codebase?"
---

The other day, [Brad](http://bradfrost.com/) dropped me a message asking me
about the topic of getting to know a brand new (specifically CSS) codebase. The
kind of codebase that no one person truly understands any more; the kind of
codebase that’s had a dozen different contributors over just as many years; the
kind of codebase that’s never had a full-scale refactor or overhaul, but that’s
grown organically over time and changed with new techniques, styles, and trends.

(Un)fortunately, I’ve dealt with a number of these types of project over time,
so I have a few tips about getting to know a codebase like this, and how to
begin making sense of it.

## See What Breaks

Honestly, to start with, I just identify a part of the codebase (it could be
a large or important feature, a frequently-occurring component, something
pertinent to current workstreams, etc.) and play around with it: bend it, break
it, change it, see what happens to it.

Make a note of anything odd or unusual; if that thing happens again when you
play around elsewhere in the codebase, there could be some significance to it.

## Identify Your Entry Points

Try as much as you can to build up an idea of which files import which other
files; who passes what onto who; what inherits from where; what does your
dependency tree look like?

Once I can work out where files are bundled up and imported from, I can build
a much better mental model of the topology of the codebase.

## Get an Idea of What’s Been Changed

It’s often a good idea to see what files were changed last: any files that
haven’t been altered in over a year are probably less important to current work.
One (rather cumbersome, I admit) way to see that is with the following:

```
$ git log --name-only --since="365 days" | sort -u | awk '/\.(le|c|sa|sc)ss$/{print}' | nl
```

<small>**N.B.** This output will not be listed chronologically.</small>

This will log your codebase, list the filenames associated with any commits made
in the last year, it will then pass them off into `sort` where we leave only
unique entries, before passing it into Awk and printing only `.less`, `.sass`,
`.scss`, or `.css` filepaths, then finally passing it all into `nl` to number
the lines of output.

This should give you a list of all the stylesheets changed in the last year.

## Identify (Roughly) What is Used

Chrome’s _Coverage_ tool is a great way to see at a very high-level glance what
CSS is being used by the current page. This very non-scientific method of
checking code usage should give you an approximate idea of what might be dead
code, or what you might simply be able to ignore.

For a slightly more robust, but still imperfect method of identifying dead code,
try this technique that I wrote up [earlier in
2018](https://csswizardry.com/2018/01/finding-dead-css/).

Although very vague data, it should give some idea as to where to start looking.

## Learn the Codebase Organically

Don’t go looking for trouble. Work around learning the features you need to work
on immediately. If you never need to touch the help and support section, there’s
no point going out of your way to research it. Try to remain focused and learn
about the parts of the codebase that are most important and timely.

This is general good advice with any tech debt or refactoring problem: don’t
increase your (cognitive) workload unnecessarily.

## Set Up Regression Tests

You need to make sure you don’t inadvertently mess anything up while you’re
looking around. There are two methods I would use here: the first is very
low-fidelity and a little coarse; the second is far more involved.

If I’m playing around with Sass, or any other precompiled assets, I take
a checksum of the compiled CSS file before I start playing, and then a checksum
after I made any changes. If the two fingerprints differ, I know what whatever
changes I just made wound up in the compiled assets. This kind of light-touch
smoketest allows me to crudely figure out inputs and outputs. It can also help
me to figure out whether a particular variable or mixin might be being used in
the project: if I change a variable’s value, but the compiled CSS is identical,
I could make a note that that variable might be unused.

```
harryroberts in ~/Sites/csswizardry.com on (master)
» shasum _includes/css/csswizardry.min.css
7142689d6f79927f192577002f181aef5721d1bc  _includes/css/csswizardry.min.css

harryroberts in ~/Sites/csswizardry.com on (master)
» vim css/_settings.colors.scss

harryroberts in ~/Sites/csswizardry.com on (master)
» shasum _includes/css/csswizardry.min.css
ae2a4c94c945d61f1c009d4fb14c40fa19f20ddd  _includes/css/csswizardry.min.css
```

Note that the two checksums differ: this means that whatever I changed in
`css/_settings.colors.scss` did make its way into the complied CSS. Although
I might not know exactly what or how far reaching that change was, I do at last
know that the thing I altered will affect the project.

For longer-term refactoring or auditing, it can be useful to set up a formal
regression testing tool such as
[BackstopJS](https://github.com/garris/BackstopJS). This will alert me if I do
any severe, customer-facing damage to the UI. Ideally, we’d have a regression
testing suite in-place permanently, so this is as good a time as any to start.

## Learn How to Use Parker, ack, and ctags

[Parker](https://github.com/katiefenn/parker/) is a wonderful static analysis
tool from my buddy [Katie](http://www.katiefenn.co.uk/). You can use it to grab
useful information about the overall make-up and health of your CSS: how many
IDs, mean specificity, how many `!important`s, etc. Learn more about Parker with
my post all about [demystifying its
output](https://csswizardry.com/2016/06/improving-your-css-with-parker/).

[ack](https://beyondgrep.com/) is an incredible little command line utility that
serves as a more useful, sensible, and user-friendly alternative to grep. You
can use it to quickly search entire codebases for specific strings using regex.
As an example:

```
$ ack --css "\d*\.\d*px"
```

This will search every CSS file for pixel values that contain decimals (e.g.
`24.1px`). ack is incredibly useful, so I’d recommend reading my [<cite>Ack for
CSS Developers</cite>](https://csswizardry.com/2017/01/ack-for-css-developers/)
post for some more practical examples.

If you’re feeling adventurous, install
[ctags](https://github.com/universal-ctags/ctags). Although a little old school,
ctags can be incredibly powerful on all manner of projects. Wikipedia defines
ctags as:

> …a programming tool that generates an index (or tag) file of names found in
> source and header files of various programming languages. Depending on the
> language, functions, variables, class members, macros and so on may be
> indexed. These tags allow definitions to be quickly and easily located by
> a text editor or other utility.

Basically, ctags will create a kind of of database of all of the function,
variable, mixin, ID, and class definitions for your project. Text editors that
support ctags can then use this information to begin linking up disparate parts
of the codebase for you, showing you where particular code is originally defined.

For me, as a Vim user, I generate my project’s tags file from the project’s root
like so:

```
$ ctags -R
```

This will `-R`ecursively look through my project and make the database of its
references. Then, once in my text editor, hitting `Ctrl-]` with my cursor
over—for example—a Sass variable will jump me to the exact place that variable
was defined.

## Git on Top of Things

Learn some advanced Git logging, showing, and blaming. The entire project’s
history is contained here, and if you know how to interrogate it effectively,
you’ll be able to build up a really great context of how things came together.

## Reach Out to People

Your extensive detective work in Git will no doubt yield a number of different
names: if these people are still in the organisation, use them. Ask them to help
clarify things; see if they remember the events or decisions surrounding certain
features, etc.

## What Next?

None of these techniques will allow you to learn the codebase in an afternoon,
but if you keep referring back to them, you should find that navigating your way
around an existing, sprawling project becomes a little easier.
