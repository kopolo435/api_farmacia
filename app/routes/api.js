import express from "express";
import usuarioRouter from "./usuarioRoutes.js";
import rolRouter from "./rolRouter.js";

const router = express.Router();

router.use("/usuario", usuarioRouter);
router.use("/rol", rolRouter);

export default router;
