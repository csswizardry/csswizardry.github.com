---
layout: post
title: "Low- and Mid-Tier Mobile for the Real World (2026)"
date: 2026-07-21 15:03:12
categories: Web Development
main: "/wp-content/uploads/2026/07/galaxy-a56.jpg"
meta: "The 2026 update to my real-world device testing recommendations paints a clearer picture than ever…"
---

Last year, I set out to find [one representative low-tier and one representative
mid-tier Android device for real-world web performance
testing](/2025/08/low-and-mid-tier-mobile-for-the-real-world-2025/). Back then,
I landed on the Samsung Galaxy A15 5G and Galaxy A54 5G. How much have things
changed in a year?

Then, as it is now, the point wasn’t to find the _slowest_ phones I could buy,
nor was it to find two old flagships whose best days were behind them. Remember,
**low-tier does not mean old, and mid-tier does not mean a flagship from 2018.**
These are current device classes used by real people, with their own constraints
around processing power, memory, storage, and price.

One year on, the method still holds up. Better yet, the market has given us much
stronger evidence to work with. Let’s see what the best, real devices are for
2026…

tl;dr: If you want broadly representative Android hardware for real-world web
performance testing in 2026, buy a **Samsung Galaxy A17 5G (`SM-A176x`; 4 GB
/ 128 GB)** for low-tier testing and a **Samsung Galaxy A56 5G (`SM-A566x`;
8 GB)** for mid-tier testing.

Both ranked among the world’s ten best-selling smartphones in Q1 2026, are
widely ranged, receive long-term software support, and offer a meaningful
separation in real browser performance[^1].

And, if a large proportion of your audience is in the Middle East, Africa, or
Latin America, I would also consider a **Galaxy A07 4G** as a regional,
entry-tier class of device.

## What Makes a Representative Test Device?

My original criteria considered four factors:

* **Distribution and market penetration:**
  * how likely is it that folk actually own the device?
* **Device and hardware capabilities:**
  * does the hardware authentically represent its intended tier?
* **Support and longevity:**
  * will the device remain relevant and secure for long enough to justify buying
    and maintaining it?
* **Price-point:**
  * is this a realistic consumer purchase at that tier?

For 2026, I’m adding a fifth consideration:

* **Reproducibility and variant clarity:**
  * can people in different markets buy comparable hardware, or does one model
    name conceal different internals?

This is to account for the fact that many manufacturers may vary device
internals based on geographic locale and market, so a Galaxy A17 to you may well
differ to a Galaxy A17 to me.

As ever, there is no single phone that can stand in for billions of Android
devices. A broadly distributed default is useful in the general sense, but your
own analytics should always get the final say. If most of your users are in one
market, or you know that a particular handset dominates your traffic, test there
too.

## DevTools Is an Approximation, Not an Answer

Chrome DevTools’ calibrated CPU throttling is a useful starting point. It can
approximate the CPU throughput of low- and mid-tier hardware _relative to your
development machine_, while its network presets can constrain latency and
bandwidth.

But DevTools now says this clearly: <q>Throttling is relative to your computer's
capabilities […] DevTools can't truly simulate the CPUs of mobile
devices, because the architecture of mobile devices is very different from that
of desktops and laptops</q>[^2].

Nor can a slowdown multiplier reproduce a phone’s available memory, storage
performance, thermal behaviour, scheduler, background processes, or
power-management decisions, so, again, you’re working through a very crude
proxy. In fact, in three notable projects since last year’s piece, I found
myself using—and getting markedly different results on—a physical device than
I do in DevTools.

## Real Low- and Mid-Tier Mobile Devices for 2026

<figure>
<table>
  <thead>
    <tr>
      <th>&nbsp;</th>
      <th>Low-tier</th>
      <th>Mid-tier</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Device</th>
      <td><strong>Galaxy A17 5G</strong></td>
      <td><strong>Galaxy A56 5G</strong></td>
    </tr>
    <tr>
      <th>Model family</th>
      <td><code>SM-A176x</code></td>
      <td><code>SM-A566x</code></td>
    </tr>
    <tr>
      <th>Recommended memory</th>
      <td>4 GB</td>
      <td>8 GB</td>
    </tr>
    <tr>
      <th>Storage</th>
      <td>128 GB; Notebookcheck’s tested unit used eMMC</td>
      <td>128/256 GB; Notebookcheck’s tested 128 GB unit used UFS 3.1</td>
    </tr>
    <tr>
      <th>Processor</th>
      <td>Exynos 1330</td>
      <td>Exynos 1580</td>
    </tr>
    <tr>
      <th>Display</th>
      <td>6.7″ AMOLED, 90 Hz</td>
      <td>6.7″ AMOLED, up to 120 Hz</td>
    </tr>
    <tr>
      <th>UK launch price</th>
      <td>£199</td>
      <td>£499 for consumer 8 GB / 256 GB</td>
    </tr>
    <tr>
      <th>Software support</th>
      <td>Six OS upgrades; six years of security updates</td>
      <td>Up to six OS/One UI generations; six years of security updates</td>
    </tr>
    <tr>
      <th>Q1 2026 global sales rank</th>
      <td>Fifth</td>
      <td>Seventh</td>
    </tr>
    <tr>
      <th>Speedometer 3</th>
      <td>7.07 in Chrome 140</td>
      <td>12.0 in Chrome 134</td>
    </tr>
  </tbody>
</table>
</figure>

The Speedometer figures come from separate Notebookcheck reviews, not
a controlled head-to-head test. The different Chrome versions alone make
a direct comparison difficult. Still, the A56 scoring roughly 70% higher is
useful corroboration that these two phones occupy meaningfully different
performance tiers[^3][^4].

### Samsung Again?

At first glance, choosing two Samsung A-series phones for a second year running
might look like lazy continuation, but I assure you, it isn’t!

I also considered current Redmi/Xiaomi, Motorola, Honor, OPPO/realme,
Nothing/CMF, OnePlus, and Pixel devices. Several are excellent regional or
price-specific alternatives—the Redmi A5 was the sole non-Samsung Android
handset in Counterpoint’s Q1 2026 global top ten—but none combines model-level
sales evidence, broad cross-regional availability, consistent hardware, long
support, and the right performance constraints as neatly as these two.

Samsung’s grip on this particular part of the Android market is extraordinary:
five of the six Android phones in that global top ten were Galaxy A-series
devices[^1], while the A56 was Europe’s best-selling smartphone of 2025[^10].
The repetition is in a way a finding, and not just an assumption carried over
from last year.

## Real Low-Tier Mobile for 2026: Samsung Galaxy A17 5G

<figure>
<img src="{{ site.cloudinary }}/wp-content/uploads/2026/07/galaxy-a17.jpg" alt="Samsung Galaxy A17 5G shown from the front, rear, and sides in blue, black, and grey" width="1000" height="799" loading="lazy">
<figcaption>Image: © Samsung Electronics, via <a href="https://news.samsung.com/de/smart-verlasslich-elegant-das-neue-samsung-galaxy-a17-5g">Samsung Newsroom Germany</a>.</figcaption>
</figure>

**The Galaxy A17 5G is an unusually clean low-tier recommendation.**

Samsung launched it in the UK in August 2025 at £199. The base configuration
combines 4 GB RAM and 128 GB storage with an Exynos 1330 processor, a 6.7″ 90 Hz
AMOLED display, six OS upgrades, and six years of security updates[^5]. It
subsequently launched nationwide in the US at $199.99, and official Samsung
pages range the A17 5G in India, Australia, South Africa, and Singapore
too[^6][^7].

That gives us the right kind of ubiquity: not jsut a very cheap phone that
sells heavily in one region, but a current low-tier device available across
a useful spread of markets.

More importantly, people are actually buying it. The Galaxy A17 5G ranked
**fifth among all smartphones globally in Q1 2026**, making it the
highest-ranked 5G Android handset in Counterpoint’s table[^1].

The hardware gives us authentic constraints rather than novelty for novelty’s
sake:

* **Release date:** August 2025 in the UK
* **Cost at release:** £199 UK; $199.99 US
* **Chipset:** Exynos 1330
* **Recommended configuration:** 4 GB RAM / 128 GB storage
* **Screen:** 6.7″ Super AMOLED, 90 Hz
* **Support window:** six OS upgrades and six years of security updates
* **Why it’s representative:** low launch price, broad international ranging,
  long support, and direct global sales evidence

Notebookcheck’s tested 128 GB unit used eMMC storage and scored 7.07 runs per
minute in Speedometer 3 under Chrome 140. The reviewer also found that browsing
could feel slow at times[^3]. That is useful real-world feedback: the A17 is not
simply a desktop CPU with a larger slowdown multiplier. Slow storage, limited
memory, and lower main-thread headroom all combine to be tangible.

One thing worth noting: I would not assume that every regional A17 5G has the
exact same storage technology just because Notebookcheck’s handset used eMMC.
Samsung’s configurations vary by market, so verify the exact model you are
buying. For a deliberately constrained test device, the **4 GB / 128 GB
variant** is the one I’d go for.

### Why Not the Galaxy A16 5G?

The A16 has had much longer to build an installed base and remains a perfectly
relevant phone to test if you already own one. But there is a difference between
asking <q>what do users have?</q> and <q>what should I buy now?</q>

For a new purchase in 2026, I’d favour the A17. It occupies the same £199 launch
position, is currently ranged, has a longer useful life ahead of it, and had
already reached fifth place globally within months of launch.

### The Galaxy A07 4G Complication

There is one solid argument _against_ the A17: the Galaxy A07 4G ranked
**fourth** in Q1 2026, making it the world’s best-selling Android handset in
Counterpoint’s table[^1].

Its sales contribution was particularly strong in the Middle East, Africa and
Latin America. That makes the A07 arguably a more realistic floor for sites with
a large audience **in those regions**.

Still, I would not replace the A17 with it as the single global default. The A07
4G is less far-ranged across the UK, Europe, and North America, while the A17
gives us a more reproducible cross-regional baseline. But this is precisely why
one global recommendation will always be a compromise.

If your analytics lean heavily towards emerging markets, add the A07 4G as
a **regional entry-tier device below the A17**. Your users are more important
than broad averages, _especially_ if they’re coming from emerging economies.

## Real Mid-Tier Mobile for 2026: Samsung Galaxy A56 5G

<figure>
<img src="{{ site.cloudinary }}/wp-content/uploads/2026/07/galaxy-a56.jpg" alt="Samsung Galaxy A56 5G shown from the front, rear, and side in pink, olive, graphite, and light grey" width="1000" height="519" loading="lazy">
<figcaption>Image: © Samsung Electronics, via <a href="https://news.samsung.com/uk/samsung-marks-a-step-forward-with-ai-for-everyone-by-introducing-new-galaxy-a56-5g-galaxy-a36-5g-and-galaxy-a26-5g">Samsung Newsroom U.K.</a>.</figcaption>
</figure>

**The Galaxy A56 5G is an even easier recommendation.**

Samsung launched the A56 in March 2025 with an Exynos 1580 processor, 8 GB RAM,
a 6.7″ 120 Hz AMOLED display, and up to six generations of OS upgrades plus six
years of security updates. The UK consumer model launched with 256 GB storage at
£499; the US later received 128 GB and 256 GB variants from $499.99[^8][^9].

Ordinarily, choosing a device released in the previous calendar year might look
a little conservative or cautious. Here, however, it is the evidence-backed
choice:

* Omdia named the Galaxy A56 the **top-selling smartphone model in Europe in
  2025**[^10].
* It then ranked **seventh globally in Q1 2026**[^1].

That is about as direct an answer to <q>how likely is it that folk actually have
one of these?</q> as we are going to get.

The hardware also provides a credible step above the A17 without drifting into
flagship-lite territory:

* **Release date:** March 2025
* **Cost at release:** £499 UK for the consumer 8 GB / 256 GB model
* **Chipset:** Exynos 1580
* **Memory:** 8 GB
* **Storage:** 128/256 GB; Notebookcheck’s tested 128 GB unit used UFS 3.1
* **Screen:** 6.7″ Super AMOLED, up to 120 Hz
* **Support window:** up to six OS/One UI generations and six years of security
  updates
* **Why it’s representative:** mass-market reach, exceptional European sales
  evidence, global top-ten placement, and a material hardware step above the A17

Notebookcheck’s 128 GB test unit used UFS 3.1 storage and scored 12.0 runs per
minute in Speedometer 3 under Chrome 134[^4]. The faster processor, double the
recommended RAM, and materially quicker storage give you a useful contrast with
the A17—not just in raw benchmark throughput, but in cache access, memory
pressure, and the amount of main-thread work the device can absorb before the
experience deteriorates.

### Why Not the Galaxy A57 5G?

Because **newest is not the same as most representative**.

The Galaxy A57 5G arrived in the UK on 10 April 2026, starting at £529 for the
8 GB / 256 GB model[^11]. As of 21 July 2026, that gives it only a little over
three months of market history. It may well become the obvious mid-tier
recommendation in time, but it does not yet have the A56’s installed-base or
sales evidence.

This is absence of evidence, not evidence that the A57 is unpopular. If
authoritative sales data later shows it displacing the A56, the recommendation
should change. But picking it today would reward catalogue freshness over the
very thing we are trying to measure: the hardware people actually use.

The A56 is not the recommendation despite being one generation old. It is the
recommendation because the market has already proved it representative.

## What About WebPageTest Equivalents?

WebPageTest’s open-source configuration does list its emulated devices. Each
preset is a small configuration of viewport width and height, device pixel
ratio, user agent, and a `throttle_cpu` multiplier[^12]. That gives us something
a little more useful than inferring from the names shown in the device dropdown.

The closest presets I would use are:

<figure>
<table>
  <thead>
    <tr>
      <th>Physical device</th>
      <th>Closest WebPageTest preset</th>
      <th>WebPageTest settings</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Galaxy A17 5G</th>
      <td>Google Pixel 5</td>
      <td>393 × 722 CSS px; DPR 2.75; 2× CPU slowdown</td>
    </tr>
    <tr>
      <th>Galaxy A56 5G</th>
      <td>Google Pixel 6 or Pixel 7</td>
      <td>412 × 786 or 412 × 783 CSS px; DPR 2.63; 1× CPU slowdown</td>
    </tr>
  </tbody>
</table>
</figure>

The A17 sits between the **Pixel 5** and Pixel 6 in general CPU benchmarks, but
closer enough to the Pixel 5 to drop down a preset; the A56 is broadly **Pixel
6/7**-class. That is useful cross-referencing, but not a calibration: Geekbench
is not a browser-based stress test, and WebPageTest’s slowdown is applied to its
desktop test agent rather than modelling any real phone’s SoC[^13].

There is another limitation in the configuration itself. Pixel 6, Pixel 7,
Galaxy S23, and every recent iPhone preset **all use `throttle_cpu=1`**: no
additional slowdown at all. WebPageTest therefore collapses several materially
different devices into the-performance-of-the-test-machine-they’re-running-on.
Its agent can normalise CPU throttling across test machines, but it cannot make
an unthrottled desktop behave like a particular phone[^14].

Further, the open source repository’s device file was last updated in December
2023, so names and values may change/have changed independently of this article.
A physical A17 and A56 remain the references; the WebPageTest presets are
convenient approximations when those phones are not available.

So, use these presets, but remember that these are the **closest WebPageTest
presets**, not equivalent devices. (The network profile remains a separate
choice and should be selected for the audience or demographic you’re testing
against; it is not part of either device preset.)

## Closing Thoughts

A representative test device is a solid reference point, but not always
universal truth. The Android market is far too broad, regional, and fragmented
for one phone to stand in for everyone.

But one well-chosen physical device is still vastly better than testing only on
the powerful laptop on your desk and the flagship phone in your pocket. It
exposes constraints that a slowdown multiplier cannot: memory pressure, slower
storage, thermal behaviour, power management, and the point at which an
interaction that felt fine on desktop turns into visible jank and annoyance.

For broadly representative Android testing in 2026, my choices are the **Samsung
Galaxy A17 5G (`SM-A176x`; 4 GB / 128 GB)** for low-tier and the **Samsung
Galaxy A56 5G (`SM-A566x`; 8 GB)** for mid-tier.

The A17 is current _and_ already widely owned. The A56 proves why the newest
model is not automatically the right one.

And if your audience is concentrated in emerging markets, the A07 4G is a useful
reminder that the most honest baseline may be regional rather than global.

Happy testing!

---

[^1]: [Counterpoint Research, global top-ten smartphones for Q1 2026](https://counterpointresearch.com/en/insights/iphone-17-global-best-selling-smartphone-in-q1-2026-top-10-take-25-percent-share): Galaxy A07 4G fourth, Galaxy A17 5G fifth, and Galaxy A56 5G seventh.
[^2]: [Chrome DevTools Performance reference](https://developer.chrome.com/docs/devtools/performance/reference#cpu-throttle): calibrated throttling can better match low- and mid-tier devices, but remains relative to the development computer and cannot truly simulate mobile CPU architecture.
[^3]: [Notebookcheck’s Galaxy A17 5G review](https://www.notebookcheck.net/Can-you-go-wrong-with-updates-until-2031-at-a-low-price-Samsung-Galaxy-A17-5G-smartphone-review.1123889.0.html): the tested 128 GB unit used eMMC storage and scored 7.07 in Speedometer 3 under Chrome 140.
[^4]: [Notebookcheck’s Galaxy A56 5G review](https://www.notebookcheck.net/Loads-of-innovations-in-the-premium-mid-range-Samsung-Galaxy-A56-5G-review.1020512.0.html): the tested 128 GB unit used UFS 3.1 storage and scored 12.0 in Speedometer 3 under Chrome 134.
[^5]: [Samsung UK’s Galaxy A17 5G launch announcement](https://news.samsung.com/uk/awesome-made-easy-samsung-introduces-the-galaxy-a17-5g): £199 launch price, Exynos 1330, 4 GB / 128 GB base configuration, 90 Hz display, and six-year support policy.
[^6]: [Samsung US’s Galaxy A17 5G availability announcement](https://news.samsung.com/us/samsung-welcomes-galaxy-a17-5g-galaxy-tab-a11-galaxy-ecosystem): nationwide availability from 7 January 2026 at $199.99.
[^7]: Official Samsung Galaxy A17 5G product pages for [India](https://www.samsung.com/in/smartphones/galaxy-a/galaxy-a17-5g-black-128gb-sm-a176bzklins/), [Australia](https://www.samsung.com/au/smartphones/galaxy-a/galaxy-a17-5g-black-128gb-sm-a176bzkcats/), [South Africa](https://www.samsung.com/za/smartphones/galaxy-a/galaxy-a17-5g-black-128gb-sm-a176bzkeafa/), and [Singapore](https://www.samsung.com/sg/smartphones/galaxy-a/galaxy-a17-5g-black-128gb-sm-a176bzkjxsp/). Configurations differ by market.
[^8]: [Samsung UK’s Galaxy A56 5G launch announcement](https://news.samsung.com/uk/samsung-marks-a-step-forward-with-ai-for-everyone-by-introducing-new-galaxy-a56-5g-galaxy-a36-5g-and-galaxy-a26-5g): Exynos 1580, 8 GB / 256 GB consumer configuration at £499, display, and update policy.
[^9]: [Samsung US’s Galaxy A56 5G availability announcement](https://news.samsung.com/us/samsung-new-galaxy-a56-a36-a26-5g-marks-step-forward-with-ai-for-everyone): nationwide availability, $499.99 starting price, and 128/256 GB variants.
[^10]: [Omdia’s European smartphone-market analysis for 2025](https://omdia.tech.informa.com/pr/2026/feb/apple-and-honor-claim-record-market-shares-as-europes-smartphone-shipment-dips-1percent-in-2025): the Galaxy A56 was Europe’s top-selling smartphone model.
[^11]: [Samsung UK’s Galaxy A57 5G availability announcement](https://news.samsung.com/uk/samsung-galaxy-a57-5g-and-galaxy-a37-5g-now-available): available from 10 April 2026, starting at £529 for 8 GB / 256 GB.
[^12]: [WebPageTest’s open-source `mobile_devices.ini`](https://github.com/catchpoint/WebPageTest/blob/master/www/settings/mobile_devices.ini): the current Pixel 5 preset uses a 393 × 722 viewport, DPR 2.75, and 2× CPU slowdown; Pixel 6 and Pixel 7 use 412-pixel-wide viewports, DPR 2.63, and no additional CPU slowdown.
[^13]: Notebookcheck measured the [Galaxy A17 5G](https://www.notebookcheck.net/Can-you-go-wrong-with-updates-until-2031-at-a-low-price-Samsung-Galaxy-A17-5G-smartphone-review.1123889.0.html) at 988 single-core and 2,093 multi-core in Geekbench 6.7. Geekbench’s aggregated results place the [Pixel 5](https://browser.geekbench.com/android_devices/google-pixel-5) at 789/1,864, the [Pixel 6](https://browser.geekbench.com/android_devices/google-pixel-6) at 1,379/3,194, the [Pixel 7](https://browser.geekbench.com/android_devices/google-pixel-7) at 1,416/3,395, and the [Galaxy A56](https://browser.geekbench.com/android_devices/samsung-galaxy-a56) at 1,320/3,753. These figures establish only broad performance classes.
[^14]: [WebPageTest agent test options](https://github.com/catchpoint/WebPageTest.agent/blob/master/docs/test_options.md): `throttle_cpu` is a multiplier applied to Chrome and CPU normalisation adjusts it for the test machine. [The configuration history](https://github.com/catchpoint/WebPageTest/commits/master/www/settings/mobile_devices.ini) shows its latest change on 12 December 2023.
