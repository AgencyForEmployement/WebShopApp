import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/app/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { throwToolbarMixedModesError } from '@angular/material';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  constructor(private cookieService: CookieService) { }

  order = {price: "11", description: "Desc", merchantOrderId: ""}
  orderCard = {price: "11", description: "Desc", merchantOrderId: "", pib: "", merchantOrderTimestamp:""}
  data = {
    merchantOrderId: "",
    title: "Crypto payment", 
    priceAmount: 10,//this.order.price, 
    priceCurrency: "EUR", 
    receiveCurrency: "EUR", 
    callbackUrl: "https://nine-beers-stick-194-28-129-38.loca.lt/bitcoin/paymentCompleted",
    successUrl: environment.webUrl + "/homepage", //bice sajt naseg web stora
    cancelUrl: environment.webUrl + "/homepage", 
    orderId: "",
    description: "Premium Package"//this.order.description
}
options = {card: false, qr: false, paypal: false, bitcoin: false}
client = ""
  

  ngOnInit(): void {
      this.order.price = this.cookieService.get('price')
      this.order.description = this.cookieService.get('description')
      this.order.merchantOrderId = this.cookieService.get('merchantOrderId')
      
      this.orderCard.price = this.cookieService.get('price')
      this.orderCard.description = this.cookieService.get('description')
      this.orderCard.merchantOrderId = this.cookieService.get('merchantOrderId')
      this.orderCard.pib = this.cookieService.get('pib')
      this.orderCard.merchantOrderId = this.cookieService.get('merchantOrderId')
      this.orderCard.merchantOrderTimestamp = this.cookieService.get('merchantOrderTimestamp')
      this.client = this.cookieService.get('client')
      axios.get(environment.apiUrl + "/authentication/getPayments")
      .then(response => {
        this.options.card = response.data.card
        this.options.qr = response.data.qr
        this.options.paypal = response.data.paypal
        this.options.bitcoin = response.data.bitcoin
    })
    .catch(e => {
     console.log(e.response.data)
    })
      console.log(this.order.price)
  }

  randomString(length:number, chars:string) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

  payWithPayPal() {
    if (this.order.price != "" && this.order.description != "" && this.order.merchantOrderId != ""){
    axios.post(environment.apiUrl + '/transactions/paypal', this.order, { 
      headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
    .then(response => {
      //this.cookieService.delete('description')
      //this.cookieService.delete('price')
      window.location.href = response.data;
    })
    .catch(e => {
     console.log(e.response.data)
    })
  } else 
    alert("Payment not possible, you were not redirected here.")
  }

  bitcoinPayment() {
    this.data.orderId = this.randomString(10, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    this.data.merchantOrderId = this.cookieService.get('merchantOrderId')
    axios.post(environment.apiUrl + '/transactions/bitcoin', this.data, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
        }
    })
    .then(response => {
      //this.cookieService.delete('description')
      //this.cookieService.delete('price')
      console.log(response.data)
      window.location.href = response.data;
    })
    .catch(e => {
     console.log(e.response)
    })
  }
  payWithCreditCard(){
    if (this.orderCard.price != "" && this.orderCard.description != ""){
      axios.post(environment.PSPAPI + 'bank', this.orderCard)
      .then(response => {
        document.cookie = 'paymentId =' + response.data.paymentId.toString();
        document.cookie = 'description =' + this.orderCard.description.toString();
        document.cookie = 'amount =' + response.data.amount.toString();
        document.cookie = 'successUrl =' + response.data.successUrl.toString();
        document.cookie = 'failedUrl =' + response.data.failedUrl.toString();
        document.cookie = 'errorUrl =' + response.data.errorUrl.toString();
        window.location.href = response.data.paymentURL;
      })
      .catch(e => {
       console.log(e.response.data)
      })
    } else 
      alert("Payment not possible, you were not redirected here.")
  }
  payWithQRCode() {
    console.log(this.orderCard);
    if (this.orderCard.price != "" && this.orderCard.description != ""){
      console.log(this.orderCard);
      axios.post(environment.PSPAPI + 'bank', this.orderCard)
      .then(response => {
        document.cookie = 'paymentId =' + response.data.paymentId.toString();
        document.cookie = 'description =' + this.orderCard.description.toString();
        document.cookie = 'amount =' + response.data.amount.toString();
        document.cookie = 'successUrl =' + response.data.successUrl.toString();
        document.cookie = 'failedUrl =' + response.data.failedUrl.toString();
        document.cookie = 'errorUrl =' + response.data.errorUrl.toString();
        document.cookie = 'client=' + this.client;
        console.log(response);
        console.log(document.cookie)
        window.open('http://localhost:4203/qr-code', "_blank");
      })
      .catch(e => {
       console.log(e)
      })
    } else 
      alert("Payment not possible, you were not redirected here.")    
  }

  getPayments() {

  }
}
