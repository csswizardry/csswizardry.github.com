---
layout: post
title: "Airplanes and Ashtrays"
date: 2017-10-30 12:53:49
categories: Web Development
toc: false
meta: "Sometimes you need to make it possible to do the wrong thing…"
---

On 11 July 1973, 123 passengers lost their lives when their Varig 820 flight
from Rio de Janeiro to Paris crashed due to a fire on board[^1]. Only 11
passengers survived. The fire started when a cigarette was disposed of in the
waste bin in the lavatory, where someone had gone for a secretive smoke.

Inflight smoking has been almost universally banned on all commercial airlines
for the best part of two decades now. Still, in 2017, all planes are fitted with
ashtrays. Even brand new aircraft, built long after the ban was enforced, always
provide ashtrays for their passengers. Why?

The answer is relatively straightforward: despite smoking on an airplane being
illegal, someone will, inevitably, break the rules. When this happens, we at
least want them to be able to dispose of the cigarette safely, thus avoiding
another Varig Flight 820 tragedy. We absolutely do not want people to smoke on
board, but if they do, then we need to handle the fallout from it in the
safest way possible.

For me, the ashtray is a symbol of pragmatism. Of course we don’t want people to
smoke—we tell them not to!—but we have to accept that, at some point, they will.
This acceptance then paves the way for a more pragmatic compromise in which we
don’t have the perfect world that we want, but we also don’t have a disaster on
our hands. Nobody wins, but nobody loses.

This is an analogy I use with almost all of my consultancy clients. The idea of
actively discouraging something, but still being able to cope with it when it
does inevitably happen.

With the best of intentions, a lot of teams I work with design frameworks and
systems in such a way that bad practices are entirely forbidden, and are made
impossible to implement[^2]. The thinking here is that by being very strict and
forceful about what we allow and disallow, we’ll maintain a high quality of work
and nothing will (or can) go wrong.

However, while the theory is nice, ten years of being a developer has taught me
that, sometimes, doing the wrong thing is the right thing to do. Making it
impossible to do something specific can often mean that people will do something
far more destructive as their ways around your defences get more and more
creative. This usually leaves teams in a worse position than if they’d just
allowed the thing they were scared of to happen in the first place.

But it can get even worse: making something impossible can often lead to
complete abandonment. When a team cannot bend the rules of your system or
framework, they’ll often opt to simply not use it at all. This is a net loss,
whereas allowing them to do the wrong thing would have at least led to greater
adoption, more consistency, and less repetition.

Whenever you plan or design a system, you need to build in your own ashtrays—a
codified way of dealing with the inevitability of somebody doing the wrong
thing. Think of what your ideal scenario is—how do you want people to use
whatever you’re building—and then try to identify any aspects of it which may be
overly opinionated, prescriptive, or restrictive. Then try to preempt how people
might try to avoid or circumvent these rules, and work back from there until you
can design a safe middle-ground into your framework that can accept these
deviations in the safest, least destructive way possible.

The quickest example I can bring to mind is my own
[Shame.css](https://csswizardry.com/2013/04/shame-css/). The idea behind
Shame.css is that we do not want any hacks or nasty CSS in our codebase—of
course we don’t!—but we also have to accept that they are inevitable. Instead of
leaving developers to introduce these hacks throughout the entire codebase, we
set aside a dedicated spot for them. We said, <q>Look, we really don’t want any
hacky code if we can help it, but if we can’t avoid it then please leave it here
where we can easily find it again in future.</q>

This means that, although far from ideal, the impact of these hacks is well
contained and signposted, meaning that they won’t slip through the cracks and
remain hidden in the codebase for the next five years.

This pragmatism and lack of stubbornness can make your codebase much more
malleable, resilient, and ultimately much more useful. Everything is
a compromise.

[^1]: [wikipedia.org/Varig_Flight_820](https://en.wikipedia.org/wiki/Varig_Flight_820)
[^2]: Although not a client of mine, [eBay’s accessibility CSS framework](http://www.ebaytechblog.com/2015/11/04/how-our-css-framework-helps-enforce-accessibility/) is a good example of this.
