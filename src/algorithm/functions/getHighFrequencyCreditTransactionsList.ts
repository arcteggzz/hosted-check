import { GroupedCreditTransaction } from "../types";

export const getHighFrequencyCreditTransactionsList = (
  limit: number,
  list: GroupedCreditTransaction[]
): GroupedCreditTransaction[] => {
  const selectedGroups = list.filter((group) => group.count >= limit);

  return selectedGroups;
};
