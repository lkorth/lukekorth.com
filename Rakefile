desc "Deploy website via rsync"
task :deploy do
  rm_rf [".sass-cache/**", ".pygments-cache/**", "_site"]
  system "jekyll build"
  system("rsync -avze 'ssh -p 22022' --delete _site/ luke@ofkorth.net:/usr/share/nginx/www/lukekorth/")
end

