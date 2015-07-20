require "rubygems"
require "bundler/setup"
require "stringex"

## -- Rsync Deploy config -- ##
# Be sure your public key is listed in your server's ~/.ssh/authorized_keys file
ssh_user       = "luke@ofkorth.net"
ssh_port       = "22022"
document_root  = "/usr/share/nginx/www/lukekorth/"
rsync_delete   = true
rsync_args     = ""  # Any extra arguments to pass to rsync

## -- Configs -- ##
public_dir      = "public"     # compiled site directory
source_dir      = "source"     # source file directory
server_port     = "4000"       # port for preview server eg. localhost:4000

if (/cygwin|mswin|mingw|bccwin|wince|emx/ =~ RUBY_PLATFORM) != nil
  puts '## Set the codepage to 65001 for Windows machines'
  `chcp 65001`
end

##########
# Jekyll #
##########

desc "Clean out caches: .pygments-cache, .gist-cache, .sass-cache and public folder"
task :clean do
  rm_rf [".pygments-cache/**", ".gist-cache/**", ".sass-cache/**", "source/stylesheets/screen.css", public_dir]
end

desc "Generate Jekyll site"
task :generate => :clean do
  puts "## Generating Site with Jekyll"
  system "compass compile --css-dir #{source_dir}/stylesheets"
  system "jekyll build"
end

desc "Preview the site in a web browser"
task :preview => :clean do
  puts "Starting to watch source with Jekyll and Compass. Starting Rack on port #{server_port}"
  system "compass compile --css-dir #{source_dir}/stylesheets" unless File.exist?("#{source_dir}/stylesheets/screen.css")
  jekyllPid = Process.spawn({"OCTOPRESS_ENV"=>"preview"}, "jekyll build --watch")
  compassPid = Process.spawn("compass watch")
  rackupPid = Process.spawn("rackup --port #{server_port}")

  trap("INT") {
    [jekyllPid, compassPid, rackupPid].each { |pid| Process.kill(9, pid) rescue Errno::ESRCH }
    exit 0
  }

  [jekyllPid, compassPid, rackupPid].each { |pid| Process.wait(pid) }
end

##############
# Deploying  #
##############

desc "Deploy website via rsync"
task :deploy => :generate do
  exclude = ""
  if File.exists?('./rsync-exclude')
    exclude = "--exclude-from '#{File.expand_path('./rsync-exclude')}'"
  end
  puts "## Deploying website via Rsync"
  ok_failed system("rsync -avze 'ssh -p #{ssh_port}' #{exclude} #{rsync_args} #{"--delete" unless rsync_delete == false} #{public_dir}/ #{ssh_user}:#{document_root}")
end

##################
# Helper methods #
##################

def ok_failed(condition)
  if (condition)
    puts "OK"
  else
    puts "FAILED"
  end
end

