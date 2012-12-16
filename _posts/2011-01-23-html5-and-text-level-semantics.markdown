---
comments: true
date: 2011-01-23 11:22:16
layout: post
slug: html5-and-text-level-semantics
title: HTML(5) and text-level semantics
wordpress_id: 2187
categories:
- Web Development
tag:
- HTML
- HTML5
- Semantics
- Typography
---

As an absolute type nut and militant web standards advocate, one of the most exciting things that HTML5 brings for me is not the new structural elements like `<header>`, `<aside>` et al (although they _are_ pretty awesome) but rather the text-level semantics it brings with the addition and redefinition of certain elements.

The best way to explain them is probably to take a look at the following excerpt:





* * *



Hi there, I'm Harry Roberts, I am a web developer at [BSkyB](http://sky.com/). I specialise in web standards, accessibility, <del>Ruby,</del> design and build, mobile development, typography and more. I have been in the industry for three four years.



**Please note:** I am not a programmer.





![A photo of me](http://csswizardry.com/wp-content/uploads/2009/12/harry-roberts.jpg)**Above:** A photo of me.



I write at my personal blog [CSS Wizardry](/) and tweet at [@csswizardry](http://twitter.com/csswizardry). I love the uppercase _R_ in Helvetica. My motto on web development is 'Always code like you’re working in a team, even when you’re not.' I absolutely _love_ the web.

I am also an advocate of clearing floats the clean way. Please note the `width` and `overflow` properties in the code below:


    
    <code>.wrapper{
      <mark>width:940px;</mark>
      margin:0 auto;
      padding:10px;
      <mark>overflow:hidden;</mark>
    }</code>





* * *



This is, admittedly, a very forced bit of writing, but I had to write in such a way as to properly, and in context, use a large set of semantic text-level elements. These are, in order of appearance:




	
  1. The `<del>` element

	
  2. The `<s>` element

	
  3. The `<ins>` element

	
  4. The `<strong>` element

	
  5. The `<small>` element

	
  6. The `<b>` element

	
  7. The `<cite>` element

	
  8. The `<i>` element

	
  9. The `<q>` element

	
  10. The `<em>` element

	
  11. The `<code>` element

	
  12. The `<mark>` element





* * *





## The `<del>` element




    
    <code>...I specialise in web standards, accessibility, <mark><del datetime="2011-01-23T10:07:25+00:00">Ruby,</del></mark> design and build, mobile development, typography</code>



The `<del>` element indicates a removal from a document; this shows that the text inside it has no place in the document. You could actually physically remove the text, but you can--for the sake of transparency-- leave it in and show that it does not belong. It also has an attribute to show when it was deleted.

In this case, I do not know Ruby and as such it has no place in the text. I used the `<del>` element to show this.



## The `<s>` element




    
    <code>I have been in the industry for <mark><s>three</s></mark> four years.</code>



This element is _very_ similar to the `<del>` element and their differences are _very_ subtle. Where the `<del>` shows incorrect information that should not be in the document, the `<s>` element represents information that is no longer accurate or relevant (e.g. out of date). Here, it used to be true that I had been industry for three years, but that has been replaced by four. The information is not incorrect per se, merely no longer relevant.



## The `<ins>` element




    
    <code><mark><ins datetime="2011-01-23T10:07:25+00:00"><strong>Please note:</strong> I am not a programmer.</ins></mark></code>



The `<ins>` element represents text that has been inserted into the document after it has been published. Here I am inserting content as a result of the Ruby mistake earlier. Here I am inserting text to explain why the previous text was removed. Note the same attributes as used on the `<del>` element.

This isn't its only use, however. I frequently use the `<ins>` element in articles to show addenda and updates.



## The `<strong>` element




    
    <code><ins datetime="2011-01-23T10:07:25+00:00"><mark><strong>Please note:</strong></mark> I am not a programmer.</ins></code>



We should all be familiar with the `<strong>` element. It represents strong importance; where the content is more important than its surroundings. Here is is important because I am saying it is important that you know that I am not a programmer as was accidentally stated above.



## The `<small>` element




    
    <code><mark><small><b>Above:</b> A photo of me.</small></mark></code>



The `<small>` element has been redefined to represent small print and side comments. Here it is used to describe the picture above it. It's usage is, luckily, fairly obvious. Any time you have supporting information for a larger piece, mark it up as a `<small>`.



## The `<b>` element




    
    <code><small><mark><b>Above:</b></mark> A photo of me.</small></code>



The once loathed `<b>` element has been redefined in HTML5 to represent any text whose appearance is offset from its surroundings, often by means of bolding. There are occasions when you'd want bold text but without any extra importance, such as `<strong>` would add. I also use the `<b>` element for marking up the origins of quotes, e.g.:


    
    <code><blockquote>
      <p>&ldquo;
        A lie gets halfway around the world before the truth has a chance to get its pants on.&rdquo;
        <mark><b>Sir Winston Churchill</b></mark>
      </p>
    </blockquote></code>





## The `<cite>` element




    
    <code>I write at my personal blog <a href="/"><mark><cite>CSS Wizardry</cite></mark></a> and</code>



The `<cite>` element is used to represent a mention of or reference to a body of work, such as a book, an article, a painting and more. It is not, according to the HTML spec, used for marking up the names of sources of quotes (as above, I use the `<b>` element).

So whenever you reference a name of a film or song or website or sculpture or article, mark it up with the `<cite>` element.



## The `<i>` element




    
    <code>I love the uppercase <mark><i>R</i></mark> in Helvetica.</code>



The newly redefined  `<i>` element is another slightly confusing one. The usage is any piece of text that may be spoken with a slightly different inflection but bears **no** extra importance. The best way to tell whether you need the `<i>` element or not is to say it aloud.

Here I'm marking up a single letter, because if I were to speak that sentence aloud the _R_ _would_ have a slightly different tone applied. The `<i>` element can also be applied to full words and phrases.



## The `<q>` element




    
    <code>My motto on web development is <mark><q>&lsquo;Always code like you&rsquo;re working in a team, even when you&rsquo;re not.&rsquo;</q></mark></code>



The `<q>` element is simply used to mark up inline quotations; quotes that are in the context of surrounding copy.



## The `<em>` element




    
    <code>I absolutely <mark><em>love</em></mark> the web.</code>



Again, the `<em>` element is one we should all be familiar with. It denotes stressed importance. If you read the example aloud you can see how the `<em>` element adds inflection on the word _love_ **with importance**.



## The `<code>` element




    
    <code>Please note the <mark><code>width</code></mark> and <mark><code>overflow</code></mark> properties in the code below:</code>



The `<code>` element is very self-explanatory, it simply represents pieces of code.

**N.B.** There is a much larger array of elements used to denote code, inputs and outputs too detailed to go into here. Please refer to the HTML spec for these.



## The `<mark>` element




    
    <code><pre><code>.wrapper{
      <mark><mark>width:940px;</mark></mark>
      margin:0 auto;
      padding:10px;
      <mark><mark>overflow:hidden;</mark></mark>
    }</code></pre></code>



The `<mark>` element is a really nice new element introduced in HTML5. Its purpose is simply to highlight. You could highlight each occurrence of a search term in a search-results page [as HTML5 Doctor do](http://html5doctor.com/search/?q=mark) or--as I like to do--highlight specific references to code that is in a larger block. This allows me to give the code context, but also highlight the relevant snippet that I am talking about.



* * *



So there we have an array of highly semantic and really nifty text-level elements to use in your work; some old, some new, some modified but _all_ useful.

There are more than I've outlined here, I may revisit the blog post and add them, but the ones I've covered are the ones _I_ find most commonly occurring. In the meantime, why not give [the HTML spec a quick read](http://www.whatwg.org/html/)?
