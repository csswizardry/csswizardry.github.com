---
layout: post
title: "Refactoring Tunnels"
date: 2017-06-02 12:19:58
categories: Web Development
toc: false
meta: "A metaphor for defining the scope of refactoring tasks"
---

In my work, I tend to get involved in a lot of refactoring projects. From
small-scale tweaks of work-in-progress frameworks or styleguides, right through
to full-scale refactors of years-old legacy projects. In fact, I do so much work
with clients who need to refactor that I spent [much of 2016 speaking about
it](https://speakerdeck.com/csswizardry/refactoring-css-without-losing-your-mind).

There are many interesting things about refactoring—from technical to
logistical to cultural—but two points that are most relevant to this article
are:

1. **The business is almost always hesitant to fund refactoring work**. Nearly
   every development team I have ever spoken to has told me that their manager
   or client is the main reason they do not get to refactor as often as they
   would like to. This is understandable: the cost of moving developers away
   from product work to rewrite code with no discernible benefit to the user[^1]
   is a cost that most managers would rather not incur.
2. **Refactoring can be scary.** On a sufficiently large or legacy application,
   there can be so much fundamentally wrong with the codebase that many
   refactoring tasks will run very deep throughout the whole project. This puts
   a lot of pressure on developers, especially considering that this is their
   chance to <q>get it right this time</q>. This can feel debilitating: <q>Where
   do I start?</q> <q>How long is this going to take?</q> <q>How will I know if
   I’m doing the right thing?</q>

A concept I came up with to help my clients and their teams tackle these two
problems was the idea of a _Refactoring Tunnel_.

<figure>
<img src="/wp-content/uploads/2017/06/tunnel.jpg" alt="" />
</figure>

A Refactoring Tunnel is a metaphor in which the length or size of the
refactoring task is represented by a tunnel of a corresponding size: long
tunnels represent large refactoring tasks; short tunnels represent small ones.

A more developer oriented way of looking at or defining the size of
a refactoring task might be to describe its surface area: how much of the
codebase does the body of work touch?

The Refactoring Tunnel metaphor works like this:

- - -

On day one, you pick your refactoring task: you step into the tunnel. At this
point, you can see the light at the tunnel’s entrance behind you, but you can’t
see the light at the exit—perhaps it’s close but around a sharp bend, or maybe
it is just that far away. At this point, we don’t know, but it doesn’t concern
us because we have only just started.

Day two: we continue working on our refactoring task, and proceed further into
the tunnel. Just like yesterday, we can still see the light at the entrance
behind us, but the light at the exit still evades us. That is to say, we have
a good idea of where we’ve come from, but still don’t know how far away the exit
is: is it another week? Two weeks? Three days?

We press on, day after day making our way further into the tunnel, until day
nine. All of a sudden, the light behind us has disappeared. We know we did nine
days of work, but we’ve now lost the security of being able to see a fixed point
behind us.

To compound the problem, we still can’t see the light at the exit either. The
panic sets in; we’re lost. The site is broken around our feet. The <q>quick
find-and-replace</q> for the class names didn’t work as we’d hoped, and now some
JavaScript has stopped working. Many of our tests are failing, but we’re not
sure why. We’ve tried to keep merging `master` into our topic branch, but we see
more and more merge conflicts. And we still have no idea where the exit is. Is
it quite close? Would it be worth continuing another day or so? Or is it still
many days—or even weeks—away from us? We have no way of knowing. The uncertainty
is stressful; it is a gamble. We begin to wish we’d never started, and in total
desperation, we do this:

    $ git reset --hard origin/master

We just throw everything away. We hard reset ourselves to a point in time we
knew to be safe—and we do begin to feel safer again—but we have to face up to
the fact that we just spent nine days of time and money getting to precisely
nowhere. That’s going to be a difficult one to explain at your stand up, and
will likely reduce the chances of the business trusting developers with
refactoring time in future.

I’ve done this, and seen it done, more times than I would care to remember (or
admit). I’m sure you’ve done it at some point as well. This is the danger of
entering long Refactoring Tunnels.

- - -

Tasks with a large surface area—and thus, a long tunnel—might be things like

* rewriting all of your Sass as PostCSS;
* renaming all of your classes from BEM to BEM(IT), or;
* moving your entire project’s layout from floats to Grid.

While each of these may be worthy and worthwhile changes to make, they’re
relatively large. They will affect and modify the entire project’s codebase,
which means a few things:

1. **It will take a lot of time to implement and test.** Even if you get it
   right first time, it’s a significant spend that you will have to be able to
   justify.
2. **The likelihood of introducing new bugs and regressions increases.** It
   stands to reason that if you’re impacting large and far-reaching parts of
   your codebase, you are far more likely to introduce new or
   different faults along the way inadvertently.
3. **The chance of pesky merge conflicts goes up.** As oddly-specific as it
   might seem, this is a real issue. Diverging from your colleagues’ codebases
   on such a massive scale means you’re going to run into workflow issues.
4. **It may well become overwhelming. Scary, even.** The most drastic outcome is
   that you realise you’ve bitten off more than you can chew and you have to
   bail out completely.

**Don’t enter a tunnel whose end you can’t see, or that you can’t exit from
quickly and cheaply.**

## Short Refactoring Tunnels

Resist the temptation to refactor anything that runs right the way throughout
the project. Instead, identify smaller and more manageable tasks: tasks that
have a much smaller surface area, and therefore a much shorter Refactoring
Tunnel.

These tasks can still aim toward a larger and more total goal but can be
realised in much safer and shorter timeframes. Want to move all of your
classes from BEM to BEM(IT)? Sure, but maybe just implement it on the nav first.
Attacking the problem this way has many benefits:

1. **You’re minimising your liabilities.** The maximum risk at any given time is
   significantly reduced. Even in the worst case scenario, we only need to abort
   a much smaller piece of work.
2. **The shorter tunnel can be used as a test-bed for larger bodies of work.**
   This will help you work out projected overall cost based on a smaller sample.
   It will allow you to stress-test certain new techniques, methodologies, or
   approaches in a smaller sandbox. The upshot of this is that the overall
   refactoring project can be defined based on a more trivial task up front.
3. **You can move back onto product work much sooner.** This keeps managers
   happy—the fact that you’re only out of action for a few days, rather than
   many weeks, at a time is a hugely attractive proposition and is more likely
   to get approval than the alternative.
4. **It’s a chance to encapsulate.** By working in these smaller units, it
   becomes almost necessary to begin defensively encapsulating code as you
   refactor it. This means that your codebase will gradually become more robust
   as a result, which will help with almost all future work.

Your overall goals for the project can remain the same but try to [identify and
isolate](https://csswizardry.com/2016/08/refactoring-css-the-three-i-s/) the
sub-tasks into much smaller and safer units. Make sure you only ever step into
short tunnels.

- - -

[^1]: I firmly believe that the user will ultimately benefit from a refactored codebase, but in ways that are hard to actually measure.
