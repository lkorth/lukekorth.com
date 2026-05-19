---
layout: post
title: Space Calendar
categories: [Space, Open Source]
date: 2026-05-18
---
A while back the New York Times [shut down their space calendar](https://martzobservatory.org/ny-times-space-calendar/),
which I had subscribed to for years. [It](https://www.nytimes.com/explain/2023/astronomy-space-calendar)
was a single curated calendar feed covering rocket launches, moon phases, eclipses,
meteor showers and more. I couldn't find a good replacement so I set out to build my own twist on it and wrote
[Space Calendar](https://github.com/lkorth/space-calendar).

Space Calendar generates personalized ICS feeds you can subscribe to in Google Calendar, Apple
Calendar, Outlook, or anything else that supports calendar subscriptions. You can pick what
categories you want — launches, sky events, planetary events, space history anniversaries, and more —
and get a URL to subscribe to. It includes the things you'd expect — moon phases, top meteor showers
— but also includes local astronomy club events, recently discovered asteroids, and localized,
up-to-date aurora forecasts.

Most of the geometric data is static. Moon phases and eclipses don't change so they're pre-computed
from USNO and JPL data via a GitHub Actions workflow. Rocket launch schedules are temperamental, so they're
pulled from The Space Devs Launch Library and cached hourly. Aurora forecasts come from NOAA
and refresh every few hours. All run at the edge on Cloudflare Workers.

You can set it up at [space-calendar.lukekorth.com](https://space-calendar.lukekorth.com) and the
source is on [GitHub](https://github.com/lkorth/space-calendar). Ideas, requests, and contributions
are welcome.
