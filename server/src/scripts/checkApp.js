import { app } from "../app.js";

if (!app) {
  console.error("Express app export was not loaded.");
  process.exit(1);
}

console.log("Server app imported successfully.");
