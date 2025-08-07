export const getFabInitialTranslateX = () => {
  if (typeof window === "undefined") return "calc(195px - 100%)";
  const screenW = window.innerWidth;
  const maxWidth = Math.min(screenW, 430);
  const half = maxWidth / 2;
  const clampedHalf = Math.max(180, Math.min(half, 215));
  const offset = clampedHalf - 20;
  return `calc(${offset}px - 100%)`;
};
