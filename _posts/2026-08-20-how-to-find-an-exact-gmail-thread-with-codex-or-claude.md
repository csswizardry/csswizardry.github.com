---
layout: post
title: "How to Find an Exact Gmail Thread with Codex or Claude"
date: 2026-08-20 22:05:48
categories: Web Development
meta: "Use Gmail’s Message-ID to point Codex or Claude at one exact email and retrieve the complete conversation rather than a plausible result."
faq:
  - question: "How do I point Codex or Claude at one exact Gmail email?"
    answer: "Copy the email’s complete Message-ID from Gmail’s Show original view, then ask the agent to find that email and retrieve its Gmail thread."
  - question: "Where can I find a Gmail email’s Message-ID?"
    answer: "Open the email in Gmail on a computer, select More next to Reply, then select Show original. Find Message-ID and copy its complete value, including everything on both sides of the @ sign."
  - question: "Is Message-ID the same as a Gmail thread ID?"
    answer: "No. Message-ID identifies one particular email. Gmail’s own threadId identifies the conversation that Gmail has grouped around that email."
  - question: "Does knowing a Message-ID give an AI access to an email?"
    answer: "No. The agent still needs an authorised Gmail connection to an account containing the email. A Message-ID improves lookup; it is not a password or proof of who sent the message."
---

I was organising flights and accommodation around a [speaking
engagement](/speaking/) and wanted an LLM (I have a virtual personal assistant
in ChatGPT called _Luma_ who is trained on almost every facet of my working
life) to pull the dates, times, and locations from the relevant Gmail
conversation. It found an email about the correct event, but it wasn’t the
specific email I had in mind. The answer _looked_ realistic while relying on the
wrong source.

Subjects, senders, dates, and snippets are all useful ways to _search_
a mailbox, but they’re poor ways to name _an_ exact email. It turns out, the
solution was already inside the email itself: its
[`Message-ID`](https://www.rfc-editor.org/rfc/rfc5322.html#section-3.6.4).

A complete `Message-ID` gives the agent a precise email to find. Once Gmail
finds that message, the agent can use Gmail’s own `threadId` to open the
conversation around it. I tested this successfully with both Codex and Claude’s
Gmail integrations.

## How to Copy a Gmail Email’s `Message-ID`

In Gmail, on a computer:

1. Open the individual email you want the agent to use.
2. Next to _Reply_, select _More_ (the three dots), then _Show original_.
3. Find `Message-ID` and copy its complete value.

It should look something like this:

```text
<20260820.204553.7f3a@example.com>
```

Keep the whole thing, including everything before and after the `@`. I also
leave the angle brackets intact so there’s no ambiguity about what I copied.
Google actually documents the [_Show original_
route](https://support.google.com/mail/answer/29436?hl=en) for viewing an
email’s full header.

## Give This Prompt to Codex or Claude

Replace the invented `Message-ID` below with the one you copied:

```text
Using the connected Gmail account, locate the exact email whose complete
Message-ID header is <20260820.204553.7f3a@example.com>, then retrieve its
complete Gmail thread, including replies. Tell me the subject, sender, and date,
then summarise the conversation. Do not reply, forward, label, archive, or
delete anything.
```

That last sentence keeps lookup and action separate. Once the agent has found
the right conversation, ask whatever you actually wanted to know about it.

{% include promo.html %}

## Why `Message-ID` Works Better Than a Subject

While a subject _describes_ an email, it doesn’t identify it. Replies normally
reuse the same subject, unrelated conversations can share one, and a frequent
sender may account for hundreds of messages. And although a Gmail browser URL
can contain details that make sense to the interface, they aren’t useful to an
integration.

`Message-ID` was designed to give one particular version of one particular
message a machine-readable identity. Gmail even documents an
[`rfc822msgid:` search
operator](https://support.google.com/mail/answer/7190?hl=en-GB) specifically
for finding email with a given message-ID header.

The important sequence is:

0. Message-ID.
1. exact email,
2. Gmail threadId,
3. complete Gmail conversation.

The `Message-ID` identifies the email, **not the thread**. Gmail’s API returns
a separate `threadId` for the conversation containing that message. Its
[`threads` resource](https://developers.google.com/workspace/gmail/api/guides/threads)
then provides the messages Gmail has grouped into that conversation, in order.

The RFC gives us a portable way to refer to an email, and Gmail gives us its own
view of the surrounding conversation. There is no universal email-thread
identifier, and another provider may group the same messages differently.

## A Brief History of `Message-ID`

The field has been with us for more than four decades. [RFC
822](https://www.rfc-editor.org/rfc/rfc822.html#section-4.6.1) defined
`Message-ID` for Internet text messages in 1982. [RFC
2822](https://www.rfc-editor.org/rfc/rfc2822.html) replaced it in 2001, then
[RFC 5322](https://www.rfc-editor.org/rfc/rfc5322.html) replaced that in 2008
and remains the current Internet Message Format specification.

For the other RFC-curious people in the room, RFC 882 really does exist, but
it’s a 1983 document about [domain-name concepts and
facilities](https://www.rfc-editor.org/rfc/rfc882.html).

There’s also a lovely bit of standards language hiding here. RFC 5322 says
every message **SHOULD** have a `Message-ID`; in other words, you may still
encounter an old, broken, or unusual email without one. When a system does
generate an ID, however, that identifier **MUST** be globally unique, and the
system generating it must guarantee that uniqueness.

There’s no central registry handing these out. A sending system typically
combines a locally unique value with a domain it controls, which explains why
they often look vaguely like an email address while being quite meaningless to
a human:

```text
Message-ID: <20260820.204553.7f3a@example.com>
```

The angle brackets are part of the header’s syntax. The useful identity is the
complete value inside them; copying everything avoids any accidental damage.

## What `Message-ID` Can’t Promise

This method makes the target more precise, but it doesn’t make email infallible.
A mailbox may contain several stored copies of the same message carrying the
same ID, and broken software can create malformed or duplicate IDs. Gmail may
also return a whole conversation because one email inside it matched the
search — which, for our purposes, is actually exactly what we want.

A forwarded email will also normally be a new message with a new `Message-ID`.
If someone attaches the original email, the attached copy can retain its old
ID while the outer forwarding message has another. It’s safer to copy the ID
from the exact email you want to discuss than to assume one ID follows every
future version around.

Finally, a `Message-ID` is neither a password nor proof of authorship. The
agent still needs permission to read the connected Gmail account, and the
message still needs to exist there. The identifier helps it find the right
thing inside data it can already access; it grants no access of its own.

{% include cross-sell.html %}

When the exact source matters, preserve the complete `Message-ID`, ask the agent
to retrieve Gmail’s returned thread, then ask what you need to know. It takes
a little more effort than asking ChatGPT to look up a subject line, but it gives
the it one exact email to work from. Much safer!
