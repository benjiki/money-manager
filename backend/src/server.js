import express from "express";
import dotenv from "dotenv";
import { initDb } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

import transactionsRoutes from "./routes/transactionsRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(rateLimiter);
app.use(express.json());

//routes
app.use("/api/transactions", transactionsRoutes);

// api status checker
app.get("/health", (res, req) => {
  res.send("its working");
});

initDb().then(() => {
  app.listen(PORT, () => {
    console.log("working port", PORT);
  });
});
