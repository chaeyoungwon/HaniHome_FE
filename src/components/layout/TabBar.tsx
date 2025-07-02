import Link from "next/link";
import { usePathname } from "next/navigation";

import WishListIcon from "@/public/svgs/common/heart-outline-icon.svg";
import HomeIcon from "@/public/svgs/common/home-icon.svg";
import MyPageIcon from "@/public/svgs/common/mypage-icon.svg";
import ViewingIcon from "@/public/svgs/tabbar/viewing-icon.svg";

const tabs = [
  { href: "/home", label: "홈", icon: <HomeIcon /> },
  { href: "/wishlist", label: "즐겨찾기", icon: <WishListIcon /> },
  { href: "/viewing", label: "뷰잉관리", icon: <ViewingIcon /> },
  { href: "/mypage", label: "마이페이지", icon: <MyPageIcon /> },
];

const TabBar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 z-20 max-w-[480px] min-w-[375px] -translate-x-1/2 border-t border-gray-200 bg-white py-[6px]">
      <ul className="flex justify-between">
        {tabs.map(({ href, label, icon }) => {
          const isActive = pathname === href;
          const colorClass = isActive ? "text-gray-900" : "text-gray-400";

          return (
            <li
              key={href}
              className="flex h-[49px] w-1/4 items-center justify-center text-center"
            >
              <Link href={href}>
                <div
                  className={`text-cap1-med flex flex-col items-center gap-1 tracking-normal ${colorClass}`}
                >
                  <div className={`h-6 w-6 ${colorClass}`}>{icon}</div>
                  <span>{label}</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default TabBar;
