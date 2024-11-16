// FUNCTION IS USED TO GENERATE TESTS BASED ON THE CONFIG.
// used to mock the randomness of dates in which salary payments were received.
// dates in the month are given a number between 1 - 16 using the pattern below...
// 15th => 1 || 16th => 1 || 14th => 2 || 17th => 2 || 18th => 3 || 19th => 4 || 3rd => 13 || 1st => 15

const config = {
  testsToGenerate: 100,
  numberOfMonths: 3,
  rangeOfDataSets: {
    upperRange: 16,
    lowerRange: 1,
  },
};

// x = config.numberOfMonths

function getRandomNumbersStats(count: number) {
  // Generate x unique random numbers between a and b
  const numbers: number[] = [];
  while (numbers.length < config.numberOfMonths) {
    const randNum =
      Math.floor(Math.random() * config.rangeOfDataSets.upperRange) +
      config.rangeOfDataSets.lowerRange;
    if (!numbers.includes(randNum)) {
      numbers.push(randNum);
    }
  }

  // Calculate the range (max - min)
  const max = Math.max(...numbers);
  const min = Math.min(...numbers);
  const range = max - min;

  // Calculate the mean
  const mean = numbers.reduce((sum, num) => sum + num, 0) / numbers.length;

  // Calculate the variance
  const variance =
    numbers.reduce((sum, num) => sum + Math.pow(num - mean, 2), 0) /
    numbers.length;

  // Calculate the standard deviation (sqrt of variance)
  const stdDeviation = Math.sqrt(variance);

  return {
    id: count,
    range: range,
    standardDeviation: stdDeviation,
    numbers: numbers, // Including this to show generated numbers for clarity
  };
}

export const standardDeviationDateRange = () => {
  const holder: {
    id: number;
    range: number;
    standardDeviation: number;
    numbers: number[];
  }[] = [];

  let i = 0;
  while (i < config.testsToGenerate) {
    const analysis = getRandomNumbersStats(i);
    holder.push(analysis);
    i++;
  }

  return holder;
};
