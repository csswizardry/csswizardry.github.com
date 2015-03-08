---
layout: post
title: "Can CSS Be Too Modular?"
date: 2015-03-08 14:15:41
categories: Web Development
meta: "Looking at the dangers of abstracting CSS too far"
---

I frequently get asked questions along the lines of <q>Can CSS be too
modular?</q> I recently got asked about this in an email, which I’ve published
below:

---

> Harry,
>  
> I wanted to first thank you for creating inuitcss which I point my students to
> in my Object-Oriented CSS class I teach. I do have a philosophical question.
> From experience, I noticed that my websites have become abstraction heavy, and
> more often than not code was being duplicated. It is really because
> abstractions are owned by an object.
> 
> For example, I created a simple object called `.box` with abstractions to
> change the padding. Later I created an object for alert messages, inline
> labels, and inputs and noticed that the sizing abstractions were the same.
> Since then, I moved away from creating abstractions unless they need to target
> a child element or are SPECIFIC to that object, and began working with atoms.
> 
> So:
> 
>     .box          { }
>     .box--xs      { padding: 6px; }
>     .box--s       { padding: 12px; }
>     .box--m       { padding: 24px; }
>     .box--l       { padding: 36px; }
>     .box--xl      { padding: 48px; }
>
>     .alert        { }
>     .alert--xs    { padding: 6px; }
>     .alert--s     { padding: 12px; }
>     .alert--m     { padding: 24px; }
>     .alert--l     { padding: 36px; }
>     .alert--xl    { padding: 48px; }
>
>     .label        { }
>     .label--xs    { padding: 6px; }
>     .label--s     { padding: 12px; }
>     .label--m     { padding: 24px; }
>     .label--l     { padding: 36px; }
>     .label--xl    { padding: 48px; }
> 
> became an atom called `.pa` (padding-all):
> 
>     .pa--xs       { padding: 6px; }
>     .pa--s        { padding: 12px; }
>     .pa--m        { padding: 24px; }
>     .pa-l         { padding: 36px; }
>     .pa--xl       { padding: 48px; }
> 
> Now it could be applied to any element and is not bound to any particular
> object.
> 
> I read a fantastic article on Smashing Magazine that goes over this technique.
> Yahoo has implemeneted it. Atoms really are low-level utility classes that
> cache well. I think the only reason to keep abstractions are:
> 
> 1. They target a specific object, which atoms can not do
> 2. Too many atoms would be needed to make up the abstraction (like your `.btn`
> class)
> 3. An abstraction is SPECIFIC to an object. Atoms are not.
> 
> This is no way replaces modular design, but rather compliments. Everyone uses
> helper classes, (inuitcss, Bootstrap, SUIT) but creating an atom pool seems to
> be the next evolution in creating scalable frameworks.
> 
> Here is the article (the authors naming conventions for font-sizes are awful
> it would be better to do `.fz-s`, `.fz-m`, `.fz-l` in case they change):
> 
> [smashingmagazine.com/…/challenging-css-best-practices-atomic-approach/](http://www.smashingmagazine.com/2013/10/21/challenging-css-best-practices-atomic-approach/)
> 
> I was wondering how you felt about this? Is my thinking on this wrong? When I
> tell my students about this, I always warn them first I have only seen a
> handful of websites (besides my own) that use it.
> 
> Thanks,  
> [Name]

---

To which my response was:

---

> Hey!
> 
> Thanks for getting in touch. This is a really interesting one, and something I
> came up against in my own work a couple of years ago.
> 
> The problem, I think, is that with any new tool or technique we learn, we try
> and take it to its fullest extreme. We then see how that led us slightly
> astray, and then we begin to correct. Almost any dev problem/solution I’ve
> ever seen looks like a pendulum: one extreme; extreme overcorrection; finding
> the sweet spot.
> 
> With that in mind, I think that old-style CSS (no classes, very convoluted
> selectors, etc.) was one peak of the pendulum, and something like Atomic CSS
> (or anything that begins to replicate/emulate inline styles) is the peak on
> the opposite side: vast overcorrection to take us as far from the other option
> as possible. I think we need to find the sweet spot.
> 
> With Atomic CSS (this is a pseudo-code example; it doesn’t use any actual
> Atomic CSS names) we might have really, really, really DRY CSS, but some DOM
> like this:
> 
>     <div class="d-bk  p-md  bg-w">
>         <a href="#" class="p-sm  fs-m  d-bk  c-gn">Log in</a>
>     </div>
> 
> I know very little about this HTML. Sure, I can tell you which declarations
> are acting on it (it’s pretty much inline styles) but I couldn’t tell you:
> 
> * Where does the ‘scope’ of this section of DOM start and stop?
> * Are the `div` and `a` part of the same UI component?
> * Could the `div` or `a` exist without one another?
> * Are any of the classes thematically related?
> * Do these classes appear side by side purely coincidentally?
> * Do we need all classes to remain intact if we were to reuse this HTML?
> * Do all classes when combined create a specific UI component?
> * Are any of the classes optional at this point?
> * If one of those classes changes in this bit of DOM, will they need to be
> changed in every similar piece of DOM?
> 
> Sure, we have tiny CSS, but our HTML has completely lost its ability to be
> read, or to self-document. This is too extreme.
>
> We could get around this by having some sort of meta templating language that
> sits above the HTML, so something like (again, pseudo-code):
>
>     <% ui-component('promo-button') %>
>
> …might spit out a series of Atomic classes that, when combined, create that
> piece of UI, but then we’re just designing more complexity into the system in
> order to solve a problem that we invented in the first place, which seems
> quite counterproductive.
>
> (Relatedly, we could wrap up the Atomic classes in our Sass, e.g.:
>
>     .btn-promo {
>       @extend .p-sm;
>       @extend .fs-m;
>       @extend .d-bk;
>       @extend .c-gn;
>     }
>
> …but this brings the same readability problems as before, as well as being
> complete overkill—exclusively `@extend`ing single declarations will lead to a
> very unusual project, as well as very tightly coupled dependencies.)
> 
> <q>…more often than not code was being duplicated.</q>
> 
> Back on the subject of DRYness. To quote myself from [this
> article](http://csswizardry.com/2014/11/when-to-use-extend-when-to-use-a-mixin/):
> <q>Repetition in a compiled system is not a bad thing: repetition in source is
> a bad thing.</q>
> 
> That is to say, having `padding: 6px;` appear in your CSS 50 times is no big
> deal. You will feel no performance impact. Gzip will crunch the bejeezus out
> of it.
> 
> However, manually typing out `padding: 6px;` 50 times in your Sass (or LESS,
> or whatever) is a problem. DRYness is the pursuit of a _Single Source of
> Truth_, meaning that any key data exists (and therefore needs to be changed)
> only once in the codebase. This ensures consistency (updated values are picked
> up throughout the entire project) and, more importantly, ease of maintenance.
> DRY is about repetition in source, not repetition-in-general.
> 
> To this end, I would just ensure that the values we’re interested in (6px,
> 12px, 24px, etc.) are only ever written once and then are simply recycled
> throughout the project. This is just as DRY (in terms of the Single Source of
> Truth) but also allows for more readability and context/knowledge in the HTML.
> 
> Here’s a very crude proof of concept:
> [sassmeister.com/…/87b2da6cbd80d3f1f993](http://sassmeister.com/gist/87b2da6cbd80d3f1f993).
> We can see from this that we only actually have one number involved at all, so
> we have achieved the Single Source of Truth, and we can just reuse it and its
> spawned size-variants very easily.
> 
> And now our HTML is more like this:
> 
>     <div class="box  box--promo">
>         <a href="#" class="btn  btn--small  btn--positive">Log in</a>
>     </div>
> 
> This tells us a heck of a lot about what’s going on in the DOM, it tells us
> that these classes are thematically related; it tells us which bits are
> optional, and it tells us what are candidates for change (i.e. anything with a
> `--` prefix).
> 
> There is absolutely no reason you can’t have utility classes—I even do this
> myself—but they should be the exception rather than the rule. Avoid building
> entire sections of UI out of them.
> 
> Abstracting classes out as far as Atomic CSS (or any other similar
> approach—this isn’t a criticism of Atomic CSS specifically) suggests will
> sacrifice (at the very least) context, readability, and maintainability, in
> favour or smaller filesizes. I feel this is overkill, especially considering
> that gzip would negate any difference in filesize anyway. We need to find that
> sweet spot, and I feel Atomic CSS (and paradigms like it) overshoot the mark.
> 
> Wow, that was a very long answer. I hope it helps.
> 
> Best,  
> Harry
