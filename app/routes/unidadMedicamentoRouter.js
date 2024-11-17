import express from "express";
import * as unidadMedicamentoController from "../controllers/unidadMedicamentoController.js";
import { validateJWT } from "../middleware/validateJWT.js";

const router = express.Router();

router.post(
  "/",
  validateJWT,
  unidadMedicamentoController.createUnidadMedicamento,
);
router.put(
  "/:id",
  validateJWT,
  unidadMedicamentoController.updateUnidadMedicamento,
);
router.delete(
  "/:id",
  validateJWT,
  unidadMedicamentoController.deleteUnidadMedicamento,
);
router.get(
  "/:id",
  validateJWT,
  unidadMedicamentoController.selectUnidadMedicamento,
);
router.get("/", validateJWT, unidadMedicamentoController.getUnidadMedicamento);

export default router;
