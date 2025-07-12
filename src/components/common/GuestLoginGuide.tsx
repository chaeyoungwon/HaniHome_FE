import dynamic from "next/dynamic";

import GoogleLoginButton from "../login/GoogleLoginButton";

const Lottie = dynamic(
  () => import("react-lottie-player").then(mod => mod.default),
  { ssr: false },
);

type GuestLottieType = "wishlist" | "viewing";

const lottieMap: Record<GuestLottieType, object> = {
  wishlist: require("@/public/lotties/guest-searching-lottie.json"),
  viewing: require("@/public/lotties/guest-viewing-lottie.json"),
};

interface GuestLoginGuideProps {
  type: GuestLottieType;
  description: string;
  buttonLabel?: string;
}

const GuestLoginGuide = ({ type, description }: GuestLoginGuideProps) => {
  const animationData = lottieMap[type];

  return (
    <div className="flex flex-col items-center justify-center gap-10 px-4 py-20 text-center">
      <Lottie
        play
        loop
        animationData={animationData}
        className="h-[202px] w-[202px]"
      />
      <p className="text-body1-sb whitespace-pre-line text-gray-700">
        {description}
      </p>
      <GoogleLoginButton />
    </div>
  );
};

export default GuestLoginGuide;
