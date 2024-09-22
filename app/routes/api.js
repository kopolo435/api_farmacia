import express from "express";
import usuarioRouter from "./usuarioRoutes.js";
import rolRouter from "./rolRouter.js";
import clienteRouter from "./clienteRouter.js";
import recetasRouter from "./recetasRoutes.js";
import proveedoresRouter from "./proveedoresRouter.js";
import unidadMedicamentoRouter from "./unidadMedicamentoRouter.js";

const router = express.Router();

router.use("/usuario", usuarioRouter);
router.use("/rol", rolRouter);
router.use("/cliente", clienteRouter);
router.use("/recetas", recetasRouter);
router.use("/proveedores", proveedoresRouter);
router.use("/unidad-medicamento", unidadMedicamentoRouter);

export default router;
