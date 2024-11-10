/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import MonoConnect from "@mono.co/connect.js";
import { useMemo, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  saveToLocalStorage,
  readFromLocalStorage,
} from "../../../utils/helpers";
import { MONO_CODE_KEY } from "../../../constants";

const GetCode = () => {
  const [searchParam, setSearchParams] = useSearchParams();
  const step = searchParam.get("step");

  const existingCode = readFromLocalStorage(MONO_CODE_KEY);

  const [hasExistingCode, setHasExistingCode] = useState(
    existingCode ? true : false
  );

  const MONO_PUBLIC_KEY = import.meta.env.VITE_MONO_PUBLIC_KEY;

  const monoConnect = useMemo(() => {
    const monoInstance = new MonoConnect({
      onClose: () => {},
      // onLoad: () => console.log("Widget loaded successfully"),
      onSuccess: ({ code }: any) => {
        saveToLocalStorage(MONO_CODE_KEY, code);
        setSearchParams({
          step: "3",
        });
      },
      oncancel: () => console.log("cancelled"),
      onabort: () => console.log("aborted"),
      key: MONO_PUBLIC_KEY,
    });

    monoInstance.setup();

    return monoInstance;
  }, []);

  useEffect(() => {
    if (existingCode) setHasExistingCode(true);

    if (!existingCode) monoConnect.open();
  }, []);

  return (
    <>
      <div className="w-full h-full flex flex-col gap-4 justify-center">
        <h5 className="text-lg font-medium">{step && ` Step ${step}`}</h5>

        {!hasExistingCode && (
          <>
            <h1 className="text-6xl">Account Linking Cancelled</h1>
            <p>Do you want to retry linking your account?</p>
            <button
              onClick={() => monoConnect.open()}
              className="border border-[#f9f8fa] flex w-fit justify-center items-center px-3 py-2 text-white cursor-pointer hover:bg-gray-900 rounded-lg"
            >
              Retry Linking
            </button>
          </>
        )}

        {hasExistingCode && (
          <>
            <h1 className="text-6xl">Your Bank Account is already linked</h1>
            <div className="w-full flex gap-4 items-center">
              <p>Do you want to continue with this bank account?</p>
              <button
                onClick={() =>
                  setSearchParams({
                    step: "3",
                  })
                }
                className="flex w-fit justify-center items-center text-white cursor-pointer hover:underline"
              >
                Continue
              </button>
            </div>

            <div className="w-full flex gap-4 items-center">
              <p>Do you want to link another Bank Account?</p>
              <button
                onClick={() => monoConnect.open()}
                className="flex w-fit justify-center items-center text-white cursor-pointer hover:underline"
              >
                Link New Account
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default GetCode;
