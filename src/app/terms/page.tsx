"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import Divider from "@/components/common/Divider";

import ArrowIcon from "@/public/svgs/common/left-arrow.svg";

const BackHeader = dynamic(
  () => import("@/components/layout/header/BackHeader"),
  { ssr: false },
);

const termsList = [
  { label: "서비스 이용약관", path: "service" },
  { label: "개인정보 처리방침", path: "privacy" },
  { label: "운영 정책", path: "operation" },
];

const TermsPage = () => {
  const router = useRouter();

  const handleClick = (path: string) => {
    router.push(`/terms/${path}`);
  };

  return (
    <>
      <BackHeader />
      <ul className="p-4">
        <div className="my-3 flex flex-col">
          {termsList.map((term, index) => (
            <li key={term.path}>
              <button
                onClick={() => handleClick(term.path)}
                className="text-heading3 flex w-full cursor-pointer items-center justify-between text-gray-700"
              >
                <span>{term.label}</span>
                <ArrowIcon className="h-6 w-6 rotate-180 text-gray-700" />
              </button>
              {index < termsList.length - 1 && <Divider className="my-4" />}
            </li>
          ))}
        </div>
      </ul>
    </>
  );
};

export default TermsPage;
