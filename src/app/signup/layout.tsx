import BackHeader from "@/components/layout/header/BackHeader";

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full">
      <BackHeader />
      <div className="px-4 pt-12 pb-16">{children}</div>
    </div>
  );
}
