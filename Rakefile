require 'rubygems'
require 'webrick'
require 'directory_watcher'
require "term/ansicolor"
require "jekyll"
require "rdiscount"
require "yaml"
include Term::ANSIColor
include WEBrick

task :default => :develop
 
desc 'Build site with Jekyll.'
task :build => :tags do
	printHeader "Compiling website..."
	options = Jekyll.configuration({})
	@site = Jekyll::Site.new(options)
	@site.process
end
 
def globs(source)
  Dir.chdir(source) do
    dirs = Dir['*'].select { |x| File.directory?(x) }
    dirs -= ['_site']
    dirs = dirs.map { |x| "#{x}/**/*" }
    dirs += ['*']
  end
end

desc 'Enter development mode.'
task :develop => :build do
  printHeader "Auto-regenerating enabled."
  directoryWatcher = DirectoryWatcher.new("./")
  directoryWatcher.interval = 1
  directoryWatcher.glob = globs(Dir.pwd)
  directoryWatcher.add_observer do |*args| @site.process end
  directoryWatcher.start
  mimeTypes = WEBrick::HTTPUtils::DefaultMimeTypes
  mimeTypes.store 'js', 'application/javascript'
  server = HTTPServer.new(
    :BindAddress => "localhost",
    :Port => 4000,
    :DocumentRoot => "_site",
    :MimeTypes => mimeTypes,
    :Logger => Log.new($stderr, Log::ERROR),
    :AccessLog => [["/dev/null", AccessLog::COMBINED_LOG_FORMAT ]]
  )
  thread = Thread.new { server.start }
  trap("INT") { server.shutdown }
  printHeader "Development server started at http://localhost:4000/"
  printHeader "Opening website in default web browser..."
  
  ##
  #%x[open http://localhost:4000/]
  #%x[subl ./]
  printHeader "Development mode entered."
  thread.join()
end

desc 'Remove all built files.'
task :clean do
  printHeader "Cleaning build directory..."
  %x[rm -rf _site]
end

task :new do
  title = ask("Title: ")
  article = {"title" => title, "layout" => "post"}.to_yaml
  article << "---"
  fileName = title.gsub(/[\s \( \) \? \[ \] \, \: \< \>]/, '-').downcase
  path = "_posts/#{Time.now.strftime("%Y-%m-%d")}#{'-' + fileName}.markdown"
  unless File.exist?(path)
    File.open(path, "w") do |file|
      file.write article
      sh "mate " + path
    end
      puts "A new article was created at #{path}."
  else
    	puts "There was an error creating the article, #{path} already exists."
  end
end

def ask message
  print message
  STDIN.gets.chomp
end

def printHeader headerText
  print bold + blue + "==> " + reset
  print bold + headerText + reset + "\n"
end

desc 'Generate tags pages'
task :tags => :tag_cloud do
  puts "Generating tags..."
  require 'rubygems'
  require 'jekyll'
  include Jekyll::Filters

  options = Jekyll.configuration({})
  site = Jekyll::Site.new(options)
  site.read_posts('')

  FileUtils.rm_rf("blog/category")

  site.tags.sort.each do |tag, posts|
    html = <<-HTML
---
layout: default
title: "#{tag}"
tab: blog
sidebar: true
---
<!-- posts list -->
<div id="posts-list">
    <h2 class="page-heading"><span>BLOG</span></h2>
	
	{% for post in site.posts %}
		{% for tag in post.tags %}
			{% if tag == "#{tag}" %}
				{% include post-summary.html %}
			{% endif %}
		{% endfor %}
	{% endfor %}		

</div>
<!-- ENDS posts list -->	
HTML
    FileUtils.mkdir_p("blog/category/#{tag.downcase.gsub(/\s+/, '-')}")
    File.open("blog/category/#{tag.downcase.gsub(/\s+/, '-')}/index.html", 'w+') do |file|
      file.puts html
    end
  end
  puts 'Done.'
end

desc 'Generate tags pages'
task :tag_cloud do
  puts 'Generating tag cloud...'
  require 'rubygems'
  require 'jekyll'
  include Jekyll::Filters

  options = Jekyll.configuration({})
  site = Jekyll::Site.new(options)
  site.read_posts('')

  html = "<ul class=\"tag-cloud\">\n"
  max_count = site.tags.map{|t,p| p.count}.max
  site.tags.sort_by{rand}.each do |tag, posts|
    s = posts.count
    font_size = ((2 - 0.8*(max_count-s)/max_count)*2).to_i/2.0
    html << "\t<li><a href=\"/blog/category/#{tag.downcase.gsub(/\s+/, '-')}\" title=\"Posts tagged with #{tag}\" style=\"font-size: #{font_size}em; line-height:#{font_size}em\">#{tag}</a></li>\n"
  end
  html << '</ul>'
  File.open('_includes/tag-cloud.html', 'w+') do |file|
    file.puts html
  end
  puts 'Done.'
end

desc 'Generate archive pages'
task :archives do
  puts 'Generating archives...'
  require 'rubygems'
  require 'jekyll'
  include Jekyll::Filters

  options = Jekyll.configuration({})
  site = Jekyll::Site.new(options)
  site.read_posts('')
  
  currentYear = Time.new.year
  lastMonth = ''
  lastYear = 0

  html = "<ul class=\"archives\">\n"
  site.posts.reverse.each do |post|
	if post.date.year == currentYear
		if Date::MONTHNAMES[post.date.month] != lastMonth
			html << "\t<li><a href=\"/blog/#{post.date.year}/#{post.date.month}/\" title=\"Posts in #{Date::MONTHNAMES[post.date.month]}\">#{Date::MONTHNAMES[post.date.month]}</a></li>\n"
			lastMonth = Date::MONTHNAMES[post.date.month]
		end
	else
		if post.date.year != lastYear
			html << "\t<li><a href=\"/blog/#{post.date.year}/\" title=\"Posts in #{post.date.year}\">#{post.date.year}</a></li>\n"
			lastYear = post.date.year
		end
	end
  end
  html << '</ul>'
  File.open('_includes/archives.html', 'w+') do |file|
    file.puts html
  end
  puts 'Done.'
end
