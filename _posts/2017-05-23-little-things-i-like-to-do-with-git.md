---
layout: post
title: "Little Things I Like to Do with Git"
date: 2017-05-23 14:39:29
categories: Web Development
meta: "Git is a bunch of fun"
---

I was chatting with [Tim](https://twitter.com/tkadlec) just the other day about
how much I love Git—it’s such a powerful, elegant tool and it’s one I use the
most often. I thought I would note down some useful little Git snippets that
I use the most frequently.

## Leaderboards

Whether you think gamification or competitiveness in your work is a good or
a bad thing is a different discussion for a different time, but if you’re
interested in seeing who has committed how much to your project, `shortlog` can
give us the answer:

```
$ git shortlog -sn --all --no-merges
    80  Harry Roberts
    34  Samantha Peters
     3  Tom Smith
```

The `shortlog` gives us summaries of `git log`; the `-s` flag will <q>suppress
commit description and provide a commit count summary only</q>, and the `-n`
flag will <q>sort output according to the number of commits per author instead
of author alphabetic order.</q> The `--all` flag logs all branches, and
`--no-merges` ensures that merge commits aren’t being counted.

The above shows all commits for the lifetime of the project, but if you want to
see how much people have done during a specified timeframe, you can use the
`--since` and `--until` flags:

```
$ git shortlog -sn --since='10 weeks' --until='2 weeks'
    59  Harry Roberts
    24  Samantha Peters
```

I have this aliased to `$ git stats`.

## Praise People

Git has a very useful `blame` feature which allows us to check which developer
was responsible for changing a particular piece of code:

```
# See who last changed lines 5 through 10 of the buttons’ CSS:
$ git blame -L5,10 _components.buttons.scss
```

The issue here is the wording. It’s pretty loaded and implies that the developer
we’re looking for did something wrong, and this might not always be the
case—they may have done something particularly clever or impressive and we might
want to find out who we should ask about it (<q>Whoa! I haven’t seen this
feature before—I wonder who did that?!</q>)

Taking the lead from SVN, I alias `praise` onto `blame`, so I can use either
depending on my context:

```
$ git config --global alias.praise blame
```

This now means I can do this:

```
# Find out who implemented Resource Hints and buy them a coffee:
$ git praise -L18,23 _includes/head.html
```

Small change, but it’s pretty nice.

## Hide Whitespace Noise

When you `diff` or `show` an object with a lot of whitespace changes, we’re left
looking at a lot of visual noise which can make it hard to see anything more
important.

Thankfully, removing this noise is pretty trivial by using the `-w` flag which
can be used alongside `git diff` and `git show`. For example, before:

```
 a {
   color: $color-links;

-&:hover {
-  color: $color-links-hover;
-}
+  &:hover {
+    color: $color-links-hover;
+    text-decoration: underline;
+  }

}
```

…and after:

```
 a {
   color: $color-links;

   &:hover {
     color: $color-links-hover;
+    text-decoration: underline;
   }

}
```

Now it’s easy to see that the only _meaningful_ change was the addition of
`text-decoration: underline;`, and the rest of the diff was somewhat misleading
noise.

## Show Changed Words Instead of Whole Lines

When editing prose, as opposed to code, it can often be much more useful to see
changed words rather than whole changed lines; this is particularly helpful when
writing markdown, like I am right now.

Thankfully, we can show only changes words by using the `--word-diff` flag:

```
$ git diff --word-diff
```

Running a diff without the `--word-diff` flag shows quite a large difference:

```
-My friend Tom recently gave an excellent talk
+My good friend Tom gave an excellent talk
```

…but rerunning the diff with `--word-diff` enabled gives us a much more
digestible and helpful overview:

```
My {+good+} friend Tom [-recently-] gave an excellent talk
```

Note how only the changed text is highlighted (within `{+ +}` and `[- -]`).

## See Which Branches You Recently Worked On

It’s not uncommon for me to jump between lots of different branches on any given
project, and keeping track of them can be pretty tricky. We can get Git to help
us work this out:

```
$ git for-each-ref --count=10 --sort=-committerdate refs/heads/ --format="%(refname:short)"
```

This will show us the last 10 (`--count=10`) branches that we worked on, sorted
by the time that we were last working there. It only shows us local branches
(`refs/heads/`) and in a much nicer `--format`.

This is a bit verbose to commit to memory, so I have it aliased to `$ git
recent`.

## See What Everyone’s Been Getting Up To

Sometimes—especially for team leads—it’s useful to get a general idea of what
everyone has been getting up to across all branches. Once again, Git makes that
really easy for us:

```
$ git log --all --oneline --no-merges
```

This will give us a simplified log of everybody’s work across `--all` branches
(with `--no-merges`).

We can also limit the number of commits we return by complementing the command
with a `--since`:

```
$ git log --all --since='2 weeks' --oneline --no-merges
```

Now we can see what everyone did in the last two weeks (since the start of the
sprint, for example).

I have this aliased to `$ git overview`

## Remind Yourself What You’ve Been Up To

You move back onto an old project, or come back to the office after a prolonged
break, and you’re not sure what the last things you worked on are—it happens. We
can ask Git to give us a quick recap of our work on a project quite easily:

```
$ git log --all --oneline --no-merges --author=<your email address>
```

This is really, really similar to the above, only we’re limiting the log only to
our own commits. We can also augment it with `--since` limits.

I have this aliased to `$ git recap`.

## Today’s Work

Again, I’m not here to discuss how developers’ productivity should be measured,
but I frequently find it useful (mandatory, even) to let my clients know what
I’ve been up to on any given day. Rather than keeping a detailed list of tasks
that I’ve completed, I can just ask Git to pull up all of that information for
me:

```
$ git log --since=00:00:00 --all --no-merges --oneline --author=<your email address>
```

This will `log` `--all` branches showing you the work that the specified
`--author` has done `--since` midnight that day (but `--no-merges`), and present
a simplified `--oneline` overview.

I have this aliased to `$ git today`.

## Generate a Changelog

Writing a CHANGELOG can be a little tedious; we have to look over all of the
work we’ve done since our last release and then pull out all of the useful bits.
Thankfully we can use Git to give us a head start:

```
$ git log --oneline --no-merges <last tag>..HEAD
```

**N.B.** `HEAD` is optional here—if you omit it (i.e. `... --no-merges <last
tag>..`) then `HEAD` is implied. That saves you a couple of keystrokes.

This will create a simplified log showing all commits (excluding merge commits)
that took place between your last release and `HEAD`.

For example:

```
$ git log --oneline --no-merges 1.0.0..
1257b95 [refs #00019] Bump version
2b9b28e [refs #00019] Add auto width class
17b8eb1 [refs #00015] Tidy up README.md
bbe7d05 [refs #00012] Rename Supercell main mixin
```

This tells me that since my last release (`1.0.0`) and the current state of my
project (`HEAD`), I’ve done these bits of work. That’s quite a nice basis for
a CHANGELOG.

**N.B.** You’re not limited to just tags: you can use commit hashes.

## Check Which Changes You’re About to Pull

If you haven’t worked on a project for a little while, you might want to check
what’s happened upstream before you pull all of those changes down into your
local branch.

```
$ git log --oneline --no-merges HEAD..<remote>/<branch>
```

**N.B.** Again, `HEAD` is optional here, and omitting it will leave it implied.

For example, let’s see what someone has been doing in a particular feature
branch whilst you were on holiday:

```
$ git checkout feature/fonts
$ git fetch
$ git log --oneline --no-merges ..origin/feature/fonts
```

I have this aliased to `$ git upstream`.

## Review What You’re About to Push

Hopefully you commit and push often, but if—for whatever reason—you find
yourself with a large amount of local commits that are yet to be pushed, it’s
probably wise to quickly review what they all are.

In order to do this, we’re effectively just inverting the previous command:

```
$ git log --oneline --no-merges <remote>/<branch>..HEAD
```

For example:

```
$ git fetch
$ git log --oneline --no-merges origin/feature/fonts..HEAD
```

**N.B.** Again, `HEAD` is optional here, and omitting it will leave it implied.

This logs the commits that `<remote>/<branch>` needs before it resembles `HEAD`.

I have this aliased to `$ git local`.

## View Complex Logs

Pretty much every example above uses simplified logs because I just want to get
a quick idea of what’s going on. For more forensic details I use a `--graph` log
with some extra options:

```
$ git log --graph --all --decorate --stat --date=iso
```

This will give me `--graph`-based logs for `--all` branches showing commit
`--stat`s (additions, deletions). `--decorate` will give me information about
which branch a commit was made on where applicable, and I also get a much
stricter date format.

I have this aliased to `$ git graph`.

## And you…?

I’m sure you’ve all got loads of your own tips and trick: share them on this
post’s [GitHub
issue](https://github.com/csswizardry/csswizardry.github.com/issues/66).
