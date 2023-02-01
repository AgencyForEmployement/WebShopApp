import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { PaypalFailComponent } from './components/paypal-fail/paypal-fail.component';
import { PaypalSuccessComponent } from './components/paypal-success/paypal-success.component';
import { OptionsComponent } from './components/options/options.component';

const routes: Routes = [

  { path: '', component: LoginPageComponent },
  { path: 'register', component: RegistrationPageComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'payment', component: PaymentFormComponent },
  { path: 'paypal-success', component: PaypalSuccessComponent},
  { path: 'paypal-fail', component: PaypalFailComponent},
  { path: 'options', component: OptionsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
