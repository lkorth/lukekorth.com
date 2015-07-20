---
layout: post
title: Private Cloud Syncing of the Future
categories: [Cloud, New Technology]
date: 2013-09-22
---
It seems like every day there is a new cloud service that lets you store and sync
your data. They all offer varying levels of encryption, security and privacy and are
all priced relatively similar. Most users are perfectly fine with the limitations that
come with their cloud service of choice and many are happy to use the free edition or
pay a fee for the convenience of it. 

<!--more-->

I've never really been a big fan of most of the cloud providers, whether it was due to pricing
or giving a third party access to all of my data. There are relatively few providers that offer
true, trust no one (TNO), levels of security. Most providers use some form of encryption during upload
and storage, but most of the time they can usually decrypt it when 
[compelled](http://readwrite.com/2011/04/20/how-to-keep-dropbox-employees) without any form of
action from you. Even if it's just to build a convenient search index or rendering online
previews, [your files are being opened and read](http://www.wncinfosec.com/dropbox-opening-my-docs/)
in some form or another.

There are many users, for the reasons previously listed or for reasons of their own, that would prefer
the convenience of cloud syncing without the cost or worry over who has access to what. There are already some
really powerful tools that have been around for a long time that can make this a reality. [Rsync](http://rsync.samba.org/)
is a fast incremental file transfer tool that's very common in the Linux and server world. In the past I've used
rsync on my computer along with an [Android client](https://play.google.com/store/apps/details?id=eu.kowalczuk.rsync4android) to
wirelessly copy everything stored on my phone. It worked, but it was far from the best experience. I wanted to sync my entire 
data directory (emulated sd card storage on my Galaxy Nexus and newer phones without sd cards), but due to the large number of files
and the sheer file size, the rsync Android client would often choke and just stop working. It wasn't a huge issue since rsync is incremental,
I could just restart it and go from there, but it was far from optimal.

Enter [BitTorrent Sync](http://labs.bittorrent.com/experiments/sync.html). Most people are familiar with BitTorrent
used for P2P downloading, legal and illegal file sharing. BitTorrent Sync takes the phenomenal protocol that is BitTorrent
and uses it to sync folders and data between your devices without any need for a centralized server. BitTorrent Sync
supports read-only along with read/write access making it super easy to let your friends and family
access photos and other data by copying and pasting a key from their email into a BitTorrent Sync client
or scanning a QR code with their phone without having to worry that they might accidentally delete your only copy.
BitTorrent Sync also excels at large media files, so you'll never need to worry about emailing a video or uploading to YouTube.

Syncing could be a hassle if your devices are not online at the same time, but this is an easily solvable problem. 
For those familiar with git and other DVCSs, you can easily push and pull code directly from other peers, 
just like you can directly sync data between peers with BitTorrent Sync, but for the most part everyone 
still seems to use a central server (ala [GitHub](https://github.com)) because it's easier
and there are lots of great features that come along with it. To solve the issue of offline devices 
an always-on server can be used. There are numerous tutorials for using BitTorrent Sync with Amazon's 
AWS or other Linux servers, but it really shines if you already have an external hard drive or NAS and a Raspberry Pi or 
similar low power computer. Jack Minardi has written a very good tutorial on 
[BitTorrent Sync and a Raspberry Pi](http://jack.minardi.org/raspberry_pi/replace-dropbox-with-bittorrent-sync-and-a-raspberry-pi/)
that steps you through everything you need to get going (UPDATE: v1.4 was recently release with some new features and changes, make sure to 
[download](http://www.bittorrent.com/sync/download) the most recent Linux ARM copy). If you do go this route, make sure to go through
Jack's Extra Credit section for starting on boot and securing access to your web based control panel.
In preparation for setting up BitTorrent Sync, I also used a script to remove a lot of the unneeded packages
that come installed on the Raspberry Pi's default OS when you're going to run it as a headless server. My
fork can be found on [GitHub](https://github.com/lkorth/raspbian-mod)

If you're hoping for browser based previews and access to your files, you may want to also checkout [OwnCloud](http://owncloud.org/)
which has a bunch of additional private cloud features.

Give BitTorrent Sync a try and see what you think, I'm interested in hearing what uses others can dream up for it. I'm
already using it to backup my entire phone (apps backed up with Titanium Backup to storage and storage is backed up wirelessly to 
my external hard drive). In the future I'm thinking about using it to transparently share my camera folder with others.
