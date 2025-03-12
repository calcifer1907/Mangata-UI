import { format } from "@formkit/tempo";

export const formatDate = (date: string) => {
  return format(date, "YYYY-MM-DD HH:mm:ss");
};
