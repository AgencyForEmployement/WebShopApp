import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required ]),
    password: new FormControl('', [Validators.required, Validators.min(3) ])
  });
  hide = true;
  get emailInput() { return this.loginForm.get('email'); }
  get passwordInput() { return this.loginForm.get('password'); }  

  readonly getEmailErrorMessage = () => {
    if (this.loginForm.controls['email'].hasError('required')) {
      return 'You must enter email';
    }
    return this.loginForm.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }

  readonly login = () => this.router.navigate(['homepage'])
}
