export const uploadFilesToPresignedUrls = async (
  files: File[],
  presignedUrls: { presignedUrl: string; fileUrl: string }[], // fileUrl 필요
): Promise<string[]> => {
  if (files.length !== presignedUrls.length) {
    throw new Error("파일 수와 URL 수가 일치하지 않습니다.");
  }

  const uploadedUrls = await Promise.all(
    files.map(async (file, idx) => {
      const { presignedUrl, fileUrl } = presignedUrls[idx];

      const res = await fetch(presignedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!res.ok) {
        throw new Error(`파일 업로드 실패: ${file.name}`);
      }

      return fileUrl; // 실제로 저장된 URL 반환
    }),
  );

  return uploadedUrls; // string[] 반환
};
