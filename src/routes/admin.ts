import express from "express";

import { AdminController } from "../controllers/adminController";

const adminRoutes = express.Router();

const adminController = new AdminController();

// /admin/add-product => GET
adminRoutes.get('/add-product', adminController.getAddProduct);

// /admin/products => GET
adminRoutes.get('/products', adminController.getProducts);

// /admin/add-product => POST
adminRoutes.post('/add-product', adminController.postAddProduct);

adminRoutes.get('/edit-product/:productId', adminController.getEditProduct);

adminRoutes.post('/edit-product', adminController.postEditProduct);

adminRoutes.post('/delete-product', adminController.postDeleteProduct);

export { adminRoutes };
