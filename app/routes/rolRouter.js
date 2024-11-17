import express from "express";
import * as rolController from "../controllers/rolController.js";
import { validateJWT } from "../middleware/validateJWT.js";

const router = express.Router();

router.post("/", validateJWT, rolController.createRol);
router.put("/:id", validateJWT, rolController.updateRol);
router.delete("/:id", validateJWT, rolController.deleteRol);
router.get("/:id", validateJWT, rolController.selectRol);

export default router;
