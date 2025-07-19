"use client";

import { usePathname } from "next/navigation";

import TabBar from "@/components/layout/TabBar";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const showBottomNavbarPaths = ["/home", "/wishlist", "/viewing", "/mypage"];

  const showNavbar = showBottomNavbarPaths.includes(pathname);

  const isAdmin = pathname.startsWith("/admin");

  return (
    <div
      className={
        isAdmin
          ? "w-full min-h-screen overflow-y-auto bg-white"
          : "scrollbar-hide mx-auto h-screen max-w-[480px] min-w-[375px] overflow-y-auto"
      }
    >
      {children}
      {!isAdmin && showNavbar && <TabBar />}
    </div>
  );
};

export default LayoutWrapper;
