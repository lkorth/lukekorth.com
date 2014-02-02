---
layout: post
title: Linux NFS Server 
tags: [Linux, Tutorial]
category: blog
sidebar: true
post: true
---
I've been working on moving the network file share on my home network from an NTFS volume with my Asus router acting as a NAS host to an ext4
volume running as an NFS share via a [Raspberry Pi](http://www.raspberrypi.org/). I was starting to have issues with corruption and missing 
files so I decided to take the time and bulletproof the setup as much as possible.

Rewriting the partition table with [fdisk](http://linux.die.net/man/8/fdisk) and formatting the drive as ext4 was very simple, but setting
up an NFS server was more challenging than it should have been. I'm working on a Raspberry Pi running Debian Wheezy so it seemed like a 
simple Google search to find what was needed to setup the NFS server. Pretty much every tutorial and set of instructions I ran across 
seemed to be out dated though. Most referenced the portmap package which has been since replaced in favor of rpcbind. After a lot of
tinkering, I've managed to get the most basically configured NFS server up and running. In the hopes of saving others time, I've written
up how I set it up below.

Install NFS server and dependencies

```bash
sudo apt-get install nfs-kernel-server rpcbind nfs-common
```

Create or edit `/etc/default/rpcbind` and make sure it only contains

```ini
OPTIONS=""
```

Edit `/etc/hosts.allow` and add the network you would like to be able to access your NFS share. In my case it's 192.168.1.0/24

```ini
portmap: 192.168.1.
```

Next we need to edit `/etc/default/nfs-common` to handle NFS4. Make sure `NEED_IDMAPD` is set to `YES`

```ini
NEED_IDMAPD=YES
```

We also need to edit `/etc/idmapd.conf`. Make the necessary changes so it matches the following. `YOUR_DOMAIN_HERE` should be the url,
hostname or FQDN of your server.

```ini
[General]
Verbosity = 0
Pipefs-Directory = /var/lib/nfs/rpc_pipefs
Domain = YOUR_DOMAIN_HERE
 
[Mapping]
Nobody-User = nobody
Nobody-Group = nogroup
```

Now we can finally configure how and which directory we want to share via NFS. Edit `/etc/exports` and add a new line.
`/path/to/shared/folder` should be the directory you wish to share, in my case it is a mounted usb drive in /mnt/external. Again
you should add the network that you would like to be able to access your NFS share.

```ini
/path/to/shared/folder   192.168.1.0/24(rw,no_root_squash,no_subtree_check,crossmnt,fsid=0)
```

Finally we can start our server. `rpcbind` needs to be started first

```bash
sudo /etc/init.d/rpcbind start
```

And then we can start `nfs-kernel-server`

```bash
sudo /etc/init.d/nfs-kernel-server start
```

You should now have a working NFS server! There are many options that you can tweak in `/etc/exports` depending on your needs, refer to 
the [man page](http://linux.die.net/man/5/exports).
