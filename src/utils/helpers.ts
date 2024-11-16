/* eslint-disable @typescript-eslint/no-explicit-any */

export const readFromLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);
  const parsedData = data ? JSON.parse(data) : null;
  return parsedData;
};

export const saveToLocalStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getTodaysDate = (): string => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = today.getFullYear();
  return `${day}-${month}-${year}`;
};

export const getSixMonthsAgoDate = (): string => {
  const today = new Date();
  today.setMonth(today.getMonth() - 6);

  // Adjust the date if subtracting 6 months sets it to an invalid date
  if (today.getMonth() < 0) {
    today.setFullYear(today.getFullYear() - 1);
    today.setMonth(today.getMonth() + 12);
  }

  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = today.getFullYear();
  return `${day}-${month}-${year}`;
};

export const formatKoboPriceInNaira = (
  rawAmount: string | number,
  minimumFractionDigits = 0,
  maximumFractionDigits = 0
): string => {
  const amount = +rawAmount / 100;
  if (amount === undefined) return "";

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: minimumFractionDigits,
    maximumFractionDigits: maximumFractionDigits,
  }).format(amount);
};
