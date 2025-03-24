import { format } from "@formkit/tempo";

export const formatDate = (date: Date) => {
  return format(date, "YYYY-MM-DD HH:mm:ss");
};
