import express from "express";
import * as usuarioController from "../controllers/usuarioController.js";
import { validateJWT } from "../middleware/validateJWT.js";
import { validateAdmin } from "../middleware/adminRoutes.js";

const usuarioRouter = express.Router();

usuarioRouter.post("/login", usuarioController.login);
usuarioRouter.post(
  "/",
  validateJWT,
  validateAdmin,
  usuarioController.createUsuario,
);
usuarioRouter.put(
  "/:id",
  validateJWT,
  validateAdmin,
  usuarioController.updateusuario,
);
usuarioRouter.delete(
  "/:id",
  validateJWT,
  validateAdmin,
  usuarioController.deleteUsuario,
);
usuarioRouter.get(
  "/",
  validateJWT,
  validateAdmin,
  usuarioController.getAllUsuarios,
);
usuarioRouter.get("/:id", validateJWT, usuarioController.selectusuario);

export default usuarioRouter;
