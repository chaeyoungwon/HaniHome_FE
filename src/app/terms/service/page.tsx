import TermsDetailTemplate from "@/components/terms/TermsDetailTemplate";

const ServiceTermsPage = () => {
  return (
    <TermsDetailTemplate
      title={[
        "(주)하니홈 서비스를 이용해주셔서 감사합니다.",
        "보다 나은 서비스를 제공하기 위해 관련 법령에 따라",
        "서비스 이용약관 동의를 받고 있어요.",
      ]}
      law="전자상거래법, 정보통신망법"
      infoTable={[
        {
          title: "적용 대상",
          content: "하니홈 웹 및 모바일 애플리케이션 이용자 전체",
        },
        {
          title: "주요 내용",
          content:
            "서비스 이용 조건, 이용자의 권리와 의무, 게시물 운영 기준, 계약의 성립 및 해지, 면책 조항 등",
        },
        {
          title: "효력 발생일",
          content: "동의일로부터 서비스 이용 종료 시까지",
        },
      ]}
      bottomText={[
        "이 약관은 하니홈 서비스를 사용하기 위한 필수",
        "약관이에요. 동의하지 않으실 경우, 회원가입 및 서비스",
        "이용이 제한될 수 있습니다.",
      ]}
    />
  );
};

export default ServiceTermsPage;
