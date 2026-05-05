import { Router } from "express";
import { getTourBySlug } from "../controller/tourController.js";

const router = Router();

router.get("/:slug", getTourBySlug);

export default router;
