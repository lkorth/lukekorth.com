module DeepLinkGenerator
  class PhotoPageGenerator < Jekyll::Generator
    safe true

    def generate(site)
      site.data["galleries"].each do |gallery|
        next if gallery[1]["skip_portfolio"]
        gallery[1]["photos"].each do |photo|
          site.pages << PhotoPage.new(site, gallery, photo)
        end
      end
    end
  end

  class PhotoPage < Jekyll::Page
    def initialize(site, gallery, photo)
      @site = site
      @base = site.source
      @dir  = "#{gallery[1]["link"]}#{Jekyll::Utils.slugify(photo["name"])}/"
      @basename = "index"
      @ext = ".html"
      @name = @basename + @ext

      @data = {
        "layout" => "gallery",
        "tab" => "portfolio",
        "permalink" => @dir,
        "photos" => gallery[0],
        "photo" => photo["name"]
      }
    end
  end
end
