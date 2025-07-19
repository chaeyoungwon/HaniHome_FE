"use client"; //이 파일은 클라이언트 컴포넌트임을 명시 

import { useRouter } from "next/navigation"; //네비게이션을 위한 훅
import Image from "next/image"; // 최적화된 이미지 렌더링을 위한 Next.js 컴포넌트트

//관리자용 상단 네비게이션 바 컴포넌트트
const AdminNavbar = () => {
  const router = useRouter(); //페이지 이동을 위한 라이터 객체

  return (
    <header className="sticky top-0 z-50 flex h-20 w-full items-center border-b border-gray-200 bg-white px-12 shadow-md">
      {/* 로고 */}
      <button
        onClick={() => router.push("/home")}
        className="flex items-center cursor-pointer"
      >
        <Image
          src="/svgs/common/logo-wordmark.svg"
          alt="하니홈 로고"
          width={160}
          height={28}
          priority
        />
      </button>

      {/* 중앙 메뉴 */}
      <nav className="ml-24 flex gap-12">
        <button
          onClick={() => router.push("/admin/verification")}
          className="text-lg text-gray-700 hover:text-mint transition cursor-pointer"
        >
          신원 인증
        </button>
        <button
          onClick={() => router.push("/admin/report")}
          className="text-lg text-gray-700 hover:text-mint transition cursor-pointer"
        >
          신고
        </button>
        <button
          onClick={() => router.push("/admin/oneOnOneConsult")}
          className="text-lg text-gray-700 hover:text-mint transition cursor-pointer"
        >
          1:1 문의
        </button>
      </nav>
    </header>
  );
};

export default AdminNavbar;
