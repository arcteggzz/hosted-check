import { ITransaction } from "../types";

export const transactionsSix: ITransaction[] = [
  // October 2024
  {
    id: 1,
    date: "2024-10-01",
    type: "debit",
    amount: 180.5,
    narration: "Groceries at Supermart",
    to: "Supermart",
  },
  {
    id: 2,
    date: "2024-10-06",
    type: "debit",
    amount: 60.75,
    narration: "Gas station refill",
    to: "Shell Gas Station",
  },
  {
    id: 3,
    date: "2024-10-11",
    type: "debit",
    amount: 120.0,
    narration: "Dinner at Italian Restaurant",
    to: "Ristorante Italiano",
  },
  {
    id: 4,
    date: "2024-10-16",
    type: "credit",
    amount: 3200.0,
    narration: "Salary deposit",
    from: "Company Payroll",
  },
  {
    id: 5,
    date: "2024-10-21",
    type: "debit",
    amount: 40.0,
    narration: "Uber ride",
    to: "Uber",
  },
  {
    id: 6,
    date: "2024-10-26",
    type: "debit",
    amount: 90.0,
    narration: "Online purchase - Electronics",
    to: "Amazon",
  },
  {
    id: 7,
    date: "2024-10-31",
    type: "credit",
    amount: 250.0,
    narration: "Freelance payment",
    from: "Client A",
  },

  // November 2024
  {
    id: 8,
    date: "2024-11-01",
    type: "debit",
    amount: 200.0,
    narration: "Groceries at Supermart",
    to: "Supermart",
  },
  {
    id: 9,
    date: "2024-11-06",
    type: "credit",
    amount: 3500.0,
    narration: "Salary deposit",
    from: "Company Payroll",
  },
  {
    id: 10,
    date: "2024-11-11",
    type: "debit",
    amount: 75.25,
    narration: "Gas station refill",
    to: "Exxon",
  },
  {
    id: 11,
    date: "2024-11-16",
    type: "debit",
    amount: 100.0,
    narration: "Monthly gym subscription",
    to: "Fitness World",
  },
  {
    id: 12,
    date: "2024-11-21",
    type: "credit",
    amount: 500.0,
    narration: "Freelance project payment",
    from: "Client B",
  },
  {
    id: 13,
    date: "2024-11-26",
    type: "debit",
    amount: 30.0,
    narration: "Coffee shop visit",
    to: "Starbucks",
  },
  {
    id: 14,
    date: "2024-11-31",
    type: "debit",
    amount: 80.0,
    narration: "Uber ride to the airport",
    to: "Uber",
  },

  // December 2024
  {
    id: 15,
    date: "2024-12-01",
    type: "credit",
    amount: 275.0,
    narration: "Freelance payment",
    from: "Client C",
  },
  {
    id: 16,
    date: "2024-12-06",
    type: "debit",
    amount: 125.5,
    narration: "Christmas gift shopping",
    to: "Mall Store",
  },
  {
    id: 17,
    date: "2024-12-11",
    type: "debit",
    amount: 90.75,
    narration: "Dinner with family",
    to: "Seafood Restaurant",
  },
  {
    id: 18,
    date: "2024-12-16",
    type: "credit",
    amount: 2900.0,
    narration: "Salary deposit",
    from: "Company Payroll",
  },
  {
    id: 19,
    date: "2024-12-21",
    type: "debit",
    amount: 250.0,
    narration: "New Year's party supplies",
    to: "Party Supplies Store",
  },
  {
    id: 20,
    date: "2024-12-26",
    type: "debit",
    amount: 65.0,
    narration: "Gas station refill",
    to: "Shell Gas Station",
  },
  {
    id: 21,
    date: "2024-12-31",
    type: "debit",
    amount: 120.0,
    narration: "New Year's Eve dinner",
    to: "Restaurant ABC",
  },

  // January 2025
  {
    id: 22,
    date: "2025-01-01",
    type: "debit",
    amount: 180.0,
    narration: "Groceries at Supermart",
    to: "Supermart",
  },
  {
    id: 23,
    date: "2025-01-06",
    type: "credit",
    amount: 3100.0,
    narration: "Salary deposit",
    from: "Company Payroll",
  },
  {
    id: 24,
    date: "2025-01-11",
    type: "debit",
    amount: 85.5,
    narration: "Gas station refill",
    to: "BP Gas Station",
  },
  {
    id: 25,
    date: "2025-01-16",
    type: "debit",
    amount: 95.0,
    narration: "Gym subscription",
    to: "Fitness Plus",
  },
  {
    id: 26,
    date: "2025-01-21",
    type: "credit",
    amount: 400.0,
    narration: "Freelance payment",
    from: "Client D",
  },
  {
    id: 27,
    date: "2025-01-26",
    type: "debit",
    amount: 45.0,
    narration: "Uber ride",
    to: "Uber",
  },
  {
    id: 28,
    date: "2025-01-31",
    type: "debit",
    amount: 70.0,
    narration: "Dinner at Italian Restaurant",
    to: "Ristorante Italiano",
  },

  // February 2025
  {
    id: 29,
    date: "2025-02-01",
    type: "debit",
    amount: 140.0,
    narration: "Groceries at Supermart",
    to: "Supermart",
  },
  {
    id: 30,
    date: "2025-02-06",
    type: "credit",
    amount: 3800.0,
    narration: "Salary deposit",
    from: "Company Payroll",
  },
  {
    id: 31,
    date: "2025-02-11",
    type: "debit",
    amount: 65.0,
    narration: "Gas station refill",
    to: "Chevron",
  },
  {
    id: 32,
    date: "2025-02-16",
    type: "credit",
    amount: 350.0,
    narration: "Freelance payment",
    from: "Client E",
  },
  {
    id: 33,
    date: "2025-02-21",
    type: "debit",
    amount: 90.0,
    narration: "Valentine's gift",
    to: "Gift Store",
  },
  {
    id: 34,
    date: "2025-02-26",
    type: "debit",
    amount: 50.0,
    narration: "Coffee shop visit",
    to: "Starbucks",
  },
  {
    id: 35,
    date: "2025-02-31",
    type: "debit",
    amount: 85.0,
    narration: "Dinner at Sushi Restaurant",
    to: "Sushi Place",
  },

  // March 2025
  {
    id: 36,
    date: "2025-03-01",
    type: "debit",
    amount: 130.0,
    narration: "Groceries at Supermart",
    to: "Supermart",
  },
  {
    id: 37,
    date: "2025-03-06",
    type: "credit",
    amount: 2700.0,
    narration: "Salary deposit",
    from: "Company Payroll",
  },
  {
    id: 38,
    date: "2025-03-11",
    type: "debit",
    amount: 55.0,
    narration: "Gas station refill",
    to: "Texaco",
  },
  {
    id: 39,
    date: "2025-03-16",
    type: "debit",
    amount: 120.0,
    narration: "New shoes purchase",
    to: "Shoe Store",
  },
  {
    id: 40,
    date: "2025-03-21",
    type: "credit",
    amount: 600.0,
    narration: "Freelance payment",
    from: "Client F",
  },
  {
    id: 41,
    date: "2025-03-26",
    type: "debit",
    amount: 70.0,
    narration: "Uber ride",
    to: "Uber",
  },
  {
    id: 42,
    date: "2025-03-31",
    type: "debit",
    amount: 90.0,
    narration: "Monthly gym subscription",
    to: "Gym Plus",
  },
];

export const creditTransactionsSix: ITransaction[] = transactionsSix.filter(
  (transaction) => transaction.type === "credit"
);
