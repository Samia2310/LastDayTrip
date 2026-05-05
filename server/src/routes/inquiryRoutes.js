import { Router } from "express";
import { createInquiry } from "../controller/inquiryController.js";

const router = Router();

router.post("/", createInquiry);

export default router;
