import dotenv from "dotenv";
import { connectDatabase } from "./config/db.js";
import { app } from "./app.js";

dotenv.config();

const port = process.env.PORT || 5000;

const startServer = async () => {
  await connectDatabase();

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer();

