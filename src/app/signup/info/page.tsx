"use client";

import { useRouter } from "next/navigation";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { SignupInfoInput, signupInfoSchema } from "@/schemas/signup";
import { useSignupStore } from "@/stores/useSignupStore";
import { zodResolver } from "@hookform/resolvers/zod";

import BottomActionBar from "@/components/common/BottomActionBar";
import InputField from "@/components/common/InputField";
import AgreementList from "@/components/signup/info/AgreementList";

import { AgreementTerm } from "@/constants/agreement-terms";

const SignupInfoPage = () => {
  const router = useRouter();
  const { name, email, phone, agreed, setField, setAgreed } = useSignupStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields, isValid },
  } = useForm<SignupInfoInput>({
    resolver: zodResolver(signupInfoSchema),
    mode: "onChange",
    shouldFocusError: false,
  });

  const requiredTermIds = AgreementTerm.filter(term =>
    term.label.includes("[필수]"),
  ).map(term => term.id);

  const allRequiredChecked = requiredTermIds.every(id => agreed.includes(id));

  const onSubmit = (data: SignupInfoInput) => {
    if (!allRequiredChecked) return;

    console.log("제출 성공", { ...data, agreed });
    router.push("/signup/profile");
  };
  const values = watch();
  const isFormReady =
    allRequiredChecked &&
    values.name?.trim() &&
    values.email?.trim() &&
    values.phone?.trim() &&
    isValid;

  useEffect(() => {
    const subscription = watch((value, { name: changedName }) => {
      if (!changedName) return;
      const fieldValue = value[changedName as keyof SignupInfoInput];

      if (typeof fieldValue === "string") {
        setField(changedName, fieldValue);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setField]);

  return (
    <div className="flex w-full flex-col pb-16">
      <div className="flex flex-col gap-1 py-4">
        <h1 className="text-heading2 text-gray-900">정보를 입력해주세요</h1>
        <span className="text-cap1-med text-gray-700">
          서비스 이용에 필요한 정보 입력 및 약관에 동의해주세요
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <InputField
          label="이름"
          placeholder="이름을 입력해주세요"
          value={name}
          {...register("name")}
          errorMessage={touchedFields.name ? errors.name?.message : undefined}
        />
        <InputField
          label="이메일"
          placeholder="이메일을 입력해주세요"
          value={email}
          {...register("email")}
          errorMessage={touchedFields.email ? errors.email?.message : undefined}
        />
        <InputField
          label="전화번호"
          placeholder="전화번호를 입력해주세요"
          value={phone}
          {...register("phone")}
          errorMessage={touchedFields.phone ? errors.phone?.message : undefined}
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
