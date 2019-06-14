import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { appRoutes } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { ProductListingService } from './services/product-listing.service';
import { CartService } from './services/cart.service';
import { CustomersService } from './services/customers.service';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentComponent } from './payment/payment.component';
import { CheckoutCartComponent } from './checkout-cart/checkout-cart.component';

import { NavbarComponent } from './navbar/navbar.component';
import { RegistrationComponent } from './registration/registration.component';
import { EmployeeService } from './services/employee.service';
import { OrderComponent } from './order/order.component';
import { OrderService } from './services/order.service';
import { SaveOrderComponent } from './save-order/save-order.component';
import { ToastrService } from './services/toastr.service';
import { LogoutComponent } from './logout/logout.component';

import { CashdrawerComponent } from './cashdrawer/cashdrawer.component';
import { ReportComponent } from './report/report.component';
import { ReportService } from './services/report.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SecurityService } from './services/security.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,

    LoginComponent,
    ProductListingComponent,
    CheckoutComponent,
    PaymentComponent,
    CheckoutCartComponent,
    NavbarComponent,
    RegistrationComponent,
    OrderComponent,
    SaveOrderComponent,
    LogoutComponent,
    CashdrawerComponent,
    ReportComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule, FormsModule, ReactiveFormsModule

  ],
  providers: [ProductListingService, ReportService,
     CartService, CustomersService, EmployeeService,
      OrderService, SecurityService, ToastrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
