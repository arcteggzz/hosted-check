import { ITransaction } from "../types";

export const transactionsSeven: ITransaction[] = [
  // October 2024
  { id: 1, date: "2024-10-01", type: "debit", amount: 150.0, narration: "" },
  { id: 2, date: "2024-10-06", type: "credit", amount: 75.0, narration: "" },
  { id: 3, date: "2024-10-11", type: "debit", amount: 60.0, narration: "" },
  { id: 4, date: "2024-10-16", type: "credit", amount: 90.0, narration: "" },
  { id: 5, date: "2024-10-21", type: "debit", amount: 2800.0, narration: "" },
  { id: 6, date: "2024-10-26", type: "debit", amount: 40.0, narration: "" },
  { id: 7, date: "2024-10-31", type: "credit", amount: 100.0, narration: "" },

  // November 2024
  { id: 8, date: "2024-11-01", type: "credit", amount: 85.0, narration: "" },
  { id: 9, date: "2024-11-06", type: "debit", amount: 45.0, narration: "" },
  { id: 10, date: "2024-11-11", type: "credit", amount: 120.0, narration: "" },
  { id: 11, date: "2024-11-16", type: "debit", amount: 60.0, narration: "" },
  { id: 12, date: "2024-11-21", type: "credit", amount: 95.0, narration: "" },
  { id: 13, date: "2024-11-26", type: "debit", amount: 3000.0, narration: "" },
  { id: 14, date: "2024-11-30", type: "debit", amount: 70.0, narration: "" },

  // December 2024
  { id: 15, date: "2024-12-01", type: "debit", amount: 140.0, narration: "" },
  { id: 16, date: "2024-12-06", type: "credit", amount: 110.0, narration: "" },
  { id: 17, date: "2024-12-11", type: "debit", amount: 60.0, narration: "" },
  { id: 18, date: "2024-12-16", type: "credit", amount: 75.0, narration: "" },
  { id: 19, date: "2024-12-21", type: "debit", amount: 3200.0, narration: "" },
  { id: 20, date: "2024-12-26", type: "debit", amount: 50.0, narration: "" },
  { id: 21, date: "2024-12-31", type: "credit", amount: 65.0, narration: "" },

  // January 2025
  { id: 22, date: "2025-01-01", type: "credit", amount: 100.0, narration: "" },
  { id: 23, date: "2025-01-06", type: "debit", amount: 65.0, narration: "" },
  { id: 24, date: "2025-01-11", type: "credit", amount: 85.0, narration: "" },
  { id: 25, date: "2025-01-16", type: "debit", amount: 40.0, narration: "" },
  { id: 26, date: "2025-01-21", type: "credit", amount: 90.0, narration: "" },
  { id: 27, date: "2025-01-26", type: "debit", amount: 3700.0, narration: "" },
  { id: 28, date: "2025-01-31", type: "debit", amount: 50.0, narration: "" },

  // February 2025
  { id: 29, date: "2025-02-01", type: "debit", amount: 70.0, narration: "" },
  { id: 30, date: "2025-02-06", type: "credit", amount: 95.0, narration: "" },
  { id: 31, date: "2025-02-11", type: "debit", amount: 50.0, narration: "" },
  { id: 32, date: "2025-02-16", type: "credit", amount: 130.0, narration: "" },
  { id: 33, date: "2025-02-21", type: "debit", amount: 2900.0, narration: "" },
  { id: 34, date: "2025-02-26", type: "debit", amount: 55.0, narration: "" },
  { id: 35, date: "2025-02-29", type: "credit", amount: 85.0, narration: "" },

  // March 2025
  { id: 36, date: "2025-03-01", type: "credit", amount: 90.0, narration: "" },
  { id: 37, date: "2025-03-06", type: "debit", amount: 60.0, narration: "" },
  { id: 38, date: "2025-03-11", type: "credit", amount: 110.0, narration: "" },
  { id: 39, date: "2025-03-16", type: "debit", amount: 80.0, narration: "" },
  { id: 40, date: "2025-03-21", type: "credit", amount: 120.0, narration: "" },
  { id: 41, date: "2025-03-26", type: "debit", amount: 3600.0, narration: "" },
  { id: 42, date: "2025-03-31", type: "debit", amount: 55.0, narration: "" },
];

export const creditTransactionsSeven: ITransaction[] = transactionsSeven.filter(
  (transaction) => transaction.type === "credit"
);
