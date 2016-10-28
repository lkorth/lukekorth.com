---
layout: post
title: Pebble Developer Retreat 2014
categories: [Pebble, Social]
date: 2014-10-09
---
Another year, another awesome [Pebble](https://getpebble.com/) [Developer Retreat](https://developer.getpebble.com/events/developer-retreat-2014/).
The retreat this year was 4 days of talks on new features, making great looking images on a black and white display,
pushing Pebbles to their limits by running OpenGL and writing directly to the framebuffer, a developer meetup, Pebbles talking
directly to other devices over Bluetooth 4 Low Energy, a whole day of [Pebble controlled robots playing soccer](http://www.youtube.com/watch?v=KSMFjlc6H88),
how to get the best battery life possible and developers showing off what they've developed for Pebble.
Over 100 developers from 14 countries were present.

The retreat started off with an introduction to the [new APIs](https://developer.getpebble.com/2/changelog-2.6.html) including the
[FrameBuffer API](https://developer.getpebble.com/2/api-reference/group___drawing.html#ga8754945b07f6cb168a8acb6ab1aa07aa) for
advanced graphics and [Background Workers](https://developer.getpebble.com/2/guides/background-guide.html) for always on, background
activity monitors. Pebble also announced a few new APIs they are working on that are coming soon, the Wake Up API allows apps to schedule
a time when they should be brought to the foreground to run and Bluetooth Low Energy (LE) support for a central role.

A Pebble employee gave a talk on battery life, which remains one of Pebble's key features, during the retreat and I found the stats
shared to be very interesting. Running current firmware, a Pebble battery will last for

* 4 hours with the backlight on constantly
* 1 day when using a watch face with a 30fps animation
* 36 days when Bluetooth is turned off
* 14 days when using a watch face that updates every minute
* 12 days when using a watch face that updates every minute and a background app with accelerometer sampling at 100hz with 25 sample batches
* 9 days when using a watch face that updates every second

For those optimizing animations, Pebble also pointed out that the screen is drawn in rows so an animation
that updates fewer rows per frame will results in better battery life.

Developers were given the chance to put the Bluetooth LE APIs to work on Saturday; an alpha firmware build with Bluetooth LE support
was distributed, which allows Pebbles to act in a central role and talk to other peripheral Bluetooth LE devices.
And of course what fun would these be without a challenge and a little bit of competition?
The goal was to use Pebble's Bluetooth LE support to talk to a [microcontroller](http://punchthrough.com/bean/)
and remote control a soccer playing robot. Developers spent the day Saturday building robots and writing code
to control them and the evening and night playing a highly competitive series of soccer games.
The recording of the live stream [is on YouTube](http://www.youtube.com/watch?v=KSMFjlc6H88). This was by far and
away the most fun I've had at a retreat or conference.

{% img /media/pebble-bot.jpg %}
{% img /media/robots-playing-soccer.jpg %}

The retreat was a great experience, meeting talented developers from around the world and seeing how quickly Pebble is iterating
and adding new features that make the platform more useful than ever. Hats off to everyone at Pebble for their work organizing
and running it.

