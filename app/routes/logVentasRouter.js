import express from "express";
import * as logVentasController from "../controllers/logVentasController.js";
import { validateJWT } from "../middleware/validateJWT.js";

const router = express.Router();

router.post("/", validateJWT, logVentasController.createLogVenta);
router.put("/:id", validateJWT, logVentasController.updateLogVenta);
router.delete("/:id", validateJWT, logVentasController.deleteLogVenta);
router.get("/:id", validateJWT, logVentasController.selectLogVenta);

export default router;
