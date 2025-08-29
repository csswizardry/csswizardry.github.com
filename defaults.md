---
layout: page
title: detault.css
page-class: page--defaults
meta: ""
permalink: /defaults.css/
lux: defaults
---

<h2>Inline/text-level elements</h2>

<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>

<p id="a"><a href="#">a</a> — link within text</p>

<p id="em-strong"><em>em</em>, <strong>strong</strong></p>

<p id="small-s"><small>small</small>, <s>strikethrough s</s></p>

<p id="cite-q">
  <cite>Citation title</cite>;
  inline quote: <q cite="https://example.com/quote-source">quoted content</q>
</p>

<p id="dfn-abbr">
  <dfn id="term-performance">performance</dfn> is key;
  <abbr title="Cascading Style Sheets">CSS</abbr> is everywhere
</p>

<p id="data-time">
  <data value="42">meaning</data> discovered on
  <time datetime="2025-08-29">29 Aug 2025</time>
</p>

<p id="code-kbd-samp-var">
  <code>code()</code> returns <var>x</var>;
  press <kbd>Ctrl</kbd>+<kbd>S</kbd>;
  sample output: <samp>OK</samp>
</p>

<p id="sub-sup">
  H<sub>2</sub>O, E = mc<sup>2</sup>
</p>

<p id="i-b-u">
  <i>i (alternate voice)</i>,
  <b>b (attention)</b>,
  <u>u (non-textual annotation)</u>
</p>

<p id="mark">
  <mark>mark (highlight)</mark> within a sentence
</p>

<p id="ruby">
  Ruby: <ruby>
    漢 <rt>kan</rt>
    字 <rt>ji</rt>
  </ruby>
</p>

<p id="ruby-advanced">
  Advanced ruby:
  <ruby>
    東京<rb></rb><rp>(</rp><rt>Tōkyō</rt><rp>)</rp>
    <rtc><rt>Capital</rt></rtc>
  </ruby>
</p>

<p id="bdi-bdo">
  Bidi isolate: <bdi>עברית</bdi>;
  override: <bdo dir="rtl">abc123</bdo>
</p>

<p id="span-br-wbr">
  Generic <span>span</span> and line break<br />
  here; soft wrap opp<wbr />ortu<wbr />nity
</p>

<p id="del-ins">
  Edits: <del datetime="2025-08-28">old text</del> → <ins datetime="2025-08-29">new text</ins>
</p>

<p id="meter-progress">
  Meter: <meter min="0" max="1" value="0.6">0.6</meter>;
  Progress: <progress value="30" max="100">30%</progress>
</p>
