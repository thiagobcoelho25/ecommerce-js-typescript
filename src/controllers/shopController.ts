import { Request, Response, NextFunction } from "express";
import { Product } from "../models/product"
import { Cart } from '../models/cart';

export class ShopController {

  async getProducts(req: Request, res: Response, next: NextFunction) {
    Product.fetchAll(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    });
  }

  async getProduct(req: Request, res: Response, next: NextFunction) {
    const prodId = req.params.productId;
    Product.findById(Number.parseInt(prodId), product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product?.title,
        path: '/products'
      });
    });
  }

  async getIndex(req: Request, res: Response, next: NextFunction) {
    Product.fetchAll(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    });
  }

  async getCart(req: Request, res: Response, next: NextFunction) {
    Cart.getCart(cart => {
      Product.fetchAll(products => {
        const cartProducts = [];
        for (var product of products) {
          const cartProductData = cart?.products.find(
            prod => prod.id === product.id
          );
          if (cartProductData) {
            cartProducts.push({ productData: product, qty: cartProductData.quantity });
          }
        }
        res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products: cartProducts
        });
      });
    });
  }

  async postCart(req: Request, res: Response, next: NextFunction) {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
      Cart.addProduct(prodId, product?.price);
    });
    res.redirect('/cart');
  }

  async postCartDeleteProduct(req: Request, res: Response, next: NextFunction) {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
      Cart.deleteProduct(prodId, product?.price);
      res.redirect('/cart');
    });
  }

  async getOrders(req: Request, res: Response, next: NextFunction) {
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders'
    });
  }

  async getCheckout(req: Request, res: Response, next: NextFunction) {
    res.render('shop/checkout', {
      path: '/checkout',
      pageTitle: 'Checkout'
    });
  }

}