require 'base64'
class ImageUploadService
  include ActiveModel::Model
  attr_accessor :type, :file, :capacity, :height, :width, :radio, :name

  def initialize attributes ={}
    attributes.each{|name, value| send("#{name}=", value)}
  end

  def process
    if !File.extname(file.original_filename).delete('.').downcase.in?(Settings.acceptable_types)
      errors.add :base, I18n.t("image.file_not_valid")
    elsif File.extname(file.original_filename).delete('.').downcase != type.downcase
      errors.add :base, I18n.t("image.file_type_not_match")
    else
      image = MiniMagick::Image.open(file.path)
      case radio
      when "Dimension"
        if height.present? && width.present?
          image.resize("#{width.to_i}x#{height.to_i}\!")
          image
        else
          errors.add :base, I18n.t("image.required_field_width_height")
        end
      when "Capacity"
        if capacity.present?
          if  capacity.to_i >= image[:size]
            image_encode = Base64.encode64(open(file.path).to_a.join)
            blob = Base64.decode64(image_encode)
            blob += 'a'*(capacity.to_i - image[:size])
            image = MiniMagick::Image.read(blob)
            image
          else
            errors.add :base, I18n.t("image.capacity_must_larger")
          end
        else
          errors.add :base, I18n.t("image.required_field_capacity")
        end
      end
    end
  end
end
