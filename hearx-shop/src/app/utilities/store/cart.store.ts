import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { CartItem } from '../interfaces/cart/cart.model';


export interface CartState extends EntityState<CartItem> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'cart', idKey: 'product_id' })
export class CartStore extends EntityStore<CartState, CartItem> {

  constructor() {
    super();
  }

}