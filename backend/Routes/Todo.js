import express from "express";
const router = express.Router();
import { createTodo, getTodo,updateTodo } from "../Controllers/Todo.js";

router.get("/todo", getTodo);

router.post("/todo", createTodo);
router.put("/todo", updateTodo);
export default router;
