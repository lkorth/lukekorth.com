---
layout: post
title: Initial Results
categories: [Website]
date: 2013-05-05
header_image: /media/loadtime.png
---
After running a few quick tests to see how my new site is performing, with only a few minor optimizations (bundled css and js not minified
and a few image sprites) load times are around half a second. I also ran the excellent load testing tool
[Siege](http://www.joedog.org/siege-home/). At 500 requests/second load times were still under 2 seconds, all on shared hosting.
No chance of getting slashdotted with those numbers.

In the coming weeks and months I'll be turning on [CloudFlare](https://www.cloudflare.com/) for my site, wrestling with Ruby to get
css and js minification working and moving over to my VPS running [nginx](http://nginx.org/).
Load times should be rock solid in the 250ms neighborhood with the ability to serve 1000s of request per second.
