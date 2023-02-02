import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { PaymentService } from './payment.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {
  paymentForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z_ ]*$')]),
    surname: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z_ ]*$')]),
    address: new FormControl('', [Validators.required, Validators.pattern('/^[a-zA-Z0-9 ,.-]{3,}$/ .')]),
    securityCode: new FormControl('', [Validators.required, Validators.pattern('^[1-9]{3,4}')]), //cvv
    cardHolderName: new FormControl('', [Validators.required, Validators.pattern('^((?:[A-Za-z]+ ?){1,3})$')]),
    dateExpiration: new FormControl('', [Validators.required, Validators.pattern('(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})')]),
    pan: new FormControl('', [Validators.required, Validators.pattern('[0-9]{4}[ ][0-9]{4}[ ][0-9]{4}[ ][0-9]{4}')])
    // pan: new FormControl('', [Validators.required, 
    //   Validators.pattern('^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$')]),

  })
  constructor(private paymentService: PaymentService, private cookieService: CookieService) { }

  ngOnInit(): void {
  }

  pay(){
    this.paymentService.payWithCreditCard(
      {
        "paymentId" : this.cookieService.get('paymentId'),
        "pan" : this.paymentForm.controls['pan'].value?.toString(),
        "securityCode" : this.paymentForm.controls['securityCode'].value?.toString(),
        "cardHolderName" : this.paymentForm.controls['cardHolderName'].value?.toString(),
        "dateExpiration": this.paymentForm.controls['dateExpiration'].value?.toString(),
        "description": this.cookieService.get('description')?.toString(),
        "amount" : this.cookieService.get('amount')?.toString(),
        "successUrl": this.cookieService.get('successUrl')?.toString(),
        "failedUrl" : this.cookieService.get('failedUrl')?.toString(),
        "errorUrl" : this.cookieService.get('errorUrl')?.toString(),
      }
    ).subscribe(
      response => {
        alert(response.data)
        window.location.href = response;
      }
    );
  }

}
