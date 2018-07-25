# Custom plugin from https://github.com/optikfluffel/octopress-responsive-video-embed

module Jekyll
  class Vimeo < Liquid::Tag

    def initialize(name, id, tokens)
      super
      @id = id.strip
    end

    def render(context)
      <<~HTML
        <div class="wp-caption aligncenter">
          <div style="padding: 56.25% 0 0 0; position: relative;">
            <iframe src="//player.vimeo.com/video/#{@id}?loop=1" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
          </div>
          <script src="https://player.vimeo.com/api/player.js"></script>
        </div>
      HTML
    end
  end
end

Liquid::Template.register_tag('vimeo', Jekyll::Vimeo)
