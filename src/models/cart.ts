import fs from 'fs';
import path from 'path'
import { Product } from './product';

const p = path.join(
  path.dirname(__dirname),
  'data',
  'cart.json'
);

interface CallbackOneParam<T1, T2 = void> {
  (param1: T1): T2;
}

//type ProductCart = Product & {quantity: number}
type ProductCart = {
  id: number;
  quantity: number;
}


export class Cart {
  products: Array<ProductCart>
  totalPrice: number

  constructor(products: Array<ProductCart>, totalPrice: number) {
    this.products = products;
    this.totalPrice = totalPrice;
  }

  static addProduct(id: number, productPrice?: number) {
    // Fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart: Cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent.toString());
      }
      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(
        prod => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct: ProductCart;
      // Add new product/ increase quantity
      if (existingProduct) {
        updatedProduct = Object.assign({}, existingProduct); //{ ...existingProduct };
        updatedProduct.quantity = updatedProduct.quantity + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, quantity: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + (productPrice ? productPrice : 0);
      fs.writeFile(p, JSON.stringify(cart), err => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id: number, productPrice?: number) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }
      const updatedCart: Cart = { ...JSON.parse(fileContent.toString()) };
      const product = updatedCart.products.find(prod => prod.id === id);
      if (!product) {
          return;
      }
      //const productQty = updatedCart.products.length;
      updatedCart.products = updatedCart.products.filter(
        prod => prod.id !== id
      );
      updatedCart.totalPrice = updatedCart.totalPrice - (productPrice ? productPrice : 0);

      fs.writeFile(p, JSON.stringify(updatedCart), err => {
        console.log(err);
      });
    });
  }

  static getCart(callback: CallbackOneParam<Cart | undefined>) {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent.toString());
      if (err) {
        callback(undefined);
      } else {
        callback(cart);
      }
    });
  }
};
