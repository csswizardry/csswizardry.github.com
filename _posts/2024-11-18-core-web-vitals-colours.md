---
layout: post
title: "Core Web Vitals Colours"
date: 2024-11-18 15:04:11:57
categories: Web Development
main: "https://csswizardry.com/wp-content/uploads/2024/11/cwv-colours.png"
meta: "If, like me, you frequently require the Core Web Vitals colour palete, here it is!"
---

If, like me, you frequently need the official[^1] Core Web Vitals colours for
slides and presentations, here you go:

<style>

  .c-cwv-colours {
    list-style: none;
    margin-left: 0;
    padding: 0;
    text-align: center;
    overflow: hidden;
    border-radius: 3px;
  }

    @media (min-width: 480px) {
      .c-cwv-colours {
        display: flex;
      }
    }

    .c-cwv-colours__colour {
      flex: 1;
      padding: 1.5rem;
    }

      .c-cwv-colours__title {
        display: block;
        margin-bottom: 1.5rem;
      }

      .c-cwv-colours__value {
        color: inherit;
        font-size: 1.5rem;
        line-height: 1;
      }

      .c-cwv-colours__values {
        list-style: none;
        margin-left: 0;
      }

</style>

<ul class="c-cwv-colours">

  <li class="c-cwv-colours__colour" style="background-color: #09ce6b; color: #f9f9f9;">
    <strong class="c-cwv-colours__title">Good</strong>
    <code class="c-cwv-colours__value">#09ce6b</code>
  </li>

  <li class="c-cwv-colours__colour" style="background-color: #ffa400;">
    <strong class="c-cwv-colours__title">Needs Improvement</strong>
    <code class="c-cwv-colours__value">#ffa400</code>
  </li>

  <li class="c-cwv-colours__colour" style="background-color: #ff4e42; color: #f9f9f9;">
    <strong class="c-cwv-colours__title">Poor</strong>
    <code class="c-cwv-colours__value">#ff4e42</code>
  </li>

</ul>

## More Colour Formats?

<strong style="color: #09ce6b;">Good</strong>

* RGB: `rgb(9, 206, 107)`
* HSL: `hsl(150, 92%, 42%)`
* HWB: `hwb(150, 4%, 19%)`

<strong style="color: #ffa400;">Needs Improvement</strong>

* RGB: `rgb(255, 164, 0)`
* HSL: `hsl(39, 100%, 50%)`
* HWB: `hwb(39, 0%, 0%)`

<strong style="color: #ff4e42;">Poor</strong>

* RGB: `rgb(255, 78, 66)`
* HSL: `hsl(4, 100%, 63%)`
* HWB: `hwb(4, 26%, 0%)`

* [^1]: ‘Official’ as in sampled from PageSpeed Insights and web.dev.
