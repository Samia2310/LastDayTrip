import { Tour } from "../model/Tour.js";
import { barishalTour } from "../data/barishalTour.js";

const createSeedTourIfNeeded = async (slug) => {
  if (slug !== barishalTour.slug) {
    return null;
  }

  return Tour.findOneAndUpdate(
    { slug: barishalTour.slug },
    barishalTour,
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true
    }
  ).lean();
};

export const getTourBySlug = async (slug) => {
  const tour = await Tour.findOne({ slug }).lean();

  if (tour) {
    return tour;
  }

  return createSeedTourIfNeeded(slug);
};
