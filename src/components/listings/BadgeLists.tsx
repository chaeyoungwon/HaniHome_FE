"use client";

import React from "react";

const badges = [
  // 추후 API 연결
  "전망이 좋아요",
  "햇빛이 잘 들어요",
  "교통이 편리해요",
  "주변보다 저렴해요",
  "테라스가 있어요",
  //   "집 상태가 깨끗해요",
  //   "방음이 잘돼요",
  //   "치안이 좋아요",
  //   "주변 편의시설이 많아요",
  //   "커뮤니티 시설이 좋아요",
];

const BadgeList = () => {
  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((text, index) => (
        <div
          key={index}
          className="text-body2-med w-fit rounded-[100px] border border-gray-300 bg-white px-[10px] py-1 break-words whitespace-normal text-gray-700"
        >
          {text}
        </div>
      ))}
    </div>
  );
};

export default BadgeList;
