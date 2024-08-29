---
layout: post
title: "What Is the Maximum max-age?"
date: 2023-10-16 14:18:39
categories: Web Development
meta: "We usually set max-age directives to a year; can we go longer?"
faq:
  - question: "What is the maximum value for cache-control’s max-age?"
    answer: "Conventionally, people tend to use one year, which is 3,1536,000 seconds. However, the spec says that caches MUST honour up to 2,147,483,648 seconds, which, in a 32-bit system, is the largest possible integer that can be represented in binary form. That’s a whopping 68 years!"
---

If you wanted to cache a file ‘forever’, you’d probably use a `Cache-Control`
header like this:

```
Cache-Control: max-age=31536000
```

This instructs any cache that it may store and reuse a response for one year (60
seconds × 60 minutes × 24 hours × 365 days = **31,536,000 seconds**). But why
one year? Why not 10 years? Why not `max-age=forever`? Why not `max-age=∞`?!

I wondered the same. Let’s find out together.

<details>
  <summary>Like spoilers? See the answer.</summary>
  <p>It’s <code>2147483648</code> seconds, or 68 years. To find out why, read on!</p>
</details>

## `max-age`

`max-age` is a `Cache-Control` directive that instructs a cache that it may
store and reuse a response for <var>n</var> seconds from the point at which it
entered the cache in question. Once that time has elapsed, the cache should
either revalidate the file with the origin server, or do whatever any
[additional directives may have instructed it to
do](/2019/03/cache-control-for-civilians/). But why might we want to have
a `max-age` that equates to forever?

## `immutable`

If we’re confident that we can cache a file for a year, we must be also quite
confident that it never _really_ changes. After all, a year is a very long time
in internet timescales. If we have this degree of confidence that a file won’t
change, we can cache the file <i>immutably</i>.

`immutable` is a [relatively
new](https://mailarchive.ietf.org/arch/msg/httpbisa/6gS9zGCh4tIB3hKa67wsoHdb4gY/)
directive that effectively [makes a contract with the
browser](/2019/03/cache-control-for-civilians/#immutable) in which we as
developers tell the browser: <q>this file will never, ever change, _ever_;
please don’t bother coming back to the server to check for updates</q>.

Let’s say we have a simple source CSS file called `button.css`. Its content is
as follows:

```css
.c-btn {
  background-color: #C0FFEE;
}
```

Once our build system has completed, it will fingerprint the file and export it
with a unique hash, or _fingerprint_, in its filename. The MD5 checksum for this
file is `7fda1016c4f1eaafc5a4e50a58308b79`, so we’d probably end up with a file
named **`button.7fda1016.css`**.

If we change the colour of the button, the next time we roll a release, the
build step will do its thing and now, the following content:

```css
.c-btn {
  background-color: #BADA55;
}
```

…would have a checksum of `6bb70b2a68a0e28913a05fb3656639b6`. In that case, we’d
call the new file **`button.6bb70b2a.css`**.

Notice how the content of the original file `button.7fda1016.css` hasn’t
changed; `button.7fda1016.css` has ceased to exist entirely, and is replaced by
a whole new file called `button.6bb70b2a.css`.

Fingerprinted files never change—**they get replaced**. This means we can safely
cache any fingerprinted file for, well, forever.

But how long is forever?!

## `31536000` Seconds

Traditionally, developers have set ‘forever’ `max-age` values at `31536000`
seconds, which is a year. Why a year, though? A year isn’t forever. Was
`31536000` arrived at by agreement? Or is it specified somewhere? [RFC
2616](https://datatracker.ietf.org/doc/html/rfc2616#section-14.21) says of the
`Expires` header:

> To mark a response as “never expires,” an origin server sends an `Expires`
> date approximately one year from the time the response is sent. HTTP/1.1
> servers SHOULD NOT send `Expires` dates more than one year in the future.

Historically—_very_ historically—caching was bound to <q>approximately one year
from the time the response is sent</q>. This restriction was introduced by the
long defunct `Expires` header, and we’re talking about `max-age`, which is
a `Cache-Control` directive. Does `Cache-Control` say anything different?

## `2147483648` Seconds

It turns out there is a maximum value for `max-age`, and it’s defined in [RFC
9111’s
`delta-seconds`](https://datatracker.ietf.org/doc/html/rfc9111#section-1.2.2):

> A recipient parsing a delta-seconds value and converting it to binary form
> ought to use an arithmetic type of at least 31 bits of non-negative integer
> range. If a cache receives a delta-seconds value greater than the greatest
> integer it can represent, or if any of its subsequent calculations overflows,
> the cache **MUST** consider the value to be 2147483648 (2<sup>31</sup>) or the
> greatest positive integer it can conveniently represent.

The spec says caches should accept a maximum `max-age` value of
whatever-it’s-been-told, falling back to 2,147,483,648 seconds (which is 68
years), or failing that, falling back to as-long-as-it-possibly-can. This
wording means that, technically, there isn’t a maximum as long as the cache
understands the value you passed it. Theoretically, you could set
a `max-age=9999999999` (that’s 317 years!) or higher. If the cache can work with
it, that’s how long it will store it. If it can’t handle 317 years, it should
fall back to 2,147,483,648 seconds, and if it can’t handle _that_, whatever the
biggest value it can handle.

And why 2,147,483,648 seconds?

In a 32-bit system, the largest possible integer that can be represented in
binary form is `01111111111111111111111111111111`: a zero followed by 31 ones
(the first zero is reserved for switching between positive and negative values,
so `11111111111111111111111111111111` would be equal to -2,147,483,648).

## Does It Matter?

Honestly, no.

It’s unlikely that a year would ever be insufficient, and it’s also unlikely
that any cache would store a file for that long anyway: browsers periodically
empty their cache as part of their general housekeeping, so even files that have
been stored for a year might not actually make it that long.

This post was mostly an exercise in curiosity. But, if you wanted to, you could
go ahead and swap all of your `31536000`s for `2147483648`s. It works in [all
major browsers](https://cache-tests.fyi/).
