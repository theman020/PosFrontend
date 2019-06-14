import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Order } from "../models/order";
import { Observable } from "rxjs/observable";
import { Cart } from "../models/cart";
import { SecurityService } from "./security.service";

@Injectable()
export class OrderService {
  private ORDER_URL = "http://localhost:9999/pos_application/api/orders";
  private EMPLOYEES_URL = "http://localhost:9999/pos_application/api/employees/";
  private CUSTOMER_URL = "http://localhost:9999/pos_application/api/customers/";

  constructor(private http: HttpClient,private securityService:SecurityService) {}

  saveOrder(order): any {
    const headers=this.securityService.getHeader(); 
   
    return this.http
      .post<Order>(this.ORDER_URL + "/save", order,{headers})
      .catch(this.handleError);
  }

  placeOrder(order): any {
    const headers=this.securityService.getHeader(); 
   
    return this.http
      .post<Order>(this.ORDER_URL, order,{headers})
      .catch(this.handleError);
  }
  getAllSavedOrders(employeeId): Observable<Order[]> {
    const headers=this.securityService.getHeader(); 
    return this.http
      .get<any>(this.EMPLOYEES_URL + employeeId + "/orders", {
        params: {
          status: "ON_HOLD"
        },
        headers:headers
      
      })
      .catch(this.handleError);
  }

  getAllPlacedOrders(employeeId): Observable<Order[]> {
    const headers=this.securityService.getHeader(); 
    
    return this.http
      .get<any>(this.EMPLOYEES_URL + employeeId + "/orders", {
        params: {
          status: "COMPLETED"
        },
        headers:headers
      })
      .catch(this.handleError);
  }

  getOrderByOrderId(orderId): Observable<Order> {
    const headers=this.securityService.getHeader(); 
    return this.http
      .get<Order>(this.ORDER_URL +"/"+ orderId,{headers})
      .catch(this.handleError);
  }

  reloadCustomerOrder(customerId, orderId, orderDetails): Observable<Cart> {
    const headers=this.securityService.getHeader(); 
    return this.http.post<any>(
      this.CUSTOMER_URL + customerId + "/orders/" + orderId +"/reload",
      orderDetails,{headers}
    );
  }

  private handleError(err: HttpErrorResponse) {
 
    return Observable.throw(err.error);
  }
}
