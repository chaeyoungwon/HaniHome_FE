"use client";

import Image from "next/image";

import { useState } from "react";

import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type ImageSliderProps = {
  photoUrls: string[];
};

const ImageSlider = ({ photoUrls }: ImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(1);

  return (
    <div className="relative aspect-square w-full max-w-[430px] overflow-hidden">
      {/* 슬라이드 카운터 UI */}
      <div className="text-cap1-med absolute bottom-5 left-6 z-10 flex items-center gap-1 rounded-[50px] bg-gray-800/60 px-2 py-1 text-gray-200">
        <span>{currentIndex}</span>
        <span>/</span>
        <span>{photoUrls.length}</span>
      </div>

      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={false}
        loop
        onSlideChange={swiper => setCurrentIndex(swiper.realIndex + 1)}
        className="h-full w-full"
      >
        {photoUrls.map((url, idx) => (
          <SwiperSlide key={idx} className="relative h-full w-full">
            <Image
              src={url}
              alt={`매물 이미지 ${idx + 1}`}
              fill
              unoptimized
              priority={idx === 0}
              className="border border-gray-200 object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
