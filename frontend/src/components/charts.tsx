import React from "react";
import { IncomePerDay, Total } from "../services/type";
import PieChart from "./pieChart";

interface Totals {
  total: Total;
  data: IncomePerDay[];
}

const Charts: React.FC<Totals> = ({ total,data }) => {

const incomeCategories = data.reduce(
  (acc: { labels: string[]; values: number[] }, item) => {
    if (item.details[0].type === "income") {
      const existingCategoryIndex = acc.labels.indexOf(item.details[0].category);
      if (existingCategoryIndex >= 0) {
        acc.values[existingCategoryIndex] += item.details[0].totalAmount;
      } else {
        acc.labels.push(item.details[0].category);
        acc.values.push(item.details[0].totalAmount);
      }
    }
    return acc;
  },
  { labels: [], values: [] }
);

const expenseCategories = data.reduce(
  (acc: { labels: string[]; values: number[] }, item) => {
    if (item.details[0].type === 'expense') {
      item.details.forEach(detail => {
        const existingCategoryIndex = acc.labels.indexOf(detail.category);
        if (existingCategoryIndex >= 0) {
          acc.values[existingCategoryIndex] += detail.totalAmount;
        } else {
          acc.labels.push(detail.category);
          acc.values.push(detail.totalAmount);
        }
      });
    }
    return acc;
  },
  { labels: [], values: [] }
);
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      <div>
     

      <PieChart
          data={{ labels: incomeCategories?.labels || [], values: incomeCategories?.values || [] }}
          />
       
        
        <div className="flex justify-between bg-[#EBFFCE] text-[#20861C] text-3xl font-bold p-2 rounded-md">
          <div>INCOME: </div>
          <div>${total.totalIncome}</div>
        </div>
      </div>
      <div className="">
      <PieChart
          data={{ labels: expenseCategories?.labels || [], values: expenseCategories?.values || [] }}

        />
        <div className="flex justify-between bg-[#FDE5E3] text-[#BC4945] text-3xl font-bold p-2 rounded-md">
          <div>EXPENSE: </div>
          <div>${total.totalExpense}</div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
