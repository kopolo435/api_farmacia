import express from "express";
import * as logInventarioController from "../controllers/logInventarioController.js";
import { validateJWT } from "../middleware/validateJWT.js";

const router = express.Router();

router.post("/", validateJWT, logInventarioController.createLogInventario);
router.put("/:id", validateJWT, logInventarioController.updateLogInventario);
router.delete("/:id", validateJWT, logInventarioController.deleteLogInventario);
router.get("/:id", validateJWT, logInventarioController.getLogInventarioById);

export default router;
