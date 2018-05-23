require "rake"
require "RMagick"

task :generate_thumbnails do
  Dir.glob("photos/**/*.jpg").each do |file|
    if !file.include?("_thumb")
      image = Magick::Image::read(file).first
      thumbnail = image.resize_to_fit(600, 600)
      thumbnail.write(file.sub(File.extname(file), "_thumb#{File.extname(file)}"))
    end
  end
end

task :build => :generate_thumbnails do
  `jekyll build`
end

task :deploy => :build do
  `firebase deploy`
end
