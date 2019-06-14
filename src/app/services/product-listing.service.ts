
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";

import { Product } from "../models/product";
import { SecurityService } from "./security.service";

@Injectable()
export class ProductListingService {
  private PRODUCT_URL = "http://localhost:9999/pos_application/api/products";

  constructor(private http: HttpClient,private securityService:SecurityService) { }

  getProducts(): Observable<Product[]> {
    const headers=this.securityService.getHeader(); 
    return this.http.get<Product[]>(this.PRODUCT_URL,{headers}).catch(this.handleError);
  }

  searchProducts(searchBy): Observable<Product[]> {
    const headers=this.securityService.getHeader(); 
    return this.http.get<Product[]>(this.PRODUCT_URL + "?searchParameter=" + searchBy,{headers}).catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
   
    return Observable.throw(err.error);
  }

}
