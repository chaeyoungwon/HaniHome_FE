"use client";

import { useRouter } from "next/navigation";

import { useEffect } from "react";

import CompletePage from "@/components/common/CompletePage";

const CreateSuccess = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/home");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return <CompletePage message="등록이 완료되었어요!" redirectUrl={"/home"} />;
};

export default CreateSuccess;
