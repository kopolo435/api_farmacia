import express from "express";
import * as rolController from "../controllers/rolController.js";

const router = express.Router();

router.post("/", rolController.createRol);
router.put("/:id", rolController.updateRol);
router.delete("/:id", rolController.deleteRol);
router.get("/:id", rolController.selectRol);

export default router;
