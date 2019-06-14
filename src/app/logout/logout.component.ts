import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';
import { ToastrService } from '../services/toastr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  private activeEmployee: Employee;
  closingAmount: number;
  constructor(
    private employeeService: EmployeeService,
    private toastr: ToastrService, private router: Router) {
    this.closingAmount = 0.0;
  }

  ngOnInit() {
    if (!JSON.parse(localStorage.getItem('activeEmployee'))) {
      this.router.navigate(['']);
    }
    this.activeEmployee = JSON.parse(localStorage.getItem('activeEmployee'));
    if (this.activeEmployee.id) {
      this.getClosingAmount(this.activeEmployee.id, this.activeEmployee.cashDrawerId);
    }
  }

  getClosingAmount(id, cashDrawerId) {
    this.employeeService.getClosingAmount(id, cashDrawerId).subscribe(data => {
      console.log('data is ',data);
      if (data.errorMessage) {

        this.closingAmount = Number(localStorage.getItem('startingAmount'));
        this.toastr.info(data.errorMessage);
      } else {
          this.closingAmount = Number(localStorage.getItem('startingAmount'));
        this.toastr.info(data.errorMessage);
          this.closingAmount = Number(data) + Number(localStorage.getItem('startingAmount'));
        
      }
    }, error => {
      this.toastr.error(error.errorMessage);
    });
  }

  logoutEmployee() {
    this.employeeService.logoutEmployee(this.activeEmployee.cashDrawerId, this.closingAmount).subscribe(data => {
      localStorage.removeItem('activeEmployee');
      localStorage.removeItem('activeCart');
      localStorage.removeItem('activeCustomer');
      localStorage.removeItem('startingAmount');
      this.router.navigate(['']);
    }, error => {
      this.toastr.error(error.errorMessage);
    });
  }

}
