import express from "express";
import * as usuriuoController from "../controllers/usuarioController.js";

const usuarioRouter = express.Router();

usuarioRouter.post("/", usuriuoController.createUsuario);
usuarioRouter.put("/:id", usuriuoController.updateusuario);
usuarioRouter.delete("/:id", usuriuoController.deleteUsuario);
usuarioRouter.get("/:id", usuriuoController.selectusuario);

export default usuarioRouter;
