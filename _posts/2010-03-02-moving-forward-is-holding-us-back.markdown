---
comments: true
date: 2010-03-02 22:03:28
layout: post
slug: moving-forward-is-holding-us-back
title: Moving forward is holding us back
wordpress_id: 840
categories:
- Web Development
tag:
- Accessibility
- iPhone
- Optimisation
---

For years, web developers have been looking forward to that next feature, that new and monumental shift which has allowed them to break away from the shackles of obsolescence and adopt new and forward thinking technologies. But it is beginning to come full circle--that thirst for new technology has slowly brought us back to square one, reimposing the constraints that we have, for years, tried to rid ourselves of. _Moving forward is holding us back_.







Okay, okay. That was a very alarmist intro. There is no web developers' apocalypse around the corner (not that I know of anyway, please don't take anything I say about the apocalypse as read. I don't want that responsibility.), nor are we going to have to regress to using tables and spacer GIFs again. The real issue here is that with all this new technology that keeps emerging and exciting web developers is unwittingly reimposing the restrictions of yesteryear...





## Screen resolutions




Remember trying to break away from 800x600px?




With the movement toward a more mobile web, screen resolutions are in fact getting smaller. The iPhone's maximum resolution is 480px, increasingly popular netbooks are set at about 1024px wide. Such a shift toward mobile and portable devices mean that screen sizes are actually getting _smaller_.




In my opinion, [iPhones and other mobile devices should be handled separately](http://csswizardry.com/2010/01/iphone-css-tips-for-building-iphone-websites/), serving them device specific CSS. Netbooks on the other hand are still 'desktop' machines like any other. Their smallness is their key feature, and at 1024px horizontal resolution, they aren't that small anyway...




With [the 960 Grid System](http://960.gs/), and [an optimum line length of 52-78 characters](http://csswizardry.com/type-tips/#tip-09), sticking to 1024px shouldn't be that difficult anyway. I believe that although desktop monitor sizes are generally getting larger, other equally important technologies are creeping up, and as responsible developers you should cater for them. Sure you may want to start adopting [the 1080 grid](http://sam.brown.tc/entry/379/the-new-massive-blue), which is all well and good if you know your audience, but to cater for the majority, we're _not ready to burst 1024 yet_.





## Connection speeds




Remember building for 56k dial up connections? (I don't)




Where permanent and fixed connections are getting much faster, connections to mobile devices through means such as 3G are _much_ slower. The ability to optimise sites to be fast loading over such connections is getting more important. As edge-case resolutions are getting smaller, edge-case connections are getting slower. Much slower.





### A word on Flash




Remember [2Advanced](http://www.2advanced.com/)? A site of yesteryear...




Flash seems to be dying a death anyway these days, slowly being superseded by Javascript and Canvas et al. However, what was once a fantastically powerful technology has been ousted completely from Apple's _i_ products, making in an inviable option for content which needs to be universally accessible.





### A real life example?




Anyone with an iPhone will know what I mean--spending any amount of time on an iPhone loading poorly optimised sites is a real grind, and via some sensible optimisation these problems can be easily alleviated.




However, a more interesting example might be the one that happened to myself... When [we first started at Venturelab](http://csswizardry.com/2010/01/pastures-newfrom-sense-to-venturelab/) we really were building the company from the ground up. For the first few weeks we were without desktop machines _and_ internet. I was working on a 10.1″ netbook with a screen resolution of 1024x600px, and over a poor 3G connection via a dongle.




> "Accessibility isn't just about disabilities, it's about varying degrees of ability to access content."




Working in this manner really made me wonder whether enough people are delivering content in a manner which is accessible on numerous levels. Accessibility isn't just about disabilities, it's about varying degrees of ability to access content. As responsible developers your content should be accessible through a full spectrum of means and in an acceptable manner.




All it takes is some decent optimisation (which is also set to reap SEO benefits) and a reasonable page layout and you're already halfway there.
