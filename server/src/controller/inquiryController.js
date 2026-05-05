import { createInquiry as createInquiryService } from "../services/inquiryService.js";

export const createInquiry = async (req, res) => {
  try {
    const inquiry = await createInquiryService(req.body);
    return res.status(201).json({
      message: "Inquiry submitted successfully",
      inquiry
    });
  } catch (error) {
    const statusCode = error.name === "ValidationError" ? 400 : 500;
    return res.status(statusCode).json({ message: error.message });
  }
};
