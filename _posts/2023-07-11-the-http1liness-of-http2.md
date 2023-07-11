---
layout: post
title: "The HTTP/1-liness of HTTP/2"
date: 2023-07-11 20:30:54
categories: Web Development
main: "https://csswizardry.com/wp-content/uploads/2023/07/cards-round-robin.png"
meta: "If HTTP/2 is so much better, why does it look so similar to HTTP/1?!"
toc: false
---

<p class="c-highlight">This article started life as <a
href="https://twitter.com/csswizardry/status/1678793192756355073">a Twitter
thread</a>, but I felt it needed a more permanent spot. You should <a
href="https://twitter.com/csswizardry">follow me on Twitter</a> if you aren’t
already.</p>

I’ve been asked a few times—mostly in [workshops](/workshops/)—why HTTP/2 (H/2)
waterfalls often still look like HTTP/1.x (H/1). Why are hings are done in
sequence rather than in parallel?

Let’s unpack it!

<small>Fair warning, I am going to oversimplify some terms and concepts. My goal
is to illustrate a point rather than explain the protocol in detail.</small>

One of the promises of H/2 was infinite parallel requests (up from the
historical six concurrent connections in H/1). So why does this H/2-enabled site
have such a staggered waterfall? This doesn't look like H/2 at all!

<figure>
<img src="{{ site.cloudinary }}/wp-content/uploads/2023/07/waterfall-h2.png" alt="" width="930" height="2171">
<figcaption>This doesn’t look very parallelised!</figcaption>
</figure>

Things get a little clearer if we add Chrome’s queueing time to the graph. All
of these files were discovered at the same time, but their requests were
dispatched in sequence.

<figure>
<img src="{{ site.cloudinary }}/wp-content/uploads/2023/07/waterfall-h2-waiting.png" alt="" width="930" height="2171" loading="lazy">
<figcaption>The white bars show how long the browser queued the request for. All
files were discovered around 3.25s, but were all requested sometime after that.</figcaption>
</figure>

As a performance engineer, one of the first shifts in thought is that we don’t
care only about when resources were discovered or requests were dispatched (the
leftmost part of each entry). We also care about when responses are finished
(the rightmost part of each entry).

When we stop and think about it, ‘when was a file useful?’ is much more
important than ‘when was a file discovered?’. Of course, a late-discovered file
will also be late-useful, but *really* the only thing that matters is
usefulness.

With H/2, yes, we can make far more requests at a time, but making more requests
doesn’t magically make everything faster. We’re still limited by device and
network constraints. We still have finite bandwidth, only now it needs sharing
among more files—it just gets diluted.

<img src="{{ site.cloudinary }}/wp-content/uploads/2023/07/playing-cards.png" alt="" width="160" height="157" style="float: left; margin-right: 1.5rem; margin-left: -1.5rem; shape-outside: url('/wp-content/uploads/2023/07/playing-cards.png'); shape-margin: 1.5rem;">

Let’s leave the web and HTTP for a second. Let’s play cards! Taylor, Charlie,
Sam, and Alex want to play cards. I am going to deal the cards to the four of
them.

These four people and their cards represent downloading four files. Instead of
bandwidth, the constant here is that it takes me ONE SECOND to deal one card. No
matter how I do it, it will take me 52 seconds to finish the job.

The traditional round-robin approach to dealing cards would be one to Taylor,
one to Charlie, one to Sam, one to Alex, and again and again until they’re all
dealt. Fifty-two seconds.

This is what that looks like. It took 49 seconds before the first person had all
of their cards.

<figure>
<img src="{{ site.cloudinary }}/wp-content/uploads/2023/07/cards-round-robin.png" alt="" width="930" height="2171" loading="lazy">
<figcaption>Everything isn’t faster—everything is slower.</figcaption>
</figure>

Can you see where this is going?

What if I dealt each person all of their cards at once instead? Even with the
same overall 52-second timings, folk have a full hand of cards much sooner.

<figure>
<img src="{{ site.cloudinary }}/wp-content/uploads/2023/07/cards-at-once.png" alt="" width="930" height="2171" loading="lazy">
<figcaption>Half a JavaScript file is useless to us, so let’s focus on getting
complete responses over the wire as soon as possible.</figcaption>
</figure>

Thankfully, the (s)lowest common denominator works just fine for a game of
cards. You can’t start playing before everyone has all of their cards anyway, so
there’s no need to ‘be useful’ much earlier than your friends.

On the web, however, things are different. We don’t want files waiting on the
(s)lowest common denominator! We want files to arrive and be useful as soon as
possible. We don’t want a file at 49, 50, 51, 52s when we could have 13, 26, 39,
52!

On the web, it turns out that some slightly H/1-like behaviour is still a good
idea.

Back to our chart. Each of those files is [a `defer`red JS
bundle](/2023/07/in-defence-of-domcontentloaded/), meaning they need to run in
sequence. Because of how everything is scheduled, requested, and prioritised, we
have an elegant pattern whereby files are queued, fetched, and executed in
a near-perfect order!

<figure>
<img src="{{ site.cloudinary }}/wp-content/uploads/2023/07/waterfall-h2-waiting.png" alt="" width="930" height="2171" loading="lazy">
<figcaption>Hopefully it all makes a little more sense now.</figcaption>
</figure>

Queue, fetch, execute, queue, fetch, execute, queue, fetch, execute, queue,
fetch, execute, queue, fetch, execute with almost zero dead time. This is the
height of elegance, and I love it.

I fondly refer to this whole process as ‘orchestration’ because, truly, this is
artful to me. And that’s why your waterfalls look like that.
