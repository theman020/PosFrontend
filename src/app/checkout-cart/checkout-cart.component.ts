import { Component, OnInit } from '@angular/core';

import { Customer } from '../models/customer';
import { Cart } from '../models/cart';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { CustomersService } from '../services/customers.service';

@Component({
  selector: 'app-checkout-cart',
  templateUrl: './checkout-cart.component.html',
  styleUrls: ['./checkout-cart.component.css']
})
export class CheckoutCartComponent implements OnInit {
  subtotal = 0.0;
  tax = 10.0;
  activeCustomer: Customer;
  activeCart: Cart;
  constructor(
    private cartService: CartService,
    private router: Router,
    private customerService: CustomersService
  ) {}

  ngOnInit() {
    if (!JSON.parse(localStorage.getItem('activeEmployee'))) {
      this.router.navigate(['']);
    }
    this.activeCustomer = JSON.parse(localStorage.getItem('activeCustomer'));

    this.customerService
      .getCustomerCart(this.activeCustomer.id)
      .subscribe(data => {
        this.activeCart = data;
        this.subtotal = this.cartService.getSubtotal(this.activeCart);
        localStorage.setItem('activeCart', JSON.stringify(this.activeCart));
      });
  }
}
