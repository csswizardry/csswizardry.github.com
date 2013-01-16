---
comments: true
date: 2012-06-21 20:09:41
layout: post
slug: the-open-closed-principle-applied-to-css
title: The open/closed principle applied to CSS
wordpress_id: 3703
categories:
- Web Development
tag:
- Abstraction
- CSS
- Front-end architecture
- OOCSS
---

A question that often gets asked of OOCSS is ‘What happens when an object
changes?’. That is to say, if you have a basic object that underpins a dozen
different components, what happens when changing that object will favourably
impact one component, but negatively impact the other 11? With so much abstracted
and shared CSS, simple changes to a base object can have massive ramifications
across whole projects; how do you deal with that?

Well, the short answer is _never change your base abstractions_.

**N.B.** This article will require an understanding of the principles of OOCSS.

One way of dealing with objects in an OO language is the
[open/closed principle](http://en.wikipedia.org/wiki/Open/closed_principle)
which states that  software entities (classes, modules, functions, etc.) should
be open for extension, but closed for modification.

By sticking to this we know that our base objects themselves will never change;
they are _closed for modification_. If we want to alter their effects in some
way, we _extend them_.

## Why you should never modify a base object

The key to writing good OOCSS is keeping your base objects _super_ simple. As
simple as you can get. The [nav abstraction](/2011/09/the-nav-abstraction/)
literally just throws a list into horizontal mode; the
[island object](/2011/10/the-island-object/) _only_ boxes off content; the
[media object](http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/)
_only_ places image-like and text-like content side-by-side. This ties in very
nicely to the [single responsibility principle applied to CSS](/2012/04/the-single-responsibility-principle-applied-to-css/).

By making your base objects this simple your choices become boolean; you use the
object or you don’t. The object is either entirely suitable as a basis, or
entirely _un_suitable.

As soon as you make the mistake of making your base objects too specific (for
example, if your nav abstraction also adds padding to links) you might find that
object is not entirely suited to another job for which it is _almost_ perfect.
You might find that in order to use the object you have to undo stuff in it.

A prime example of this is a mistake I made on [faavorite](http://faavorite.com/csswizardry).
I made the island object carry cosmetics; instead of merely boxing off content I
(foolishly) gave it a background, border and shadow style. This means that if I
ever want to use the island for any different purposes I have to undo that; here
I messed up and made an object too specific, so I have to now decide whether
it’s worth unsetting these properties in order to reuse `.island`, or is it
better to just make something new? I removed the boolean choice by not keeping
my base simple enough.

So if you abstract sensibly you should find that you rarely need to _change_ a
base object, you should only ever need to extend it. Extending will add styles
only in specific cases, making modifications to a base object is a _bad idea_.

After sensible and considered abstraction you should find that base objects
never need changing, you just use them or stop using them.

For example, let’s imagine you have the media object used as a base across ten
different components. One of the components is a user’s avatar with their
username to the right of it, another is an album listing with the album art to
the left and track list to the right. The others... we won’t concern ourselves
with those. You might have markup like this:
    
    <a href=http://twitter.com/csswizardry class="media  profile-link">
        <img src=avatar.jpg alt="" class=img>
        <span class=body>@csswizardry</span>
    </a>
    
    <div class="media  album">
        <img src=/img/products/themirrorconspiracy.jpg alt="" class=img>
        <div class=body>
            <h2>Thievery Corporation &ndash; The Mirror Conspiracy</h2>
            <ol>
                <li>Treasures</li>
                <li>Le Monde</li>
                <li>Indra</li>
                <li>Lebanese Blonde</li>
                <li>Focus on Sight</li>
                <li>Air Batucada</li>
                <li>Só com você</li>
                <li>Samba Tranquille</li>
                <li>Shadows of Ourselves</li>
                <li>The Hong Kong Triad</li>
                <li>Illumination</li>
                <li>The Mirror Conspiracy</li>
                <li>Tomorrow</li>
                <li>Bario Alto</li>
                <li>Guide for I and I</li>
            </ol>
        </div>
    </div>

There we have two totally different pieces of content sharing the same base
object, which is great!

However, let’s say you decide you want to change the display of albums on your
site, you now want to have the album art full-width with the track listing
_below_ it—no longer side-by-side as the media object is.

A lot of people here would argue that using an abstraction ties you to a
permanent visual style; and they would be correct! That’s the point! You can no
longer use the media object here, you have to change your markup. This isn’t a
problem with the abstraction, it’s a problem with its implementation.

Instead of trying to use just CSS for force the media object to display
differently in _this_ case, we stop using the media object altogether. This
abstraction is no longer suitable. We open up the include that houses the markup
that handles albums and we get rid of some markup; not everything can or should
be done through CSS alone. We hit our boolean; do we use the abstraction or not?
In this case, not.

## When to extend

So above we discussed when to stop using abstractions, but what about when we
legitimately need to extend them?

Let’s take another example using [the media object](http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/)
again. Here we have an amazingly simple abstraction that places image-like
content alongside textual content:
    
    <a href=http://twitter.com/csswizardry class=media>
        <img src=avatar.jpg alt="" class=img>
        <span class=body>@csswizardry</span>
    </a>
    
    
    .media{
        display:block;
    }
        .img{
            float:left;
            margin-right:10px;
        }
            .img img{
                display:block;
            }
        .body{
            overflow:hidden;
        }
            .body > :last-child{
                margin-bottom:0;
            }

In this we see that there will be a `10px` margin between the image and the
text-content to the right. By and large this is fine, but let’s go back to our
album listing example again and imagine we are still using the media object.
`10px` here just seems a little too cramped so what we do is _extend_ the media
object for cases where we use it for album listings, thus:
    
    <div class="media  album">
        <img src=/img/products/themirrorconspiracy.jpg alt="" class="img  album-art">
        <div class=body>
            ...
        </div>
    </div>
    
    
    .media{
        display:block;
    }
        .img{
            float:left;
            margin-right:10px;
        }
        /* Increase spacing if image is an album cover. */
        .album-art{
            margin-right:20px;
        }
        ...

Here we can see how the base object remains intact but we extend it with a more
specific use-case to modify its appearance. No other uses of the media object
will be effected, only ones we explicitly flagged as being `.album-art`.

Here we make changes via extension, leaving our base—and every other instance of
it—completely untouched.

## Final word

If you’re using OOCSS you need to be aware that using an object is fairly
boolean. You need to understand the open/closed principle and that once you’ve
written an abstraction you’re committed to it (unless you fancy a large
refactoring job). With this in mind avoid abstracting too early and abstract
_very_ carefully. Needing to modify an object is a big warning sign.

If you find you’re having to undo or—even worse—change base objects, you need to
stop and consider where things went wrong. If an abstraction no longer becomes
suitable that’s cool; we’re allowed to touch markup so just stop using it in
your HTML. If you’re finding you only ever need to peg classes onto things to
extend their appearance then you’re doing it right!

Do not modify your abstractions; needing to do so is a bad sign. If you need to
alter things then _extend_ them.

When working with OOCSS always keep in the back of your mind that **objects are
open to extension but closed to modification.** This will force you to write
your base objects as stripped back, abstract and reusable as possible. Modify
their appearance only by extension (that is to say, by adding more classes).
