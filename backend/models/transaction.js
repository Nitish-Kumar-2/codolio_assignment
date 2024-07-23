// models/transaction.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['income', 'expense']
  },
  category: {
    type: String,
    required: true,
    enum:['salary','bonus','gifts','food','transport','bills','education']
  },
  title: {
    type: String,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  note: {
    type: String
  }
},{timestamps:true});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
