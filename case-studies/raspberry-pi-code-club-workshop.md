---
layout: post
title: "Raspberry Pi and Code Club: Workshop"
meta: "A full day workshop to help solve the Raspberry Pi’s upcoming CSS conundrums"
permalink: /case-studies/raspberry-pi-code-club-workshop/
next-case-study-title: "Two days of architecture and performance workshops with Ocado"
next-case-study-url: /case-studies/ocado-workshop/
hide-hire-me-link: true
---

<img src="/img/content/case-studies/raspberry-pi/logo-pi.png" alt="" width="128" height="165"
     style="float: left;
            margin-right: 24px;
            shape-outside: url(/img/content/case-studies/raspberry-pi/logo-pi.png);
            shape-margin: 12px;" />

I was approached by my friend [Jonic](https://twitter.com/Jonic), Senior
Developer at the Raspberry Pi Foundation, about running a workshop with him and
a bunch of the team. Specifically, they wanted to focus on building out a UI
toolkit that could underpin a number of different properties, including [Raspberry
Pi](https://www.raspberrypi.org/) and [Code Club](https://www.codeclub.org.uk/).

I was particularly excited to work together for a number of reasons: firstly,
Jonic is loads of fun, so working together was bound to be great, but
secondly—mainly—I have a huge interest in education in tech. I never went to
university because the offering at the time I was looking (around 2008) was so
poor, and any IT education I had before that left a lot to be desired. I got to
where I am through self-teaching, open source, and the knowledge of others. It’s
because of this that I guest lecture at certain universities, and have a bit of
a soft spot for non-traditional education resources: The Raspberry Pi Foundation
felt like a great cause for me to get behind.

Our working engagement was to be a single day workshop, on-site at Raspberry
Pi’s Cambridge offices. The ‘work’ started the night before, when four of us met
up for dinner and a few drinks. We hung out, got to know each other a little
better, and briefly discussed expectations for the day ahead.

- - -

We started the day with me doing a bit of an audit of the code, [looking for any
potential issues or oddities](/2017/01/ack-for-css-developers/). This filled the
first 45 minutes or so until everyone had arrived and was settled in for a day
of workshopping.

Jonic and the team had a sound understanding of Sass and naming conventions, so
we skipped past that and dove straight in to a crash course on
[ITCSS](http://itcss.io/). Lots of scribbling on whiteboards, drawing diagrams,
and discussing how ITCSS might fit their specific requirements (that’s a core
part of the architecture’s design: it can be moulded to fit almost any project).

<img src="/img/content/case-studies/raspberry-pi/logo-cc.png" alt="" width="128" height="128"
     style="float: right;
            margin-left: 12px;
            shape-outside: circle();" />

Once we had an idea of what shape the codebase would take, we then began to look
at how we would deploy and consume it into projects. More whiteboards, more
scribbling, and some head scratching later, we settled on a number of separate
repos and npm packages to consume smaller, more granular parts of the toolkit
into projects that needed it. This granularity would make the toolkit more
useful and more flexible.

After we got down a lot of architectural theory, we began to focus our
attentions on theming and repurposing the toolkit so that it could be used on a
variety of different sites and products. Theming is [a problem I’ve
solved](https://speakerdeck.com/csswizardry/4half-methods-for-theming-in-s-css)
for many different companies, in many different ways, many different times
before, so we managed to settle on the correct approach very readily: this left
us with a fun bit of code tennis where I mocked up a proof of concept in
[Sassmeister](http://www.sassmeister.com/), and Jonic and the team added the
next features, and so on, until we’d got a pretty comprehensive chunk of code
that allowed us to generate and switch themes very quickly.

We rounded off the session by looking at some performance topics, mainly
CSS/runtime/rendering performance: how to measure it, how to debug it, and how
to improve it.

By the time the day wound down, heads were beginning to spin. In just a short
amount of time, we covered a _lot_ of ground. We’d worked out the most suitable
architecture for a multi-platform UI toolkit; we decided how best to package,
deploy, and consume it; we coded up a way of completely reskinning and theming
it, and then we began to touch on how to make things like animations silky
smooth.

After that, it was time for the pub, and a couple of us made it to somewhere
local to finish the day talking non-technical things with a beer in hand. I’m
really pleased with the work we did together, and happy to have been a part of
shaping the future of Raspberry Pi’s new UI toolkit. What a great client!

- - -

{% include promo-next.html %}
