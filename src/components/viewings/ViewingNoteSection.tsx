import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

import { getPropertyNotePresignedUrl } from "@/apis/s3Upload";
import { putViewingPropertyNotes } from "@/apis/viewing";

import { useViewingDetail } from "@/hooks/viewing/useViewing";

import Divider from "@/components/common/Divider";
import ImagePreviewSection from "@/components/common/ImagePreviewSection";
import TextareaField from "@/components/common/TextareaField";

import ImageUploadButton from "./ImageUploadButton";

interface ViewingNoteSectionProps {
  viewingId: number;
}

const ViewingNoteSection = forwardRef(
  ({ viewingId }: ViewingNoteSectionProps, ref) => {
    const [memo, setMemo] = useState("");
    const [existingImages, setExistingImages] = useState<string[]>([]);
    const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);
    const [newFiles, setNewFiles] = useState<File[]>([]);
    const { data } = useViewingDetail(viewingId);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
      if (!data || isInitialized) return;

      setMemo(data.memo || "");
      setExistingImages(data.photoUrls || []);
      setIsInitialized(true);
    }, [data, isInitialized]);

    useImperativeHandle(ref, () => ({
      handleSave: async () => {
        if (newFiles.length === 0 && memo.trim() === "") return;

        const extensions = newFiles.map(
          file => file.name.split(".").pop() || "png",
        );
        const presignedUrls = await getPropertyNotePresignedUrl(extensions);

        await Promise.all(
          presignedUrls.map((item, idx) =>
            fetch(item.presignedUrl, {
              method: "PUT",
              headers: {
                "Content-Type": newFiles[idx].type,
              },
              body: newFiles[idx],
            }),
          ),
        );

        const fileUrls = [
          ...existingImages, // 기존 이미지 유지
          ...presignedUrls.map(item => item.fileUrl), // 새 이미지
        ];

        await putViewingPropertyNotes({
          viewingId,
          fileUrls,
          memo,
        });
      },
    }));

    return (
      <div className="mb-[73.5px] flex flex-col gap-2 py-4">
        <section className="flex w-full gap-1 px-4">
          <div className="flex flex-1 flex-col gap-1">
            <p className="text-heading3 text-gray-800">사진 기록</p>
            <span className="text-cap1-med text-gray-600">
              뷰잉한 매물의 내/외부 사진을 남겨주세요 (최대 10장)
            </span>
          </div>
          <ImageUploadButton
            existingImages={existingImages}
            newImagePreviews={newImagePreviews}
            setNewImagePreviews={setNewImagePreviews}
            setNewFiles={setNewFiles}
          />
        </section>

        <ImagePreviewSection
          existingImages={existingImages}
          setExistingImages={setExistingImages}
          newImagePreviews={newImagePreviews}
          setNewImagePreviews={setNewImagePreviews}
          setNewFiles={setNewFiles}
        />

        <Divider className="my-4" />
        <TextareaField
          title="메모"
          placeholder="뷰잉한 매물의 특징을 기록해봐요"
          value={memo}
          onChange={setMemo}
        />
      </div>
    );
  },
);

export default ViewingNoteSection;
