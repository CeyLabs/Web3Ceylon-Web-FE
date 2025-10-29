import cloudinary from "cloudinary";

const configuredCloudinary = cloudinary.v2;

if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
    throw new Error('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME environment variable is not set');
}

configuredCloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export default configuredCloudinary;
