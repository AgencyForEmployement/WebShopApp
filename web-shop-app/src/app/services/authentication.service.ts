import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly baseUri = `${environment.apiUrl}/authentication`;

  constructor(private _http: HttpClient) { }

  login(loginInfo : any){
    return this._http.post<any>(this.baseUri + "/login", loginInfo)
  }

  register(userInfo : any){
    return this._http.post<any>(this.baseUri + "/register", userInfo)
  }

}
