require 'rubygems'
require 'json'
require 'net/http'
require 'nokogiri'
require 'open-uri'
require 'digest/md5'

module Jekyll
  class AppBox < Liquid::Tag

    @id = ''
    @style = ''

    def initialize(tag_name, markup, tokens)
      super
      @result = Hash.new

      @resultarray = ['icon', 'screenshots', 'name', 'url', 'version', 'price', 'developer', 'developerurl','rating', 'ratingcount']

      @cachefolder = File.expand_path "../.appboxcache", File.dirname(__FILE__)
      FileUtils.mkdir_p @cachefolder

      if markup =~ /([A-Za-z]+\s|\s)([A-Za-z._0-9]+)/i
        @id = $2.strip
        @style = $1.strip
      else
        puts "Error with Markup. Your Values -- Id: #{@id} -- Style: #{@style}"
      end
    end

    def render(context)
      # Get ID of post to generate identifying MD5 hash
      @page_path = context["page"]["path"]
      # make sure to pass only posts with id
      unless @page_path.nil?
        if File.exist? get_cached_file(@id, @page_path)
          get_cached_data(@id)
        else
            googleplay_fetch_data(@id)
        end

        out = ''
        out += get_small_style

        if @style == 'screenshots'
          out += get_screenshot_style
        end
        out += get_footer

        %(#{out})
      end
    end

    def get_small_style
      small = ''
      small +=  "<p><div class=\"appbox\"><a class=\"appbutton\" href=\"#{@result["url"]}\">"
      small += "<img alt=\"Get it on Google Play\" src=\"http://developer.android.com/images/brand/en_generic_rgb_wo_45.png\" />"
      small += "</a>"
      small += "<div><a href=\"#{@result["url"]}\">"
      small +=  "<img class=\"appicon\" src=\"#{@result["icon"]}\" /></a></div>"
      small +=  "<div class=\"appdetails\"><div class=\"apptitle\"><a href=\"#{@result["url"]}\">#{@result["name"]}</a></div>"
      small +=  "<div class=\"developer\"><a href=\"#{@result["developerurl"]}\">#{@result["developer"]}</a></div>"
      small +=  "<div class=\"price\">#{@result["price"]} #{get_rating_stars(@result["rating"])}</div>"
      small +=  "</div>"
      small
    end

    def get_footer
      footer = ''
      footer += "</div></p>"
      footer
    end

    def get_screenshot_style
      screenshots = ''

      screenshots += "<div class=\"screenshots\"><div class=\"slider\"><ul>"
      unless @result["screenshots"].empty?
        @result["screenshots"].each do |screenshot|
          screenshots += "<li><img src=\"#{screenshot}\" /></li>"
        end
      end
      screenshots += "</ul></div></div>"
      screenshots
    end

    def get_rating_stars(value)
      stars = ''
      value.to_i.times do |star|
        stars += "<span class=\"rating star\"></span>"
      end
      unless value.modulo(1) < 0.5
        stars += "<span class=\"rating half-star\"></span>"
      end
      halfstar = 0
      halfstar = 1 if value.modulo(1) >= 0.5
      (5 - value.to_i - halfstar).times do |emptystar|
        stars += "<span class=\"rating unstar\"></span>"
      end
      stars += "<span class=\"rating count\">(#{@result["ratingcount"]})</span>"
      stars
    end

    def googleplay_fetch_data(app_id)
      base_url = 'https://play.google.com'

      doc = Nokogiri::HTML(open("#{base_url}/store/apps/details?id=#{app_id}"), nil, 'utf-8')

      # requestarray hints:
      # 1) App Icon e.g. big icon in Chrome Webstore
      # 2) Array of screenshots
      # 3) Name of the app
      # 4) URL to the app
      # 5) Versionnumber of the app
      # 6) Price of the app
      # 7) Developername
      # 8) Developer URL
      # 9) Rating value
      # 10) Number of ratings

      requestarray = [ doc.css("div.cover-container img").first['src'],
                        doc.css("div.thumbnails img.screenshot").collect {|thumb| thumb['src']},
                        doc.css("div.info-container div.document-title div").first.content,
                        base_url + "/store/apps/details?id=#{app_id}",
                        doc.css("div[itemprop=softwareVersion]").first.content,
                        doc.css("meta[itemprop=price]").first['content'],
                        doc.css("div.info-container div a.document-subtitle").first.content,
                        base_url + doc.css("div.info-container div a.document-subtitle").first['href'],
                        doc.css("div.tiny-star div.current-rating").first['style'][/\d+\.\d+/].to_f.round(1) / 100 * 5,
                        doc.css("div.reviews-stats span.reviews-num").first.content
                         ]
      @resultarray.zip(requestarray).each do |result, request|
        if request.kind_of?(String)
          @result[result] = request.strip
        else
          @result[result] = request
        end
      end

      if @result["price"] == 0 || @result["price"] == "0"
        @result["price"] = "Free"
      end

      save_cached_data(get_cached_file(app_id, @page_path))
    end

    def get_cached_data(app_id)
      cached_file = get_cached_file(app_id, @page_path)
      @result = JSON.parse File.read cached_file if File.exist? cached_file
      return nil if @result.nil?
    end

    def save_cached_data(cached_file)
      File.open(cached_file, "w") do |file|
        file.write @result.to_json
      end
    end

    def get_cached_file(app_id, page_path)
      File.join @cachefolder, "#{app_id}-#{Digest::MD5.hexdigest(page_path)}.cache"
    end

  end
end

Liquid::Template.register_tag('appbox', Jekyll::AppBox)

