---
layout: feature
title: "Supporters"
page-class: page--blog  page--supporters
meta: ""
main: ""
permalink: /supporters/
lux: "Supporters"
supporters:
- name: Joan Leon
  url: https://www.nucliweb.net/
  avatar: joan-leon.jpg
  tier: insider
- name: alessioalex
  url: https://github.com/alessioalex
  avatar: alessioalex.jpeg
  tier: subscriber
- name: Dogwonder Ltd
  url: https://richholman.com
  avatar: dogwonder.png
  tier: supporter
---

<style>

  .c-list-supporters {
    list-style: none;
    margin-left: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1.5rem;
    align-items: center;
  }

    .c-list-supporters__item {
      display: flex;
      align-items: center;
      width: 100%;
      position: relative;
    }

      .c-list-supporters__item::before {
          content: var(--tier);
          position: absolute;
          top:  0;
          left: 0;
          transform: translate(-50%, -50%);
          font-size: 1.5rem;
          line-height: 1;
          width: 1em;
          background-color: #f9f9f9;
          border-radius: 100%;
      }

      .c-list-supporters__link {
        text-decoration: none;
        display: flex;
        align-items: center;
        width: 100%;
        gap: 0.75rem;
      }

        .c-list-supporters__avatar {
          border-radius: 50%;
          flex-shrink: 0;
          width:  3rem;
          height: 3rem;
          object-fit: cover;
        }

  </style>

These wonderful people support CSS Wizardry.

<a href="https://csswizardry.gumroad.com/l/subscribe" class="btn  btn--positive"><b>Become a Supporter</b></a>
or
<button class="btn  btn--small" id="jsRandomiseSupporters">Shuffle<span class="hide"> Supporters</span></button>

- - -

{% assign shuffled = page.supporters | sample: page.supporters.size %}
<ul id="jsSupportersList" class="c-list-supporters">

  {% for person in page.supporters %}
    <li class="c-list-supporters__item" style="
      {% case person.tier %}
        {% when 'supporter' %}
          --tier: '☕️';
        {% when 'subscriber' %}
          --tier: '🧑‍💻';
        {% when 'insider' %}
          --tier: '🗝️';
        {% when 'seeker' %}
          --tier: '🔮';
        {% else %}
          --tier: '🤝';
      {% endcase %}
    ">
      <a href="{{ person.url }}" class="c-list-supporters__link">
        <img
          src="/img/content/subscribers/{{ person.avatar }}"
          alt="{{ person.name }}’s avatar"
          width="48"
          height="48"
          class="c-list-supporters__avatar"
        >
        {{ person.name }}
      </a>
    </li>
  {% endfor %}

</ul>

<script>
(() => {

  function randomiseSupporters() {
    const list = document.getElementById('jsSupportersList');
    const items = Array.from(list.children);

    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }

    items.forEach(item => list.appendChild(item));
  }

  randomiseSupporters();
  document.getElementById('jsRandomiseSupporters')
    .addEventListener('click', randomiseSupporters);

})();
</script>
