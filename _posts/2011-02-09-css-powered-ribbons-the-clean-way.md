---
comments: true
date: 2011-02-09 12:48:01
layout: post
slug: css-powered-ribbons-the-clean-way
title: CSS powered ribbons the clean way
wordpress_id: 2469
categories:
- Web Development
tag:
- CSS
- CSS3
- HTML
- Markup
---

I’ve started buying [.net magazine](http://www.netmag.co.uk/) again recently. I don’t normally but I was hoping it might help in [my search for a super-awesome new agency](http://csswizardry.com/2011/02/hire-me/). I was flicking through this month’s edition when I happened upon a Create a wraparound ribbon tutorial. I thought I’d give it a read as I really love little design conundrums and how other people solve them. I was a little surprised to see it had been done in five elements. I challenged myself to do it in one...

Okay, so I can’t re-publish or copy sections of the article but you can either buy .net and read it, or look at the tiny images on [the latest issue page](http://www.netmag.co.uk/zine/latest-issue/issue-212). It simply creates what is in the screenshot--a ribbon-like effect that sits outside and then ‘behind’ its content.

I’m not bashing the author’s work at all. It works and is--as far as I can see--pretty robust. However, it certainly doesn’t need five elements and _definitely_ no empty ones. His code was roughly:

    <body>
    
      <wrapper>
        <wrapper>
          <wrapper>
            <h2></h2>
          </wrapper>
          <empty></empty>
        </wrapper>
      </wrapper>
    
    </body>

Mine is:

    <body>
    
      <h2></h2>
    
    </body>

And it does _exactly the same thing_. The CSS that powers the original makes use of [manipulating the CSS borders-arrow behaviour](http://jonrohan.me/guide/css/creating-triangles-in-css/). I opted for a good old fashioned image. There’s nothing wrong with the border-arrow method but I’m orthodox, and manipulating borders to create what is essentially an image just feels really wrong to me. Use whichever you prefer, but remember that _images still count_!

The full code for my CSS powered ribbon is simply:

    <body>
      <h2></h2>
    </body>
    
    
    /*------------------------------------*\
    	MAIN
    \*------------------------------------*/
    html{
    	font-family:Cambria, Georgia, "Times New Roman", Times, serif;
    	background:#e4e3d5;
    	color:#666;
    	height:101%;
    }
    body{
    	width:940px;
    	padding:75px 10px;
    	margin:0 auto;
    	background:#fff;
    }
    
    /*------------------------------------*\
    	TYPE
    \*------------------------------------*/
    h2{
    	position:relative;
    	color:#fff;
    	background:#f43059;
    	font-size:1.5em;
    	float:left;
    	clear:both;
    	padding:10px 10px 10px 20px;
    	margin-left:-20px;
    	margin-bottom:20px;
    	text-shadow:0 -1px #d0284b, 0 1px #f96080;
    	
    	-moz-box-shadow:2px 2px 0 rgba(0,0,0,0.1);
    	-webkit-box-shadow:2px 2px 0 rgba(0,0,0,0.1);
    	-o-box-shadow:2px 2px 0 rgba(0,0,0,0.1);
    	box-shadow:2px 2px 0 rgba(0,0,0,0.1);
    }
    h2:before{
    	content:" ";
    	background:url(../img/css/ribbon.png);
    	display:block;
    	width:10px;
    	height:10px;
    	position:absolute;
    	bottom:0;
    	left:0;
    	margin-bottom:-10px;
    	z-index:-1;
    }

There we have it in four less elements. His five (discounting the `<body>`) to my one `<h2>`. 80% less code.

What this does is creates a white `<h2>` with a pink background, pulls the `<h2>` out of the content area with a negative margin and then places the image absolutely left-bottom of the `<h2>` in a `:before` pseudo-element. Job done.

## [Demo](/demos/css-powered-ribbons/)

I made [a demo](/demos/css-powered-ribbons/), also, which shows how this can be extended using some alternating `nth-of-type` styles. Feel free to pick it apart and see what does what. If any of the examples above seems out of context then view [the demo’s stylesheet](http://csswizardry.com/demos/css-powered-ribbons/css/style.css) and source for the comprehensive code.

## Final word

This works in IE 7 (without the `:before` and `:after` pseudo-elements), IE8, Firefox and Chrome, all with varying degrees of progressively enhanced niceties. Your code should never suffer for the sake of such tiny design elements. Keep it lean and use an aggressive approach to progressive enhancement in order to keep your markup at its best.

### Final final word

This isn’t a dig at the author of the article _or_ .net mag. This is simply an illustration of how progressive enhancement and some sensibility can solve the same problem in a far nicer, cleaner and more sensible fashion.

Furthermore, do feel free to use either the border ‘hack’ or the image method. There’s more than one way to skin a cat...
