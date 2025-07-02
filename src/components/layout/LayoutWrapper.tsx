"use client";

import { usePathname } from "next/navigation";

import TabBar from "@/components/layout/TabBar";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const showBottomNavbarPaths = ["/home", "/wishlist", "/viewing", "/mypage"];

  const showNavbar = showBottomNavbarPaths.includes(pathname);

  return (
    <div className="scrollbar-hide mx-auto h-screen max-w-[480px] min-w-[375px] overflow-y-auto">
      {children}
      {showNavbar && <TabBar />}
    </div>
  );
};

export default LayoutWrapper;
