import { Component, OnInit } from "@angular/core";
import { OrderService } from "../services/order.service";
import { Order } from "../models/order";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "../services/toastr.service";
@Component({
  selector: "app-save-order",
  templateUrl: "./save-order.component.html",
  styleUrls: ["./save-order.component.css"]
})
export class SaveOrderComponent implements OnInit {
  savedOrders: Array<Order>;
  orderType: string;
  isSavedOrder: boolean = false
  isPlacedOrder: boolean = false;
  activeEmployeeId: number
  selectedRow: Number;
  setClickedRow: Function;
  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute, private router: Router,
    private toastr: ToastrService
  ) {
    this.activeEmployeeId = JSON.parse(localStorage.getItem("activeEmployee")).id;
    this.setClickedRow = function (index, id) {
      this.selectedRow = index;
      if (this.isPlacedOrder) {
        this.router.navigate(["order/placedOrder/" + id])
      }
      else {
        this.router.navigate(["order/savedOrder/" + id])
      }
    }
  }

  ngOnInit() {
    if (!JSON.parse(localStorage.getItem("activeEmployee"))) {
      this.router.navigate([''])
    }
    const saveOrder = +this.route.snapshot.paramMap.get("orderId");
    this.route.params.subscribe(params => {
      if (params.orderType == "savedOrders") {
        this.isSavedOrder = true;
        this.isPlacedOrder = false;
        this.getAllSavedOrders()
      }
      else {
        this.isPlacedOrder = true;
        this.isSavedOrder = false;
        this.getAllPlacedOrders()
      }
    }
    );
  }

  getAllPlacedOrders() {

    this.orderService.getAllPlacedOrders(this.activeEmployeeId).subscribe(data => {
      this.savedOrders = data;
      console.log(this.savedOrders)
      console.log(data)
    }, error => {
      this.toastr.error(error.errorMessage)
    });

  }


  getAllSavedOrders() {

    this.orderService.getAllSavedOrders(this.activeEmployeeId).subscribe(data => {
      this.savedOrders = data;

    }, error => {
      this.toastr.error(error.errorMessage)
    });
  }

  checkDate(i, savedOrders) {
    if (i == 0) {
      return true;
    }
    if (savedOrders[i].createOrderDateTime.dayOfMonth == savedOrders[i - 1].createOrderDateTime.dayOfMonth &&
      savedOrders[i].createOrderDateTime.month == savedOrders[i - 1].createOrderDateTime.month &&
      savedOrders[i].createOrderDateTime.year == savedOrders[i - 1].createOrderDateTime.year) {
      return false
    }
    return true;
  }




}



