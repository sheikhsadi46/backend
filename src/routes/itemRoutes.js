import express from 'express';
import { getItems, addItem, getItemById, updateItem, deleteItem } from '../controllers/itemController.js';

const router = express.Router();

router.get('/', getItems);
router.post('/', addItem);
router.get('/:id', getItemById);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

export default router;
