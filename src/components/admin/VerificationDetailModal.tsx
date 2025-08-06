"use client";

import { VerificationDetail } from "@/types/admin/verification";
import Image from "next/image";
import { useState } from "react";
import { approveVerification, rejectVerification } from "@/apis/admin/verification/adminVerificationApi";

interface Props {
  data: VerificationDetail; //상세 조회 대상 데이터 
  onClose: () => void; //모달 닫기 함수 
}

const VerificationDetailModal = ({ data, onClose }: Props) => {
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectionField, setShowRejectionField] = useState(false);

  const handleApprove = async () => {
    try {
      await approveVerification(data.id);
      alert("승인됨");
      onClose();
    } catch {
      alert("승인 실패");
    }
  };

  const handleReject = () => {
    setShowRejectionField(true);
  };

  const handleRejectSubmit = async () => {
    try {
      await rejectVerification(data.id, rejectionReason);
      alert("거부됨");
      onClose();
    } catch {
      alert("거부 실패");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="relative w-[600px] rounded-lg bg-white p-8 shadow-xl">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          ✕
        </button>

        {/* 이미지 */}
        <div className="mb-4 flex justify-center gap-4">
          {data.documentImageUrls.map((url, idx) => (
            <Image
              key={idx}
              src={url}
              alt={`인증 이미지 ${idx + 1}`}
              width={200}
              height={120}
              className="rounded border"
            />
          ))}
        </div>

        {/* 공통 정보 */}
        <div className="space-y-2 text-sm text-gray-800">
          <p>회원 ID: {data.memberId}</p>
          <p>인증 유형: {data.type}</p>
          <p>요청 일시: {new Date(data.requestedAt).toLocaleString("ko-KR")}</p>
          {data.status === "APPROVED" && (
            <p>승인 일시: {new Date(data.approvedAt!).toLocaleString("ko-KR")}</p>
          )}
          {data.status === "REJECTED" && (
            <>
              <p>거부 일시: {new Date(data.rejectedAt!).toLocaleString("ko-KR")}</p>
              <p>거부 사유: {data.rejectionReason}</p>
            </>
          )}
        </div>

        {/* 상태에 따른 버튼 */}
        {data.status === "PENDING" && (
          <div className="mt-6 space-y-4">
            {!showRejectionField ? (
              <div className="flex gap-4">
                <button
                  onClick={handleApprove}
                  className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                >
                  승인
                </button>
                <button
                  onClick={handleReject}
                  className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                >
                  거부
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <textarea
                  className="w-full rounded border border-gray-300 p-2 text-sm"
                  rows={4}
                  maxLength={100}
                  placeholder="거부 사유를 입력하세요 (최대 100자)"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                />
                <button
                  onClick={handleRejectSubmit}
                  className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                >
                  거부 사유 제출
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerificationDetailModal;
