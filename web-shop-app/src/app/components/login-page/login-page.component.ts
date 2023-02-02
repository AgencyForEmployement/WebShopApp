import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private router:Router, private authenticationService: AuthenticationService, private userService: UserService) { }

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

  readonly login = () => {
    var userEmail = this.loginForm.controls['email'].value;
    this.authenticationService.login({
      "email" : this.loginForm.controls['email'].value , 
      "password" : this.loginForm.controls['password'].value})
      .subscribe( response => {
        localStorage.setItem("token", response.accessToken)
        this.router.navigate(['homepage'])
      }
    )
    this.userService.getUserByEmail(userEmail).subscribe( response => {
      console.log(response);
      localStorage.setItem("client", response.name + " " + response.surname)     
    })
  }
}
