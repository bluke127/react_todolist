import express from "express";
const router = express.Router();
import { createTodo, getTodo } from "../Controllers/Todo.js";

router.get("/todo", getTodo);

router.post("/todo", createTodo);
export default router;
