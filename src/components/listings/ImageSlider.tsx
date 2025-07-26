"use client";

import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type ImageSliderProps = {
  photoUrls: string[];
};

const ImageSlider = ({ photoUrls }: ImageSliderProps) => {
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      pagination={false}
      loop
      className="h-[375px] w-[375px]"
    >
      {photoUrls.map((url, idx) => (
        <SwiperSlide key={idx}>
          <Image
            src={url}
            alt={`매물 이미지 ${idx + 1}`}
            width={375}
            height={375}
            className="h-[375px] w-[375px] border border-gray-200 object-cover"
            priority={idx === 0}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSlider;
