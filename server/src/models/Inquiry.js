import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    tourSlug: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export const Inquiry = mongoose.model("Inquiry", inquirySchema);

