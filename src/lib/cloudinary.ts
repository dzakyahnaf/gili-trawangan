import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a File object to Cloudinary and returns the secure URL.
 */
export async function uploadImage(file: File): Promise<string> {
  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    console.warn("[CLOUDINARY] Credentials missing, falling back to mock Unsplash URL.");
    return `https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80`;
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: "gili-trawangan" },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          reject(error);
        } else {
          resolve(result?.secure_url || "");
        }
      }
    ).end(buffer);
  });
}

/**
 * Extracts Cloudinary public ID from its URL and deletes the image.
 */
export async function deleteImage(imageUrl: string): Promise<boolean> {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !imageUrl.includes("cloudinary.com")) {
    console.log("[CLOUDINARY] Skipping delete (no config or not a Cloudinary image).");
    return true;
  }

  try {
    // URL format: https://res.cloudinary.com/cloud_name/image/upload/v1234567/folder/public_id.jpg
    const parts = imageUrl.split("/upload/");
    if (parts.length < 2) return false;

    // Get the path after /upload/ (e.g. v1234567/folder/public_id.jpg)
    const afterUpload = parts[1];
    
    // Remove version segment (starts with 'v' followed by digits)
    const segments = afterUpload.split("/");
    if (segments[0].match(/^v\d+$/)) {
      segments.shift(); // remove version
    }
    
    // Join remaining segments and remove extension to get public ID
    const pathWithExt = segments.join("/");
    const publicId = pathWithExt.replace(/\.[^/.]+$/, ""); // strip extension (e.g. gili-trawangan/abc)

    console.log("[CLOUDINARY] Deleting publicId:", publicId);
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === "ok";
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    return false;
  }
}
