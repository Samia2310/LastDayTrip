import mongoose from "mongoose";

const replySchema = new mongoose.Schema(
  {
    author: String,
    message: String
  },
  { _id: false }
);

const reviewSchema = new mongoose.Schema(
  {
    name: String,
    initial: String,
    date: String,
    rating: Number,
    title: String,
    text: String,
    travelDate: String,
    reply: replySchema
  },
  { _id: false }
);

const availabilitySchema = new mongoose.Schema(
  {
    badge: String,
    fromLabel: String,
    toLabel: String,
    from: String,
    to: String,
    oldPrice: String,
    price: String,
    roomType: String,
    language: String,
    note: String,
    discount: String
  },
  { _id: false }
);

const faqSchema = new mongoose.Schema(
  {
    category: String,
    question: String,
    answer: String
  },
  { _id: false }
);

const tourSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    title: {
      type: String,
      required: true
    },
    location: String,
    country: String,
    duration: String,
    rating: Number,
    reviewCount: Number,
    travelerCountLabel: String,
    experienceCountLabel: String,
    content: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    reviews: [reviewSchema],
    availability: [availabilitySchema],
    faqs: [faqSchema]
  },
  {
    timestamps: true
  }
);

export const Tour = mongoose.model("Tour", tourSchema);

