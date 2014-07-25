---
comments: true
date: 2014-06-23 19:41:12
layout: post
slug: vim-for-people-who-think-things-like-vim-are-weird-and-hard
title: Vim for people who think things like Vim are weird and hard
categories:
- Web Development
tag:
meta: "An introduction to the whats and the whys of using Vim as your text editor"
---

I’ve been quite an avid and exclusive user of [Vim](http://www.vim.org/) for a
couple of years now, and in that time I’ve seen quite a lot of misinformation
and misguided vitriol (for want of a better word) for what is by _far_ the best
text editor I have ever used.

This post aims to cover how Vim is:

* Widely available
* Customisable and extensible
* Modal, for making you efficient across all manner of tasks
* Very literal
* Built entirely on keyboard shortcuts
* Highly composable
* Very minimal

This post isn’t here to teach you how to use Vim; it exists to teach you _why_
to use Vim. If you want to learn Vim, which you should (and you’ll hopefully
_want_ to after reading this post), the simplest way to get started is:

1. **Open up your Terminal and simply run `$ vimtutor`.** This is a really
   simple step-by-step tutorial covering the basics of moving around and
   changing files. It gets progressively more advanced, but never gets hardcore.
   It’s actually quite fun, especially when you feel the pieces slotting into
   place.
2. **Look up the many Vim cheatsheets out there in order to learn Vim’s
   ‘alphabet’.** This should begin to show you how each letter on the keyboard
   usually maps to a function that starts with the same letter, for example, `d`
   means <i>delete</i>, `c` means <i>change</i>, and so on. The [main cheatsheet
   here](http://www.viemu.com/a_vi_vim_graphical_cheat_sheet_tutorial.html) is
   one of the better ones I’ve seen.
3. **[Google the rest.](https://www.google.com/webhp#q=change%20entire%20contents%20of%20parenthesis%20vim)**
   The trick with things like Vim (and Git, etc.) is just knowing enough to know
   what to ask Stack Overflow.

<small>**N.B.** The title of this post is a nod toward [Chris
Coyier](https://twitter.com/chriscoyier)’s [24 ways](http://24ways.org/) post
[<cite>Grunt for People Who Think Things Like Grunt are Weird and
Hard</cite>](http://24ways.org/2013/grunt-is-not-weird-and-hard/).</small>

## In the beginning

Most peoples’ introduction to Vim starts the same way: <q>Why on earth would you
use this?</q> <q>It’s how old?!</q> <q>You have to type _what_ to quit it?!</q>

The mere concept of Vim is alien enough for most people to just end up
dismissing or ridiculing it, but—if we’re to be objective—the fact that, yes,
people still use an editor that is over 20 years old (in turn based on a tool
from the 70s), and those people number in the hundreds of thousands, perhaps
they might be onto something. Approaching something like Vim needs a fairly open
mind, and to look at things a little more closely and objectively. Once I began
asking <q>why _do_ people use Vim?</q>, rather than <q>why on earth do people
use Vim?!</q>, it began to make a lot more sense to me. And here I am now, a
couple of years later, extolling its virtues myself.

But, I was that guy—I couldn’t work out what was so bad about using a mouse,
what was so wrong with TextMate? How on earth do you remember all these
combinations? How can you find such convoluted commands so useful?

<small>(The short answers to those questions are:</small>

* <small>If you spend 90% of your time typing, reaching for a mouse in order to
  complete certain tasks is a pretty big dent in concentration and focus.</small>
* <small>There’s nothing wrong with other editors <i>per se</i>, but Vim has a
  lot of advantages over them.</small>
* <small>Vim is very literal. `d` means delete, `c` means change, `a` means
  append, which means you can ‘speak’ your commands out loud: `dit` means
  <i>delete inside tags</i>; `ciw` means <i>change in word</i>, `gUe` means go
  uppercase to the end of the word, and so on.</small>
* <small>Commands are not convoluted, they are _composed_. The commands in the
  above list item can be deconstructed and recombined to do the same things in
  different ways: changing `dit` to `cit` means _change in tags_, instead of
  _delete in tags_. By learning Vim, you learn a handful of commands, and then
  you are free to combine and compose them in many different ways in order to
  achieve any number of tasks.)</small>

I’d watch friends using Vim and be perplexed as to why you’d possibly ever need
to type `<Esc>ggdG` to delete the entire contents of a file. How on earth can
something so bizarre do _that_? How on earth do you remember that? In what world
does that even make sense?!

In fact, the `<Esc>ggdG` example is a great demonstration of misconceptions and
misinformation in Vim world. The command to delete the entire contents of a file
is simply `dG`: `d`elete and `G`o to the bottom of the file. What `<Esc>ggdG`
_actually_ does is:

1. `<Esc>` ensures you’re in the correct mode.
2. `gg` moves your cursor to the top of the file.
3. `d` tells Vim to prepare to delete.
4. `G` tells Vim to go to the bottom of the file (whilst deleting, as per the
   previous command).

The reason someone would use (or rather, tell _you_ to use) the more verbose
`<Esc>ggdG` command is that it’s the defensive version; it’s the version that
will alway work, no matter where in the file, or in which mode, you are.

So, one of the first things to note is that ‘verbose’ commands to do one thing
usually aren’t doing one thing at all.

We’ll read later on how Vim is highly composable. The command `<Esc>ggdG` will
very robustly delete the contents of an entire file, but let’s say we want to
auto-format the contents of an entire file. That would be `<Esc>gg=G`: we swap
out `d`elete command for `=`, which means format. We want to indent the entire
file by one tab? `<Esc>gg>G`: we swap out the `d`elete command for the indent
one `>`).

{% include promo-case-studies.html %}

It’s very, very important not to take Vim commands at face value; they’re
usually presented as part of a much bigger, more defensive, more bulletproof
chain of commands. This is all part of Vim’s composability.

### Learn your text editor

It might feel a little counterproductive to introduce a learning curve to
something as basic as a text editor, but if you’re going to spend up to eight or
more hours a _day_ in there, you should know it inside out (Vim or otherwise).
It astounds me that I still see people—professional web developers—fudging their
way around the tool that pays their wages; a text editor _should_ be learned.

Starting with Vim is hard. It’s not fun, and it makes you feel stupid
(especially if someone is watching over your shoulder) but, as with most new
things, there will always be a learning curve. With Vim, however, I have found
that the curve never begins to plateau—you can learn ‘just enough’ in an
afternoon, but there’s always something more you could learn, or an even more
efficient method you can work out.

## Widely available

Getting stated with Vim is easy: it’s installed on every Unix-like system right
out of the box. Buy a new Mac? It already has Vim on it. Using someone else’s
machine? They have Vim on it. Working on a remote server? It has Vim on it.
Using Windows? Sorry :(

This is great for people who pair program a lot—you can use Vim on anyone’s
machine. The amount of times I’ve been working on someone’s computer and been
able to fire open Vim and be at home with it right away is really great. It’s
especially handy for Ops Engineers, who spend a lot of time working on and
configuring boxes all over the place; being confident in knowing your text
editor is already on that machine means you can work in confidence and comfort.

Another huge benefit of Vim’s ubiquitous nature is, to put it bluntly, money.
That’s not to suggest that it’s not worth spending money on a text editor—I
firmly believe that you should invest in things that will make you more
productive—but I really do not miss the pain involved in getting a new machine,
and having to go through any (or all) of the following:

* Getting line managers to approve a payment for a text editor (it’s not about
  the amounts involved, more the hassle and paperwork).
* Trying to find old license keys for software I rightfully bought.
* Emailing software vendors asking if I can transfer license keys to new
  machines.
* Having to find the company credit card, record an expense, etc. etc.

I know that Vim is free, it’s open source, it’s already on my machine, and I
control any of its configuration.

## Customisable and extensible

Out of the box, Vim is very simple and surprisingly powerful; it focusses only
on being a fantastic text editor. That said, you do have the option to massively
customise and extend it to better suit your own preferences.

The simplest way of doing this is through <i>dotfiles</i>; small text files that
(usually) sit invisibly in your home directory. By creating and populating a
`.vimrc` file, you can set your own custom key bindings, preferences, settings,
functionality, UI tweaks, and more. A quick look at [my
`.vimrc`](https://github.com/csswizardry/dotfiles/blob/master/.vimrc) shows you
that I’m not doing anything particularly crazy, but I have set up a few
nice-to-haves, like my own preferences for spaces for indents, and their
quantity.

Dotfiles are a fantastic, very simple way of managing your settings, and, where
Vim is concerned, are very complementary to its wide availability. Whenever I
get a new machine, I know it will already have Vim installed on it, and that I
can simply save my `.vimrc` onto this new machine and that’s it; my text editor
is exactly the way I like it, immediately.

Extending Vim is also one of its core principles—plugins can be written in a
number of languages, meaning all manner of developers can have a go at writing
extensions. Currently, I don’t write or even _use_ any plugins. I find that
relatively-vanilla Vim is more than enough for me right now, but plugins are
certainly something I should start looking into once I feel out outgrown Vim’s
default offering.

## Modes

One of the initially most confusing things about Vim is its modes, which
include, but are not limited to:

* **Command**, which is the ‘normal’ mode for Vim—the one that you’re in
  whenever you open a file.
* **Insert**, which is the mode you would enter to type stuff.
* **Visual**, which is a mode in which you can perform all types of highlighting
  trickery in order to select text.

The need for modes might feel quite odd, but a lot of developers—myself
included—don’t _just_ write code: we read it, we scan it, we review it, we check
it. Command mode is a mode that I spend a _lot_ of time in. It provides me with
a way to quickly look through large (and small) amounts of code very
effectively. For example, I can page forward or backward through a large file
using `Ctrl+f` and `Ctrl+b` respectively; I can jump my cursor
a-code-block-at-a-time using `{` or `}`; I can go to the very bottom of an
entire file with `G`; I can move my cursor to the highest, middle, or lowest
visible line by hitting `H`, `M`, or `L` respectively.

But command mode isn’t just for for moving around code; it’s for executing many
different Vim commands. I can simply skip to the highest currently visible line
by hitting `H`, sure, but if I were to hit `dH` then my cursor would jump to the
`H`ighest currently visible line whilst `d`eleting everything on its way there.

Command mode is where most of the magic happens. This is why it’s the default
mode, and the mode I spend most of my time in: manipulating code this way is
_fast_. I mean, _really_ fast.

You enter Insert mode _only_ when you want to type something. If you’re
deleting, indenting, yanking (Vim speak for <i>copy</i>) or putting (Vim speak
for <i>paste</i>), you will _not_ be in Insert mode. This is one of the most
confusing things to initially get your head round: Insert mode is not the
default mode, because—when you think about it—you typically spend less time
actually typing characters than you do moving and manipulating them. You have to
explicitly enter Insert mode before you can begin typing. There are several ways
to enter Insert mode: the most common way is to hit `i`, but you could also hit
`a`ppend, `s`ubstitute, or `c`hange-with-options (e.g. `cit` for `c`hange
`i`nside `t`ags).

Visual mode is one I don’t spend that much time in, because (usually) you can
delete, copy, change, etc. your code without needing to actually highlight it.
`V10jd` (`V`isualise full lines, `10j`umps down, and `d`elete) will highlight the
next 10 full lines, and then delete them. I can achieve the same thing by hitting
`10dd` (`10` `dd`eletions of whole lines), which deletes the next 10 whole lines
without needing them highlighted. That said, visual mode can be useful if you
don’t necessarily know the exact number lines you want to delete, but you know
that you could highlight up to a point you can <i>visualise</i>.

Modes are a great way to work through different tasks on your code without
ever leaving your text editor, or even your keyboard. For me, who spends a lot
of time [reviewing other peoples’
code](http://csswizardry.com/2013/11/code-reviews-as-a-service/), being able to
navigate it easily is a must.

## Very literal

One of the best things about Vim, and one of the things that makes it quite
quick to learn and work with, is that its commands are very literal. So much so
that you pretty much _tell_ Vim what to do in human terms:

* `diw` is `d`elete `i`nside `w`ord.
* `cat` is `c`hange `a`round `t`ags.
* `f>` is go `f`orward to a closing chevron (`>`).
* `vi"` is `v`isualise `i`nside quotes (`"`).

Being able to work like this means that—once you’ve memorised a handful of
commands—you can piece together sentences which tell you exactly what you’re
going to type; want to delete inside a sentence? Guess what: that’s `dis`. Want
to visualise around some parentheses? `va(`. Go uppercase to the end of the
current word? `gUe`.

This method of thinking about how you want to manipulate your text, and then
Just Doing It™, gives rise to the phrase <i>editing at the speed of thought</i>.
No matter how complex your operation might seem, think it, and you can do it.

## Keyboard shortcuts

We all love keyboard shortcuts, right? Right. We all cringe every time we see
someone use the mouse to head to <i>Edit » Copy</i>, <i>Edit » Paste</i>, right?
Right.

Keyboard shortcuts make repetitive, boring tasks _fast_. They save us time, and
make us more efficient. Vim is _just_ keyboard shortcuts. No mouse, no UI menus,
no dropdowns, no buttons; _just_ keyboard shortcuts. Everything in Vim is a
typed command.

As you can probably already see, Vim puts keyboard shortcuts on steroids. I
wouldn’t even like to guess how I might go about deleting the contents of a set
of HTML tags, and then duplicating the new empty tags 10 times in Sublime text
without reaching for my mouse, or hitting a lot of arrow keys. In Vim, it’s as
simple as `dit` to `d`elete the contents `i`nside of the `t`ags, and then
`yy10p`, to `y`ank (copy) the next current line (the opening and closing tags)
and then `p`ut (paste) `10` new ones. Even very specific tasks like that all map
back to keyboard shortcuts.

To handle something as specific as that _all_ from the keyboard makes editing so
much faster than without, and being able to drive your entire editor without
ever leaving the keyboard makes you surprisingly productive.

## Highly composable

As we’ve briefly looked at, one of Vim’s core principles if that of composition.
Vim has loads of tiny, single responsibility commands like `d`elete, `y`ank,
`p`ut, `g`o, `c`hange, `s`ubstitute, and so on. These commands, or <i>verbs</i>
can be used alongside <i>modifiers</i>, like `i`nside, `a`round, or `f`orward,
which are then combined with <i>nouns</i>, like `s`entence, `t`ags, `w`ord, etc.
Further, we can prepend most things with a number: `10dw` will `d`elete the next
`10` `w`ords. `5c{` will `c`hange the previous `5` blocks (`{`).

This level of composability yields fantastic results. Think about Subway for a
moment. Subway, the sandwich place. They offer an array of ingredients, all laid
out in front of you. These ingredients are _very_ versatile, because they’re
very easily combinable. You can make over **a million different sandwiches at
Subway** out of the same common set of ingredients. Offering up these much
smaller component-parts allows people to combine and compose an almost limitless
amount of variations.

Anyone who is familiar with the [Single Responsibility
Principle](http://csswizardry.com/2012/04/the-single-responsibility-principle-applied-to-css/)
will already see the huge, _huge_ benefit this brings. Instead of rigid commands
that only do one big, specific thing, we can piece together the bits we want as
we want them. Subway operates on the Single Responsibility Principle in order to
serve very customisable food via the same core ingredients.

**Vim does this for text editing.**

By offering a key set of initial, simple, single responsibility commands
(ingredients), we can start to piece together our own tasks (sandwiches) in any
combination we choose, to achieve _very_ specific goals. If I know I can `di{`
(delete inside braces) I know I can therefore `vi{`, or `ci{`, or `yi{`, or
`gUi{`. If I know I can do all that `i`nside braces, I can presume that I must
be able to do it all _`a`round_ them: `da{`.

Learning Vim isn’t about learning that `<Esc>ggdG` means enter Command mode, go
to the top of the file, delete to the bottom of the file, or that `3cit` means
change the contents of the three nested tags above my cursor, it’s about
learning that we have a `c`hange command, we have modes we can be in or out of,
we have `g`o commands, we have `d`elete commands, we have nouns like `t`ag. All
we do is learn these bits, and we piece them together exactly how we need them,
when we need them.

The cognitive overhead of Vim is a _lot_ lower than most people imagine, because
people don’t realise that we’re just learning a common alphabet, and it’s up to
_us_ to write the words we want.

## Very minimal

Finally, I just like how plain and simple Vim is to look at and work with.

There’s a reason [iA Writer](http://www.iawriter.com/mac/) is so successful:
it’s beautifully simple. You just write. There’s no clunky UI to get yourself
lost in, or to distract you. The same rings true for Vim. This is the interface
I get to spend all day looking at:

<figure>
  <img src="/wp-content/uploads/2014/06/vim-01.png" alt="A screenshot of my Vim setup">
  <figcaption>
    <a href="/wp-content/uploads/2014/06/vim-01--large.png">View full-size/quality (34KB).</a>
  </figcaption>
</figure>

Nothing superfluous, nothing ugly, nothing to distract me or get in my way; I
just get on and work. This is very superficial, and nigh-on impossible to
quantify, but I find this really helps me focus on whatever it is I’m working
on.

## Further reading

* [Jack Franklin](https://twitter.com/Jack_Franklin) runs a blog called [TIL
  Vim](http://tilvim.com/) through which he shares handy tips.
* [Vim Adventures](http://vim-adventures.com/) is a fun little game-style
  learning tool for Vim.
* [Pascal Precht](https://twitter.com/PascalPrecht) has a recent post entitled
  [<cite>Why I use Vim</cite>](http://pascalprecht.github.io/2014/03/18/why-i-use-vim/).

## Vimpressive!

After being a naysayer and detractor for a long, long time, I decided to give
Vim a try. I worry that the reason a lot of people mock Vim is because they
don’t fully understand it. Once I learned that Vim isn’t convoluted but
_composed_, and that it’s basically just a physical extension of my train of
thought, I am a lot more productive. **Vim allows me to do what I’m thinking,
and doesn’t make me think about what I’m doing.**

If you’ve never tried Vim before, I urge you, just give it a go. It might feel
alien at first, but that’s all part of the fun.
