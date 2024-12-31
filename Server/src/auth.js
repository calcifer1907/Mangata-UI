import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "mangata.cartagena";
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "1h";

export const createToken = (userId, username) => {
  return jwt.sign({ userId, username }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};

export const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

export const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};
