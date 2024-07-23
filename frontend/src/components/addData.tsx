import React, { useState } from "react";
import { Data } from "../services/type";
import { ChevronDown } from "lucide-react";

interface AddDataProps {
  onSubmit: (val: Data) => void;
}

const AddData: React.FC<AddDataProps> = ({ onSubmit }) => {
  const [isPopupVisible, setPopupVisible] = useState<boolean>(false);
  const [amount, setAmount] = useState<any>(0);
  const [note, setNote] = useState<string>("");
  const [category, setCategory] = useState<string>("salary");
  const [title, setTitle] = useState<string>("");
  const [type, setType] = useState<string>("income");
  const [date, setDate] = useState<string>("income");
  // const [currency, setCurrency] = useState<string>("");
  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const data: Data = {
      amount,
      note,
      type,
      category,
      date,
      title,
      currency: "USD",
    };
    onSubmit(data);
    setPopupVisible(false);
  };
  return (
    <div className="">
      <div
        className="text-5xl bg-[#F88997] text-white px-5 py-2.5 rounded-full"
        onClick={togglePopup}
      >
        +
      </div>

      {isPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl mb-4">Add Transaction</h2>
            <button
              className="absolute top-4 right-4 text-gray-600"
              onClick={togglePopup}
            >
              &times;
            </button>
            <div className="flex mb-4">
              <button
                className={`flex-1 py-2 font-bold ${
                  type === "income"
                    ? "bg-[#EBFFCE] text-black"
                    : "bg-white text-gray-700"
                }`}
                onClick={() => setType("income")}
              >
                Income
              </button>
              <button
                className={`flex-1 py-2 font-bold ${
                  type === "expense"
                    ? "bg-[#EBFFCE] text-black"
                    : "bg-white text-black"
                }`}
                onClick={() => setType("expense")}
              >
                Expense
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              {/* Add your form fields here */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="date"
                >
                  Date
                </label>
                <input
                  id="category"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4 ">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="category"
                >
                  Category
                </label>
                <div className="relative group">
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  >
                    {type === "income" ? (
                      <>
                        <option value="salary" className="bg-white text-black">
                          Salary
                        </option>
                        <option value="bonus" className="bg-white text-black">
                          Bonus
                        </option>
                      </>
                    ) : (
                      <>
                        <option
                          value="education"
                          className="bg-white text-black"
                        >
                          Education
                        </option>
                        <option value="gifts" className="bg-white text-black">
                          Gifts
                        </option>
                        <option value="food" className="bg-white text-black">
                          Food
                        </option>
                        <option
                          value="transport"
                          className="bg-white text-black"
                        >
                          Transport
                        </option>
                        <option value="bills" className="bg-white text-black">
                          Bills
                        </option>
                      </>
                    )}
                  </select>
                  <div className="absolute top-2 right-2 group-focus:rotate-180">
                    <ChevronDown className="w-8" />
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="amount"
                >
                  Amount
                </label>
                <input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="notes"
                >
                  Notes
                </label>
                <textarea
                  id="notes"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={togglePopup}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#C72E2E] opacity-90 hover:opacity-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddData;
