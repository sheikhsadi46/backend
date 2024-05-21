import express from 'express';
import { getTransactions, createTransaction, getTransactionById, updateTransaction, deleteTransaction } from '../controllers/transactionController.js';

const router = express.Router();

router.get('/', getTransactions);
router.post('/', createTransaction);
router.get('/:id', getTransactionById);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

export default router;
