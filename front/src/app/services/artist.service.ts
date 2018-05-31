import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable'; // actualizacion a angular 6
import { GLOBAL } from './global';
import { Artist } from '../models/artist';
import { headersToString } from 'selenium-webdriver/http';

@Injectable({
  	providedIn: 'root'
})
export class ArtistService {
	public url: string;


	constructor(private _http: Http) {
	this.url = GLOBAL.url;
	}

	addArtist(token, artist: Artist) {
		let params = JSON.stringify(artist);
		let headers = new Headers({
			'Content-Type': 'aplication/json',
			'Authorization': token
		});

		return this._http.post(this.url + 'artist', params, {headers: headers})
						 .pipe(map(res => res.json()));
	}

}
