---
layout: post
title: "Speeding Up Async Snippets"
date: 2022-10-12 21:47:12
categories: Web Development
main: "https://res.cloudinary.com/csswizardry/image/fetch/f_auto,q_auto/https://csswizardry.com/wp-content/uploads/2022/10/waterfall-async-snippets-before.png"
meta: "Async snippets used to improve performance, but now they’re a legacy anti-pattern. How do we handle them now?"
---

If you’ve been a web developer for any reasonable amount of time, you’ve more
likely than not come across an _async snippet_ before. At its simplest, it looks
a little like this:

```html
<script>
  var script = document.createElement('script');
  script.src = 'https://third-party.io/bundle.min.js';
  document.head.appendChild(script);
</script>
```

Here, we…

1. create a `<script>` element…
2. whose `src` attribute is `https://third-party.io/bundle.min.js`…
3. and append it to the `<head>`.

The first thing I find most surprising is that the majority of developers
I encounter do not know how this works, what it does, or why we do it. Let’s
start there.

## What Is an Async Snippet?

Snippets like these are usually employed by third parties for you to copy/paste
into your HTML—usually, though not always, into the `<head>`. The reason they
give us this cumbersome snippet, and not a much more succinct `<script src="">`,
is purely historical: **async snippets are a legacy performance hack.**

When requesting JavaScript files from the DOM, they can be either _blocking_ or
_non-blocking_. Generally speaking, blocking files are worse for performance,
especially when hosted on someone else’s origin. Async snippets inject files
dynamically so as to make them asynchronous, or non-blocking, and therefore
faster.

But what is it about this snippet that actually makes the file asynchronous?
There’s no `async` attribute in sight, and the code itself isn’t doing anything
special: it’s just injecting a script that resolves to a regular, blocking
`<script>` tag in the DOM:

```html
  ...
  <script src="https://third-party.io/bundle.min.js"></script>
</head>
```

How is this any different to just loading the file normally? What have we done
that makes this asynchronous? Where is the magic?!

Well, the answer is _nothing_. We didn’t do a thing. It’s the spec which
dictates that any scripts injected dynamically should be treated as asynchronous
[citation needed]. Simply by inserting the script with a script, we’ve
automatically opted into a standard browser behaviour. That’s really the extent
of the whole technique.

But that begs the question… can’t we just use the `async` attribute?

<small>As a bit of additional trivia, this means that adding
`script.async='async'` is redundant—don’t bother with that. Interestingly,
adding `script.defer=defer` does work, but again, you don’t need an async
snippet to achieve that result—just use a regular `<script src=""
defer>`.</small>

## Legacy `async` Support

It wasn’t until 2015 (admittedly, that is seven years ago now…) that [all
browsers supported the `async` attribute](https://caniuse.com/script-async). For
all _major_ browsers, that date was 2011—over ten years ago. So, in order to
work around it, third party vendors employed async snippets. Async snippets are,
at their most basic, a polyfill.

Nowadays, however, we should be going straight into using `<script src=""
async>`. Unless you have to support browsers in the realm of IE9, Opera 12, or
Opera Mini, you do not need an async snippet ([unless you
do…](#when-we-cant-avoid-async-snippets)).

## What’s Wrong With the Polyfill?

If the polyfill works, what’s the benefit of moving to the `async` attribute?
Sure, using something more modern feels nicer, but if they’re functionally
identical, is it _better_?

Well, unfortunately, **this performance polyfill is bad for performance**.

For all the resulting script is _asynchronous_, the `<script>` block that
creates it is fully _synchronous_, which means that the discovery of the script
is governed by any and all synchronous work that happens before it, whether
that’s other synchronous JS, HTML, or even CSS. Effectively, we’ve hidden the
file from the browser until the very last moment, which means we’re completely
failing to take advantage of one of the browser’s most elegant internals… the
_Preload Scanner_.

### The Preload Scanner

All major browsers contain an inert, secondary parser called the Preload
Scanner. It is the job of the Preload Scanner to look ahead of the primary
parser and asynchronously download any subresources it may find: images,
stylesheets, scripts, and more. It does this in parallel to the primary parser’s
work parsing and constructing the DOM.

Because the Preload Scanner is inert, it doesn’t run any JavaScript. In fact,
for the most part, it only really looks out for tokenisable `src` and `href`
attributes defined later in the HTML. Because it doesn’t run any JavaScript, the
Preload Scanner is unable to uncover the reference to the script contained
within our async snippet. This leaves the script completely hidden from view
and thus unable to be fetched in parallel with other resources. Take the
following waterfall:

<figure>
<img src="{{ site.cloudinary }}/wp-content/uploads/2022/10/waterfall-async-snippets-before.png" alt="" loading="lazy">
</figure>

Here we can clearly see that the browser doesn’t discover the reference to the
script (3) until the moment it has finished dealing with the CSS (2). This is
because synchronous CSS blocks the execution of any subsequent synchronous JS,
and remember, our async snippet itself is fully synchronous.

The vertical purple line is a `performance.mark()` which marks the point at
which the script actually executed. We therefore see a complete lack of
parallelisation, and an execution timestamp of 3,127ms.

<small>To read more about the Preload Scanner, head to [Andy
Davies](https://twitter.com/AndyDavies)’ [<cite>How the Browser Pre-loader Makes
Pages Load
Faster</cite>](https://andydavies.me/blog/2013/10/22/how-the-browser-pre-loader-makes-pages-load-faster/).</small>

## The New Syntax

There are few different ways to rewrite your async snippets now. For the
simplest case, for example:

```html
<script>
  var script = document.createElement('script');
  script.src = 'https://third-party.io/bundle.min.js';
  document.head.appendChild(script);
</script>
```

…we can literally just swap this out for the following **in the same location or
later** in your HTML:

```html
<script src="https://third-party.io/bundle.min.js" async></script>
```

These are functionally identical.

If you’re feeling nervous about completely replacing your async snippet, or the
async snippet contains config variables, then you can replace this:

```html
<script>
  var user_id     = 'USR-135-6911-7';
  var experiments = true;
  var prod        = true;
  var script      = document.createElement('script');
  script.src      = 'https://third-party.io/bundle.min.js?user=' + user_id;
  document.head.appendChild(script);
</script>
```

…with this:

```html
<script>
  var user_id     = 'USR-135-6911-7';
  var experiments = true;
  var prod        = true;
</script>
<script src="https://third-party.io/bundle.min.js?user=USR-135-6911-7" async></script>
```

This works because, even though the `<script src="" async>` is asynchronous, the
`<script>` block before it is _synchronous_, and is therefore guaranteed to run
first, correctly initialising the config variables.

<small>`async` doesn’t mean <q>run as soon as you’re ready</q>, it means <q>run
as soon as you’re ready **on or after you’ve been declared**</q>. Any
synchronous work defined before an `async` script will always execute
first.</small>

<figure>
<img src="{{ site.cloudinary }}/wp-content/uploads/2022/10/waterfall-async-snippets-after.png" alt="" loading="lazy">
</figure>

Now we can see the Preload Scanner in action: complete parallelisation of our
requests, and a JS execution timestamp of 2,340ms.

Interestingly, the script itself took 297ms longer to download with this newer
syntax, but still executed 787ms sooner! This is the power of the Preload
Scanner.

## When We Can’t Avoid Async Snippets

There are a couple of times when we can’t avoid async snippets, and therefore
can’t really speed them up.

### Dynamic Script Locations

Most notably would be when the URL for the script itself needs to be dynamic,
for example, if we needed to pass the current page’s URL into the filepath
itself:

```html
<script>
  var script = document.createElement('script');
  var url    = document.URL;
  script.src = 'https://third-party.io/bundle.min.js&URL=' + url;
  document.head.appendChild(script);
</script>
```

In this instance, the async snippet is less about working around a performance
issue, and more about a dynamism issue. The only optimisation I would recommend
here—if the third party is important enough—is to complement the snippet with
a `preconnect` for the origin in question:

```html
<link rel=preconnect href="https://third-party.io">

<script>
  var script = document.createElement('script');
  var url    = document.URL;
  script.src = 'https://third-party.io/bundle.min.js&URL=' + url;
  document.head.appendChild(script);
</script>
```

### Injecting Into a Page You Don’t Control

The second most probable need for an async snippet is if you are a third party
injecting a fourth party into someone else’s DOM. In this instance, the async
snippet is less about working around a performance issue, and more about an
access issue. There is no performance enhancement that I would recommend here.
[Never `preconnect` a fourth, fifth, sixth party.](https://speakerdeck.com/csswizardry/more-than-you-ever-wanted-to-know-about-resource-hints?slide=45)

## Takeaways

There are two main things I would like people to get from this post:

1. **Specifically, that async snippets are almost always an anti-pattern.** If
   you’re utilising them, try move yourself onto a new syntax. If you’re
   responsible for one, try updating your service and documentation to use a new
   syntax.
2. **Generally, don’t work against the grain.** While it might feel like we’re
   doing the right thing, not knowing the bigger picture may leave us working
   against ourselves and actually making things worse.
