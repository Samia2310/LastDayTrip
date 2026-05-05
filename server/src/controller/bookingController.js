import { createBooking as createBookingService } from "../services/bookingService.js";

export const createBooking = async (req, res) => {
  try {
    const booking = await createBookingService(req.body);
    return res.status(201).json({
      message: "Booking request submitted successfully",
      booking
    });
  } catch (error) {
    const statusCode = error.name === "ValidationError" ? 400 : 500;
    return res.status(statusCode).json({ message: error.message });
  }
};
