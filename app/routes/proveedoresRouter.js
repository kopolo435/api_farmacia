import express from "express";
import * as proveedorController from "../controllers/proveedoresController.js";
import { validateJWT } from "../middleware/validateJWT.js";
import { validateAdmin } from "../middleware/adminRoutes.js";

const router = express.Router();

router.post(
  "/",
  validateJWT,
  validateAdmin,
  proveedorController.createProveedor,
);
router.put(
  "/:id",
  validateJWT,
  validateAdmin,
  proveedorController.updateProveedor,
);
router.delete(
  "/:id",
  validateJWT,
  validateAdmin,
  proveedorController.deleteProveedor,
);
router.get("/top", validateJWT, proveedorController.getTopProveedores);
router.get("/:id", validateJWT, proveedorController.selectProveedor);
router.get("/", validateJWT, proveedorController.getProveedores);

export default router;
