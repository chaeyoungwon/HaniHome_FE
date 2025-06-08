"use client";

import { Fragment } from "react";

import Divider from "@/components/common/Divider";
import BackHeader from "@/components/layout/header/BackHeader";

import { furnitureIconMap } from "@/constants/FurnitureLists";

const dummyFurniture = {
  침실: ["침대 프레임", "책상", "침구류", "옷장"],
  주방: ["전자렌지", "냉장고", "가스렌지", "식기류", "조리도구"],
  거실: ["TV", "소파", "커피테이블"],
  기타: ["Wifi", "청소기"], //추후 API 연결 시 코드 변경 예정
};

const ListingFurniturePage = () => {
  const groupKeys = Object.keys(
    dummyFurniture,
  ) as (keyof typeof dummyFurniture)[];

  return (
    <div className="flex min-h-screen flex-col pt-12 pb-16">
      <BackHeader />

      {groupKeys.map((category, idx) => (
        <Fragment key={category}>
          <div className="flex flex-col gap-3 p-4">
            <h2 className="text-body1-sb text-gray-900">{category}</h2>
            <div className="flex flex-wrap gap-x-3">
              {dummyFurniture[category].map(label => {
                const Icon = furnitureIconMap[label];
                return (
                  <div
                    key={label}
                    className="text-cap1-med flex flex-col items-center text-gray-600"
                  >
                    {Icon && <Icon className="h-9 w-9" />}
                    <span>{label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {idx < groupKeys.length - 1 && (
            <div className="my-1">
              <Divider />
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default ListingFurniturePage;
