import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { readFromLocalStorage } from "../../../utils/helpers";
import { MONO_ACCOUNT_ID_KEY } from "../../../constants";

const GetTransactions = () => {
  const [searchParam, setSearchParams] = useSearchParams();
  const step = searchParam.get("step");

  const existingId = readFromLocalStorage(MONO_ACCOUNT_ID_KEY);

  const [hasExistingId] = useState(existingId ? true : false);

  return (
    <>
      <div className="w-full h-full flex flex-col gap-4 justify-center">
        <h5 className="text-lg font-medium">{step && ` Step ${step}`}</h5>

        {!hasExistingId && (
          <>
            <h1 className="text-6xl">View Credit Transactions</h1>
            <p>You do not have a valid account Id.</p>
            <button
              onClick={() => setSearchParams({ step: "3" })}
              className="border border-[#f9f8fa] flex w-fit justify-center items-center px-3 py-2 text-white cursor-pointer hover:bg-gray-900 rounded-lg"
            >
              Get Valid Id
            </button>
          </>
        )}

        {hasExistingId && (
          <>
            <h1 className="text-6xl">View Credit Transactions</h1>
            <p>
              Click the button to fetch your transactions. Note that this
              usually takes up to 1 minute or more depending on the number of
              credit transactions in your account.
            </p>
            <button
              onClick={() => {}}
              className="border border-[#f9f8fa] flex w-fit justify-center items-center px-3 py-2 text-white cursor-pointer hover:bg-gray-900 rounded-lg"
            >
              Get transactions
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default GetTransactions;
