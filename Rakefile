require "rake"
require "rmagick"
require "webp_ffi"
require "image_optim"

JPG = ".jpg"

desc "Generate thumbnails and optimize photos"
task :optimize_photos do
  image_optim = ImageOptim.new(:pngout => false, :svgo => false)

  Dir.glob("photos/**/*#{JPG}").each do |file|
    if !file.include?("_thumb")
      image_optim.optimize_image!(file)

      next if File.exist?("#{File.dirname(file)}/.skip_thumbnail")

      image = Magick::Image::read(file).first
      thumbnail_name = file.sub(JPG, "_thumb#{JPG}")

      thumbnail = image.resize_to_fit(1000, 1000)
      thumbnail.write(thumbnail_name) { self.quality = 80 }

      image_optim.optimize_image!(thumbnail_name)

      webp_file = file.sub(JPG, ".webp")
      webp_thumbnail_name = thumbnail_name.sub(JPG, ".webp")
      WebP.encode(file, webp_file, quality: 80, method: 6)
      WebP.encode(thumbnail_name, webp_thumbnail_name, quality: 85, method: 6)
    end
  end
end

desc "Deploy site to Firebase"
task :deploy do
  sh "jekyll build"
  sh "firebase deploy"
end
