import express from "express";
import * as inventarioController from "../controllers/inventarioController.js";

const router = express.Router();

router.post("/", inventarioController.createInventario);
router.put("/:id", inventarioController.updateInventario);
router.delete("/:id", inventarioController.deleteInventario);
router.get("/:id", inventarioController.selectInventario);

export default router;
