export const periodConfig = [
  {
    period: 12, //12 months
    leastExpectedOccurrence: 8, //8 occurrences
  },
  {
    period: 8, //8 months
    leastExpectedOccurrence: 6, //6 occurrences
  },
  {
    period: 6, //6 months
    leastExpectedOccurrence: 4, //4 occurrences
  },
  {
    period: 3, //3 months
    leastExpectedOccurrence: 3, //3 occurrences
  },
];

const salaryKeywords = [
  "salary",
  "payment",
  "net payment",
  "wages",
  "monthly income",
  "earnings",
  "allowance",
  "stipend",
  "compensation",
  "remuneration",
  "take-home",
  "net salary",
  "gross salary",
  "basic salary",
  "paycheck",
  "bank credit",
  "monthly credit",
  "pension",
  "commission",
  "bonus",
  "overdraft refund",
  "gratification",
  "service allowance",
  "hazard allowance",
  "transport allowance",
  "housing allowance",
  "medical allowance",
  "13th month salary",
  "arrears",
  "reimbursement",
  "salary advance",
  "loan repayment",
  "contract payment",
  "consultancy fees",
  "incentive",
  "overtime pay",
  "union dues deduction",
  "payroll credit",
  "net credit",
  "employment benefit",
  "gratuity",
  "settlement",
  "deferred payment",
  "professional fees",
  "subsistence allowance",
  "utility allowance",
  "final settlement",
  "bursary",
  "scholarship stipend",
  "ex-gratia",
  "sal",
];

const salaryWeightCalculation = {
  salaryDescriptionWeight: 0.45, //45%
  salaryDateWeight: 0.4, //40%
  senderSimilarityWeight: 0.1, //10%
  errorOfUncertainty: 0.05, //5%
};

export const config = {
  statementPeriod: 6,
  leastExpectedOccurence: 4,
  dateSpreadLimit: 7,
  keyWords: salaryKeywords,
  weights: salaryWeightCalculation,
};
