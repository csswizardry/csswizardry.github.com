---
comments: true
date: 2010-08-31 20:54:01
layout: post
slug: zebra-striping-rows-and-columns
title: Zebra-striping rows and columns
wordpress_id: 1343
categories:
- Web Development
tag:
- CSS
- Tables
- Usabiliy
---

Zebra-striping tables is certainly not a new thing; it has been done and discussed for years. They (allegedly) aid usability in reading tabular data by offering the user a coloured means of separating and differentiating rows from one another. I say allegedly, there has been research into their effectiveness, conducted by [Jessica Enders](http://twitter.com/Formulate) over at [A List Apart](http://www.alistapart.com/articles/zebrastripingdoesithelp/) which proved pretty inconclusive.





Striping a table's alternate rows couldn't be simpler. By programatically adding a class of `odd` or suchlike to every other `<tr>` you can then apply styles to this row (usually a pale background colour) and create zebra-stripes. An even better method would be to ditch the extraneous class and use the `nth-of-type` selector, thus:




    
    <code>tbody tr:nth-of-type(odd){
      background:rgba(255,255,136,0.5); <span class="code-comment">/* Pale yellow with 50% opacity */</span>
    }</code>





What the `nth-of-type selector` is doing here is looking for every odd `<tr>` in the `<tbody>`, that is to say the 1st, 3rd, 5th, 7th and so on.





By understanding this, we can apply that logic to create zebra-striped columns, too. Thus:




    
    <code>tbody td:nth-of-type(odd),
    thead th:nth-of-type(odd){
      background:rgba(255,255,136,0.5);
    }</code>





**Above:** Here we target every other <th> in the <head>, and <td> in the <tbody>.





We can also combine the two, to create a table where every other row and every other column is striped simultaneously, and by using the `rgba()` colour declaration we can effectively layer the stripes, therefore showing where they cross over. The code for this simply combines the two:




    
    <code>tbody td:nth-of-type(odd),
    tbody tr:nth-of-type(odd),
    thead th:nth-of-type(odd){
      background:rgba(255,255,136,0.5);
    }</code>





## [You wanna see a demo?](/demos/zebra-striping/)




Sure thing, [here you go...](/demos/zebra-striping/)





## Addendum




After questions about browser support, I have decided to add a little onto the article...




The selectors involved here are only supported in CSS3 capable browser, that is to say pretty much anything but Internet Explorer. However, due to zebra-striping's negligible benefits and inherently progressive nature, I don't feel that it is a feature that is important enough to warrant full cross-browser support. Research shows that tables are just as usable without zebra-striping as with, therefore in IE et al, the user is not receiving a sub-par experience.




Of course if you do want to support Internet Explorer, you can always revert to programmatically adding an `odd` class to `<tr>`, `<th>` and `<td>` elements.
