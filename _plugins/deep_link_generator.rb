module DeepLinkGenerator
  class PhotoPageGenerator < Jekyll::Generator
    safe true

    def generate(site)
      site.data["series"].each do |s|
        next unless s[1]["series_index"]
        next if s[1]["custom_page"]

        site.pages << SeriesPage.new(site, s)

        s[1]["photos"].each do |photo|
          site.pages << PhotoPage.new(site, s, photo)
        end
      end
    end
  end

  class SeriesPage < Jekyll::Page
    def initialize(site, s)
      @site = site
      @base = site.source
      @dir  = s[1]["link"]
      @basename = "index"
      @ext = ".html"
      @name = @basename + @ext

      @data = {
        "layout"      => "series",
        "tab"         => "portfolio",
        "permalink"   => s[1]["link"],
        "photos"      => s[0],
        "description" => s[1]["description"]
      }
    end
  end

  class PhotoPage < Jekyll::Page
    def initialize(site, s, photo)
      @site = site
      @base = site.source
      @dir  = "#{s[1]["link"]}#{Jekyll::Utils.slugify(photo["name"])}/"
      @basename = "index"
      @ext = ".html"
      @name = @basename + @ext

      @data = {
        "layout"    => "series",
        "tab"       => "portfolio",
        "permalink" => @dir,
        "photos"    => s[0],
        "photo"     => photo["name"]
      }
    end
  end
end
