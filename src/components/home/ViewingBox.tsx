import UserRoomPreview from "@/components/common/UserRoomPreview";

interface ViewingBoxProps {
  date: string;
  time: string;
  profileImg: string;
  roomImg: string;
}

const ViewingBox = ({ date, time, profileImg, roomImg }: ViewingBoxProps) => {
  return (
    <div className="flex w-fit shrink-0 gap-4 rounded-sm border border-gray-200 px-3 py-2">
      <UserRoomPreview userImg={profileImg} roomImg={roomImg} />

      {/* 시간 정보 */}
      <div className="flex flex-col justify-center">
        <span className="text-cap1-med text-gray-500">{date}</span>
        <span className="text-body2-med text-gray-800">{time}</span>
      </div>
    </div>
  );
};

export default ViewingBox;
