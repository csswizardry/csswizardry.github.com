---
comments: true
date: 2010-01-31 20:17:10
layout: post
slug: iphone-css-tips-for-building-iphone-websites
title: iPhone CSS—tips for building iPhone websites
wordpress_id: 489
categories:
- Web Development
tag:
- CSS
- iPhone
---

With the rapid rise in mobile browsers, it has probably never been more important to ensure your sites can be handled on these platforms. By far one of the most popular such browsers is Mobile Safari on the iPhone--this is one of the easiest browsers to develop for: it runs on Webkit (meaning a lot of rich CSS3 support) and it's only ever on one resolution and on one OS.





**N.B.** This article addresses iPhone development and iPhone development only. There is no reason why you cannot or should not develop for other mobile devices and platforms, Apple or otherwise. _This just happens to be an iPhone only post_.





The practical upshot of this is that you need to do no cross-browser testing, and can use all the [CSS3](/css3/) you like. This post will show you some of the basics of developing and designing websites for the iPhone and Mobile Safari.







## To start




The first thing to remember when developing a site to be displayed on an iPhone is that it is _very_ similar to designing a print stylesheet. _You need to linearise everything._ Make sure you have one column and everything is read in one line--straight from top to bottom. This will also put your markup writing skills to the test.





Some people don't agree with browser sniffing, but you need to detect the iPhone somehow.




This first bit of code is a PHP browser sniffing snippet, the actual CSS we'll use is not brought through via any server side code, we'll use some CSS media queries for that. What we'll use this code for is serving the markup with an iPhone specific meta tag and to shorten the current page's title.




    
    <code><?php
      $browser = strpos($_SERVER['HTTP_USER_AGENT'],"iPhone");
        if ($browser == true){
        $browser = 'iphone';
      }
    ?></code>





What the above code does is sees if the user agent contains any instance of 'iPhone' using [the `strpos` PHP function](http://uk2.php.net/strpos). Place this piece of code at the very top of your header include, before any other markup. In order to action something if the browser _is_ an iPhone, simply use the following bit of PHP logic in the place you want it to be initiated:




    
    <code><?php if($browser == 'iphone'){ ?>DO THIS<?php } ?></code>





We want people to save your site to their home screen...




Now, to put that snippet to use. We want to do two things with this little piece of PHP.




### Saving to the homescreen--shortening the page title


![An iPhone screenshot of the CSS Wizardry home screen icon](http://csswizardry.com/wp-content/uploads/2010/01/iphone-01.jpg)


First off, we'd like users to be able to save a link to your site on their home screen, this is simple enough, they simply need to select to do so from within the browser. However, if you look at the title of my home page alone, it's quite long: CSS Wizardry--CSS, Web Standards, Typography, and Grids by Harry Roberts. This would never fit underneath an icon without being shortened, so we need to serve a different title to the iPhone only. To achieve this we us the PHP snippet like so:




    
    <code><?php if($browser == 'iphone'){ ?>
      <title>Short iPhone only title</title>
    <?php }else{ ?>
      <title>Regular title</title>
    <?php } ?></code>





Now, both when browsing and saving your site to their home screen, a user will only ever see the shortened version.





#### The home screen icon




Actually making the icon is very simple. All you need to do is upload a 57x57px icon (usually a larger version of your favicon) to your server root. The icon must be named `apple-touch-icon.png`, and the iPhone will sort the rest out. See [my icon](http://csswizardry.com/apple-touch-icon.png).





### Stopping user pinch-zooming




The second use for the PHP snippet is to serve the iPhone a meta tag which disables the user pinch-zoom that Mobile Safari offers:




    
    <code><?php if($browser == 'iphone'){ ?>
      <meta name="viewport"
      content="width=device-width,
      minimum-scale=1.0, maximum-scale=1.0" />
    <?php } ?></code>





This means that, once we've linearised the content and sorted the font sizing, the user will only ever have to traverse down your page, much like a native app.





## Beginning styling




Some developers prefer to redirect iPhone users to a totally different version of the site--we won't be doing that.




We could use the PHP snippet to serve the iPhone a whole new stylesheet, or even send the user to a whole new site, rather like Twitter does ([m.twitter.com](http://m.twitter.com/)). However, there's a simpler way to do it using some CSS media queries. The advantage of this is that you're simply reusing old content and pre-written markup, and only ever using one CSS file.




The first thing you need to do is make sure the HTML link element that points to your main stylesheet does **not** have a `media` attribute:




    
    <code><link rel="stylesheet" type="text/css" href="/path/to/style.css" /></code>





Next, we're going to use [Quick Tip #15](http://csswizardry.com/quick-tips/#tip-15) that I wrote on my Quick Tips page. This means that we can just add our iPhone styles directly onto the end of the main stylesheet, and inherit all the styles set for desktop viewing:




    
    <code><span class="code-comment">/*--- Main CSS here ---*/</span>
    
    <span class="code-comment">/*------------------------------------*\
    	IPHONE
    \*------------------------------------*/</span>
    @media screen and (max-device-width: 480px){
    <span class="code-comment">/*--- iPhone only CSS here ---*/</span>
    }
    </code>





Now any CSS before the media query will be used across all platforms, but anything between the query will be used by any screen media with a maximum screen size of 480px (i.e. an iPhone).





### Things to remember




There are a few key things to remember when developing CSS for the iPhone:





	
  * Avoid explicit absolute widths--where possible you should use percentage widths.

	
  * Linearise everything--where possible, remove all floats. We want no content side-by-side unnecessarily.




The first thing to do is to set the `-webkit` proprietary CSS `-webkit-text-size-adjust` on the body which will resize the text for you, meaning you shouldn't have to touch any font sizes yourself. Also, if your body copy is set in a sans font such as Arial, now is your chance to use some Helvetica--for normal sites, Helvetica should not be used as body copy as it renders hideously on a PC. Take advantage of the fact that you can guarantee its presence and quality on an iPhone. Change your `font-family`:




    
    <code><span class="code-comment">/*--- Main CSS here ---*/</span>
    
    <span class="code-comment">/*------------------------------------*\
    	IPHONE
    \*------------------------------------*/</span>
    @media screen and (max-device-width: 480px){
    body{
      -webkit-text-size-adjust:none;
      font-family:Helvetica, Arial, Verdana, sans-serif;
      padding:5px;
    }
    }
    </code>





Above, I also added a small padding to make sure nothing touches the edge of the browser. All wrapper and content `div`s from here on in should be set to `width:100%;` making them the whole width of the screen, minus 10px.





### Structure





Now, as all layouts differ I am going to assume a similar one to mine, a simple two column set up with a logo and menu in the header. If your layout is different I am sure you can quite easily retrofit it. As I mentioned before, remove all stylistic `float`s and set all widths to `100%`. If you are using `div`s sensibly (i.e. for large bodies of content and not for nav items) this code should see you right for linearising the content:




    
    <code>@media screen and (max-device-width: 480px){
    body{...}
    div{
      clear:both!important;
      display:block!important;
      width:100%!important;
      float:none!important;
      margin:0!important;
      padding:0!important;
    }
    }
    </code>





That will force all `div`s to rest one on top of the other, full width and in order. You have begun linearising all your content.





### The navigation




If you have a navigation menu in which all the items are floated and made horizontal, insert the following:




    
    <code>@media screen and (max-device-width: 480px){
    body{...}
    div{...}
    #nav,#nav li{
      float:none!important;
      clear:both!important;
      margin:0 0 20px 0!important;
      display:block;
      padding:0;
      text-align:left!important;
      width:100%;
    }
    #nav{
      border:1px solid #ccc;
      padding:5px;
      -webkit-border-radius:5px;
    }
    #nav li{
      margin:0!important;
    }
    #nav li a{
      display:block;
    }
    }
    </code>



![A screenshot of the CSS Wizardry navigation menu on an iPhone](http://csswizardry.com/wp-content/uploads/2010/01/iphone-02.jpg)


This then will give you a vertical navigation menu which has a 100% width and the actual links themselves have a larger hit area (applied via `display:block;`), meaning that it's prominent at the top of each page and easier for users to select single items.





### Images




As images inherently have a set pixel width (i.e. their own width) there is a high chance that they will break out of the wrapper area (as a lot of images will be above 480px wide). To combat this simply add the following:




    
    <code>@media screen and (max-device-width: 480px){
    body{...}
    div{...}
    #nav,#nav li{...}
    img{
      max-width:100%;
      height:auto;
    }
    }
    </code>





Other than elements very specific to my site, that is pretty much [all the CSS I use to quickly size and linearise my content](/wp-content/themes/default/style.css). Any elements specific to your own site will obviously need considering on a case-by-case basis, but if you remember to not set absolute widths and to always linearise your content then it should be a doddle. Oh and it's a great time to use some guaranteed [CSS3](/css3/).





View [a screenshot of an entire page of CSS Wizardry](http://csswizardry.com/wp-content/uploads/2010/01/iphone-03.jpg) on an iPhone.





Do you have an iPhone version of your site? Have you any more tips you'd like to add? Please do so in the comments below.
