import fs from 'fs';
import path from 'path';

import { Cart } from './cart';

const p = path.join(
  path.dirname(__dirname),
  'data',
  'products.json'
);

interface CallbackOneParam<T1, T2 = void> {
  (param1: T1): T2;
}

function getProductsFromFile(callback: CallbackOneParam<Array<Product>>) {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      callback([]);
    } else {
      callback(JSON.parse(fileContent.toString()));
    }
  });
};

export class Product {
  id: number | undefined
  title: string
  imageUrl: string
  description: string
  price: number

  // id? : number => pass argunment or not -> need be at the end
  // id: number | undefined => or number or undefined
  constructor(id: number | undefined, title: string, imageUrl: string, description: string, price: number) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          prod => prod.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.log(err);
        });
      } else {
        this.id = Math.random();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
    });
  }

  static deleteById(id: number) {
    getProductsFromFile(products => {
      const product = products.find(prod => prod.id === id);
      const updatedProducts = products.filter(prod => prod.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        if (!err) {
          Cart.deleteProduct(id, product?.price);
        }
      });
    });
  }

  static fetchAll(callback: CallbackOneParam<Array<Product>>) {
    getProductsFromFile(callback);
  }

  static findById(id: number, callback: CallbackOneParam<Product | undefined>) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      callback(product);
    });
  }
};
