import express from "express";
import * as proveedorController from "../controllers/proveedoresController.js";

const router = express.Router();

router.post("/", proveedorController.createProveedor);
router.put("/:id", proveedorController.updateProveedor);
router.delete("/:id", proveedorController.deleteProveedor);
router.get("/:id", proveedorController.selectProveedor);

export default router;
