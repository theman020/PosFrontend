import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { RegistrationComponent } from './registration/registration.component';
import { OrderComponent } from './order/order.component';
import { SaveOrderComponent } from './save-order/save-order.component';
import { LogoutComponent } from './logout/logout.component';
import { CashdrawerComponent } from './cashdrawer/cashdrawer.component';
import { ReportComponent } from './report/report.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


export const appRoutes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'order/:orderType/:orderId', component: OrderComponent },
  { path: 'saveorder/:orderType', component: SaveOrderComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'cashdrawer', component: CashdrawerComponent },
  { path: 'reports', component: ReportComponent },
  { path: '**', component: PageNotFoundComponent }
];
