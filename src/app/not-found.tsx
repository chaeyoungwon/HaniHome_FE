import Illustration from "@/public/svgs/not-found/404-illustration.svg";
import Title from "@/public/svgs/not-found/404-text.svg";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-37">
      <div className="flex flex-col items-center justify-center gap-8">
        <Title />
        <div className="text-body2-med flex flex-col items-center justify-center leading-normal text-gray-900">
          <p>페이지를 찾을 수 없어요. </p>
          <p>존재하지 않는 주소를 입력했거나, </p>
          <p>요청한 페이지의 주소가 변경, 삭제되었어요.</p>
        </div>
      </div>
      <Illustration />
    </div>
  );
};

export default NotFound;
