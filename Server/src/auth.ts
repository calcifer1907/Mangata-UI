import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "mangata.cartagena.2025";
const JWT_EXPIRATION: string | number = process.env.JWT_EXPIRATION || "1h";

export const createToken = (userId: string, username: string) => {
  const expiresIn = JWT_EXPIRATION as jwt.SignOptions["expiresIn"];
  return jwt.sign({ userId, username }, JWT_SECRET, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};

export const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, 10);
};

export const comparePassword = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
};
