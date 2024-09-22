import express from "express";
import * as logVentasController from "../controllers/logVentasController.js";

const router = express.Router();

router.post("/", logVentasController.createLogVenta);
router.put("/:id", logVentasController.updateLogVenta);
router.delete("/:id", logVentasController.deleteLogVenta);
router.get("/:id", logVentasController.selectLogVenta);

export default router;
