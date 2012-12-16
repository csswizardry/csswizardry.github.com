---
comments: true
date: 2011-06-11 11:48:26
layout: post
slug: introducing-igloos-inuit-css-gets-plugins
title: Introducing igloos—inuit.css gets plugins
wordpress_id: 2851
categories:
- inuit.css
---

[inuit.css](http://inuitcss.com) has been my answer to the CSS framework. I launched it just under two months ago to great reception, you guys have had some excellent suggestions and some really supportive feedback which has kept inuit.css going, with me updating it as often as I can and adding new features.

I'm very excited today to announce that inuit.css is getting plugins, and to keep the theme running **these plugins are called _igloos_**! jQuery has them, WordPress has them and now so does inuit.css.



## An igloo = an inuit.css plugin



I wrote a really rough spec for them this morning just to keep development on the straight and narrow but I thought I'd show it to you guys too.



It is important to note that inuit.css will have less features in the core framework after v2.0. The keywords and 12-col CSS will be removed from inuit.css and into their respective plugin files.



Here is the tiny spec:



* * *



**igloos -- CSS plugins for inuit.css**

_igloos are inuit.css specific plugins to extend and add functionality to the inuit.css framework._

**Naming conventions**

igloos shall be named thus: <igloo-name>.inuit.css. An igloo which provides annotation support for HTML5 figure elements would be named thus: annotate.inuit.css

**How they work**

An igloo is included in the page using a HTML `<link />` element. This `<link />` appears _after_ the `<link />` which includes inuit.css, eg:


    
    <code><link rel="stylesheet" href="/css/inuit.css" />
    <link rel="stylesheet" href="/css/annotate.inuit.css" /></code>



This does mean additional HTTP requests, however it does mean that we see the extension metaphor at work and the core inuit.css file remains unchanged, allowing for easier upgrades of the framework in the future.



* * *



In case you haven't guessed, one of the first igloos to come to inuit.css is the [annotated `<figure>` snippet](http://csswizardry.com/2011/06/annotated-figures-in-html5-and-css/) I wrote last week!

I'm working on writing igloos and also preparing them and v2.0 for release. They should be ready within the next week or so but to keep up to date follow [inuit.css on Twitter](http://twitter.com/inuitcss).



## They're live!



Some igloos are live and can be downloaded from [http://inuitcss.com/#igloos](http://inuitcss.com/#igloos)
