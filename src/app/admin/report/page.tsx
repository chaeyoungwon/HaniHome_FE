"use client";

import { useEffect, useState } from "react";

import { ReportDetail } from "@/types/admin/report";

const mockReports: ReportDetail[] = [
  {
    id: 0,
    reporterId: 101,
    targetType: "PROPERTY",
    createdAt: "2025-07-20T10:30:00.000Z",
    description: "허위 매물로 의심됩니다.",
    documentImageUrls: ["/report1.jpg", "/report2.jpg"],
  },
  {
    id: 1,
    reporterId: 202,
    targetType: "PROPERTY",
    createdAt: "2025-07-19T15:00:00.000Z",
    description: "욕설을 사용했습니다.",
    documentImageUrls: ["/report3.jpg"],
  },
  {
    id: 2,
    reporterId: 303,
    targetType: "PROPERTY",
    createdAt: "2025-07-18T08:45:00.000Z",
    description: "부적절한 댓글입니다.",
  },
];

const AdminReportPage = () => {
  const [reports, setReports] = useState<ReportDetail[]>([]);

  useEffect(() => {
    // TODO: 실제 연동
    setReports(mockReports);
  }, []);

  return (
    <div className="p-12">
      <h1 className="mb-6 text-2xl font-bold">신고 목록</h1>

      <table className="w-full table-auto border-collapse text-left">
        <thead>
          <tr className="border-b border-gray-300 text-sm text-gray-600">
            <th className="py-2">신고자 ID</th>
            <th className="py-2">신고 대상 유형</th>
            <th className="py-2">신고 일시</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(report => (
            <tr
              key={report.id}
              className="cursor-pointer border-b border-gray-100 hover:bg-gray-50"
              // TODO: 클릭 시 모달 열기 추가 예정
            >
              <td className="py-2">{report.reporterId}</td>
              <td className="py-2">{report.targetType}</td>
              <td className="py-2">
                {new Date(report.createdAt).toLocaleString("ko-KR")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminReportPage;
