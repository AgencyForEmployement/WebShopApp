import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';

const routes: Routes = [

  { path: '', component: LoginPageComponent },
  { path: 'register', component: RegistrationPageComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'payment', component: PaymentFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
