---
comments: true
date: 2014-03-26 18:04:31
layout: post
slug: naming-ui-components-in-oocss
title: Naming UI components in OOCSS
categories:
- Web Development
tag:
meta: "A way of giving complex, OOCSS-built components more meaningful names"
---

One of the biggest—if not most common—complaints about OOCSS is its use of
‘insemantic classes’. Unfortunately, the idea that classes are semantic (in the
HTML sense of the term) is something of a fallacy; classes aren’t understood by
machines, they’re simply read and/or matched—machines cannot glean any meaning
from something whose content is entirely subjective.

If you are still on the fence about <i>semantic classes</i>, I would recommend
reading [Nicolas Gallagher](https://twitter.com/necolas)’s _excellent_ article,
[<cite>About HTML semantics and front-end architecture</cite>](http://nicolasgallagher.com/about-html-semantics-front-end-architecture/).
In it, he discusses what we mean when we talk about semantics, and how HTML
semantics differs from <i>developer semantics</i>. The short version is that we
should write classes that are useful for developers; classes that are highly
reusable, that don’t couple themselves to specific types of content, and classes
that describe the _styling’s_ function rather than the _content’s_ function.
Traditionally we would refer to these as insemantic classes, but Nicolas does a
great job of debunking that. Having a solid grasp of (and, ideally, being in
agreement with) his article will really make this one make more sense.

**tl;dr** Keep using agnostic, abstract, OOCSS classes in your markup, but add
any desired meaning to your HTML via a `data-ui-component` attribute, e.g.:
`<ul class="ui-list" data-ui-component="users-list">`.

---

One of the best things about OOCSS, and ‘insemantic’ classes, is that we have
many design patterns tied to highly reusable names—we have very recyclable CSS
that we can apply over and over again, keeping our codebase small, neat, and
consistent.

One of the _cited_ downsides of OOCSS is that these classes don’t tell you
anything about the content. Nicolas explains why this isn’t that important
(basically <i>classes shouldn’t describe content when content describes
itself</i>), but when you have a series of objects and abstractions that come
together to form one complex UI component, it is often advantageous to be able
to refer to that component by a unique name.

I firmly believe that classes **should not** describe content, because it
inhibits their reusability, and that there is no such thing as an insemantic
class, but **I don’t see any harm in having the best of both worlds**. To this
end, I came up with something of a solution: highly abstracted, reusable
classes, along with a method of giving distinct names to particular UI
components. Let’s take an example…

Imagine we have some abstractions:

* **[The media object](http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/)**
  which places some text next to an image.
* **The bare-list object** which removes the indents and bullets from a list.
* **The UI-list object** which takes the indents and bullets off of a list,
  gives the list items some padding, and places a small border between each list
  item.

We combine these three abstractions to have a UI-list; each list item in the
UI-list contains a media object; each media object contains a picture of a user
and their bio; each bio contains a bare-list of their Twitter and website URLs.
Three individual UI objects which combine to create a list of users and their
bio information:

    <ul class="ui-list">

        <li class="ui-list__item">
            <div class="media">
                <img src="" alt="" class="media__img" />
                <div class="media__body">
                    <p>...</p>
                    <ul class="bare-list">
                        <li>...</li>
                    </ul>
                </div>
            </div>
        </li>

        ...

    </ul>

[Take a look on jsFiddle](http://jsfiddle.net/csswizardry/f9hvs)

Of course, the beauty of these classes is that they could be rearranged in any
order or combination to make another complex UI component that is entirely
different.  But, when a client wants to duplicate a piece of content, they won’t
ask you to <q>copy the UI-list and media object and bare-list component</q>,
they’ll probably ask you to <q>duplicate the user-list</q>. When you ask a
software engineer to write a loop to populate that list, you’ll probably also
want to refer to it as a <i>user-list</i> to them. What we need is a way of
assigning useful names to these composites for when we have discussions about
them; **there is no harm in having meaningful names as long as they don’t impact
our ability to reuse things.**

## Using Sass’ `@extend`

One method, obviously, would be to wrap all these classes up into one unique one
using Sass’ `@extend` directive, but there are problems with `@extend` that both
[Oliver J Ash](http://oliverjash.me/2012/09/07/methods-for-modifying-objects-in-oocss.html)
and I have [already covered](http://csswizardry.com/2014/01/extending-silent-classes-in-sass/):
chiefly, that `@extend` is very greedy, and can cause serious bloat if you’re
not careful.

{% include promo-case-studies.html %}

The other downside to wrapping these objects up into a more meaningful class is
that you have to pop open your Sass file(s), think up a brand new name,
potentially create a new partial, and add some more code to replicate
functionality that already existed free of charge. You have to do this every
time you want to reuse that object/abstraction anywhere new. This is just
increasing the amount of CSS you output for no real, tangible gains.

## `data-*` attributes

This desire to give UI components meaningful names is one that has been around
for a long time, and one that I frequently get asked about in workshops, etc. I
recently began to give it a little more thought, and it hit me: data attributes
are the _perfect_ candidate. This, [from
MDN](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_data_attributes):

> HTML5 is designed with extensibility for data that should be in the HTML, but
> not visible. `data-*` attributes allow us to store extra information on
> standard, semantic HTML elements without polluting the class name.

We can now attach our meaningful names via a `data-ui-component` attribute, for
example:

    <ul class="ui-list" data-ui-component="users-list">

[Take a look on jsFiddle](http://jsfiddle.net/csswizardry/f9hvs/1)

When this list gets repurposed as something else, we can keep using the same,
agnostic, decoupled classes but we can _also_ give it a name that describes how
and where that component might get used:

    <ul class="ui-list" data-ui-component="articles-list">

Reusable classes _and_ meaningful names!

[Take a look on jsFiddle](http://jsfiddle.net/csswizardry/f9hvs/2)

Now we can use as many nicely abstracted, agnostic classes as we like, but still
neatly give useful names to complex UI composites:

    <div class="media" data-ui-component="mini-bio">
        ...
    </div>

    <div class="media  media--large" data-ui-component="album-info">
        ...
    </div>

    <ul class="inline-list" data-ui-component="site-nav">
        ...
    </ul>

    <div class="box  box--promo" data-ui-component="promo-area">
        ...
    </div>

It’s the best of both worlds: you can still keep your CSS super-lean,
abstracted, recyclable, and reusable, but you can also give specific chunks of
markup meaningful names which can be used in discussions (e.g. referring to the
articles-list rather than any given UI-list).

Another really handy thing that this allows us to do—when in a debugging mode—is
to quickly view any parts of a site that we deem components (the kinds of thing
that you’d have in your pattern library or UI toolkit):

    [data-ui-component] {
        outline: 5px solid yellow;
    }

This will quickly put an outline around any explicitly named parts of the UI.

It’s important to note that although we _can_ style HTML via its `data-*`
attributes, we probably shouldn’t. `data-*` attributes are meant for holding
data in markup, _not_ for selecting on. This, from [the HTML Living
Standard](http://www.whatwg.org/specs/web-apps/current-work/multipage/elements.html#custom-data-attribute)
(emphasis mine):

> Custom data attributes are intended to store custom data private to the page
> or application, **for which there are no more appropriate attributes or
> elements**.

I’ve been using this on a client project recently, and it’s proved very useful
in encapsulating and discussing UI components, whilst also allowing me to keep
my CSS as abstracted and OO as usual. My client doesn’t need to know—or even
care—that the <i>share with friends</i> component is actually a combination of a
`.box`, `.media`, and `.btn` object, they just need to refer to is at the same
thing everyone else does—the <i>share with friends</i> component!

**I would strongly recommend trying it out.**
