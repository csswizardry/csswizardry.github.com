---
layout: page
title: My Setup and Tools
page-class: page--uses
meta: "My setup and toolkit"
permalink: /uses/
---

I often get asked about the tools and setup I use, so I’ve decided to try and
keep a canonical reference at this URL. I’ve split the list into two loose
halves, [software](#software) and [hardware](#hardware).

* [Software](#software)
  * [iTerm2](#iterm2)
  * [Vim](#vim)
  * [Operator Mono](#operator-mono)
  * [Git](#git)
  * [CLI Tools](#cli-tools)
  * [Dotfiles](#dotfiles)
  * [Chrome](#chrome)
  * [Adobe Creative Cloud](#adobe-creative-cloud)
  * [Sketch](#sketch)
  * [Slack](#slack)
  * [1Password and ZenMate](#1password-and-zenmate)
  * [Netflix and MUBI](#netflix-and-mubi)
  * [Dropbox](#dropbox)
  * [Priority Pass](#priority-pass)
  * [Misc macOS](#misc-macos)
* [Hardware](#hardware)
  * [Office](#office)
  * [MacBook Pro](#macbook-pro)
  * [27″ Thunderbolt Display](#27-thunderbolt-display)
  * [iPhone](#iphone)
  * [Nexus 5](#nexus-5)
  * [Shure SE425](#shure-se425)
  * [Apple Watch](#apple-watch)
  * [Aeron Chair](#aeron-chair)
  * [Blue Yeti Mic](#blue-yeti-mic)
  * [Minaal](#minaal)

- - -

## Software

Naturally, as a web developer, software is pretty important to me. I use many
different tools depending on what I need to do, but the following is the kind of
stuff I use daily, or would be one of the first things I install on a new
machine.

### iTerm2

When I worked at [Sky](https://en.wikipedia.org/wiki/Sky_UK), developers were
issued with a MacBook Pro and a corporate Windows 7 desktop. The MacBooks came
with PGP pre-installed, and didn’t have solid state drives, so every read
from/write to disk took an age. This meant that most engineers just used their
MacBooks as Spotify and Outlook machines, and blitzed their Windows box in
favour of a Linux distro.

After several months of trying to run a large LAMP application on a commodity
hardware Windows box, I soon followed suit and opted for Ubuntu. My first foray
into Linux turned me into a CLI convert (mainly because the Linux/Ubuntu UI is
too painful to look at for any length of time) and I soon started doing
everything from the command line: filesystem traversal, Git, managing files, and
editing text.

I just use stock Bash, because I’ve never found it lacking for anything I’ve
ever wanted to achieve.

I haven’t used Ubuntu for a long time now, but on macOS I still do everything
from the Terminal, which in this case is [iTerm2](https://www.iterm2.com/). This
means that my workflow is pretty seamless—I don’t need to frequently jump
between many different apps because everything I need is right here in the same
window.

### Vim

> How do you spot a Vim user at a dinner party? Oh, don’t worry, they’ll tell
> you. — [@csswizardry](https://twitter.com/csswizardry/status/831929830103011330)

I’m a very avid and unashamed [Vim](http://www.vim.org/) user. I’ve been using
it for about five years now and still learn something new every time I fire it
up (a text editor with over 40 years of history has a lot to be learned).

I use vanilla Vim and not a derivative or wrapper (e.g. Neovim or MacVim), and I
use it from the command line.

I do everything from my text editor, from drafting emails, writing code, writing
articles, taking notes, arranging thoughts, etc.

I use a small handful of plugins, the key ones being

* [gitgutter](https://github.com/airblade/vim-gitgutter): Git information
  (insertions, deletions, modifications) right in my text editor;
* [editorconfig](https://github.com/editorconfig/editorconfig-vim): Make it
  super simple to follow other peoples’ coding conventions—particularly useful
  for me as I work with so many different teams;
* [auto-pairs](https://github.com/jiangmiao/auto-pairs) and
  [closetag](https://github.com/alvan/vim-closetag): Autocompletion plugins.

I don’t use much more than that—five years of using Vim means that you soon
learn to achieve things without plugins.

I think the reason that most Vim users become so evangelical is because

0. Vim is just _fun_. If you like learning things then Vim has a limitless
   amount of things for you to delve into. It becomes addictive;
0. once you’ve ‘mastered’ it, you begin to see glaring inefficiencies in any
   other text editors. The idea of using anything else feels pretty outrageous.

### Operator Mono

I use [_Operator
Mono_](https://www.typography.com/fonts/operator/styles/operatormono) in both
Vim and my terminal because it’s just beautiful. I spend most of my days looking
at code, so it ought to be presented well:

<figure>
  <img src="/wp-content/uploads/2017/04/operator-mono.png" alt="" />
  <figcaption>Screenshot of Operator Mono in terminal Vim. <a href="/wp-content/uploads/2017/04/operator-mono-full.png">View full size/quality (271KB).</a></figcaption>
</figure>

### Git

I only really have experience with the [Git](https://git-scm.com/) VCS, so it’s
all I’ve really ever used. I adore Git for so many reasons, but my favourite
thing has to be just how cheap it is to use: with how simple it is to create a
repo, or how fast it is to make new branches, there’s no excuse for having
unversioned work. It’s such an elegant, powerful tool—I only wish I knew more of
it.

### CLI Tools

I use a bunch of handy tools from the command line on a daily basis:

* [Ack](https://beyondgrep.com/): A better source code search for programmers. I
  absolutely _love_ Ack. Read more about why [you should use it
  too](https://csswizardry.com/2017/01/ack-for-css-developers/).
* [ghi](https://github.com/stephencelis/ghi): View your repo’s GitHub issues
  from right there on the command line!
* [Parker](https://github.com/katiefenn/parker): Static analysis for your CSS
  projects. My buddy [Katie](http://www.katiefenn.co.uk/) made this and it’s so
  good. Here’s how you can [make the most of
  it](https://csswizardry.com/2016/06/improving-your-css-with-parker/).
* [Wget](https://www.gnu.org/software/wget/) and [curl](https://curl.haxx.se/):
  I feel like I use Wget as more of a utility, mainly for just saving files to
  disk, and curl as more of a debugging tool (inspecting headers, for example).

### Dotfiles

I host [my dotfiles on
GitHub](https://github.com/csswizardry/dotfiles/blob/master/.vimrc), if you’re
interested in taking a look. There’s nothing really remarkable in most of them.

### Chrome

[Chrome](https://www.google.com/chrome/browser/) is by browser of choice for
just about everything: browsing, building, testing. I use it on my desktop and
my phone.

For cross-browser testing I have every other macOS-compatible browser installed
on my machine, and an account with
[BrowserStack](https://www.browserstack.com/).

### Adobe Creative Cloud

I have the full [Creative Cloud](http://www.adobe.com/creativecloud.html)
subscription which gives me access to the entire Creative Suite. I mainly use
Photoshop, but it’s nice to have Illustrator to hand for diagrams and other
vector work.

### Sketch

I worked on [a project for the
NHS](https://csswizardry.com/case-studies/nhs-nhsx-elearning-platform/) a few
years back and the designer was using [Sketch](https://www.sketchapp.com/). I
bought a copy so that I was able to properly translate the designs, but haven’t
really used it much since. I really admire what Sketch is doing—proving that a
small team can compete with the big players whilst making quality, affordable
software—but I still find Illustrator way easier to use. I guess I’ve never
really had a decent reason to fully immerse myself in Sketch, so I’ve only
maintained a very superficial knowledge of it.

### Slack

I must be a member of over 20 [Slack](https://slack.com/) channels—nearly _all_
of my clients use it. And with good reason: Slack is great. I have a paid Slack
account for CSS Wizardry Ltd. that I use for people I mentor, and for projects
where it’s not possible or appropriate to use the client’s instance.

### 1Password and ZenMate

I use [1Password](https://1password.com/) to manage passwords because, well,
because why wouldn’t you? Hyper-secure passwords that can be changed at the drop
of a hat.

[ZenMate](https://zenmate.com/) is a great little VPN that I use to spoof my
location or access the internet over public or insecure networks.

### Netflix and MUBI

I really like [Netflix](https://www.netflix.com/), but really _don’t_ like their
region locking (especially since they began blocking my VPN). It’s a super
first-world problem to have, but I might be halfway through a series in the UK
and want to catch up on it in my hotel in, say, the States, only to find that
the content is unavailable. I’d actually happily pay triple the amount for a
Netflix Worldwide subscription that I could access everything with.

Another criticism of Netflix is that there’s a clear focus on quantity over
quality: there are some absolutely amazing things on there, but it’s so hard to
find them for all of the other noise. I started using [MUBI](https://mubi.com/)
a couple of years ago after a client recommended it to me, and it’s _great_: only 30
films on the site at any given time, and each day a new film is added and the
oldest one is removed. This means you can watch a new film _every single day_,
and they’re all curated and handpicked by film critics and reviewers.

### Dropbox

I tend to drop nearly all of my non-dev project files into
[Dropbox](https://www.dropbox.com/), because I don’t really want to keep much
data actually _on_ my machine (plus it makes setting up new machines much
faster).

### Priority Pass

This is more of a service than it is software, but [Priority
Pass](https://www.prioritypass.com/) deserves a special mention. If you take
more than (I would estimate) eight flights a year, you should probably get
Priority Pass.

Basically, most airports have lounges that offer wifi, food, drink, showers,
places to nap, and/or any combination of the above. Lounges are usually only
available to business class travelers (and I _never_ fly business) which makes
sense—it’s a slightly more luxurious way of traveling.

But if you spend a lot of time in airports then it’s more a necessity than a
luxury. In 2015 I visited 26 airports in a 60 day period, and at that frequency
you really do start to need a little more stability than a 24 hour Starbucks can
offer you. With Priority Pass, regardless of what travel class you are, you get
access to over a thousand lounges worldwide just by showing the staff your card.
I use this at least twice on every trip I make. I can grab some food, jump on
the wifi, take a shower (I’ve actually only ever done this once—on the way back
to the UK from New Zealand—but it made an enormous difference), have a drink,
and regroup my thoughts and senses mid-journey, and all for no more than the
yearly cost of the Priority Pass membership. It’s effectively all free, if you
treat the membership as a separate expense.

Honestly, you should probably look into it.

### Misc macOS

There are a handful of other tools that I make a point of installing on day one
of having a new machine:

* [Alfred](https://www.alfredapp.com/)
* [Caffeine](http://lightheadsw.com/caffeine/)
* [BetterSnap](https://www.boastr.net/bettersnaptool/)
* [f.lux](https://justgetflux.com/)[^1]
* [ImageOptim](https://imageoptim.com/mac)
* [JPEGMini](http://www.jpegmini.com/)

- - -

## Hardware

My hardware needs are pretty simple: I’m an Apple user (though most certainly
not a fan, of late…) who travels a lot, so lightweight is my key consideration.

### Office

<figure>
<img src="/wp-content/uploads/2017/04/duke.jpg" alt="">
<figcaption>
Fun fact; that’s actually me sat near the brick wall.
<a href="/wp-content/uploads/2017/04/duke-full.jpg">View full size/quality (628KB).</a>
</figcaption>
</figure>

I have [a desk](http://duke-studios.com/workspace#desk-rental) at [Duke
Studios](http://duke-studios.com/), a co-working space in Leeds. I travel a
_lot_ for work, so having an actual office to ground me when I’m home is really
important to me. Duke has a really diverse set of residents, from accountants to
software engineers, copywriters to landscape architects. It’s also got [Grub &
Grog](http://www.grubandgrog.co.uk/) right there in the building, which is a
treat. In the event that I’m working remotely—or I’m working on business and
admin tasks—I’ll probably be at Duke.

### MacBook Pro

I recently moved from a MacBook Air that I got in mid 2013 and opted for a more
powerful [MacBook Pro](http://www.apple.com/macbook-pro/). I absolutely love the
form factor of the Air, but its limited memory and storage—and lack of
expansion—were reason enough to switch. I got a MacBook Pro around the beginning
of February 2017.

I decided against the new Touch Bar version because of hearing lots of
less-than-favourable reviews, plus after spending ~£2,000 on a new machine I’m
loathe to spend half that amount again on new adaptors and cables. Instead, I
got a top-spec previous-generation model:

* 2015 13″ MacBook Pro;
* Retina;
* 16GB RAM;
* 3.1GHz i7 processor.

I went from a 4GB Air to a 16GB pro in one move, and it’s been noticeable! It’s
a really great machine, not too heavy, but I do miss the slimness of the Air.
This is also my first retina machine and oooooh wow, it’s so nice!

### 27″ Thunderbolt Display

Whenever I am in my office, I hook my machine up to a 27″ Thunderbolt Display
that I picked up in 2013, when I first started working for myself. It’s a
beautiful (if a little overpriced) bit of kit in and of itself, but I _really_
notice the lack of retina nowadays. You can see pixels everywhere! I’m going to
stick with it though—it’s too expensive to replace for such a superficial
reason.

I also use the standard Magic Mouse and a wired Apple keyboard alongside it. The
gestures on the mouse are very nice to work with, and I still really like having
a numpad on my keyboard.

### iPhone

I’m really tempted by the Google Pixel, but I feel too invested in the Apple
ecosystem to make such a drastic change. I currently use an [iPhone
6](http://www.apple.com/iphone/) which—despite the handset itself being less
than a year old—runs awfully slowly. I’m convinced that software updates are
designed to slow down previous generation devices in order to encourage users to
upgrade. It’s a tactic that works, because I’m already thinking of getting an
iPhone 7 (it takes a number of seconds to switch between apps on my current
phone). I’d _love_ to get an iPhone 7 Plus just for the camera, but I really
don’t want anything of that size.

### Nexus 5

I have a [Nexus 5](https://www.google.com/intl/en_uk/nexus/5x/) which is use for
performance profiling. Its continued prevalence coupled with its modest spec
make it a great testing device.

### Shure SE425

I listen to a _lot_ of music. I guess more accurately, I listen to music a lot.
I have a number of different head/earphones, but my all-round favourites are my
[Shure SE425s](https://www.shure.co.uk/products/earphones/se425): they’re
in-ear, so nice and discrete; comfortable, so I can wear them all day;
astounding quality, for what I need at least; very robust, so they travel well.
If you’re looking for some good quality earphones then I would wholeheartedly
recommend these.

### Apple Watch

I own and wear an [Apple Watch](http://www.apple.com/watch/), and I wish I
didn’t. I feel like I wear it out of some weird Stockholm Syndrome kind of
reason (I really like the daily calorie and move goals), so on it stays. It
lacks any individuality, brings annoying notifications to yet another device,
and needs charging once every 1.75 days. Honestly, I would not recommend one. If
you want a smart watch for sports then there are probably much better and more
purpose-built ones on the market.

### Aeron Chair

I’m pretty tall (190cm) so have a bad tendency to slouch at chairs. When I
started working for myself—and was in charge of what equipment I could use—I
decided to treat myself to an [Aeron
chair](http://www.hermanmiller.co.uk/products/seating/performance-work-chairs/aeron-chairs.html).
I bought it brand new, although I hear that refurbished models tend to be great
quality.

I barely notice that it exists, which is half annoying considering how much I
spent on it, but obviously great because it means it’s doing its job perfectly.
The last thing you want is a chair that you notice you’re sat in.

### Blue Yeti Mic

If I’m appearing on a podcast or making a long or important Skype call, I’ll
plug in a [Yeti](http://www.bluemic.com/products/yeti/) microphone. For the
price it’s _okay_, but I think I’ll need a slightly better setup if I want to
ever do anything more in-depth like screencasts etc.

### Minaal

As I mentioned previously, I travel a lot for work. I always used to check in a
suitcase which I was totally fine with, but after meeting Jimmy from
[Minaal](https://www.minaal.com/) in New Zealand I’ve been using a Minaal bag
for about a year. Now I travel everywhere with just hand luggage, and it made me
realise just how awful checked luggage is.

Since using the Minaal travel has become a lot smoother—I don’t need to arrive
at the airport as early, I don’t have to entrust my belongings to anyone else, I
don’t run the risk of airlines losing my luggage (which has happened to me twice
before).

The Minaal is designed specifically with frequent travelers in mind, and it
shows. It has a well placed compartment for every occasion, and it holds _so
much_. I did two weeks of travel with it and didn’t need to do any laundry or
wear any item of clothing twice. The capacity is astounding!

- - -

I think that’s about everything. If there’s anything more specific you’d like to
know about just [drop me a line](/contact/).

If you liked this, you’ll probably like [Wes’](http://wesbos.com/uses), which is
where I got the idea.

[^1]: f.lux is still [better than Night Shift](https://forum.justgetflux.com/topic/3655/f-lux-vs-night-shift-in-macos-10-12-4/8).
