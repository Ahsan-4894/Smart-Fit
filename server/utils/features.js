import { v2 as cloudinary } from "cloudinary";

export const getBase64 = (file) =>
  `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

export const uploadFilesToCloudinary = async (files = []) => {
  const uploadAllFilesPromises = files.map(async (file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        getBase64(file),
        {
          folder: "SmartFit/",
          resource_type: "auto",
        },
        (error, result) => {
          if (error) reject(error);
          resolve(result);
        }
      );
    });
  });

  try {
    const results = await Promise.all(uploadAllFilesPromises);
    const formattedResults = results.map((result) => ({
      public_id: result.public_id,
      imgUrl: result.secure_url,
    }));

    return formattedResults;
  } catch (error) {
    console.log(error);
  }
};
