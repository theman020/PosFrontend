import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { ReportService } from '../services/report.service';
import { ToastrService } from '../services/toastr.service';
import { Report } from '../models/report';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  form: FormGroup;
  reportElements: Array<Report>;
  constructor(private reportService: ReportService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    if (!JSON.parse(localStorage.getItem('activeEmployee'))) {
      this.router.navigate(['']);
    }
    this.form = new FormGroup({
      fromDate: new FormControl('', [Validators.required]),
      toDate: new FormControl('', [Validators.required]),
    });
  }

  downloadReports(form) {
    this.reportService.getOrders(form.value.fromDate, form.value.toDate).subscribe(data => {
      this.reportElements = data;

      const options = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: true,
        showTitle: true,
        useBom: true,
        noDownload: false,
        headers: ['Order Id', 'Customer Email', 'Mode of Payment', 'Status', 'Order Date', 'Tax', 'Subtotal', 'Total Amount']
      };

      // tslint:disable-next-line:no-unused-expression
      new Angular5Csv(this.reportElements, 'SalesReport', options);


    },
      error => {
        this.toastr.error(error.errorMessage);
      });

  }

}
