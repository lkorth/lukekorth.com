---
layout: post
title: Android 5.0 Breaks Dislock
categories: [Android]
date: 2014-11-17
---
Since the final release of Android Lollipop has started to roll out to devices in the last week or two
many users of [Dislock](https://play.google.com/store/apps/details?id=com.lukekorth.pebblelocker)
have noticed that it no longer removes the pin or password set on their device. I've spent a lot
of time testing and trying a few workarounds, but the results are all the same, the removal
of a pin, password or pattern has no effect until after a reboot. This breaks Dislock on Lollipop and most
likely future versions of Android. [Other apps](http://benhirashima.com/skiplock/faq/) like Dislock have
also had the same problem. A few days ago I published an update to Dislock on the Play Store that restricts
it to KitKat or older version of Android, specifically Dislock only supports API 14-19, Android 4.0 - 4.4.

<!-- more -->

It's sad to see a breaking change in Android effectively kill an app that I've spent so much time and effort
working on and supporting for close to two years now with many thousands of users.
The user base of Dislock has a large majority on KitKat and on devices that will very soon receive
over-the-air updates to Lollipop.

{% img /media/dislock-device-versions.png %}

The light at the end of the tunnel for users is Lollipop has very similar features built into the OS now
and they will be able to transition over to them when upgrading. It's possible that this change was
deliberate to prevent Dislock and apps like it from interfering with the now built in support.

Please feel free to comment or email me if you have further questions.


