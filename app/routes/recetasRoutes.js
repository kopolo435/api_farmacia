import express from "express";
import * as recetaController from "../controllers/recetaController.js";
import { validateJWT } from "../middleware/validateJWT.js";
import upload from "../middleware/pdfHandler.js";

const router = express.Router();

router.post(
  "/",
  upload.single("archivoReceta"),
  validateJWT,
  recetaController.createReceta,
);
router.put(
  "/:id",
  upload.single("archivoReceta"),
  validateJWT,
  recetaController.updateReceta,
);
router.delete("/:id", validateJWT, recetaController.deleteReceta);
router.get("/:id", validateJWT, recetaController.selectReceta);
router.post("/pdf", validateJWT, recetaController.getBase64RecetaPDF);
router.get("/", validateJWT, recetaController.getAllRecetas);

export default router;
