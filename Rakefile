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

if (/cygwin|mswin|mingw|bccwin|wince|emx/ =~ RUBY_PLATFORM) != nil
  puts '## Set the codepage to 65001 for Windows machines'
  `chcp 65001`
end

##########
# Jekyll #
##########

desc "Clean out caches"
task :clean do
  rm_rf [".pygments-cache/**", ".sass-cache/**", "css/screen.css", "_site"]
end

desc "Generate Jekyll site"
task :generate => :clean do
  puts "## Generating Site with Jekyll"
  system "compass compile --css-dir css"
  system "jekyll build"
end

desc "Preview the site in a web browser"
task :preview => :clean do
  puts "Starting to watch source with Jekyll and Compass. Starting Rack on port #{server_port}"
  system "compass compile --css-dir css" unless File.exist?("css/screen.css")
  jekyllPid = Process.spawn({"OCTOPRESS_ENV"=>"preview"}, "jekyll build --watch")
  compassPid = Process.spawn("compass watch")
  rackupPid = Process.spawn("rackup --port 4000")

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
  ok_failed system("rsync -avze 'ssh -p #{ssh_port}' #{exclude} #{rsync_args} #{"--delete" unless rsync_delete == false} _site/ #{ssh_user}:#{document_root}")
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

