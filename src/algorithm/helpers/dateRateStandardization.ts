import { config } from "../constants";

// this function is used to return the
// So instead of just counting the number of clusters, why don't we actually make the final score based on the closeness factor. what i mean is I want to set the threshold for "clusters to be 7" instead of 3 that you used. However when i do this, Under this example case, 8,1 and 9,8 are given the same cluster score (of 1) because both qualify as a cluster (less than 7).
// What I'm suggesting is let us actually factor in the closeness of the differences that we calculate. 8-1 is 7 and 9-8 is 1. 9,8 will receive a higher cluster score in this case. So let's make that single change to our code.

// there are factors that I just used as 0 in this MVp. It might change or it can change.

export function dateRateStandardization(numbers: number[]): number {
  // Helper function to calculate standard deviation
  function getStandardDeviation(arr: number[]): number {
    const mean = arr.reduce((sum, num) => sum + num, 0) / arr.length;
    const variance =
      arr.reduce((sum, num) => sum + Math.pow(num - mean, 2), 0) / arr.length;
    return Math.sqrt(variance);
  }

  // Sort numbers for easier cluster detection
  numbers.sort((a, b) => a - b);

  // Calculate range and standard deviation
  const max = Math.max(...numbers);
  const min = Math.min(...numbers);
  const range = max - min;
  const stdDev = getStandardDeviation(numbers);

  // Detect clusters based on proximity of values with a threshold of 7
  let totalCloseness = 0;
  let closenessCount = 0;

  for (let i = 1; i < numbers.length; i++) {
    const diff = numbers[i] - numbers[i - 1];

    // Only consider pairs where the difference is equal to or less than the threshold
    if (diff <= config.dateSpreadLimit) {
      const closeness =
        (config.dateSpreadLimit - diff) / config.dateSpreadLimit; // Closeness factor (smaller diff = higher score)
      totalCloseness += closeness;
      closenessCount++;
    }
  }

  // Calculate the cluster score as the average closeness for valid clusters
  const clusterScore = closenessCount > 0 ? totalCloseness / closenessCount : 0;

  // Outliers: count how many differences exceed 7 (potential outliers)
  const outlierCount = numbers.length - 1 - closenessCount;
  const outlierPenalty = outlierCount / numbers.length;

  // Range score and standard deviation score
  const rangeScore = 1 - range / 15;
  const stdDevScore = 1 - stdDev / 4.69;

  // Final score with the provided weights
  let finalScore =
    1 * clusterScore +
    0.0 * rangeScore +
    0.0 * stdDevScore +
    0.0 * outlierPenalty;

  // Ensure final score is between 0 and 1, then convert to percentage
  finalScore = Math.min(1, Math.max(0, finalScore));

  return Math.round(finalScore * 100);
}

// Test cases
// console.log(calculateScore([1, 1, 1])); // Output: 100 (all numbers the same)
// console.log(calculateScore([1, 1, 16])); // Output: ~85 (clustered with a high range)
// console.log(calculateScore([1, 1, 1, 1, 1, 16])); // Output: ~90 (clustered with outlier)
// console.log(calculateScore([1, 5, 9, 12, 16, 3])); // Output: ~10-20 (dispersed and random)

// const testCases = [
//   //very good
//   [1, 1, 1, 1, 1, 16],
//   [14, 15, 16, 8, 15, 10],
//   [14, 15, 16],
//   [15, 15, 16],
//   [15, 14, 13, 16, 15, 14],

//   //tests
//   [16, 15, 1],
//   [15, 15, 15, 13, 15, 1],

//   //very bad
//   [1, 1, 8, 16],
//   [1, 16, 4, 8, 12],
//   [1, 16],
// ];

// testCases.forEach((numbers, i) =>
//   console.log(i + 1, dateRateStandardization(numbers))
// );
