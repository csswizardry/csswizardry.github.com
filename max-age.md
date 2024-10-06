---
layout: page
title: Fuzzy max-age Calculator
page-class: page--max-age
meta: "Cache-Control’s max-age isn’t the most intuitive way of defining time. This calculator has your back."
permalink: /max-age/
lux: max-age Calculator
---

[`Cache-Control`](/2019/03/cache-control-for-civilians/)’s
[`max-age`](/2023/10/what-is-the-maximum-max-age/)
directive accepts a duration in seconds, but seconds aren’t particularly
human-friendly. This calculator allows you to specify `max-age` in much more
palatable terms and end up with a compliant `max-age` format. Alternatively, you
can paste an existing `max-age` value and get its human-friendly equivalent.

**Give it a go!**

<style>
  .c-input-text--max-age {
    width: 100%;
  }
</style>

<label for="jsInput">Enter a time period (e.g. ‘a day’, ‘eight weeks’, ‘6 months’, ‘10 seconds’, ‘forever’) or seconds (e.g. 3600):</label>

<input type="text" class="c-input-text  c-input-text--max-age" id="jsInput" name="max-age-input" placeholder="e.g. two months and 30 seconds">

<ul>
  <li><code><strong>Cache-Control:</strong> </code><output id="jsOutput"></output></li>
  <li><strong>Human-friendly version:</strong> <output id="jsOutputHuman"></output></li>
</ul>

<script>
  // Set up a word–number map
  const wordToNumber = {
    'zero':      0,
    'one':       1,
    'two':       2,
    'three':     3,
    'four':      4,
    'five':      5,
    'six':       6,
    'seven':     7,
    'eight':     8,
    'nine':      9,
    'ten':       10,
    'eleven':    11,
    'twelve':    12,
    'thirteen':  13,
    'fourteen':  14,
    'fifteen':   15,
    'sixteen':   16,
    'seventeen': 17,
    'eighteen':  18,
    'nineteen':  19,
    'twenty':    20,
    'thirty':    30,
    'forty':     40,
    'fifty':     50,
    'sixty':     60,
    'seventy':   70,
    'eighty':    80,
    'ninety':    90,
  };

  // Conversion factors
  const secondsPerMinute = 60;
  const secondsPerHour   = 60  * secondsPerMinute;
  const secondsPerDay    = 24  * secondsPerHour;
  const secondsPerWeek   = 7   * secondsPerDay;
  const secondsPerMonth  = 30  * secondsPerDay; // Approximate for 30 days
  const secondsPerYear   = 365 * secondsPerDay;

  // Debounce function
  function debounce(fn, delay) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  function calculateMaxAge() {
    const input = document.getElementById('jsInput').value.trim().toLowerCase();
    const output = document.getElementById('jsOutput');
    const outputHuman = document.getElementById('jsOutputHuman');
    let maxAge = 0;

    // Check if input is a number (in seconds) to reverse engineer
    if (!isNaN(input) && input !== '') {
      const seconds = parseInt(input);
      output.textContent = 'max-age=' + seconds;
      outputHuman.textContent = humanizeTime(seconds);
      return;
    }

    // Error checking for invalid inputs
    if (!input) {
      output.textContent = 'Invalid time period: please try again.';
      return;
    }

    // Split input by ‘and’ to handle multiple time parts (e.g., ‘2 hours and 30 seconds’)
    const parts = input.split('and');

    parts.forEach(part => {
      if (part.includes('forever')) {
        maxAge = 2147483648; // Maximum allowed value for max-age
      } else if (part.includes('second')) {
        maxAge += parseTime(part) * 1; // Seconds
      } else if (part.includes('minute')) {
        maxAge += parseTime(part) * secondsPerMinute;
      } else if (part.includes('hour')) {
        maxAge += parseTime(part) * secondsPerHour;
      } else if (part.includes('day')) {
        maxAge += parseTime(part) * secondsPerDay;
      } else if (part.includes('week')) {
        maxAge += parseTime(part) * secondsPerWeek;
      } else if (part.includes('month')) {
        maxAge += parseTime(part) * secondsPerMonth;
      } else if (part.includes('year')) {
        maxAge += parseTime(part) * secondsPerYear;
      } else {
        output.textContent = 'Error: Unsupported time format.';
        return;
      }
    });

    // Ensure max-age doesn’t exceed the specced limit: https://csswizardry.com/2023/10/what-is-the-maximum-max-age/
    if (maxAge > 2147483648) {
      maxAge = 2147483648;
    }

    // Display the result
    output.textContent = 'max-age=' + maxAge;
    outputHuman.textContent = humanizeTime(maxAge);
  }

  function parseTime(input) {
    // Extract the number part (digit or word) and convert it to an actual
    // number
    const numberMatch = input.match(/(\d+|\b(?:one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety)\b)/);

    if (!numberMatch) {
      return 1; // Default to 1 if no number is provided (e.g., ‘a day’)
    }

    const numberString = numberMatch[0];
    let number = parseInt(numberString);

    // If the number is a word, convert it using the wordToNumber map
    if (isNaN(number)) {
      number = wordToNumber[numberString];
    }

    return number || 1; // Fall back to 1 if something goes wrong
  }

  // Function to convert seconds into human-friendly time format
  function humanizeTime(seconds) {
    const years = Math.floor(seconds / secondsPerYear);
    seconds %= secondsPerYear;
    const months = Math.floor(seconds / secondsPerMonth);
    seconds %= secondsPerMonth;
    const days = Math.floor(seconds / secondsPerDay);
    seconds %= secondsPerDay;
    const hours = Math.floor(seconds / secondsPerHour);
    seconds %= secondsPerHour;
    const minutes = Math.floor(seconds / secondsPerMinute);
    seconds %= secondsPerMinute;

    const parts = [];
    if (years) parts.push(`${years} year${years > 1 ? 's' : ''}`);
    if (months) parts.push(`${months} month${months > 1 ? 's' : ''}`);
    if (days) parts.push(`${days} day${days > 1 ? 's' : ''}`);
    if (hours) parts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
    if (minutes) parts.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
    if (seconds) parts.push(`${seconds} second${seconds > 1 ? 's' : ''}`);

    return parts.length > 0 ? parts.join(' and ') : '0 seconds';
  }

  // Attach the input event listener with debounce
  document.getElementById('jsInput').addEventListener('input', debounce(calculateMaxAge, 300));
</script>

---

<small><strong>Disclaimer:</strong> This `max-age` calculator aims to provide
convenient and human-friendly conversions between time periods and cache
durations. While I strive for accuracy, there may be edge cases or unexpected
behavior in certain input formats. As this tool interprets natural language and
various time units, I encourage users to verify important calculations and be
mindful of potential inaccuracies in highly complex inputs. I welcome feedback
and suggestions! If you encounter any issues, or if you’d like to contribute
improvements, please feel free to submit them to the GitHub repo at
[github.com/csswizardry/csswizardry.github.com](https://github.com/csswizardry/csswizardry.github.com/blob/master/max-age.md).</small>
