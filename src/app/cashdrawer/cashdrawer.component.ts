import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Cashdrawer } from '../models/cashdrawer';
import { ToastrService } from '../services/toastr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cashdrawer',
  templateUrl: './cashdrawer.component.html',
  styleUrls: ['./cashdrawer.component.css']
})
export class CashdrawerComponent implements OnInit {

  cashDrawerDetails: Cashdrawer[];
  constructor(private employeeService: EmployeeService, private toastr: ToastrService, private router: Router) {
    this.cashDrawerDetails = []
  }

  ngOnInit() {
    if(!JSON.parse(localStorage.getItem("activeEmployee"))){
      this.router.navigate([''])
    }
    this.getCashDrawerDetails((JSON.parse(localStorage.getItem("activeEmployee")).id))
  }

  getCashDrawerDetails(employeeId) {
    this.employeeService.getCashDrawerDetails(employeeId).subscribe(data => {
      console.log(data);
      this.cashDrawerDetails = data;
    }, err => {
      this.toastr.error(err.errorMessage)
    });
  }

}
