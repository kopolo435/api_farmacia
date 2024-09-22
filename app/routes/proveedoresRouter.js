import express from "express";
import * as proveedorController from "../controllers/proveedoresController.js";

const router = express.Router();

router.post("/proveedores", proveedorController.createProveedor);
router.put("/proveedores/:id", proveedorController.updateProveedor);
router.delete("/proveedores/:id", proveedorController.deleteProveedor);
router.get("/proveedores/:id", proveedorController.selectProveedor);

export default router;
