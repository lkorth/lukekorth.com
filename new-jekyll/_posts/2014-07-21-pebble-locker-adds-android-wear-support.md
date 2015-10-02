---
layout: post
title: Pebble Locker Adds Android Wear Support
categories: [Android]
date: 2014-07-21
---
Last week [Pebble Locker](https://play.google.com/store/apps/details?id=com.lukekorth.pebblelocker)
added first class support for [Android Wear](http://www.android.com/wear/) allowing users to add their Android Wear devices as a trusted
device and automatically lock and unlock their phones and tablets.

Pebble Locker uses the [WearableListenerService](http://developer.android.com/reference/com/google/android/gms/wearable/WearableListenerService.html#onPeerConnected(com.google.android.gms.wearable.Node)) to learn when Android Wears are connected and disconnected. The source code is available on [GitHub](https://github.com/lkorth/pebble-locker)

