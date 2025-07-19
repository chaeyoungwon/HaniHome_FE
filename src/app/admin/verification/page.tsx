"use client";
import { useEffect, useState } from "react";
import { Verification } from "../components/types/verification";




const mockData: Verification[] = [
    {
      id: 0,
      type: "ID_CARD",
      status: "PENDING",
      requestedAt: "2025-07-18T13:59:28.276Z",
      memberId: 123,
    },
    {
      id: 1,
      type: "PASSPORT",
      status: "APPROVED",
      requestedAt: "2025-07-16T10:25:00.000Z",
      memberId: 456,
    },
  ]; 



const AdminVerificationPage = () => {
    const [requests, setRequests] = useState<Verification[]>([]);
  
    useEffect(() => {
      // api 연동하겠습니다.
      setRequests(mockData);
    }, []);
  
    return (
      <div className="p-12">
        <h1 className="text-2xl font-bold mb-6">신원 인증 요청 목록</h1>
  
        <table className="w-full table-auto border-collapse text-left">
          <thead>
            <tr className="border-b border-gray-300 text-gray-600 text-sm">
              <th className="py-2">회원 ID</th>
              <th className="py-2">인증 유형</th>
              <th className="py-2">요청 일시</th>
              <th className="py-2">상태</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((item) => (
              <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-2">{item.memberId}</td>
                <td className="py-2">{item.type}</td>
                <td className="py-2">{new Date(item.requestedAt).toLocaleString("ko-KR")}</td>
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
      </div>
    );
  };
  

export default AdminVerificationPage;