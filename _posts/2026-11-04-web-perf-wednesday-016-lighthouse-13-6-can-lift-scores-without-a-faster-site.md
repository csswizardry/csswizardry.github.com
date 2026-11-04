---
layout: post
title: "Web-Perf Wednesday 016 – Lighthouse 13.6 Can Lift Scores Without a Faster Site"
date: 2026-11-04 12:00:00 +0000
categories:
  - Web Performance
tags:
  - Web-Perf Wednesdays
  - Lighthouse
  - Measurement
  - Tooling
  - Safari
show_taxonomy: true
meta: "Lighthouse 13.6 changes simulated FCP and LCP, so PageSpeed Insights scores can improve even when the page itself has not changed."
---

More has changed since last week than a quick glance at the browser releases
would suggest. PageSpeed Insights has moved to Lighthouse 13.6, whose revised
simulation can improve First Contentful Paint (FCP), Largest Contentful Paint
(LCP), and the performance score without a corresponding site change. That is
the useful story this week: measurement tools are getting better, but their
improvements can look remarkably like ours unless we keep the test version and
method alongside the result.

## Lighthouse 13.6 Can Lift Scores Without a Faster Site

PageSpeed Insights now runs [Lighthouse
13.6](https://github.com/GoogleChrome/lighthouse/releases/tag/v13.6.0). Barry
Pollard, Chrome’s Web Performance Developer Advocate, [confirmed the
change](https://bsky.app/profile/tunetheweb.com/post/3mzdqpjuns22y) and says the
new simulation produces more accurate, usually better, FCP and LCP scores. He
also expects JavaScript-heavy sites to be more affected, although this is not a
Single Page Application-specific change.

The important word is _simulation_. PageSpeed Insights loads a page and uses
Lighthouse’s Lantern model to estimate how it would have loaded under slower
conditions. Lighthouse 13.6 changes that model in two particularly visible
places.

First, it now uses Chrome’s own render-blocking status for requests instead of
inferring that status from their priority. A module script may have a high
priority without actually preventing the browser from painting, so treating
priority as a proxy could make unrelated work look as though it delayed FCP or
LCP.

Second, when the LCP element is text painted in the same frame as FCP,
Lighthouse now uses the FCP dependency graph for both metrics. Previously,
preloaded or otherwise non-blocking requests made before LCP could be pulled
into the simulated LCP calculation even though that text did not wait for them.
The wider release also improves HTTP/2 and HTTP/3 connection modelling,
redirect handling, and estimates of round-trip time and throughput.

The page may therefore receive a higher score while serving the same HTML,
JavaScript, images, and CSS. That is welcome if the new result is closer to the
browser’s behaviour, but it creates a break in any time series that spans the
upgrade. A graph can show an improvement that nobody shipped.

The change is already spreading beyond PageSpeed Insights. Calibre [moved its
test agents](https://calibreapp.com/changelog) to Lighthouse 13.6 on 31 October
and notes that the two paint fixes affect simulated-throttling profiles, not
profiles using runtime throttling. Chrome’s built-in Lighthouse panel will get
13.6 with Chrome 159, so the same page may temporarily produce different
results in PageSpeed Insights and local DevTools.

Record the Lighthouse and browser versions with every synthetic result, mark
the upgrade date on dashboards, and compare like with like before crediting a
release. Keep field data separate: Chrome UX Report measurements come from
visits and do not change because Lantern changed its model. A [measurement
review](/consultancy/) should explain whether the page, the test conditions, or
the instrument moved before the result becomes a performance claim.

## Calibre Makes Performance Data Available to Agents

Calibre has also launched a [read-only MCP
connection](https://calibreapp.com/changelog) for its RUM, CrUX, and synthetic
data. Connected coding agents can query pages, elements, scripts, and deploys;
they cannot change the Calibre account. Administrators can disable the feature
for an organisation, and Company-plan audit logs record connections and
disconnections.

Read-only does not make the data consequence-free. The connected agent sees
what its Calibre user can see, so give it the narrowest useful account, review
which service receives the results, and keep a human between a suggested fix
and production. Used carefully, it could shorten the journey from an odd graph
to a useful trace. [Ongoing technical guidance](/mentoring/) can help a team
turn that convenience into a repeatable investigation rather than a faster way
to accept a plausible answer.

## WebTransport Gets More Operational Controls

[Chrome 158](https://chromestatus.com/release-notes/158), currently in beta,
adds several WebTransport controls: applications can request throughput or
low-latency congestion control, anticipate concurrent incoming streams, detect
when a session is draining, and inspect per-stream received and consumed byte
counts.

[Firefox 160’s beta
notes](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/160)
add custom headers to the opening request, standard datagram buffer limits, and
a byte-stream option that lets applications reuse their own buffer. The two
browsers are not shipping an identical set, and neither beta is a reason to
drop existing fallbacks. For real-time products, however, the direction is
useful: test backpressure, reconnection, latency, and memory against the real
server instead of treating a successful connection as proof that the transport
will remain healthy. That would make a worthwhile [team exercise](/workshops/)
before adopting the new controls.

## Safari Can Restyle Light Pages Itself

Safari 27.3 beta introduces [Adaptive Dark
Mode](https://webkit.org/blog/18541/introducing-adaptive-dark-mode/), an
optional user setting that transforms predominantly light pages inside WebKit.
It adjusts authored colours and some SVG or bitmap logos, while leaving canvas
content alone. JavaScript continues to read the original authored colours, so
a site cannot use the transformation as another browser signal.

Sites that declare and implement `color-scheme: light dark` are left alone.
WebKit recommends declaring that support in HTML or CSS early, rather than
injecting it later with JavaScript, so the browser can render correctly from
the start. The proposed `light only` opt-out is not supported in the first beta,
which makes testing more useful than assuming an escape hatch exists. Check
logos, blend modes, canvas, gradients, and contrast in the beta; the browser
may now expose assumptions that an ordinary light-mode screenshot never did.

## Need Help Explaining a Lighthouse Score Change?

If a performance score jumped and nobody can connect it to a release, I can
help separate a page improvement from a browser, Lighthouse, or test-profile
change. We can line up the report versions, rerun the same page under controlled
conditions, inspect the trace, and compare the result with field data before
the number reaches a stakeholder dashboard.

You do not need a complete investigation. Two reports that disagree, a chart
with an unexplained step, or a score that suddenly looks too good is enough to
start. If you would like a second pair of eyes on it, [get in touch](/contact/).

{% include web-perf-wednesdays.md %}
