---
layout: post
title: New Website, Huzzah!
categories: [Website]
sidebar: true
post: true
---
After a year and a half of having a terrible looking website that was only supposed to be a
temporary placeholder, I've finally gotten around to building a new one.

I'm no designer so it took me a while to find a layout that I liked (I'm still not sure how much
I like this one and there is plenty of tweaking still to be done) and from there I started building
the backend. I wanted to build up my website and blog by hand rather than use something like WordPress
because there are just *way* too many features that I didn't want (don't get me started on the security issues!).
All I wanted was a simple site where I could write my posts in 
[Markdown](http://daringfireball.net/projects/markdown/) and have them show up.
I also wanted it to be quick and I thought it would be a great learning exercise.

I started out using [Slim](http://www.slimframework.com/) micro framework in PHP along with
[Twig](http://twig.sensiolabs.org/) for the templates and [RedBean](http://redbeanphp.com/)
for the database/ORM. I really enjoy working with these three libraries and I got close to half
my site built before it went on the back burner for a little while. In the mean time I had a chance
to work on some stuff in [Silex](http://silex.sensiolabs.org/) and found it to be really amazing so
I thought about moving from [Slim](http://www.slimframework.com/) to
[Silex](http://silex.sensiolabs.org/), but I had also been looking at some sites built using the
ever-increasingly-popular [Jekyll](https://github.com/mojombo/jekyll) ([Obama's team used it to handle
more than a quarter of a billion in donations](http://kylerush.net/blog/meet-the-obama-campaigns-250-million-fundraising-platform/)).
Now I have pretty much zero experience with Ruby, but the idea was interesting. Why do I need a 
dynamic site if 90% of the time it was going to be serving the same thing over and over. 
The speed of a static site is nothing to sneeze at either and that's what finally put me over the edge to try
[Jekyll](https://github.com/mojombo/jekyll) after seeing
[Philip I Thomas's](http://www.philipithomas.com/) [tweet](https://twitter.com/philipithomas/status/322524816978632704).
So after a few nights of hacking together some Ruby my first version is ready for the world.

My entire site as it stands before you is [on GitHub](https://github.com/lkorth/lukekorth.com)
(I'm not really sure how the world functioned BGH...or Before GitHub). I have several things
that I've been wanting to write about and I have been saving them until my site was finished,
so I've got plenty of posts in the hopper. I'm also going to be adding a page for all my photos and
current projects. I'm still a little torn between just posting my photos or waiting to use
[500px](http://500px.com/)'s [new portfolios](http://500px.com/blog/597/announcing-new-portfolios).
It seems silly to pay for another service when I already have web hosting, but I really like the idea
of a having a central place where my photos are managed. I guess it depends on how nice they end up looking,
if they can be used on any domain and how nice the urls are. For now if you want to check out my photos,
head over to [my 500px profile](http://500px.com/LukeKorth).
