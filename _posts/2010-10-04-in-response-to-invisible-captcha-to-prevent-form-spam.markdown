---
comments: true
date: 2010-10-04 16:57:39
layout: post
slug: in-response-to-invisible-captcha-to-prevent-form-spam
title: In response to 'Invisible captcha to prevent form spam'
wordpress_id: 1429
categories:
- Web Development
tag:
- Accessibility
- Forms
- Spam
---

I seem to be doing a lot of these types of posts lately--responses to other articles. Today's is about an article pointed out to me by a friend and ex-colleague. The article deals with an interesting new way to [combat form spam by hiding a form field from human sight](http://www.ngenworks.com/blog/invisible_captcha_to_prevent_form_spam/), and working on the premise that a spam-bot (devoid of 'human sight') will continue to fill this field in, thus identifying it as being spam.



The more astute among you will have already spotted the flaw. Is it just spam-bots that can't see? Nope, exactly.

Screen-reader users can't see this form field in much the same way a spam-bot can't. Their screen-reader will read out the field's label and prompt them to fill it in.

The issue here is that humans aren't meant to know about this field, and anyone filling it in will flag their submission up (incorrectly) as being spam.

A way round this might be to label the field as 'Hey humans, do not put your email address in here!' and hope that they'll not be too confused by it, but that's unlikely because it's nothing _but_ confusing. We also have to assume here that not all screen-readers will ignore content with `display:none;` applied to it.

An interesting idea, but pretty inaccessible to a small minority of users. And users are more important than a lack-of-spam.
