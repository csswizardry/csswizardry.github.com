---
comments: true
date: 2012-06-12 18:11:59
layout: post
slug: single-direction-margin-declarations
title: Single-direction margin declarations
wordpress_id: 3678
categories:
- Web Development
tag:
- CSS
- Front-end architecture
- OOCSS
---

This morning I awoke to find Smashing Magazine had retweeted [a tweet I made two months ago](https://twitter.com/csswizardry/status/190090844181774336) about how you should always try and apply margins in one direction only. This, like most rules in web development, is a very general (and breakable) rule. It’s even a rule you can opt not to follow at all, but after receiving a slew of Tweets asking why, I thought I’d write up why it’s a rule I live by, and one I’d recommend to anyone…

I’m not sure how I arrived at this rule, but I’m really glad I did and I would likely never ever change it. The basic premise is that you should try and define all your margins in one direction. This means always use `margin-bottom` to push items down the page, and `margin-left` to push them across the page. I’m going to focus mainly on `margin-bottom` throughout this article as it’s the most obvious to explain, but this can be applied to both directions (top/bottom, right/left).

The benefits are, as I see them:

* Easier to define vertical rhythm in one fell swoop.
* More confidence in (re)moving components if you know their margins all push in the same direction.
* Components and elements don’t have to necessarily live in a certain order if their margins aren’t dependent on adjoining sides.
* Not being concerned with collapsing margins means one less thing to worry about.

## Defining vertical rhythm

This next bit on its own is enough to convince me, this one tip is one of the most valuable ones I have, personally.

Whenever I start a new project I typically want to know two things; my base `font-size` and my base `line-height`. Let’s say that I choose a base `font-size` of 16px and a base `line-height` of 24px. This gives me ([in proper units](http://csswizardry.com/2011/12/measuring-and-sizing-uis-2011-style/)) this:
    
<pre><code>html{
    font:<mark>1em</mark>/<mark>1.5</mark> "Comic Sans MS", cursive;
}</code></pre>

That 1.5 is my [Magic Number](http://coding.smashingmagazine.com/2011/03/14/technical-web-typography-guidelines-and-techniques/#tt-magic-number). This is massively important; knowing this number allows me to set up my entire project’s vertical rhythm in _one go_:

<pre><code>h1,h2,h3,h4,h5,h6,hgroup,
ul,ol,dd,
p,figure,
pre,table,fieldset,hr{
    margin-bottom:<mark>1.5</mark>rem;
}</code></pre>

Bosh. Done. Now any block level element (I may have missed some) I add anywhere in that page will have a `line-height` of 24px (if my base `font-size` is 16px) and will be spaced apart by 24px (again, if my base `font-size` is 16px).

I can extend that list of selectors as and when I need to and all will remain in order:
    
<pre><code>h1,h2,h3,h4,h5,h6,hgroup,
ul,ol,dd,
p,figure,
pre,table,fieldset,hr,
<mark>.header,.media,.island</mark>{
    margin-bottom:1.5rem;
}</code></pre>

For me that is reason enough to stick to just defining my margins in one direction, I can just drop any element anywhere and it will obey the same vertical rhythm as any others.

## Confidence in portability

So if I know that all my margins are consistently in the same direction then I can be a lot more confident that if I add, move or _remove_ an element my spacing won’t mess up. This isn’t just about something as pretentious as vertical rhythm, this is about spacing in general. If everything is the same then it doesn’t really matter what is where, it all behaves similarly.

If I had some odd situation where I have a `margin-top` on element _A_, a `margin-top` and `margin-bottom` on element _B_ and a `margin-bottom` on element _C_ how can I be sure that removing _B_ won’t break anything? I can’t, because I mixed up my margins!

## Less to think about

So if you can be sure things are a lot less likely to break there’s one less thing to worry (as much) about.

One counter argument I got on Twitter today was that I didn’t ‘get’ collapsing margins. This kind of response really annoys (and offends) me. A similar one I get is ‘You just don’t understand specificity!’ whenever I advise against the use of IDs. It’s a developer’s understanding of a subject that allows them to know when to avoid or circumvent something.

[Collapsing margins](http://www.w3.org/TR/CSS2/box.html#collapsing-margins) aren’t rocket science but they _are_ one more caveat, one more thing to remember. Look at all that in the spec, all of that to have to consider just as a result of adjoining margins on elements. Don’t mix `margin-top` and `margin-bottom` and you won’t even need to think about that.

As a developer gets better they try to be less clever. I know where using IDs can be a pain so I save myself the hassle by not using them, same with collapsing margins; no one gets points for taking the more complex route. I honestly believe that if anything with caveats or potential ‘gotchas’ can be avoided they should be*.

I find I have never had any collapsed margin oddities in any of my projects because I avoid introducing the possibility.

## Exceptions

By applying the `margin-bottom` to all block-level elements that means that most things you put into a page will carry that spacing. Let’s say for example you have a heading in a promotional box that you don’t wish to have a `margin-bottom`, simply override the rule as you would with any sensibly architected CSS:
    
<pre><code>h1,h2,h3,h4,h5,h6,hgroup,
...{
    margin-bottom:1.5rem;
}
...
.promo-title{
    padding-bottom:1.5rem;
    border-bottom:1px solid #ccc;
    <mark>margin-bottom:0;</mark>
}</code></pre>

Using more specific selectors you can undo or alter your spacings with ease.

In working at [Sky](http://www.bskyb.com), there were times when we wanted a larger break between one section and another, let’s say double (`3rem`) between a carousel and the content below it. Simple:
    
    .carousel{
        ...
        margin-bottom:3rem;
        ...
    }

Interestingly, what I actually did was create an abstract class of `.landmark` which carried that `margin-bottom:3rem;` to denote any content that was deemed a large, thematic break in the page (signified by larger spacing).

Other times we had a boxed-off bit of content for which I used the [Island Object](http://csswizardry.com/2011/10/the-island-object/). Some CSS like this…
    
    .island{
        padding:1.5rem;
        -webkit-border-radius:4px;
           -moz-border-radius:4px;
                border-radius:4px;
    }

…would often lead to compounding margin-plus-padding issues, [thus](http://jsfiddle.net/csswizardry/5p8ts/). The solution here was simply to remove the `margin-bottom` from the last element, [like so](http://jsfiddle.net/csswizardry/5p8ts/1/).

### Breaking the rule

Obviously there will come a time when this rule needs breaking; we can’t even try and kid ourselves--_all_ web development rules get broken. However, before you do go against it, double and triple check that there isn’t a nicer solution. I really cannot remember the last time I broke this rule, but I’m sure I have and will need to in future. I just really, _really_ try not to.

## Final word

Everything I’ve written here is nigh on impossible to prove and isn’t quantifiable, but speaking anecdotally and from experience on some huge websites, the method I use works perfectly. More than perfectly. I genuinely cannot remember a time I have had problems with collapsing margins or spacing issues or anything arising from arbitrary margin declarations.

If you think this might be of use then I urge you to try it, it really has worked wonders on every site I’ve ever employed this on. Conversely, if I’ve missed a trick please do tell me!

If you don’t like the idea of it then that’s totally cool; I can’t prove anything and if you’re comfortable as you are then that’s great!

*From the guy who likes unquoted attributes in HTML… I know!
