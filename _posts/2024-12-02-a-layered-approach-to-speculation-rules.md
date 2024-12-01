---
layout: post
title: "A Layered Approach to Speculation Rules"
date: 2024-12-02 00:01:56
categories: Web Development
main: "/wp-content/uploads/2024/12/speculation-rules-poster.jpg"
meta: "Layering up our Speculation Rules for a more progressive aproach to performance."
---

I’ve always loved doing slightly unconventional and crafty things with simple
web platform features to get every last drop out of them. From building the
[smallest compliant LCP](/2023/09/the-ultimate-lqip-lcp-technique/), [lazily
prefetching CSS](/2019/08/lazy-pre-browsing-with-prefetch/), or using pixel GIFs
to track [non-JS users](/2018/03/measuring-the-hard-to-measure/) and [dead
CSS](/2018/01/finding-dead-css/), I find a lot of fun in making useful things
out of other useful things.

Recently, I’ve been playing similar games with the [Speculation Rules
API](https://developer.chrome.com/docs/web-platform/prerender-pages).

## Speculation Rules

I don’t want to go super in-depth about the [Speculation Rules
API](https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API) in
this post, but the key thing to know is that it provides two speculative loading
types—`prefetch` and `prerender`—which ultimately have the following goals:

* **`prefetch`** pays the next page’s TTFB costs up-front and ahead of time;
* **`prerender`** pays the next page’s TTFB, FCP, and LCP up-front.

It’s going to be very helpful to keep those two truisms in mind—**`prefetch` for
paying down TTFB; `prerender` for LCP**. This makes `prefetch` the lighter of
the two and `prerender` the more resource-intensive.

That’s about all you need to know for the purposes of this article.

## Speculation Rules on `csswizardry.com`

Ever since Speculation Rules became available, I’ve used them in somewhat
uninspired ways on this site:

* to [prerender the latest
  article](https://github.com/csswizardry/csswizardry.github.com/blob/5d36f24be759165bd9f974af17c9826148be9e29/index.html#L43-L58)
  from the homepage:
  ```html
  <script type=speculationrules>
    {
      "prerender": [
        {
          "urls": [ "/2024/12/a-layered-approach-to-speculation-rules/" ]
        }
      ]
    }
  </script>
  ```
* to [prerender the next and previous
  articles](https://github.com/csswizardry/csswizardry.github.com/blob/5d36f24be759165bd9f974af17c9826148be9e29/_layouts/post.html#L155-L173)
  from a page such as this one:
  ```html
  <script type=speculationrules>
    {
      "prerender": [
        {
          "urls": [
              "/2024/12/a-layered-approach-to-speculation-rules/",
              "/2024/11/core-web-vitals-colours/"
          ]
        }
      ]
    }
  </script>
  ```

In this scenario, I am explicitly prerendering named and known URLs, with
a loose idea of a potential and likely user journey—I’m warming up what I think
might be the visitor’s next page.

While these are both functional and beneficial, I wanted to do more. My site,
although not very obviously, has two sides to it: the blog, for folk like you,
and the commercial aspect, for [potential clients](/services/). While steering
people down a fast article-reading path is great, can I do more for visitors
looking around other parts of the site?

With this in mind, I recently expanded my Speculation Rules to:

1. `immediate`ly `prefetch` any internal links on the page, and;
2. `moderate`ly `prerender` any other internal links on hover.

This fairly indiscriminate approach casts a much wider net than listed URLs, and
instead looks out for _any_ internal links on the page:

```html
<script type=speculationrules>
  {
    "prefetch": [
      {
        "where": {
          "href_matches": "/*"
        },
        "eagerness": "immediate"
      }
    ],
    "prerender": [
      {
        "where": {
          "href_matches": "/*"
        },
        "eagerness": "moderate"
      }
    ]
  }
</script>
```

This slightly layered approach allows us to `immediate`ly pay the TTFB cost for
all internal links on the page, and pay the LCP cost for any internal link that
we hover (`moderate`). These are quite broad rules as they apply to any `href`
on the page that matches `/*`—so any root-relative link at all.

This approach works well for me as my site is entirely [statically
generated](https://jekyllrb.com/) and served from
[Cloudflare](https://www.cloudflare.com/)’s edge. I also don’t get masses of
traffic, so the risk of increased server load anywhere is minimal. For sites
with lots of traffic and highly dynamic back-ends (database queries, API calls,
insufficient caching), this approach might be a little too liberal.

## A Multi-Tiered Approach

On a recent client project, I wanted to take the idea further. They have a large
and relatively complex site (many different product lines sitting under one
domain) with lots of traffic and a nontrivial back-end infrastructure. Things
would have to be a little more considered.

### Opt-In Strategy

They’re a Big Site™ so an opt-in approach was the better way to go.
A wildcard-like match would prove far too greedy[^1], and as different pages
contain vastly different amounts of links, the additional overhead was difficult
to predict on a site-wide scale.

Arguably the easiest way to opt into Speculations is with a selector. For
example, we could use classes:

```html
<a href class=prefetch>Prefetched Link</a>
<a href class=prerender>Prerendered Link</a>
```

And the corresponding Speculation Rules:

```html
<script type=speculationrules>
  {
    "prefetch": [
      {
        "where": {
          "selector_matches": ".prefetch"
        },
        ...
      }
    ],
    "prerender": [
      {
        "where": {
          "selector_matches": ".prerender"
        },
        ...
      }
    ]
  }
</script>
```

<small><strong>N.B.</strong> As `prerender` already includes the `prefetch`
phase, you’d never need both `class="prefetch prerender"`; one or the other is
sufficient.</small>

However, I’m fond of the self-fulfillingness of this pattern:

```html
<a href data-prefetch>Prefetched Link</a>
<a href data-prefetch=prerender>Prerendered Link</a>
```

And their respective Speculation Rules:

```html
<script type=speculationrules>
  {
    "prefetch": [
      {
        "where": {
          "selector_matches": "[data-prefetch]"
        },
        ...
      }
    ],
    "prerender": [
      {
        "where": {
          "selector_matches": "[data-prefetch=prerender]"
        },
        ...
      }
    ]
  }
</script>
```

It keeps all logic contained in a `data-prefetch` attribute, and the redundancy
of `data-prefetch=prerender` matching both is, by definition, a non-issue (in
much the same way [`dns-prefetch` and `preconnect` get along just
fine](https://speakerdeck.com/csswizardry/more-than-you-ever-wanted-to-know-about-resource-hints?slide=40)
despite the overlap in their Venn diagram).

### Layering Up

With this simple opt-in mechanism in place, I wanted to look at ways to subtly
and effectively layer this up to add further disclosed functionality without any
additional configuration. What could I do to _really_ maximise the benefit of
Speculation Rules with just these two attributes?

My thinking was that if we’re explicitly marking `data-prefetch` and
`data-prefetch=prerender`, could we upgrade the former to the later on-demand?
When the page loads, the browser immediately fulfils its prefetches and
prerenders, but when someone hovers a prefetched link, expand it to a full
prerender?

Easy.

And then, for good measure, can we upgrade any other internal link from nothing
to prefetch on demand?

Also easy!

Working from most- to least-aggressive, and keeping in mind our two truisms, the
best way to think about what we’re achieving is that we:

0. **immediately pay LCP** costs for any link we’ve opted into:
   ```json
   "prerender": [
     {
       "where": {
         "selector_matches": "[data-prefetch=prerender]"
       },
       "eagerness": "immediate"
     },
     ...
   ]
   ```
0. **immediately pay TTFB** costs for any link we’ve opted into:
   ```json
   "prefetch": [
     {
       "where": {
         "selector_matches": "[data-prefetch]"
       },
       "eagerness": "immediate"
     },
     ...
   ],
   ```
0. **on demand, pay LCP** costs for any link we’ve already paid TTFB costs for:
   ```json
   "prerender": [
     ...
     {
       "where": {
         "selector_matches": "[data-prefetch]"
       },
       "eagerness": "moderate"
     }
   ]
   ```
0. **on demand, pay TTFB** costs for any other internal links:
   ```json
   "prefetch": [
     ...
     {
       "where": {
         "href_matches": "/*"
       },
       "eagerness": "moderate"
     }
   ],
   ```

Now, the client has the ability to prerender highly likely or encouraged
navigations with the `data-prefetch=prerender` attributes (e.g. on their
top-level navigation or their homepage calls-to-action).

Things that are less likely but still reasonable candidates for warm-up (e.g.
items in the sub-navigation) can simply carry `data-prefetch`.

Everything else would just be a bare `<a href>`, and all links (except the
already-maxed out `data-prefetch=prerender`) get upgraded to the next category
on demand.

Putting them all together in the format and order required, our Speculation
Rules look like this:

```html
<script type=speculationrules>
  {
    "prefetch": [
      {
        "where": {
          "selector_matches": "[data-prefetch]"
        },
        "eagerness": "immediate"
      },
      {
        "where": {
          "href_matches": "/*"
        },
        "eagerness": "moderate"
      }
    ],
    "prerender": [
      {
        "where": {
          "selector_matches": "[data-prefetch=prerender]"
        },
        "eagerness": "immediate"
      },
      {
        "where": {
          "selector_matches": "[data-prefetch]"
        },
        "eagerness": "moderate"
      }
    ]
  }
</script>
```

We could apply these against this example page:

```html
<ul class=c-nav>

  <li class=c-nav__main>
    <a href=/ data-prefetch=prerender>Home</a>
  </li>

  <li class=c-nav__main>

    <a href=/about/ data-prefetch=prerender>About</a>

    <ul class=c-nav__sub>
      <li>
        <a href=/about/history/ data-prefetch>Company History</a>
      <li>
        <a href=/about/board/ data-prefetch>Company Directors</a>
    </ul>
  </li>

  <li class=c-nav__main>

    <a href=/services/ data-prefetch=prerender>Services</a>

    <ul class=c-nav__sub>
      <li>
        <a href=/services/solutions/ data-prefetch>Solutions</a>
      <li>
        <a href=/services/industries/ data-prefetch>Industries</a>
    </ul>

  </li>

  <li class=c-nav__main>
    <a href=/contact/ data-prefetch=prerender>Contact Us</a>

</ul>

...

<a href=/sale/
   class=c-button
   data-prefetch=prerender>Black Friday Savings!</a>

...

<footer>
  <a href=/sitemap/>Sitemap</a>
</footer>
```

* Top-level navigation items with `data-prefetch=prerender` (e.g. the _About_
  page) are immediately prerendered.
* Sub-level navigation items with `data-prefetch` (e.g. the _Solutions_ page)
  are immediately prefetched but prerendered on demand.
* All other links (e.g. the _Sitemap_ page) are dormant until they get
  prefetched on demand.

I can’t publish any names or numbers or facts or figures, but we ran an
experiment for a week and the outcomes we’re incredibly compelling.

I guess my point after all of this is that I think this is quite an elegant
pattern and I’m quite happy with myself. If you’d like to be happy with me, too,
I’m taking on [new clients for 2025](/services/).

<small>Thanks to [Barry Pollard](https://x.com/tunetheweb) for sense-checks and
streamlining.</small>

[^1]: [Chrome sets sensible limits](https://developer.chrome.com/docs/web-platform/prerender-pages#chrome-limits) to prevent anything seriously bad happening.
