---
layout: post
title: "Cache Grab: How Much Are You Leaving on the Table?"
date: 2024-08-19 13:17:11
categories: Web Development
main: "https://csswizardry.com/wp-content/uploads/2024/08/devtools.png"
meta: "Quantifying the importance of caching just got a lot easier"
---

For the longest time now, I have been _obsessed_ with caching. I think every
developer of any discipline would agree that caching is important, but I do tend
to find that, particularly with web developers, gaps in knowledge leave a lot of
opportunities for optimisation on the table. How does it affect you?

<div class="c-highlight  mb">

<p>Want to know everything (and more) about HTTP cache? <a
href="https://slideslive.com/39021005/cache-rules-everything">Check out my
recent talk at WebExpo.</a></p>

</div>

## Navigation Information

The CrUX Report has begun including [navigation
information](https://developer.chrome.com/blog/crux-navigation-types) which
tells you _how_ people visited your pages: did they land afresh? Reload the
page? Arrive via the back button? This new data not only gives us insights as to
how people visit and traverse our websites, but also offers up opportunities for
optimisation.

The possible navigation types are:

* **Navigate:** A hard navigation that resulted in an HTML page being fetched
  from the network.
* **Cache:** An HTML response returned from the HTTP cache.
* **Back–Forward:** A navigation incurred by hitting the back or forward button.
* **bfcache:** A navigation incurred by hitting back or forward button that was
  served by the browser’s [back/forward cache](https://web.dev/articles/bfcache)
  (bfcache).
* **Reload:** A user reloaded the page.
* **Restore:** The page was restored either as the result of a crash, a browser
  restart, or the page had previously been unloaded by the browser due to memory
  constraints, etc.
* **Prerender:** The page was prerendered, usually as a result of the new
  [Speculation Rules
  API](https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API).

An important thing to note is that each of these navigation types are exclusive:
a bfcache hit will have been triggered by someone hitting their back button, but
does not also get counted in the Back–Forward navigation type.



<small><strong>N.B.</strong> As with all CrUX data, this only applies to hard
navigations—SPAs are not very well represented in the report.</small>

## Insights

We can infer a lot from the data. Some of it is pretty matter-of-fact whereas
other aspects depend a little on how you view them—you’d probably want to
cross-reference a few statistics with other analytics tools to check whether an
inefficiency has been highlighted. Let’s take a look at the BBC as an example.

<figure>
<img src="{{ site.cloudinary }}/wp-content/uploads/2024/08/bbc.png" alt="" width="1200" height="662">
<figcaption><a href="https://treo.sh/sitespeed/www.bbc.co.uk">Treo</a>’s free <i>Sitespeed</i> tool is a great way to view origin-level Core Web Vitals data.</figcaption>
</figure>

### Navigate

**70% of page views are _Navigations_**, which means a user landed on them via
a hard navigation and the file was fetched from the network. This is what we
imagine most cold-start page views to look like by default, and nothing is
particularly out of the ordinary. That said, they are comparably slow, so can we
move some of these page views elsewhere?

### Cache

Only **0.6% of page views came from _Cache_**. This isn’t a bad thing
in-and-of itself, but let’s consider two competing points:

1. **If a lot of navigations are from cache, our caching strategy must be pretty
   good!** I’m of the opinion that almost all responses can be cached for at
   least a little but, so serving absolutely zero files from cache would be
   cause for concern. Are we leaving opportunities on the table here?
2. **If a lot of navigations are from cache, why are users hitting the same
   pages over and over again?** The only way a file can be served from browser
   cache is if it’s been visited before, and a high percentage of _Cache_
   navigation types would indicate that people are revisiting the same URLs(s)
   repeatedly. Does this match behaviour you would expect of your user base? Or
   does this potentially point at holes in your IA?

I would consider this entry in context of your own project to determine what
issues it highlights. Sites where we would expect users to hit the same URL
multiple times would benefit from moving more navigations into this bucket;
sites that would not expect to see many repeat page views might have other
problems.

### Back–Forward

**5.4% of navigations are from hitting the _back or forward_ button** but couldn’t
be served from the bfcache specifically. Remember, these buckets are mutually
exclusive. These navigations were triggered by a user hitting their browser
controls, but we don’t know if the response itself came from the network or
cache. What we do know is that they didn’t come from bfcache, and this is one of
the first opportunities for improvement we’ll find—we want to move as many of
the _Back–Forward_ navigations into the _bfcache_ bucket as possible. So, a high
number of _Back–Forward_ navigations tell us a lot about how users traverse our
site, and also that we aren’t serving these navigation types as quickly as we
perhaps could.

### bfcache

**13.7% of navigations are _bfcache_.** This is promising. We’d always prefer
this number to be larger than _Back–Forward_, because bfcache navigations are
triggered the same way, only served faster. [bfcache is
better.](https://web.dev/articles/bfcache) Again, these navigation types are
exclusive, so URLs that enter the bfcache bucket will not also be counted in
Back–Forward. Ideally, we’d move all of the entries from _Back–Forward_ into
_bfcache_ by fixing any issues that prevent the back/forward cache from being
used.

The **71.7%** figure listed is a nice touch from Treo, and it shows us that of
all navigation-types initiated by the back or forward buttons, how many were of
the much faster _bfcache_ variant? This is your hit-rate, and we can see that
the BBC serve the majority of it’s back/forward button page views from the
back/forward cache. The figure is determined by:

`hit rate = bfcache / (bfcache + back–forward)`, or:

`13.7 / (13.7 + 5.4) = 0.717277487`

The reason the bfcache is so much faster is that, where traditional back/forward
navigations should hopefully retrieve most of their (sub)resources from HTTP
cache, the bfcache restores pages from memory—near-instant page loads! I’d
recommend [reading up on bfcache](https://web.dev/articles/bfcache) and how to
gain access to it.

As it stands, the BBC serves more of its back/forward initiated navigations via
the much faster bfcache—this is a good thing, but there is still the remaining
28% that could be fixed.

### Reload

**7.5% of navigations are _Reloads_.** Again, this would need viewing in
context. A lot of reloads could be the symptom of broken-looking sites or sites
where content has failed to load. Or, it could be quite typical of your site in
general—let’s say you provide breaking news, or live flight status, or you’re
Hacker News. It may well be a site that expects to have users refreshing pages,
which might therefore mean there no cause for concern. If this isn’t what you’d
expect, I would try to cross reference this behaviour with in-browser error
tracking, etc.

### Restore

**0.2% or page views are a _Restore_.** These are navigations that are initiated
by either a browser restart, or a tab being restored after previously having
been unloaded for memory-preservation reasons. Again, this information is less
performance-facing and might point to other issues with your site, so cross
reference this data with other sources of user behaviour.

<small>Chrome for Android does not currently emit <i>Restore</i> navigation
types and instead <a href="https://issues.chromium.org/issues/40268039">includes
them in the previous <i>Reload</i> type</a>.</small>

### Prerender

Finally, we see that **2.5% of navigations are _Prerender_.** These are among
the more interesting navigation types for the performance engineer and, as with
bfcache, prerendered pages provide near-instant page loads. Prerendered pages
are navigations that have been preemptively fetched and assembled and are
completed, ideally, before a user actually requests them.

The most current mechanism for prerendering URLs is the [Speculation Rules
API](https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API),
a declarative way to instruct supporting browsers to fetch certain responses
ahead of time. We could opt to `prefetch` responses, or go in with the much more
fuller-featured `prerender`:

* **`prefetch`:** This simply fetches the URL in question and drops it into the
  HTTP cache. None of the target URL’s subresources are fetched, and no
  processing of the response is done. `prefetch` is much more light-touch than…
* **`prerender`:** This will fetch the target URL and its subresources, as well
  as parse and render the resulting page, and process timers, scripts, etc.
  `prerender` is much more intensive.

Both of these are faster than doing nothing at all, but they do have drawbacks.
These include, but are not limited, to increased and potentially wasted resource
usage on both the server and the client as more requests are made than a user
might utilise, and, if also `prerender`ing, more pages are being constructed
than may potentially be viewed. While `prefetch` is generally safer than
`prerender`, it’s vital that you fully understand the implications of both.

On this page right now, I use the new Speculation Rules API to `prerender` the
previous and next articles that are available via the pagination component:

```html
{% raw %}<script type=speculationrules>
  {
    "prerender": [
      {
        "urls": [
          {% if page.next.url %}
            "{{ page.next.url }}",
          {% endif %}
          {% if page.previous.url %}
            "{{ page.previous.url }}"
          {% endif %}
        ]
      }
    ]
  }
</script>{% endraw %}
```

I could also extend this to `prefetch` the documents at the end of any links
I hover:

```html
<script type=speculationrules>
  {
    ...
    "prefetch": [
      {
        "source": "document",
        "where": {
          "selector_matches": "a[href]"
         },
         "eagerness": "moderate"
      }
    ]
  }
</script>
```

Be sure to read [the
documentation](https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API)
and [Chrome’s own
announcement](https://developer.chrome.com/docs/web-platform/prerender-pages) to
see what configuration and options we have available, as well as important
considerations for safe implementation.

#### Debugging Prerenders

There are a number of different tools for debugging and observing Speculative
Loads. Firstly, the _Speculative loads_ section in Chrome’s DevTools is likely
to be the most useful when working locally to create your Speculation Rules:

<figure>
<img src="{{ site.cloudinary }}/wp-content/uploads/2024/08/devtools.png" alt="" width="750" height="433">
<figcaption>Chrome’s Speculative loads section tells you about documents that
loaded or were loaded by any currently active Speculation Rules.</figcaption>
</figure>

Secondly, any requests made as the result of either a `prefetch` or
a `prerender` would carry the following request headers _respectively_:

```
Sec-Purpose: prefetch
```

Or:

```
Sec-Purpose: prefetch;prerender
```

<figure>
<img src="{{ site.cloudinary }}/wp-content/uploads/2024/08/headers.png" alt="" width="750" height="434">
<figcaption>The <code>Sec-Purpose</code> header shows why a file was requested.</figcaption>
</figure>

You could use your own logs to determine how many `prefetch` or `prerender`
requests you received, but this wouldn’t tell you how many `prefetch`ed or
`prerender`ed pages were actually served to your visitors. CrUX and/or custom
monitoring would be needed for that.

## How Far Can We Take This?

If you really want to see someone overachieve in this space, check out [Tim
Vereecke](https://x.com/timvereecke)’s
[Scalemates](https://www.scalemates.com/):

<figure>
  <img src="{{ site.cloudinary }}/wp-content/uploads/2024/08/scalemates.png"
       alt="CrUX navigation data for scalemates.com" width="750" height="671">
  <figcaption>Stunning numbers!</figcaption>
</figure>

A third of navigations prerendered and almost a fifth from cache! 83% of all
back/forward-type navigations were restored from the much faster bfcache. Just
over half of Tim’s page views were served near-instantly.

## Key Takeaway

From the performance engineer’s perspective, what we’d really like to do is
increase the count of _bfcache_ and _Prerender_ navigation types, and if your
site fits the bill, perhaps move a few more URLs into _Cache_ as well. The key
thing to remember is that navigations can only come from cache if a user is
hitting the URL for a subsequent time: this means that they still likely
incurred a relatively expensive _Navigation_ type for their visit, and also
their repeat views might point at other IA-type issues. Having a solid caching
strategy is very important, but it’s equally important to understand how and why
your users have ended up in that situation in the first place.

New web platform APIs can grant near-instant page loads for our users, and they
are relatively trivial to implement. I would encourage all developers to look
where speculative loads fit into their sites, and also how and where users can
be granted access to bfcache navigations when they hit the back or forward
button. These are much cheaper optimisations than we’re commonly told to
implement.
