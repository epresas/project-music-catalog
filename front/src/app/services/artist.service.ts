import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
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
			'Content-Type': 'application/json',
			'Authorization': token
		});

		return this._http.post(this.url + 'artist', params, { headers: headers })
			.pipe(map(res => res.json()));
	}

	editArtist(token, id: string, artist: Artist) {
		let params = JSON.stringify(artist);
		let headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization': token
		});

		return this._http.put(this.url + 'artist/' + id, params, {headers: headers})
		.pipe(map(res => res.json()));
	}

	// Obtener todos los artistas
	getArtists (token, page) {
		let headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization': token
		});

		let options = new RequestOptions({headers: headers});
		return this._http.get(this.url + 'artists/' + page, options).pipe(map(res => res.json()));
	}

	// Obtener un solo artista basado en su id
	getArtist (token, id: string) {
		let headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization': token
		});

		let options = new RequestOptions({headers: headers});
		return this._http.get(this.url + 'artist/' + id, options).pipe(map(res => res.json()));
	}

	deleteArtist (token, id: string) {
		let headers = new Headers({
			'Content-Type': 'application/json',
			'Authorization': token
		});

		let options = new RequestOptions({headers: headers});
		return this._http.delete(this.url + 'artist/' + id, options).pipe(map(res => res.json()));
	}

}
