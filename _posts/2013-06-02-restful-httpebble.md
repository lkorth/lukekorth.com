---
layout: post
title: RESTful httpebble
tags: [Android, Pebble]
category: blog
sidebar: true
---
[httppebble for Android](https://play.google.com/store/apps/details?id=com.lukekorth.httpebble) got an update
today that included several new features.

The first of which is a list of httpebble enabled watch faces

![Watch face list](/media/watchface-list.png)

If you have developed a httpebble enabled watch face and would like to see it listed in the app, [contact me](mailto:blog@lukekorth.com)

The second new feature is a RESTful notification API. Currently the API only supports notifications on the Pebble via
POSTing to a url, but it will soon add support for an [If This Then That](https://ifttt.com/) 
channel and sending data to a watch face to power things like stocks, sports scores and anything else you can dream up.

The current API is very simple and consists of a HTTP POST request to [https://httpebble.com/send](#) with the body
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
https://httpebble.com/send
```

Enjoy!