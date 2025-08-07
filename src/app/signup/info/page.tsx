"use client";

import { useRouter } from "next/navigation";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { SignupInfoInput, signupInfoSchema } from "@/schemas/signup";
import { useAuthStore } from "@/stores/useAuthStore";
import { useSignupStore } from "@/stores/useSignupStore";
import { zodResolver } from "@hookform/resolvers/zod";

import BottomActionBar from "@/components/common/BottomActionBar";
import InputField from "@/components/common/InputField";
import AgreementList from "@/components/signup/info/AgreementList";

import { AgreementTerm } from "@/constants/agreement-terms";

const SignupInfoPage = () => {
  const router = useRouter();
  const { name, phoneNumber, agreed, setField, setAgreed } = useSignupStore();

  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields, isValid },
  } = useForm<SignupInfoInput>({
    resolver: zodResolver(signupInfoSchema),
    mode: "onChange",
    shouldFocusError: false,
    defaultValues: { name, phoneNumber },
  });

  const requiredTermIds = AgreementTerm.filter(term =>
    term.label.includes("[필수]"),
  ).map(term => term.id);
  const allRequiredChecked = requiredTermIds.every(id => agreed.includes(id));

  const onSubmit = () => {
    if (!allRequiredChecked) return;
    router.push("/signup/profile");
  };

  const values = watch();
  const isFormReady =
    allRequiredChecked &&
    values.name?.trim() &&
    values.phoneNumber?.trim() &&
    isValid;

  useEffect(() => {
    const subscription = watch((value, { name: changed }) => {
      if (!changed) return;
      const v = value[changed as keyof SignupInfoInput];
      if (typeof v === "string") setField(changed, v);
    });
    return () => subscription.unsubscribe();
  }, [watch, setField]);

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/home");
    }
  }, [isLoggedIn, router]);

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col gap-1 py-4">
        <h1 className="text-heading2 text-gray-900">정보를 입력해주세요</h1>
        <span className="text-cap1-med text-gray-700">
          서비스 이용에 필요한 정보 입력 및 약관에 동의해주세요
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <InputField
          label="이름"
          placeholder="이름을 입력해주세요"
          {...register("name")}
          value={name}
          errorMessage={touchedFields.name ? errors.name?.message : undefined}
        />

        <InputField
          label="전화번호"
          placeholder="전화번호를 입력해주세요"
          {...register("phoneNumber")}
          value={phoneNumber}
          errorMessage={
            touchedFields.phoneNumber ? errors.phoneNumber?.message : undefined
          }
        />
      </form>

      <AgreementList onChange={setAgreed} />

      <BottomActionBar
        label="다음"
        onClick={handleSubmit(onSubmit)}
        disabled={!isFormReady}
      />
    </div>
  );
};

export default SignupInfoPage;
