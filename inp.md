---
layout: page
title: INP Simulator
page-class: page--inp-simulator
meta: "A small interactive demo for simulating sluggish interactions and delayed feedback when exploring INP."
permalink: /inp-simulator/
lux: INP Simulator
---

INP, or _Interaction to Next Paint_, is one of Google’s three [Core Web
Vitals](https://web.dev/articles/vitals): a measure of how responsive your site
feels once someone actually starts using it. Poor INP scores are a sure sign of
user frustration. This simulator allows you to experience the same kinds of
delays that your users are feeling.

If your site feels sticky, sluggish, or slow to react, this is exactly the sort
of problem I [help teams](/consultancy/) [diagnose and
fix](/performance-audits/). [Let’s talk!](/contact/).

<style>
  .c-inp-simulator-controls {
    padding: 24px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 3px;
    margin-bottom: 24px;
  }

  .c-inp-simulator-controls > :last-child {
    margin-bottom: 0;
  }

  .c-inp-simulator-slider {
    width: 100%;
    accent-color: #f43059;
  }

  .c-inp-simulator-delay {
    font-variant-numeric: tabular-nums;
    font-weight: 600;
  }

  .c-inp-simulator-delay-rating--good {
    color: #09ce6b;
  }

  .c-inp-simulator-delay-rating--needs-improvement {
    color: #ffa400;
  }

  .c-inp-simulator-delay-rating--poor {
    color: #ff4e42;
  }

  .c-inp-simulator-toggle {
    margin-bottom: 24px;
  }

  .c-inp-simulator-panel {
    padding: 24px;
    border: 1px solid #f43059;
    border-radius: 3px;
    background-color: #fff;
  }

  .c-inp-simulator-panel > :last-child {
    margin-bottom: 0;
  }

  .c-inp-simulator-panel[hidden] {
    display: none;
  }

  .c-inp-simulator-input {
    width: 100%;
    min-height: 7.5rem;
    resize: vertical;
  }

  .c-inp-simulator-output {
    min-height: 1.5em;
    margin-bottom: 0;
    color: #666;
  }

</style>

<div class="c-inp-simulator-controls">
  <p>
    <label for="jsInpDelay">Delay amount:</label>
    <input type="range" id="jsInpDelay" class="c-inp-simulator-slider" min="0" max="1500" value="200" list="jsInpDelayStops">
    <datalist id="jsInpDelayStops">
      <option value="200" label="Needs Improvement"></option>
      <option value="500" label="Poor"></option>
    </datalist>
    <span class="c-inp-simulator-delay"><output id="jsInpDelayValue" for="jsInpDelay">200</output>ms &ndash; <span id="jsInpDelayRating">Needs Improvement</span></span>
  </p>

</div>

<p class="c-inp-simulator-toggle">
  <button class="btn  btn--full" id="jsInpToggle" type="button" aria-controls="jsInpPanel" aria-expanded="false">Toggle interactive panel</button>
</p>

<div class="c-inp-simulator-panel" id="jsInpPanel" hidden>
  <p>
    <label for="jsInpInput">Start typing…</label>
    <textarea class="c-input-text  c-inp-simulator-input" id="jsInpInput" rows="4" cols="50" placeholder="Type here…"></textarea>
  </p>

  <p><strong>Mirrored output:</strong> <output id="jsInpOutput" class="c-inp-simulator-output"></output></p>
</div>

<script>
(() => {

  const clampDelay = (value) => Math.max(0, Math.min(1500, Number.parseInt(value, 10) || 0));

  function longTask(ms) {
    const start = Date.now();

    while (Date.now() - start <= ms) {
      true;
    }
  }

  const delayInput = document.getElementById('jsInpDelay');
  const delayValue = document.getElementById('jsInpDelayValue');
  const delayRating = document.getElementById('jsInpDelayRating');
  const toggle = document.getElementById('jsInpToggle');
  const panel = document.getElementById('jsInpPanel');
  const input = document.getElementById('jsInpInput');
  const output = document.getElementById('jsInpOutput');

  if (!delayInput || !delayValue || !delayRating || !toggle || !panel || !input || !output) return;

  let delay = clampDelay(delayInput.value);
  let timeoutId;

  const renderDelay = () => {
    let rating = 'Good';
    let ratingClass = 'c-inp-simulator-delay-rating--good';

    if (delay === 404) {
      rating = 'Interaction Not Found';
      ratingClass = 'c-inp-simulator-delay-rating--needs-improvement';
    } else if (delay > 500) {
      rating = 'Poor';
      ratingClass = 'c-inp-simulator-delay-rating--poor';
    } else if (delay >= 201) {
      rating = 'Needs Improvement';
      ratingClass = 'c-inp-simulator-delay-rating--needs-improvement';
    }

    delayValue.textContent = delay;
    delayRating.textContent = rating;
    delayRating.className = ratingClass;
  };

  renderDelay();

  // Allow folk to hot-link a specific delay
  const urlParams = new URLSearchParams(window.location.search);
  const delayParam = urlParams.get('delay');

  if (delayParam !== null) {
    delay = clampDelay(delayParam);
    delayInput.value = delay;
    renderDelay();
  }

  delayInput.addEventListener('input', () => {
    delay = clampDelay(delayInput.value);
    renderDelay();
  });

  toggle.addEventListener('click', () => {
    panel.hidden = !panel.hidden;
    toggle.setAttribute('aria-expanded', String(!panel.hidden));

    longTask(delay);

    if (!panel.hidden) {
      input.focus();
    }
  });

  input.addEventListener('input', () => {
    clearTimeout(timeoutId);

    const inputValue = input.value;

    timeoutId = window.setTimeout(() => {
      output.textContent = inputValue;
    }, delay);
  });

})();
</script>
