---
layout: post
title: BBC – Workshop and code review
meta: "Running a full-day workshop with developers from the BBC"
permalink: /case-studies/bbc-workshop/
next-case-study-title: "Hear about how I changed and improved front-end process for BSkyB."
next-case-study-url: /case-studies/bskyb/
hide-hire-me-link: true
---

When Keith Mitchell, Engineering Manager at BBC Sport, emailed me asking if I’d
like to run a workshop for some of the BBC’s developers, I almost bit his hand
off. The BBC had always been very high up on my ‘client bucket list’, and to
host a workshop for them seemed perfect.

The BBC, like [BSkyB](/case-studies/bskyb/), are a huge media organisation with
many products sitting under one umbrella brand/company. The kinds of problems
their developers would likely come up against would be the exact same ones I’d
been working on for three years at Sky, and with my own clients thereafter:

* Scaling CSS on long-running products.
* Managing large UI codebases in a team environment.
* Effectively sharing and syndicating UI components.
* Maintaining a level of consistency across differently-branded products.
* And all of the usual struggles that come with larger products.

The single day on-site was broken into two halves: a morning session and an
afternoon session.

<b>In the morning</b>, developers from the wider BBC departments gathered in a really
great creative space at the BBC’s MediaCity campus where I ran a workshop
covering things like:

* Specific CSS architectures.
* Building new architectures from scratch (which tied in nicely with [the work I
  was doing for the NHS](/case-studies/nhs-nhsx-elearning-platform/) at the
  time).
* Writing and reading code in a more team-friendly manner.
* Managing layout more effectively (RWD and component-based UIs require a little
  more consideration when it comes to better laying things out).

This session kicked off with the attendees building a simple UI component,
before we shared and critiqued volunteers’ results with the group. Dissecting
and rationalising the rationale behind various techniques people had used to
build the component in question really helped show the team that, even though
they all work together day-in, day-out, everyone has a subtly different way of
building the same, innocuous little pieces of UI. Using this exercise as a base,
the rest of the workshop talked about how we could all work in a more
standardised manner to try and make team-working more seamless.

{% include promo.html %}

<b>In the afternoon</b>, I joined a much smaller team of just BBC Sport
developers for a Q&A session, looking at, and reviewing, the work they were
already doing, and how they might improve or adjust it. A group [code
review](http://csswizardry.com/work/#section-code-reviews) of sorts.

The day ended with a brief hacking session, experimenting with creating UI
components as discrete packages, and managing them with
[Bower](http://bower.io/).

---

{% include promo-next.html %}
