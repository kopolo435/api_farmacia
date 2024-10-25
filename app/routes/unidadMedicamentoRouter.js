import express from "express";
import * as unidadMedicamentoController from "../controllers/unidadMedicamentoController.js";

const router = express.Router();

router.post("/", unidadMedicamentoController.createUnidadMedicamento);
router.put("/:id", unidadMedicamentoController.updateUnidadMedicamento);
router.delete("/:id", unidadMedicamentoController.deleteUnidadMedicamento);
router.get("/:id", unidadMedicamentoController.selectUnidadMedicamento);
router.get("/", unidadMedicamentoController.getUnidadMedicamento);

export default router;
