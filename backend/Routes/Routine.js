import express from "express";
const router = express.Router();
import { cudRoutine, getRoutine } from "../Controllers/Routine.js";


router.get("/routine", getRoutine);

router.post("/routine", cudRoutine);
export default router;
