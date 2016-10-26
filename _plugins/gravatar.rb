require 'digest/md5'

module Jekyll
  class Gravatar < Liquid::Tag

    def initialize(tag_name, size, token)
      super
      @size = size.strip
    end

    def render(context)
      email_address = context.registers[:site].config['gravatar_email']

      if email_address != nil
        gravatar_hash = Digest::MD5.hexdigest(email_address.downcase)
        image_src = "http://www.gravatar.com/avatar/#{gravatar_hash}"

        unless @size.empty?
          image_src = image_src+"?s=#{@size}"
        end

        image_src
      end
    end
  end
end

Liquid::Template.register_tag('gravatar_image', Jekyll::Gravatar)
