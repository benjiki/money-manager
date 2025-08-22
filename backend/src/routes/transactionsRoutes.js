import express from "express";

import {
  createTransaction,
  delteTransaction,
  getTranscationByuserId,
  summaryTransaction,
} from "../controllers/transactionController.js";

const router = express.Router();

// add transactions
router.post("/", createTransaction);

// get specific user transactions
router.get("/:user_id", getTranscationByuserId);

// delete transactions
router.delete("/:id", delteTransaction);

// summary transactions
router.get("/:userId", summaryTransaction);

export default router;
