# Based on jekyll-datapage_gen from
# https://github.com/avillafiorita/jekyll-datapage_gen

module Jekyll
  module Sanitizer
    def sanitize_filename(name)
      if(name.is_a? Integer)
        return name.to_s
      end
      return name.downcase.strip.gsub(' ', '-').gsub(/[^\w.-]/, '')
    end
  end

  class PhotoDetailPage < Page
    include Sanitizer

    def initialize(site, base, gallery, photo)
      @site = site
      @base = base

      @dir = "galleries/#{gallery["folder"]}/#{sanitize_filename(photo["name"]).to_s}/"
      @name = "index.html"

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'),"photo_detail.html")
      self.data['title'] = photo["name"]
      # add all the information defined in _data for the current record to the
      # current page (so that we can access it with liquid tags)

      self.data.merge!({ "gallery" => gallery, "photo" => photo })
    end
  end

  class PhotoDetailPageGenerator < Generator
    def generate(site)
      site.data["galleries"].each do |gallery|
        gallery = gallery[1]
        gallery["photos"].each do |photo|
          site.pages << PhotoDetailPage.new(site, site.source, gallery, photo)
        end
      end
    end
  end

  module PhotoDetailPageLinkGenerator
    include Sanitizer

    # use it like this: {{input | datapage_url: dir}}
    # to generate a link to a data_page.
    #
    # the filter is smart enough to generate different link styles
    # according to the data_page-dirs directive ...
    #
    # ... however, the filter is not smart enough to support different
    # extensions for filenames.
    #
    # Thus, if you use the `extension` feature of this plugin, you
    # need to generate the links by hand
    def datapage_url(input, dir)
      extension = Jekyll.configuration({})['page_gen-dirs'] ? '/' : '.html'
      "#{dir}/#{sanitize_filename(input)}#{extension}"
    end
  end
end

Liquid::Template.register_filter(Jekyll::PhotoDetailPageLinkGenerator)
