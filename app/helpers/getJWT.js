import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

// eslint-disable-next-line import/prefer-default-export
export const getJWT = (idUser, nombre, idRol) => {
  const token = jwt.sign(
    {
      idUser,
      nombre,
      idRol,
    },
    config.jwtSecret,
    { expiresIn: "3h" },
  );
  return `Bearer ${token}`;
};
