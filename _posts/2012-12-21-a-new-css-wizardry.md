---
comments: true
date: 2012-12-21 13:07:31
layout: post
slug: a-new-css-wizardry
title: A new CSS Wizardry
categories:
- CSS Wizardry
- Web Development
tag:
- Redesign
- GitHub
- Jekyll
meta: Big changes for CSS Wizardry
branch-url: http://branch.com/b/a-new-css-wizardry
---

Hey there! Welcome to a brand new CSS Wizardry!

These recent changes are pretty big ones, and this post aims to discuss and
explain them all. There’ll  be quite a lot… grab a coffee!

## So long, WordPress

There’s no denying that WordPress is pretty awesome; it’s powerful, it’s
flexible and it’s _free_! But it’s just too much. I was at the mercy of
WordPress with my last site; updating it was no longer a trivial matter and to
develop it required MAMP, a database, a few MB of library code and all manner of
other things. This isn’t a bad thing per se, but it was certainly more than I
wanted to be dealing with.

I love tinkering, I love building, I love coding, I love Vim and Git and the
command line now. As a developer, I _don’t_ love GUIs and CMSs. WordPress was
just no fun any more…

## Hello, Jekyll!

I recently discovered [Jekyll](https://github.com/mojombo/jekyll), a static site
generator written on Ruby by [Tom Preston-Werner](http://tom.preston-werner.com/),
GitHub co-founder. After seeing what it does and how it works, it felt
like the answer; I was already writing posts in markdown using [iA Writer](http://www.iawriter.com/)
and converting it to HTML before dropping it into WordPress’ admin panel, so
why not write in markdown full time?

I built [inuit.css’ site](http://inuitcss.com) on Jekyll, it was a lot of fun,
and _very_ simple. I knew that I wanted to move CSS Wizardry over to Jekyll
too. I used [exitwp](https://github.com/thomasf/exitwp) (with the help of
[Tom Hudson](https://twitter.com/tomnomnom)) to port CSS Wizardry’s WordPress
content into Jekyll-friendly markdown format.

## GitHub Pages

I have always hosted CSS Wizardry with [NuBlue](http://www.nublue.co.uk/), an
absolutely fantastic host in the UK. However, I was only on a humble shared
hosting package with no Git/SSH access. I decided to move hosting over to
[GitHub Pages](http://pages.github.com/) which:

* Is free
* Allows me Git access
* Allows me to leave the source code totally open

I _love_ GitHub, so hosting my site on GitHub Pages and keeping the whole lot in
an open repo is great!

I still love NuBlue, and would recommend them to anyone, and I have kept my
hosting account with them open so that I can quickly move back at the drop of a
hat if I need to.

Now my new workflow means I can write blog posts and publish them without
ever leaving Terminal!

### Public code

Hosting the site on GitHub Pages means it lives in
[a public repository](https://github.com/csswizardry/csswizardry.github.com).
This serves a couple of great purposes:

<ul class="numbered-list">
  <li>It can serve as a learning tool to anyone who wants to poke through</li>
  <li>It will keep me on my toes</li>
</ul>

The second is very important to me; the old CSS Wizardry was nasty, because it
was behind closed doors, and wasn’t easily accessible for me to work with. By
hosting the code so openly it will make me take more pride in it _and_ allow
me to work on it much more easily; no excuses now!

## Practicing what I preach

There was nothing more embarassing than writing articles about how IDs are the
devil’s selector when the old CSS Wizardry was full of them; I have now started
practicing what I preach. The code should hopefully be in line with all the
things I write and talk about.

### inuit.css

Naturally, I rebuilt CSS Wizardry on top of [inuit.css](http://inuitcss.com),
my open source CSS framework. I am super proud of inuit.css, and it was fun
building a proper project on top of it. The proof, they say, is in the pudding!

## As little as possible, and nothing more…

The new site is purposefully low on features. I didn’t want to build too
much too soon and end up with a lot more than I needed.  I’m taking a
kind-of-agile approach with CSS Wizardry now. Instead of building a whole,
behemoth WordPress clone, I have decided to launch CSS Wizardry as an MVP (shoot
me now…). The rebuild was undertaken quite selfishly; I wanted two things out of
the site at its most basic:

<ul class="numbered-list">
  <li>Somewhere to post/house articles</li>
  <li>Somewhere to keep a professional bio/profile</li>
</ul>

This was my MVP, and it has been fulfilled. Features like comments, search, tags
and categories will come at a later date; I got my minimum viable product out
of the door, and the next jobs will be to build on and extend that. I won’t be
working in sprints, but I will amass a backlog and a set of features I would
like to include at a later date.

For now, the functionality of the site serves only myself; you can read anything
I have written previously, but you might find it hard to search (like I said, I
have been a little selfish).

### No comment

I have decided to remove comments. If I am totally honest, comments were
previously a huge chore; it sounds ungrateful but comments – although
often excellent and full of information and opinion – were:

* Time consuming to moderate
* Impossible to reply to individually
* Fetching a _lot_ of spam. I mean a hell of a lot…

I have decided, for now at least, to do away with comments. I still have the
data from comments on the old site, so I can reinstate them if/when I decide
it is the right thing to do, but for now I have gotten rid.

## The transition

Unsurprisingly, the transition from WordPress to Jekyll is a pretty massive one,
and as such I am fully expecting things to be broken, or not working quite right.

I have [some tech tasks on GitHub](https://github.com/csswizardry/csswizardry.github.com/issues/1)
to address stuff like that, so if you spot anything I would be **very**
grateful if you could raise an issue to help me keep track of things that need
tidying up. Like I said, this rebuild is a little selfish in that I don’t care
_too_ much, but I will have a task always in the back of my mind to clean
things up gradually.


## What now?

Well, you can grab [the new RSS feed](/feed.xml), [follow me on Twitter](http://twitter.com/csswizardry)
and keep an eye on [the project on GitHub](https://github.com/csswizardry/csswizardry.github.com).

Thanks,  
Harry
