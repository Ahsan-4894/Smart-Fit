import jwt from "jsonwebtoken";

export const generateToken = (id) => {
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
  return jwt.sign({ ID: id }, JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
};
