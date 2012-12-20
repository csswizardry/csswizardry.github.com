---
comments: true
date: 2010-02-11 23:44:02
layout: post
slug: mutiple-column-lists-using-one-ul
title: Multiple column lists using one &lt;ul&gt;
wordpress_id: 701
categories:
- Web Development
tag:
- CSS
- HTML
- Lists
---

This is a quick, simple tutorial on how to create multiple column lists by only using one `ul`. Often is the case when you'd want multiple lists side-by-side, but you end up using markup like `<ul class="col">` in order to get several lists sat next to each other. However, by simply floating `li`s left and setting their width to the correct percentage (two columns = `li{width:50%;}` and so on), you can attain a multiple column list pretty easily.





## [View demo](http://csswizardry.com/demos/multiple-column-lists/)







The trick here is to force the list to break at the right point. If you want two columns, you need to float the list items left and set them at 50% width, therefore the list items will only ever fit two side-by-side, then begin again on the row beneath. By that token, three columns would require a width of 33% and floated left, four would be 25% and so on.





## The code




Both the markup and CSS for this is incredibly simple, nothing fancy, no CSS3, nothing progressive, just basic styling applied to lean markup.




### The markup




The markup for this is just a simple `ul`, thus:



    
    <code><ul id="double"> <span class="code-comment"><!-- Alter ID accordingly --></span>
      <li>CSS</li>
      <li>XHTML</li>
      <li>Semantics</li>
      <li>Accessibility</li>
      <li>Usability</li>
      <li>Web Standards</li>
      <li>PHP</li>
      <li>Typography</li>
      <li>Grids</li>
      <li>CSS3</li>
      <li>HTML5</li>
      <li>UI</li>
    </ul></code>





And to make this into a multiple column list:




    
    <code>ul{
      width:760px;
      margin-bottom:20px;
      overflow:hidden;
      border-top:1px solid #ccc;
    }
    li{
      line-height:1.5em;
      border-bottom:1px solid #ccc;
      float:left;
      display:inline;
    }
    #double li  { width:50%;} <span class="code-comment">/* 2 col */</span>
    #triple li  { width:33.333%; } <span class="code-comment">/* 3 col */</span>
    #quad li    { width:25%; } <span class="code-comment">/* 4 col */</span>
    #six li     { width:16.666%; } <span class="code-comment">/* 6 col */</span></code>





## When to use this




Use this wisely... It displays content in an ambiguous manner and should not be used where order of reading is imperative.




This method should only be used if the lists content doesn't require any specific ordering as the markup is written linearly and the list is displayed in a matrix. As you can see, the way the content is displayed means it can be read across»down»across or down»up»down. This means that the way you write your content is not necessarily the way it will be read. In [my example](/demos/multiple-column-lists/) this isn't an issue, as the content can safely be read in any order.
