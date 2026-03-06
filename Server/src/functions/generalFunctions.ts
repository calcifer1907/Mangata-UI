export const upperCaseKeys = (rows: any[]) => {
  const upper = Object.fromEntries(
    Object.entries(rows).map(([key, value]) => [key.toUpperCase(), value]),
  );
  return upper;
};

export const STATUS_BOLD = {
  SALE_APPROVED: "approved",
  SALE_REJECTED: "rejected",
  VOID_APPROVED: "void_approved",
  VOID_REJECTED: "void_rejected",
};
