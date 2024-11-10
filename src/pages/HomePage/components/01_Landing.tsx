import { useSearchParams } from "react-router-dom";

const Landing = () => {
  const [, setSearchParams] = useSearchParams();

  return (
    <>
      <div className="w-full h-full flex flex-col gap-4 justify-center">
        <h1 className="text-6xl">Demo Credit Check</h1>
        <p>
          Thanks for joining this demo. Ensure you use your salary account.
          Ensure you have received your salary in the account you want to use
          for this demo.
        </p>

        <button
          onClick={() =>
            setSearchParams({
              step: "2",
            })
          }
          className="border border-[#f9f8fa] flex w-fit justify-center items-center px-3 py-2 text-white cursor-pointer hover:bg-gray-900 rounded-lg"
        >
          Get Started
        </button>
      </div>
    </>
  );
};

export default Landing;
