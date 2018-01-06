# Instagram
# ---------
# A Liquid tag for Jekyll for embedding Instagram photos
#
# Example:
#
# {% instagram %}
#   <div>
#     <a href="{{ item.link }}">
#       <img alt="{{ item.caption }}" src="{{ item.image_url }}" />
#     </a>
#   </div>
# {% endinstagram %}

module Jekyll
  class InstagramTag < Liquid::Block
    include Liquid::StandardFilters

    ACCESS_TOKEN = "instagram_access_token"
    CACHE_FILE = ".instagram_cache.json"

    def initialize(tag_name, markup, tokens)
      super
      @photo_block = Liquid::BlockBody.new
    end

    def parse(tokens)
      parse_body(@photo_block, tokens)
    end

    def nodelist
     [@photo_block]
    end

    def render(context)
      return "" if context.registers[:site].config[ACCESS_TOKEN] == nil

      if context.registers[:site].config[ACCESS_TOKEN] != nil && !File.exists?(context.registers[:site].config[ACCESS_TOKEN])
        raise "Instagram access token file #{context.registers[:site].config[ACCESS_TOKEN]} does not exist"
      end

      context.registers[:instagram] ||= {}

      photos = fetch_photos(File.read(context.registers[:site].config[ACCESS_TOKEN]))
      photos = photos['data'].first(6).inject([]) do |array, item|
        array.push({
          "caption" => item["caption"]["text"],
          "image_url" => item["images"]["thumbnail"]["url"],
          "link" => item["link"]
        })
        array
      end

      output = ""

      context.stack do
        photos.each do |photo|
          context["item"] = photo
          output << @photo_block.render(context)
        end
      end

      output
    end

    def fetch_photos(access_token)
      photos = nil
      if File.exist?(CACHE_FILE)
        cache = JSON.parse(File.read(CACHE_FILE))

        if (Time.now.to_i - cache["timestamp"]) < 3600
          photos = cache
        end
      end

      if photos.nil?
        uri = URI.parse("https://api.instagram.com/v1/users/self/media/recent/?access_token=#{access_token}")
        http = Net::HTTP.new(uri.host, uri.port)
        http.use_ssl = true

        response = http.request(Net::HTTP::Get.new(uri.request_uri))
        status = response.code
        body = response.body

        if status != "200"
          raise "Failed to fetch Instagram photos (#{status}): #{body}"
        end

        photos = JSON.parse(body)
        photos["timestamp"] = Time.now.to_i

        File.open(CACHE_FILE, "w") do |f|
          f.write(photos.to_json)
        end
      end

      return photos
    end
  end
end

Liquid::Template.register_tag('instagram', Jekyll::InstagramTag)
