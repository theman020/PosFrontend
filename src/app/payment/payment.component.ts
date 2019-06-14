import { Component, OnInit } from '@angular/core';
import { ModeOfPayment } from '../models/mode-of-payment.enum';
import { OrderService } from '../services/order.service';
import { CartService } from '../services/cart.service';
import { Status } from '../models/status.enum';
import { Cart } from '../models/cart';
import { ToastrService } from '../services/toastr.service';

import { Router } from '@angular/router';
import { Employee } from '../models/employee';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})

export class PaymentComponent implements OnInit {

  isSavedOrder = false;
  tax = 10.00;
  order: any;
  private ModeOfPayment = ModeOfPayment;
  private ModeOfPaymentValues = Object.keys(ModeOfPayment);
  modeOfPayment: ModeOfPayment = ModeOfPayment.Cash;
  private amount: number;
  private cart: Cart;
  private orderDetails: Array<any> = [];
  private activeEmployee: Employee;

  constructor(private orderService: OrderService,
     private cartService: CartService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {


    this.activeEmployee = JSON.parse(localStorage.getItem('activeEmployee'));
    if (!this.activeEmployee) {
      this.router.navigate(['']);
    }
    this.cart = JSON.parse(localStorage.getItem('activeCart'));



  }


  getOrder(): any {
    if (this.isSavedOrder) {
      status = 'ON_HOLD';
    } else {
      status = 'COMPLETED';
    }
    const order = {
      cartId: JSON.parse(localStorage.getItem('activeCart')).id,
      customer: {
        id: JSON.parse(localStorage.getItem('activeCustomer')).id
      },
      employee: {
        id: JSON.parse(localStorage.getItem('activeEmployee')).id
      },
      modeOfPayment: this.modeOfPayment,

      status: status,
      amount: this.amount,
      orderDetails: this.orderDetails
    };
    return order;
  }

  saveOrder() {
    this.isSavedOrder = true;
    this.getOrderDetails();
    this.order = this.getOrder();
    console.log('save order is ',this.order)
    this.orderService.saveOrder(this.order).subscribe(data => {
      localStorage.removeItem('activeCustomer');
      localStorage.removeItem('activeCart');
      this.toastr.info('Your order is saved successfully', 'Order Id : #' + data.id);
      this.router.navigate(['/home']);
    }, err => {
      this.toastr.error(err.errorMessage);
    });
  }

  placeOrder() {
    this.getOrderDetails();
    this.order = this.getOrder();
    this.orderService.placeOrder(this.order).subscribe(data => {
      localStorage.removeItem('activeCustomer');
      localStorage.removeItem('activeCart');
      this.toastr.info('Your order is placed successfully', 'Order Id : #' + data.id);
      this.router.navigate(['/home']);
    }, err => {
      if (err.errorMessage) {
        this.toastr.error(err.errorMessage);
      }
      this.toastr.error('Out of stock');
    });
  }

  getOrderDetails() {

    this.cart = JSON.parse(localStorage.getItem('activeCart'));
    this.amount = this.cartService.getSubtotal(this.cart) + this.tax;
    for (const cartDetails of this.cart.cartDetails) {
      this.orderDetails.push({
        quantity: cartDetails.quantity,
        unitPrice: +cartDetails.cartDetailsIdentity.product.unitPrice,
        orderDetailsIdentity: {
          product: {
            id: cartDetails.cartDetailsIdentity.product.id
          }
        }
      });
    }
  }
}


