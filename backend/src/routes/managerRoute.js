import express from "express";
import checkRole from "../middlewares/checkRole.js";

const router = express.Router();

// router.post("/", checkRole("admin", "manager", "director"), addManager);
// router.get("/", checkRole("admin", "manager", "director"), getManagers);
// router.put("/", checkRole("admin", "director"), modifyManager);
// router.delete("/", checkRole("admin"), deleteManager);

export default router;
