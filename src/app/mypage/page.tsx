"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import Divider from "@/components/common/Divider";
import TitleHeader from "@/components/layout/header/TitleHeader";
import Section from "@/components/mypage/SectionItems";

import { getSections } from "@/constants/mypage-section";

import { SectionData } from "@/types/mypageSection";

import CertificateBadge from "@/public/svgs/common/certificated-icon.svg";
import Arrow from "@/public/svgs/common/left-arrow.svg";

const Mypage = () => {
  const router = useRouter();
  const sections = getSections(router);

  return (
    <div>
      {/*헤더*/}
      <TitleHeader title="마이페이지" />
      {/*바디 */}
      <div className="cursor-pointer pb-[62px]">
        {/*프로필수정 */}
        <div
          className="flex h-22 items-center justify-between px-4 py-2"
          onClick={() => router.push("profile/edit")}
        >
          <div className="flex gap-[24px]">
            <div className="relative h-[72px] w-[72px] overflow-hidden rounded-full">
              <Image
                src="/svgs/common/profile-img.svg"
                fill
                alt="profileImg"
                className="object-cover object-center"
              />
            </div>
            <div className="flex items-center gap-1">
              <div className="text-heading2 text-gray-900">김하니</div>
              <div className="flex items-center justify-center p-[3px]">
                <CertificateBadge className="w-[18px] h-[18px] "/>
              </div>
            </div>
          </div>
          <div>
            <Arrow className="h-6 w-6 rotate-180 text-gray-700" />
          </div>
        </div>
        <div className="py-4">
          {sections.map((section: SectionData, index) => (
            <div key={section.label}>
              <Section label={section.label} items={section.items} />
              {index !== sections.length - 1 && <Divider className="my= 1"/>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mypage;
