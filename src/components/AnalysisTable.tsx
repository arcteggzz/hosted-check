/* eslint-disable @typescript-eslint/no-explicit-any */

interface TableProps {
  gridClass: string;
  header: string[];
  data: any[];
}

const HeaderText = ({ headerText }: { headerText: string }) => {
  return (
    <div className="w-full h-full flex items-center pl-3">
      <p className="uppercase text-xs">{headerText}</p>
    </div>
  );
};

const Rowtext = ({ text }: { text: string }) => {
  return (
    <div className="w-full h-full flex items-center pl-3">
      <p className="text-xs font-semibold">{text}</p>
    </div>
  );
};

const AnalysisTable = ({ gridClass, header, data }: TableProps) => {
  console.log(data);

  return (
    <>
      <div className="w-full h-full border border-gray-600 rounded-lg bg-transparent">
        <div
          className={`w-full h-fit min-h-12 border-b border-gray-600 rounded-tl-lg rounded-tr-lg bg-transparent grid ${gridClass}`}
        >
          {header.map((header) => (
            <HeaderText headerText={header} key={header} />
          ))}
        </div>

        <div className="w-full h-[calc(100%-48px)] overflow-y-auto">
          {data?.map((hypothesis: any, index) => (
            <div
              key={index}
              className={`w-full h-fit border-b border-t py-2 border-gray-600 grid ${gridClass}`}
            >
              <Rowtext text={`${index + 1}`} />
              <Rowtext text={hypothesis.confidence} />
              <Rowtext text={hypothesis.salaryAmount} />
              <Rowtext text={hypothesis.salaryDescriptionAnalysisScore} />
              <Rowtext text={hypothesis.dateAnalysisScore} />
              <div className="w-full h-fit flex flex-col gap-2">
                {hypothesis.creditDates.map((date: string) => (
                  <p className="text-xs" key={date}>
                    {date}
                  </p>
                ))}
              </div>
              <Rowtext text={hypothesis.senderSimilarityAnalysisScore} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AnalysisTable;
