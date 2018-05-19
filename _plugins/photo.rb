require 'dimensions'

module Jekyll
  module PhotoFilter
    def height(slug, folder)
      Dimensions.height(_path(slug, folder))
    end

    def width(slug, folder)
      Dimensions.width(_path(slug, folder))
    end

    def _path(slug, folder)
      "photos/#{folder}/#{slug}.jpg"
    end
  end
end

Liquid::Template.register_filter(Jekyll::PhotoFilter)
