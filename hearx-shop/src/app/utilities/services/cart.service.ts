import { Injectable } from '@angular/core';

import { ID } from '@datorama/akita';
import { Product } from '../product/product.model';
import { CartStore } from '../store/cart.store';


@Injectable({ providedIn: 'root' })
export class CartService {

  constructor(private cartStore: CartStore) {
    let cart: any[] = JSON.parse(localStorage.getItem('activeCart'));
    if(cart.length > 0)
    {
      cart.forEach(x=>{
        let product: Product = 
        {
          id:x.productId,
          image:'',
          name:x.name
        };
        if(x.quantity > 0)
        {
          this.add(product,x.quantity);
        }
        
      });
      
    }
  }

  add(product: Product, quan: number) {
    this.cartStore.upsert(product.id, {
      name: product.name,
      quantity:quan
    });
    let cart = this.GetCart();
    localStorage.setItem('activeCart', JSON.stringify(cart));
  }


  GetCart() {
    let ProductArray: any[] = [];
    this.cartStore.getValue().ids.forEach(x=>{
      ProductArray.push(this.cartStore.getValue().entities[x]);
    });
    return ProductArray;
  }

  GetCartProduct(id) {
    let ProductArray: any[] = [];
    this.cartStore.getValue().ids.forEach(x=>{
      ProductArray.push(this.cartStore.getValue().entities[x]);
    });
    let obj =  ProductArray.find(x => x.productId === id);
    if(obj == null)
    {
      return null;
    }
    else
    {
      return obj;
    }
    
  }

  GetCartTotal()
  {
    let Count = 0;
    let ProductArray: any[] = [];
    this.cartStore.getValue().ids.forEach(x=>{
      Count += this.cartStore.getValue().entities[x].quantity;
    });
    return Count;
  }

  Remove(productId: ID) {
    this.cartStore.remove(productId);
    let cart = this.GetCart();
    localStorage.setItem('activeCart', JSON.stringify(cart));
  }

  Clear()
  {
    let ProductArray: any[] = [];
    this.cartStore.getValue().ids.forEach(x=>{
      this.cartStore.remove(this.cartStore.getValue().entities[x].productId);
    });
    localStorage.removeItem('activeCart');
  }
}