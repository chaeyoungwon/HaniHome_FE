const PYEONG_CONVERSION_RATE = 3.305785;

export const toSquareMeter = (pyeong: number) => {
  return pyeong * PYEONG_CONVERSION_RATE;
};

export const fromSquareMeter = (sqm: number) => {
  return sqm / PYEONG_CONVERSION_RATE;
};
