import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LandingPageComponent } from './landing-page.component';



@NgModule({
  declarations: [
   LandingPageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [LandingPageComponent],
  exports:[LandingPageComponent]
})
export class LandingPageModule { }
