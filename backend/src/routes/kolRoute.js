import express from "express";
import checkRole from "../middlewares/checkRole.js";

const router = express.Router();

// router.post("/", checkRole("admin", "manager", "director"), addKol);
// router.get("/:id", checkRole("admin", "manager", "director"), viewKolInfo);
// router.put("/:id", checkRole("admin", "director"), modifyKol);
// router.delete("/:id", checkRole("admin"), deleteKol);
// router.get("/kols", checkRole(), getAllKols);
// router.get("/posts/:id", checkRole(), getAllPosts);

export default router;
