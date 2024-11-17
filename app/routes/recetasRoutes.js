import express from "express";
import * as recetaController from "../controllers/recetaController.js";
import { validateJWT } from "../middleware/validateJWT.js";

const router = express.Router();

router.post("/", validateJWT, recetaController.createReceta);
router.put("/:id", validateJWT, recetaController.updateReceta);
router.delete("/:id", validateJWT, recetaController.deleteReceta);
router.get("/:id", validateJWT, recetaController.selectReceta);
router.get("/", validateJWT, recetaController.getAllRecetas);

export default router;
