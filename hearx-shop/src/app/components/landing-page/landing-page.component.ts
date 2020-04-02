import { Component, HostListener, ElementRef } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  title = 'hearx-shop';
  public DisplayCart: boolean = false;
  cart: any[];
  constructor(private route: Router) { }

  public Navigate(route:string)
  {
    this.route.navigate([route]);
  }
}
