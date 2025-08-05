import { useState } from "react";

import { nicknameSchema } from "@/schemas/nickname";

import { checkNicknameDuplicate } from "@/apis/authApi";

export const useNickname = () => {
  const [message, setMessage] = useState<string | undefined>();
  const [isValid, setIsValid] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<"default" | "available" | "unavailable">(
    "default",
  );

  const validate = (nickname: string) => {
    const result = nicknameSchema.safeParse(nickname);
    setIsValid(result.success);

    if (!result.success) {
      setMessage(result.error.errors[0].message);
    } else {
      setMessage(undefined);
    }
  };

  const checkDuplicate = async (nickname: string) => {
    if (!isValid || !nickname) return;

    setIsChecking(true);
    try {
      const { available } = await checkNicknameDuplicate(nickname);

      setMessage(
        available ? "사용 가능한 닉네임입니다" : "중복된 닉네임입니다",
      );
      setResult(available ? "available" : "unavailable");
    } catch {
      setMessage("중복 확인에 실패했습니다");
      setResult("unavailable");
    } finally {
      setIsChecking(false);
    }
  };

  const reset = () => {
    setMessage(undefined);
    setResult("default");
    setIsValid(false);
  };

  return {
    message,
    isValid,
    isChecking,
    result,
    validate,
    checkDuplicate,
    reset,
  };
};
