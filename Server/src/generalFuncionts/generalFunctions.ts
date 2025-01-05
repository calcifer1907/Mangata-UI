export const upperCaseKeys = (rows: any[]) => {
  const upper = Object.fromEntries(
    Object.entries(rows).map(([key, value]) => [key.toUpperCase(), value])
  );
  console.log(rows);
  console.log(upper);
  return upper;
};
