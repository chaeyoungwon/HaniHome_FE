// 1. 기본 S3 이미지 URL 목록
export const DEFAULT_PROFILE_IMAGES = [
  "https://hanihome.s3.ap-northeast-2.amazonaws.com/profile/6-2025070810402961bdfd28-2cd6-4e90-8c18-181e0d61c605.png",
  "https://hanihome.s3.ap-northeast-2.amazonaws.com/profile/5-202507081043109d0df61f-1191-4043-8ae6-ffb5246a28fc.png",
];

// 2. 랜덤 이미지 URL 반환
export const getRandomDefaultProfile = () => {
  const index = Math.floor(Math.random() * DEFAULT_PROFILE_IMAGES.length);
  return DEFAULT_PROFILE_IMAGES[index];
};
