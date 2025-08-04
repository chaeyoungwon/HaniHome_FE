export interface Verification {
  id: number;
  type: "ID_CARD" | "PASSPORT" | "DRIVER_LICENSE" | "RESIDENT_PERMIT";
  status: "PENDING" | "APPROVED" | "REJECTED";
  requestedAt: string;
  memberId: number;
}

export interface VerificationDetail extends Verification {
  documentImageUrls: string[];
  rejectionReason?: string;
  approvedAt?: string;
  rejectedAt?: string;
}
