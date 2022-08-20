import cloudinary from "cloudinary";

export const uploadMethod = async (file) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      (result) => {
        resolve({
          result: result.secure_url,
          id: result.public_id,
        });
      },
      {
        resource_type: "auto",
        folder: "zenith",
      }
    );
  });
};
