import { Booking } from "../model/Booking.js";

export const createBooking = async (payload) => {
  return Booking.create(payload);
};
