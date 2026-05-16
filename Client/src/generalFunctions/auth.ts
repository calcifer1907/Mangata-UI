import bcrypt from "bcryptjs";

export const hashPassword = (password: string) => {
  const salt = bcrypt.hash(password, 10);
  return salt;
};

export const comparePassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};
