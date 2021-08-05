import { Request, Response, NextFunction } from "express";
import { Product } from "../models/product"


export class AdminController {

  async getAddProduct(req: Request, res: Response, next: NextFunction) {
    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing: false
    });
  }

  async postAddProduct(req: Request, res: Response, next: NextFunction) {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(undefined, title, imageUrl, description, price);
    product.save();
    res.redirect('/');
  }

  async getEditProduct(req: Request, res: Response, next: NextFunction) {
    const editMode = req.query.edit;
    if (!editMode) {
      return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(Number.parseInt(prodId), product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });
    });
  }

  async postEditProduct(req: Request, res: Response, next: NextFunction) {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    const updatedProduct = new Product(
      prodId,
      updatedTitle,
      updatedImageUrl,
      updatedDesc,
      updatedPrice
    );
    updatedProduct.save();
    res.redirect('/admin/products');
  }

  async getProducts(req: Request, res: Response, next: NextFunction) {
    Product.fetchAll(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    });
  }

  async postDeleteProduct(req: Request, res: Response, next: NextFunction) {
    const prodId = req.body.productId;
    Product.deleteById(Number.parseInt(prodId));
    res.redirect('/admin/products');
  }

}