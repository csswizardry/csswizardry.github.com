---
layout: feature
title: Web Performance Case Studies
page-class: page--case-studies
permalink: /case-studies/
meta: "Real-world performance wins: how I drove gains for ISO.org, Cloudinary, the BBC, and more."
lux: "Case Studies"
case_studies:
  - title: "ISO.org"
    url: "/case-studies/iso-org/"
    bg_color: "#e30010"
    description: "Performance Audit"
  - title: "Cloudinary"
    url: "/case-studies/cloudinary/"
    bg_color: "#3447c5"
    description: "Consultancy"
  - title: "Raspberry Pi & Code Club"
    url: "/case-studies/raspberry-pi-code-club-workshop/"
    bg_gradient: "linear-gradient(to bottom right, #c7053d 0%, #c7053d 50%, #393 50%, #393 100%)"
    description: "Workshop"
  - title: "Ocado"
    url: "/case-studies/ocado-workshop/"
    bg_color: "#a9ae00"
    description: "Workshop"
  - title: "NHS"
    url: "/case-studies/nhs-nhsx-elearning-platform/"
    bg_color: "#0072c6"
    description: "Development, Product, Performance"
  - title: "Better Collective"
    url: "/case-studies/better-collective/"
    bg_color: "#00a767"
    description: "Workshop, Consultancy"
  - title: "Madgex"
    url: "/case-studies/madgex-consultancy-workshop/"
    bg_color: "#009ddc"
    description: "Workshop, Consultancy"
  - title: "BBC"
    url: "/case-studies/bbc-workshop/"
    bg_color: "#ffdf43"
    title_color: "#000"
    description: "Workshop, Consultancy"
  - title: "BSkyB"
    url: "/case-studies/bskyb/"
    bg_color: "#01519c"
    description: "Development, Product, Workshop"
  - title: "CSS Wizardry"
    url: "/case-studies/css-wizardry/"
    bg_color: "#f43059"
    description: "Development, Product"
  - title: "Financial Times"
    url: "/case-studies/financial-times/"
    bg_color: "#fff1e0"
    title_color: "#010b13"
    description: "Workshop, Consultancy"
---

## Good Work for Good People

<div class="layout">
  <p class="layout__item  lap-and-up-one-half">In no particular order, a
     series of case studies covering a selection of recent work for
     consultancy, engineering, and workshop clients.</p
   ><p class="layout__item  lap-and-up-one-half">Don’t have time to read full case studies?
     Feel free to <a href="mailto:csswizardry@gmail.com?subject=Let%E2%80%99s%20work%20together">send
     me an email</a> and we can talk directly.</p>
</div>

<style>
  {% include css/components.feature-list.css %}
</style>

<ul class="feature-list" id="jsCaseStudiesList">
  {% for case_study in page.case_studies %}
  <li class="feature-list__item">
    <a
      href="{{ case_study.url }}"
      class="feature-list__link"
      style="
        {% if case_study.bg_color %}background-color: {{ case_study.bg_color }};{% endif %}
        {% if case_study.bg_gradient %}background-image: {{ case_study.bg_gradient }};{% endif %}
      "
    >
      <h2
        class="feature-list__title"
        {% if case_study.title_color %}
        style="color: {{ case_study.title_color }};"
        {% endif %}
      >
        {{ case_study.title }}
        <span class="feature-list__sub">{{ case_study.description }}</span>
      </h2>
    </a>
  </li>
  {% endfor %}
</ul>

<script>
  (() => {
    const list = document.getElementById('jsCaseStudiesList');
    const listItems = Array.from(list.children);

    for (let i = listItems.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [listItems[i], listItems[j]] = [listItems[j], listItems[i]];
    }

    list.innerHTML = '';
    list.append(...listItems);
  })();
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {% for case_study in page.case_studies %}
    {
      "@type": "ListItem",
      "position": {{ forloop.index }},
      "url": "{{ case_study.url | absolute_url }}",
      "name": "{{ case_study.title }}"
    }{% if forloop.last == false %},{% endif %}
    {% endfor %}
  ]
}
</script>
