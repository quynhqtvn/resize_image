Rails.application.routes.draw do
  root "download_files#index"
  post "create_image", to: "download_files#create_image"
  get "download_image", to: "download_files#download_image"
end
