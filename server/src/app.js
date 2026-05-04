import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import tourRoutes from "./routes/tourRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import inquiryRoutes from "./routes/inquiryRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DEFAULT_CLIENT_ORIGIN = "http://localhost:5173";

const normalizeOrigin = (value) => value?.trim().replace(/\/+$/, "");

const allowedOrigins = (process.env.CLIENT_URL || DEFAULT_CLIENT_ORIGIN)
  .split(",")
  .map(normalizeOrigin)
  .filter(Boolean);

export const app = express();

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      const normalizedOrigin = normalizeOrigin(origin);

      if (allowedOrigins.includes(normalizedOrigin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS origin not allowed: ${origin}`));
    }
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/tours", tourRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/inquiries", inquiryRoutes);

const clientDistPath = path.resolve(__dirname, "../../client/dist");

app.use(express.static(clientDistPath));

app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) {
    return next();
  }

  return res.sendFile(path.join(clientDistPath, "index.html"), (error) => {
    if (error) {
      res.status(404).json({
        message: "Frontend build not found. Run the Vite client in development or build it for production."
      });
    }
  });
});
