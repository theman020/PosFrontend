import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {
  form: FormGroup
  constructor(private employeeService: EmployeeService, private router: Router) { }
  invalidUserError: string;
  ngOnInit(): void {
  
    this.form = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      startingAmount: new FormControl("", [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)])
    })
  }

  loginEmployee(form) {
    localStorage.setItem("startingAmount", form.value.startingAmount);
    this.employeeService.loginEmployee(form.value.username, form.value.password, form.value.startingAmount)
      .subscribe(data => {

        localStorage.setItem("activeEmployee", JSON.stringify(data));

        this.router.navigate(['home'])
      }, err => {
        this.invalidUserError = "Invalid Credentials"
      })

  }
}
