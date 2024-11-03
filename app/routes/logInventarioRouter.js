import express from "express";
import * as logInventarioController from "../controllers/logInventarioController.js";

const router = express.Router();

router.post("/", logInventarioController.createLogInventario);
router.put("/:id", logInventarioController.updateLogInventario);
router.delete("/:id", logInventarioController.deleteLogInventario);
router.get("/:id", logInventarioController.getLogInventarioById);

export default router;
