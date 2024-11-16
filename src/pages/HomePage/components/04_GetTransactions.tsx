/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  readFromLocalStorage,
  saveToLocalStorage,
} from "../../../utils/helpers";
import {
  MONO_ACCOUNT_ID_KEY,
  MONO_FETCHED_TRANSACTIONS,
} from "../../../constants";
import { getTodaysDate, getSixMonthsAgoDate } from "../../../utils/helpers";
import TransactionsTable from "../../../components/TransactionsTable";
import { ITransaction } from "../../../types";

const GetTransactions = () => {
  const [searchParam, setSearchParams] = useSearchParams();
  const step = searchParam.get("step");
  const MONO_SECRET_KEY = import.meta.env.VITE_MONO_SECRET_KEY;

  const existingId = readFromLocalStorage(MONO_ACCOUNT_ID_KEY);
  const existingTransactions = readFromLocalStorage(MONO_FETCHED_TRANSACTIONS);

  const [hasExistingId] = useState(existingId ? true : false);

  const [loading, setLoading] = useState(false);
  const [isSucces, setIsSuccess] = useState(false);
  const [isStillFetching, setIsStillFetching] = useState(false);
  const [isError, setIsError] = useState(false);

  const defaultStartDate = getSixMonthsAgoDate();
  const defaultEndDate = getTodaysDate();

  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);

  const [transactions, setTransactions] = useState<ITransaction[]>(
    existingTransactions ? (existingTransactions as ITransaction[]) : []
  );

  const getTransacstions = async () => {
    setLoading(true);
    setIsSuccess(false);
    setIsError(false);

    try {
      const response = await fetch(
        `https://api.withmono.com/v2/accounts/${existingId}/transactions?paginate=false&type=credit&start=${startDate}&end=${endDate}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "mono-sec-key": MONO_SECRET_KEY,
          },
        }
      );

      if (!response.ok) {
        setLoading(false);
        setIsSuccess(false);
        setIsStillFetching(false);
        setIsError(true);
        throw new Error("Failed to fetch");
      }

      const data = await response.json();
      console.log(data);

      if (data?.data === "still fetching") {
        setIsStillFetching(true);
        setLoading(false);
        setIsSuccess(false);
        setIsError(false);

        return;
      }

      const credits: ITransaction[] = data?.data.map((transaction: any) => {
        return {
          id: transaction.id,
          date: transaction.date.split("T")[0],
          type: "credit",
          amount: transaction.amount,
          narration: transaction.narration,
        };
      });

      setTransactions(credits);
      saveToLocalStorage(MONO_FETCHED_TRANSACTIONS, credits);

      setLoading(false);
      setIsSuccess(true);
      setIsError(false);
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      setIsStillFetching(false);
      setIsSuccess(false);
      setIsError(true);
    } finally {
      setLoading(false);
      setIsStillFetching(false);
    }
  };

  const idle = existingTransactions
    ? false
    : !isStillFetching && !isSucces && !isError && !loading;

  const emptyTransactions = isSucces && transactions.length < 1;

  return (
    <>
      {!hasExistingId && (
        <>
          <div className="w-full h-full flex flex-col gap-4 justify-center">
            <h1 className="text-6xl">View Credit Transactions</h1>
            <p>
              You do not have a valid account Id. You have to complete step 3
              before you can continue. Click the button below to go to step 3.
            </p>
            <button
              onClick={() => setSearchParams({ step: "3" })}
              className="border border-[#f9f8fa] flex w-fit justify-center items-center px-3 py-2 text-white cursor-pointer hover:bg-gray-900 rounded-lg"
            >
              Get Valid Id
            </button>
          </div>
        </>
      )}

      {hasExistingId && (
        <>
          <div className="w-full flex gap-12 h-full">
            <div className="w-[40%] h-full flex flex-col gap-4 justify-center">
              <h5 className="text-lg font-medium">{step && ` Step ${step}`}</h5>
              <h1 className="text-2xl">View Credit Transactions</h1>
              <p className="text-xs">
                Click the button to fetch your transactions. Note that this
                usually takes up to 1 minute or more depending on the number of
                credit transactions in your account.
              </p>
              <p className="text-xs">
                You can input your date range for your transactons. NOTE THAT
                IT'S IMPORTANT TO PUT A 6-MONTH RANGE.
              </p>
              <p className="text-xs font-semibold underline">
                There is already a default end date(today's date) and default
                start date (6 months ago) selected for you.
              </p>

              <div className="flex flex-col gap-4 mt-8">
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="text-sm text-white">
                    Start Date (DD-MM-YYYY)
                  </label>
                  <input
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    type="text"
                    className="w-60 text-white bg-transparent px-2 border-white border rounded-md py-2 text-sm"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="text-sm text-white">
                    End Date (DD-MM-YYYY)
                  </label>
                  <input
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    type="text"
                    className="w-60 text-white bg-transparent px-2 border-white border rounded-md py-2 text-sm"
                  />
                </div>
              </div>

              <div className="w-full flex items-center justify-start gap-6">
                <button
                  onClick={() => getTransacstions()}
                  className="border border-[#f9f8fa] flex w-fit justify-center items-center mt-8 px-3 py-2 text-white cursor-pointer hover:bg-gray-900 rounded-lg"
                >
                  Get transactions
                </button>
                {transactions.length > 0 && (
                  <button
                    onClick={() => setSearchParams({ step: "5" })}
                    className="border border-[#f9f8fa] flex w-fit justify-center items-center mt-8 px-3 py-2 text-white cursor-pointer hover:bg-gray-900 rounded-lg"
                  >
                    Initiate Analysis
                  </button>
                )}
              </div>
              {transactions.length > 0 && (
                <button
                  onClick={() => {
                    localStorage.removeItem(MONO_FETCHED_TRANSACTIONS);
                    setTransactions([]);
                  }}
                  className="border border-[#f9f8fa] flex w-fit justify-center items-center mt-8 px-3 py-2 text-white cursor-pointer hover:bg-gray-900 rounded-lg"
                >
                  Reset Transactions
                </button>
              )}
            </div>

            <div className="w-[60%] h-full py-10">
              {idle ? (
                <div className="h-full w-full flex justify-center items-center">
                  Click the button to get transactions
                </div>
              ) : loading ? (
                <div className="h-full w-full flex justify-center items-center">
                  Fetching Transactions...
                </div>
              ) : isStillFetching ? (
                <div className="h-full w-full flex justify-center items-center">
                  Our Service is still compiling your transactions...
                </div>
              ) : emptyTransactions ? (
                <div className="h-full w-full flex justify-center items-center">
                  We couldn't find any transactions for this bank account
                </div>
              ) : (
                <div className="h-full w-full">
                  <TransactionsTable
                    gridClass="grid-cols-transactionsTable"
                    header={["S/N", "Date", "Narration", "Amount"]}
                    data={transactions}
                  />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default GetTransactions;
