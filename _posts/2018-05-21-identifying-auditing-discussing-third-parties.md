---
layout: post
title: "Identifying, Auditing, and Discussing Third Parties"
date: 2018-05-21 10:01:21
categories: Web Development
meta: "Gathering data about third-parties using free and open-source tooling"
---

A large part of my performance consultancy work is auditing and subsequently
governing third-party scripts, dependencies, and their providers. Uncovering
these third-parties isn’t always so straightforward, and discussing them with
the internal teams responsible (more often than not, the Marketing Department)
is usually quite sensitive and often uncomfortable: after all, approaching
a third-party vendors, or your marketing team, and telling them that their
entire day job is detrimental to performance is never going to be well-received.

In order to help me have these awkward discussions—and it’s often my job as
a consultant to be the one having them—I lean on a number of tools to help make
the topic as objective and straightforward as possible. I want to share them
with you.

## Identifying

The single most useful tool I make use of when it comes to simply identifying
third parties is [Simon Hearne](https://webperf.ninja/)’s indispensable
[_Request Map_](http://requestmap.webperf.tools/). The workflow around this tool
is pretty straightforward:

0. drop a URL into the _Target URL_ field;
0. select a test location (if geographic locale might affect which third parties
   are called then this feature may be particularly useful to you)
0. submit a test;
0. and wait.

Once that’s done, you’ll be presented with what my clients and I have lovingly
dubbed _the jellyfish_:

<figure>
  <img src="/wp-content/uploads/2018/05/requestmap.png" alt="" />
  <figcaption>
    A <a href="http://requestmap.webperf.tools/render/180516_9B_f8f13e248bf901309ace50687acc070b">Request Map result</a> showing CNN’s third parties. <a href="/wp-content/uploads/2018/05/requestmap-full.gif">See full-resolution animated GIF (7.9MB)</a>
  </figcaption>
</figure>

This interactive data visualisation shows us all of the third-party domains that
the URL makes requests to, and their subsequent requests, and so on.

Each blob (_node_) represents a domain; the size of the node represents the
proportional number of bytes that domain was responsible for; the distance
between  nodes represents the mean TTFB of the domain; the thickness of each
line (_edge_) represents the number of requests from the domain; dotted edges
represent <q>requests initiated from a script or identified through a referrer
header</q>; circular edges represent requests initiated by the same domain.

That takes a while to memorise, so to start with just remember that big blobs
mean lots of bytes, distant blobs mean high TTFB, and thick lines mean lots of
requests. This will give you an at-a-glance idea of the shape of things.
Contrast CNN (above) with CSS Wizardry’s [homepage](/):

<figure>
  <img src="/wp-content/uploads/2018/05/requestmap-csswizardry.png" alt="" />
  <figcaption>
    A <a href="http://requestmap.webperf.tools/render/180516_96_2d8bfe648ff13ca99ebff323bbd6ea7a">Request Map result</a> showing CSS Wizardry’s third parties. <a href="/wp-content/uploads/2018/05/requestmap-csswizardry-full.png">See full size/quality (289KB)</a>
  </figcaption>
</figure>

You can quickly see the difference in third party health between the two.
Although there are plenty of other tools that we can and should use to help us
audit third parties, Request Map is the one I want to show you right now.

## Auditing

Auditing third parties is a huge task and can take many different forms, so I’m
not going to go into too much detail in this post: you can always [hire
me](/services/) to show you everything I know about that.

One immediate thing we can do with the data from Request Map is simply get
a broad overview of our worst offenders: whose blobs are the biggest? Is anyone
suffering extreme TTFB? Are there any long chains of third, fourth, fifth party
requests?

Taking things a step further, one thing I always do is rerun a WebPageTest with
all of the third parties missing. This is pretty extreme and non-scientific, but
it is nice to get a very quick idea just how much overhead the third parties
introduce. In order to do this, you’ll need to download the CSV file that
Request Map makes available to you. There’s a link right at the bottom of the
Request Map viewport, and that will give you a file that looks a little like
this:

```
host,                   company,             category,                        total_bytes, average_ttfb, average_load, number_requests
cnn.com,                Target Site,         Target Site,                     0,           33,           130,          1
www.cnn.com,            Target Site,         Target Site,                     232542,      510,          1473,         11
www.i.cdn.cnn.com,      Unknown,             Unknown,                         617784,      6053,         8335,         20
cdn.optimizely.com,     Optimizely,          A-B Testing,                     120965,      97,           625,          1
cdn.cnn.com,            Target Site,         Target Site,                     427640,      6079,         8236,         32
ads.rubiconproject.com, The Rubicon Project, Ad Exchange,                     25734,       130,          833,          1
js-sec.indexww.com,     WPP,                 Programmatic Marketing Platform, 23605,       177,          873,          1
cdn.krxd.net,           Krux Digital,        Data Management Platform,        106664,      266,          1668,         5
static.criteo.net,      Criteo,              Retargeting,                     20938,       44,           833,          1
c.amazon-adsystem.com,  Amazon,              Affiliate Marketing,             14885,       199,          875,          1
...
```

Look at all that lovely, raw data!

<small>**N.B.** This excerpt has been formatted for presentation.</small>

Next up, if you’re comfortable with the command line, let’s run a quick AWK
one-liner to strip out the non-Target Site entries:

    $ awk -F',' '$2 != "Target Site" { print $1 }' cnn.csv

* `awk` is a relatively standard text-processing language.
* `-F','` tells AWK to use a comma as our field separator (CSVs are, by
  definition, comma separated).
* `$2 != "Target Site"` means if the second field is **not** _Target Site_.
* `{ print $1 }` means print out the first field, which happens to be the
  domain.
* `cnn.csv` is the path to the CSV file we just downloaded.

This will, very crudely, provide you with a list of all of the page’s third
party domains. I would always recommend sanity-checking this list for any false
positives, and once you’ve cleaned it all up, copy it to your clipboard.

Now we want to head back over to WebPageTest and run a test with all of those
domains blocked: let’s see how the page feels with all of its third parties
missing.

In WebPageTest’s _Advanced Settings_ panel, locate the _Block_ tab; now paste in
your list of third party domains:

<figure>
  <img src="/wp-content/uploads/2018/05/wpt-block.png" alt="" />
  <figcaption>
    Using WebPageTest’s _Block_ feature. <a href="/wp-content/uploads/2018/05/wpt-block-full.png">See full size/quality (267KB)</a>
  </figcaption>
</figure>

Rerunning the test (with all previous settings identical where possible)
with this list of domains blocked will give you a very broad overview of how
fast the page would be with all third party resources absent.

This should now arm us with rough data around which we can being centring our
discussions, for example:

* With all third parties present, load time increases by 6.3s.
* Removing all third parties reduced the number of requests by 4.2×.
* Without any third parties, page weight dropped by 2.7×.

Again, I am keen to stress that these insights are fairly non-scientific, but at
this point we just need to know roughly where we stand. This should help us
begin discussions…

## Discussing

The next task, and by far the hardest, is discussing these issues with people,
whether that’s the third party provider themselves, or people within your
organisation, it’s not going to be particularly easy. In the latter camp, you’re
quite often dealing with data, marketing, and insights teams: a lot of the third
parties that websites employ are likely non-user facing, and typically, although
not always, exist only to serve the business (analytics, AB testing,
retargeting, tracking, etc.).

The reason these discussions are usually so difficult to have is because
engineers have a tendency to apportion blame—<q>Marketing did this</q>, <q>the
tag manager does that</q>—and you’ll rarely make progress if you appear to be
blaming someone. You can’t rock up to your marketing department and tell them
that everything they do day-in, day-out is bad for the site. We need a much more
_ask, don’t tell_ approach.

To facilitate this, I devised a small Google Sheet that consumes your _Request
Map_ data, and presents the information in a much more digestible and objective
format. By pulling the data into a more universal style—like ’em or loathe ’em,
everyone understands a spreadsheet—we’re much better equipped to begin
discussing these issues with people who aren’t used to waterfall charts, flame
graphs, and spider diagrams.

The small demo embedded below shows the exported Request Map data for my
homepage:

<figure>
  <iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSIbxaluGaV83Xr8Mov6m-UtukC5c5u64dBrQQp3SWIzSCNiJzjgMZ_2BiGnKt0V2wsmLYIOu8z_pEQ/pubhtml?widget=true&amp;headers=true" height="360"></iframe>
</figure>

The columns should all be fairly self-explanatory:

* **A, B, and C** tell us the domain in question, the controller of that domain,
  and what kind of service it provides (where known).
* **D, E, F, and G** show numerical data pertaining to relevant performance
  measurements.
* **H** is left blank for now. This is an important column that we’ll come back
  to a little later.

The main thing I want to show, however, is the different colouring of certain
cells. Cells in columns _B_ and _C_ can be yellow; cells in _D_, _E_, _F_, or
_G_ can be varying shades of red.

* **Yellow** cells highlight a duplicate provider or service type, for example,
  two analytics packages, or hitting Facebook multiple times.
* **Red** highlights relative severity, and is a scale from white to very-dark
  red. From the zeroth to the 90th percentile, we get a gradual darkening from
  white to red; the 90th to 100th percentile all share the same heaviest shade:
  these are your worst 10%, and probably want focusing on first.

Using these two types of information, we can begin honing in on potential
redundancy in duplicate providers, and/or the impact and overhead that certain
providers carry.

Armed with this raw data, it’s time to organise a meeting with whoever is
primarily responsible for your third party implementations. This could be one
distinct department, a cross section of the business, or anything in between.
The goal of this initial meeting is to learn. Remember: _ask, don’t tell_.

Avoid the temptation of entering the meeting all guns blazing; you might be
armed with data, but it’s vital that you don’t weaponise it. Begin by explaining
that <q>We’ve been doing a little housework and begun looking at the third
parties we use. I’ve put together a list of them but I could really use your
help understanding what they all are and what they all do.</q> This sets the
tone that you need them, and at this point, you do. The goal of this meeting
isn’t to eradicate all of our third parties, nor is it to undermine anyone’s
efforts: the goal is to get an idea of why these things are used and what their
perceived value to the business is.

Example questions include:

* Can you talk me through Google Tag Manager?
* What does this particular third-party do for us?
* Who is responsible for this service?
* Which services do we use daily?
* Are there any services in here that we don’t recognise?

Begin populating the _Notes_ column with answers, probe further, and avoid the
temptation to make any decisions in the meeting itself.

Once you feel you’ve gathered enough answers, it’s time to go away and draw up
a potential action plan. Are there third parties that nobody can explain?
They’re an immediate candidate for removal. Are there duplicate third parties
that do almost identical jobs? Then which one could you decommission? Are there
any third parties that load an inordinate amount of bytes? Can you open support
tickets with the provider?

### Using the Google Sheet

If you want to make use of the Google Sheet, the simplest way I know _right now_
is:

0. [Open it up](https://docs.google.com/spreadsheets/d/1uTcRSoJAkXfIm2yfG5hvCSzvSZD9fAwXNQMVK3HdPMI/edit)
0. File » Make a copy…
   0. Save a version to your own Google Drive
0. Export your _Request Map_ data as a CSV
0. Import your own data into your duplicated sheet
   0. Select column _A2_
   0. File » Import…
   0. Upload
   0. Navigate to your own CSV
   0. Replace data at selected cell
   0. Import data
0. Remove any duplicate or superfluous rows and data

## Closing

In the times I’ve used these tools and techniques to discuss third parties with
clients, I’ve always found that things have gone a lot more smoothly than
pointing fingers and taking a more ruthless approach. Nobody appreciates being
told that their main contributions to the website make it slower. Having raw
data, coupled with an _ask, don’t tell_ attitude, often yields much more
favourable results. I’ve made great headway by adopting this strategy—I hope it
helps you, too.
