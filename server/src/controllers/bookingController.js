import { Booking } from "../models/Booking.js";

export const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    return res.status(201).json({
      message: "Booking request submitted successfully",
      booking
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

