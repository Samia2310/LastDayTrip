import { Router } from "express";
import { createBooking } from "../controller/bookingController.js";

const router = Router();

router.post("/", createBooking);

export default router;
