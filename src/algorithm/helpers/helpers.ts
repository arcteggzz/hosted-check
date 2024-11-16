export const formatDate = (dateString: string) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [year, month, day] = dateString.split("-");
  const monthName = months[parseInt(month, 10) - 1]; // Convert month to zero-based index

  return `${monthName} ${parseInt(day, 10)}, ${year}`;
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
