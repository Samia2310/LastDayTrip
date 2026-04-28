const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const fetchTour = async (slug) => {
  const response = await fetch(`${API_BASE_URL}/tours/${slug}`);

  if (!response.ok) {
    throw new Error("Failed to load tour data");
  }

  return response.json();
};

export const createBooking = async (payload) => {
  const response = await fetch(`${API_BASE_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to submit booking");
  }

  return response.json();
};

export const createInquiry = async (payload) => {
  const response = await fetch(`${API_BASE_URL}/inquiries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to submit inquiry");
  }

  return response.json();
};

