import { ID } from '@datorama/akita';
import { Product } from '../product/product.model';


export interface CartItem {
  product_id?: ID;
  quantity: number;
  name?: Product['name'];
  price?: Product['additionalData']['price'];
  total?: any;
}