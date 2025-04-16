import { format, diffHours } from "@formkit/tempo";

export const formatDate = (date: string, formatDate?: string) => {
  const initialFormat = formatDate ?? "YYYY-MM-DD HH:mm:ss";
  const initialDate = date ? date : new Date();
  return format(initialDate, initialFormat, "es-CO");
};

export const handleDiffHours = (date1: Date, date2: Date) => {
  const diff = diffHours(date1, date2);
  return diff;
};
