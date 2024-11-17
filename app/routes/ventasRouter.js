import express from "express";
import * as ventasController from "../controllers/ventasController.js";
import { validateJWT } from "../middleware/validateJWT.js";

const router = express.Router();

router.post("/", validateJWT, ventasController.createVenta);
router.put("/:id", validateJWT, ventasController.updateVenta);
router.delete("/:id", validateJWT, ventasController.deleteVenta);
router.get("/:id", validateJWT, ventasController.selectVenta);

export default router;
