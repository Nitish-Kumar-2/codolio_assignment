import React from "react";
import { IncomePerDay } from "../services/type";
import { FormatDate } from "../utils/formatData";
import { GetCategoryColor } from "../utils/colors";
import { Trash2 } from "lucide-react";
interface TransactionsProps {
  data: IncomePerDay[];
  onDelete:(val:string)=> void;
}

const Transactions: React.FC<TransactionsProps> = ({ data,onDelete }) => {
  const format = (date: string) => {
    const res: { day: string; date: string } = FormatDate(date);
    return res;
  };
  const bgColor = (category:string)=>{ return GetCategoryColor(category);}
  return (
    <div className="">
      {data.map((item: IncomePerDay, index) => {
        return (
          <div key={index} className="grid gap-4 bg-white p-4 my-4 rounded-lg">
            <div className="font-semibold text-2xl flex gap-2 ">
              <span className="">{`${format(item._id).date}`}</span>
              <span className="text-lg px-2 py-0.5 rounded-lg bg-gray-200">{`${format(item._id).day}`}</span>
            </div>
            <div>
              {item.details.map((detail: any, index) => {
                return (
                  <div key={index} className="flex my-2  justify-between text-lg font-bold">
                    <div className="grid grid-cols-3 gap-10">
                      <div className="rounded-lg text-center w-24" style={{ backgroundColor: bgColor(detail.category)}}>{detail.category}</div>
                      <div className="col-span-2">{detail.title}</div>
                    </div>
                    <div className="flex gap-4">

                    <div className="">${detail.totalAmount}</div>
                    <Trash2 onClick={()=>onDelete(detail.id)} className="text-red-500 cursor-pointer" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Transactions;