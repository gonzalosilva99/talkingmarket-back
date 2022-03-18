import { productController } from "../controllers/product.js";
import express from "express";
const router = express.Router();

router.post('/', productController.addProduct);
router.get('/', productController.findProducts);
router.get('/:id', productController.findProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteById);

export default router; 