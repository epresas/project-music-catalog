import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable'; // actualizacion a angular 6
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url: string;
  public identity;
  public token;

  constructor(private _http: Http) {
	this.url = GLOBAL.url;
   }

   logIn(logged_user, gethash = null) {
		if (gethash != null) {
		logged_user.gethash = gethash;
		}
		const json = JSON.stringify(logged_user);
		const params = json;

		const headers = new Headers({'Content-Type': 'application/json'});

		return this._http.post(this.url + 'login', params, { headers: headers }).pipe(map(res => res.json()));

   }

	register(registered_user) {
		const json = JSON.stringify(registered_user);
		const params = json;

		const headers = new Headers({ 'Content-Type': 'application/json' });

		return this._http.post(this.url + 'user', params, { headers: headers }).pipe(map(res => res.json()));
   }

   updateUser(updated_user) {
		const json = JSON.stringify(updated_user);
		const params = json;

		const headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization': this.getToken() // Para comprobar el usuario con el token (el token pedido es del localStorage)
		});

		return this._http.put(this.url + 'user/' + updated_user._id, params, { headers: headers }).pipe(map(res => res.json()));
   }

	getIdentity() {
		const identity = JSON.parse(localStorage.getItem('identity'));

		if (identity !== 'undefined') {
			this.identity = identity;
		} else {
			this.identity = null;
		}

		return this.identity;
	}

	getToken() {
		const token = localStorage.getItem('token');

		if (token !== 'undefined') {
			this.token = token;
		} else {
			this.token = null;
		}

		return this.token;
	}


}
