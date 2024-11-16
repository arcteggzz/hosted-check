/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        transactionsTable: "10% 20% 50% 20%",
        analysisTable: "5% 15% 15% 15% 15% 20% 15%",
      },
    },
  },
  plugins: [],
};
