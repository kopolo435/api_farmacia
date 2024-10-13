import express from "express";
import * as clienteController from "../controllers/clienteController.js";

const router = express.Router();

router.get("/", clienteController.getAllClientes);
router.post("/", clienteController.createCliente);
router.put("/:id", clienteController.updateCliente);
router.delete("/:id", clienteController.deleteCliente);
router.get("/:id", clienteController.selectCliente);

export default router;
