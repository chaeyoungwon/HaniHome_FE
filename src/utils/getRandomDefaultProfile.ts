const DEFAULT_PROFILE_IMAGES = [
  "/images/profile-default1.png",
  "/images/profile-default2.png",
];

export const getRandomDefaultProfile = () => {
  const index = Math.floor(Math.random() * DEFAULT_PROFILE_IMAGES.length);
  return DEFAULT_PROFILE_IMAGES[index];
};

export const getRandomDefaultProfileFile = async (): Promise<File> => {
  const path = getRandomDefaultProfile();
  const res = await fetch(path);
  const blob = await res.blob();
  const file = new File([blob], path.split("/").pop() || "default.png", {
    type: blob.type || "image/png",
  });
  return file;
};
