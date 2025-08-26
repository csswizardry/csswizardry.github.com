---
layout: post
title: "Low- and Mid-Tier Mobile for the Real World (2025)"
date: 2025-08-18 11:23:19
last_modified_at: 2025-08-20
categories: Web Development
main: "/wp-content/uploads/2025/08/moto-g4.jpg"
meta: "Discover the most representative low- and mid-tier mobile devices for web performance testing in 2025."
---

For the casual performance enthusiast, dedicated device testing is likely to be
overkill. However, anyone [working full time on site-speed](/services/) will
probably benefit from having at least one real device to hand.

I’m working on [a project](/case-studies/) at the moment where mobile INP is our
key focus, and while [Chrome Desktop’s
DevTools](https://csswizardry.gumroad.com/l/perfect-devtools) has been a great
starting point, replicating real-world mobile interactions and performance has
been a consistent challenge.

I decided to deep dive and look at what would constitute a real low- and
mid-tier mobile device in 2025, and how that maps to the Chrome DevTools
presets.

When assessing, I wanted to factor in a sensible mix of:

* **Distribution and market penetration:**
  * how likely is it that folk actually have one of these devices?
* **Device and hardware capabilities:**
  * arguably the most important part of the research.
* **Support and longevity:**
  * how long are these devices likely to be around?
* **Price-point:**
  * are they sensible and reasonable prices for consumers?

And remember, as we’ll look at next, trying to triangulate on one single device
per category is a little futile in itself—sheer device diversity and evolution
means that _anything_ we pick is going to be something of a compromise. My aim,
however, is to minimise that compromise as much as possible and distill our
choices down to a single representative device for each category. Can I do it?

## PageSpeed Insights and the Moto G Series

For the longest time, the Chrome team touted the Motorola _Moto G4_ as the
global baseline device. As a result, I bought a physical Moto G4 and used that
for my real-device testing, inspecting and tracing Chrome remotely. However,
seeing as the G4 was released over nine years ago and is currently locked to
Android 7.0, that soon stopped being entirely representative.

<p class="c-highlight">If you’d like to learn more about testing with real
devices, either Android or iOS, then <a href="/masterclasses/">arrange
a Masterclass</a>.</p>

<figure>
<img src="{{ site.cloudinary }}/wp-content/uploads/2025/08/moto-g4.jpg" alt width="1500" height="1125" loading="lazy">
<figcaption>My old Moto G4 is locked to Android 7 and can no longer be updated.</figcaption>
</figure>

In [Lighthouse
10](https://github.com/GoogleChrome/lighthouse/releases/tag/v10.0.0), the team
switched to an emulated _Moto G Power_ (though this was more of a viewport and
DPR change than hardware capabilities).

The key word is here _emulated_: there is no real device and all of the network
and CPU throttling is simulated, so actually listing any device at all, to me at
least, seems a little disingenuous. There is no Moto anything, so they’d be
better off saying ‘low-end mobile’, or words to that effect.

## Low- and Mid-Tier Mobile in DevTools

In [Chrome’s
DevTools](https://developer.chrome.com/docs/devtools/device-mode#throttle),
that’s exactly what they do! _Low-tier mobile_ defaults to a 6× CPU slowdown and
a 3G-like connection. _Mid-tier mobile_ is a 4× CPU slowdown and a Slow 4G-like
network. If you take the time to calibrate these presets yourself, you’ll get
something a little more bespoke. For me, on my development machine, a mid-tier
CPU is 2.9× slower than my machine’s true capabilities and low-tier mobile is
a staggering 9.1× slower. That’s quite a departure from the off-the-shelf 4× and
6×!

## Real Low- and Mid-Tier Mobile Devices

It’s important to remember that **‘low-tier’ does not mean old**. Likewise,
**‘mid-tier’ does not mean ‘a flagship from 2018’**. They are a device class in
their own right and it’s perfectly possible for your users to be using brand new
low-tier devices. As such, we needn’t look to the past for our benchmarks.

With that in mind, let’s go find ourselves some real low- and mid-tier devices
that we can use for real-world testing in 2025.

<div data-nosnippet>

<p>TL;DR: If you want broadly representative Android hardware for real-world web
performance testing in 2025, buy a <a
href="https://www.samsung.com/uk/smartphones/galaxy-a/galaxy-a15-5g-blue-black-128gb-sm-a156bzkdeub/"><strong>Samsung
Galaxy A15 5G (SM-A156x)</strong></a> (low-tier) and a <a
href="https://www.samsung.com/uk/smartphones/galaxy-a/galaxy-a54-5g-green-256gb-sm-a546blgdeub/"><strong>Samsung
Galaxy A54 5G (SM-A546x)</strong></a> (mid-tier). Both are mass-market, widely
ranged across regions, have multi-year software support, and map well to Chrome
DevTools’ <em>Low-</em> and <em>Mid-tier</em> presets.</p>

</div>

### Why the Samsung Galaxy A15 and A54?

* **Distribution and market penetration:**
  * Samsung leads global shipments and the _A_ series is the backbone of that
    share. These models are sold/carrier-ranged across Europe and North America,
    so you’re testing on what people actually use. [^1] [^2] [^3] [^4] [^5]
* **Device and hardware capabilities:**
  * Both are self-style low- and mid-range devices with hardware characteristics
    to match. [^9] [^10] [^11] [^12]
* **Support and longevity:**
  * Both lines ship with four generations of Android OS updates and five years
    of security patches, so they’ll have a decent shelf life. [^6] [^7] [^8]
* **Price-point:**
  Typically $199 for the A15 5G, well under the A54’s original $450 RRP. [^13]
  [^7]

Based on these factors alone, many devices might make the grade, so let’s look
in a little more detail.

## Real Low-Tier Mobile for 2025: Samsung Galaxy A15 5G

<figure>
<img src="{{ site.cloudinary }}/wp-content/uploads/2025/08/a15.avif" alt width="1440" height="920" loading="lazy" style="mix-blend-mode: darken;">
<figcaption>Image credit: samsung.com</figcaption>
</figure>

The A15 is one of the cheapest mainstream 5G handsets Samsung markets worldwide:
you’ll find it in Latin America, Africa, Europe, South Asia, and North America.
That ubiquity is quite rare; most lower-end Androids tend to be regional brands
(Infinix, Tecno, Lava, etc.).

The A15 also reflects what a budget-conscious, mainstream consumer gets in
2024/25: limited CPU/GPU headroom, middling storage I/O, and memory constraints.
Perfect for showing how web performance characteristics change when you head
toward the floor of mass-market devices.

* **Release date:** December 2023 <span id="jsA15Age"></span>
* **Cost at release:** $199
* **Chipset:** [MediaTek Dimensity
  6100+](https://www.mediatek.com/products/smartphones/mediatek-dimensity-6100plus)
  * MediaTek say themselves that the Dimensity 6100+ chip is <q>a highly capable
    5G SoC for mainstream and entry-5G smartphones…</q>. [^11] [^12]
* **Memory/Storage:** 4–8 GB LPDDR4X, UFS 2.2.
  *  Universal Flash Storage 2.2 is a almost exclusively found in low- to
     mid-tier devices. [^12]
* **Screen:** 6.5″ FHD+ 90Hz AMOLED.
  * Lots of pixels, but the 90Hz panel won’t hide any jank if you don’t meet
    your frame budget.
* **Support window:** four generations of OS updates and five years of security
  updates. [^8]
* **Why it’s representative:** It’s cheap, everywhere, and carrier-marketed in
  the US (T-Mobile, AT&T, Verizon), while being widely retailed across the
  UK/EU. That combination gives huge base coverage. [^3] [^4] [^5] [^13]

### Good Low-Tier Alternatives

* **Xiaomi Redmi 13C 5G:**
  * Dimensity 6100+ chipset
  * 6.74″ 90Hz screen
  * Aggressively priced and widely sold in Europe.
* **Moto G34 5G:**
  * Snapdragon 695 chipset
  * UK/EU ranging and very low retail price
  * Good for testing entry level but newer hardware. [^14] [^15]

## Real Mid-Tier Mobile for 2025: Samsung Galaxy A54 5G

<figure>
<img src="{{ site.cloudinary }}/wp-content/uploads/2025/08/a56.jpg" alt width="1440" height="960" loading="lazy" style="mix-blend-mode: darken;">
<figcaption>Image credit: samsung.com</figcaption>
</figure>

While not even ‘flagship-lite’—its Exynos 1380 chip and GPU are properly
mid-market—the A54 is one of [the world’s top-selling mid-tier
Androids](https://www.forbes.com/sites/johnkoetsier/2023/08/29/top-10-selling-smartphones-all-from-2-companies-apple-and-samsung/),
and it has staying power in both carrier contracts and SIM-free contexts.

Further, Samsung sells essentially the same A54 device everywhere, which makes
test data reproducible between Europe, India, Southeast Asia, Latin America,
and even the US. Many competitors (e.g. Xiaomi, OPPO, realme) tend to fragment
their mid-tiers by market.

Finally, both the A15, and A54 get Samsung’s long software support, meaning they
will likely still be in market for several years.

I actually went out and bought myself an A54 5G after conducting this research!

* **Release date:** March 2023 <span id="jsA54Age"></span>
* **Cost at release:** $450 US
* **Chipset:** [Exynos
  1380](https://semiconductor.samsung.com/processor/mobile-processor/exynos-1380/)
  * Samsung’s own chip is decidedly mid-range [^10] [^9]
* **Memory/Storage:** 6–8 GB, UFS 2.2
  * More RAM than the A15
  * Still much slower storage—think HTTP cache reads
* **Screen:** 6.4″ 120Hz AMOLED
  * Slightly smaller screen but faster refresh rate than the A15
* **Support window:** four generations of OS updates and five years of security
  updates. [^7]
* **Why it’s representative:** The A5<i>x</i> line is the volume mid-range many
  Europeans actually buy. If your site flies here, you’re golden on most
  mid-tier Androids.

<script>
  (() => {

    // Dynamically calculate device ages

    const monthsBetween = (from, to) => {
      let months =
        (to.getFullYear() - from.getFullYear()) * 12 +
        (to.getMonth() - from.getMonth());
      if (to.getDate() < from.getDate()) months -= 1;
      return Math.max(0, months);
    };

    const formatAge = (fromDate, now = new Date()) => {
      const totalMonths = monthsBetween(fromDate, now);
      const years = Math.floor(totalMonths / 12);
      const months = totalMonths % 12;
      return `${years} ${years === 1 ? 'year' : 'years'} and ` +
             `${months} ${months === 1 ? 'month' : 'months'}`;
    };

    const setAge = (id, year, month, day = 1) => {
      const el = document.getElementById(id);
      if (!el) return;
      const release = new Date(Date.UTC(year, month, day));
      el.textContent = `(${formatAge(release)} ago)`;
    };

    // Devices
    setAge('jsA15Age', 2023, 11);
    setAge('jsA54Age', 2023, 2);
  })();
</script>

### Good mid-tier alternatives

* **Galaxy A55 5G:**
  * Successor with Exynos 1480 chipset
  * Four generations of OS update and five years of security updates
  * Very similar to A54 [^16]
* **Redmi Note 13:**
  * Europe-wide launch
  * Note 13 5G/Pro 5G are common mid-range alternatives to Samsung in Spain/CEE
  * Useful to cross-check different SoC/storage stacks [^17] [^18] [^19]

## WebPageTest Equivalents

If you’d like to replicate these devices in
[WebPageTest](https://www.webpagetest.org/), you’ll need to pick from their
(slightly dated) device emulation list. While there aren’t any one-to-one
matches for current hardware, there are some pretty close proxies. I’d
recommend:

* **Galaxy A15 5G → Pixel 3A**
  * Modest CPU, 4 GB RAM, mid-2019 mid-tier silicon.
  * This is almost bang-on for what a budget A-series feels like today.

* **Galaxy A54 5G → Pixel 5**
  * Former ‘premium midrange’ Android.
  * Slightly older, but architecturally very close to the Exynos 1380.
  * Perfect stand-in for a global mid-tier.

It’s worth stressing that these aren’t perfect matches (they never will be), but
they’re close enough to give you realistic lab results when you can’t test
directly on a physical device.

{% comment %}
## Regional Variants

The **Samsung Galaxy A15 5G**  and **Galaxy A54 5G**  are sensible **global
defaults** because they’re widely available, reasonably priced, and benefit from
multi-year Android/One UI updates. Other brands and devices operate or fragment
their handsets incredibly regionally.

If you want region-specific options, I would consider:

### UK & EU

- **Xiaomi Redmi Note 13 (family)**: mass-market mid-tier across Europe; useful
  foil to Samsung for SoC/storage diversity.[^20] [^21]
- **Motorola Moto G34 5G**: budget 5G widely ranged by UK carriers; good
  “entry-level but new” proxy.[^22]

### North America

- **Samsung Galaxy A25 5G**: frequently carrier-ranged as an affordable step-up
  5G; keeps you in Samsung’s ecosystem while lowering headroom vs A54.[^23]
- **Moto G Power 5G (2024)**: common prepaid choice; sanity-checks lower-end
  Qualcomm/MediaTek stacks seen in the US market.[^24]

### India

- **Redmi Note 13 5G**: staple mid-tier with strong distribution and value
  pricing.[^25]
- **Motorola Moto G34 5G**: popular, aggressively priced; clean Android and
  broad offline availability.[^26]
- (A15 5G remains a valid low-tier global baseline here thanks to Samsung’s
  update policy and retail presence.)[^27]

### Southeast Asia

- **OPPO A58 (4G/5G variants)**: A-series is a volume workhorse in SEA retail;
  good to test OEM skin + storage I/O differences.[^28]
- **realme C55 / C65**: value-tier phones with wide offline reach; a realistic
  proxy for “cheapest recent Android” experiences.[^29]

### Latin America (incl. Brazil)

- **Motorola Moto G-series (e.g., G54/G34)**: Motorola remains strong in
  LATAM/Brazil; G-series is the everyday baseline.[^30]
- **Samsung Galaxy A15/A25**: ubiquitous across carriers/retailers; easy to
  source and maintain for multi-year testing.[^23]
{% endcomment %}

## Closing Thoughts

The web is used on billions of people, but not all devices are created equal. If
we’re serious about building a fast, accessible web, we need to calibrate our
benchmarks against hardware that people actually own and not just the flagships
we keep in our pockets and the presets that DevTools hands over.

Having just _one_ real device in your arsenal is a great place to start, and in
2025, that’s the Samsung Galaxy A15 5G for low-tier, and the Galaxy A54 5G for
mid-tier testing.

- - -

[^1]: [Canalys Q2 2025](https://www.canalys.com/newsroom/global-smartphone-market-q2-2025): Samsung #1 with 19%, lead underpinned by Galaxy A series
[^2]: [Canalys Europe (2024)](https://www.canalys.com/newsroom/europe-smartphone-market-q4-2024): Europe returned to growth; Samsung remained #1 with 46.4M shipments
[^3]: [T-Mobile US page for Galaxy A15 5G](https://www.t-mobile.com/cell-phone/samsung-galaxy-a15-5g)
[^4]: [AT&T prepaid page for Galaxy A15 5G](https://www.att.com/buy/prepaid-phones/samsung-galaxy-a15-5g-prepaid.html)
[^5]: [Verizon prepaid page for Galaxy A15 5G](https://www.verizon.com/smartphones/samsung-galaxy-a15-5g-prepaid/) (US only)
[^6]: [Samsung: ‘Four generations of OS upgrades’ and ‘five years of security updates’ for select Galaxy devices](https://news.samsung.com/global/samsung-sets-the-new-standard-with-four-generations-of-os-upgrades-to-ensure-the-most-up-to-date-and-more-secure-galaxy-experience)
[^7]: [Samsung Newsroom UK launch of A54/A34](https://news.samsung.com/uk/the-samsung-galaxy-a54-5g-and-galaxy-a34-5g-awesome-experiences-for-all): five years of security updates; four generations of OS updates. £449 UK RRP for A54.
[^8]: [Samsung product page confirms A15 5G is also offered with five years of security updates and four generations of OS updates](https://www.samsung.com/uk/smartphones/galaxy-a/galaxy-a15-5g-blue-black-128gb-sm-a156bzkdeub/)
[^9]: [Notebookcheck review of Galaxy A54 5G](https://www.notebookcheck.net/Samsung-Galaxy-A54-5G-review-A-powerful-mid-range-smartphone-with-many-upgrades.710600.0.html)
[^10]: [Wikipedia: Samsung Galaxy A54 5G, SoC (Exynos 1380), release, and core specs](https://en.wikipedia.org/wiki/Samsung_Galaxy_A54_5G)
[^11]: [Notebookcheck: Galaxy A15 5G review.](https://www.notebookcheck.net/Samsung-Galaxy-A15-5G-smartphone-review-Important-updates-for-the-affordable-phone.819065.0.html) Dimensity 6100+ class and pricing
[^12]: [Wikipedia: Galaxy A15 5G SoC, memory, storage, OS support summary](https://en.wikipedia.org/wiki/Samsung_Galaxy_A15)
[^13]: [TechAdvisor: UK launch pricing: A15 5G £199 (A15 4G £169)](https://www.techadvisor.com/article/2176227/samsung-galaxy-a15.html)
[^14]: [TechRadar: Moto G34 5G UK sale & £149.99 pricing](https://www.techradar.com/phones/moto-g34-review)
[^15]: [Vodafone UK press release: Moto G34 5G](https://www.vodafone.co.uk/newscentre/press-release/the-motorola-moto-g34-5g-is-now-available-on-vodafone-evo/)
[^16]: [Samsung newsroom](https://news.samsung.com/global/samsung-galaxy-a55-5g-and-galaxy-a35-5g-awesome-innovations-and-security-engineered-for-everyone): A55 5G continues five years of security updates and four generations of OS updates policy; Exynos 1480 and EU retail presence
[^17]: [Xiaomi global launch of Redmi Note 13 series](https://www.androidauthority.com/redmi-note-13-series-global-launch-3403087/)
[^18]: [Xiaomi official specs for Redmi Note 13 5G](https://www.mi.com/global/product/redmi-note-13-5g/specs/)
[^19]: [StatCounter vendor share Spain](https://gs.statcounter.com/vendor-market-share/mobile/spain): Samsung & Xiaomi dominate—useful proxy for EU mid-range tastes
{% comment %}
[^20]: [Xiaomi: Redmi Note 13 5G specs (global)]( https://www.mi.com/global/product/redmi-note-13-5g/specs/)
[^21]: [StatCounter: mobile vendor share, Europe]( https://gs.statcounter.com/vendor-market-share/mobile/europe)
[^22]: [Vodafone UK: Moto G34 5G ranged on Vodafone]( https://www.vodafone.co.uk/newscentre/press-release/the-motorola-moto-g34-5g-is-now-available-on-vodafone-evo/)
[^23]: [Samsung UK: Galaxy A25 5G product page]( https://www.samsung.com/uk/smartphones/galaxy-a/galaxy-a25-5g/)
[^24]: [Motorola US: Moto G Power 5G (2024)]( https://www.motorola.com/us/smartphones-moto-g-power-5g-2024/p)
[^25]: [Xiaomi: Redmi Note 13 5G specs (global/India availability varies)]( https://www.mi.com/global/product/redmi-note-13-5g/specs/)
[^26]: [Motorola India: Moto G34 5G]( https://www.motorola.in/smartphones-moto-g34-5g)
[^27]: [Samsung: OS/security update policy (multi-year updates for A-series)]( https://news.samsung.com/global/samsung-sets-the-new-standard-with-four-generations-of-os-upgrades-to-ensure-the-most-up-to-date-and-more-secure-galaxy-experience)
[^28]: [OPPO: A58 product page]( https://www.oppo.com/en/smartphones/series-a/a58/)
[^29]: [realme: C55 product page (C-series reference)]( https://www.realme.com/global/realme-c55)
[^30]: [StatCounter: vendor share, South America and Brazil]( https://gs.statcounter.com/vendor-market-share/mobile/south-america and https://gs.statcounter.com/vendor-market-share/mobile/brazil)
{% endcomment %}
