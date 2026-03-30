import express from 'express';
import {
  getCustomItems,
  getCustomItem,
  createCustomItem,
  updateCustomItem,
  deleteCustomItem
} from '../controllers/customItemsController.js';

const router = express.Router();

router.get('/customitems', getCustomItems);
router.get('/customitems/:id(\d+)', getCustomItem);
router.post('/customitems', createCustomItem);
router.put('/customitems/:id', updateCustomItem);
router.delete('/customitems/:id', deleteCustomItem);

export default router;
