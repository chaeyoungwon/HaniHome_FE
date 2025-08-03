export const uploadFilesToPresignedUrls = async (
  files: File[],
  presignedUrls: { presignedUrl: string }[],
): Promise<void> => {
  if (files.length !== presignedUrls.length) {
    throw new Error("파일 수와 URL 수가 일치하지 않습니다.");
  }

  await Promise.all(
    files.map((file, idx) => {
      const { presignedUrl } = presignedUrls[idx];
      return fetch(presignedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      }).then(res => {
        if (!res.ok) {
          throw new Error(`파일 업로드 실패: ${file.name}`);
        }
      });
    }),
  );
};
