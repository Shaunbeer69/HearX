import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LandingPageModule } from './components/landing-page/landing-page.module';
import { CartModule } from './components/cart/cart.module';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

const appRoutes: Routes = [
  { path: 'home', component: CartComponent },
  { path: 'shop', component:  CartComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    LandingPageModule,
    CartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
