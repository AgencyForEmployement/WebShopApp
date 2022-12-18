import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {

  constructor(private router: Router, private authenticationService : AuthenticationService) { }

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

  readonly registration = () => {
    this.authenticationService.register({
      "name" : this.registrationForm.controls['name'].value,
      "surname" : this.registrationForm.controls['surname'].value,
      "telephoneNumber" : this.registrationForm.controls['telephone'].value,
      "email" : this.registrationForm.controls['email'].value,
      "password" : this.registrationForm.controls['password'].value,
      "address" : {
        "country" : this.registrationForm.controls['country'].value,
        "city" : this.registrationForm.controls['city'].value,
        "street" : this.registrationForm.controls['street'].value,
        "number" : this.registrationForm.controls['number'].value,
      },
      "education" : this.registrationForm.controls['education'].value,
      "experience" : this.registrationForm.controls['experience'].value
    })
      .subscribe(
        response => {
          Swal.fire('Uspesno!', 'Uspesno ste se registrovali.', 'success');
        })
  }
}
