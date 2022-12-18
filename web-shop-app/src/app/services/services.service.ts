import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private readonly baseUri = `${environment.apiUrl}/service`;
  private readonly headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem("token"), 
  }

  constructor(private _http: HttpClient) { }

  getAll(){
    return this._http.get<any[]>(this.baseUri, {"headers": this.headers})
  }

}
