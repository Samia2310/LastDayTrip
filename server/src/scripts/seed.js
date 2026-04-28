import dotenv from "dotenv";
import { connectDatabase } from "../config/db.js";
import { Tour } from "../models/Tour.js";
import { barishalTour } from "../data/barishalTour.js";

dotenv.config();

const seed = async () => {
  await connectDatabase();

  await Tour.findOneAndUpdate(
    { slug: barishalTour.slug },
    barishalTour,
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  console.log("Tour seeded successfully");
  process.exit(0);
};

seed().catch((error) => {
  console.error("Seeding failed:", error.message);
  process.exit(1);
});
