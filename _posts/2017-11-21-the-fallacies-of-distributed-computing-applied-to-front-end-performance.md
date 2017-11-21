---
layout: post
title: "The Fallacies of Distributed Computing (Applied to Front-End Performance)"
date: 2017-11-21 09:51:11
categories: Web Development
meta: "What can front-end and performance engineers learn from the Fallacies of Distributed Computing?"
---

In the mid-nineties, [Laurence Peter
Deutsch](https://en.wikipedia.org/wiki/L._Peter_Deutsch) and colleagues at Sun
Microsystems devised a list of what they called <cite>The Fallacies of
Distributed Computing</cite>. These were a list of common assumptions that
developers working on distributed systems were prone to making; mistakes that
would impact the reliability, security, or resilience of their software. Those
fallacies are as follows:

1. The network is reliable.
2. Latency is zero.
3. Bandwidth is infinite.
4. The network is secure.
5. Topology doesn’t change.
6. There is one administrator.
7. Transport cost is zero.
8. The network is homogeneous.

<small>Interestingly, although Deutsch is given credit for The Fallacies of
Distributed Computing, the complete list of fallacies was penned by a number of
people over a period of years. A minor hero of mine, [Bill
Joy](https://en.wikipedia.org/wiki/Bill_Joy)—inventor of the ex, and later vi,
editors—is responsible for devising the first four fallacies, along with Tom
Lyon, in what they dubbed <cite>The Fallacies of Networked
Computing</cite>.</small>

Reading over the eight fallacies listed out so plainly, they seem so obvious and
clear that you’d struggle to believe that anyone would ever fall foul of them:
of course we know bandwidth isn’t infinite! The thing is, these fallacies _are_
obvious, but they don’t exist to teach us anything new; they exist to remind us
of the fundamentals. Nor are they intended to explain or describe normal
condition; they’re intended to remind us of worst case scenarios. They’re not
saying that the network is always unreliable, or that latency is always high, or
that bandwidth is always low: they’re saying that, sometimes, one or all of them
will be sub-optimal. We should prepare for that.

Yet time and time again I see developers falling into the same old traps—making
assumptions or overly-optimistic predictions about the conditions in which their
apps will run. Developers frequently tell me things like <q>most of our users
are on wifi</q>, or <q>4G is pretty much everywhere now</q>, or <q>people only
ever visit the site from inside the office anyway</q>. Even if this is
statistically true—even if your analytics corroborate the claim—planning only
for the best leaves you utterly unprepared for the worst. To paraphrase
[Jeremy](https://twitter.com/adactio), it’s not about how well it works, but
[how well it fails](https://www.youtube.com/watch?v=sMhzgKUKdBU).

In this post, I want to focus on the first three fallacies in relation to
front-end performance, and how they impact us as front-end developers. Whether
we realise it or not, we’re in the business of distributed computing: you
probably want that CSS file you’re writing to make its way from one computer (a
server) to another computer (a user’s phone) over some kind of network (the
internet).

## The Network is Reliable

The network is not reliable, at all. How many times have you lost cellular
connection as your train enters a tunnel? How many times has the internet gone
down at your office? How many times have you been connected to spotty hotel or
conference wifi? Many times, I’m willing to bet. It happens to me numerous times
a week. We know from first-hand experience that the network can be unreliable,
yet we always build with the assumption that it will be present and correct.
With this frame of mind, we’ll struggle to deliver anything at all if our
assumptions are challenged—we’re likely to fail entirely.

The adage goes, the best request is the one that’s never made. Although it’s not
always going to be possible, if we can avoid the network altogether, then that’s
going to hold us in good stead. We can begin to mitigate this with offline-first
approaches, aggressive and immutable caching, and Service Workers.

**The network is hostile; assume it isn’t on your side.**

## Latency is Zero

One of the key limiting factors in front-end performance, more so even than
bandwidth, is latency. Professor Hari Balakrishnan and colleagues at MIT
conducted research in 2014, which Balakrishnan summarised with:

> …slow load-times are more strongly related to network delays than available
> bandwidth. Rather than decreasing the number of transferred bytes, we think
> that reducing the effect of network delays will lead to the most significant
> speedups.

For regular web browsing, high latency will be felt much more than low
bandwidth. Long round-trip times (RTT) delay the speed at which packets can be
transferred over the network. Cellular connections typically have much higher
latency than we might experience on broadband; fibre will be much lower.
Geographic locales also tend to suffer: if you’re hosting your application in
the US but expect Australian visitors, they will instantly pay a huge penalty
when visiting your site.

We can begin to mitigate latency issues by using CDNs, by pre-connecting new and
important origins, by inlining small critical resources, and by reducing the
number of round trips needed to render pages.

**When it comes to performance, particularly on mobile, latency is the real
killer.**

## Bandwidth is Infinite

Despite being less critical for general web browsing than latency, bandwidth is
still a key limiting factor in our users’ experiences. Bandwidth tends to be
a concern when we begin to download larger files: downloading a 50KB stylesheet
over an 8MB connection will feel much the same as it would on a 100MB
connection, but downloading or streaming large files such as software updates or
video will get much easier on high bandwidth connections.

That said, we still need to be aware and mindful of the size of the files we
send over the wire: wrapping your entire application up in a 1.2MB JavaScript
bundle isn’t going to do too much in favour of the third fallacy.

We can start to mitigate the impact of finite bandwidth by delivering payloads
of an appropriate size, optimising our images, and minifying and compressing our
text assets.

**It is not safe or sensible to assume that users can download large files.**

## Planning for the Worst

<blockquote class="pull-quote  pull-quote--context">
  <p>Expect the best, plan for the worst, and prepare to be surprised.</p>
  <b class="pull-quote__source">
    <a href="http://www.waitley.com/">Denis Waitley</a>
  </b>
</blockquote>

The key takeaway here is not that we should assume that everything will be bad
all of the time; it’s that if we don’t consider or prepare for the worst, then
we’re left entirely ill-equipped to recover. If you build and structure
applications such that they survive adverse conditions, then they will thrive in
favourable ones. Something I often tell clients and workshop attendees is that
if you optimise for the lowest rung, everything else on top of that comes for
free.

Memorise these fallacies, catch yourself when you’re beginning to fall into
them, print them out and stick them on your office wall, and above all else, use
them as ammunition the next time you hear someone say <q>well no one is going to
visit on a 2G connection</q>. Rightly or wrongly, I often find that it’s much
easier to convince someone of your viewpoint if there happens to be a Wikipedia
page of old-time principles to back it up.
