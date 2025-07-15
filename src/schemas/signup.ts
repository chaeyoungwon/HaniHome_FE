import { z } from "zod";

export const signupInfoSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "이름을 올바르게 입력해주세요")
    .max(20, "이름을 올바르게 입력해주세요"),

  phoneNumber: z
    .string()
    .trim()
    .refine(
      phoneNumber =>
        phoneNumber.replace(/-/g, "").length >= 10 &&
        phoneNumber.replace(/-/g, "").length <= 11 &&
        phoneNumber.startsWith("01"),
      {
        message: "전화번호를 올바르게 입력해주세요",
      },
    ),
});

export type SignupInfoInput = z.infer<typeof signupInfoSchema>;
