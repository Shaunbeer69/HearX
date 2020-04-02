import { Component, HostListener, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Product } from 'src/app/Utilities/product/product.model';
import { CartService } from 'src/app/Utilities/services/cart.service';
import { CartItem } from 'src/app/Utilities/cart/cart.model';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnDestroy, AfterViewInit {
  subscription: Subscription;
  title = 'hearx-shop';
  public DisplayCart: boolean = false;
  cart: any[];
  public Products: Product[] = [
    {
      id: 1,
      name: "Coffee Beans - 1Kg",
      image: "https://picsum.photos/200",
      additionalData: { price: 92.99 }
    },
    {
      id: 2,
      name: "Yorkshire tea - 100 tea bags",
      image: "https://picsum.photos/200",
      additionalData: { price: 39.99 }
    },
    {
      id: 3,
      name: "Altered Carbon Season 2",
      image: "https://picsum.photos/200",
      additionalData: { price: 399.99 }
    },
    {
      id: 4,
      name: "Sony WF-1000XM3 True wireless Noise Canceling",
      image: "https://picsum.photos/200",
      additionalData: { price: 1999.99 }
    },
    {
      id: 5,
      name: "Mackbook Pro 2019 Model 16GB RAM",
      image: "https://picsum.photos/200",
      additionalData: { price: 12000.00 }
    },
    {
      id: 6,
      name: "Asus GL752 gaming laptop",
      image: "https://picsum.photos/200",
      additionalData: { price: 24000.00 }
    },
    {
      id: 7,
      name: "Guinness Draught Cans 440ml 2x Six Packs",
      image: "https://picsum.photos/200",
      additionalData: { price: 99.99 }
    },
    {
      id: 8,
      name: "6 Man Tent - Dark blue",
      image: "https://picsum.photos/200",
      additionalData: { price: 2999.99 }
    }
  ];
  myTimer: any;


  constructor(private eRef: ElementRef, private cartService: CartService, private route: Router) { }

  //Setting Timer for Cart local storage clear
  ngAfterViewInit(): void {
    const source = interval(1000 * 60 * 60);
    this.subscription = source.subscribe(val => this.clearStorage());
  }

  //Navigation
  public Navigate(route: string) {
    this.route.navigate([route]);
  }

  //Check Quantity boolean
  HasQuantity(product: Product) {
    let tmpProduct = this.cartService.GetCartProduct(product.id);
    if (tmpProduct == null) {
      return false;
    }
    else {
      return true;
    }
  }

  //Get Quantity 
  GetQuantity(product: Product) {
    let tmpProduct = this.cartService.GetCartProduct(product.id);
    return tmpProduct.quantity;
  }

  //Get Price
  GetPrice(product: Product) {
    return product.additionalData.price;
  }

  //Get Cart Total Price
  GetCartCashTotal() {
    let total_cart = 0;
    let cart: any[] = this.cartService.GetCart();
    cart.forEach(x => {
      total_cart += Number(x.total);
    });
    return total_cart.toFixed(2);
  }

  //Update Product Quantity addition
  AddQuantity(product: any) {
    let tmpCartItem: CartItem = this.cartService.GetCartProduct(product.id);
    if (tmpCartItem != null) {
      let quantity = Number(tmpCartItem.quantity);
      quantity += 1;
      this.cartService.add(product, quantity);
      this.cart = this.cartService.GetCart();
    }
  }

  //Update Product Quantity deletion
  DecreaseQuantity(product: any) {
    let tmpCartItem: CartItem = this.cartService.GetCartProduct(product.id);
    if (tmpCartItem != null) {
      let quantity = Number(tmpCartItem.quantity);
      quantity -= 1;
      this.cartService.add(product, quantity);
      if (quantity == 0) {
        this.cartService.Remove(tmpCartItem.productId);
      }
      this.cart = this.cartService.GetCart();
    }
  }

  //Get Total Cart
  public GetCart() {
    this.cartService.GetCart();
  }

  //Get Total Cart Items
  public GetCartTotal() {
    return this.cartService.GetCartTotal();
  }

  //Add To Cart
  public AddToCart(product: Product) {
    let element: HTMLElement = document.getElementById(product.id.toString());
    element.className = "loader";
    let btnElement: HTMLElement = document.getElementById(product.id.toString() + 'btn');
    btnElement.className = 'd-none';
    let loaderContainerElement: HTMLElement = document.getElementById(product.id.toString() + 'loader');
    loaderContainerElement.className = '';
    setTimeout(() => {
      element.className = ''
      btnElement.className = 'btn first';
      loaderContainerElement.className = 'd-none';
      let tmpProduct = this.cartService.GetCartProduct(product.id);
      if (tmpProduct == null) {
        this.cartService.add(product, 1);
        this.cart = this.cartService.GetCart();
      }
      else {
        let quantity = Number(tmpProduct.quantity);
        quantity += 1;
        this.cartService.add(product, quantity);
        this.cart = this.cartService.GetCart();
      }
    }, 2000);
  }

  //Remove From Cart
  RemoveItem(product: any) {
    let tmpCartItem: CartItem = this.cartService.GetCartProduct(product.productId);
    let tmpProduct: Product = this.Products.find(x => x.id === product.productId);
    if (tmpCartItem != null) {
      let quantity = Number(tmpCartItem.quantity);
      quantity -= 1;
      this.cartService.add(tmpProduct, quantity);
      this.cart = this.cartService.GetCart();
      if (quantity == 0) {
        this.cartService.Remove(product.productId);
        this.cart = this.cartService.GetCart();
        if (this.GetCartTotal() == 0) {
          this.DisplayCart = false;
        }
      }
    }
  }


  //Clear Storage 
  public clearStorage() {
    this.cartService.Clear();
  }

  //Display and update cart
  public TriggerCart() {
    this.DisplayCart ? this.DisplayCart = false : this.DisplayCart = true;
    this.cart = this.cartService.GetCart();
  }

  Checkout()
  {
    alert("Checkout cannot occur as this is a demo");
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
