require 'dimensions'

module Jekyll
  module PhotoFilter
    def height(slug, folder)
      Dimensions.height(_path(slug, folder))
    end

    def width(slug, folder)
      Dimensions.width(_path(slug, folder))
    end

    def post_photo(slug, page, caption)
      path = page.path.gsub("_", "").gsub(".md", "")
      <<~HTML
        <div class="wp-caption aligncenter">
          <picture>
            <source srcset="/photos/#{path}/#{slug}_thumb.webp" type="image/webp">
            <source srcset="/photos/#{path}/#{slug}_thumb.jpg" type="image/jpeg">
            <img class="size-large" src="/photos/#{path}/#{slug}_thumb.jpg" alt="#{caption}" />
          </picture>
          <p class="wp-caption-text">#{caption}</p>
        </div>
      HTML
    end

    def _path(slug, folder)
      "photos/#{folder}/#{slug}.jpg"
    end
  end
end

Liquid::Template.register_filter(Jekyll::PhotoFilter)
