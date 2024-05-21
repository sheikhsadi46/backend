import express from 'express';
import userRoutes from './userRoutes.js';
import productRoutes from './productRoutes.js';
import orderRoutes from './orderRoutes.js';
import itemRoutes from './itemRoutes.js';
import transactionRoutes from './transactionRoutes.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/items', itemRoutes);
router.use('/transactions', transactionRoutes);

export default router;
