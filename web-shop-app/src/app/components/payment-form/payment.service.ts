import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private _http: HttpClient) { }

  payWithCreditCard(card: any){
    return this._http.post<any>("http://localhost:8083/payment/withCard", card);
  }
}
