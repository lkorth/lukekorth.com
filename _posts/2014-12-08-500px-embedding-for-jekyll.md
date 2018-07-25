---
layout: post
title: 500px Embedding for Jekyll
categories: [Jekyll, Photography, Website]
date: 2014-12-08
custom_excerpt: "From time to time I like to read through [500px ISO](https://iso.500px.com/) to look at the amazing
photos and gather some inspiration. One of my favorite parts of 500px ISO is the overlay on the
photos that allow you to vote and also link directly to the photo and photographer on
[500px](http://500px.com)."
---
# Update

On June 15th, 2018 500px [shut off their API](https://support.500px.com/hc/en-us/articles/360002435653-API-).
This plugin used the 500px API to retrieve information about a photo in order to render the embedded
html and no longer functions without the API.

# Original Post

From time to time I like to read through [500px ISO](https://iso.500px.com/) to look at the amazing
photos and gather some inspiration. One of my favorite parts of 500px ISO is the overlay on the
photos that allow you to vote and also link directly to the photo and photographer on
[500px](http://500px.com).

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

<div class="pixels-photo">
  <p><img src="https://drscdn.500px.org/photo/89255597/m%3D900/v2?user_id=647958&webp=true&sig=fb857239a869387efeb9378c2c7a0ecde86126b93cc3d9e4e493f06d8d3ba50b" alt="Trail Through the Redwoods by Luke Korth on 500px.com"></p>
  <a href="https://500px.com/photo/89255597/trail-through-the-redwoods-by-luke-korth" alt="Trail Through the Redwoods by Luke Korth on 500px.com"></a>
</div>
<script type='text/javascript' src='https://500px.com/embed.js'></script>

[jekyll-500px-embed](https://github.com/lkorth/jekyll-500px-embed) is available on GitHub. New
features and pull requests are welcome.
