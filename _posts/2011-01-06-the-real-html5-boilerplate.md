---
comments: true
date: 2011-01-06 23:18:16
layout: post
slug: the-real-html5-boilerplate
title: The real HTML5 boilerplate
wordpress_id: 2030
categories:
- Web Development
tag:
- HTML5
- Markup
---

There has been a lot of talk lately about a certain HTML5 boilerplate... _the_
[HTML5 Boilerplate](http://html5boilerplate.com/).

A boilerplate is a starting point, it’s a base. It’s a codebase from which
things are built with only the necessary and relevant additions being made
(note **_additions_**, not changes).

I won’t beat about the bush, seeing the HTML5 Boilerplate makes me frustrated.
It makes me wish I were a vet, or a tree surgeon, or something that isn’t a web
developer. Look at all that code. 681* lines. _Six hundred and eighty-one_. Hell
it even takes over 40 minutes to explain! That’s not a starting point, that’s a
finished product and then some.

*Based on addition of the several code-blocks on the homepage.

## Assumptions

The main problem with the HTML Boilerplate is that it makes so many assumptions.
All you can assume with a HTML5 boilerplate is that someone wants to use HTML5,
that’s it. Assuming someone wants _x_ Javascript libraries, Google Analytics,
IE6 .png fixes, IE_x_ conditional classes and all that other stuff is _not_ what
a boilerplate is made to do. A boilerplate should be a suitable starting point
to which developers can add all that stuff _if they want to_.

As well as all the script assumptions that are made, it also assumes markup.
Although not by a long way at all, it starts building the site for you. The
HTML5 Boilerplate doesn’t know what markup I want...

A boilerplate should be added to, not subtracted from. The HTML Boilerplate just
contains far too much. I can see more being deleted than being kept, unless...

A large fear of mine is that novice (for lack of a better word) developers will
see this and think ‘great, it’s all done for me, just copy/paste this, I won’t
delete stuff just in case, I’ll pop some stuff in here and voilà; go live!’

Scary thought...

### Gone to our heads?

I realise this whole article is flame-bait, but seriously, hasn’t HTML5/CSS3
gone to our heads a little too much? When did stuff like this become okay? Who
in their right mind would start a project (that’s not even in a framework) with
681 lines of code?

## The real HTML5 boilerplate

So how little code do you need to get a HTML5 build started? Hardly any, that’s how much:

    <!DOCTYPE html>
    <html lang="en">
    <head>
    	<meta charset="utf-8">
    	<title>HTML5 boilerplate – all you really need…</title>
    	<link rel="stylesheet" href="css/style.css">
    	<!--[if IE]>
    		<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    	<![endif]-->
    </head>
    
    <body id="home">
    
    	<h1>HTML5 boilerplate</h1>
    
    </body>
    </html>

<pre><code><span class="code-comment">/*------------------------------------*\
    RESET
\*------------------------------------*/
/* http://meyerweb.com/eric/tools/css/reset/ 
    v2.0b1 | 201101 
    NOTE:WORK IN PROGRESS
    USE WITH CAUTION AND TEST WITH ABANDON */</span>

html,body,div,span,applet,object,iframe,
h1,h2,h3,h4,h5,h6,p,blockquote,pre,
a,abbr,acronym,address,big,cite,code,
del,dfn,em,img,ins,kbd,q,s,samp,
small,strike,strong,sub,sup,tt,var,
b,u,i,center,
dl,dt,dd,ol,ul,li,
fieldset,form,label,legend,
table,caption,tbody,tfoot,thead,tr,th,td,
article,aside,canvas,details,figcaption,figure,
footer,header,hgroup,menu,nav,section,summary,
time,mark,audio,video{
    margin:0;
    padding:0;
    border:0;
    outline:0;
    font-size:100%;
    font:inherit;
    vertical-align:baseline;
}
<span class="code-comment">/* HTML5 display-role reset for older browsers */</span>
article,aside,details,figcaption,figure,
footer,header,hgroup,menu,nav,section{
    display:block;
}
body{
    line-height:1;
}
ol,ul{
    list-style:none;
}
blockquote,q{
    quotes:none;
}
blockquote:before,blockquote:after,
q:before,q:after{
    content:’’;
    content:none;
}
<span class="code-comment">/* remember to define visible focus styles! 
:focus{
    outline:?????;
} */</span>

<span class="code-comment">/* remember to highlight inserts somehow! */</span>
ins{
    text-decoration:none;
}
del{
    text-decoration:line-through;
}

table{
    border-collapse:collapse;
    border-spacing:0;
}





<span class="code-comment">/*------------------------------------*\
    $MAIN
\*------------------------------------*/</span>
<span class="code-comment">/* GO! */</span></code></pre>

Copy and paste those files and save them somewhere. _There_ is your HTML5
boilerplate.

That is all you need to begin building any HTML5 project. Need to fix .pngs in
IE6? Add that later. Need some analytics? Add that as you need it...

So there is my opinion, and I’m aware a _lot_ of people agree with it. I am also
aware that a lot of people will vehemently disagree. But seriously, if you think
about it, that _is_ pretty ridiculous for a boilerplate, no?

## Addendum

There seems to have been some mixed messages on my part. I’m not saying the code
_in_ the HTML5 Boilerplate is bad, far from it. A lot of it is very useful and I
would learn a lot from, what I am saying is that it’s just too verbose for a
_starting point_.

What might be a better idea (and one that’d change my opinion _entirely_) would
be to have a jQuery UI style builder, whereby you can cherry pick the bits you
do want before you start building, never having to see or deal with the bits you
don’t.

## Update

So Paul and I spent a good 45 minutes or so chatting over GTalk this morning
about this article, my opinions and other HTML5 Boilerplate things. It was a
very interesting chat and one that I’m very glad Paul and I got to have.

It raised some interesting points and ideas for further development of the
boilerplate, however I shall avoid sharing them here because, well, it’s not my
place to share it.

Paul, thanks :)
