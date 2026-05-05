import { Inquiry } from "../model/Inquiry.js";

export const createInquiry = async (payload) => {
  return Inquiry.create(payload);
};
