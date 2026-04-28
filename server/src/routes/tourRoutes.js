import { Router } from "express";
import { getTourBySlug } from "../controllers/tourController.js";

const router = Router();

router.get("/:slug", getTourBySlug);

export default router;

