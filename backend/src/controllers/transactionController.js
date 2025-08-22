import { sql } from "../config/db.js";

export async function getTranscationByuserId(req, res) {
  try {
    const { user_id } = req.params;

    const transactions =
      await sql`SELECT * FROM transactions WHERE user_id=${user_id} ORDER BY  created_at DESC`;
    res.status(200).json(transactions);
  } catch (error) {
    console.log("Error getting the transaction", error);
    // console.log(first);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function createTransaction(req, res) {
  try {
    const { title, amount, category, user_id } = req.body;
    if (!title || !amount || !category || !user_id === undefined) {
      return res.status(400).json({
        message: "All filed are required",
      });
    }
    const transaction =
      await sql`INSERT INTO transactions(user_id,title,amount,category)
        VALUES (${user_id},${title},${amount},${category})
        RETURNING *
        `;
    console.log(transaction);
    res.status(201).json(transaction[0]);
  } catch (error) {
    console.log("Error creating the transaction", error);
    // console.log(first);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function delteTransaction(req, res) {
  try {
    const { id } = req.params;

    // Strict check: id must be digits only
    if (!/^\d+$/.test(id)) {
      return res.status(400).json({ message: "Id should be a valid number" });
    }
    const result =
      await sql`DELETE FROM transactions WHERE id =${id} RETURNING *`;
    if (result.length === 0) {
      return res.status(404).json({ message: "Transaction not found !" });
    }
    res.status(200).json({ message: "Transaction deleted" });
  } catch (error) {
    console.log("Error deleting the transaction", error);
    // console.log(first);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function summaryTransaction(req, res) {
  try {
    const { userId } = req.params;

    const balanceResult =
      await sql`SELECT COALESCE (SUM(amount),0) as balance FROM transactions WHERE user_id=${userId}`;
    const incomeResult =
      await sql`SELECT COALESCE(SUM(amount),0) as income FROM transactions WHERE user_id=${userId} AND amount > 0`;
    const expensesResult =
      await sql`SELECT COALESCE(SUM(amount),0) as expenses FROM transactions WHERE user_id=${userId} AND amount < 0`;
    res.status(200).json({
      balance: balanceResult[0].balance,
      income: incomeResult[0].income,
      expenses: expensesResult[0].expenses,
    });
  } catch (error) {
    console.log("Error getting the transaction summary", error);
    // console.log(first);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
