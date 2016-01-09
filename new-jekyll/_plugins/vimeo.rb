# Custom plugin from https://github.com/optikfluffel/octopress-responsive-video-embed

module Jekyll
  class Vimeo < Liquid::Tag

    def initialize(name, id, tokens)
      super
      @id = id
    end

    def render(context)
      %(<div class="vimeo"><div class="vimeo-player"><iframe width="100%" height="100%" src="//player.vimeo.com/video/#{@id}"></iframe></div></div>)
    end
  end
end

Liquid::Template.register_tag('vimeo', Jekyll::Vimeo)
