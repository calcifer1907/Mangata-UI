import { format, diffHours } from "@formkit/tempo";

export const formatDate = (date: string) => {
  return format(date, "YYYY-MM-DD HH:mm:ss");
};

export const handleDiffHours = (date1: Date, date2: Date) => {
  const diff = diffHours(date1, date2);
  return diff;
};
