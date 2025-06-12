import ContentWrapper from "@/components/layout/ContentWrapper";
import BackHeader from "@/components/layout/header/BackHeader";

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ContentWrapper>
      <BackHeader />
      <div className="px-4 pb-16">{children}</div>
    </ContentWrapper>
  );
}
