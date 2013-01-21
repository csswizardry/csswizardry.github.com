---
comments: true
date: 2011-02-17 09:32:39
layout: post
slug: pure-css3-accordion
title: Pure CSS(3) accordion
wordpress_id: 2538
categories:
- Web Development
tag:
- CSS
- CSS3
- HTML
---

I tend to do a lot of tinkering with code, and came up with something that’s not so new, but still, in my opinion, pretty cool. An accordion using nothing but semantic HTML, CSS and some nice progressive CSS3. There are also two versions, a horizontal one and a vertical one.

## [Demo](http://csswizardry.com/demos/accordion/)

This article has been ported from the now-defunct Venturelab Devblog, where I had originally authored it.

## Horizontal accordion

Let’s start with the markup for the horizontal accordion, it’s really nothing special, just some good ol’ semantic HTML:

    <ul class="accordion">
    
      <li class="slide-01">
    
        <div>
    
          <h2>Slide one</h2>
    
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id lobortis massa. Nunc viverra velit leo, sit amet elementum mi. Fusce posuere nunc a mi tempus malesuada. Curabitur facilisis rhoncus eros eget placerat. Aliquam semper mauris sit amet justo tempor nec lacinia magna molestie. Etiam placerat congue dolor vitae adipiscing. Aliquam ac erat lorem, ut iaculis justo. Etiam mattis dignissim gravida. Aliquam nec justo ante, non semper mi. Nulla consectetur interdum massa, vel porta enim vulputate sed. Maecenas elit quam, egestas eget placerat non, fringilla vel eros. Nam vehicula elementum nulla sed consequat. Phasellus eu erat enim. Praesent at magna non massa dapibus scelerisque in eu lorem.</p>
    
        </div>
    
      </li>
    
      <li class="slide-02">
    
        <div>
    
          <h2>Slide two</h2>
    
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id lobortis massa. Nunc viverra velit leo, sit amet elementum mi. Fusce posuere nunc a mi tempus malesuada. Curabitur facilisis rhoncus eros eget placerat. Aliquam semper mauris sit amet justo tempor nec lacinia magna molestie. Etiam placerat congue dolor vitae adipiscing. Aliquam ac erat lorem, ut iaculis justo. Etiam mattis dignissim gravida. Aliquam nec justo ante, non semper mi. Nulla consectetur interdum massa, vel porta enim vulputate sed. Maecenas elit quam, egestas eget placerat non, fringilla vel eros. Nam vehicula elementum nulla sed consequat. Phasellus eu erat enim. Praesent at magna non massa dapibus scelerisque in eu lorem.</p>
    
        </div>
    
      </li>
    
      <li class="slide-03">
    
        <div>
    
          <h2>Slide three</h2>
    
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id lobortis massa. Nunc viverra velit leo, sit amet elementum mi. Fusce posuere nunc a mi tempus malesuada. Curabitur facilisis rhoncus eros eget placerat. Aliquam semper mauris sit amet justo tempor nec lacinia magna molestie. Etiam placerat congue dolor vitae adipiscing. Aliquam ac erat lorem, ut iaculis justo. Etiam mattis dignissim gravida. Aliquam nec justo ante, non semper mi. Nulla consectetur interdum massa, vel porta enim vulputate sed. Maecenas elit quam, egestas eget placerat non, fringilla vel eros. Nam vehicula elementum nulla sed consequat. Phasellus eu erat enim. Praesent at magna non massa dapibus scelerisque in eu lorem.</p>
    
        </div>
    
      </li>
    
      <li class="slide-04">
    
        <div>
    
          <h2>Slide four</h2>
    
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id lobortis massa. Nunc viverra velit leo, sit amet elementum mi. Fusce posuere nunc a mi tempus malesuada. Curabitur facilisis rhoncus eros eget placerat. Aliquam semper mauris sit amet justo tempor nec lacinia magna molestie. Etiam placerat congue dolor vitae adipiscing. Aliquam ac erat lorem, ut iaculis justo. Etiam mattis dignissim gravida. Aliquam nec justo ante, non semper mi. Nulla consectetur interdum massa, vel porta enim vulputate sed. Maecenas elit quam, egestas eget placerat non, fringilla vel eros. Nam vehicula elementum nulla sed consequat. Phasellus eu erat enim. Praesent at magna non massa dapibus scelerisque in eu lorem.</p>
    
        </div>
    
      </li>
    
      <li class="slide-05">
    
        <div>
    
          <h2>Slide five</h2>
    
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id lobortis massa. Nunc viverra velit leo, sit amet elementum mi. Fusce posuere nunc a mi tempus malesuada. Curabitur facilisis rhoncus eros eget placerat. Aliquam semper mauris sit amet justo tempor nec lacinia magna molestie. Etiam placerat congue dolor vitae adipiscing. Aliquam ac erat lorem, ut iaculis justo. Etiam mattis dignissim gravida. Aliquam nec justo ante, non semper mi. Nulla consectetur interdum massa, vel porta enim vulputate sed. Maecenas elit quam, egestas eget placerat non, fringilla vel eros. Nam vehicula elementum nulla sed consequat. Phasellus eu erat enim. Praesent at magna non massa dapibus scelerisque in eu lorem.</p>
    
        </div>
    
      </li>
    
    </ul>

Here we have a simple unordered list containing a series of class-named list items and some content. Simple. The CSS is where it gets nifty:

<pre><code><span class="code-comment">/*------------------------------------*\
    ACCORDION
\*------------------------------------*/</span>
.accordion{
    width:940px;
    overflow:hidden;
    list-style:none;
    margin-bottom:10px;
    text-shadow:1px 1px 1px rgba(0,0,0,0.25);
    background:blue;

    -moz-border-radius:10px;
    -webkit-border-radius:10px;
    -o-border-radius:10px;
    border-radius:10px;
}
.accordion li{
    float:left;
    width:20%;
    overflow:hidden;
    height:250px;
    -moz-transition:width 0.2s ease-out;
    -webkit-transition:width 0.2s ease-out;
    -o-transition:width 0.2s ease-out;
    transition:width 0.2s ease-out;
    -moz-transition-delay:0.15s;
    -webkit-transition-delay:0.15s;
    -o-transition-delay:0.15s;
    transition-delay:0.15s;
}
.accordion li:first-of-type{
    -moz-border-radius:10px 0 0 10px;
    -webkit-border-radius:10px 0 0 10px;
    -o-border-radius:10px 0 0 10px;
    border-radius:10px 0 0 10px;
}
.accordion li:last-of-type{
    -moz-border-radius:0 10px 10px 0;
    -webkit-border-radius:0 10px 10px 0;
    -o-border-radius:0 10px 10px 0;
    border-radius:0 10px 10px 0;
}
.accordion div{
    padding:10px;
}
.accordion:hover li{
    width:10%;
}
.accordion li:hover{
    width:60%;
}
.slide-01  { background:red; color:white; }
.slide-02  { background:orange; color:white; }
.slide-03  { background:yellow; color:#333; text-shadow:none; }
.slide-04  { background:green; color:white; }
.slide-05  { background:blue; color:white; }</code></pre>

It’s all fairly self-explanatory; first we have the `.accordion` class for the `<ul>` where we define a width and overflow hidden ([to clear floats](http://csswizardry.com/floats/)) and some other bits and pieces.

Next we float the list items left so they all stack up, give them a width of 20% (**100% ÷ 5 = 20%**) and give them `overflow:hidden;` so that no content breaks out of them. We also apply a fixed height that will nicely house all the content once the list items expand.

Now here’s a progressive bit, we tell the list items to transition their widths over a period of 0.2 seconds, easing out the animation.

Then after this we use the very handy `:first-` and `:last-of-type` selectors to round the top- and bottom-left and top- and bottom-right corners of the first and last list items respectively.

After this, we have a `<div>` to which we apply 10px padding. You could argue that this `<div>` is extraneous and that we can simply add the padding to the `<li>`s, and you’d be right, however this would make the percentage numbers for the width less nice to work with if you have to factor in paddings on the list items too.

Now we reach the bit that makes the accordion functional:

    .accordion:hover li{
      width:10%;
    }

What we do here is say _as soon as I hover the `<ul>` make all the `<li>`s 10% in width_.

This gives us **5 × 10% = 50%**. 5 lots of 10% width list items in the list. We have a spare 50% of extra space in the list that we’d like to fill with whatever list item we are currently hovering.

**10% list item + 50% dead space to fill = 60%**

So what we do now is say _make the list item that I am actually hovering 60% width_.

    .accordion li:hover{
      width:60%;
    }

The whole functionality says <q>when I hover the list make every list item 10% the width of the `<ul>` but make the one `<li>` that my cursor is over 60% of the width</q>.

**10% + 10% + 10% + 10% + 60% = 100%**


The final block simply gives the list items some colour (colours of the rainbow, did you notice?).


When it’s all tied together you get a series of list items that alter their widths when hovered (but always totalling 100%). Then we use some CSS3 to round the corners in supportive browsers, and some transitions for the even more supportive browsers. This leaves us with an sliding accordion of rich HTML content that uses no JS and works even in IE7.

## Vertical accordion


Just for an optional extra I decided to make the accordion work in a vertical orientation. We use exactly the same markup save for adding an ID to the `<ul>`, thus:

    <ul class="accordion" id="vertical">

Now we stack the list items on top of one another by giving them a 100% width and this time applying the same 10% / 60% logic to the heights instead. The following code is all very self-explanatory so I’ll just leave you with it:

<pre><code><span class="code-comment">/*------------------------------------*\
    VERTICAL
\*------------------------------------*/</span>
#vertical{
    height:300px;
}
#vertical li{
    float:none;
    height:20%;
    width:100%;
    -moz-transition:height 0.2s ease-out;
    -webkit-transition:height 0.2s ease-out;
    -o-transition:height 0.2s ease-out;
    transition:height 0.2s ease-out;
}
#vertical li:first-of-type{
    -moz-border-radius:10px 10px 0 0;
    -webkit-border-radius:10px 10px 0 0;
    -o-border-radius:10px 10px 0 0;
    border-radius:10px 10px 0 0;
}
#vertical li:last-of-type{
    -moz-border-radius:0 0 10px 10px;
    -webkit-border-radius:0 0 10px 10px;
    -o-border-radius:0 0 10px 10px;
    border-radius:0 0 10px 10px;
}
#vertical:hover li{
    height:10%;
    width:100%;
}
#vertical li:hover{
    height:60%;
    width:100%;
}</code></pre>

As we are inheriting the code from the horizontal version we do have to override the `:hover` state’s widths by explicitly setting them to 100%, but aside from that pretty much all we’ve done is applied the above theory to heights as opposed to widths. Magic!
