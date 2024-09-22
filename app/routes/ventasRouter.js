import express from "express";
import * as ventasController from "../controllers/ventasController.js";

const router = express.Router();

router.post("/", ventasController.createVenta);
router.put("/:id", ventasController.updateVenta);
router.delete("/:id", ventasController.deleteVenta);
router.get("/:id", ventasController.selectVenta);

export default router;
