import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Employee } from '../models/employee';
import { SecurityService } from './security.service';


@Injectable()
export class EmployeeService {

  constructor(private http: HttpClient, private securityService: SecurityService) {
   }

  private EMPLOYEES_URL = 'http://localhost:9999/pos_application/api/employees/';

  registerEmployee(username, password, managerName): any {

    const encodedString = btoa('secret:client');
  const authToken = 'Basic ' + encodedString;
  alert(authToken);
  const headers = new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': authToken
  });
    return this.http
      .post<Employee>(
        this.EMPLOYEES_URL,
        {
          username: username,
          password: password,
          managerName: managerName
        },
        {headers}
      )
      .catch(this.handleError);
  }

  loginEmployee(username, password, startingAmount): any {
  const headers = this.securityService.getHeader();
    return this.http.post<Employee>(this.EMPLOYEES_URL + 'login', {
      username: username,
      password: password,
      startingAmount: startingAmount
    }, {headers}).catch(this.handleError);
  }

  getEmployeeByUsername(username): any {
    const headers = this.securityService.getHeader();
    return this.http.get<any>(this.EMPLOYEES_URL + username, {headers}).catch(this.handleError);
  }

  getClosingAmount(employeeId, cashDrawerId): Observable<any> {
    const headers = this.securityService.getHeader();
    return this.http.get<number>(this.EMPLOYEES_URL
      + employeeId + '/cashdrawers/' + cashDrawerId +
      '/orders/sum', {headers}).catch(this.handleError);
  }

  logoutEmployee(cashDrawerId, closingAmount): any {
    const headers = this.securityService.getHeader();
    return this.http.post(this.EMPLOYEES_URL + 'logout', {
      cashDrawerId: cashDrawerId,
      endingAmount: closingAmount
    }, {headers}).catch(this.handleError);
  }

  getCashDrawerDetails(employeeId): Observable<any> {
    const headers = this.securityService.getHeader();
    return this.http.get(this.EMPLOYEES_URL + employeeId + '/cashdrawerdetails', {headers}).catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    return Observable.throw(err.error);
  }
}
