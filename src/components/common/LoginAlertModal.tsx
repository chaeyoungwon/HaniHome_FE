"use client";

import { useRouter } from "next/navigation";

import { useLoginModalStore } from "@/stores/useLoginModalStore";

import AlertModal from "./AlertModal";

const LoginAlertModal = () => {
  const router = useRouter();
  const { isOpen, closeModal } = useLoginModalStore();

  const handleLogin = () => {
    closeModal();
    router.push("/auth/login");
  };

  if (!isOpen) return null;

  return (
    <AlertModal
      title="로그인 후 열람할 수 있어요"
      description={[
        "로그인 / 회원가입 후 마음에 드는 매물의",
        "상세 정보를 확인해보세요!",
      ]}
      onActionClick={handleLogin}
      actionLabel="로그인 / 회원가입 하러가기"
      onClose={closeModal}
    />
  );
};

export default LoginAlertModal;
