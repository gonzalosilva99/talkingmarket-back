import express from 'express';
import { userController } from '../controllers/users.js';
const router = express.Router();

//Register 
router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);


// router.delete('/:id', deleteUser);

export default router; 