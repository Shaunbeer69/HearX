import { Component, HostListener, ElementRef } from '@angular/core';
import { CartService } from './Utilities/services/cart.service';
import { Product, BaseProduct } from './Utilities/product/product.model';
import { ID } from '@datorama/akita';
import { CartItem } from './Utilities/cart/cart.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 
}
