import { Injectable } from '@angular/core';

import { ID } from '@datorama/akita';

import { CartStore } from '../store/cart.store';
import { Product } from '../interfaces/product/product.model';


@Injectable({ providedIn: 'root' })
export class CartService {

  constructor(private cartStore: CartStore) {
    let cart: any[] = JSON.parse(localStorage.getItem('activeCart'));
    if (cart) {
      if (cart.length > 0) {
        cart.forEach(x => {
          let product: Product =
          {
            id: x.product_id,
            image: '',
            name: x.name,
            additionalData:{
              price:x.price
            }
          };
          if (x.quantity > 0) {
            this.add(product, x.quantity);
          }

        });

      }
    }
  }

  add(product: Product, quan: number) {
    let _total = (product.additionalData.price * quan).toFixed(2);
    this.cartStore.upsert(product.id, {
      name: product.name,
      price: product.additionalData.price ? product.additionalData.price : null,
      total: _total,
      quantity: quan
    });
    let cart = this.GetCart();
    localStorage.setItem('activeCart', JSON.stringify(cart));
  }


  GetCart() {
    let ProductArray: any[] = [];
    this.cartStore.getValue().ids.forEach(x => {
      ProductArray.push(this.cartStore.getValue().entities[x]);
    });
    return ProductArray;
  }

  GetCartProduct(id) {
    let ProductArray: any[] = [];
    this.cartStore.getValue().ids.forEach(x => {
      ProductArray.push(this.cartStore.getValue().entities[x]);
    });
    let obj = ProductArray.find(x => x.product_id === id);
    if (obj == null) {
      return null;
    }
    else {
      return obj;
    }

  }

  GetCartTotal() {
    let Count = 0;
    let ProductArray: any[] = [];
    this.cartStore.getValue().ids.forEach(x => {
      Count += this.cartStore.getValue().entities[x].quantity;
    });
    return Count;
  }

  Remove(product_id: ID) {
    this.cartStore.remove(product_id);
    let cart = this.GetCart();
    localStorage.setItem('activeCart', JSON.stringify(cart));
  }

  Clear() {
    let ProductArray: any[] = [];
    this.cartStore.getValue().ids.forEach(x => {
      this.cartStore.remove(this.cartStore.getValue().entities[x].product_id);
    });
    localStorage.removeItem('activeCart');
  }
}