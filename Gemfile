source "https://rubygems.org"

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

gem "rails", "~> 5.1.3"
gem "mysql2", ">= 0.3.18", "< 0.5"
gem "puma", "~> 3.7"
gem "sass-rails", "~> 5.0"
gem "jquery-rails"
gem "uglifier", ">= 1.3.0"
gem "coffee-rails", "~> 4.2"
gem "jbuilder", "~> 2.5"
gem "dotenv-rails"
gem "pry-rails"
gem "mini_magick"
gem "config"

# Layout
gem "bootstrap-sass"
gem "autoprefixer-rails"

group :development, :test do
  gem "pry-byebug"
  gem "capybara", "~> 2.13"
  gem "rspec-rails"
end

group :development do
  gem "web-console", ">= 3.3.0"
  gem "listen", ">= 3.0.5", "< 3.2"
end

group :production do
  gem "pg", "0.18.4"
  gem "rails_12factor"
end
