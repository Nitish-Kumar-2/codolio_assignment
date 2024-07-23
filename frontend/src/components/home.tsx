import React, { useEffect, useState } from "react";
import Charts from "./charts";
import { useAppDispatch } from "../redux/hooks";
import Transactions from "./transactions";
import { Data } from "../services/type";
import { fetchData } from "../redux/slice/getAllTransaction";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addData } from "../redux/slice/addTransaction";
import { getExpenditureData } from "../redux/slice/getIncome";
import { getTotals } from "../redux/slice/getTotal";
import AddData from "./addData";
import { deleteData } from "../redux/slice/deleteTransaction";

const Home = () => {
  const dispatch = useAppDispatch();
 
  const [refresh, setRefresh] = useState<boolean>(false);
  // const { data } = useSelector((state: RootState) => state.data);
  const income = useSelector((state: RootState) => state.income);
  const total = useSelector((state: RootState) => state.total);

  useEffect(() => {
    dispatch(fetchData());
    dispatch(getExpenditureData());
    dispatch(getTotals());
  }, [refresh,dispatch]);

  const handleSubmit =(data:Data) => {
    dispatch(addData(data))
    setRefresh(!refresh)
  }
  const handleDelete =(id:string) => {
    
    dispatch(deleteData(id))
    setRefresh(!refresh)
  }
  return (
    <div className="max-w-5xl mx-auto">
      <Charts
        data={income.data ? income.data : []}
        total={
          total.data
            ? total.data
            : { _id: null, totalExpense: 0, totalIncome: 0 }
        }
      />
      <Transactions onDelete={(val)=>handleDelete(val)} data={income.data ? income.data : []} />
      <div className="fixed right-24 bottom-24">
        <AddData onSubmit={(val)=>handleSubmit(val)} />
      </div>
    </div>
  );
};

export default Home;