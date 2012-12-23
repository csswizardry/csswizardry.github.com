---
comments: true
date: 2010-10-13 22:12:14
layout: post
slug: your-logo-is-an-image-not-a-h1
title: Your logo is an image, not a &lt;h1&gt;
wordpress_id: 1545
categories:
- Web Development
tag:
- Logo
- Semantics
- Web Standards
---

Should you mark your logo up as an image or a `<h1>`? There has been much debate for a long time now as to how to mark up logos. Should your logo be an inline image (`<img />`) or a `<h1>` with a background style--using one of [many means of image replacement](http://www.mezzoblue.com/tests/revised-image-replacement/)--to apply the logo to that? This debate has been raging for goodness knows how long, but I’m going to try and explain in this article why you should mark up logos as inline images, and why that’s the most sensible option.

## A brief example of each

Using an image:

    <a href="/" title="Return to the homepage" id="logo">
      <img src="/images/logo.gif" alt="Nike logo" />
    </a>

Using a `<h1>`:

    <h1><a href="/" title="Return to the homepage">Nike</a>
    
    h1 a{
      width:;
      height:;
      display:block;
      text-indent:-9999px;
      background:url(/images/logo.gif);
    }

## Your logo is content

Your logo is content, not style. Style vs. content, in the web standards sense of the term, pertains to information and content that is required to be present/accessible irrespective of the presence of styles (in other words, CSS).

A logo is content. Let’s use Nike as an example throughout. Regardless of whether Nike’s site is blue, red or green, their logo will always be ‘that’ swoosh. The logo is totally independent of the site’s surrounding styles as the logo is content.

Imagine you were to visit Nike’s site in a browser that doesn’t support styles. It only makes sense that that logo is still there. It’s Nike’s brand, and it’ll be their brand whether their site is styled or not.

So your logo is content; it’s a visual representation of a brand that is defined long before that company’s site can be brought into consideration. Nike is admittedly a very big brand, but a brand nonetheless. Transport that way of thinking to any build and it’s becomes pretty obvious that a logo is indeed content.

### Content = markup

So if a logo is content, a logo is markup, right? Right. You’d probably want to mark up your logo as follows:

    <a href="/" title="Return to the homepage" id="logo">
      <img src="/images/logo.gif" alt="Nike logo" />
    </a>

As simple as that. Regardless of styles your content--and therefore logo--persist. Use the `id="logo"` to style anything such as positioning, and that’s it.

## Your logo isn’t a `<h1>`

So we’ve proved that a logo is content, but let’s now prove that it _isn’t_ a `<h1>`, a commonly held practice for marking up logos.

> To have the `<h1>` being the logo would be like having your name being a photo. They both represent the same thing, but are separate entities…

The `<h1>` element is defined as being the uppermost, all-encompassing title of a page. Now, for a homepage this is something of a grey area. The chances are that your site is the site which the logo represents, i.e. Nike’s logo appearing on Nike’s site. On the homepage the `<h1>` may well be whatever the logo says; it may well be `<h1>Nike</h1>`. This is a case where the logo and the `<h1>` share the same meaning. _But_, as discussed, the content of the two is different. The logo is still branding, and the `<h1>` is still a textual element. To have the `<h1>` being the logo would be like having your name being a photo. They both represent the same thing, but are separate entities in themselves. A coded example might be:

    <a href="/" title="Return to the homepage" id="logo">
      <img src="/images/logo.gif" alt="Nike logo" />
    </a>
    ...
    <h1>Welcome to Nike’s international website</h1></code>

Sometimes a homepage doesn’t even require a `<h1>` to be visible. The logo alone is enough, but your page still needs that `<h1>` in the markup somewhere. It needs the logo to be an image but also needs a level one heading. Here you might want to have an ‘invisible’ `<h1>` like I have here on CSS Wizardry. This means that semantically you’re marking up your logo as an image, as it should be, and providing a `<h1>` to screen-readers.

## What if you don’t have a logo?

Some sites, CSS Wizardry included, don’t have a logo as such. I use a bit of browser text as a logo, but even though this is textual content I do not mark this up as a `<h1>`. I mark it up using an `<em>`. This is still a text-module element, and to my mind is semantically sound.

## Problems with using a `<h1>` to mark up a logo

Although I did admit that the logo’s text might also be the title (`<h1>`) of the homepage, there’s a very good reason why you should not mark the logo up as one. What about your ‘about page’? The title of that page is undoubtedly ‘About me’, and the `<h1>` is a page’s title. It only stands to reason, then, that the page’s `<h1>` reads `<h1>About me</h1>`.

If however I had marked up my logo as a `<h1>`, the about page’s title would also be the same as the homepage, and a `<h2>` would have to take place as the page’s actual title. This is wrong; obviously and unarguably wrong. And, by this token, your contact and portfolio and services pages’ titles would all also be the same. This is the problem with marking logos up as `<h1>`s.

## More practical reasons

And if you weren’t convinced enough already, using an inline image will actually make your life easier.

As previously mentioned, using an inline image allows  the logo to persist regardless of styles. This means that print stylesheets will have a logo embedded in the page as an image which they can print. Most printers, to conserve ink, will not print backgrounds, which means that any logos applied by means of a background image will be lost at print. Not great that your branding will be lost as soon as your site is printed, really.

Furthermore, an inline image can have its dimensions altered. A background image on a `<h1>` can’t. You can alter the size of the `<h1>`, but not its background (unless you’re using some CSS3 background magic). This means that you cannot easily adapt the logo to different sizes through CSS alone; think about optimising for mobile. A useful CSS snippet for any mobile site is:

    img{
      width:100%
      max-width:100%;
    }

This means that all images will fill, but not break out of, the mobile screen. If your logo is applied as a background image it’ll get ignored here. What might happen is that your `<h1>` will render narrower that its background image’s dimensions (i.e. the background image is wider in pixels than the device’s screen is) on a mobile device, giving the impression of clipping the logo off. Conversely, the `<h1>` might not fill the width of the page leaving it, and therefore its logo background, spanning only a percentage of the page.

You can manipulate a logo as an `<img />` far easier than you can as a background.

## Stop applying logos as backgrounds

This really is semantics and web standards basics. A logo is content, not style. Just because your site is named the same as your logo reads does not make them the same thing. A logo should not be applied as backgrounds, and especially not to `<h1>`s. Some of the industry’s ‘best’ flaunt this lack of standards openly, and it’s just plain incorrect.

A logo is an image, a `<h1>` is a title. Your logo is never a background image, it’s never secondary content to anything. It is content in its own right and should be treated as such. Your logo is an image.

If you take only one thing from this article, let it be that **your logo is content, therefore an image**.
