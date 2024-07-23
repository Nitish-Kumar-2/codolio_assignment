// routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactions');

router.post('/add', transactionController.addTransaction);
router.put('/update/:id', transactionController.updateTransaction);
router.delete('/delete/:id', transactionController.deleteTransaction);
router.get('/all', transactionController.getAllTransactions);
router.get('/totals', transactionController.getTotals);
router.get('/income-expenses-per-day', transactionController.getIncomeAndExpensesPerDay);
module.exports = router;
