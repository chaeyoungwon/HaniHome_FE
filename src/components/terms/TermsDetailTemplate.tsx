import BackHeader from "@/components/layout/header/BackHeader";

interface InfoRow {
  title: string;
  content: string;
}

interface TermsDetailTemplateProps {
  title: string[];
  law: string;
  infoTable: InfoRow[];
  bottomText: string[];
}

const TermsDetailTemplate = ({
  title,
  law,
  infoTable,
  bottomText,
}: TermsDetailTemplateProps) => {
  return (
    <div className="flex w-full max-w-[430px] flex-col gap-4">
      <BackHeader />

      {/* 타이틀 영역 */}
      <section className="flex flex-col gap-3 p-4">
        <h2 className="text-body1-sb text-gray-700">
          {title.map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
        </h2>
        <p className="text-cap1-med text-gray-700">관련 법령 : {law}</p>
      </section>

      {/* 구분 / 내용 헤더 */}
      <section className="flex flex-col gap-4 p-4">
        <div className="flex items-center gap-4">
          <div className="text-cap1-b w-[55px] shrink-0 text-gray-700">
            구분
          </div>
          <div className="text-cap1-b flex-1 text-gray-700">내용</div>
        </div>

        {/* 테이블 row */}
        {infoTable.map((row, idx) => (
          <div key={idx} className="flex items-center gap-4">
            <div className="text-cap1-med w-[55px] shrink-0 text-gray-700">
              {row.title}
            </div>
            <div className="text-cap1-med flex-1 text-gray-600">
              {row.content}
            </div>
          </div>
        ))}
      </section>

      <div className="text-body1-sb p-4 text-gray-700">
        {bottomText.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    </div>
  );
};

export default TermsDetailTemplate;
