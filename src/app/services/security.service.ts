import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';


@Injectable()
export class SecurityService   {
  constructor() {}

getHeader() {
  const encodedString = btoa('secret:client');
  const authToken = 'Basic ' + encodedString;

  const headers = new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': authToken
  });

  return headers;
  }
}
