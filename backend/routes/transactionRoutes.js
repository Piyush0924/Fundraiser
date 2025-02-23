const express = require('express');
const {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction
} = require('../controllers/transactionController');

const router = express.Router();

router.get('/', getAllTransactions); // Fetch all transactions
router.get('/:id', getTransactionById); // Fetch a single transaction
router.post('/', createTransaction); // Create a new transaction
router.put('/:id', updateTransaction); // Update a transaction
router.delete('/:id', deleteTransaction); // Delete a transaction

module.exports = router;
