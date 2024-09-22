import express from "express";
import usuarioRouter from "./usuarioRoutes.js";
import rolRouter from "./rolRouter.js";
import clienteRouter from "./clienteRouter.js";

const router = express.Router();

router.use("/usuario", usuarioRouter);
router.use("/rol", rolRouter);
router.use("/cliente", clienteRouter);

export default router;
