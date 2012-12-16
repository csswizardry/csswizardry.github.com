---
comments: true
date: 2010-11-17 18:27:32
layout: post
slug: mark-up-a-semantic-accessible-progressively-enhanced-mobile-optimised-progress-bar-bonus-style-the-numbers-in-an-ordered-list
title: 'Mark up a semantic, accessible, progressively enhanced, mobile optimised progress
  bar (bonus: style the numbers in an ordered list!)'
wordpress_id: 1711
categories:
- Web Development
tag:
- Accessibility
- CSS
- CSS3
- HTML
- Markup
- Mobile
- Progressive Enhancement
- Semantics
---

How about that for an over-the-top title? But it's true, that's what we're going to be doing. It's been a while since my last post, unfortunately, so I thought I'd make up for it with this sizeable offering in which we will learn a lot of really great techniques in order to make something as simple as a progress bar. By which I mean a breadcrumb-esque meter of steps, such as you might find on a checkout process; we are making [this](/demos/progress-bar/):

[![Screenshot of the final product.](http://csswizardry.com/wp-content/uploads/2010/11/progress.jpg)](/demos/progress-bar/)



And in doing so we will cover:




	
  * Design and build a semantic, accessible and sensible progress bar.

	
  * Utilise the much underused method of styling page-specific elements based on their IDs.

	
  * Style the numbers in an ordered list!

	
  * Progressively enhance it with some CSS3.

	
  * Optimise it for mobile.





**N.B.** This article isn't so much about a progress bar, but more an illustration that best practices and more advanced techniques can be applied to even the most insignificant aspects of a build to create something awesome!





## Design and build



Let us assume the brief is this:

We require a numbered progress bar to indicate user location (past, current and future) during a checkout path on the OurService™ website. It must:





  * Be fully accessible.


  * Provide a section title with supporting information.


  * Highlight the user's current location in the process.


  * Be navigable.


  * Work on mobile devices.



The design, let's assume, is predefined. It looks as above, purely because it has to. The design is not the major focus of this article, the code and techniques are.



> "Code what you consume, not what you see."





### Design



The progress bar shall be a linear, left to right series of linked labels. Current location shall be indicated by a change in colour, progression onto the next step shall be indicated by an arrow.



### Build





For the purposes of this tutorial we shall assume the current page is the payment page.



One school of though I find invaluable when it comes to sensible and semantic builds is code what you consume, not what you see. This is a very broad generalisation but works for the most part. Code content independently of (and before you consider) coding any styles. Web development basics, but fundamental to web standards and progressive enhancement.

So, what are we consuming? It's an ordered list of steps which indicate location in a process.

Okay so first off we know we need an `<ol>` as this list has fixed and definite order. We also require titles and supporting copy for each item. As the titles and supporting copy require separation from one another we are going to wrap the titles in a `<span>`; a generic inline container. This leaves us with:


    
    <code><body id="payment-page">
      
      <ol id="progress">
    
        <li class="details-step">
          <a href="#">
            <span>Your details</span> 
            Name, email, address.
          </a>
        </li>
    	
        <li class="account-step">
          <a href="#">
            <span>Create account</span> 
            Username and custom URL.
          </a>
        </li>
    
        <li class="products-step">
          <a href="#">
            <span>Product options</span> 
            Choose your package.
          </a>
        </li>
    	
        <li class="payment-step">
          <a href="#">
            <strong>
              <span>Payment</span> 
              PayPal, or credit card.
            </strong>
          </a>
        </li>
    
        <li class="go-step">
          <a href="#">
            <span>Go!</span> 
            Start using OurService™
          </a>
        </li>
    
      </ol>
      
    </body></code>



There are a few things in this code which I've not yet mentioned, one is the ID on the `<body>`, another being the class on each `<li>` and the last being the `<strong>` wrapped around the payment page's text. I shall explain these next.



#### `<body>` ID and list item classes



A combination of an ID on the `<body>` and a class on a list item can allow you to know what the current page is. The CSS `#payment-page .payment-step{}` will target the payment section of the progress bar when it is on the payment page in the process. Similarly, `#go-page .go-step{}` will target the go item on the go page. I wrote [a much more in-depth article](http://www.venturelab.co.uk/devblog/2010/06/body-idsmaking-life-easier-for-yourself/) on this over at [Venturelab](http://www.venturelab.co.uk/).



#### The `<strong>` around the payment step's text





If you're determining current page programatically, one could argue inserting a `class="current"` on the relevant item. This is doable, but avoiding such a class name is far nicer.



As stated earlier we are assuming the current page to be the payment page. Now, we can style the current step on any page using CSS, as outlined above, however how would a user with styles disabled be able to tell what the current page is? How can we highlight this for those users?

Well the solution would be to programatically wrap a `<strong>` around the text on that page, undo the bolding effects with CSS for browsers with styles enabled, and allow people viewing unstyled content to see that the bolded item is the current page. This gives us:

![Unstyled progress bar](http://csswizardry.com/wp-content/uploads/2010/11/progress-unstyled.jpg)

As you can see, users with styles disabled can clearly see the current link is the bolded one, this makes the progress bar that little bit more  accessible to those who might need it.

So there we have it, the markup that powers the whole thing.



* * *





## Styling



Now to style this thing up. First off we'll look at the very basic CSS, and that alone:


    
    <code><span class="code-comment">/*------------------------------------*\
      MAIN
    \*------------------------------------*/</span>
    html{
      height:101%;
    }
    body{
      font-family:Calibri, Arial, Verdana, sans-serif;
      background:#fff;
      color:#88979e;
      width:940px;
      padding:10px;
      margin:0 auto;
    }
    
    
    <span class="code-comment">/*------------------------------------*\
      PROGRESS
    \*------------------------------------*/</span>
    #progress{
      list-style:none; <span class="code-comment">/* Remove the bullets */</span>
      float:left; <span class="code-comment">/* Make its width equal to the combined width of the items inside it */</span>
      margin-bottom:20px;
    }
    #progress li{
      float:left; <span class="code-comment">/* Stack them all up left */</span>
      font-size:0.75em; <span class="code-comment">/* Make the entire item smaller */</span>
      font-style:italic; <span class="code-comment">/* Make the entire item italic */</span>
    }
    #progress a{
      display:block;
      text-decoration:none;
      padding:10px 25px 10px 10px; <span class="code-comment">/* Padding to accomodate background image */</span>
      background:#7b8d77;
      color:#fff;
    }
    #progress span{
      font-size:1.333em; <span class="code-comment">/* Bring the size of the title only back up */</span>
      font-weight:bold;
      display:block;
      font-style:normal; <span class="code-comment">/* Undo the italics */</span>
    }
    #progress strong{
      font-weight:normal; <span class="code-comment">/* Remove the bolding for CSS enabled browsers */</span>
    }
    #progress a:hover{
      text-decoration:none;
    }
    #progress a:hover span{
      text-decoration:underline; <span class="code-comment">/* Underline the title on hover */</span>
    }
    #details-page .details-step a,
    #account-page .account-step a,
    #products-page .products-step a,
    #payment-page .payment-step a{
      background:url(../img/css/splitter.gif) right center no-repeat #a49d4d; <span class="code-comment">/* Arrow image on the current step */</span>
    }
    #go-page .go-step a{
      background:#a49d4d; <span class="code-comment">/* Arrow image not needed on final step, colour only */</span>
    }</code>



All of the above is very obvious, it is essentially just like creating a normal navigational menu, and gives us this:

![Basic progress bar](http://csswizardry.com/wp-content/uploads/2010/11/progress-basic.jpg)



## Styling numbers in ordered lists



Next up we style the numbers in the ordered list by using the very very useful and much unknown CSS counter module. Because you have such limited control over the appearance of your bullets in (ordered) lists they can be a pain to style. This pain is alleviated somewhat when using an unordered list as you can simply use a background image. It is an altogether different story when you're using an ordered list as the bullet needs to change with each list item.

What we do here is use CSS to do a very prog-like job; we get it to loop through each item in a parent container and then increment a user-defined value each time it encounters a specified child. Sounds Greek? [Read this](http://www.impressivewebs.com/css-counter-increment/).

Once we have this number available to us we use the CSS `:before` pseudo-element and the `content:;` property to insert the number before each item. How cool is that?!


    
    <code><span class="code-comment">/*------------------------------------*\
      PROGRESS
    \*------------------------------------*/</span>
    #progress{
      list-style:none;
      float:left;
      margin-bottom:20px;
      counter-reset:step; <span class="code-comment">/* Set up name of increment on parent */</span>
    }
    #progress li{
      float:left;
      font-size:0.75em;
      font-style:italic;
    }
    #progress a{
      display:block;
      text-decoration:none;
      padding:10px 25px 10px 30px; <span class="code-comment">/* Padding changed to 30px to accomodate number */</span>
      background:#7b8d77;
      color:#fff;
      position:relative; <span class="code-comment">/* Relative position to allow absolute positioning later on */</span>
    }
    #progress span{
      font-size:1.333em;
      font-weight:bold;
      display:block;
      font-style:normal;
    }
    #progress strong{
      font-weight:normal
    }
    #progress a:hover{
      text-decoration:none;
    }
    #progress a:hover span{
      text-decoration:underline;
    }
    #progress li a:before{
      counter-increment:step; <span class="code-comment">/* Increment the step on each occurance of this (pesudo) element */</span>
      content:counter(step); <span class="code-comment">/* Write out value of the increment */</span>
      text-align:center;
      font-weight:bold;
      position:absolute; <span class="code-comment">/* Position number */</span>
      top:50%;
      left:5px;
      margin-top:-8px;
    }
    #details-page .details-step a,
    #account-page .account-step a,
    #products-page .products-step a,
    #payment-page .payment-step a{
      background:url(../img/css/splitter.gif) right center no-repeat #a49d4d;
    }
    #go-page .go-step a{
      background:#a49d4d;
    }</code>



This then gives us this:

![Non-CSS3 progress bar](http://csswizardry.com/wp-content/uploads/2010/11/no-css3-progress.jpg)



* * *





## Progressively enhancing



Now for the CSS3 progressive bits:


    
    <code><span class="code-comment">/*------------------------------------*\
      PROGRESS
    \*------------------------------------*/</span>
    #progress{
      background:#7b8d77; <span class="code-comment">/* Give the ol a background to prevent white showing through behind the items' round corners (change value to #f00 to see what I mean) */</span>
    }
    #progress{
      -moz-border-radius:5px;<span class="code-comment">/* Round all corners of the progress bar */</span>
      -webkit-border-radius:5px;
      border-radius:5px;
    }
    #progress a{
      text-shadow:1px 1px 1px rgba(0,0,0,0.25); <span class="code-comment">/* A small text-shadow */</span>
      -moz-border-radius:5px 0 0 5px; <span class="code-comment">/* Round the top- and bottom-left corners */</span>
      -webkit-border-radius:5px 0 0 5px;
      border-radius:5px 0 0 5px;
    }
    #details-page .details-step a,
    #account-page .account-step a,
    #products-page .products-step a,
    #payment-page .payment-step a{
      background:url(../img/css/splitter.gif) right center no-repeat #a49d4d;
    }
    #progress .go-step a{
      -moz-border-radius:5px; <span class="code-comment">/* Round all corners of the final step */</span>
      -webkit-border-radius:5px;
      border-radius:5px;
    }</code>



The full, combined CSS for the progress bar so far is:


    
    <code><span class="code-comment">/*------------------------------------*\
      MAIN
    \*------------------------------------*/</span>
    html{
      height:101%;
    }
    body{
      font-family:Calibri, Arial, Verdana, sans-serif;
      background:#fff;
      color:#88979e;
      width:940px;
      padding:10px;
      margin:0 auto;
    }
    
    
    <span class="code-comment">/*------------------------------------*\
      PROGRESS
    \*------------------------------------*/</span>
    #progress{
      list-style:none;
      background:#7b8d77;
      float:left;
      margin-bottom:20px;
      counter-reset:step;
      -moz-border-radius:5px;
      -webkit-border-radius:5px;
      border-radius:5px;
    }
    #progress li{
      float:left;
      font-size:0.75em;
      font-style:italic;
    }
    #progress a{
      display:block;
      text-decoration:none;
      padding:10px 25px 10px 30px;
      background:#7b8d77;
      color:#fff;
      text-shadow:1px 1px 1px rgba(0,0,0,0.25);
      position:relative;
      -moz-border-radius:5px 0 0 5px;
      -webkit-border-radius:5px 0 0 5px;
      border-radius:5px 0 0 5px;
    }
    #progress span{
      font-size:1.333em;
      font-weight:bold;
      display:block;
      font-style:normal;
    }
    #progress strong{
      font-weight:normal
    }
    #progress a:hover{
      text-decoration:none;
    }
    #progress a:hover span{
      text-decoration:underline;
    }
    
    #progress li a:before{
      counter-increment:step;
      content:counter(step);
      text-align:center;
      font-weight:bold;
      position:absolute;
      top:50%;
      left:5px;
      margin-top:-8px;
      padding:2px 6px;
      background:rgba(0,0,0,0.25);
      
      -moz-border-radius:20px;
      -webkit-border-radius:20px;
      border-radius:20px;
    }
    #details-page .details-step a,
    #account-page .account-step a,
    #products-page .products-step a,
    #payment-page .payment-step a{
      background:url(../img/css/splitter.gif) right center no-repeat #a49d4d;
    }
    #go-page .go-step a{
      background:#a49d4d;
    }
    #progress .go-step a{
      -moz-border-radius:5px;
      -webkit-border-radius:5px;
      border-radius:5px;
    }</code>



Which, when coupled with the markup, gives this:

[![Screenshot of the final product.](http://csswizardry.com/wp-content/uploads/2010/11/progress.jpg)](/demos/progress-bar/)



* * *





### Recap



So, let's cover what we've done so far. We've:




	
  * Coded up a semantic progress bar (using an ordered list and correct generic elements).

	
  * Made it accessible (addition of the strong around the content for non-CSS browsers).

	
  * Styled it all up.

	
  * Made use of [the body ID trick](http://www.venturelab.co.uk/devblog/2010/06/body-idsmaking-life-easier-for-yourself/) to mark the current page.
	
	
  * Used CSS counters to style the numbers of an ordered list

	
  * Progressively enhanced it all to make it a little easier on the eyes.





## Mobile optimisation





For more information on mobile/iPhone optimised sites please see [my associated article](http://csswizardry.com/2010/01/iphone-css-tips-for-building-iphone-websites/).



Next up we need to optimise this thing for mobile. This couldn't be simpler. The key to optimising sites for mobile is linearise. Linearise everything.

In your markup, add this line to the `<head>` section, thus:


    
    <code><head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>Progress</title>
      <strong><meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;" /></strong>
      <link rel="stylesheet" type="text/css" href="css/new-style.css" />
    </head></code>



This tells the user agent that the viewport should be the same as the device's own screen-size, that it should be initially set to a scale of 1 (i.e. no scale), its maximum scale is set to 1, and that users can't scale themselves.

Now, add the following to the very end of your CSS file:


    
    <code><span class="code-comment">/*------------------------------------*\
    	MOBILE
    \*------------------------------------*/</span>
    @media (max-width: 480px){ <span class="code-comment">/* In any browser narrower that 480px... */</span>
    body{
    	width:auto; <span class="code-comment">/* Give the body a fluid width... */</span>
    	padding:5px; <span class="code-comment">/* And a slight padding */</span>
    }
    #progress{
    	width:auto; <span class="code-comment">/* Give the list a fluid width */</span>
    	background:none; <span class="code-comment">/* Remove the list's background... */</span>
    	float:none; <span class="code-comment">/* ...and float */</span>
    }
    #progress li{
    	float:none; <span class="code-comment">/* Remove list item float, causing them to stack */</span>
    	margin-bottom:1px; <span class="code-comment">/* Space them slightly */</span>
    }
    #progress a{
    	margin:0 10px; <span class="code-comment">/* Indent the left and right of each item by 10px */</span>
    	-moz-border-radius:5px; <span class="code-comment">/* Round all corners */</span>
    	-webkit-border-radius:5px;
    	border-radius:5px;
    }
    #details-page .details-step a,
    #account-page .account-step a,
    #products-page .products-step a,
    #payment-page .payment-step a,
    #go-page .go-step a{
    	background:#a49d4d; <span class="code-comment">/* Set the background of the current item */</span>
    	margin:0 auto; <span class="code-comment">/* Remove the 10px indent to show that the step is current */</span>
    }
    }</code>



Now, if you want to test this and don't have a smartphone, or haven't got this hosted in a live environment, simply resize your browser window right down until you see the change. I tend to use the Firefox Web Developer Toolbar addon to [resize the window to 480x800px](http://csswizardry.com/wp-content/uploads/2010/11/mobile-optimised-progress.jpg).

On the iPhone this now looks like:

![iPhone optimised progress bar](http://csswizardry.com/wp-content/uploads/2010/11/iphone-progress.jpg)



* * *





## [Demo](http://csswizardry.com/demos/progress-bar/)



For the full working demo head to [http://csswizardry.com/demos/progress-bar/](http://csswizardry.com/demos/progress-bar/). For the complete CSS (with reset) please see [http://csswizardry.com/demos/progress-bar/css/style.css](http://csswizardry.com/demos/progress-bar/css/style.css). Also, try using Firebug to change the `<body>`'s ID to `go-page`.



* * *





## Final words



As I stated previously, this article isn't so much about the progress bar itself. What I hope this article has shown is how something as small and trivial as a progress bar has a wealth of little nooks and crannies in which to immerse yourself. Semantics, accessibility, using `<body>` IDs to style current states without a `class="current"`, how to use CSS counters to style the numbers in an ordered list, how to progressively enhance lean markup, and how to optimise things for mobile in a flash.

All of the above skills are easily and quickly transferable. It might be a progress bar today, but what could it be tomorrow? Skills like the ones covered here give you the potential to make something great, out of something very very simple.
