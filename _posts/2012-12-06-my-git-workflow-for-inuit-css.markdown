---
comments: true
date: 2012-12-06 19:32:35
layout: post
slug: my-git-workflow-for-inuit-css
title: My Git workflow for inuit.css
wordpress_id: 3897
categories:
- Web Development
tag:
- Git
- GitHub
- inuit.css
meta: A brief overview of how I use Git, specifically on inuit.css.
---

This is a bit of an unusual article from me, it doesn’t mention OOCSS _once_! It’s about Git…

I’ve been putting _massive_ effort into learning a lot more about Git lately; I’ve been using it at work for over a year now, but only ever the more basic bits; `add`, `commit`, `push`. I’m now finally starting to feel like I ‘get’ Git; I don’t just go through the motions of ‘first I type this then I type this’, I actually get what and why I’m doing things, and it feels awesome.

As such, the way I work on [inuit.css](http://inuitcss.com) is (just) starting to change massively. I’m writing up my workflow, not to sound all preachy about how awesome I am at Git because—believe me—I know _nothing_. I’m writing it up in the hope that people can share improvements, modifications, alterations, disagreements or anything like that to keep me on this roll.

The stuff I’ve learned thus far is thanks in no small part to the people I work with, to mention a notable few; [James Barwell](https://github.com/JamesBarwell), [Nick Payne](https://twitter.com/makeusabrew) and [Craig Andrews](https://twitter.com/craiga). There are likely more that I’ve forgotten, but these are the guys I pester the most!

## New work, new branch

One thing I’m starting to stick to now is that _all_ work happens in a topic branch. Nothing should get done in `master` at all, `master` should _always_ be stable, clean, and theoretically ready for a release at any given moment. As such, any new feature, or a fix, or anything, happens in its own topic branch. For the sake of this writeup let’s imagine that I am adding some responsive features in a branch called `feature/responsive`.

Firstly, I make sure my local copy of `master` is fully up to date with remote. After `push`ing and `pull`ing to ensure everything is good, I create my topic branch off of `master`:

    $ git checkout -b feature/responsive && git push -u

There are two things happening here, firstly I check out a branch called `feature/responsive` (that didn’t yet exist). This is what `git checkout -b feature/responsive` does.

Next, I want to set `feature/responsive` to track a remote branch of the same name, this is the `git push -u` (`&&` is just an operator, and allows me to chain commands). This second command just means that I can run `git push` and `git pull` as just that. Without setting up remote tracking, I would have to run `git push origin feature/responsive` and `git pull origin feature/responsive` every time; far from ideal.

Now I have a local branch set up called `feature/responsive`, that tracks a remote branch of the same name, and I’m ready to work in it.

## Git to work

Now I start doing all my work in this branch. If it’s to do with responsive stuff, this is where it goes. One rule I try and stick by is ‘commit early and commit often’. After every discrete chunk of work, commit; this might mean committing ‘Add media query mixin’, ‘Set up grid system media queries’, ‘Add grid states to media queries’. These are very granular, logical commits. Committing is fast and easy, it’s better to commit too often than not often enough.

Committing is _usually_ as simple as:
    
    $ git commit -am "$COMMIT_MESSAGE"

For any commits that need files adding to Git, or need adding individually, I just break this out to:
    
    $ git add $FILES_TO_ADD
    $ git commit -m "$COMMIT_MESSAGE"

If I get too carried away, and do more-than-one-logical-commit’s-worth-of-work in a single file, I can run `git add -p $PATH_TO_FILE` in order to add ‘hunks’ of changes from one file, rather than the whole file itself. This is a pretty awesome feature, but one I’ve not used _that_ much yet.

## Completing the feature

It is worth noting that most features, like this one, can be quantified and deemed ‘complete’, but a branch like `misc-typo-fixes` will have a potentially infinite lifespan and _cannot_ usually be considered ‘done’. Depending on this, the next parts of my workflow may differ. If the feature _does_ have finite scope—and can be deemed ‘done’—then once I’m happy with it, I `diff` it against `master`:
    
    $ git diff master feature/responsive

This allows me to review any changes visually, check my work, and hopefully spot anything that needs spotting. If this final check goes well (and inuit.css still compiles, and nothing breaks) then I’m almost ready for merging it into `master`.

## Rebasing

This next thing, so I’m told, massively divides the Git community. It’s like IDs for Git users or something… I find rebasing, when used properly, _incredibly_ useful. There are some people who loathe it—and will never use it—and that’s cool. I don’t know enough to have too strong an opinion, but I like using it. As with most things, with great power comes great responsibility…

Because `feature/responsive` is a private, development only, non-production branch, I can rebase it. Rebasing basically allows you to, among other things, reword, reorder and squash commits. This is the important bit; **it fiddles with your Git history**, and this is why people dislike it. Once you have pushed and/or shared a branch, you should see it as having missed the boat, and you cannot rebase. Rewriting Git history on a shared branch is dangerous territory. Anyway…

As I mentioned earlier, I like to commit a lot. Frequent commits, committing as I think, not taking great care over them, writing them for my train of thought as opposed to for anyone else to make sense of. As such, it’s not unusual to end up with a commit history like this:

1. Add media query mixin
2. Add missing semi colon
3. Put MQs into use in grids file
4. Fix typo
5. Add comments explaining stuff
6. Whitespace

Looking at these commits, it’s pretty slapdash. That’s cool though, I committed as I worked, this is an accurate representation of what I did, however there are a few things to note:

* In a team environment—where people have to merge your work for you—they’re seeing a lot of pointless commits. It’s more for them to read and review (note, the actual commit messages, not so much the code in them).
* The typo and trailing semi-colon commits kinda make me look a bit stupid.
* There will be no desire to ever roll back to a stage in the commit history where the code _didn’t_ have that semi-colon, so being _able_ to roll back to that point seems silly. 
* If we’re being totally honest, these could all be summed up in one as ‘Add responsive grid system’.

What we do now is:
    
    $ git rebase master -i

What this does is replays those commits against `master` and interactively (`-i`) allows us to modify them. Running that command might leave you looking at something a little like this:
    
    pick 64073f0 Add media query mixin                                                                                                                                                                         
    pick 4ebe438 Add missing semi colon
    pick 987d093 Put MQs into use in grids file
    pick 324f2a2 Fix typo
    pick df0321b Add comments explaining stuff
    pick 1ed9323 Whitespace

The word `pick` can be replaced with a number of things, but the most common ones I use are `r`, for _reword_ (we want to edit the commit message) and `s`, for _squash_ (we want to squash that commit into the previous one).

What we want to do here is squash all of those commits into one nice one, something like ‘Add responsive grid system’. We need to modify the above to look like this:
    
    pick 64073f0 Add media query mixin                                                                                                                                                                         
    s 4ebe438 Add missing semi colon
    s 987d093 Put MQs into use in grids file
    s 324f2a2 Fix typo
    s df0321b Add comments explaining stuff
    s 1ed9323 Whitespace

Now we can continue on our way and squash all those commits into the top one (that we automatically get the chance to reword by default).

Now if we were to run a `git log` on `feature/responsive`, instead of the six nasty commits, we get one shiny new one, that is much more friendly.

Please use discretion when rebasing; only rebase if you _really_ feel you need to, and only squash into as many commits as makes sense, **no less**. If you end up with ten commits and you feel that you need to keep all ten then by all means, please do so. Only rebase if and when necessary and/or appropriate.

## Back to master

Now we have all our work completed and our commits nicely tidied up, we need to get `feature/responsive` back into `master`, ready for release.

To do this, simply check out `master` with:
    
    $ git checkout master

And then merge `feature/responsive` into `master` with:
    
    $ git merge feature/responsive --no-ff

This simply merges our topic branch back into `master` and forces a merge commit (massive thanks to [Nick](https://twitter.com/makeusabrew) for this one). Git will, if it can, merge branches using _fast forward_, which basically means that it will create a ‘seamless’ merge. Merging without `--no-ff` will just add the commits from `feature/responsive` onto the end of `master` as though `feature/responsive` never existed; it fast forwards `master` to be at the same point as `feature/responsive`. A `git log` has no mention or idea of any other branches and might look like:

1. Add normalize.css
2. Add responsive grid system

To leave a neater paper trail, and show where everything came from, merging with `--no-ff` would make our `git log` look like this:

1. Add normalize.css
2. Merge branch 'feature/normalize'
3. Add responsive grid system
4. Merge branch 'feature/responsive'

So `--no-ff` basically just gives us a merge commit and a nicer paper trail.

## Good to go

Once that’s all done, I’m ready to push this feature live:

    $ git push

And now I want to tag that latest commit with a version number, so I run:
    
    $ git tag v$VERSION_NUMBER && git push --tags

This tags the latest commit and then pushes the tags to my remote.

Now I have a nice commit history, with merge commits, and a new tag that points to that particular snapshot of the project.

That, in a nutshell, is my Git workflow now for inuit.css. I’m still taking baby steps with Git, but I am loving it, and I’m learning more and more each day from a lot of awesome people.

If anyone has any suggestions as to how I might improve or streamline my workflow I’d be really grateful to hear them; along with Vim, I’m finding Git a lot of fun right now! I’d also _really_ like to hear more pro-/anti-rebase opinions and _definitely_ any glaring errors or mistakes with anything I’m doing.

Cheers,   
_H_
