/* eslint-disable @typescript-eslint/no-explicit-any */

import { useSearchParams } from "react-router-dom";
import {
  readFromLocalStorage,
  // saveToLocalStorage,
} from "../../../utils/helpers";
import {
  MONO_FETCHED_TRANSACTIONS,
  ANALYZED_TRANSACTIONS,
} from "../../../constants";
import { creditAlgorithm } from "../../../algorithm";
import { IAccountDetails } from "../../../algorithm/types";
import { IAccount } from "../../../algorithm/types";
import { useState } from "react";
import AnalysisTable from "../../../components/AnalysisTable";
import { saveToLocalStorage } from "../../../utils/helpers";

const GetAnalysis = () => {
  const [searchParam, setSearchParams] = useSearchParams();
  const step = searchParam.get("step");

  const existingTransactions = readFromLocalStorage(MONO_FETCHED_TRANSACTIONS);
  const existingAnalysis = readFromLocalStorage(ANALYZED_TRANSACTIONS);

  const [results, setResults] = useState<null | any>(
    existingAnalysis ? existingAnalysis : null
  );

  if (!existingTransactions) {
    return (
      <div className="w-full flex gap-12 h-full">
        <div className="w-[40%] h-full flex flex-col gap-4 justify-center">
          <h5 className="text-lg font-medium">{step && ` Step ${step}`}</h5>
          <h1 className="text-2xl">View Analysis</h1>
          <p className="text-xs">
            We cannot analyse your transactions. You have not gotten your
            transactions yet
          </p>

          <button
            onClick={() => setSearchParams({ step: "4" })}
            className="border border-[#f9f8fa] flex w-fit justify-center items-center mt-8 px-3 py-2 text-white cursor-pointer hover:bg-gray-900 rounded-lg"
          >
            Get Transactions
          </button>
        </div>
      </div>
    );
  }

  const accountDetails: IAccountDetails = {
    accountType: IAccount.A,
    debitTransactions: [],
    totalDebitCount: 0,
    owner: {
      firstName: "string",
      lastName: "string",
      middleName: "string",
      age: 20,
    },
    totalCreditCount: existingTransactions?.length,
    creditTransactions: existingTransactions,
  };

  const getAnalysis = () => {
    const result = creditAlgorithm(accountDetails as IAccountDetails, false);

    console.log(result);
    setResults(result);
    saveToLocalStorage(ANALYZED_TRANSACTIONS, result);
  };

  return (
    <>
      <div className="w-full flex gap-8 h-full">
        <div className="w-[15%] h-full flex flex-col gap-4 justify-center">
          <h5 className="text-lg font-medium">{step && ` Step ${step}`}</h5>
          <h1 className="text-2xl">View Analysis</h1>
          <p className="text-xs">Your Salary Analysis</p>

          <button
            onClick={() => getAnalysis()}
            className="border border-[#f9f8fa] flex w-fit justify-center items-center mt-8 px-3 py-2 text-white cursor-pointer hover:bg-gray-900 rounded-lg"
          >
            Get Analysis
          </button>
          <button
            onClick={() => setSearchParams({ step: "4" })}
            className="border border-[#f9f8fa] flex w-fit justify-center items-center mt-8 px-3 py-2 text-white cursor-pointer hover:bg-gray-900 rounded-lg"
          >
            View transactions
          </button>
        </div>

        <div className="w-[85%] h-full py-10">
          {results === null ? (
            <></>
          ) : typeof results === "string" ? (
            <div className="h-full w-full flex justify-center items-center">
              <p>{results}</p>
            </div>
          ) : (
            <AnalysisTable
              gridClass="grid-cols-analysisTable"
              header={[
                "S/N",
                "Confidence",
                "Salary Amount",
                "Salary Description Score",
                "Date Analysis Score",
                "Credit Dates",
                "Sender Similarity Score",
              ]}
              data={results}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default GetAnalysis;
