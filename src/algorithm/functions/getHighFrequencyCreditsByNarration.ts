import { ITransaction, IKeywordMatch } from "../types";
import { config } from "../constants";

export const getHighFrequencyCreditsByNarration = (
  list: ITransaction[]
): IKeywordMatch[] => {
  const result: IKeywordMatch[] = [];

  config.keyWords.forEach((keyword) => {
    const keywordLower = keyword.toLowerCase(); // For case-insensitive comparison

    // Filter transactions where the narration contains the keyword
    const matchingTransactions = list.filter((transaction) =>
      transaction.narration.toLowerCase().includes(keywordLower)
    );

    if (matchingTransactions.length > 0) {
      result.push({
        keyword: keyword,
        numberOfTransactionsFound: matchingTransactions.length,
        transactionDetails: matchingTransactions.map((transaction) => ({
          id: transaction.id,
          date: transaction.date,
          amount: transaction.amount,
          narration: transaction.narration,
        })),
      });
    }
  });

  return result;
};
