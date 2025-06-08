import Divider from "@/components/common/Divider";

// 공통 섹션 컴포넌트
const Section = ({
  children,
  withDivider = true,
}: {
  children: React.ReactNode;
  withDivider?: boolean;
}) => (
  <>
    {children}
    {withDivider && <Divider />}
  </>
);

export default Section;
