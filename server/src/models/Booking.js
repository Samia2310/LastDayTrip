import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    tourSlug: {
      type: String,
      required: true
    },
    packageType: {
      type: String,
      required: true
    },
    tourType: {
      type: String,
      required: true
    },
    travelMonth: {
      type: String,
      required: true
    },
    travelers: {
      type: String,
      required: true
    },
    guestName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    notes: String,
    status: {
      type: String,
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

export const Booking = mongoose.model("Booking", bookingSchema);

