---
layout: page
title: About Harry Roberts
page-class: page--about
meta: "Harry Roberts is an independent web performance consultant based in Leeds, UK. He helps teams improve site speed, front-end performance, and Core Web Vitals."
permalink: /about/
lux: About
---

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": "{{ site.url }}/about/#webpage",
      "url": "{{ site.url }}/about/",
      "name": "About Harry Roberts",
      "description": "Harry Roberts is an independent web performance consultant based in Leeds, UK.",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "{{ site.url }}/#website",
        "url": "{{ site.url }}/",
        "name": "CSS Wizardry"
      },
      "mainEntity": { "@id": "{{ site.url }}/#person" }
    },
    {
      "@type": "Person",
      "@id": "{{ site.url }}/#person",
      "name": "Harry Roberts",
      "url": "{{ site.url }}/about/",
      "image": "{{ site.url }}/img/content/about.jpg",
      "jobTitle": "Web Performance Consultant",
      "worksFor": { "@id": "{{ site.url }}/#org" },
      "sameAs": [
        "https://twitter.com/csswizardry",
        "https://github.com/csswizardry",
        "https://www.linkedin.com/in/csswizardry/",
        "https://developers.google.com/profile/u/csswizardry"
      ],
      "knowsAbout": [
        "Web performance",
        "Core Web Vitals",
        "Site-speed optimisation",
        "Performance engineering",
        "Browser performance"
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "CSS Wizardry",
          "item": "{{ site.url }}/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "About",
          "item": "{{ site.url }}/about/"
        }
      ]
    }
  ]
}
</script>

**Hi, I’m Harry.** I’m an independent web performance consultant based in
Leeds, UK. I help teams understand how site-speed affects their business,
improve Core Web Vitals, and work out where the **real bottlenecks** are.

I’m an invited [Google Developer
Expert](https://developers.google.com/profile/u/csswizardry), a [Cloudinary
Media Developer
Expert](https://cloudinary.com/blog/announcing_cloudinary_s_media_developer_experts_program#harry_roberts),
an [international speaker](/speaking/), and co-chair of
[<cite>performance.now()</cite>](https://perfnow.nl/), the web performance
conference for professionals.

Alongside client work, I have published **over [240 articles](/archive/)** on
CSS Wizardry and delivered **over [150 conference talks](/speaking/)** on web
performance, site-speed, and front-end engineering. Since 2009, my writing and
teaching have **informed and improved** the work of individuals and teams
around the world.

<figure>
  <img src="/img/content/about.jpg"
       alt="Harry Roberts leading a web performance workshop at Digital Labin 2022, standing in front of a group of attendees and speaking with animated hand gestures against a concrete and tiled backdrop."
       width="750"
       height="422"
       id="about-image"
       style="background-image: url({% include base64/about.jpg.html %});"
       fetchpriority="high"
       decoding="sync"
       elementtiming="about-image">
  <figcaption>Workshopping at <a href="https://digital-labin.com/">Digital Labin</a>, 2022. Photograph by <a href="https://www.instagram.com/dzambofilm/">Ivica Džambo</a>.</figcaption>
</figure>





<ul class="c-nav-secondary  mt++" id="section:about">
  <li class="c-nav-secondary__item"><a href="#section:about" class="c-nav-secondary__link  is-current">About</a></li>
  <li class="c-nav-secondary__item"><a href="#section:colophon" class="c-nav-secondary__link">Colophon</a></li>
  <li class="c-nav-secondary__item"><a href="#section:why-css-wizardry" class="c-nav-secondary__link">Why CSS Wizardry?</a></li>
  <li class="c-nav-secondary__item"><a href="#section:interviews" class="c-nav-secondary__link">Interviews</a></li>
</ul>

With <span class="js-date">many</span> years of professional experience, and
more than a decade working independently, I’ve been trusted by the likes of the
<b>United Nations</b>, <b>Google</b>, the <b>BBC</b>, <b>General Electric</b>,
and [many more](/#section:clients).

<script>
  const currentYear = new Date().getFullYear();
  const yearsOfExperience = currentYear - 2008;

  document.querySelector('.js-date').textContent = yearsOfExperience;
</script>

My work tends to sit somewhere between **engineering, troubleshooting, and
enablement**. In practice, that can mean auditing a site to uncover what is
really holding it back, working alongside a team to get fixes shipped, or
helping leadership understand what performance is costing them and where the
strongest returns are likely to come from. More often than not, it means some
mixture of all three.

Through combinations of consultancy, performance audits, implementation
support, and training, I help teams build **faster, more resilient
websites** and stronger web performance practices around them.

<blockquote class="pull-quote  pull-quote--context-alt" id="quote:tim-kadlec">
  <p>There is a short list of people I whole-heartedly recommend for detailed
  performance work and Harry is right there at the top.</p>
  <b class="source  pull-quote__source"><a href="https://timkadlec.com/">Tim Kadlec</a></b>
</blockquote>

The two things I care most about are practicality and outcomes. Fast websites
are good, but they are not the end in themselves. What matters is what that
speed unlocks: better experiences, **healthier conversion rates**, stronger
Core Web Vitals, and more confidence in the product itself.

I work with companies of all shapes and sizes, across a range of industries,
countries, and team structures. Sometimes that means a **forensic performance
audit**; sometimes it means help fixing a specific issue, training for engineers,
or a longer-term partnership that helps a team build performance thinking into
the way it works. All of that is squarely in my wheelhouse.

If you need a faster website, better Core Web Vitals, a detailed performance
audit, or simply a clearer understanding of where your **biggest
opportunities** lie, I can help. I’m comfortable in the weeds with engineers,
and just as comfortable helping stakeholders understand the **commercial side**
of web performance work.

If that sounds useful, [say hello](/contact/). I’m professional, but pretty
laid back, and I’m always happy to see whether there’s a good fit.

_<img src="{{ site.cloudinary }}/img/content/signature.png" alt="Harry" fetchpriority="low" width="123" height="72" />_

<a href="/services/" class="btn  btn--full"><strong>Hire
me.</strong></a>





<ul class="c-nav-secondary  mt++" id="section:colophon">
  <li class="c-nav-secondary__item"><a href="#section:about" class="c-nav-secondary__link">About</a></li>
  <li class="c-nav-secondary__item"><a href="#section:colophon" class="c-nav-secondary__link  is-current">Colophon</a></li>
  <li class="c-nav-secondary__item"><a href="#section:why-css-wizardry" class="c-nav-secondary__link">Why CSS Wizardry?</a></li>
  <li class="c-nav-secondary__item"><a href="#section:interviews" class="c-nav-secondary__link">Interviews</a></li>
</ul>

## Colophon

CSS Wizardry makes use of many great tools and services; tools and services that
make my life as a developer much, much simpler.

CSS Wizardry is built on [Jekyll](https://jekyllrb.com/), an open source static
site generator. This is hosted using [GitHub Pages](https://pages.github.com/)
and served via [Cloudflare](https://www.cloudflare.com/).

The CSS is written in [Sass](https://sass-lang.com/), and built on top of
[inuitcss](https://github.com/inuitcss). inuitcss is a free, open-source,
Sass-based, OOCSS framework with a strong focus on performance, scalability, and
a small footprint. This is then built into [ITCSS](https://skl.sh/harry), a CSS
architecture of mine which is designed to aid the growth and maintainability of
CSS projects.

The site is intentionally fairly lean. Your system font is used to give
a familiar feel and to help improve performance.
[SpeedCurve](https://speedcurve.com/) and [Treo](https://treo.sh/) help keep CSS
Wizardry _fast_.

The photograph used on the homepage’s masthead is of me speaking at [Digital
Labin](https://digital-labin.com/), and was taken by [Marin Cuk Vurnek of
EVENTography](https://www.facebook.com/mcveventography/).

CSS Wizardry’s roadmap and task list are viewable on [a public Trello
board](https://trello.com/b/5vYEHwrP/csswizardry-com), and all of the code that
powers it can be found [on
GitHub](https://github.com/csswizardry/csswizardry.github.com). Feel free to
take a look round, but please don’t steal anything.

---

<ul class="c-nav-secondary  mt++" id="section:why-css-wizardry">
  <li class="c-nav-secondary__item"><a href="#section:about" class="c-nav-secondary__link">About</a></li>
  <li class="c-nav-secondary__item"><a href="#section:colophon" class="c-nav-secondary__link">Colophon</a></li>
  <li class="c-nav-secondary__item"><a href="#section:why-css-wizardry" class="c-nav-secondary__link  is-current">Why CSS Wizardry?</a></li>
  <li class="c-nav-secondary__item"><a href="#section:interviews" class="c-nav-secondary__link">Interviews</a></li>
</ul>

## Why CSS Wizardry?

I chose the name <i>CSS Wizardry</i> when I was 17 years old. I had read [Andy
Budd](https://www.andybudd.com/)’s [<cite>CSS
Mastery</cite>](https://link.springer.com/book/10.1007/978-1-4302-0123-6),
become mildly obsessed, and then very unoriginally registered `csswizardry.com`.

I would not necessarily recommend letting teenagers pick their own domain
names.

While my early career really was rooted in CSS architecture and design
systems—and so for a long time the name made perfect sense—my work has been much
more squarely focused on web performance for the best part of a decade now. The
name has stuck, and at this point I suspect it probably always will.

---

<ul class="c-nav-secondary  mt++" id="section:interviews">
  <li class="c-nav-secondary__item"><a href="#section:about" class="c-nav-secondary__link">About</a></li>
  <li class="c-nav-secondary__item"><a href="#section:colophon" class="c-nav-secondary__link">Colophon</a></li>
  <li class="c-nav-secondary__item"><a href="#section:why-css-wizardry" class="c-nav-secondary__link">Why CSS Wizardry?</a></li>
  <li class="c-nav-secondary__item"><a href="#section:interviews" class="c-nav-secondary__link  is-current">Interviews</a></li>
</ul>

## Interviews and Podcasts

<ol class="list-ui  mb">

  <li class="list-ui__item">
    <h3 class="list-ui__title">Podcast</h3>
    <time>2017-06-13</time>: <a href="https://soundcloud.com/scriptcast/1-beer-with-harry-roberts">ScriptCast</a>
  </li>

  <li class="list-ui__item">
    <h3 class="list-ui__title">Podcast</h3>
    <time>2017-06-13</time>: <a href="https://goodstuff.fm/nbsp/121">Non Breaking Space Show</a>
  </li>

  <li class="list-ui__item">
    <h3 class="list-ui__title">Podcast</h3>
    <time>2016-11-10</time>: <a href="http://hackingui.com/podcast/the-ups-and-downs-of-dominating-a-niche-harry-roberts-css-wizardry/">Hacking UI</a>
  </li>

  <li class="list-ui__item">
    <h3 class="list-ui__title">AMA</h3>
    <time>2016-10-20</time>: <a href="https://hashnode.com/ama/with-harry-roberts-ciu89znz703oakb53khik6kmo">Hashnode</a>
  </li>

  <li class="list-ui__item">
    <h3 class="list-ui__title">Podcast</h3>
    <time>2016-09-14</time>: <a href="http://thewebplatformpodcast.com/109-css-performance-and-maintenance?tdest_id=240060">The Web Platform Podcast</a>
  </li>

  <li class="list-ui__item">
    <h3 class="list-ui__title">Interview</h3>
    <time>2016-09-14</time>: <a href="http://blog.honeypot.io/interview-harry-roberts-css-wizardry/">Honeypot</a>
  </li>

  <li class="list-ui__item">
    <h3 class="list-ui__title">Podcast</h3>
    <time>2016-08-23</time>: <a href="http://toolsday.io/episodes/travel.html">Toolsday.io – Travel Tools</a>
  </li>

  <li class="list-ui__item">
    <h3 class="list-ui__title">Interview</h3>
    <time>2015-03-10</time>: <a href="http://2015.cssconf.com.au/news/intro-harry-roberts">CSSConf Australia</a>
  </li>

  <li class="list-ui__item">
    <h3 class="list-ui__title">Podcast</h3>
    <time>2015-02-10</time>: <a href="https://beingfreelance.simplecast.fm/episodes/7356-css-wizard-harry-roberts-developing-consultant-magic">Being Freelance – CSS Wizard Harry Roberts – Developing Consultant Magic</a>
  </li>

  <li class="list-ui__item">
    <h3 class="list-ui__title">Podcast</h3>
    <time>2015-02-07</time>: <a href="http://www.unfinished.bz/101">Unfinished Business – Two old farts looking at their calendars</a>
  </li>

  <li class="list-ui__item">
    <h3 class="list-ui__title">Interview</h3>
    <time>2014-12-04</time>: <a href="http://colourspaces.co.uk/interview/harry-roberts/">ColourSpaces</a>
  </li>

  <li class="list-ui__item">
    <h3 class="list-ui__title">Video interview</h3>
    <time>2014-11-09</time>: <a href="https://www.youtube.com/watch?v=-7FqH6eT3dU">DaFED</a>
  </li>

  <li class="list-ui__item">
    <h3 class="list-ui__title">Interview</h3>
    <time>2014-10-02</time>: <a href="https://psdtowp.net/frontend-development-tools.html#harry-roberts">PSDtoWP – 3 beloved front-end development tools</a>
  </li>

  <li class="list-ui__item">
    <h3 class="list-ui__title">Podcast</h3>
    <time>2014-09-29</time>: <a href="http://unfinished.bz/88">Unfinished Business – A cage full of hungry dogs</a>
  </li>

  <li class="list-ui__item">
    <h3 class="list-ui__title">Podcast</h3>
    <time>2014-06-05</time>: <a href="https://cdnify.com/blog/css-wizardry-an-interview-with-css-expert-harry-roberts/">CDNify – An Interview with CSS Expert Harry Roberts</a>
  </li>

  <li class="list-ui__item">
    <h3 class="list-ui__title">Interview</h3>
    <time>2014-05-20</time>: <a href="http://insurancebyjack.co.uk/business-and-marketing/2014/05/20/how-to-get-started-with-public-speaking.html">Insurance By Jack – How To Get Started With Public Speaking</a>
  </li>

  <li class="list-ui__item">
    <h3 class="list-ui__title">Video interview</h3>
    <time>2014-04-24</time>: <a href="https://www.youtube.com/watch?v=O-YaF9qzqEs&t=13m30s">FOWD – 10 Minutes ’til the Future – Live from FOWD edition</a>
  </li>

  <li class="list-ui__item">
    <h3 class="list-ui__title">Interview</h3>
    <time>2014-04-04</time>: <a href="http://workspiration.org/harry-roberts">Workspiration</a>
  </li>

  <li class="list-ui__item">
    <h3 class="list-ui__title">Interview</h3>
    <time>2014-04-03</time>: <a href="http://www.sitepoint.com/css-framework-fortunes-failures-harry-roberts/">Sitepoint – CSS Framework Fortunes and Failures with Harry Roberts</a>
  </li>

  <li class="list-ui__item">
    <h3 class="list-ui__title">Interview</h3>
    <time>2014-03-14</time>: <a href="http://responsivedesignweekly.com/interview/responsive-interview-harry-roberts/">Responsive Design Weekly – Responsive Interview with Harry Roberts</a>
  </li>

  <li class="list-ui__item">
    <h3 class="list-ui__title">Interview</h3>
    <time>2014-02-15</time>: <a href="http://www.creativebloq.com/web-design/harry-roberts-big-css-working-sky-and-being-home-bird-21410693">net mag – Harry Roberts on big CSS, working for Sky, and being a home bird</a>
  </li>

  <li class="list-ui__item">
    <h3 class="list-ui__title">Interview</h3>
    <time>2014-01-06</time>: <a href="http://alexcarpenter.me/2014/01/06/interview-harry-roberts-of-css-wizardry">Alex Carpenter — Harry Roberts of CSS Wizardry</a>
  </li>

  <li class="list-ui__item">
    <h3 class="list-ui__title">Podcast</h3>
    <time>2013-11-08</time>: <a href="http://www.webpayload.com/podcast/harry-roberts-why-not-to-use-ids-the-tipping-point-inuit.css-frameworks">Web Payload – Why not to use IDS? The tipping point, inuitcss, and frameworks</a>
  </li>

  <li class="list-ui__item">
    <h3 class="list-ui__title">Podcast</h3>
    <time>2013-08-10</time>: <a href="http://unfinished.bz/31">Unfinished Business – Almost as controversial as putting the milk in first</a>
  </li>

  <li class="list-ui__item">
    <h3 class="list-ui__title">Interview</h3>
    <time>2013-05-15</time>: <a href="https://www.steer.me/blog/an-interview-with-harry-roberts">Steer – An interview with Harry Roberts</a>
  </li>

  <li class="list-ui__item">
    <h3 class="list-ui__title">Interview</h3>
    <time>2013-04-26</time>: <a href="http://www.webcoursesbangkok.com/blog/an-interview-with-harry-roberts-front-end-architect-and-speaker/">Web Courses Bangkok – An Interview With Harry Roberts – Front-end Architect and Speaker</a>
  </li>

  <li class="list-ui__item">
    <h3 class="list-ui__title">Interview</h3>
    <time>2013-04-25</time>: <a href="/2013/04/shame-css-full-net-interview/">net mag – Use shame.css to house hacks</a>
  </li>

  <li class="list-ui__item">
    <h3 class="list-ui__title">Podcast</h3>
    <time>2013-03-22</time>: <a href="http://upfrontpodcast.com/2013/03/22/episode9.html">Up Front Podcast – CSS with Harry Roberts</a>
  </li>

  <li class="list-ui__item">
    <h3 class="list-ui__title">Podcast</h3>
    <time>2012-11-29</time>: <a href="http://shoptalkshow.com/episodes/045-with-harry-roberts/">Shop Talk Show</a>
  </li>

  <li class="list-ui__item">
    <h3 class="list-ui__title">Interview</h3>
    <time>2012-10-15</time>: <a href="http://martinwolf.org/2012/10/15/interview-with-css-wizard-harry-roberts/">Martin Wolf – Interview with CSS wizard Harry Roberts</a>
  </li>

  <li class="list-ui__item">
    <h3 class="list-ui__title">Podcast</h3>
    <time>2012-08-30</time>: <a href="http://younggunsshow.com/episode/14/">Young Guns Show – Scalable CSS with Harry Roberts</a>
  </li>

  <li class="list-ui__item">
    <h3 class="list-ui__title">Interview</h3>
    <time>2012-03-06</time>: <a href="https://www.nublue.co.uk/blog/off-to-see-the-wizard/">Nu Blue – Off to see the Wizard</a>
  </li>


</ol>
