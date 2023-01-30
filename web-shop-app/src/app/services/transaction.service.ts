import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Transaction } from '../models/Transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private readonly baseUri = `${environment.apiUrl}/transactions`;

  constructor(private _http: HttpClient) { }

  createTransaction(){
    return this._http.get<any>(`${this.baseUri}/transaction`,{headers: this.headers()})
  }
  getAllTransactions(){
    return this._http.get<any>(this.baseUri,{headers: this.headers()})
  }

  private readonly headers = () => {
    return new HttpHeaders({ Authorization: "Bearer " + localStorage.getItem("token") });
  }
}
