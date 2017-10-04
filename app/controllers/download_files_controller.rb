class DownloadFilesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @active_tab = 0
    @image = ImageUploadService.new
  end

  def create_image
    @image = ImageUploadService.new(image_params)
    result = @image.process
    if result.class == MiniMagick::Image
      render json: {success: true, image_path: result.path, name: params[:name], ext: params[:type]}
    else
      @active_tab = 1
      render json: {success: false, download_image_errors: @image.errors.messages[:base].join}
    end
  end

  def download_image
    image = File.open(params[:image_path])
    image_name = params[:name].present? ? params[:name] : "TestImage"
    send_file image.path, filename: "#{image_name}.#{params[:ext]}"
  end

  def image_params
    params.permit(:type, :file, :capacity, :width, :height, :radio, :name)
  end
end
