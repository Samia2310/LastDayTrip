import { Inquiry } from "../models/Inquiry.js";

export const createInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.create(req.body);
    return res.status(201).json({
      message: "Inquiry submitted successfully",
      inquiry
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

