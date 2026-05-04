const DEFAULT_API_BASE_URL = import.meta.env.PROD ? "/api" : "http://localhost:5000/api";
const TOUR_REQUEST_RETRY_DELAYS_MS = [0, 1500, 4000];

const normalizeApiBaseUrl = (value) => {
  if (!value) {
    return DEFAULT_API_BASE_URL;
  }

  const trimmedValue = value.trim().replace(/\/+$/, "");

  if (trimmedValue === "/api" || trimmedValue.endsWith("/api")) {
    return trimmedValue;
  }

  if (trimmedValue.startsWith("http://") || trimmedValue.startsWith("https://")) {
    return `${trimmedValue}/api`;
  }

  return trimmedValue;
};

const API_BASE_URL = normalizeApiBaseUrl(import.meta.env.VITE_API_BASE_URL);

const sleep = (durationMs) => new Promise((resolve) => setTimeout(resolve, durationMs));

const isRetryableRequestError = (error) => {
  if (!error) {
    return false;
  }

  return error instanceof TypeError || error.message === "Failed to fetch";
};

const readErrorMessage = async (response, fallbackMessage) => {
  const contentType = response.headers.get("content-type") || "";

  try {
    if (contentType.includes("application/json")) {
      const payload = await response.json();
      return payload.message || fallbackMessage;
    }

    const text = await response.text();
    return text || fallbackMessage;
  } catch {
    return fallbackMessage;
  }
};

const fetchJson = async (path, { fallbackMessage, retryDelaysMs = [0], ...options } = {}) => {
  let lastError;

  for (let attempt = 0; attempt < retryDelaysMs.length; attempt += 1) {
    if (retryDelaysMs[attempt] > 0) {
      await sleep(retryDelaysMs[attempt]);
    }

    try {
      const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers: {
          Accept: "application/json",
          ...(options.headers || {})
        }
      });

      if (!response.ok) {
        const message = await readErrorMessage(response, fallbackMessage);
        const error = new Error(message);

        if (response.status >= 500 && attempt < retryDelaysMs.length - 1) {
          lastError = error;
          continue;
        }

        throw error;
      }

      return response.json();
    } catch (error) {
      lastError = error;

      if (attempt < retryDelaysMs.length - 1 && isRetryableRequestError(error)) {
        continue;
      }

      throw error;
    }
  }

  throw lastError || new Error(fallbackMessage);
};

export const fetchTour = async (slug) => {
  return fetchJson(`/tours/${slug}`, {
    fallbackMessage: "Failed to load tour data",
    retryDelaysMs: TOUR_REQUEST_RETRY_DELAYS_MS
  });
};

export const createBooking = async (payload) => {
  return fetchJson("/bookings", {
    fallbackMessage: "Failed to submit booking",
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
};

export const createInquiry = async (payload) => {
  return fetchJson("/inquiries", {
    fallbackMessage: "Failed to submit inquiry",
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
};
