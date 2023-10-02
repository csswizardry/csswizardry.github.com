---
layout: post
title: "How to Clear Cache and Cookies on a Customer’s Device"
date: 2023-10-02 15:30:49
categories: Web Development
main: "https://csswizardry.com/wp-content/uploads/2023/10/clear-site-data.png?1"
meta: "There’s a super quick and easy way to clear cache on your customers’ devices. Are you using it yet?"
---

If you work in customer support for any kind of tech firm, you’re probably all
too used to talking people through the intricate, tedious steps of clearing
their cache and clearing their cookies. Well, there’s an easier way!

## Getting Someone to Clear Their Own Cache

Trying to talk a non-technical customer through the steps of clearing their own
cache is not an easy task—not at all! From identifying their operating system,
platform, and browser, to trying to guide them—invisibly!—through different
screens, menus, and dropdowns is a big ask.

Thankfully, any company that has folk in customer support can make use of a new
web platform feature to make the entire process a breeze: `clear-site-data`.

## `clear-site-data`

[A relatively new HTTP
header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Clear-Site-Data),
available in most modern browsers, allows developers to declaratively clear data
associated with a given origin[^1] via one simple response header:
`clear-site-data`.

```http
Clear-Site-Data: "cache", "cookies"
```

Any response carrying this header will clear the caches[^2] associated with that
_origin_, so all your customer support team needs now is a simple URL that they
can send customers to that will clear all of their caches for them.

### Preventing Malicious Clears

<figure>
<img src="{{ site.cloudinary }}/wp-content/uploads/2023/10/clear-site-data.png?1" alt="Screenshot of a fictional webpage showing three buttons, labelled ‘Clear cache’, ‘Clear cookies’, and ‘Clear all’." loading="lazy" width="1500" height="863" />
</figure>

While it probably wouldn’t be disastrous, it is possible that a bad actor could
link someone directly to `example.com/clear` and force an unsuspecting victim
into clearing their cache or cookies.

Instead, I would recommend that your `/clear` page contains links to URLs like
`/clear/cache`, `/clear/cookies`, `/clear/all`, each of which check and ensure
that the `referer` request header is equal to `https://www.example.com/clear`.
This way, the only way the clearing works is if the user initiated it
themselves. Something maybe a little like this:

```js
const referer = req.get('Referer');

if (referer != 'https://www.example.com/clear') {
  return;
} else {
  res.set('clear-site-data', 'cache');
}
```

## `clear-site-data` for Developers

Naturally, the use case isn’t just limited to customer support. As developers,
we may have messed something up and need to clear all visitors’ caches right
away. We could attach the `clear-site-data` header to all HTML responses for
a short period of time until we think the issue has passed.

Note that this will prevent anything from going into cache while active, so you
will notice performance degradations. While ever the header is live, you will be
constantly evicting users’ caches, effectively disabling caching for your site
the whole time. Tread carefully!

## Clearing Cache on iOS

Unfortunately, `clear-site-data` is not supported by Safari, and as all browsers
on iOS are just Safari under the hood, there is no quick way to achieve this for
any of your iPhone users. Therefore, my advice to you is to immediately ask your
customer <q>are you using an iPhone?</q>. If the answer is no, direct them to
your `clear/` page; if yes, then, well, I’m sorry. It’s back to the old
fashioned way.

[^1]: `https://www.bar.com` and `https://foo.bar.com` are different origins: an origin is scoped to scheme, domain, and port.
[^2]: [The spec](https://w3c.github.io/webappsec-clear-site-data/#clear-cache) dictates that any sort of cache associated with the given origin should be cleared, and not just [the HTTP cache](https://csswizardry.com/2019/03/cache-control-for-civilians/)
