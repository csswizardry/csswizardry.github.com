---
layout: post
title: "Finding Dead CSS"
date: 2018-01-17 14:25:19
categories: Web Development
toc: false
meta: "Finding dead or unused CSS on a live website"
---

During a performance workshop I was running this week, I was reminded of
a technique for finding dead CSS on a live site. Note that I’m purposely not
using the phrase ‘unused CSS’, but ‘dead CSS’—the specific scenario I’m
describing looks a little like this:

Imagine you have a large, long-running project that contains hundreds of
thousands of lines of code, contributed by dozens of developers across many
different teams. Not only are you very, very likely to have unused CSS, you’re
also likely to have completely dead code: entire features that have been
decommissioned but whose code was never deleted; dead ends in the application
that are quite hard to find; pages on the site that may be impossible for a user
to reach, but whose legacy lives on.

How do we go about identifying this dead code? Tools like
[uncss](https://github.com/giakki/uncss), although very powerful, don’t quite
fit the bill. What we need is an almost
[RUM](https://en.wikipedia.org/wiki/Real_user_monitoring)-like solution—how can
we see what code users actually see on-screen on a live site?

It turns out that there’s a very simple, cost-effective solution.

Let’s say you have an old checkout flow; a legacy booking system that has slowly
been phased out over a number of months to years (perhaps legacy clients took
longer to be transitioned over to the new codebase). You’re now at a point where
you _think_—at least in theory—all customers and end users have been moved onto
the new platform, and therefore you should be able to start deleting the code.

The first thing you need to do is start with a hypothesis: which code do you
assume to be dead? Identify a CSS selector that you would no longer expect
a user to encounter (e.g. `#checkout_wrapper`).

Next, you need to create a 1×1px transparent GIF with that name. Drop it into
a `dead/` directory: `/assets/img/dead/checkout_wrapper.gif`.

After that, you just need to set that specific image as a background on the
corresponding selector in your CSS:

```
#checkout_wrapper {
  background-image: url('/assets/img/dead/checkout_wrapper.gif');
  // Existing, legacy code
}
```

Finally, you need to put that change live and then sit back and wait. After
perhaps three months, you need to check your server’s logs for any requests for
that new image. If there are no entries, nobody had that legacy component
rendered on their screen: you can probably go ahead and delete it all.

If you do find entries for that particular image, you know that, somehow, the
legacy feature is potentially still accessible—the number of entries should give
you a clue as to how severe the problem might be.

Of course, this technique isn’t totally fail-safe, but it does begin to provide
a good litmus test, and hopefully some useful insights as to how your code
appears in a production application.
