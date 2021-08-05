import express from "express";
import { ShopController } from "../controllers/shopController"

const shopController = new ShopController();

const shopRoutes = express.Router();

shopRoutes.get('/', shopController.getIndex);

shopRoutes.get('/products', shopController.getProducts);

shopRoutes.get('/products/:productId', shopController.getProduct);

shopRoutes.get('/cart', shopController.getCart);

shopRoutes.post('/cart', shopController.postCart);

shopRoutes.post('/cart-delete-item', shopController.postCartDeleteProduct);

shopRoutes.get('/orders', shopController.getOrders);

shopRoutes.get('/checkout', shopController.getCheckout);

export { shopRoutes };
