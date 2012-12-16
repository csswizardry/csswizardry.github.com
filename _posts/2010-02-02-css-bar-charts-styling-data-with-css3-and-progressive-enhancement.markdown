---
comments: true
date: 2010-02-02 23:59:27
layout: post
slug: css-bar-charts-styling-data-with-css3-and-progressive-enhancement
title: CSS bar charts—styling data with CSS3 and progressive enhancement
wordpress_id: 601
categories:
- Web Development
tag:
- CSS3
- Data Visualisation
- Progressive Enhancement
---

Bar charts in CSS are neither very new, or very difficult. Using some pretty basic styling you can force lists etc into resembling graphs and charts fairly easily. Such charts, in their most basic form, work perfectly well in displaying and presenting the data they represent. However, using some rich CSS3 and progressive enhancement, you can really start pushing the display and presentation of these normally boring documents to the next level. They are also an ideal way in which to demonstrate the power and ability of progressive enhancement.





## [View demo](/demos/graphs/)







**Look at the site in IE8, _then_ Firefox, _then_ Safari/Chrome.** Keep refreshing.




I have created [a demo page](/demos/graphs/) which simply represents three items of data expressed as percentages. It is not the data itself or the numbers we are concerned with here--it is the proof of concept. The fact that this can be done on my made up data shows that you can do it too, on real life information.





## Progressive enhancement




At [Venturelab](http://venturelab.co.uk/), we decided to use progressive enhancement as a matter of course. CSS3 and designing in the browser all the way!




Progressive enhancement is, in my opinion, one of the most exciting schools of thought web development has seen in years (though I _have_ only been in the web for three...). It is the idea whereby any non-essential features (i.e. anything whose absence will have no adverse effect on the usability or accessibility of a website) are added to the website in a _progressive_ manner--often through CSS3.




The benchmark example is rounded corners; to apply these through old means, for example with images, would have taken a developer a substantial amount of time--time the client is paying for. It seems silly now to think that way-back-when, putting rounded corners on a `div` might have taken upward of 30 minutes, when we can apply it in about 5 seconds using `-moz-border-radius:5px;`.




It really is a no brainer--anyone visiting the site in a browser with no CSS3 support will see square corners. Does this matter? Of course it doesn't. No one visits a site to look solely at the design--they visit for content. Does it matter to them what shape the corners of your RSS button are? No again. Progressive enhancement saves you time, and your client money.





### Isn't this just graceful degradation?




Graceful degradation = building for the best and getting worse; progressive enhancement = building to cater the worst and getting better...




The line between progressive enhancement and graceful degradation is fine but significant. Graceful degradation is the idea that you'd build a site for, say, Firefox, then selectively break and _downgrade_ it in the likes of IE(6). Progressive enhancement takes a much more positive attitude in that you build _for_ IE(6) and then selectively _upgrade_ it in browsers like Firefox and Safari. It's no longer starting great and getting worse, it's now starting great and getting better.





### Internet Explorer




**N.B.** Only tested in IE8 as this is not a final solution, rather a proof-of-concept.




Internet Explorer(8)'s take on my bar charts is as you'd expect from any browser, it renders it perfectly well, providing clear, accessible content, with a flawless UX and perfectly usable. _This is not bad!_ We don't need to downgrade anything, this is our starting point. It looks good and it functions perfectly. If you did as above and visited in IE8 first, you wouldn't know that there were round corners missing--because that _doesn't_ matter.





![A screenshot of the CSS bar chart in Internet Explorer 8](http://csswizardry.com/wp-content/uploads/2010/02/ie.gif)





### Firefox




Next up is Firefox, where we add some round corners to the blue bars, and also a very subtle drop shadow (`text-shadow:;`) on the text. This is no more usable than before, the content is no more accessible than in IE, but it _does_ look a tad nicer.





![A screenshot of the CSS bar chart in Firefox](http://csswizardry.com/wp-content/uploads/2010/02/firefox.gif)





### Safari/Chrome




It is in Webkit based browsers such as Safari and Chrome that the real magic happens. Webkit's proprietary CSS is above and beyond that of any other rendering engine...





![A screenshot of the CSS bar chart in Safari](http://csswizardry.com/wp-content/uploads/2010/02/safari.gif)





What if I couldn't be bothered opening Photoshop to make a subtle gradient `.gif` for the bars? No worries, use Webkit's gradient CSS. A little reflection might look nice on the bars too, but I don't fancy any superfluous markup or `.png`s to fiddle with. Ah great, Webkit has a bit of reflection CSS too.




However, for the real show-piece, the Webkit animation. I'm not using any Javascript libraries anywhere else in the page so I don't fancy pulling a whole one in for something that won't really be missed if it's not there. I hear Webkit has animations... magic!





## The code




Now that's the theory covered, let's look at what does all this stuff... Please note, I have used some PHP to randomise the values used by the bars of the chart. As a result, some CSS appears in the source code of the PHP file, and the rest in [the page's CSS file](http://csswizardry.com/demos/graphs/css/style.css). The code shown in the examples below is condensed into one large chunk.




### The markup




The markup simply comprises of one uncluttered `dl`. The reasoning behind a definition list is that each item is a title, followed by some information about that title. Not only is this semantically correct, it's a nice set of elements to be working with to achieve the layout we've got.



    
    <code><dl id="chart">
      <dt>Sales increase this week</dt>
      <dd><span id="data-one">47%</span></dd>
      <dt>Revenue increase this week</dt>
      <dd><span id="data-two">59%</span></dd>
      <dt>Profit increase this week</dt>
      <dd><span id="data-three">26%</span></dd>
    </dl></code>





That's all there is to it.





### The CSS, CSS3 and progressive enhancement



    
    <code><span class="code-comment">/*------------------------------------*\
      CHART
    \*------------------------------------*/</span>
    #chart{
      width:520px;
    }
    #chart dt{
      width:160px;
      float:left;
      margin:0 20px 5px 0;
      padding:2px 0;
      display:inline;
      font-weight:bold;
      text-align:right;
    }
    #chart dd{
      width:339px;
      border-right:1px solid #ddd;
      float:left;
      margin-bottom:5px;
      display:inline;
    }
    #chart dd span{
      color:#fff;
      background:#09f;
      text-align:center;
      padding:2px 0;
      display:block;
      
      text-shadow:1px 1px 1px rgba(0,0,0,0.2);
      -moz-border-radius:2px;
      -webkit-border-radius:2px;
      border-radius:2px;
      background:-webkit-gradient(linear, left top, ->
      left bottom, from(#09f), to(#077fd0));
      -webkit-box-reflect:below 0 ->
      -webkit-gradient(linear, left top, ->
      left bottom, from(rgba(0,0,0,0)), to(rgba(0,0,0,0.25)));
    }
    #data-one{
      width:47%;
    }
    #data-two{
      width:59%;
    }
    #data-three{
      width:26%;
    }
    #data-one{
      -webkit-animation-name:bar-one; <span class="code-comment">/* Give the bar an animation with a
        unique name */</span>
    }
    #data-two{
      -webkit-animation-name:bar-two; <span class="code-comment">/* Give the bar an animation with a
        unique name */</span>
    }
    #data-three{
      -webkit-animation-name:bar-three; <span class="code-comment">/* Give the bar an animation with a
        unique name */</span>
    }
    #data-one,#data-two,#data-three{ <span class="code-comment">/* Define animation styles for all three
        bars at once */</span>
      -webkit-animation-duration:0.5s; <span class="code-comment">/* Animation duration in seconds */</span>
      -webkit-animation-iteration-count:1; <span class="code-comment">/* Amount of times to loop */</span>
      -webkit-animation-timing-function:ease-out; <span class="code-comment">/* Ease in, out etc. */</span>
    }
    @-webkit-keyframes bar-one{
      0%{ <span class="code-comment">/* Define bar-one styles at 0% (0 seconds) */</span>
        width:0%;
      }
      100%{ <span class="code-comment">/* Define bar-one styles at 100% (0.5 seconds) */</span>
        width:47%;
      }
    }
    @-webkit-keyframes bar-two{
      0%{ <span class="code-comment">/* Define bar-two styles at 0% (0 seconds) */</span>
        width:0%;
      }
      100%{ <span class="code-comment">/* Define bar-two styles at 100% (0.5 seconds) */</span>
        width:59%;
      }
    }
    @-webkit-keyframes bar-three{
      0%{ <span class="code-comment">/* Define bar-three styles at 0% (0 seconds) */</span>
        width:0%;
      }
      100%{ <span class="code-comment">/* Define bar-three styles at 100% (0.5 seconds) */</span>
        width:26%;
      }
    }</code>





#### In detail




There may well be some bits in there that you're not familiar with, particularly CSS animations. Basically, to animate an element you need to do a few things:






  1. Assign the element an animation name. This name is the 'hook' to link an animation, defined later, to an element.

    
    <code>#data-one{
      -webkit-animation-name:bar-one;
    }</code>





  2. Assign the element animation properties. Here you set things like duration, repetition and ease-in/out.

    
    <code>#data-one,#data-two,#data-three{
      -webkit-animation-duration:0.5s;
      -webkit-animation-iteration-count:1;
      -webkit-animation-timing-function:ease-out;
    }</code>





  3. Set up the keyframes of the animation. Here you set the various points. Here we have one thing to animate through two states, so we simply set a beginning at 0% and and end at 100%. We could set at any percentage in between but as we just have a beginning and an end, we don't need to--Webkit sees to that.

    
    <code>@-webkit-keyframes bar-one{
      0%{
        width:0%;
      }
      100%{
        width:47%;
      }
    }</code>







With regards the Webkit reflections, it may be a better idea to consult the [Surfin' Safari page on that](http://webkit.org/blog/182/css-reflections/), as anything I'd say would most likely be a poorly pulled off rehash.





## Closing word




So there you have it, a real life, justifiable and wholly appropriate application of CSS3 and progressive enhancement coupled with data visualisation. Don't be held back by the limitations of older browsers--relish in the opportunities new ones bring.




And as a final bonus, [@VIPickering](http://twitter.com/VIPickering) requested [this (view in Safari/Chrome)](/demos/graphs/index2.php)... enjoy.
