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

require "digest"
require "net/http"
require "uri"
require "open-uri"

module Jekyll
  class InstagramTag < Liquid::Block
    include Liquid::StandardFilters

    URL_FILE = ".instagram"
    CACHE_FILE = ".instagram_cache.json"
    PHOTO_DIR = "photos/instagram/"

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
      return "" unless File.exist?(URL_FILE)

      if !File.exists?(URL_FILE)
        raise "Instagram url file .instagram does not exist"
      end

      photos = fetch_photos(File.read(URL_FILE))
      photos = photos['items'].first(6).inject([]) do |array, item|
        photo_path = find_or_create(item["attachments"].first["url"])

        array.push({
          "caption" => item["title"],
          "image_url" => "/#{photo_path}",
          "link" => item["url"]
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

    def fetch_photos(json_url)
      photos = nil
      if File.exist?(CACHE_FILE)
        cache = JSON.parse(File.read(CACHE_FILE))

        if (Time.now.to_i - cache["timestamp"]) < 86400
          photos = cache
        end
      end

      if photos.nil?
        uri = URI.parse(json_url)
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

    def find_or_create(image_url)
      path = PHOTO_DIR + Digest::SHA2.hexdigest(image_url)
      if !File.exist?(path)
        IO.copy_stream(open(image_url), path)
      end

      return path
    end
  end
end

Liquid::Template.register_tag('instagram', Jekyll::InstagramTag)
