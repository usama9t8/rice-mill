import jwt from "jsonwebtoken";

export const createJWT = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
  return token;
};

export const validateJWT = (token) => {
  const isValid = jwt.verify(token, process.env.JWT_SECRET);
  return isValid;
};
