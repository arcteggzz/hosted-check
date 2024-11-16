import { ITransaction } from "../types";
import { formatKoboPriceInNaira } from "../utils/helpers";

interface TableProps {
  gridClass: string;
  header: string[];
  data: ITransaction[];
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

const TransactionsTable = ({ gridClass, header, data }: TableProps) => {
  return (
    <>
      <div className="w-full h-full border border-gray-600 rounded-lg bg-transparent">
        <div
          className={`w-full h-12 border-b border-gray-600 rounded-tl-lg rounded-tr-lg bg-transparent grid ${gridClass}`}
        >
          {header.map((header) => (
            <HeaderText headerText={header} key={header} />
          ))}
        </div>

        <div className="w-full h-[calc(100%-48px)] overflow-y-auto">
          {data?.map((transaction: ITransaction, index) => (
            <div
              key={index}
              className={`w-full h-8 border-b border-gray-600 grid ${gridClass}`}
            >
              <Rowtext text={`${index + 1}`} />
              <Rowtext text={transaction.date} />
              <Rowtext text={transaction.narration} />
              <Rowtext
                text={
                  transaction.amount
                    ? formatKoboPriceInNaira(transaction.amount)
                    : ""
                }
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TransactionsTable;
