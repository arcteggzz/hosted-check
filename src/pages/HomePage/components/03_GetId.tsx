/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MONO_ACCOUNT_ID_KEY, MONO_CODE_KEY } from "../../../constants";
import {
  saveToLocalStorage,
  readFromLocalStorage,
} from "../../../utils/helpers";

const GetId = () => {
  const MONO_SECRET_KEY = import.meta.env.VITE_MONO_SECRET_KEY;

  const [searchParam, setSearchParams] = useSearchParams();
  const step = searchParam.get("step");

  const existingCode = readFromLocalStorage(MONO_CODE_KEY);

  const [hasExistingCode, setHasExistingCode] = useState(
    existingCode ? true : false
  );

  const [loading, setLoading] = useState(false);
  const [isSucces, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const getAccountId = async () => {
    setLoading(true);
    setIsSuccess(false);
    setIsError(false);

    try {
      const response = await fetch(
        "https://api.withmono.com/v2/accounts/auth",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "mono-sec-key": MONO_SECRET_KEY,
          },
          body: JSON.stringify({ code: existingCode }),
        }
      );

      if (!response.ok) {
        setLoading(false);
        setIsSuccess(false);
        setIsError(true);
        throw new Error("Failed to fetch");
      }

      const data = await response.json();
      saveToLocalStorage(MONO_ACCOUNT_ID_KEY, data?.data?.id);
      setLoading(false);
      setIsSuccess(true);
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      setIsSuccess(false);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (existingCode) {
      setHasExistingCode(true);
      getAccountId();
    }

    if (!existingCode) setHasExistingCode(false);
  }, []);

  return (
    <>
      <div className="w-full h-full flex flex-col gap-4 justify-center">
        <h5 className="text-lg font-medium">{step && ` Step ${step}`}</h5>
        <h1 className="text-6xl">Get Account Id</h1>

        {!hasExistingCode && (
          <>
            <p>You have not linked your account yet.</p>
            <button
              onClick={() =>
                setSearchParams({
                  step: "2",
                })
              }
              className="border border-[#f9f8fa] flex w-fit justify-center items-center px-3 py-2 text-white cursor-pointer hover:bg-gray-900 rounded-lg"
            >
              Link Account
            </button>
          </>
        )}

        {hasExistingCode && (
          <>
            <p
              className={`${loading && `animate-pulse text-white`} ${
                isError && `text-red-600`
              } ${isSucces && `text-white`}`}
            >
              {loading
                ? "Fetching account Id..."
                : isSucces
                ? "Account Id generated successfully."
                : isError
                ? "Error generating Id"
                : "Idle "}
            </p>
            {isSucces && (
              <button
                onClick={() => setSearchParams({ step: "4" })}
                className="border border-[#f9f8fa] flex w-fit justify-center items-center px-3 py-2 text-white cursor-pointer hover:bg-gray-900 rounded-lg"
              >
                Continue
              </button>
            )}
            {isError && (
              <button
                onClick={() => getAccountId()}
                className="border border-[#f9f8fa] flex w-fit justify-center items-center px-3 py-2 text-white cursor-pointer hover:bg-gray-900 rounded-lg"
              >
                Retry
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default GetId;
