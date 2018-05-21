import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
// import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url: string;

  constructor(private _http: Http) {
    this.url = GLOBAL.url;
   }

   signUp(logged_user, gethash = null) {
    let json = JSON.stringify(logged_user);
    let params = json;

    let headers = new Headers({'Content-Type': 'application/json'});

    return this._http.post(this.url + 'login', params, { headers: headers })
                     .map(res => res.json());

   }
}
