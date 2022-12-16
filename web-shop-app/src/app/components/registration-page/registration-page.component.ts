import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  registrationForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required ]),
    name: new FormControl('', [Validators.email, Validators.required ]),
    surname: new FormControl('', [Validators.email, Validators.required ]),
    telephone: new FormControl('', [Validators.email, Validators.required ]),
    password: new FormControl('', [Validators.required, Validators.min(3) ]),
    confirmPassword: new FormControl('', [Validators.required, Validators.min(3) ]),
    education: new FormControl('', [Validators.required, Validators.min(3) ]),
    experience: new FormControl('', [Validators.required, Validators.min(3) ]),
    street: new FormControl('', [Validators.required, Validators.min(3) ]),
    number: new FormControl('', [Validators.required, Validators.min(3) ]),
    city: new FormControl('', [Validators.required, Validators.min(3) ]),
    country: new FormControl('', [Validators.required, Validators.min(3) ]),
  });
  hide = true;
  get emailInput() { return this.registrationForm.get('email'); }
  get passwordInput() { return this.registrationForm.get('password'); }  

  readonly getEmailErrorMessage = () => {
    if (this.registrationForm.controls['email'].hasError('required')) {
      return 'You must enter email';
    }
    return this.registrationForm.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }
  readonly getRequredMessage = () => {
    if (this.registrationForm.controls['email'].hasError('required')) {
      return 'You must enter email';
    }
    return this.registrationForm.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }

  readonly registration = () => this.router.navigate(['homepage'])
}
