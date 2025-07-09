"use client";

import { useRouter } from "next/navigation";

import AlertModal from "./AlertModal";

interface LoginAlertModalProps {
  onClose: () => void;
}

const LoginAlertModal = ({ onClose }: LoginAlertModalProps) => {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/auth/login");
  };

  return (
    <AlertModal
      title="로그인 후 열람할 수 있어요"
      description={[
        "로그인 / 회원가입 후 마음에 드는 매물의",
        "상세 정보를 확인해보세요!",
      ]}
      onActionClick={handleLogin}
      actionLabel="로그인 / 회원가입 하러가기"
      onClose={onClose}
    />
  );
};

export default LoginAlertModal;
