import bcrypt from "bcryptjs";

export const hashPassword = (password: string) => {
  const salt = bcrypt.hashSync(password, 10);
  return salt;
};

export const comparePassword = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
};
