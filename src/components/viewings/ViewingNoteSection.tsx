import { useState } from "react";

import Divider from "@/components/common/Divider";
import ImagePreviewSection from "@/components/common/ImagePreviewSection";
import TextareaField from "@/components/common/TextareaField";

import ImageUploadButton from "./ImageUploadButton";

const ViewingNoteSection = () => {
  const [memo, setMemo] = useState("");
  const [images, setImages] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-2 py-4">
      {/* 사진 섹션 */}
      <section className="flex w-full gap-1 px-4">
        <div className="flex flex-1 flex-col gap-1">
          <p className="text-heading3 text-gray-800">사진 기록</p>
          <span className="text-cap1-med text-gray-600">
            뷰잉한 매물의 내/외부 사진을 남겨주세요 (최대 10장)
          </span>
        </div>
        <ImageUploadButton images={images} setImages={setImages} />
      </section>
      <ImagePreviewSection images={images} setImages={setImages} />
      <Divider className="my-4" />

      {/* 텍스트 메모 섹션 */}
      <TextareaField
        title="메모"
        placeholder="뷰잉한 매물의 특징을 기록해봐요"
        value={memo}
        onChange={setMemo}
      />
    </div>
  );
};

export default ViewingNoteSection;
