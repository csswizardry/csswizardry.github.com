---
comments: true
date: 2012-03-13 01:29:12
layout: post
slug: hacker-news-rebuttal
title: Hacker News rebuttal
wordpress_id: 3523
categories:
- Web Development
tag:
- CSS
- Front-end architecture
- GitHub
- Hacker News
- OOCSS
---

Yesterday [I decided to post on Hacker News something I’ve recently been working on for both myself and Sky](http://news.ycombinator.com/item?id=3693610). That something was a list of [guidelines as to how best write CSS for manageable and maintainable projects](https://github.com/csswizardry/CSS-Guidelines/blob/master/CSS%20Guidelines.md).

Unfortunately, a number of the HN community didn’t take so well to my points so I’ve decided to publish a full response, as opposed to the disjointed and frankly unprofessional comment discussion that was emerging.

One user in particular took exception to a lot of my advice and it is his issues I shall address most directly. This isn’t a vendetta at all, more my trying to answer his and others’ concerns at large. He offered a pretty 1:1 comeback to a lot of my points so I shall try to maintain a similar format here.

I may paraphrase a lot here so I urge you, **[please, read the original thread](http://news.ycombinator.com/item?id=3693610)**. I apologise and regret and instances in which I come across as rude and/or unprofessional; I acted on impulse rather than rationally, as I should have done.

* * *

I said:

> For each level of markup nesting, try and indent your CSS to match.

He said:

> Nope.

Indenting CSS to mirror your markup structure can be very useful for a number of reasons, chief among which is the ability to see _at a glance_ how the listed CSS selectors should be used in HTML. For example, when building a carousel, I often find myself with CSS selectors like:

    .carousel{}
    .panes{}
    .pane{}
    .slide-image{}
    .slide-title{}

As these selectors are only one class deep it is difficult to see at a glance how they might map to my HTML. One solution might be to write my CSS like so:

    .carousel{}
    .carousel .panes{}
    .carousel .panes .pane{}
    .carousel .panes .pane .slide-image{}
    .carousel .panes .pane .slide-title{}

But of course you don’t need me to tell you how nasty that is…

Instead, I prefer a structure more like:

    .carousel{}
        .panes{}
            .pane{}
                .slide-image{}
                .slide-title{}

Here my selectors are still nice and short but I can still see how they map to my HTML structure. I find this really useful to see at a glance how these rules relate to one another.

If you don’t like this, or won’t find it useful, that’s cool! Just don’t use it.

* * *

I said:

> Also write vendor prefixed CSS so that colons all line up

He said:

> Nope

I really have no idea why you wouldn’t do this one. It’s often been proposed that we should write vendor prefixed CSS thus:

    -webkit-border-radius:4px;
       -moz-border-radius:4px;
            border-radius:4px;

This means all our values—the bits that matter the most—are lined up to a) scan quickly and b) edit at once with columnal typing (in text editors which support it). This, to me, is a [no-brainer](http://www.google.co.uk/search?sourceid=chrome&ie=UTF-8&q=define%3Ano-brainer) and a very quick-win.

* * *

I said:

> Instead of building dozens of unique components, try and spot repeated design patterns abstract them; build these skeletons as base ‘objects’ and then peg classes onto these to extend their styling for more unique circumstances.

He said:

> [Not unless you are a big website like Facebook]

It doesn’t matter if you are working on the next Facebook or for some guy from the pub, if you can build a website from several repeated components you should. From a performance, consistency, maintainability and sheer sensibility point of view, don’t solve the same problem a dozen times when you can solve it once with an abstraction.

Best practices are best practices, the size of a project is irrelevant.

* * *

I said:

> All components should be left totally free of widths; your components should always remain fluid and their widths should be governed by a grid system.

He said:

> Nope. Again, grid systems are something that should be used on a case-by-case basis, according to the nature of the site you’re building.

Here I made something of a mistake; when I say grid system what I actually mean is _any_ means of abstracting your layout into its own layer.

If this _is_ a grid system then this is simple; a grid system handles your layout and your components fill it.

If you are not using a grid system then wrapper and parent elements should handle layout and the components should still say fluid. As I said on Twitter just three days prior to this:

> Box-model properties are the most fragile and unpredictable and thus should be avoided wherever you can. Leave layout to wrappers/parents… ([#](https://twitter.com/csswizardry/status/178062012742504448))

And:

> When sites break it‘s usually because of layout—the less layout stuff we declare the less chance it has to break. Abstract layout to grids! ([#](https://twitter.com/csswizardry/status/178063631265710080))

Whether using a grid system or not, your components should not carry dimensions. Think of a page like a set of shelves; you set up your shelving units (grid system (or similar)) and then populate them with things (components). If you didn’t have the shelves erected then the components would be supporting themselves, holding themselves up; this makes moving or changing them very volatile.

Abstract your layout to wrappers, parents or grid systems, always.

* * *

I said:

> Heavily location-based selectors are bad for a number of reasons.

He said:

> Nope. What you’re arguing against is a rule that has a high degree of specificity…

I’m not; I’m talking about location based styling. As soon as an elements begins to rely on its parent, and their parent, and their parent’s parent then you are doing it wrong. Your styles should never rely too heavily on where they live as this makes them _incredibly_ unportable.

Putting classes on the elements you wish to affect rather than drilling down to them via the DOM tree is a lot better in terms of portability in that you don’t have to rely on a location in order to set styles. This one really is a [no-brainer](http://www.google.co.uk/search?sourceid=chrome&ie=UTF-8&q=define%3Ano-brainer) for me…

* * *

I said:

> An over-qualified selector is one like `div.promo`.

He said:

> [This is actually a good idea unless you want a class to be applicable to any element]

Erm, yes please! Ideally classes are applicable to any element; classes should be element-agnostic. The ability to apply them to any element we wish is _exactly_ what we want.

Why would you ever, _ever_ write `div.promo{}` in your stylesheet if that could be left at `.promo{}`?! Why would you _ever_ limit yourself to only being able to use a class on one type of element when you could leave the leading type selector off and have an element-agnostic rule?

This is another [no-brainer](http://www.google.co.uk/search?sourceid=chrome&ie=UTF-8&q=define%3Ano-brainer) to me. Don’t tie yourself to things when you really just don’t need to. I think we can all agree that `.promo{}` is a lot more (re)usable than `div.promo{}`. By tying an element to any class you are the only thing that will hinder you going forward; you are preemptively closing a lot of doors on yourself…

* * *

I said:

> Do not use IDs in CSS at all.

He said:

> “NOPE NOPE NOPE NOPE NOPE. Understand specificity rules. Write good selectors. Don't outright ban IDs just because you're not careful enough to write clean CSS.”

I’m pretty sure no CSS developer has ever said ‘I wish I’d used an ID here instead of a class.’

IDs work, sure, but they are way too specific. It doesn’t matter how good a developer you are, you cannot change the fact that an ID is massively more specific than a class.

I would genuinely love to see an elegant solution to [this](http://jsfiddle.net/csswizardry/3sxZR/) that doesn’t use a class over an ID. ([There isn’t one.](http://csswizardry.com/2011/09/when-using-ids-can-be-a-pain-in-the-class/))

There is literally _no_ reason why, from a purely CSS point of view, that an ID is better than a class. An ID is impossible to reuse (whether you want to or not) and they have a way-over-the-top specificity.

Anything you can do with an ID can be done with a class, but with none of the drawbacks. IDs will only ever trip you up because you can never reuse them and they will trump your class-based-selectors by quite an order of magnitude.

Classes; all the bits you love about IDs with none of the bits that are like IDs.

To me, another [no-brainer](http://www.google.co.uk/search?sourceid=chrome&ie=UTF-8&q=define%3Ano-brainer).

* * *

I said:

> As a general rule, all layout and box-model rules can and will work without an IE stylesheet if you refactor and rework your CSS.

He said:

> Hahahahahahahahahhaa

I was the sole CSS developer on [Sky Bet](http://skybet.com). This project (as a whole) has taken over a year for the whole team involved (and almost a year of my dev time).

To support IE7+ I used all of zero IE stylesheets. Not one. A project which took me almost a year did not require one single IE stylesheet. It is doable, it should be done.

I haven’t written an IE stylesheet in all of my professional career. I started working when I was 18 so that makes three years; I haven’t written an IE stylesheet in over three years. It’s not that hard, seriously.

To just laugh off such a statement seemed a little odd, but seriously, if you invest enough time and take enough care, you will not need an IE stylesheet.

* * *

Like I said in [the documents’s README](https://github.com/csswizardry/CSS-Guidelines/blob/master/README.md), you can disregard the advice if you wish, but make sure you fully understand it before shunning it completely.
