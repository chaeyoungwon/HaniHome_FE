export const formatPhoneNumber = (raw: string) => {
  const onlyNums = raw.replace(/\D/g, "");

  if (onlyNums.length === 11 && onlyNums.startsWith("010")) {
    return onlyNums.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  }

  if (onlyNums.length === 10) {
    if (onlyNums.startsWith("02")) {
      return onlyNums.replace(/(\d{2})(\d{4})(\d{4})/, "$1-$2-$3");
    } else {
      return onlyNums.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3");
    }
  }

  return raw;
};
