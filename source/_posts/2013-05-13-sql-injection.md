---
layout: post
title: SQL Injection
tags: [SQL, Security]
category: blog
sidebar: true
post: true
---
There are 
[72,393 examples of SQL injection vulnerable code on GitHub](https://github.com/search?p=1&q=extension%3Aphp+mysql_query+%24_GET).

Everyone that has ever learned to use a database in PHP probably learned using the mysql_* functions. It's quick,
easy, requires only one line to connect and it works pretty much anywhere that runs PHP and MySQL; what's not to like?
The problem is when developers migrate from learning and tutorials to writing websites in the real world. Granted, 
you will probably never find mysql_* calls with inline $_GETs at any place of business that's even half serious about
their website, but any hobbyist or developer that wants to put a website online using PHP and decides that they need to
use a database will find 90% of the tutorials using mysql_* . These tutorials may not even mention the security implications
of using mysql_* and concatenating variables (if they do mention the security implications, assuming the reader even reads the text
instead of just copy and pasting the code, they may not explain how to deal with them). You may be thinking, so what, a website
nobody visits gets owned, big deal right? Well what happens when the site is on a shared host with 100s or 1000s of other
sites and the attacker manages to escalate their privileges? What happens when some of those websites contain personal information, 
passwords and credit cards?

The best part? A result on [page 1](https://github.com/search?p=1&q=extension%3Aphp+mysql_query+%24_GET)
that [points to this repo](https://github.com/d7my11/alwaleed/blob/885b419544ecc981068da369be15f18e1fb0e0b8/cpannel/deleteshops.php)
has the following snippet:

```php
<?php
    mysql_query("DELETE FROM shops1 WHERE id='$_GET[id]'");
?>
```

If a user was on that page and submitted a form or hit the url {% highlight html %}/deleteshops.php?id=1%27%20OR%201%3D1%20--%27{% endhighlight %}
such that `$_GET['id']` was 

```html
1' OR 1=1 --'
```

 then the query becomes:

```mysql
DELETE FROM shops1 WHERE id='1' OR 1=1 --''
```

Boom, shops1 is empty, hope there wasn't anything important in it...like [student records](http://xkcd.com/327/)...

Jeff Atwood has a [very short and to the point](http://www.codinghorror.com/blog/2005/04/give-me-parameterized-sql-or-give-me-death.html)
post about several of the reasons why you should be using parameterized queries. mysql_* functions don't support prepared statements or
parameterized queries, not to mention they will be removed in a future version of PHP, so don't use them!
If you think that's too much work and don't want to learn mysqli or PDO, take a look at [RedBean](http://redbeanphp.com/)
it's even easier then writing a string with a call to mysql_query.