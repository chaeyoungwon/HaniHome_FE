import TermsDetailTemplate from "@/components/terms/TermsDetailTemplate";

const OperationTermsPage = () => {
  return (
    <TermsDetailTemplate
      title={[
        "서비스의 공정하고 안전한 운영을 위해 운영 정책을 시행",
        "하고 있습니다. 정책 위반 시 서비스 이용 제한 등의 조치",
        "가 있을 수 있습니다.",
      ]}
      law="정보통신망법, 형법 등"
      infoTable={[
        {
          title: "적용 대상",
          content: "모든 사용자",
        },
        {
          title: "주요 내용",
          content:
            "거래 금지 품목, 허위 매물등록 제한, 커뮤니티 이용 가이드라인, 이용 제한 기준 등",
        },
        {
          title: "효력 발생일",
          content: "동의일로부터 서비스 이용 종료 시까지",
        },
      ]}
      bottomText={[
        "운영 정책은 쾌적한 플랫폼 운영을 위한 필수 동의 항목입",
        "니다. 위반 시 경고, 제한, 계정 정지 등의 조치가 따를 수",
        "있습니다.",
      ]}
    />
  );
};

export default OperationTermsPage;
