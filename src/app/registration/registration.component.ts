import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { ToastrService } from '../services/toastr.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup
  usernameError: string
  constructor(private employeeService: EmployeeService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
   
    this.form = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      managerName: new FormControl("", [Validators.required])
    })
  }

  registerEmployee(form) {
   
    this.employeeService.registerEmployee(form.value.username, form.value.password, form.value.managerName).subscribe(data => {
      this.toastr.success("You have been successfully registered")
    }, error => {
      this.toastr.error(error.errorMessage)
    });
  }

  validateUsername(username) {
    this.employeeService.getEmployeeByUsername(username).subscribe(data => {
      if (data) {
        this.usernameError = "Username exists!!"
      }
      else {
        console.log(data)
        this.usernameError = null
      }
    }, error => {
      this.toastr.error(error.errorMessage)
    });
  }
}
