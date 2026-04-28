import { Tour } from "../models/Tour.js";
import { barishalTour } from "../data/barishalTour.js";

const getOrCreateTour = async (slug) => {
  let tour = await Tour.findOne({ slug }).lean();

  if (!tour && slug === barishalTour.slug) {
    const createdTour = await Tour.create(barishalTour);
    tour = createdTour.toObject();
  }

  return tour;
};

export const getTourBySlug = async (req, res) => {
  try {
    const tour = await getOrCreateTour(req.params.slug);

    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    return res.json(tour);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

