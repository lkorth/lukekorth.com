require "rake"
require "RMagick"
require "image_optim"

task :optimize_photos do
  image_optim = ImageOptim.new(:pngout => false, :svgo => false)

  Dir.glob("photos/**/*.jpg").each do |file|
    if !file.include?("_thumb")
      image = Magick::Image::read(file).first
      thumbnail_name = file.sub(File.extname(file), "_thumb#{File.extname(file)}")

      thumbnail = image.resize_to_fit(1000, 1000)
      thumbnail.write(thumbnail_name)

      image_optim.optimize_image!(file)
      image_optim.optimize_image!(thumbnail_name)
    end
  end
end

task :build => :optimize_photos do
  `jekyll build`
end

task :deploy => :build do
  `firebase deploy`
end
