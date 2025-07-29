export const MAX_IMAGE_SIZE_MB = 5;

export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png"];

export const IMAGE_MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
};

export const PROFILE_IMAGE_SIZE_CLASS: Record<number, string> = {
  114: "h-[114px] w-[114px]",
  120: "h-[120px] w-[120px]",
};
