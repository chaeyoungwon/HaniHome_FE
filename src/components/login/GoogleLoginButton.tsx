"use client";

import GoogleIcon from "@/public/svgs/login/google-icon.svg";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
const GOOGLE_REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!;

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    const scope = ["openid", "email", "profile"].join(" ");

    const googleAuthUrl =
      `https://accounts.google.com/o/oauth2/v2/auth` +
      `?response_type=code` +
      `&client_id=${GOOGLE_CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent(GOOGLE_REDIRECT_URI)}` +
      `&scope=${encodeURIComponent(scope)}` +
      `&access_type=offline` +
      `&prompt=consent`;

    window.location.href = googleAuthUrl;
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="flex h-12 w-[343px] cursor-pointer items-center justify-center gap-1 rounded-sm border border-gray-500 bg-white py-[10px]"
    >
      <GoogleIcon />
      <span className="text-body1-sb text-gray-900">
        구글 계정으로 계속하기
      </span>
    </button>
  );
};

export default GoogleLoginButton;
