---
comments: true
date: 2013-01-20 10:33:00
layout: post
slug: front-end-performance-for-web-designers-and-front-end-developers
title: Front-end performance for web designers and front-end developers
categories:
- Web Development
tag:
- Performance
meta: A comprehensive primer on front-end performance for designers and front-end developers
branch-id: g3NkCgvBTd0
branch-url: http://branch.com/b/front-end-performance-for-web-designers-and-front-end-devs
---

It’s hard, if not impossible, to deny that performance is _by far_ one of
the most critical aspects of any decent web project, be it a small portfolio
site, a mobile-first web app, right through to a full-scale ecommerce project.
Studies, articles and personal experience all tell us that fast is best.

Performance is not only hugely important, it is _incredibly_ interesting, and
something I am getting more and more involved in at both work (I’m forever
pestering our Lead Performance Engineer) and in side projects and CSS Wizardry
(I’m forever pestering [Andy Davies](http://twitter.com/andydavies)).

I’m going to share – in this massive article – a load of quick, simple and
downright intriguing bits of perf knowledge to act as a primer for web designers
and front-end developers alike; hopefully this article will serve as a decent
introduction for anyone wanting to start learning about perf, and making their
front-ends blazingly fast. These tips are all things your can implement by
yourself _very_ easily. It just takes a bit of cunning and some basic knowledge
of how browsers work and you’re ready to game the system!

This huge post won’t have loads of confusing graphs and numbers to crunch, but
instead concerns itself with theory and first-hand performance techniques that I
have arrived at as a result of reading, monitoring, collaborating and tinkering
(I spend a lot of time glued to CSS Wizardry’s waterfall charts). I will also
link to other articles on similar topics to help reinforce any key points. Enjoy!

**N.B.** This article does require a small amount of basic performance knowledge
up-front, but anything covered that you aren’t familiar with should be just a
Google search away!

<hr>

1. [The basics](#section:the-basics)
    1. [Styles at the top, scripts at the bottom](#section:styles-at-the-top-scripts-at-the-bottom)
    2. [Make fewer requests](#section:make-fewer-requests)
    3. [Maximising parallelisation](#section:maximising-parallelisation)
2. [HTTP requests and DNS lookups](#section:http-requests-and-dns-lookups)
    1. [DNS prefetching](#section:dns-prefetching)
3. [Resource prefetching](#section:resource-prefetching)
4. [CSS and performance](#section:css-and-performance)
5. [Gzipping and minifying](#section:gzipping-and-minifying)
6. [Optimising images](#section:optimising-images)
    1. [Spriting](#section:spriting)
    2. [Retina images](#section:retina-images)
    3. [Progressive JPGs](#section:progressive-jpgs)
    4. [Use no images at all](#section:use-no-images-at-all)
7. [Further reading](#section:further-reading)

<hr>

<h2 id="section:the-basics">The basics</h2>

There are a few things _all_ designers and front-end developers will likely
know about performance, things like making as few requests as possible,
optimising images, putting stylesheets in the `<head>`, putting JS before the
`</body>`, minifying JS and CSS and so on. These fundamentals will already get
you on your way to faster experiences for users, but there’s more… much more.

It is also very important to remember that – for all they give us headaches every
day of our working lives – browsers are _very_ clever; they do a lot to optimise
performance for you, so a lot of perf knowledge combines knowing where the
browser is at work, and knowledge of how best to exploit that. A lot of perf
know-how is merely understanding, exploiting and manipulating what a browser
does for us already.

<h3 id="section:styles-at-the-top-scripts-at-the-bottom">Styles at the top, scripts at the bottom</h3>

This is a really basic rule, and one that should be super easy to follow most of
the time, but why does it matter? Put _very_ shortly:

* **CSS blocks rendering**, so you need to deal with it right away (i.e. at the
  top of the document, in your `<head>`).
* **JS blocks  downloads**, so you need to deal with these last to ensure that
  they don’t hold up anything else on the page.

CSS blocks rendering because of a browsers desire to render pages progressively;
they want to render things as they get to them, and in order. If styles are a
long way down the page the browser can’t render that CSS until it gets to it.
This is so that the browser can avoid redraws of styles if they alter something
that was previously rendered further up the document. A browser won’t render a
page until it has all the available style information, and if you put that style
information at the bottom of the document you’re making the browser wait,
blocking rendering.

So, you put your CSS at the top of the page so that the browser can start
rendering right away.

JavaScript blocks downloads for a number of reasons (this is the browser being
clever again) but firstly, we need to know how downloading assets in browsers
actually happens; simply put, a browser will download as many assets as it can
from a single domain _in parallel_. The more domains it is pulling from, the
more assets can be downloaded, in parallel, at once.

JavaScript interrupts this process, blocking parallel downloads from _any_ and
all domains, because:

* The script being called might alter the page, meaning the browser will have to
  deal with that before it can move on to anything else. In order for it to deal
  with that eventuality it stops downloading anything else in order to focus
  soleley on that.
* Scripts usually need to be loaded in a certain order for them to work, for
  example,  loading jQuery _before_ you load a plugin. Browsers block parallel
  downloads with JavaScript so that it doesn’t start downloading jQuery and your
  plugin at the same time; it should be pretty obvious that if you were to start
  downloading both in parallel, your plugin would arrive _before_ jQuery would.

So, because browsers stop all other downloads whilst JavaScript is being fetched,
it is usually a good idea to put your JavaScript as late in the document as
possible. I’m sure you’ve all seen blank sections of pages where a third party
piece of JS is taking ages to load and blocking the fetching and rendering of
the rest of the page’s assets; this is JavaScript’s blocking in action.

Apparently, however, modern browsers get smarter still. I’m going to give you
an excerpt from an email from [Andy Davies](http://twitter.com/andydavies) to
me, because he explains far better than I can:

> Modern browsers will download JS in parallel and only rendering is blocked
> until the script has been executed (it obviously has to be downloaded too).
>
> Downloading of the script will often be done by the browser’s look ahead
> pre-loader.
>
> When a browser is blocked from rendering page e.g. waiting for CSS, or JS to
> execute, the look ahead pre-parser scans the rest of the page looking for
> resources it could download. 
>
> Some browsers e.g. Chrome, will prioritise the download of assets e.g. if
> scripts and images are both waiting to be downloaded it will download the
> script first.

Smart stuff!

So, to allow a page to begin rendering as fast as possible, put your styles at
the top. To prevent JS’ blocking affecting your rendering, put scripts at the
bottom.

<h3 id="section:make-fewer-requests"> Make fewer requests</h3>

The other really obvious and basic performance optimisation is simply
downloading less. Every asset a page requires is an extra HTTP request; the
browser has to go off and get every single asset required to render a page. Each
of these requests _can_ incur DNS lookups, redirects, 404s etc. Every HTTP
request you make, whether it is for a stylesheet, an image, a web font, a JS
file, you name it, is a potentially very expensive operation. Minimising these
requests is one of the quickest performance optimisations you can make.

Going back to browsers and parallelisation; most browsers will only download a
handfull of assets from each referenced domain at a time, and JS, remember, will
block these downloads anyway. Every HTTP request you make should be well
justified, and not taken lightly.

<h3 id="section:maximising-parallelisation">Maximising parallelisation</h3>

In order to get the browser to download more assets in parallel, you can serve
them from different domains. If a browser can only fetch, say, two assets at once
from a domain, then serving content from two domains means it can fetch four
assets at once; serving from three domains means six parallel downloads.

A lot of sites have static/asset domains; Twitter, you can see, use
`si0.twimg.com` to serve static assets:

    
    <link rel="stylesheet" href="https://si0.twimg.com/a/1358386289/t1/css/t1_core.bundle.css" type="text/css" media="screen">

Facebook use `fbstatic-a.akamaihd.net`:

    <link rel="stylesheet" href="https://fbstatic-a.akamaihd.net/rsrc.php/v2/yi/r/76f893pcD3j.css">

Using these static, asset domains, Twitter and Facebook can serve more assets in
parallel; assets from `twitter.com` and `si0.twimg.com` can be downloaded in
tandem. This is a really simple way to get more concurrent downloads happening
on your page, and even better when coupled with actual CDN technology that can
help decrease latency by serving assets from a more suitable _physical_ location.

This is all well and good, but later we’ll discuss how serving from subdomains
can actually, in certain circumstances, be detrimental to performance.

So, there are our performance basics out of the way:

* Put stylesheets at the top of a document
* Put JavaScript at the bottom (where possible)
* Make as few HTTP requests as possible
* Serving assets from multiple domains can increase the number of assets a
  browser can download in parallel.

<h2 id="section:http-requests-and-dns-lookups">HTTP requests and DNS lookups</h2>

Every time you request an asset from any domain, out goes an HTTP request with
the relevant headers, the resource is reached, and a response is sent back. This
is a vast over-simplification of the process, but it’s about as much as you
really need to know. This is an HTTP request, and all assets you reference are
subject to this round trip. These requests are the main bottleneck when it comes
to front-end performance because, as we covered, browsers are limited by how
many of these requests can happen in parallel. This is why we often want to use
subdomains; to allow these request to happen on several domains, allowing a
greater number of requests to happen at the same time.

A problem with this, however, is DNS lookup. Each time (from a cold cache) a
_new_ domain is referenced, the HTTP request is subject to a time-consuming DNS
lookup (anywhere between 20 and 120 milliseconds) in which the outgoing request
looks up where the asset actually lives; the internet is tied together by IP
addresses which are referenced by hostnames which are managed by DNS.

If each new domain you reference has the upfront cost of a DNS lookup, you have
to be sure that it’s actually going to be worth it. If you are a small site
(like CSS Wizardry, for example) then serving assets from a subdomain will
likely not be worth it; the browser can probably fetch several under-parallelised
assets from one domain quicker than it can perform DNS lookups across multiple
domains and parallelise those.

If you have perhaps a dozen assets, you might want to consider serving them from
**one** subdomain; an extra DNS lookup is probably worth it in order to better
parallelise that amount of assets. If you have, say, 40 assets, it might be
worth sharding those assets across _two_ subdomains; two extra DNS lookups will
be worth it in order to serve your site from a total of three domains.

DNS lookups are expensive, so you need to determine which is more suitable for
your site; the overhead of lookups or just serving everything from one domain.

It is important to remember that as soon as the HTML is requested from, say,
`foo.com`, that DNS lookup for that host has already happened, so subsequent
requests to anything on `foo.com` are _not_ subject to DNS lookups.

<h3 id="section:dns-prefetching">DNS prefetching</h3>

If you, like me, want to have a Twitter widget on your site, and Analytics, and
maybe some web fonts, then you will _have_ to link to some other domains which
means you’ll _have_ to incur DNS lookups. My advice would always be not to use
any and every widget without properly considering its performance impact first,
but for any you _do_ deem necessary, the following is useful…

Because these things are on other domains it does mean that, for example, your
web font CSS will download in parallel to your own CSS, which _is_ a benefit in
a way, but scripts will still block ([unless they’re async](http://css-tricks.com/thinking-async/)).

The problem here, really, is the DNS lookups involved with third party domains.
Fortunately, there is a super quick and easy way to speed this process up: DNS
prefetching.

DNS prefetching does exactly what is says on the tin, and could not be simpler
to implement. If you need to request assets from, say, `widget.foo.com`, then
you can prefetch that hostname’s DNS by simply adding this early on in the
`<head>` of your page:

    <head>
        ...
        <link rel="dns-prefetch" href="//widget.foo.com">
        ...
    </head>

That simple line will tell supportive browsers to start prefetching the DNS for
that domain a fraction before it’s actually needed. This means that the DNS
lookup process will already be underway by the time the browser hits the
`<script>` element that actually requests the widget. It just gives the browser
a small head start.

This simple link element ([which I use on CSS Wizardry](https://github.com/csswizardry/csswizardry.github.com/blob/b52472cea6a0f087944afda750839d7c96fab7d3/_layouts/default.html#L7-L15))
is totally backward compatible and will not negatively impact performance. Think
of it like performance progressive enhancement!

### Further reading

* [Speed Up Your Site Using Prefetching](http://calendar.perfplanet.com/2012/speed-up-your-site-using-prefetching/)

<h2 id="section:resource-prefetching">Resource prefetching</h2>

As well as prefetching DNS, it can be handy to prefetch any resources your site
will need as well. In order to know what we might want to prefetch, we first
must understand how and when a browser would _usually_ request a resource.

Web fonts and images referenced in CSS behave in much the same way; the browser
will start downloading them once it hits a piece of HTML that requires them.
Like I mentioned before, browsers are very clever and this is another great
example of that. Imagine if browsers downloaded images referenced in CSS as soon
as it saw the declarations:

    .page--home         { background-image:url(home.jpg); }
    .page--about        { background-image:url(about.jpg); }
    .page--portfolio    { background-image:url(portfolio.jpg); }
    .page--contact      { background-image:url(contact.jpg); }

If the browser _didn’t_ wait until it encountered the HTML that needed these
images then hitting the home page would download all four of them. This is
wasteful, so browsers make sure they _definitely_ need the image before they
start downloading them. The problem here is that the download, therefore,
doesn’t happen until pretty late on.

If we can be completely sure we _always_ want a certain CSS image used on
_every_ page, then we can trick the browser into downloading it early, _before_
it encounters the HTML that needs it. To do this is incredibly simple, but can
be a little dirty, depending on how you go about it.

The dirty way, and likely most bulletproof, is to have a hidden `<div>` in every
page which houses the CSS images as `<img>` elements with empty `alt`
attributes. I do this with [CSS Wizardry’s sprite](https://github.com/csswizardry/csswizardry.github.com/blob/b52472cea6a0f087944afda750839d7c96fab7d3/_layouts/default.html#L41-L44);
because I know it needs using on every page I can confidently prefetch it by
referencing it in my HTML. The way browsers handle inline `<img>`s is quite nice
in that it prefetches them and grabs them super early, so by making the browser
load my sprite as an `<img>` in my markup, it can begin downloading it before
the CSS requires it. I can get a headstart on that download by referencing it
(hidden) in my HTML first.

There is some confusion around the  second, ‘cleaner’ way, which looks a lot like
the DNS prefetching example:

    <link rel="prefetch" href="sprite.png">

This explicitly tells my browser to start prefetching my sprite, regardless of
any decision it might make after evaluating my CSS.

The confusion lies around a seeming disparity between two articles; based on
[this, from MDN](https://developer.mozilla.org/en-US/docs/Link_prefetching_FAQ),
it seems that the prefetch is a hint for browsers to _maybe_ begin prefetching
an asset _if_ it’s idle.  Contrarily, however, is
[this article](http://calendar.perfplanet.com/2012/speed-up-your-site-using-prefetching/)
from Planet Performance which seems to suggest the browser will always prefetch
the assets if it supports `rel="prefetch"` and makes no mention of idle time.
Waterfalls I’ve looked at _seem_ to suggest the latter is true, but an odd
WebKit quirk whereby you can’t observe prefetch in action if you have Developer
Tools open (talk about Schrödinger’s Perf…) means I can’t be 100% sure. Any
clarification on this would be _greatly_ appreciated.

I mentioned that fonts and images work very much the same way; the above rules
apply exactly the same for font-files, but you can’t load a font in a hidden
`<div>` (you’ll need to use the prefetch link).

    <link rel="prefetch" href="webfont.woff">

So basically, what we’re doing here is ‘tricking’ the browser into downloading
an asset ahead of time, so that by the time it does come to applying our CSS, it
already has the resource downloaded (or at least on its way). Nifty!

### Further reading

* [Speed Up Your Site Using Prefetching](http://calendar.perfplanet.com/2012/speed-up-your-site-using-prefetching/)

<h2 id="section:css-and-performance">CSS and performance</h2>

A lot of advice states that, if you _are_ using asset domains, you should serve
all static assets from them; this includes CSS, JS, images etc.

One thing we found at work, though, is that you should _not_ serve CSS from an
asset/subdomain…

Remember earlier, when we discussed how CSS blocks rendering? A browser wants to
get hold of your CSS as soon as it can, if not sooner; CSS is on your
<i>critical path</i>. Your critical path is the necessary journey between a user
requesting your page and then actually seeing something. Because it blocks
rendering, CSS is on the critical path, JS and images aren’t. You want to keep
this journey along the critical path as quick as possible, this means **no DNS
lookups**.

At work, we were building a site whose staging environment served all assets
from the same host (e.g. `foo.com`), but when it came round to making the
staging environment more live-like, we began serving all our assets from
`s1.foo.com` and `s2.foo.com`. This meant all images, JS, CSS, fonts etc were
all coming from different domains, thus incurring DNS lookups. The problem here
is that, from a cold cache, the DNS lookup required to start grabbing the CSS
file was actually slowing the critical path _right down_. Our graphs spiked
massively, indicating a delay that in theory shouldn’t have happened; best
practice dictates that you should shard lots of assets over subdomains, right?
**Not CSS.** The DNS lookup required took up a substantial amount of time which
delayed rendering of the page.

CSS is one of performance’s worst enemies, [as outlined by Stoyan Stefanov](http://www.phpied.com/css-and-the-critical-path/),
because of this rendering blockage. It’s also worth noting that a browser will
download _all_ CSS before it will begin rendering your page. This means that
your `print.css` _will_ be requested even if the browser is only rendering a
page on screen. It means that any stylesheets that are only used based on a
media query (e.g. `<link rel="stylesheet" media="screen and (min-device-width: 800px)" href="desktop.css">`)
will still be downloaded even if they aren’t needed.

That said, I have been informed by [Andy Davies](http://twitter.com/andydavies)
that WebKit actually prioritises its CSS download order so that only CSS needed
to _initially_ render the page comes first, and other styles, e.g. `print.css`
are deferred until as late as possible. Awesome!

Knowing this about CSS allows us to make a few decisions, all based around the
knowledge that CSS blocks rendering, is _all_ requested, and is on your
critical path:

* **Never serve it from a static/asset domain** because this can incur DNS
  lookups that further delay rendering.
* **Serve it early** so the browser can get on with things.
* **Concatenate it.** Because a browser will fetch all CSS anyway, you’re better
  off squishing it all into the same HTTP request.
* **Gzip and minify it** so that the browser has less to download.
* **Cache the hell out of it** so that the whole process above happens as
  infrequently as possible.

CSS is on your critical path so you need to get shut of it early, it blocks
rendering, meaning slow experiences for your users. **Moving CSS to a subdomain
killed our performance.**

### Further reading

* [CSS and the critial path](http://www.phpied.com/css-and-the-critical-path/)

<h2 id="section:gzipping-and-minifying">Gzipping and minifying</h2>

These are two really simple things you can (and should) be doing with your text
assets; minifying them to remove any comments and whitespace, and gzipping them
to compress them down further.

If you were to pick one over the other, gzip alone is more effective than
minification alone.  However, you should really do both, if you can.

Turning gzip on _usually_ requires a little `.htaccess` trickery, but as my good
friend [Nick Payne](http://twitter.com/makeusabrew) points out, `.htaccess` is
actually not particularly performant from a server-side perspective; `.htaccess` is
evaluated on _every_ incoming request, so it’s actually a lot of overhead.

This, taken from [the Apache docs](http://httpd.apache.org/docs/2.2/howto/htaccess.html):

> You should avoid using `.htaccess` files completely if you have access to httpd
> main server config file. Using `.htaccess` files slows down your Apache http
> server. Any directive that you can include in a `.htaccess` file is better set
> in a [`Directory`](http://httpd.apache.org/docs/2.2/mod/core.html#directory)
> block, as it will have the same effect with better performance.

If you do only have access to `.htaccess` then I wouldn’t worry; the cost of
this overhead _usually_ won’t be a concern. Enabling gzip with `.htaccess` is
actually really simple to implement. Minification isn’t necessarily so easy
unless you have a build process, or use something like CodeKit or a preprocessor
which compiles straight to minified output.

Interestingly, the main reason I moved [inuit.css](http://inuitcss.com) over to
Sass was – initially – so I could conveniently compile a minified version.

Minification, for the most part, simply removes whitespace and comments; if you
write as many comments in your code as I do then you really do want to minify
your assets.

Gzip, like any compression algorithm, takes any _text based_ source and
compresses it based on repeated/repeatable strings. Most code compresses really
well via gzip as there’s a tendency for all code to have repeated strings in;
e.g. `background-image` over and over in CSS, `<strong>` over and over in markup…

Gzip _really_ squishes the size of your assets massively, and you should
definitely enable it. For a decent `.htaccess` snippet, check out how
[the HTML5 Boilerplate handles stuff](https://github.com/h5bp/html5-boilerplate/blob/dac15682b35ad69f519205e1b82694d0cab189ca/.htaccess#L153).

Compressing your content makes a _gigantic_ saving. At the time of writing,
inuit.css weighs in at 77 kilobytes. Compressed and gzipped it weighs just
**5.52** kilobytes. **Minify and gzip give us a 93% saving.** And, because gzip
works well on text-based assets, you can even gzip SVGs and even some font file
formats!

<h2 id="section:optimising-images">Optimising images</h2>

I’m not overly knowledgable in the art of optimising images other than running
them through an optimisation tool, but dealing with images themselves,
post-processing, is a pretty interesting topic.

<h3 id="section:spriting">Spriting</h3>

Sprites are pretty much mandatory if you want a performant site; load one larger
image over one HTTP request instead of several images over several requests. The
problem is, however, that not all images are immediately spriteable; you might
have an icon that needs to be the background image on a fluid-width element, but
you clearly can’t sprite this as sprites don’t work on non-fixed-dimension
elements. You could always just put a lot of whitespace around the image in the
sprite sheet, but [wasted pixel in sprites are a performance concern of their own](http://blog.vlad1.com/2009/06/22/to-sprite-or-not-to-sprite/).

In order to combat the unspriteability of certain elements, we need what is known
as a ‘spriting element’. This is basically an empty element, usually an `<i>`,
whose sole job it is to remain empty and just carry a background image.

I used these when I built [Sky Bet](http://www.skybet.com/), YouTube use them,
Facebook use them, [Jonathan Snook](http://twitter.com/snookca) has [an entire
section on them in SMACSS](http://smacss.com/book/icon-module).

The basic premise is that, if you can’t sprite an element because it’s fluid,
you place an empty element inside it that you _can_ fix the dimensions of that
you then _can_ sprite up, for example:

    <li>
        <a href="/profile/">
            <i class="icon  icon--person"></i> Profile
        </a>
    </li>

Here we can’t sprite the `<li>` or the `<a>` so we have an empty `<i>` in there
which carries the icon instead. _This_ is one of the things I love most about
performance; you’re combining clever techniques to improve page speeds whilst
also using traditionally ‘bad’ markup. Lovely stuff!

#### Further reading

* [To Sprite Or Not To Sprite](http://blog.vlad1.com/2009/06/22/to-sprite-or-not-to-sprite/)

<h3 id="section:retina-images">Retina images</h3>

You don’t need to retina _everything_. A 2x image contains **four times** the
amount of pixels as the same image in standard resolution. Four. Times. Whilst
this doesn’t necessarily mean four times the file size over the wire – thanks to
the image’s own encoding – this does mean that once the image is decompressed
for rendering in the browser, there _are_ four times the usual amount of pixels
that need storing in memory.

If we stop and think; retina images are most frequently (although not always)
needed to provide a crisper UI to phones. Phones have much less memory than most
other devices.  Retina serves memory-hogging images to devices that aren’t known
for having copious amounts of memory… Think twice about whether you really need
retina images across the board, or can you make sensible compromises?

Retina is great for a nice, sharp experience, but there’s no point in a crisp
experience if it takes five seconds to download. In most cases speed should win
over aesthetics.

You can be clever and serve 1.5x images to all devices, in a bid to provide
good-enough images to everyone, but the best option would – in my opinion – to
only use retina sparingly.

If your stats are forgiving enough, you could perhaps opt for SVGs or an icon
font instead of bitmap images. I use SVG on CSS Wizardry which gives me the
benefits of:

* Resolution independent
* Minifiable
* Gzippable

At work [Matt Allen](http://twitter.com/sdmix) made us an icon font which can
be used with your spriting element to provide retina-ready, scalable icons.

You could also look to use services like [ReSRC.it](http://resrc.it) to load
images depending on the device and its context.

<h3 id="section:progressive-jpgs">Progressive JPGs</h3>

One interesting aspect of performance is <i>perceived</i> performance; not
necessarily what your numbers tell you, but how fast a site _feels_.

When displaying large, JPG images, you’re probably more than familiar with its
jerky loading; a hundred pixels of the image, pause, another fifty, pause, in
jump another two hundred pixels then **bam**, the whole image loads.

This is the traditional <i>baseline</i> JPG at work, a very jerky experience
indeed. By switching over to progressive JPGs you can make them load in a much
nicer fashion; their first appearance is of the whole image, but very pixellated,
then it slowly comes into focus. This sounds worse than the previous method but
it _feels_ faster; the user has something to look at instantly and the quality
of the image progressively improves. These images are _typically_ a tad larger
than their baseline counterparts, but make the overall experience feel a _lot_
faster.

To enable progressive JPGs you simply need to check the relevant box when saving
for web and devices in Photoshop; job done!

#### Further reading

* [Progressive jpegs: a new best practice](http://calendar.perfplanet.com/2012/progressive-jpegs-a-new-best-practice/).

<h3 id="section:use-no-images-at-all">Use no images at all</h3>

Better than spriting, and SVGs, and avoiding retina, is to avoid images
altogether. If you can 100% replicate a design using an image, but 75% replicate
it using pure CSS, then prefer the pure CSS solution (provided it doesn’t result
in 100 more lines of code, of course!). Avoiding images means potentially
avoiding HTTP requests, but also aids maintenance. If you can avoid using images
then try and do so.

---

## Summary

So there we have a shed load of (but still _just a few_) things you can do to
exploit the browser and make your front-ends even faster. Knowing a few things
about how browsers work can really allow us to manipulate it further and make
our front-ends _even_ faster.

If you have any additions – or indeed disagreements or corrections – then please
do join [the discussion over on Branch](http://branch.com/b/front-end-performance-for-web-designers-and-front-end-devs);
this whole world of perf is still relatively new to me so I’m keen to keep
learning from others, and push things even further.

I really hope that wall of text managed to enlighten you in at least some way,
and that you came away with some new knowledge of things you’d perhaps never
thought about. I also hope that, if you weren’t already, this article has helped
to get you at least _half_ as interested in performance as I have found myself.

I would like to explicitly thank [Nick Payne](http://twitter.com/makeusabrew)
and [Andy Davies](http://twitter.com/andydavies) for their help clearing a few
things up in the writing of this article; cheers guys!

<h2 id="section:further-reading">Further reading</h2>

If you enjoyed that, and want to know more, I can’t recommend the following
enough:

* Souders’ [<cite>High Performance Websites</cite>](http://www.amazon.com/High-Performance-Web-Sites-Essential/dp/0596529309)
  and [<cite>Even Faster Websites</cite>](http://www.amazon.com/Even-Faster-Web-Sites-Performance/dp/0596522304).
* [Stoyan Stefanov](http://www.phpied.com/)’s site.
* [Ilya Grigorik](http://www.igvita.com/)’s site.
* [Andy Davies](http://twitter.com/andydavies).
