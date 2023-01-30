import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { ShoppingChart } from '../models/ShoppingCart.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingChartService {
  private readonly baseUri = `${environment.apiUrl}/shopping-cart`;
  constructor(private _http: HttpClient) { }

   addServiceToCart (service: any){
    return this._http.post<ShoppingChart>(this.baseUri, service, {headers: this.headers()})
  }

   removeServiceFromCart (id: any){
    return this._http.delete<ShoppingChart>(`${this.baseUri}/service/`+ id, {headers: this.headers()} )
  }

   getUserCart  () {
    return this._http.get<ShoppingChart>(this.baseUri, {headers: this.headers()})
  }

  private readonly headers = () => {
    return new HttpHeaders({ Authorization: "Bearer " + localStorage.getItem("token") });
  }
}
