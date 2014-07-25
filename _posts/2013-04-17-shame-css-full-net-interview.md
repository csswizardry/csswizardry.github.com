---
comments: true
date: 2013-04-25 18:56:00
layout: post
slug: shame-css-full-net-interview
title: shame.css – full .net interview
categories:
- Web development
tag:
meta: The full version of the .net magazine shame.css interview
---

Since writing about [shame.css](http://csswizardry.com/2013/04/shame-css/) last
week, there has been a lot of buzz and discussion around it, which is great!
Part of that was an interview I did with .net magazine about the idea.  You can
read [the edited version of the interview over on the .net site](http://www.netmagazine.com/news/use-shamecss-house-css-hacks-says-dev-132699)
and you can also read the whole, unabridged version right here:

---

**Do you think there’s a tendency from some in the web industry to not be
realistic about the need for (hopefully) short-term hacks to get sites working?**

Yes, big time. If you work on a site/product that earns millions of pounds a year
then any bugs, breakages, quirks et cetera need fixing as soon as possible; your
product owner doesn’t care if your CSS is perfect (nor should they, really),
they care that the site is up and functional and ticking over that revenue. Good
code is important—and hacks are far from ideal—but to think you can always avoid
hacks and short-term/quick fixes is naive.

With websites/products you need to keep certain people happy; when a client is
breathing down your neck—or a feature is broken on live—then you need to make
sure you’re keeping the right stakeholders happy. If you spend an hour writing a
perfect fix for something you could have superficially fixed in two minutes then
I’d say you’re keeping the wrong person happy (i.e. yourself).

Hacks are far from ideal, and it _would_ be nice to avoid them where possible, but
to say/believe you can always avoid hacks and quick fixes is, to repeat myself,
very naive. I’ve worked on projects of varying sizes (from simple one-page
marketing sites to in-house, continuous (i.e. years) projects that earn serious
amounts of cash) and I will readily admit that the need for hacks increases
fairly proportionately with the size of the project, but the good thing about
that is that you’ll likely have more project time dedicated to fixing those hacks.

**What would you consider ‘hacks’ in the context of shame.css? Would you treat
cutting-edge CSS similarly, since that’s not always ‘clean’ or fully
standardised, or is this just about botch-jobs that were needed to get something
working and into production?**

For me a hack is something that could have been done better given more time.
It’s hard to think of examples out of context, but I think you’ll often know
when something is a hack. Written something that you’d be ashamed to explain to
a colleague? That’s probably a hack.

A hack is something where—as you’re writing it—you’re thinking <q>there _has_ to be
a cleaner way to do this</q>. Shame.css is about making a file full of things that
you think you could have done better, a file that you _can_ do better when you
get the time to revisit it. It’s a self-writing todo list, really; a file of
hacks that you put to one side to think about when you have more time.

**On the documentation side of things, should people working on CSS get more
into that in general, rather than just for hacks?**

Yes! If there’s one thing all developers should do more, it’s writing comments.
You should comment anything that isn’t immediately obvious from the code alone
(comments like `color:red; /* Makes the text red. */` are totally redundant).
There’s nothing worse than picking up someone else’s code and wondering what
anything does, or how, or why. Document your code so that, if you get hit by a
bus on your way home, your colleague can take over right away the next day.

{% include promo-case-studies.html %}

**In terms of integration, do you essentially see the hacks appearing as a block
of patches as the end of a minified CSS file? How would you recommend people
work if they’re not using preprocessors?**

If you are using a preprocessor then I’d `@import` the `shame.[scss|less|etc]`
file right at the end, ideally (this could always lead to specificity and
source-order problems, so your mileage may vary).

If you aren’t using a preprocessor but you do have a decent build process then
all your CSS files should be concatenated and minified before they’re deployed
anyway, so again, shame.css bolted onto the end of that.

If you aren’t using a preprocessor and you don’t have a build process then 1)
you probably fix that and 2) I reckon a hacks section at the end of your
stylesheet is probably your best bet. Shame.css isn’t at all intended for public
viewing so you should never end up with a separate stylesheet called by a link
element in your markup. [You should be serving one concatenated and minified
stylesheet only.](http://csswizardry.com/2013/01/front-end-performance-for-web-designers-and-front-end-developers/#section:css-and-performance)

**Finally, if shame.css as a concept really took off, how do you think it would
change design process and websites in general?**

Shame.css is only as useful as the developers who implement it. It’s all well
and good isolating and documenting your hacks, but if you never fix or revisit
them then you’re just in the same boat as before.

For me, shame.css signals a broader shift in development; it doesn’t need to be
limited to CSS. The concept is merely ‘realising, documenting and making a point
of your hacks’. You can apply that thinking to everything.

The real work involved with shame.css is getting your immediate team
(developers) on board, and then making the business/PMs/scrum masters/BAs/product
owners et cetera aware of the fact that their product _will_ include less-than-ideal
code sometimes, but that this code exists to meet business requirements.

Tell them that you are isolating and documenting these hacks and then get some
development time allocated to tidy things up. It’s easier to make a business
case for tidying up a codebase if you can quantify it; simply telling your
project manager that <q>I have some things to tidy up before I can move onto
<i>Feature X</i></q> won’t always cut it. Take a list of things to your PM and try
and get half a day of sprint time to spend cleaning up.

The idea behind shame.css is simply to make your hacks more transparent,
quantifiable and isolated; it’s up to you what you do with that information.
