import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CartComponent } from './cart.component';


@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [CartComponent],
  exports:[CartComponent]
})
export class CartModule { }
