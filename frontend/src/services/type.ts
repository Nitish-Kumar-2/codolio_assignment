export type Data = {
    id?:string;
    amount: number;
    type: string;
    note: string;
    category: string;
    title: string;
    currency: string;
    date:string;
  };
export type Transaction ={
    date:string;
    amount:number;
    category:string;
    createdAt:string;
    currency: string;
    note:string;
    title:string;
    type:string;
    updatedAt:string;
    __v:number;
    _id:string;
}
export type Detail = {
  "type":string;
  "category":string;
  "totalAmount":number;
  "title":string;
  "id":string;
}
export type IncomePerDay={
  "_id":string;
  "details": Detail[]

}

export type Total = {
  "_id":string | null;
  "totalIncome":number;
  "totalExpense":number;
}