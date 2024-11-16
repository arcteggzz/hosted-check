import { GroupedCreditTransaction } from "../types";
import { dateRateStandardization } from "../helpers/dateRateStandardization";

function mapNumber(n: number): number | null {
  if (n < 1 || n > 31) {
    return null;
  }

  const pattern = [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 16]; // Pattern for mapping 1 to 16

  if (n === 31) return 16; // Special case for 31
  if (n <= 16) return pattern[n - 1]; // Map 1-16 using the pattern
  return pattern[31 - n]; // Map 17-30
}

export const getDatePeriodAnalysis = (
  groupedCreditTransaction: GroupedCreditTransaction
): number | null => {
  const transformedDates: number[] = [];

  groupedCreditTransaction.transactionDetails.map((detail) => {
    const dayInMonth = detail.date.slice(-2);
    const mappedDate = mapNumber(+dayInMonth);
    if (!mappedDate) {
      console.log("encountered null date");
      return null;
    } else {
      transformedDates.push(mappedDate);
    }
  });

  const result = dateRateStandardization(transformedDates);

  return result;
};
