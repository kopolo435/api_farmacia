import express from "express";
import * as recetaController from "../controllers/recetaController.js";

const router = express.Router();

router.post("/", recetaController.createReceta);
router.put("/:id", recetaController.updateReceta);
router.delete("/:id", recetaController.deleteReceta);
router.get("/:id", recetaController.selectReceta);

export default router;
