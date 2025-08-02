"use client";

import { useSearchParams } from "next/navigation";

import { Fragment, useMemo } from "react";

import Divider from "@/components/common/Divider";
import BackHeader from "@/components/layout/header/BackHeader";

import { furnitureIconMap } from "@/constants/furniture-lists";
import { CATEGORY_OPTIONS } from "@/constants/property-category";

const furnitureCategory = CATEGORY_OPTIONS[2].items;

const ListingFurniturePage = () => {
  const searchParams = useSearchParams();
  const idsParam = searchParams.get("ids");

  const selectedIds = useMemo(() => {
    if (!idsParam) return [];
    return idsParam.split(",").map(Number);
  }, [idsParam]);

  const groupKeys = Object.keys(
    furnitureCategory,
  ) as (keyof typeof furnitureCategory)[];

  return (
    <div className="flex min-h-screen flex-col pb-16">
      <BackHeader />

      {groupKeys.map((category, idx) => {
        const filteredItems = furnitureCategory[category].filter(item =>
          selectedIds.includes(item.optionId),
        );

        if (filteredItems.length === 0) return null;

        return (
          <Fragment key={category}>
            <div className="flex flex-col gap-3 p-4">
              <h2 className="text-body1-sb text-gray-900">{category}</h2>
              <div className="flex flex-wrap gap-x-1">
                {filteredItems.map(item => {
                  const Icon = furnitureIconMap[item.label];
                  return (
                    <div
                      key={item.optionId}
                      className="text-cap1-med flex w-14 flex-col items-center gap-1 text-gray-600"
                    >
                      {Icon && <Icon className="h-9 w-9 text-gray-700" />}
                      <span>{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {idx < groupKeys.length - 1 && <Divider className="my-4" />}
          </Fragment>
        );
      })}
    </div>
  );
};

export default ListingFurniturePage;
