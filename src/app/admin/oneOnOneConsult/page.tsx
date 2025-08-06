"use client";

import { useEffect, useState } from "react";

import { oneOnOneConsultDetail } from "@/types/admin/oneOnOneConsult";

const mockData: oneOnOneConsultDetail[] = [
  {
    id: 1,
    content: "안녕하세요",
    customerId: 2,
    status: "REQUESTED",
    email: "test@example.com",
  },
  {
    id: 2,
    content: "반갑소",
    customerId: 3,
    status: "COMPLETED",
    email: "test2@example.com",
  },
];

const AdminOneOnOneConsultPage = () => {
  const [consults, setConsults] = useState<oneOnOneConsultDetail[]>([]);

  useEffect(() => {
    //TODO: API 연동
    setConsults(mockData);
  }, []);

  return (
    <div className="p-12">
      <h1 className="mb-6 text-2xl font-bold">1:1 문의 목록</h1>

      <table className="w-full table-auto border-collapse text-left">
        <thead>
          <tr className="border-b border-gray-300 text-sm text-gray-600">
            <th className="py-2">ID</th>
            <th className="py-2">내용</th>
            <th className="py-2">회원 ID</th>
            <th className="py-2">상태</th>
          </tr>
        </thead>
        <tbody>
          {consults.map(consult => (
            <tr
              key={consult.id}
              className="cursor-pointer border-b border-gray-100 hover:bg-gray-50"
            >
              <td className="py-2">{consult.id}</td>
              <td className="py-2">{consult.content}</td>
              {/* 이건 상세페이지로 뺄까..? */}
              <td className="py-2">{consult.customerId}</td>
              <td className="py-2">
                <span
                  className={
                    consult.status === "REQUESTED"
                      ? "text-yellow-500"
                      : consult.status === "COMPLETED"
                        ? "text-green-600"
                        : "text-gray-500"
                  }
                >
                  {consult.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOneOnOneConsultPage;
