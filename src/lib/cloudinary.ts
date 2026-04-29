// Cloudinary upload — mock for development
// In production, use cloudinary npm package

export async function uploadImage(file: File): Promise<string> {
  // In production, upload to Cloudinary and return URL
  console.log("[CLOUDINARY MOCK] Uploading image:", file.name);
  return `https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80`;
}

export async function deleteImage(publicId: string): Promise<boolean> {
  console.log("[CLOUDINARY MOCK] Deleting image:", publicId);
  return true;
}
