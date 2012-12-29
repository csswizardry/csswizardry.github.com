---
comments: true
date: 2012-02-29 23:49:06
layout: post
slug: pragmatic-practical-font-sizing-in-css
title: Pragmatic, practical font sizing in CSS
wordpress_id: 3496
categories:
- Web Development
tag:
- CSS
- DRY
- Front-end architecture
- OOCSS
- Typography
---

One thing I’ve been thinking a lot about lately is how to build sites properly. Not what we have been _told_ is proper, but what actually makes sense for us as developers. I recently spoke at [The Digital Barn](http://thedigitalbarn.co.uk/) on exactly this; my talk—Breaking Good Habits—dealt with how we as developers need to solve problems not only for our users and clients, but for ourselves as well.

[Nicole Sullivan](http://twitter.com/stubbornella)—who totally rocks—has laid a lot of new foundations for us in her work on [OOCSS](http://oocss.org) and her ‘unconventional’ but absolutely spot-on approach to building websites. Gems like [_the media object_](http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/) have seriously changed how I build websites and, if you take the time to study it for yourself, I think it might just do the same for you as well.

## Double-stranded heading hierarchy

Another absolutely stellar nugget of wisdom she’s given us is what I call _double-stranded heading hierarchy_. This is the practice of defining a class every time you define a heading in CSS.

For example, if--for whatever reason--we want our `h2`s in our sidebar to be the same size as a `h1`, and the `h4`s in our footer to be the same size as a `h3`, we might have had some code like this:
    
    <div class=content>
      <h1>Lorem</h1>
    </div>
    
    <div class=sub-content>
      <h2>Lorem</h2>
    </div>
    
    <div class=footer>
      <h4>Lorem</h4>
    </div>
    
    
    h1,
    .sub-content h2{ [font styles] }
    h2{ [font styles] }
    h3,
    .footer h4{ [font styles] }
    h4{ [font styles] }
    h5{ [font styles] }
    h6{ [font styles] }

But now we’d have:
    
    <div class=content>
      <h1>Lorem</h1>
    </div>
    
    <div class=sub-content>
      <h2 class=h1>Lorem</h2>
    </div>
    
    <div class=footer>
      <h4 class=h3>Lorem</h4>
    </div>
    
    
    h1,.h1{ [font styles] }
    h2,.h2{ [font styles] }
    h3,.h3{ [font styles] }
    h4,.h4{ [font styles] }
    h5,.h5{ [font styles] }
    h6,.h6{ [font styles] }

As you can see, the former is far more arbitrary and those lists of selectors can soon become unwieldy, especially over a larger project. By assigning a class along with each heading style we now have those styles attached to a very flexible selector that can be moved anywhere, rather than to a very specific and non-movable one.

Now, I’m not such a fan of the `.hN` notation, I much prefer a solution that I _believe_ to have been suggested by Mr Jeremy Keith, and that is to use abstract classes made up of the first six letters of the Greek alphabet, thus:

    h1,.alpha   { [font styles] }
    h2,.beta    { [font styles] }
    h3,.gamma   { [font styles] }
    h4,.delta   { [font styles] }
    h5,.epsilon { [font styles] }
    h6,.zeta    { [font styles] }

Which now gives us:
    
    <div class=content>
      <h1>Lorem</h1>
    </div>
    
    <div class=sub-content>
      <h2 class=alpha>Lorem</h2>
    </div>
    
    <div class=footer>
      <h4 class=gamma>Lorem</h4>
    </div>

Neat, huh?

So now `.alpha` can carry the style information of a `h1` wherever you wish; it doesn’t depend on location _or_ a type of element. A double-stranded heading hierarchy; lovely.

## Extending this?

Okay, so now we have our heading styles all nice and portable we’ve won most of the battle. I’ve been using this method for months now and I _love_ it. My CSS is so much more efficient, more portable, more powerful, I can build faster, I’m not repeating font styles over and over, but what next?

The other night whilst working on [faavorite](http://faavorite.com) with [Nick](http://twitter.com/makeusabrew) I came up with a full on font-sizing micro-framework.

The problems I found I had with font-sizing on _any_ site include (but are not limited to):

* Repetition of `font-size`, `line-height` etc declarations.
* Overly-specific and/or location-dependent selectors (e.g. `.sidebar h2{}`).
* Arbitrary font sizes could and _did_ creep into my CSS.
* When using `rem` with `px` fallbacks, there is a lot to type!

And a few important things to remember:

* Font sizes, like colour palettes, should be limited, preset and non-arbitrary.
* Vertical rhythm is important and easy.
* DRY code is important for both efficiency and maintainability.
* It’s important to save yourself as much time as possible.
* Classes are neither semantic or insemantic.

With this in mind, I decided that I wanted to use font-sizing much like a grid system; define it once in the stylesheet and just constantly reuse it.

### Preset font sizes

Like colour palettes are, font sizes should be strict, predefined and intentional. From both a code and design point of view, you shouldn’t deviate from your scale—you shouldn’t really ever need to and doing so will just make code harder to work with.

Presetting your font sizes is pretty easy; typically you might have requirements for:

* Normal body copy
* Headings 1–6
* Small print
* A few other sizes for larger-than-normal headings etc.

Setting the base font size is simple, just pop it on the `html` and everything will inherit it, paragraphs, lists, tables, you name it.

For your headings you define a series of `hN` and its corresponding Greek letter class, e.g. `h1,.alpha{}`.

### Non-standard font-sizing

You ever had that need to turn a design [up to 11](http://www.youtube.com/watch?v=EbVKWCpNFhY)? When you have a masthead promo and even a `h1` ain’t big enough? I think we all have…

It’s tempting to create a new, unique selector to cater for this new requirement, perhaps something like:

    .masthead h1{ font-size:5em; }

And whilst this will work, you’ll only ever get that 5em goodness if you use _specifically_ a `h1` that is _specifically_ in a `.masthead`. This isn’t very reusable at all. Sadface.

To combat this, I decided to create some new abstract classes, this time borrowing [SI prefixes](http://en.wikipedia.org/wiki/SI_prefix). Now we have the `h1,.alpha{}` through to `h6,.zeta{}` that we did before, but as well as those we have:

    .giga{ [font styles] }
    .mega{ [font styles] }
    .kilo{ [font styles] }

These classes are the ones _above_ `h1` and are the seldom used ones that make stuff massive!

### Going the other way?

Okay, so far we’ve worked with body copy to headings to beyond; what about small print? Well I opted to use:

<pre><code>small,<del datetime="2012-03-01T00:00:16+00:00">.omega</del><ins datetime="2012-03-01T00:00:16+00:00">.milli</ins>{ [font styles] }</code></pre>

[`small` has been redefined in HTML5](http://csswizardry.com/2011/01/html5-and-text-level-semantics/#small-el) so that’s an element we can use again freely<del> and `.omega` is simply the last letter in the Greek alphabet</del>.

#### Addendum

That there genius and awesome chap [Tom Hudson](http://twitter.com/TomNomNom) suggested I use `.milli` for this as it goes _below_ the regular scale. So, anything _on_ the normal scale is Greek letters, anything _off_ the scale (above or below) is SI prefixes.

### Vertical rhythm

To maintain vertical rhythm we need two key ingredients; consistent line heights and consistent bottom margins. We need a [magic number](http://coding.smashingmagazine.com/2011/03/14/technical-web-typography-guidelines-and-techniques/#tt-magic-number). This number is typically defined by the line height of your body copy, so if you have `html{ font-size:16px; line-height:1.5; }` then your magic number is 16 x 1.5 = **24**.

Now you know that all your line heights and margin bottoms _have_ to be a multiple of 24px.

## Bringing it together

It really is imperative to take a look at an actual example of all the above brought together in order to fully ‘get’ it. I made [this jsFiddle demo](https://bitly.com/xxiqfm) of _just_ CSS; you can add HTML and tinker with it yourselves, combining elements with classes to create double stranded, portable font sizing framework stuff!

## Where does that leave us?

We now have a self-contained font-sizing framework which should hopefully mean we never need to define another `font-size` declaration again! We can manage our brand specific type rules from one place, we can build stuff faster, we can build faster stuff, we can keep our code DRYer, we can keep our styling a lot more consistent, we can keep styling location _in_dependent and we can make far reaching changes in one fell-swoop!

Feel free to take the code and modify or improve it.

Also please note that I am not suggesting we all use these specific classes; experiment, find your own, see what you’re comfortable with and report back!
