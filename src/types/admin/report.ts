export interface ReportDetail {
  id: number;
  reporterId: number;
  targetType: "PROPERTY";
  createdAt: string;
  description: string;
  documentImageUrls?: string[]; // 최대 2개
}