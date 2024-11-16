import { getSterilizedData } from "./functions/getSterilizedData";
import { groupCreditTransactionsByAmount } from "./functions/groupCreditTransactionsByAmount";
import { getHighFrequencyCreditTransactionsList } from "./functions/getHighFrequencyCreditTransactionsList";
import { getDescriptionFrequencies } from "./functions/getDescriptionFrequencies";
import { getHighFrequencyCreditsByNarration } from "./functions/getHighFrequencyCreditsByNarration";
import { getDatePeriodAnalysis } from "./functions/getDatePeriodAnalysis";
import { getSalaryDescriptionAnalysisScore } from "./functions/getSalaryDescriptionAnalysisScore";
import { getSenderSimilarityAnalysisScore } from "./functions/getSenderSimilarityAnalysisScore";
import {
  IAccountDetails,
  ITransaction,
  GroupedCreditTransaction,
  IDescriptionFrequency,
  // ISenderFrequencyTable,
  // IDateFrequencyTable,
} from "./types";
import { config } from "./constants";
import { formatKoboPriceInNaira, formatDate } from "./helpers/helpers";

export const creditAlgorithm = (
  sterilizedData: IAccountDetails,
  useLocalData: boolean
) => {
  // step 1
  const dataToUse: IAccountDetails = useLocalData
    ? getSterilizedData()
    : sterilizedData;

  console.log("step1", dataToUse);

  // step 2
  const creditTransactions: ITransaction[] = dataToUse.creditTransactions;
  console.log("step2", creditTransactions);

  // step 3
  const sortedCreditFrequency: GroupedCreditTransaction[] =
    groupCreditTransactionsByAmount(creditTransactions);
  // with this data, you can draw your frequency graph/table
  // the total number of all counts in this array must match the number of credit transactions.
  // there must be no duplicate transaction ids in all the ids of the array
  // the array must be sorted according to the highest number of re-occuring transactions

  console.log("step3", sortedCreditFrequency);

  // step 4
  // determine the algorithm to get number of frequencies to check.
  // right now, I am using an arbituary algorithm based on the "leastExpectedOccurence" constant.10/10/24
  const leastChecks = config.leastExpectedOccurence;

  console.log("step4", leastChecks);

  // step 5
  // determine the list of credit transactions that meet the pre-defined threshold.
  // all credit transactions in this array must be checked.
  const highFrequencyCreditTransactions: GroupedCreditTransaction[] =
    getHighFrequencyCreditTransactionsList(leastChecks, sortedCreditFrequency);

  console.log("step5", highFrequencyCreditTransactions);

  //step 5.5-ADDED
  //if a consistent amount was not found, attempt to generate the frequency table by using narration.
  //in the narration, you can search for all transcations that contain the keywords we pre-determined.
  const highFrequencyCreditsByNarration =
    highFrequencyCreditTransactions.length < 1
      ? getHighFrequencyCreditsByNarration(creditTransactions)
      : null;

  // step 6
  // if there are no frequencies up to this leastExpectedOccurence AND the narration frequency distribution also returns nothing,
  if (
    highFrequencyCreditTransactions.length < 1 &&
    highFrequencyCreditsByNarration &&
    highFrequencyCreditsByNarration?.length < 1
  ) {
    console.log(
      "This account is erratic. NOT A SALARY ACCOUNT. DOES NOT QUALIFY FOR SALARY ACCOUNT."
    );
    return "This account is erratic. NOT A SALARY ACCOUNT. DOES NOT QUALIFY FOR SALARY ACCOUNT.";
  }

  // console.log(highFrequencyCreditsByNarration);

  //BRANCH STEP 7
  //if there are no frequencies up to this leastExpectedOccurence, use range splitting to calculate frequency.
  //this is done because some people might be receiving salary in different amount. eg 400k 399k 400.2k 401k etc etc.
  // this is not in the first Mvp sha

  //step 7
  //FOR EACH OF THE ITEMS THAT QUALIFY FOR THE LIMIT CHECK, RUN A "TEGA ALGORITHM" on each.
  const proposedSolutions = highFrequencyCreditTransactions.map(
    (highOccurrence) => {
      //SUB-STEP 7-A1
      // get the number of transactions that have similar descriptions based on keywords
      // returns the keyword and the number of transactons that had that key word.
      const descriptionFrequencies: IDescriptionFrequency =
        getDescriptionFrequencies(highOccurrence);

      //SUB-STEP 7-A2
      //get the frequency analysis score
      const salaryDescriptionAnalysisScore: number =
        getSalaryDescriptionAnalysisScore(
          descriptionFrequencies.numberOfSelected,
          config.statementPeriod
        );

      //////////

      // SUB-STEP 7-B1
      // CHECK IF THEY OCCURED IN THE SAME PERIOD OF EVERY MONTH
      // do most of them occur arounD the same time period?
      //get the sore for this particular one.
      const dateAnalysisScore: number | null =
        getDatePeriodAnalysis(highOccurrence);

      if (!dateAnalysisScore) return "found illogical date";

      //SUB-STEP 7-C1
      //CHECK IF THEY HAVE A SIMILAR SENDER
      //use metadata from mono for this.
      const senderSimilarityAnalysisScore: number =
        getSenderSimilarityAnalysisScore(highOccurrence);

      //STEP 8
      //calculate your confidence level for this particular high frequency transactions.
      const confidence =
        config.weights.salaryDescriptionWeight *
          salaryDescriptionAnalysisScore +
        config.weights.salaryDateWeight * dateAnalysisScore +
        config.weights.senderSimilarityWeight * senderSimilarityAnalysisScore;

      ////////////
      ////////////
      // START RETURNING ITEMS THAT YOU WANT TO USE TO ANALYZE
      const transactionDates: string[] = highOccurrence.transactionDetails.map(
        (item) => formatDate(item.date)
      );

      const proposedSolutionHolder = {
        confidence: `${confidence}%`,
        salaryDescriptionAnalysisScore,
        dateAnalysisScore,
        senderSimilarityAnalysisScore,
        creditDates: transactionDates,
        salaryAmount: formatKoboPriceInNaira(highOccurrence.amount),
        //number of times this salary amount occured
        salaryFrequency: highOccurrence.count,
        statementPeriod: config.statementPeriod,
      };

      return proposedSolutionHolder;
    }
  );

  return proposedSolutions;
};
