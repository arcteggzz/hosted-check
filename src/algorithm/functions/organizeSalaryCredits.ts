export const organizeSalaryCredits = () => {
  return [
    {
      name: "the most common",
      totalTransactions: 12,
      breakdown: [
        {
          keyword: "salary",
          count: 8,
          transationIds: ["12", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
        },
        {
          keyword: "net payment",
          count: 2,
          transationIds: ["12", "1"],
        },
      ],
    },
  ];
};
