import { IDescriptionFrequency, GroupedCreditTransaction } from "../types";
import { config } from "../constants";

export const getDescriptionFrequencies = (
  testAmount: GroupedCreditTransaction
): IDescriptionFrequency => {
  const storage: IDescriptionFrequency = {
    keywords: [],
    numberOfSelected: 0,
    numberOfUnselected: testAmount.count,
    pickedTransactionIds: [],
    unselectedTransactionIds: [],
  };

  //take one transaction Id
  //use Id to get the narration
  //check if the any of the keywords are inside that narration in anayway

  testAmount.transactionDetails.forEach((transaction) => {
    const narrationInLowerCase = transaction.narration.toLowerCase();

    // Use a regular loop to exit early when a match is found
    for (const keyword of config.keyWords) {
      const isSubstring = narrationInLowerCase.includes(keyword.toLowerCase());

      if (isSubstring) {
        if (!storage.keywords?.includes(keyword))
          storage.keywords?.push(keyword);

        storage.numberOfSelected++;
        storage.numberOfUnselected--;
        storage.pickedTransactionIds?.push(`${transaction.id}`);
        return; // Exit the loop when a match is found
      }
    }

    // If no keyword matches, push the ID to unselectedTransactionIds
    storage.unselectedTransactionIds?.push(`${transaction.id}`);
  });

  return storage;
};
