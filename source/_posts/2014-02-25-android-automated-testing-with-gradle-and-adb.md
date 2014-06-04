---
layout: post
title: Android Automated Testing with Gradle and ADB
categories: [Android, Linux]
date: 2014-02-25
comments: true
---
While working on some automated testing with Android today I ran across two rather annoying peculiarities with some
of the tooling surrounding Android, namely Gradle and ADB. The project I am working on is in Android Studio and using
Gradle for build automation. When setting up a continuous integration build I noticed that the build would run the emulator
and then install the library and tests, but not run any of the tests. After several hours of digging it turns out that Gradle
will happily install and run the tests on an emulator that has not completely started. When this happens the tests
do not run and there is no error, the build is successful, but if you look at the output closely no tests are run.

The root cause was my reliance on the `adb wait-for-device` command which according to `adb`'s documentation
will "block until device is online". In my experience `wait-for-device` will only block until the emulator is
powered on, but still not ready to run tests. When you couple this with Gradle installing tests, but not running them
if the emulator is completely booted you end up with a build that doesn't run tests and is very difficult to track
down what is happening.

To work around this we can poll the emulator over `adb` shell to see if it is ready using the following
code after you start the emulator and before running your test task in Gradle.

```bash
while [[ `adb shell pm path android` == 'Error'* ]]; do
  sleep 2
done
```
