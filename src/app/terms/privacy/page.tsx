import TermsDetailTemplate from "@/components/terms/TermsDetailTemplate";

const PrivacyTermsPage = () => {
  return (
    <TermsDetailTemplate
      title={[
        "개인정보는 안전하게 보호되어야 합니다.",
        "하니홈은 관련 법령에 따라 최소한의 정보만 수집하며,",
        "수집 목적과 보유 기간을 명확히 안내하고 있어요.",
      ]}
      law="개인정보 보호법"
      infoTable={[
        {
          title: "수집 항목",
          content: "이름, 연락처, 이메일, 로그인 ID, IP 주소 등",
        },
        {
          title: "이용 목적",
          content: "서비스 제공, 고객 상담, 회원관리, 법적 의무 이행 등",
        },
        {
          title: "보유 기간",
          content:
            "회원 탈퇴 시까지 (단, 관련 법령에 따라 보존이 필요한 경우 별도 보관)",
        },
      ]}
      bottomText={[
        "본 방침은 하니홈 서비스를 운영하기 위한 필수 ",
        "항목입니다. 수집된 정보는 제3자에게 제공되지 않으며,",
        "탈퇴 시 즉시 파기돼요.",
      ]}
    />
  );
};

export default PrivacyTermsPage;
