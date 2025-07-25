const STATES = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "NT", "ACT"];

export const extractSuburb = (regionStr: string | undefined): string | null => {
  if (!regionStr) return null;

  const [regionPart] = regionStr.split(",");
  const words = regionPart.trim().split(" ");

  const lastWord = words[words.length - 1];

  return STATES.includes(lastWord)
    ? words.slice(0, -1).join(" ")
    : regionPart.trim();
};
