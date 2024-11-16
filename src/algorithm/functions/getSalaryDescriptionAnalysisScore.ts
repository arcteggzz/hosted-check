export const getSalaryDescriptionAnalysisScore = (
  selected: number,
  period: number
) => {
  return (selected / period) * 100;
};
