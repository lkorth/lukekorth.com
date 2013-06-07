---
layout: post
title: RESTful Pebble
tags: [Android, Pebble]
category: blog
sidebar: true
post: true
---
httpebble for Android has been renamed to [Pebble Connect with httpebble](https://play.google.com/store/apps/details?id=com.lukekorth.httpebble). It also got an update
today that included several new features.

The first of which is a list of httpebble enabled watch faces

![Watch face list](/media/watchface-list.png)

If you have developed a httpebble enabled watch face and would like to see it listed in the app, [contact me](mailto:blog@lukekorth.com)

The second new feature is a RESTful notification API. Currently the API only supports notifications on the Pebble via
POSTing to a url and an [If This Then That](https://ifttt.com/) channel. In the future there will be support for
sending data directly to a watch face.

The current API is very simple and consists of a HTTP POST request to [https://ofkorth.net/pebble/send](#) with the body
of the request consisting of the following

```
type=notification
userId=[user id entered in app]
userToken=[user token entered in app]
title=[the title of the notification]
body=[the body of the notification]
```

To give it a try with curl via command line use the following

```
curl -v --data "\
userId=[USER_ID_HERE]&\
userToken=[USER_TOKEN_HERE]&\
title=[TITLE_HERE]&\
body=[BODY_HERE]&\
type=notification" \
https://ofkorth.net/pebble/send
```

To use the ifttt channel, you must enable the Wordpress channel with `ofkorth.net/pebble` as the domain, your
user id as the username and user token as the password. When creating an ifttt recipe, you should select the
Wordpress create a post option. The text you enter for the title will appear as the title in the notification
on your Pebble and the text entered for the body will appear as the body of the notification on your Pebble.
Categories and tags can be left blank, select publish immediately and give it a spin!

Enjoy!