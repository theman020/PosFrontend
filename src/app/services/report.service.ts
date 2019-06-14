import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import { Report } from '../models/report';
import { Employee } from '../models/employee';
import { SecurityService } from './security.service';

@Injectable()
export class ReportService {

  private REPORT_URL = "http://localhost:9999/pos_application/api/employees/";

  constructor(private http : HttpClient,private securityService:SecurityService) { }

  getOrders(fromDate,toDate):Observable<Report[]>{
    const headers=this.securityService.getHeader(); 
    let activeEmployee:Employee=JSON.parse(localStorage.getItem("activeEmployee"));
   return this.http.get<Report[]>(this.REPORT_URL+activeEmployee.id+"/orders/report",{
     params:{
       fromDate:fromDate,
       toDate:toDate
     },
     headers:headers
   }).catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
   
    return Observable.throw(err.error);
  }

}
