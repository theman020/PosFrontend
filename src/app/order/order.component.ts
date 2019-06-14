import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order';
import { ActivatedRoute, Router } from '@angular/router';
import { Status } from '../models/status.enum';

import { ToastrService } from '../services/toastr.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  isSavedOrder = true;
  isPlacedOrder = true;
  order: Order;
  status: Status;
  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    if (!JSON.parse(localStorage.getItem('activeEmployee'))) {
      this.router.navigate(['']);
    }
    const orderId = +this.route.snapshot.paramMap.get('orderId');

    this.getOrderDetails(orderId);
    this.route.params.subscribe(params => {
      if (params.orderType === 'savedOrder') {
        this.isSavedOrder = true;
      } else {
        this.isSavedOrder = false;
      }
    }
    );
  }

  getOrderDetails(orderId) {
    this.orderService.getOrderByOrderId(orderId).subscribe(data => {
      this.order = data;
    }, error => {
      this.toastr.error(error.errorMessage);
    });
  }

  reloadCustomerOrder(order) {

    this.orderService
      .reloadCustomerOrder(
        order.customer.id,
        order.id,
        order.orderDetails
      )
      .subscribe(data => {
        console.log(data);

        localStorage.setItem('activeCart', JSON.stringify(data));
        localStorage.setItem('activeCustomer', JSON.stringify(order.customer));
        this.router.navigate(['/home']);
      }, error => {
        this.toastr.error(error.errorMessage);
      });
  }
}
