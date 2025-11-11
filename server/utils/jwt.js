import jwt from "jsonwebtoken";

export const generateToken = ({ id, ttl }) => {
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
  return jwt.sign({ id: id }, JWT_SECRET_KEY, {
    expiresIn: ttl || "1d",
  });
};
