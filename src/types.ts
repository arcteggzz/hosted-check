export type MonoTransactionReturnType = {
  id: string;
  narration: string;
  amount: number;
  type: "credit" | "debit";
  category: null | string;
  currency: string;
  balance: number;
  date: string;
};

export type FormatedTransactionType = {
  id: string | number;
  date: string;
  amount: number;
  narration: string; //drescription
};

export type ITransaction = {
  id: string | number;
  date: string;
  type: "credit" | "debit";
  amount: number;
  narration: string; //drescription
  to?: string;
  from?: string;
};
