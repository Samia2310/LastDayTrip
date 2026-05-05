import { getTourBySlug as getTourBySlugService } from "../services/tourService.js";

export const getTourBySlug = async (req, res) => {
  try {
    const tour = await getTourBySlugService(req.params.slug);

    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    return res.json(tour);
  } catch (error) {
    return res.status(500).json({ message: "Failed to load tour" });
  }
};
