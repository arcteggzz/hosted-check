import { GroupedCreditTransaction, ITransaction } from "../types";

export const groupCreditTransactionsByAmount = (
  transactions: ITransaction[]
): GroupedCreditTransaction[] => {
  const groupedTransactions: { [key: number]: GroupedCreditTransaction } = {};

  transactions.forEach((transaction) => {
    const { id, amount, narration, date } = transaction;

    // Check if this amount already exists in the group
    if (!groupedTransactions[amount]) {
      groupedTransactions[amount] = {
        id: Object.keys(groupedTransactions).length + 1, // Incremental ID
        amount: amount,
        count: 0,
        transactionDetails: [],
      };
    }

    // Update the group for this amount
    groupedTransactions[amount].count += 1;
    groupedTransactions[amount].transactionDetails.push({
      id: id as string,
      date: date,
      narration: narration,
    });
  });

  // Convert the object to an array
  return Object.values(groupedTransactions);
};
