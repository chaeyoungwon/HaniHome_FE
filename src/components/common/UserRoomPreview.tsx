import Image from "next/image";

import clsx from "clsx";

type UserRoomPreviewVariant = "sm" | "md" | "lg";

interface UserRoomPreviewProps {
  userImg: string;
  roomImg: string;
  className?: string;
  variant?: UserRoomPreviewVariant;
}

const USER_ROOM_STYLE_MAP: Record<
  UserRoomPreviewVariant,
  {
    size: number;
    offset: number;
    userClassName: string;
    roomClassName: string;
  }
> = {
  sm: {
    size: 24,
    offset: 12,
    userClassName: "border-[0.67px] rounded-full",
    roomClassName: "border-[0.67px] rounded-[2.67px]",
  },
  md: {
    size: 36,
    offset: 18,
    userClassName: "border-[1px] rounded-full",
    roomClassName: "border-[1px] rounded-sm",
  },
  lg: {
    size: 93.34,
    offset: 46.67,
    userClassName: "border-[2.539px] rounded-full",
    roomClassName: "border-[2.539px] rounded-[10.37px]",
  },
};

const UserRoomPreview = ({
  userImg,
  roomImg,
  className,
  variant = "sm",
}: UserRoomPreviewProps) => {
  const { size, offset, userClassName, roomClassName } =
    USER_ROOM_STYLE_MAP[variant];

  return (
    <div
      className={clsx("relative shrink-0", className)}
      style={{
        width: `${Math.max(size, offset + size)}px`,
        height: `${Math.max(size, offset + size)}px`,
      }}
    >
      <Image
        src={userImg}
        alt="유저 이미지"
        width={size}
        height={size}
        className={clsx(
          "absolute top-0 left-0 z-1 border-gray-300 object-cover",
          userClassName,
        )}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      />

      <Image
        src={roomImg}
        alt="룸 이미지"
        width={size}
        height={size}
        className={clsx("absolute border-gray-300 object-cover", roomClassName)}
        style={{
          top: `${offset}px`,
          left: `${offset}px`,
          width: `${size}px`,
          height: `${size}px`,
        }}
      />
    </div>
  );
};

export default UserRoomPreview;
