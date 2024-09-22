import express from "express";
import * as recetaController from "../controllers/recetaController.js";

const router = express.Router();

router.post("/recetas", recetaController.createReceta);
router.put("/recetas/:id", recetaController.updateReceta);
router.delete("/recetas/:id", recetaController.deleteReceta);
router.get("/recetas/:id", recetaController.selectReceta);

export default router;
