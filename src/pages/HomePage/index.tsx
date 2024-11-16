import Landing from "./components/01_Landing";
import GetCode from "./components/02_GetCode";
import GetId from "./components/03_GetId";
import GetTransactions from "./components/04_GetTransactions";
import GetAnalysis from "./components/05_GetAnalysis";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import DataControl from "./DataControl";

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentStep = searchParams.get("step") || "1";

  useEffect(() => {
    if (+currentStep < 2 || +currentStep > 5 || !currentStep)
      setSearchParams({
        step: "1",
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="hidden md:block w-screen h-screen px-[5vw]">
        {currentStep === "1" && <Landing />}
        {currentStep === "2" && <GetCode />}
        {currentStep === "3" && <GetId />}
        {currentStep === "4" && <GetTransactions />}
        {currentStep === "5" && <GetAnalysis />}
      </div>

      <div className="md:hidden flex w-screen h-screen items-center justify-center text-center px-4">
        <h1>You can't view this on a mobile device. Switch to your PC.</h1>
      </div>

      <DataControl />
    </>
  );
};

export default HomePage;
