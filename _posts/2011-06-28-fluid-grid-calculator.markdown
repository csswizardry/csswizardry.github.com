---
comments: true
date: 2011-06-28 18:30:03
layout: post
slug: fluid-grid-calculator
title: Fluid grid calculator
wordpress_id: 2934
categories:
- Projects
- Web Development
tag:
- Grids
- Responsive web design
---

What with [Ethan's book](http://www.abookapart.com/products/responsive-web-design) and [A List Apart](http://www.alistapart.com/articles/responsive-web-design/) article the whole community is responsive design mad. Which is a good thing... I've been looking at redesigning CSS Wizardry onto a fluid grid and also adding a custom fluid-grid-igloo builder for [inuit.css](http://inuitcss.com).



## [Fluid grid calculator](/fluid-grids/)



In doing these I realised how time consuming it is actually working out your percentages. I wrote a little proof of concept PHP script the other day and, as a test-case, decided to run the grid system we use at work through it. The outcome was surprisingly good so I got the script finished!

All I needed was to test, test and test it then pop a UI on it and bam! Here it is, my [fluid grid calculator](/fluid-grids/).



## How it works



You give the calculator the number of columns you want your grid system to have, how wide you want one of those columns to be and, finally, how wide you want the gaps between each column (gutters) to be.

Given just these three bits of information the script gives you back a full stylesheet--which you can download--which contains the measurements for all of your possible grid sizes, their gutters and their containers.

Now, this is in Super-Uber-Pre-Alpha™ so please report any bugs to me as soon as you can, preferably via [Twitter](http://twitter.com/csswizardry).



### A note on inuit.css



As I mentioned I am currently working on integrating this calculator into [inuit.css](http://inuitcss.com) so you can build your own custom fluid grids. However, there is _a lot_ of work involved in removing old code and building a builder that will construct a perfect igloo. I'm working on it, but it will take time. To be the first in the know follow [the inuit.css Twitter account](http://twitter.com/inuitcss).

In the meantime you can simply paste your [generated grid system](/fluid-grids/) into your own inuit.css extension.
