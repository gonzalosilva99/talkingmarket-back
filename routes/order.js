import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { orderController } from '../controllers/order.js';
const router = express.Router();
import { verifyToken, verifyOwnerToken } from '../middleware/auth.js'


//Register
router.get('/', verifyToken, orderController.getOrdersOfLoggedUser);
router.post('/', verifyToken, orderController.createOrderForUser);
router.get('/dailyprofit',verifyToken, orderController.getDailyProfit);

export default router; 