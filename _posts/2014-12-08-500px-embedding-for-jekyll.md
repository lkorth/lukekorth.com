---
layout: post
title: 500px Embedding for Jekyll
categories: [Jekyll, Photography, Website]
date: 2014-12-08
---
From time to time I like to read through [500px ISO](https://iso.500px.com/) to look at the amazing
photos and gather some inspiration. One of my favorite parts of 500px ISO is the overlay on the
photos that allow you to vote and also link directly to the photo and photographer on
[500px](http://500px.com).

<!-- more -->

I recently realized 500px ISO was just using the embedded snippets built right into 500px. On 500px,
right next to the sharing buttons, there is an embed button that provides a chunk of html and some
javascript to embed a photo. Since I'd rather not copy the chunk of html for every photo I want to
embed, I wrote [jekyll-500px-embed](https://github.com/lkorth/jekyll-500px-embed) to use on my
website. jekyll-500px-embed is a Jekyll plugin that adds a `500px` Liquid tag for use on your Jekyll
powered website. The [README](https://github.com/lkorth/jekyll-500px-embed/blob/master/README.md)
details the setup required for the plugin, but once it's setup you can simply pass the photo's id to
the `500px` tag

```
{% raw %}{% 500px 89255597 %}{% endraw %}
```

and when your site is built, it will produce the following

<div class="spacer"></div>

{% 500px 89255597 %}

<div class="spacer"></div>

[jekyll-500px-embed](https://github.com/lkorth/jekyll-500px-embed) is available on GitHub. New
features and pull requests are welcome.
