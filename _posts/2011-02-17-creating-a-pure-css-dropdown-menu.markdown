---
comments: false
date: 2011-02-17 09:47:44
layout: post
slug: creating-a-pure-css-dropdown-menu
title: Creating a pure CSS dropdown menu
wordpress_id: 2547
categories:
- Web Development
tag:
- CSS
- CSS3
- HTML
---

In redeveloping the Venturelab site we became increasingly aware that there was a lot of content that needed navigating extremely simply and fairly rapidly. We have so much to say and such a lot of content that the navigation of the site needed to be even more dynamic and encompassing than normal.





## [Demo](http://csswizardry.com/demos/css-dropdown/)





This article has been ported from the now-defunct Venturelab Devblog, where I had originally authored it.







Each page features a sub-navigation area, which links to all the other pages within that section of the website. This is great, and works perfectly, but in order to get to, say, [the FAQs](http://www.venturelab.co.uk/faq) page from the home page, you'd first have to go to [the about page](http://www.venturelab.co.uk/), then on to the FAQs from there. This is by no means unacceptable, but we like to go that extra step at Venturelab…







I was looking at the main menu of the site when inspiration struck. Something as common and simple as a series of dropdown menus under each meta menu item would improve the navigability and usability of the site massively. Also, they are incredibly simple to create, and here's where I teach you how…




## The concept




What a dropdown menu provides is a hierarchical overview of the subsections contained within the menu item that spawned it. Basically, it lists all the subsections within a section of a site when you hover your mouse cursor over it.





They are extremely useful in showing what a section of a site contains, and allowing you to access it from anyway else in that site, whether that be the parent page of that subsection, or a page in a different section altogether.




## The markup




A lot of dropdown menus rely on bulky, extraneous markup  and Javascript to work, ours will use only the cleanest HTML and some lean CSS, with some lovely progressive CSS3 for good measure.



    
    <code><ul id="nav">
    	<li>
    		<a href="#">Home</a>
    	</li>
    
    	<li>
    		<a href="#">About</a>
    		<ul>
    			<li><a href="#">The product</a></li>
    
    			<li><a href="#">Meet the team</a></li>
    		</ul>
    	</li>
    	<li>
    		<a href="#">Services</a>
    
    		<ul>
    			<li><a href="#">Sevice one</a></li>
    			<li><a href="#">Sevice two</a></li>
    
    			<li><a href="#">Sevice three</a></li>
    			<li><a href="#">Sevice four</a></li>
    		</ul>
    
    	</li>
    	<li>
    		<a href="#">Product</a>
    		<ul>
    			<li><a href="#">Small product (one)</a></li>
    
    			<li><a href="#">Small product (two)</a></li>
    			<li><a href="#">Small product (three)</a></li>
    			<li><a href="#">Small product (four)</a></li>
    
    			<li><a href="#">Big product (five)</a></li>
    			<li><a href="#">Big product (six)</a></li>
    			<li><a href="#">Big product (seven)</a></li>
    
    			<li><a href="#">Big product (eight)</a></li>
    			<li><a href="#">Enourmous product (nine)</a></li>
    			<li><a href="#">Enourmous product (ten)</a></li>
    
    			<li><a href="#">Enourmous product (eleven)</a></li>
    		</ul>
    	</li>
    	<li>
    		<a href="#">Contact</a>
    
    		<ul>
    			<li><a href="#">Out-of-hours</a></li>
    			<li><a href="#">Directions</a></li>
    
    		</ul>
    	</li>
    </ul></code>




As you can see here the markup is simply a series of nested `<ul>`s. No verbose IDs/classes, no `<div>`s, just rich, semantic code.




The `#nav` `<ul>` contains a series of `<li>`s, and any that require a dropdown then contain another `<ul>`. Notice the dropdown `<ul>`s have no classes on them--this is because we use the cascade to style these, keeping our markup even cleaner.





## The CSS




This is where the magic happens--we use CSS to transform a series of nested `<ul>`s into a smooth, easy to use, neat and self-contained dropdown menu.




    
    <code><span class="code-comment">/* BE SURE TO INCLUDE THE CSS RESET FOUND IN THE DEMO PAGE'S CSS */</span>
    <span class="code-comment">/*------------------------------------*\
    	NAV
    \*------------------------------------*/</span>
    #nav{
    	list-style:none;
    	font-weight:bold;
    	margin-bottom:10px;
    	<span class="code-comment">/* Clear floats */</span>
    	float:left;
    	width:100%;
    	<span class="code-comment">/* Bring the nav above everything else--uncomment if needed.
    	position:relative;
    	z-index:5;
    	*/</span>
    }
    #nav li{
    	float:left;
    	margin-right:10px;
    	position:relative;
    }
    #nav a{
    	display:block;
    	padding:5px;
    	color:#fff;
    	background:#333;
    	text-decoration:none;
    }
    #nav a:hover{
    	color:#fff;
    	background:#6b0c36;
    	text-decoration:underline;
    }
    
    <span class="code-comment">/*--- DROPDOWN ---*/</span>
    #nav ul{
    	background:#fff; <span class="code-comment">/* Adding a background makes the dropdown work properly in IE7+. Make this as close to your page's background as possible (i.e. white page == white background). */</span>
    	background:rgba(255,255,255,0); <span class="code-comment">/* But! Let's make the background fully transparent where we can, we don't actually want to see it if we can help it... */</span>
    	list-style:none;
    	position:absolute;
    	left:-9999px; <span class="code-comment">/* Hide off-screen when not needed (this is more accessible than display:none;) */</span>
    }
    #nav ul li{
    	padding-top:1px; <span class="code-comment">/* Introducing a padding between the li and the a give the illusion spaced items */</span>
    	float:none;
    }
    #nav ul a{
    	white-space:nowrap; <span class="code-comment">/* Stop text wrapping and creating multi-line dropdown items */</span>
    }
    #nav li:hover ul{ <span class="code-comment">/* Display the dropdown on hover */</span>
    	left:0; <span class="code-comment">/* Bring back on-screen when needed */</span>
    }
    #nav li:hover a{ <span class="code-comment">/* These create persistent hover states, meaning the top-most link stays 'hovered' even when your cursor has moved down the list. */</span>
    	background:#6b0c36;
    	text-decoration:underline;
    }
    #nav li:hover ul a{ <span class="code-comment">/* The persistent hover state does however create a global style for links even before they're hovered. Here we undo these effects. */</span>
    	text-decoration:none;
    }
    #nav li:hover ul li a:hover{ <span class="code-comment">/* Here we define the most explicit hover states--what happens when you hover each individual link. */</span>
    	background:#333;
    }</code>






Just a regular horizontal navigation menu…




Right, let's now break that down… The first section is fairly self explanatory--here we are just setting up a regular horizontal navigation menu, the same as any other. However, notice that selectors such as `#nav li` and `#nav li a` will select all list items and links in the dropdowns too. Here we're using the cascade sensibly.





One thing of note however is applying `position:relative;` to the list items, this allows us to use `position:absolute;` on the nested `<ul>`s later on.






### The nested lists



    
    <code>#nav ul{
    	background:#fff; <span class="code-comment">/* Adding a background makes the dropdown work properly in IE7+. Make this as close to your page's background as possible (i.e. white page == white background). */</span>
    	background:rgba(255,255,255,0); <span class="code-comment">/* But! Let's make the background fully transparent where we can, we don't actually want to see it if we can help it... */</span>
    	list-style:none;
    	position:absolute;
    	left:-9999px; <span class="code-comment">/* Hide off-screen when not needed (this is more accessible than display:none;) */</span>
    }</code>




Here we have the CSS that controls the `<ul>`s nested within the top level list items. Obviously we need to remove bullets with `list-style:none;`, then `position:absolute;` to position the dropdown above the list item that holds it.





A better, more accessible solution than `display:none;`…




The next line however is a point of interest. Usually, most people would use `display:none;` to hide the dropdown while it's not being used, but due to a lot of screenreaders ignoring anything with `display:none;` applied, this is very inaccessible. What we do instead is take advantage of the fact the `<ul>` is absolutely positioned and just position it `-9999px` off screen when not in use.





Next up we declare `opacity:0;` for the hidden `<ul>` and then a Webkit only declaration which will smoothly fade the `<ul>` in from fully transparent when hovered.





    
    <code>#nav ul li{
    	padding-top:1px; <span class="code-comment">/* Introducing a padding between the li and the a give the illusion spaced items */</span>
    	float:none;
    }
    #nav ul a{
    	white-space:nowrap; <span class="code-comment">/* Stop text wrapping and creating multi-line dropdown items */</span>
    }
    #nav li:hover ul{ <span class="code-comment">/* Display the dropdown on hover */</span>
    	left:0; <span class="code-comment">/* Bring back on-screen when needed */</span>
    }</code>




[![](http://www.venturelab.co.uk/devblog/wp-content/uploads/2010/06/gap.jpg)](http://www.venturelab.co.uk/devblog/wp-content/uploads/2010/06/gap.jpg) _Above: The 1px gap achieved by the `padding-top:1px;` applied to the list-item_





Here we set up the default list item and link styles. Notice the padding-top:1px; on the `<li>`. As all the colours etc are applied to the `<a>`, putting a 1px padding on the `<li>` in effect pushes the `<a>`--and therefore the colour--away from the edge of the list item, giving it the illusion that they are all separated. Interestingly, IE will not recognise the layout of the `<li>` when hovered, closing the dropdown again. To get round this, I added a [1×1px transparent `gif`](http://www.venturelab.co.uk/img/css/dot.gif) image as a background. Also here we remove the floats applied earlier.





Next, on `#nav ul a`, we apply `white-space:nowrap;` to prevent items wrapping onto two lines, ensuring a consistent display.




And this is where the magic happens…




The final bit of code is the bit that actually makes the dropdown appear when the list item that contains it is hovered. Now, as the `:hover` pseudo-class only works on the `<a>` element in IE6, the dropdowns won't work in _that_ browser. That can be alleviated by using a variety of fixes. However, as dropdowns are progressive, then we're okay with them not working. If you do however want to get this working in IE6 then my favoured solutions is by [using _behaviours_](http://www.xs4all.nl/~peterned/csshover.html).




    
    <code>#nav li:hover a{ <span class="code-comment">/* These create persistent hover states, meaning the top-most link stays 'hovered' even when your cursor has moved down the list. */</span>
    	background:#6b0c36;
    	text-decoration:underline;
    }</code>




This gets tricky, but it _should_ make sense.





This block of code here is where the hover styles come in, there's a bit of nifty code in there which controls what we'll call 'persisting hover states' on the top level item even when the user is hovering the dropdown items…




`#nav li:hover a` is what allows you to give the top level link a persisting hover state when hovering its 'children'. This works by styling every link inside a list-item when that list-item is hovered. This bit gets a bit tricky but bear with me:






  * The dropdown `<ul>` sits inside an `<li>`.



  * If you are hovering over a link (`<a>`) in a dropdown (`<ul>`) then you are also, at the same time, still hovering the top level list-item (`<li>`) as you are hovering content inside it.


  * Because you are technically still hovering the top level list-item, the `#nav li:hover a` remains true, leaving a persisting hover style on the top level list-item's `<a>` so…



  * …by hovering a dropdown item you are still hovering the top level list-item which means the cascade still styles all links _in_ that list-item. Phew!





    
    <code>#nav li:hover ul a{ <span class="code-comment">/* The persistent hover state does however create a global style for links even before they're hovered. Here we undo these effects. */</span>
    	text-decoration:none;
    }</code>




Here we override certain aspects of the persisting hover state so that the dropdowns differ from the top level link. In this case we merely decide not to underline them.




We also add a touch of Webkit goodness, telling the links to transform. `-webkit-transition:-webkit-transform 0.075s linear;` tells Webkit to animate the `-webkit-transform` we apply later on in the code over 0.075 seconds with no fade-in/out. Look out for the initiation of this in the next (and final) block of CSS.





    
    <code>#nav li:hover ul li a:hover{ <span class="code-comment">/* Here we define the most explicit hover states--what happens when you hover each individual link. */</span>
    	background:#333;
    }</code>






## Final word




[View demo…](/demos/css-dropdown/)




So, there you have it. A simple concept pulled off with some very lean markup and some clever CSS and progressive enhancement. It's totally accessible, the markup is semantic and sensible and it relies on no weighty Javascript libraries to work.




Hopefully my write-up makes sense. but if anything is unclear leave a comment and one of us in [the dev team](http://twitter.com/VenturelabDev) will try and set you right. Or, you could just copy/paste the code and hack it apart for yourselves.



