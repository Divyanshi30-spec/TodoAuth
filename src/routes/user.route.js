import mongoose from "mongoose";
import { Router } from "express";
import { createTask, getAllTask, editTask, deleteTask } from "../controllers/task.controller.js";
// import auth from "../middlewares/auth.middleware.js"

const router= Router();

router.post("/", createTask);
router.get("/", getAllTask);
router.put("/:id",  editTask);
router.delete("/:id",  deleteTask);

export default router;



