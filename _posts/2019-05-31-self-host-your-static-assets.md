---
layout: post
title: "Self-Host Your Static Assets"
date: 2019-05-31 21:10:11
categories: Web Development
meta: "Why is it so much better to self-host your static assets?"
last_modified_at: 2025-01-09
---

One of the quickest wins—and one of the first things I recommend my clients
do—to make websites faster can at first seem counter-intuitive: you should
self-host all of your static assets, forgoing others’ CDNs/infrastructure. In
this short and hopefully very straightforward post, I want to outline the
disadvantages of hosting your static assets ‘off-site’, and the overwhelming
benefits of hosting them on your own origin.

## What Am I Talking About?

It’s not uncommon for developers to link to static assets such as libraries or
plugins that are hosted at a public/CDN URL. A classic example is jQuery, that
we might link to like so:

{% highlight html %}
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
{% endhighlight %}

There are a number of perceived benefits to doing this, but my aim later in this
article is to either debunk these claims, or show how other costs vastly
outweigh them.

* **It’s convenient.** It requires very little effort or brainpower to include
  files like this. Copy and paste a line of HTML and you’re done. Easy.
* **We get access to a CDN.** `code.jquery.com` is served by
  [StackPath](https://www.stackpath.com/products/cdn/), a CDN. By linking to
  assets on this origin, we get CDN-quality delivery, free!
* **Users might already have the file cached.** If `website-a.com` links to
  `https://code.jquery.com/jquery-3.3.1.slim.min.js`, and a user goes from there
  to `website-b.com` who also links to
  `https://code.jquery.com/jquery-3.3.1.slim.min.js`, then the user will already
  have that file in their cache.

## Risk: Slowdowns and Outages

I won’t go into too much detail in this post, because I have a [whole
article](/2017/07/performance-and-resilience-stress-testing-third-parties/)
on the subject of third party resilience and the risks associated with slowdowns
and outages. Suffice to say, if you have any critical assets served by third
party providers, and that provider is suffering slowdowns or, heaven forbid,
outages, it’s pretty bleak news for you. You’re going to suffer, too.

If you have any render-blocking CSS or synchronous JS hosted on third party
domains, go and bring it onto your own infrastructure _right now_. Critical
assets are far too valuable to leave on someone else’s servers.

### <ins datetime="2023-04-27">`code.jquery.com` Outage

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Yikes! It looks like
code.jquery.⁠com is currently suffering an outage. This is going to have
a huge impact across a massive portion of the web. Please please please
SELF-HOST YOUR STATIC ASSETS: <a
href="https://t.co/YWb7ZLdPxc">https://t.co/YWb7ZLdPxc</a> <a
href="https://t.co/2UjFNhrCST">pic.twitter.com/2UjFNhrCST</a></p>&mdash; Harry
Roberts (@csswizardry) <a
href="https://twitter.com/csswizardry/status/1651599057608142849?ref_src=twsrc%5Etfw">27
April, 2023</a></blockquote>

<script src="https://platform.twitter.com/widgets.js" defer></script>

## Risk: Service Shutdowns

A far less common occurrence, but what happens if a provider decides they need
to shut down the service? This is exactly what [Rawgit](https://rawgit.com) did
in October 2018, yet (at the time of writing) a crude GitHub code search still
yielded [over a million
references](https://github.com/search?q=rawgit&type=Code) to the now-sunset
service, and almost 20,000 live sites are still linking to it!

<figure>
<img src="/wp-content/uploads/2019/05/big-query-rawgit.jpg" alt="" loading="lazy" />
<figcaption>Many thanks to <a href="https://twitter.com/paulcalvano">Paul
Calvano</a> who very kindly <a
href="https://bigquery.cloud.google.com/savedquery/226352634162:7c27aa5bac804a6687f58db792c021ee">queried
the HTTPArchive</a> for me.</figcaption>
</figure>

## Risk: Security Vulnerabilities

Another thing to take into consideration is the simple question of trust. If
we’re bringing content from external sources onto our page, we have to hope that
the assets that arrive are the ones we were expecting them to be, and that
they’re doing only what we expected them to do.

Imagine the damage that would be caused if someone managed to take control of
a provider such as `code.jquery.com` and began serving compromised or malicious
payloads. It doesn’t bear thinking about!

### Mitigation: Subresource Integrity

To the credit of all of the providers referenced so far in this article, they do
all make use of [Subresource
Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity)
(SRI). SRI is a mechanism by which the provider supplies a hash (technically,
a hash that is then Base64 encoded) of the exact file that you both expect and
intend to use. The browser can then check that the file you received is indeed
the one you requested.

{% highlight html %}
<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
        integrity="sha256-pasqAKBDmFT4eHoN2ndd6lN370kFiGUFyTiUHWhU7k8="
        crossorigin="anonymous"></script>
{% endhighlight %}

Again, if you absolutely must link to an externally hosted static asset, make
sure it’s SRI-enabled. You can add SRI yourself using [this handy
generator](https://www.srihash.org/).

## Penalty: Network Negotiation

One of the biggest and most immediate penalties we pay is the cost of opening
new TCP connections. Every new origin we need to visit needs a connection
opening, and that can be very costly: DNS resolution, TCP handshakes, and TLS
negotiation all add up, and the story gets worse the higher the latency of the
connection is.

I’m going to use an example taken straight from Bootstrap’s own [Getting
Started](https://getbootstrap.com/docs/4.3/getting-started/introduction/). They
instruct users to include these following four files:

{% highlight html %}
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="..." crossorigin="anonymous">
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="..." crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="..." crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="..." crossorigin="anonymous"></script>
{% endhighlight %}

These four files are hosted across three different origins, so we’re going to
need to open three TCP connections. How much does that cost?

Well, on a reasonably fast connection, hosting these static assets off-site is
311ms, or 1.65×, slower than hosting them ourselves.

<figure>
<img src="/wp-content/uploads/2019/05/wpt-off-site-cable.png" alt="" loading="lazy" />
<figcaption>By linking to three different origins in order to serve static
assets, we cumulatively lose a needless 805ms to network negotiation. <a
href="https://www.webpagetest.org/result/190531_FY_618f9076491312ef625cf2b1a51167ae/3/details/">Full
test.</a></figcaption>
</figure>

Okay, so not exactly terrifying, but Trainline, a client of mine, found that by
reducing latency by 300ms, [customers spent an extra £8m
a year](https://wpostats.com/2016/05/04/trainline-spending.html). This is
a pretty quick way to make eight mill.

<figure>
<img src="/wp-content/uploads/2019/05/wpt-self-hosted-cable.png" alt="" loading="lazy" />
<figcaption>By simply moving our assets onto the host domain, we completely
remove any extra connection overhead. <a
href="https://www.webpagetest.org/result/190531_FX_f7d7b8ae511b02aabc7fa0bbef0e37bc/3/details/">Full
test.</a></figcaption>
</figure>

On a slower, higher-latency connection, the story is much, much worse. Over 3G,
the externally-hosted version comes in at an eye-watering **1.765s slower**.
I thought this was meant to make our site faster?!

<figure>
<img src="/wp-content/uploads/2019/05/wpt-off-site-3g.png" alt="" loading="lazy" />
<figcaption>On a high latency connection, network overhead totals a whopping
5.037s. All completely avoidable. <a
href="https://www.webpagetest.org/result/190531_XE_a95eebddd2346f8bb572cecf4a8dae68/3/details/">Full
test.</a></figcaption>
</figure>

Moving the assets onto our own infrastructure brings load times down from around
5.4s to just 3.6s.

<figure>
<img src="/wp-content/uploads/2019/05/wpt-self-hosted-3g.png" alt="" loading="lazy" />
<figcaption>By self-hosting our static assets, we don’t need to open any more
connections. <a
href="https://www.webpagetest.org/result/190531_ZF_4d76740567ec1eba1e6ec67acfd57627/1/details/">Full
test.</a></figcaption>
</figure>

If this isn’t already a compelling enough reason to self-host your static
assets, I’m not sure what is!

### Mitigation: `preconnect`

Naturally, my whole point here is that you should not host any static assets
off-site if you’re otherwise able to self-host them. However, if your hands are
somehow tied, then you can use [a `preconnect` Resource
Hint](https://speakerdeck.com/csswizardry/more-than-you-ever-wanted-to-know-about-resource-hints?slide=28)
to preemptively open a TCP connection to the specified origin(s):

{% highlight html %}
<head>

  ...

  <link rel="preconnect" href="https://code.jquery.com" />

  ...

</head>
{% endhighlight %}

For bonus points, deploying these as [HTTP
headers](https://andydavies.me/blog/2019/03/22/improving-perceived-performance-with-a-link-rel-equals-preconnect-http-header/)
will be even faster.

**N.B.** Even if you do implement `preconnect`, you’re still only going to make
a small dent in your lost time: you still need to open the relevant connections,
and, especially on high latency connections, it’s unlikely that you’re ever
going to fully pay off the overhead upfront.

## Penalty: Loss of Prioritisation

The second penalty comes in the form of a protocol-level optimisation that we
miss out on the moment we split content across domains. If you’re running over
HTTP/2—which, by now, you should be—you get access to prioritisation. All
streams (ergo, resources) within the same TCP connection carry a priority, and
the browser and server work in tandem to build a dependency tree of all of these
prioritised streams so that we can return critical assets sooner, and perhaps
delay the delivery of less important ones.

<small>To fully understand the benefits of prioritisation, [Pat Meenan’s
post](https://calendar.perfplanet.com/2018/http2-prioritization/) on the topic
serves as a good primer.</small>

<small>**N.B.** Technically, owing to H/2’s [connection
coalescence](https://daniel.haxx.se/blog/2016/08/18/http2-connection-coalescing/),
requests can be prioritised against each other over different domains as long as
they share the same IP address.</small>

If we split our assets across multiple domains, we have to open up several
unique TCP connections. We cannot cross-reference any of the priorities within
these connections, so we lose the ability to deliver assets in a considered and
well designed manner.

Compare the two HTTP/2 dependency trees for both the off-site and self-hosted
versions respectively:

<figure>
<img src="/wp-content/uploads/2019/05/wpt-dep-tree-off-site.png" alt="" loading="lazy" />
<figcaption>Notice how we need to build new dependency trees per
origin? Stream IDs 1 and 3 keep reoccurring.</figcaption>
</figure>

<figure>
<img src="/wp-content/uploads/2019/05/wpt-dep-tree-self-hosted.png" alt="" loading="lazy" />
<figcaption>By hosting all content under the same origin, we can build one, more
complete dependency tree. Every stream has a unique ID as they’re all in the
same tree.</figcaption>
</figure>

<small>Fun fact: Stream IDs with an odd number were initiated by the client;
those with an even number were initiated by the server. I honestly don’t think
I’ve ever seen an even-numbered ID in the wild.</small>

If we serve as much content as possible from one domain, we can let H/2 do its
thing and prioritise assets more completely in the hopes of better-timed
responses.

## Penalty: Caching

By and large, static asset hosts seem to do pretty well at establishing
long-lived `max-age` directives. This makes sense, as static assets at versioned
URLs (as above) will never change. This makes it very safe and sensible to
enforce a reasonably aggressive cache policy.

That said, this isn’t always the case, and by self-hosting your assets you can
design [much more bespoke caching
strategies](/2019/03/cache-control-for-civilians/).

## Myth: Cross-Domain Caching

A more interesting take is the power of cross-domain caching of assets. That is
to say, if lots and lots of sites link to the same CDN-hosted version of, say,
jQuery, then surely users are likely to already have that exact file on their
machine already? Kinda like peer-to-peer resource sharing. This is one of the
most common arguments I hear in favour of using a third-party static asset
provider.

Unfortunately, there seems to be no published evidence that backs up these
claims: there is nothing to suggest that this is indeed the case. Conversely,
[recent
research](https://discuss.httparchive.org/t/analyzing-resource-age-by-content-type/1659)
by [Paul Calvano](https://twitter.com/paulcalvano) hints that the opposite might
be the case:

> There is a significant gap in the 1st vs 3rd party resource age of CSS and web
> fonts. 95% of first party fonts are older than 1 week compared to 50% of 3rd
> party fonts which are less than 1 week old! This makes a strong case for self
> hosting web fonts!

In general, third party content seems to be less-well cached than first party
content.

Even more importantly, [Safari has completely disabled this
feature](https://andydavies.me/blog/2018/09/06/safari-caching-and-3rd-party-resources/)
for fear of abuse where privacy is concerned, so the shared cache technique
cannot work for, at the time of writing, [16% of users
worldwide](http://gs.statcounter.com/).

In short, although nice in theory, there is no evidence that cross-domain
caching is in any way effective.

### <ins>Update: 2025-01-09</ins>

<ins>Chrome 86 (2020) and Firefox 85 (2021) also both enabled cache
partitioning, meaning no major browser stands to gain any performance benefit
from shared assets hosting. <strong>Self-host your static assets.</strong></ins>

## Myth: Access to a CDN

Another commonly touted benefit of using a static asset provider is that they’re
likely to be running beefy infrastructure with CDN capabilities: globally
distributed, scalable, low-latency, high availability.

While this is absolutely true, if you care about performance, you should be
running your own content from a CDN already. With the price of modern hosting
solutions being what they are (this site is fronted by Cloudflare which is
free), there’s very little excuse for not serving your own assets from one.

Put another way: if you think you need a CDN for your jQuery, you’ll need a CDN
for everything. Go and get one.

## Self-Host Your Static Assets

There really is very little reason to leave your static assets on anyone else’s
infrastructure. The perceived benefits are often a myth, and even if they
weren’t, the trade-offs simply aren’t worth it. Loading assets from multiple
origins is demonstrably slower. Take ten minutes over the next few days to audit
your projects, and fetch any off-site static assets under your own control.
