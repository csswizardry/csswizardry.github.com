---
comments: true
date: 2010-01-26 16:03:03
layout: post
slug: a-suitable-alternativeon-proper-use-of-alt-attributes
title: A suitable alternative—on proper use of alt attributes
wordpress_id: 318
categories:
- Web Development
tag:
- Accessibility
- Images
- Semantics
---

Images in HTML come with a mandatory attribute used to _textually_ describe the information displayed _visually_ through the image. The `alt` attribute ([not tag](http://csswizardry.com/eta)) is used by screenreaders etc to tell users who can't view the actual image what it represents. It is also used in any circumstance where images can't be loaded (slow connections, broken URIs etc).







## When not to use it




You should never _not_ use an `alt` attribute, rather leave it empty, thus: `alt=""`




The only time you can really get away with _not_ having a complete `alt` attribute is if the image holds no context or information that the user needs to be aware of. This is usually the case when the image is purely decorational, though it may be argued that the image should therefore be added through CSS in the spirit of separating style and content. By that token it is fairly safe to say that there should never be an instance in which you leave an `alt` attribute empty.





## You're using it, but not quite right...




The next best scenario is that you are using images correctly, for their correct purpose and are using `alt` attributes, but they don't really do as much as they should. A lot of the time I come across images that have less than ideal `alt` attributes.




![A photograph of an abandoned car](http://csswizardry.com/wp-content/uploads/2010/01/car.jpg)




Image sourced via Google Images--original author unknown.




One example might be the above image of a car. This, while technically correct, is not ideal: `<img src="/img/car.jpg" alt="Car" />`. All this tells the user is 'Car'. It doesn't say whether it's a picture with the word car in it, or whether it's a picture of a car. A much better `alt` attribute would be `alt="A photograph of an abandoned car"` (as used in my code).




### Other poor uses




Another real-world example of poor `alt` attribute usage is actually on [CNN's website](http://www.cnn.com/). On their home page today (26 January, 2010) they have a series of headlines with accompanying images. The code for such a pairing looks like this:



    
    <code><img height="68" border="0" width="120" alt="Haiti's swanky club ->
    now home to misery" src="http://i.cdn.turner.com/cnn/2010/WORLD/ ->
    americas/01/26/haiti.camp/tzvids.haiti.aid.cnn.jpg"> ->
    … Haiti's swanky club now home to misery</code>




This is wrong on two counts:






  1. A screenreader will read out to the user Haiti's swanky club now home to misery … Haiti's swanky club now home to misery. Every image/headline pairing on the page is laid out like this, meaning in every instance a user using a screenreader will hear the headline twice. This will surely soon get annoying.


  2. Secondly, the image was actually of earthquake survivors holding a large bag, nothing to do with clubs and, unfortunately, far from swanky.




## Using the attribute properly




On the [BBC's home page](http://www.bbc.co.uk/) however (on the same date) they are using `alt` attributes perfectly. They have an image of a woman wearing a veil, alongside the article's headline France report back face veil ban. The image's `alt` attribute: `alt="A woman wears a full-length veil in Lyon, 25 January"`.





## The biggest no-no of all




One thing which consistently winds me up is the ridiculously bad practice of stuffing `alt` attributes with keywords. `alt` attributes are an accessibility feature, end of. They are _not_ a way of slipping in keywords out of sight, and any attempt to do so is irresponsible and incredibly bad practice. The only time 'keywords' may be validly placed in `alt` attributes is if it's explicitly related to the image; for example: `<img src="/img/product.jpg" alt="A photograph of Mike's Carpets' ProClean™ carpet cleaner" />`.





## How to do it properly




Writing proper `alt` text is incredibly simple, yet a little more time consuming than the 'Car' cop-out. All you need to do is write out in full exactly what the image shows. If it's an elephant giving a donkey a piggy-back don't be lazy and use `alt="Elephant and a donkey"`. Instead, write out `alt="A photograph of an African elephant giving a donkey a piggy back across a swamp"`.




Also, for any pages that use similar images repeatedly but are slightly different to one another, make sure your alt attributes reflect these differences. A good example would be [my portfolio page](http://csswizardry.com/portfolio/). Instead of using `alt="Screenshot"` over and over again I used text like `alt="Screenshot of Suzanna Haworth’s website"` and `alt="Screenshot of RAAMaudio UK Ltd."` etc.





This is one of the most basic aspects of web development, but one that too many people are still getting wrong.
