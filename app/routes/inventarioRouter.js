import express from "express";
import * as inventarioController from "../controllers/inventarioController.js";
import { validateJWT } from "../middleware/validateJWT.js";

const router = express.Router();

router.post("/", validateJWT, inventarioController.createInventario);
router.get("/low-stock", validateJWT, inventarioController.getProductsToFinish);
router.get(
  "/expiring-soon",
  validateJWT,
  inventarioController.getProductsToExpire,
);
router.put("/:id", validateJWT, inventarioController.updateInventario);
router.delete("/:id", validateJWT, inventarioController.deleteInventario);
router.get("/", validateJWT, inventarioController.getFarmaciaInventario);
router.get("/:id", validateJWT, inventarioController.selectInventario);

export default router;
