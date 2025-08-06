"use client";

import { useEffect, useState } from "react";

import {
  fetchVerificationDetail,
  fetchVerifications,
} from "@/apis/admin/verification/adminVerificationApi";


import VerificationDetailModal from "@/components/admin/VerificationDetailModal";

import { Verification, VerificationDetail } from "@/types/admin/verification";

const AdminVerificationPage = () => {
  const [requests, setRequests] = useState<Verification[]>([]);
  const [selectedVerification, setSelectedVerification] =
    useState<VerificationDetail | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchVerifications();
      if (data) setRequests(data);
    };

    fetchData();
  }, []);

  const handleClickRow = async (id: number) => {
    const data = await fetchVerificationDetail(id);
    if (data) setSelectedVerification(data);
  };

  return (
    <div className="p-12">
      <h1 className="mb-6 text-2xl font-bold">신원 인증 요청 목록</h1>

      <table className="w-full table-auto border-collapse text-left">
        <thead>
          <tr className="border-b border-gray-300 text-sm text-gray-600">
            <th className="py-2">회원 ID</th>
            <th className="py-2">인증 유형</th>
            <th className="py-2">요청 일시</th>
            <th className="py-2">상태</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(item => (
            <tr
              key={item.id}
              className="cursor-pointer border-b border-gray-100 hover:bg-gray-50"
              onClick={() => handleClickRow(item.id)}
            >
              <td className="py-2">{item.memberId}</td>
              <td className="py-2">{item.type}</td>
              <td className="py-2">
                {new Date(item.requestedAt).toLocaleString("ko-KR")}
              </td>
              <td className="py-2">
                <span
                  className={
                    item.status === "PENDING"
                      ? "text-yellow-500"
                      : item.status === "APPROVED"
                        ? "text-green-600"
                        : "text-red-500"
                  }
                >
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/*모달*/}
      {selectedVerification && (
        <VerificationDetailModal
          data={selectedVerification}
          onClose={() => {
            setSelectedVerification(null);
            fetchVerifications();
          }}
        />
      )}
    </div>
  );
};

export default AdminVerificationPage;
