import { GroupedCreditTransaction } from "../types";

//final number is a percentage score

export const getSenderSimilarityAnalysisScore = (
  groupedCreditTransaction: GroupedCreditTransaction
) => {
  if (groupedCreditTransaction) return 100;
  return 100;
};
