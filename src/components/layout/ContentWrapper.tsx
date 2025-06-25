"use client";

import { useLayoutEffect, useState } from "react";

/**
 * 유동 padding이 필요한 경우에만 사용하는 컴포넌트 (812px 이상 화면 대응)
 * 이미 812px 이상인 고정 구조 -> 고정 padding만으로 충분 (불필요한 연산 방지)
 */

interface ContentWrapperProps {
  children: React.ReactNode;
  className?: string;
  bottomOffset?: number;
}

const ContentWrapper = ({
  children,
  bottomOffset = 0,
  className,
}: ContentWrapperProps) => {
  const [extraPadding, setExtraPadding] = useState(0);

  useLayoutEffect(() => {
    const update = () => {
      setExtraPadding(window.innerHeight > 812 ? 60 : 0);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div
      style={{
        paddingBottom: `${bottomOffset + extraPadding}px`,
      }}
      className={className}
    >
      {children}
    </div>
  );
};

export default ContentWrapper;
