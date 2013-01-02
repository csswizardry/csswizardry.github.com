---
comments: true
date: 2011-11-08 20:00:57
layout: post
slug: create-a-notched-current-state-nav
title: Create a notched current-state nav
wordpress_id: 3393
categories:
- Web Development
tag:
- CSS
- HTML
---

[Ben Everard](https://twitter.com/ilmv) [tweeted last night](https://twitter.com/ilmv/status/133640383568678912) asking if anyone knew how to build a notched nav, like [this](http://cl.ly/1h1S3E2G3H1X06193r08). I was in bed at the time, I spotted it about midnight and was on my phone. As soon as I saw this I jumped out of my bed and turned my Mac on. I love stuff like this!

Anyway, [this is my solution](http://jsfiddle.net/csswizardry/ZDNu7/21/embedded/result/), and [this is its code](http://jsfiddle.net/csswizardry/ZDNu7/21).

Basically there are two main parts to this technique; the punching-the-hole-through-the-nav and the masking-the-hole-to-be-a-triangle. Both techniques couldn’t be simpler, and we use pseudo elements to do it.

## Punching holes through elements

This whole technique can only work by taking advantage of the behaviours of fixed background images. The exact same `background:;` applied to two elements give an odd result if both are also fixed. It gives the effect of a hole having been [punched right through your page to the background...](http://jsfiddle.net/csswizardry/7BXUf/show/)

What we do here, then, is create a pseudo element with `.nav .current a:before` and sit this at the bottom of the current list item. We then apply the fixed background to this _as well as_ the page. This is our punched hole already sorted, [only it’s square...](http://jsfiddle.net/csswizardry/ZDNu7/27/) we want a triangle.

## Masking the hole

To mask the hole to appear like a triangle we use another pseudo element and the CSS triangle hack to cover things up.

The triangle hack works by selectively applying borders to zero width/height elements, take a look at [this version with the triangles highlighted](http://jsfiddle.net/csswizardry/ZDNu7/28/). All we need to do here is make some of them the same colour as the nav and [we’re done](http://jsfiddle.net/csswizardry/ZDNu7/21/)!

So, by cleverly using a pseudo element we can spoof a hole through elements and then using a second one we can mask the corners off!

The full, commented CSS:

<pre><code>.nav{
    overflow:hidden; <span class="code-comment">/* To clear floats */</span>
    background:#111;
    margin:0;
    padding:0;
    list-style:none;
}
.nav li{
    float:left;
}
.nav a{
    display:block;
    padding:2em <span class="code-comment">/* <-- This is our magic number, this defines how large our notch can be! */</span> 1em;
    color:#fff;
    text-decoration:none;
}
.nav a:hover{
    text-decoration:underline;
}
.nav .current a{
    position:relative;
    text-decoration:underline;
    cursor:text;
}
.nav .current a:before,
.nav .current a:after{
    content:"";
    display:block;
    width:2em; <span class="code-comment">/* Must match our magic number... */</span>
    height:2em; <span class="code-comment">/* ...our notch will end up being half this size. We define it in ems to scale it up with the text size. */</span>
    position:absolute;
    bottom:0;
    left:50%;
    margin-left:-1em; <span class="code-comment">/* Half of our magic number. */</span>
}
body,
.nav .current a:before{
    background:url(http://farm5.static.flickr.com/4102/4876702379_82fe2bd7a8_b.jpg) top left no-repeat fixed; <span class="code-comment">/* Apply to the notch and the relevant container (this case, body). */</span>
}
.nav .current a:after{
    width:0;
    height:0;
    border:1em solid #111; <span class="code-comment">/* Half of our magic number and same colours as our nav’s background. */</span>
    border-bottom-color:transparent;
}</code></pre>

### Drawbacks

There are drawbacks here; you _have_ to have a fixed background image and you have to have a solid background colour for your nav, but they are reasonable trade-offs, considering this doesn’t use any extra markup at all _and_ works in IE8+!
