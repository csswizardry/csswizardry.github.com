---
layout: post
title: Fasetto
permalink: /case-studies/fasetto/
---

I was in charge of assembling a UI team for the marketing- and app-sites for an 
ambitious, transatlantic startup.

## First contact

The client, Fasetto, got in touch with me because they’d heard about me online. 
They knew they wanted a product-centric front-end developer to build a solid, 
scalable UI to last them a long time. We had an initial Skype call where they 
outlined the project, and we decided we’d like to work together. I assembled a 
team of two designers (one UI-focussed and one brand-focussed designer, 
although they both overlap each other’s skillset very nicely), a JS Engineer, 
and Me.

## The project

Performance was never mentioned explicitly—the client never stated that 
performance was a key requirement, and I never told them that I’d be focussing 
on it so intently. As far as I’m concerned, performance isn’t an optional 
extra, it’s a core feature of any product.

The project was broken into two parts: the marketing site (now actually live, 
at https://www.fasetto.com), and the App (not yet live, but that’s a separate 
codebase that will be the actual product that people use).

Me and my girlfriend (Naomi Atkinson) worked very closely on the marketing 
site. She did the product’s rebrand, so it made sense that she led the design 
on the promotional side of things. A guy I used to work with at Sky (Stuart 
Powell) (we should keep him anonymous for now)) led the App design, because his 
background is in product.

We decided that, because of the amount of content we had, the marketing site 
should be a single-pager. This was purely because the site would appear very 
sparse with just really small amounts of content spread across five pages, but 
quite ‘immersive’ if we worked the whole site’s content into a single view. 
Obviously this brought some performance concerns and considerations:
We need to load the entire site’s content in one go. The index.html page was 
actually five pages worth of content now, rather than just one.
Any requests to external JS and CSS would be wasted, as there are no advantages 
to be gained from caching shared files for a one-page website.
We tacked these two issues at various stages of the build, which I’ll cover 
later.

## Design

First up was the actual design. I’m known for being very pragmatic—almost 
brutal—when it comes to trimming and rationalising design( decision)s for 
performance’s sake, so there was a bit of a (metaphorical) clash here: Naomi is 
a brand-led designer, a designer who makes things look great; I’m a developer 
who hates anything superficial that negatively impacts performance. We needed 
to work out a way of working together to keep the site engaging, striking, on 
brand, and fast.

A lot of this stage involved Naomi designing, me seeing where we could trim any 
fat, rinse and repeat. Taking a very objective look at the designs and asking 
‘Do we need this many fonts?’ ‘Does this feature really add anything?’ ‘Can we 
achieve similar design treatments in more performant but slightly different 
ways?’ The client had requested a ‘flat design style’ and interestingly—and 
this is a Medium headline in the making—flat design lends itself very well to 
performance. A few years ago we replaced heavy image-gradients for verbose 
(albeit more performant) CSS ones; now we’re completely replacing gradients 
with solid colours! A lot less CSS is needed when a lot of treatments are just 
simple hex values.

We’d done really well from a design point of view to really balance aesthetics 
and performance; we questioned and scrutinised everything to make sure it 
deserved its place, and that it wasn’t going to slow things down.

## Images

The client asked us to replace a solid green masthead with some large 
conceptual imagery as per Naomi’s brand guidelines (the guidelines state that 
the brand can use certain styles of imagery to reinforce certain moods and 
qualities that Fasetto brings). We were in a position now where we had to 
replace a few bytes of solid-colour CSS background with potentially hundreds of 
kilobytes of image :(

We used a progressive JPG, and Naomi did a great job optimising the image as 
much as possible out of Photoshop to get the size right down before it started 
to look too poor quality. We made use of the Compressive Images technique, and 
finally, we ran the image through Jamie Mason’s ImageOptim-CLI which squeezed 
even more bytes out of it. The masthead still weighs around 100KB, which is a 
real shame, but I don’t think that’s too bad at all, considering its size and 
quality. This is one of those cases where aesthetics trumped performance, but 
we still did as good a job as possible to mitigate the effects. Thankfully, 
images like this are well off the critical path (more on that later) so the 
site is still perfectly usable, even if the image is still downloading.

As well as this background image, and the many different icons we needed, Naomi 
decided to use GIFs to demonstrate (conceptually) how simple Fasetto is to use, 
and the kinds of things it does. We opted for GIFs for these animations for a 
number of reasons:
Naomi already knew how to do these as GIFs. I think that, even though 
performance is very important, it’s also very important to make sure the team 
is working as comfortably as they can, and with tools they’re happy using. 
Performance shouldn’t come at the cost of developer convenience.
CSS animations would have really inflated the size of our CSS, which (as I 
cover later) wants keeping as small as possible. I didn’t want to put 
animations on the critical path when GIFs can load in more progressively.
Naomi did a really great job of limiting the colour palettes of the GIFs so 
that they were fairly flat, meaning they had a lot of continuous solid colour 
that would compress (GIF’s own compression) very well. She also managed to 
strike a really good balance between appearance and file size.

The GIFs are actually surprisingly small; most of them are under 35KB, with one 
outlier at around 90KB.

## Sprites

We made very liberal use of image sprites, using pretty old-school methods of 
manually assembling them. I have a method whereby aligning sprite images to a 
certain set of rules means that the CSS that manipulates them is a lot, lot 
more terse, abstracted, and recyclable. Unfortunately this isn’t something you 
can automate yet.

A look at the site’s sprite-sheet will show you just how much we sprited up: we 
get a lot of visual assets (that make up a lot of the site) over the wire in 
just one request. If you use dev tools to delete the CSS’ reference to the 
sprite, you soon realise just how much of the site’s look-and-feel is tied up 
in it.

We used PNGs for the sprites, but in hindsight we could (should) have probably 
used SVGs. The retina sprite is an extra request which is unfortunately quite 
weighty. If we can get hold of the third party logos (app stores, etc.) in 
vector format, I will look into using SVGs for everything. That would be much 
nicer (and you can gzip SVGs!).

## Code

The site is a simple static HTML page; it requires no server-side work to load 
and serve it. This brings a lot of perf advantages, which is nice.

The site is built upon inuitcss, an open source, Sass based, OOCSS framework of 
mine that is designed with performance, code reuse, and scalability in mind. 
inuitcss makes it very easy to create and recycle UI components with very 
little code overhead; this means highly composable UIs without much code, and a 
lot of the UI comes free-of-charge as it is built upon very low-level 
abstractions.

It is also built around a proprietary architecture of mine, ITCSS. ITCSS stands 
for Inverted Triangle CSS, which is an architecture that produces much, much 
leaner, more terse, more scalable CSS projects. It greatly reduces the amount 
of redundant or unused CSS in a project, and makes the CSS that is there a lot 
more effective (more recyclable, less waste).

As a result, the entire CSS for the marketing site weighs just 5.4KB after 
gzip. When you stop to consider that this is an entire responsive website’s 
worth of CSS, but that we’ve just chosen to display the whole website in one 
page, it’s pretty darn small!

The site uses very little JS, because there just isn’t much need for it. Any JS 
it does need is inlined where possible.

Because the site is just a single-pager, we get no advantage from caching 
external resources (CSS and JS) because we’re never going to reuse them on 
other pages. With this in mind, actually firing off new HTTP requests for 
external files is pretty wasteful. To this end, I decided to inline the CSS and 
JS directly into the HTML page. We get all the site’s code (HTML, CSS, and JS) 
over the wire in just one request.

Once they have been inlined, we minify and uglify the HTML-CSS-JS trio, which 
takes the filesize down even further. Then, on top of that, we gzip all our 
plain text assets, which means that we can serve the entire site’s HTML, CSS, 
and JS in one request that weighs 10.6KB. This is under the magic 14KB that is 
the smallest/worst-case initial packet transfer that can occur over TCP slow 
start. Basically, we can serve the entire site’s code in one packet transfer.

## Critical path

Serving the entire site’s codebase in one request means that our critical path 
is dealt with right away, in one go. As we know, CSS blocks rendering, so we 
need to get it onto the client as soon as we can. By serving up the CSS at the 
same time as the HTML, we’ve instantly achieved this.

I was very careful not to Base64 inline any images into our CSS, as to do so 
would have put images onto the critical path. The beauty of images is that they 
can be loaded progressively, after the page has begun rendering; Base64ing 
these images means that our page cannot begin rendering until the 
CSS-that-contains-images is over the wire. I focused on getting critical assets 
over the wire with as little overhead as possible, whilst letting images (much 
heavier assets) make their way over in their own time.

## Automation and OPS

We’re using Grunt to inline the CSS and JS, and then to minify it all. I still 
get to write my Sass in separate files in its own micro-project, then it’s 
compilation, concatenation, and minification is all automated.

We’re not using any CDN or anything just yet, as we’re not sure we’d need it. 
We only send 16 requests over the wire, so it’s probably not worth 
(potentially) incurring new DNS lookups to other domains when we already have 
the host domain warmed up. If we had more assets that could benefit from better 
parallelisation, then a CDN might be a better idea. Fasetto also operate 
globally, so just having geographically closer boxes would likely bring decent 
benefits.

[[THIS NEEDS FURTHER CLARIFICATION because I don’t fully understand what he’s 
doing.]] The tech guy on the client’s side is actually streaming the text 
content of the page from their servers with a MIME type of html/text, rather 
than storing it in an HTML file on the filesystem. This means that the server 
doesn’t actually have to make a read from the filesystem in order to get the 
file’s contents, meaning it can start sending the content far sooner.

## Result

The previous site was 74 requests, and weighed about 1.6MB. It had a tonne of 
blocking code, as none of the stylesheets or JavaScript were concatenated. This 
mean that there we a few seconds where you saw nothing at all—the old site 
spent more time blocked than it takes to fully load the entirety of the new one.

We totally redesigned and rebuilt the whole thing, and the result is that we 
now load the entire site’s code in one sub-11KB request. The whole site is just 
16 requests, totalling 412KB. Our critical path is handled in one go, and all 
other assets are incredibly well optimised and load in a sensible order and an 
impressive timeframe.

We really worked very hard to ensure that every design and feature addition was 
very well scrutinised and considered, and that anything that did make the final 
cut was very well refined and fast.

Could we get it even faster still? Sure. Would we start hitting diminishing 
returns if we tried to? Probably. I feel we’re at the point where the amount of 
effort it would take to remove further bytes and milliseconds would be a lot 
greater than the benefits it would bring us.

All in all, I’m really pleased that the client allowed us to just get on and do 
our thing. Of course there were interjections, and certain decisions overruled, 
but on the whole we were allowed to be fairly autonomous. I’m really pleased 
that Naomi allowed me to be fairly brutal, and that she was open to a new, 
performance-led way of working. I’m also really pleased I got to work on this 
project in the way I did. I got to make things fast, and that is one of my most 
favouritest things ever in the world.
