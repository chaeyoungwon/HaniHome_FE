import Image from "next/image";

import { useEffect, useState } from "react";

interface BottomSheetProps {
  onClose: () => void;
}

const BottomSheet = ({ onClose }: BottomSheetProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    // 스르륵 닫기
    setIsOpen(false);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (
    <>
      {/* 오버레이 */}
      <div
        className="fixed inset-0 z-80 bg-[rgba(72,74,79,0.6)]"
        onClick={handleClose}
      />
      {/* 바텀시트 */}
      <div
        className={`fixed bottom-0 left-1/2 z-110 w-[375px] -translate-x-1/2 rounded-t-2xl border border-gray-500 bg-white transition-transform duration-500 ease-in-out ${isOpen ? "translate-y-0" : "translate-y-full"} `}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex flex-col gap-4 px-5 pt-3">
          <div className="flex justify-center">
            <div className="h-1 w-[53px] rounded-[50px] bg-gray-500" />
          </div>

          <div className="text-heading2 text-gray-900">
            매물 사진 업로드 가이드
          </div>
          <div className="flex justify-center gap-2">
            <Image
              src="/svgs/listings/room-image1.svg"
              width={160}
              height={160}
              alt="방 사진 예시 1"
            />
            <Image
              src="/svgs/listings/room-image2.svg"
              width={160}
              height={160}
              alt="방 사진 예시 2"
            />
          </div>
          <div className="flex flex-col gap-3 pb-6">
            <div className="text-body1-sb text-mint">어떤 사진이 좋나요?</div>
            <div className="text-body1-med text-gray-500">
              방 구조(바닥, 천장, 벽, 가구 등)가
              <br />
              한눈에 보이는 사진을 추천해요
              <br />
              넓이와 구조를 파악할 수 있는 사진은 구매자에게
              <br />
              효과적으로 매물 정보를 전달할 수 있어요
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomSheet;
