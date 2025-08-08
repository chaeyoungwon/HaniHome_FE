"use client";

import CompletePage from "@/components/common/CompletePage";

const SignupCompletePage = () => {
  return (
    <CompletePage
      message="가입이 완료되었어요!"
      buttonLabel="시작하기"
      redirectUrl="/home"
      showDivider={false}
    />
  );
};

export default SignupCompletePage;
