---
layout: post
title: Pebble Locker
tags: [Android, Pebble]
category: blog
sidebar: true
post: true
---
One bit of functionality that I've wanted with my [Pebble](http://getpebble.com/) has been to lock my phone with 
a pin or password when the Pebble disconnects, thus securing my phone when I walk away from it. While it is possible
to do this with a combination of [Tasker](https://play.google.com/store/apps/details?id=net.dinglisch.android.taskerm)
and [Secure Settings](https://play.google.com/store/apps/details?id=com.intangibleobject.securesettings.plugin&hl=en) I
was never really happy with the solution. It wasn't reliable and it was very heavy and hackish (services always running 
in the background and lots of root access). One of my biggest annoyances with some Android apps are that they unnecessarily 
run constantly in the background. To solve these issues for users that just want a very light app that doesn't need root access,
I created [Pebble Locker](https://play.google.com/store/apps/details?id=com.lukekorth.pebblelocker).

[Pebble Locker](https://play.google.com/store/apps/details?id=com.lukekorth.pebblelocker) uses the 
[device admin API](http://developer.android.com/guide/topics/admin/device-admin.html) created by Google to control the lock state 
and password of the device. Once [Pebble Locker](https://play.google.com/store/apps/details?id=com.lukekorth.pebblelocker)
is made a device administrator, whenever your Pebble connects or disconnects, [Pebble Locker](https://play.google.com/store/apps/details?id=com.lukekorth.pebblelocker)
disables or enables your lock screen with the pin/password you entered. [Pebble Locker](https://play.google.com/store/apps/details?id=com.lukekorth.pebblelocker)
also has the option to lock the device instantly upon disconnect. 

The device admin API provides a reasonable amount of functionality such as disabling lock screen widgets and the lock screen camera. 
If you would like to see additional functionality that is not in the app, feel free to comment. Unfortunately the way I'm using 
the device admin API, it does not appear possible to use a pattern lock, only a numeric pin or password.