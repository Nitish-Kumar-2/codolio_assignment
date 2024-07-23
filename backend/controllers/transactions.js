// controllers/transactionController.js
const Transaction = require('../models/transaction');

exports.addTransaction = async (req, res) => {
  try {
    const {date, amount, type, category, title, currency="USD", note ="" } = req.body;
    if(!date || !amount ||!type ||!category || !title)
    {
      return res.status(400).json({
        success: false,
        message:
          "Please Fill the details",
      })
    }
    const newTransaction = new Transaction({
      date,
      amount,
      type,
      category,
      title,
      currency,
      note
    });

    await newTransaction.save();

    return res.status(200).json({
      success: true,
      message:
        "Data added successfully",
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:error
    })
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    
    const { amount, type, category, title, currency, note } = req.body;
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      { amount, type, category, title, currency, note },
      { new: true, runValidators: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({
        success: FontFaceSetLoadEvent,
        message:
          "Error While Updating try Again!",
      })
    }

    return res.status(200).json({
      success: true,
      data:updatedTransaction,
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      data:error.message,
    })
  }
};
exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTransaction = await Transaction.findByIdAndDelete(id);

    if (!deletedTransaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    return res.status(200).json({
      success: true,
      message:"Transaction Deleted Succusfully.",
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:"Transaction is not Deleted Error!",
    })
  }
};

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();

    return res.status(200).json({
      success: true,
      data:transactions,
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:error.message,
    })
  }
};

exports.getTotals = async (req, res) => {
  try {
    const [totals] = await Transaction.aggregate([
      {
        $group: {
          _id: null,
          totalIncome: {
            $sum: {
              $cond: [{ $eq: ['$type', 'income'] }, '$amount', 0]
            }
          },
          totalExpense: {
            $sum: {
              $cond: [{ $eq: ['$type', 'expense'] }, '$amount', 0]
            }
          }
        }
      }
    ]);

    return res.status(200).json({
      success: true,
      data:totals,
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:error.message,
    })
  }
};


exports.getIncomeAndExpensesPerDay = async (req, res) => {
  try {
    const results = await Transaction.aggregate([
      {
        $project: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          amount: 1,
          type: 1,
          category: 1,
          title:1,
          _id:1
        }
      },
      {
        $group: {
          _id: {
            date: "$date",
            type: "$type",
            category: "$category",
            title:"$title",
            id:"$_id"
          },
          totalAmount: { $sum: "$amount" }
        }
      },
      {
        $group: {
          _id: "$_id.date",
          details: {
            $push: {
              type: "$_id.type",
              category: "$_id.category",
              totalAmount: "$totalAmount",
              title: "$_id.title",
              id: "$_id.id"
            }
          }
        }
      },
      {
        $sort: { _id: -1 } // Optional: sort by date
      }
    ]);

    return res.status(200).json({
      success: true,
      data:results,
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:error.message,
    })
  }
};