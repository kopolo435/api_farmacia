import express from "express";
import * as clienteController from "../controllers/clienteController.js";

const router = express.Router();

router.post("/clientes", clienteController.createCliente);
router.put("/clientes/:id", clienteController.updateCliente);
router.delete("/clientes/:id", clienteController.deleteCliente);
router.get("/clientes/:id", clienteController.selectCliente);

export default router;
