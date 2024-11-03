import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

// eslint-disable-next-line import/prefer-default-export
export const validateJWT = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Authorization token is missing or invalid" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, config.jwtSecret);

    req.user = decoded;

    return next();
  } catch (err) {
    return res.status(403).json({ message: "Token is invalid or expired" });
  }
};
