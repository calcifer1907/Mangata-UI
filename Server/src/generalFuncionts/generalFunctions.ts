export const upperCaseKeys = (rows: any[]) => {
  const upper = Object.fromEntries(
    Object.entries(rows).map(([key, value]) => [key.toUpperCase(), value])
  );
  return upper;
};
