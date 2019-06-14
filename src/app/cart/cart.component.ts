import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Customer } from '../models/customer';
import { CartService } from '../services/cart.service';
import { CustomersService } from '../services/customers.service';
import { Cart } from '../models/cart';
import { ToastrService } from '../services/toastr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnChanges {
  customers: Array<Customer>;
isHidden: boolean;
  @Input() cart: Cart;
  @Output() result = new EventEmitter<Cart>();

  subtotal = 0.00;
  tax = 10.00;
  customer: Customer;

  constructor(private customerService: CustomersService,
    private router: Router, private cartService: CartService, private toastr: ToastrService) { }

  ngOnInit() {
    if (!JSON.parse(localStorage.getItem('activeEmployee'))) {
      this.router.navigate(['']);
    }
    this.isHidden = false;
    this.customer = JSON.parse(localStorage.getItem('activeCustomer'));
  }

  ngOnChanges() {
    this.subtotal = 0.00;
    this.getPrice(this.cart);
  }

  getCustomerCart(customer) {
    this.customer = customer;
    localStorage.setItem('activeCart', JSON.stringify(this.customer));

    this.customerService.getCustomerCart(customer.id).subscribe(data => {
      this.cart = data;
      localStorage.setItem('activeCart', JSON.stringify(this.cart));
      localStorage.setItem('activeCustomer', JSON.stringify(this.customer));
      this.result.emit(this.cart);
    });
    this.customers = [];
    this.isHidden = true;
  }

  clearCart() {
    this.cartService.clearCart(this.cart.id).subscribe(() => {
      this.cart = {};
      this.subtotal = 0.00;
    });
  }

  getPrice(cart) {
    this.subtotal = this.cartService.getSubtotal(cart);
  }

  deleteProductFromCart(productId) {
    this.cartService.deleteProductFromCart(this.cart.id, productId).subscribe(() => {
      this.getCustomerCart(this.customer);
    }, err => {
      this.toastr.error(err.errorMessage);
    });

  }

  decrementQuantity(cartDetail) {
    if (cartDetail.quantity > 1) {
      cartDetail.quantity--;
      this.cartService.updateQuantity(this.cart.id, cartDetail).subscribe(data => {
        cartDetail.quantity = data.quantity;
        this.getPrice(this.cart);
      }, err => {
        this.toastr.error(err.errorMessage);
      });
    }
  }

  incrementQuantity(cartDetail) {
    if (cartDetail.quantity < cartDetail.cartDetailsIdentity.product.stock) {
      cartDetail.quantity++;
      this.cartService.updateQuantity(this.cart.id, cartDetail).subscribe(data => {

        cartDetail.quantity = data.quantity;
        this.getPrice(this.cart);
      }, err => {
        this.toastr.error(err.errorMessage);
      });
    } else {
      this.toastr.warning(cartDetail.cartDetailsIdentity.product.name + ' is out of stock');
    }
  }

  searchCustomers(searchBy) {
    if (searchBy.length) {
      localStorage.setItem('activeCustomer', JSON.stringify(this.customer));
      this.customerService.searchCustomers(searchBy).subscribe(data => {
        this.customers = data;
      }, err => {
        this.toastr.error(err.errorMessage);
      });
    }
  }

}
