import express from "express";
import * as proveedorController from "../controllers/proveedoresController.js";

const router = express.Router();

router.post("/", proveedorController.createProveedor);
router.put("/:id", proveedorController.updateProveedor);
router.delete("/:id", proveedorController.deleteProveedor);
router.get("/top", proveedorController.getTopProveedores);
router.get("/:id", proveedorController.selectProveedor);
router.get("/", proveedorController.getProveedores);

export default router;
