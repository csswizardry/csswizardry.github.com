---
layout: post
title: "Measuring the Hard-to-Measure"
date: 2018-03-01 13:45:19
categories: Web Development
meta: "How can we gather valuable data about previously hard-to-measure things?"
---

Last night I gave a performance-oriented talk at the wonderful
[DaFED](https://dafed.org/) event in Novi Sad, Serbia. In the talk, I go into
detail about third parties, and how they can have tremendous negative impact on
our performance. I also mention that, sometimes, it’s more important to think
about resilience than speed. For example, what happens to us if a third party
script fails to load? Can we recover from that? What happens if a third party
has an outage? Do we suffer the effects of it?

This led to a great question from [Dragan](https://twitter.com/draganeror) along
the lines of <q>Nowadays, how important is it to test sites with JavaScript
disabled?</q> It’s certainly a thought-provoking question, but I won’t be going
into my answer in this post. Instead, I want to talk about being able to measure
just how many users do have JavaScript disabled. Most analytics software is
powered by JavaScript, so detecting JavaScript becomes self-fulfillingly
impossible. I want to share an incredibly quick tip to measure how many of your
users turn up on a device with no JavaScript capabilities…

## Beacons and Tracking Pixels

I recently wrote an article about [finding dead CSS](/2018/01/finding-dead-css/)
by using a tracking pixel… we can use almost the exact same technique to detect
non-JavaScript browsers:

```
<noscript>
  <img src="/pixels/no-js.gif" alt="" />
</noscript>
```

Now, any browsers that have JavaScript disabled will make a request for
`no-js.gif`, and all we need to do is check our server logs after a few months
and we’ll get a rough idea of just how many users arrive with JavaScript
disabled. Based on this data, you can make much more informed decisions about
your policy for non-JavaScript users.

I set up a local server to test this out. After disabling JavaScript and
visiting the relevant test page, sure enough, `no-js.gif` began to appear in my
logs:

<figure>
  <img src="/wp-content/uploads/2018/03/screenshot-no-js.png" alt="A screenshot
  showing non-JavaScript browsers making HTTP requests for a specific tracking
  pixel." />
</figure>

### Update 2018-03-01 12:53:00 UTC

[Ryan](https://twitter.com/RyanTownsend) makes a great point:

> Might be worth noting on your new article that you’ll want to set a far-future
> Cache-Control expiry header for the `no-js.gif` (or even use immutable) if you
> want to count the number of users without JS rather than counting the number
> of pageviews.

## Print Stylesheets

In recent discussions with the NHS, a client of mine, we wondering whether
a print stylesheet would be appropriate. Most of the discussion centred around
hypotheticals and maybes: <q>I can imagine <var>x</var> user might want to print
<var>y</var> information.</q> These were sensible and educated guesses, but
guesses nonetheless. Let’s gather some data:

```
@media print {

  html::after {
    content: url('/pixels/print.gif');
  }

}
```

Now, whenever someone wants to print our page, a request for `print.gif` will
fire off and we can capture that information: we can make informed decisions
about if and how to implement a print stylesheet, and how much effort we should
put into it.

Once again, I built a quick demo to test it out. Expectedly, as soon as I hit
&#x2318;+P, a request for `print.gif` fires off:

<figure>
  <img src="/wp-content/uploads/2018/03/screenshot-print.png" alt="A screenshot
  showing how printing a page makes an HTTP request for a specific tracking
  pixel." />
</figure>

While tracking pixels are far from a new idea, there are creative ways in which
we can use them to collect data useful to developers. Once the data is gathered,
we can begin to make much more informed decisions about how we work.
