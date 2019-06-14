import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { CartDetails } from '../models/cart-details';
import { CustomersService } from './customers.service';
import { Cart } from '../models/cart';
import { SecurityService } from './security.service';

@Injectable()
export class CartService {
  private CART_URL = 'http://localhost:9999/pos_application/api/carts/';
  constructor(
    private http: HttpClient,
    private customerService: CustomersService,
    private securityService: SecurityService
  ) { }



  addProductToCart(productId, cartId): Observable<Cart> {
    const headers = this.securityService.getHeader();
    return this.http
      .post<CartDetails>(
        this.CART_URL + cartId + '/products',
        { id: productId },
        {headers}
      )
      .catch(this.handleError);
  }

  getSubtotal(cart): number {

    let subtotal = 0.0;
    for (const cartDetail of cart.cartDetails) {

      subtotal += cartDetail.cartDetailsIdentity.product.unitPrice * cartDetail.quantity;

    }
    return subtotal;
  }

  updateQuantity(cartId, cartDetail): Observable<any> {
    const headers = this.securityService.getHeader();
    return this.http.put<CartDetails>(this.CART_URL + cartId + '/products/' + cartDetail.cartDetailsIdentity.product.id,
      cartDetail, {headers}
    )
      .catch(this.handleError);
  }



  deleteProductFromCart(cartId, productId): Observable<any> {
    const headers = this.securityService.getHeader();
    return this.http.delete<any>(
      this.CART_URL + cartId + '/products/' + productId, {headers}
    )
      .catch(this.handleError);
  }

  clearCart(cartId): Observable<any> {
    const headers = this.securityService.getHeader();
    return this.http.delete<any>(
      this.CART_URL + cartId, {headers}
    )
      .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {

    return Observable.throw(err.error);
  }
}
