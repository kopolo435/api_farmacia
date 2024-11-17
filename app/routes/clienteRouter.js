import express from "express";
import * as clienteController from "../controllers/clienteController.js";
import { validateJWT } from "../middleware/validateJWT.js";
import { validateAdmin } from "../middleware/adminRoutes.js";

const router = express.Router();

router.get("/", validateJWT, clienteController.getAllClientes);
router.post("/", validateJWT, validateAdmin, clienteController.createCliente);
router.put("/:id", validateJWT, validateAdmin, clienteController.updateCliente);
router.delete(
  "/:id",
  validateJWT,
  validateAdmin,
  clienteController.deleteCliente,
);
router.get("/:id", validateJWT, clienteController.selectCliente);

export default router;
