export const getDisplayStatus = (tradeStatus: string) =>
  tradeStatus === "BEFORE" ? "거래 중" : "거래 완료";

export const getDisplayType = (kind: string) =>
  kind === "SHARE" ? "쉐어" : "렌트";

export const getDistanceInKm = (distance: number) => distance.toFixed(1);
