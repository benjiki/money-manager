import { useCallback, useState } from "react";

const API_URL = "http://localhost:5001/api/";

export const useTransactions = (userId) => {
  const [transactions, setTransactions] = useState([]);
  const [Summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const feachTransactions = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/transactions/${userId}`);
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.log("Error fetching transactions:", error);
    }
  }, [userId]);
};
