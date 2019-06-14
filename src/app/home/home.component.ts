import { Component, OnInit, ViewChild } from '@angular/core';
import { CartDetails } from '../models/cart-details';
import { Cart } from '../models/cart';
import { CartComponent } from '../cart/cart.component';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild(CartComponent) cartComponent: CartComponent;

  cart: Cart
  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit() {
    if(!JSON.parse(localStorage.getItem("activeEmployee"))){
      this.router.navigate([''])
    }
    this.cart = JSON.parse(localStorage.getItem("activeCart"));
  }


  updateCart(cart) {
    this.cart = cart;
    this.cartComponent.cart = this.cart;
  }


}
