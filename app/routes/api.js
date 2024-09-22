import express from "express";
import usuarioRouter from "./usuarioRoutes.js";

const router = express.Router();

router.use("/usuario", usuarioRouter);

export default router;
