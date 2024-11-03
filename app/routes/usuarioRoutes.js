import express from "express";
import * as usuarioController from "../controllers/usuarioController.js";

const usuarioRouter = express.Router();

usuarioRouter.post("/", usuarioController.createUsuario);
usuarioRouter.put("/:id", usuarioController.updateusuario);
usuarioRouter.delete("/:id", usuarioController.deleteUsuario);
usuarioRouter.get("/:id", usuarioController.selectusuario);

export default usuarioRouter;
