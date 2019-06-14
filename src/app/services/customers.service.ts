import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Customer } from '../models/customer';
import { Observable } from 'rxjs/observable';
import { Cart } from '../models/cart';
import { SecurityService } from './security.service';

@Injectable()
export class CustomersService {
  private CUSTOMER_URL = 'http://localhost:9999/pos_application/api/customers';

  constructor(private http: HttpClient, private securityService: SecurityService) {}

  searchCustomers(searchBy): Observable<Customer[]> {
    const headers = this.securityService.getHeader();
    return this.http.get<Customer[]>(this.CUSTOMER_URL + '?searchParameter=' + searchBy, {headers}).catch(this.handleError);
  }

  getCustomerCart(customerId): Observable<Cart> {
    const headers = this.securityService.getHeader();
    return this.http.get<Cart>(this.CUSTOMER_URL + '/' + customerId + '/carts', {headers}).catch(this.handleError);
  }
  private handleError(err: HttpErrorResponse) {

    return Observable.throw(err.error);
  }

}
