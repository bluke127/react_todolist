import express from "express";
const router = express.Router();
import { cudTodo, getTodo } from "../Controllers/Todo.js";


router.get("/todo", getTodo);

router.post("/todo", cudTodo);
export default router;
