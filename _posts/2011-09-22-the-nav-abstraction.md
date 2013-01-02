---
comments: true
date: 2011-09-22 17:04:19
layout: post
slug: the-nav-abstraction
title: The ‘nav’ abstraction
wordpress_id: 3202
categories:
- Web Development
tag:
- Abstraction
- CSS
- DRY
- Front-end architecture
- OOCSS
---

This post comes in a similar vein to [Nicole Sullivan](http://twitter.com/stubbornella)’s genius [The media object saves hundreds of lines of code](http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/).

An abstraction is basically removing a pattern from a specific idea and making a more generic idea out of it. That is to say, rather than writing the same similar patterns over and over, create a single more generic representation of those patterns and reuse that instead.

Nicole does this with her media block by taking a series of similarly constructed but different components and sharing their common aspects in a more generic way. This is a really sensible and useful abstraction whereby she can make a pretty much infinite amount of pretty different blocks of content using only the same handful of lines of CSS each time. Genius!

Her media block abstraction is a pretty common one, and one I’ve used myself. Today I’m going to share another abstraction that may well be even more common and hopefully just as handy; _the nav abstraction_.

I’m sure you’ve had loads of projects where you’ve had a horizontal nav, and also maybe a breadcrumb trail and possibly a list of logos that go in a banner-style list...?

If this is the case then I also imagine you might have written something like:

    #nav{
      list-style:none;
      margin-left:0;
    }
    #nav li{
      display:inline;
    }
    #nav a{
      ...
      [styles]
      ...
    }
    
    
    .breadcrumb{
      list-style:none;
      margin-left:0;
    }
    .breadcrumb li{
      display:inline;
    }
    .breadcrumb a{
      ...
      [styles]
      ...
    }
    
    
    .sponsors{
      list-style:none;
      margin-left:0;
    }
    .sponsors li{
      display:inline;
    }
    .sponsors a{
      ...
      [styles]
      ...
    }

Here we can see that, although we’re building three different things, we’re reusing quite a few repeated patterns to create similar _looking_ things. We need an abstraction.

## The nav abstraction

Now, I’m not sure whether _nav_ is actually the best word to use; these three examples are all types of navigational constructs, but that’s more coincidence than anything else. As such I encourage you to please offer up your alternative recommendations in the comments, please!

What we need to do now is take out the shared patterns and create a fourth class of `.nav`:

    .nav{
        list-style:none;
        margin-left:0;
    }
        .nav > li,
            .nav > li > a{
                display:inline-block;
               *display:inline;
                zoom:1;
        }

Here we define our abstraction. We take the repeated bits and make the most
granular construct we can. Notice that we give both list items and links
`display:inline-block;`, and include the IE7 hack to force elements to act like
`inline-block` if they do not naturally support it.

This will throw any list into a very basic/crude horizontal series of links
which we can then extend to adopt more specific styles, like so:

    .nav{
        list-style:none;
        margin-left:0;
    }
        .nav > li,
            .nav > li > a{
                display:inline-block;
               *display:inline;
                zoom:1;
        }
    
    
    .site-nav{
        width:100%;
        background:#eee;
    }
            .site-nav a{
                padding:5px 10px;
            }
    
    
    .breadcrumb{}
        .breadcrumb li:before{
            content:"» "
        }
        .breadcrumb li:first-child:before{
            content:normal;
        }
    
    
    .sponsors{
      text-align:center;
    }

Using a base abstraction and then extending it we can create our breadcrumb with this HTML:

    <ol class="nav  breadcrumb">
        <li><a href="/">Home</a></li>
        <li><a href="/about/">About</a></li>
        <li><a href="/about/us/">About us</a></li>
    </ol>

Writing abstractions gives smaller CSS, removes unnecessary repetitions and makes simple elements of your design much more reusable. Nice!
