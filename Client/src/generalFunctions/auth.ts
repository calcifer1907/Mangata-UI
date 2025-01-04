import bcrypt from "bcryptjs";

export const hashPassword = (password: string) => {
  const salt = bcrypt.hashSync(password, 10);
  return salt;
};
