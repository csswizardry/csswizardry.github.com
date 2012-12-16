---
comments: true
date: 2010-12-02 19:35:31
layout: post
slug: let-it-snow
title: Let it snow!
wordpress_id: 1817
categories:
- Web Development
tag:
- CSS
- CSS3
- PHP
- Progressive Enhancement
---

Remember the snowy websites of the late 90s? The ones that cropped up around Christmas time and probably had a sleigh following the mouse cursor? Me too; horrible weren't they? However--given [the recent weather the UK has had](http://www.bbc.co.uk/news/uk-scotland-11901718)--I have decided to give them a 2010 revival. That is to say no nasty Javascript, and some not-too-unsightly markup! [Without further ado: Let it snow!](/demos/snow/)



## Demo





We also have [a daytime version](/demos/snow/?time=day)!



First off, [look at the demo](/demos/snow/) in IE8 or Firefox, _then_ in Chrome or Safari (i.e. non-Webkit, then Webkit).

In Firefox you should see a series of snowflakes randomly sized and placed across the screen. In Webkit, you should see these snowflakes falling, all at different speeds. We also have a `repeat-x` background image of some snow running across the bottom of the browser window.



## The code



We use a lot of PHP to create the random effects applied to the snowflakes, and also automate a lot of the legwork needed to create 65 unique classes, it's commented as shown and should make total sense.


    
    <code><!DOCTYPE html>
    <html lang="en">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>Let it snow</title>
      <link rel="stylesheet" type="text/css" href="css/style.css" />
      <style type="text/css">
        
        <?php <span class="code-comment">//If the day parameter is set, use a different background</span> ?>
        <?php if(isset($_GET['time']) && $_GET['time'] == 'day') { ?>
        html{
          background:url(img/css/snow.png) bottom left repeat-x fixed #b4c8cc;
        }
        <?php } ?>
    
      
        <?php <span class="code-comment">//Number of snowflakes -- you decide!</span> ?>
        <?php $snowflakeCount = 65;  ?>
    
        <?php <span class="code-comment">//Create a unique class for each of the snowflakes and assign each one a random size and animation duration</span> ?>
        <?php  for($i = 1; $i <= $snowflakeCount; $i++) { ?>
          .snowflake-<?php echo $i ?>{
            <?php <span class="code-comment">//Create a random decimal number between 1 and 10:</span> ?>
            -webkit-animation-duration:<?php echo (rand(10,100) / 10); ?>s;
            <?php <span class="code-comment">//Create a random decimal number between 0.1 and 2:</span> ?>
            font-size:<?php echo (rand(1,20) / 10); ?>em;
          }
        <?php } ?>
      </style>
    </head>
    
    <body>
    
      <div id="wrapper">
        <h1>Let it snow!</h1>
        <p><a href="/2010/12/let-it-snow/">Return to article.</a></p>
      </div>
    
      <div id="snow">
        <?php <span class="code-comment">//Loop through your chosen amount of snowflakes and make that many empty spans (with associated class) and randomly place them on-screen</span> ?>
        <?php for($i = 1; $i <= $snowflakeCount; $i++) { ?>
          <span class="snowflake snowflake-<?php echo $i; ?>" style="top:<?php echo rand(1,98); ?>%; left:<?php echo rand(1,98); ?>%"></span>
        <?php  } ?>
      </div>
    
    </body>
    </html></code>



Basically we use PHP to create 65 empty `<span>`s which are then randomly placed and sized on the page. We also give each one a random `-webkit-animation-duration` so as to ensure they fall at different speeds. Two points worth noting:


    
    <code><?php <span class="code-comment">//Create a random decimal number between 1 and 10:</span> ?>
    -webkit-animation-duration:<?php echo (rand(10,100) / 10); ?>s;
    <?php <span class="code-comment">//Create a random decimal number between 0.1 and 2:</span> ?>
    font-size:<?php echo (rand(1,20) / 10); ?>em;</code>





Thanks to [Dan Bentley](http://twitter.com/punch_n_pie) for his PHP input here-and-there--mine is a tad rusty.



Here we use `rand(10,100)` to create a random _whole_ number between ten and one hundred (let's say 75). We then divide this by ten to get a decimal (i.e. 7.5) to use as the duration in seconds.
We then use `rand(1,20)` to create a random number between one and twenty (say, 5) which we then divide by ten to get a decimal (i.e. 0.5) for the `font-size` in ems.



### The CSS




    
    <code><span class="code-comment">/*------------------------------------*\
      MAIN
    \*------------------------------------*/</span>
    html{
      font-family:Calibri, Arial, Verdana, sans-serif;
      background:url(../img/css/snow.png) bottom left repeat-x fixed #222;
      color:#fff;
      text-shadow:1px 1px 1px rgba(0,0,0,0.5);
      height:101%;
    }
    body{
      width:940px;
      padding:10px;
      margin:0 auto;
    }
    #wrapper{
      position:relative;
      z-index:5; <span class="code-comment">/* Bring the content over the snowflakes */</span>
    }
    h1{
      font-weight:bold;
      font-size:1.5em;
      margin-bottom:20px;
    }
    a{
      color:#fff;
    }
    
    
    
    
    
    <span class="code-comment">/*------------------------------------*\
      SNOWFLAKES
    \*------------------------------------*/</span>
    <span class="code-comment">/* Set up a blank canvas in which to house the snowflakes */</span>
    #snow{
      position:fixed;
      top:0;
      right:0;
      bottom:0;
      left:0;
      overflow:hidden;
    }
    .snowflake{
      text-shadow:none;
      position:absolute;
      top:0;
      <span class="code-comment">/* Set up the animation */</span>
      -webkit-animation-name:snowflake-animation;
      -webkit-animation-iteration-count:infinite;
      -webkit-animation-timing-function:linear;
    }
    <span class="code-comment">/* Fill the empty span with a snowflake-like asterisk */</span>
    .snowflake:before{
      content:"*";
    }
    @-webkit-keyframes snowflake-animation{
      <span class="code-comment">/* Start at the top */</span>
      from{
        top:0%;
        -webkit-transform:rotate(0deg);
      }
      <span class="code-comment">/* Rotate by 360 degrees up until the half way point */</span>
      50%{
        -webkit-transform:rotate(360deg);
      }
      <span class="code-comment">/* Animate to the bottom whilst rotating back to zero */</span>
      to{
        top:100%;
        -webkit-transform:rotate(0deg);
      }
    }</code>



The CSS, again, is extremely straightforward and self-explanatory. [Use `content:"";` to keep our code a little cleaner](/2010/09/keeping-code-clean-with-content/), and animate all the snowflakes top-to-bottom whilst rotating them. Simple!

So there we've put a new-age spin on a very dated (and still pretty garish) technique.



## Addendum



Following [this Twitter conversation](http://twitter.com/csswizardry/statuses/10425282116722688) between [Danny Banks](http://twitter.com/dbanksDesign) and myself the `#snow` `<div>` was introduced. Cheers for the heads-up, [Danny](http://twitter.com/dbanksDesign)!
