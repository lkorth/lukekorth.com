---
layout: post
title: New Apps on the Horizon
categories: Android
sidebar: true
post: true
---
After some back and forth with a user of my Facebook Notifications
app I've been looking at a few new ideas for apps. The services of
[Notifo](http://notifo.com/) were pointed out to me.  I have been thinking of
something roughly similar to this over the past month or so and this just makes
me want to work on it more. From the small amount of reading on I did on
[Notifo](http://notifo.com/) it looks like they had a very extensive set of
services they supported. I don't ever plan on having the coverage they did,
after all I'm just working on this in my free time, but part of my idea is
to have a simple API so others can use it for anything they wish. Initially
I'm planning on a very simple HTTP API that users can send a message to a
webpage and have it pushed to their phone. Anyone with a service that can
make HTTP requests should be able to come up with some very useful implementations
for this.

I am also thinking about developing a Twitter app similar to my [Slk Notifications
for Facebook](https://market.android.com/details?id=com.lukekorth.facebookNotifications)
app that would push a message to a users phone whenever their
Twitter handle was mentioned. I know this has been done several times over,
but there are some interesting tools out there to use for this and I want to
work with them. Besides that, there is something to be said for a very simple, small
and efficient implementation of something. Especially without running services,
which most of the apps currently use. Twitter has a very interesting real-time
streaming API and there is a great PHP implementation of it called
[Phirehose](https://github.com/fennb/phirehose) (brilliantly named of course)
that I plan on using. It should be a fairly straight-forward build with the code
and infrastructure I already have in place.
