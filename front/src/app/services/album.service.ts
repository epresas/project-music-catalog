import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable'; // actualizacion a angular 6
import { GLOBAL } from './global';
import { Album } from '../models/album';
import { headersToString } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  public url: string;


  constructor(private _http: Http) {
	this.url = GLOBAL.url;
  }

  addAlbum(token, album: Album) {
	let params = JSON.stringify(album);
	let headers = new Headers({
		'Content-Type': 'application/json',
		'Authorization': token
	});

	return this._http.post(this.url + 'album', params, { headers: headers })
		.pipe(map(res => res.json()));
  }

  editAlbum(token, id: string, album: Album) {
	let params = JSON.stringify(album);
	let headers = new Headers({
		'Content-Type': 'application/json',
		'Authorization': token
	});

	return this._http.put(this.url + 'album/' + id, params, { headers: headers })
		.pipe(map(res => res.json()));
  }

//   // Obtener todos los albums
//   getAlbums(token, artistId) {
// 	let headers = new Headers({
// 		'Content-Type': 'application/json',
// 		'Authorization': token
// 	});

// 	let options = new RequestOptions({ headers: headers });
// 	return this._http.get(this.url + 'albums/' + artistId, options).pipe(map(res => res.json()));
//   }

//   // Obtener un solo album basado en su id
//   getAlbum(token, id: string) {
// 	let headers = new Headers({
// 		'Content-Type': 'application/json',
// 		'Authorization': token
// 	});

// 	let options = new RequestOptions({ headers: headers });
// 	return this._http.get(this.url + 'album/' + id, options).pipe(map(res => res.json()));
//   }

//   deleteAlbum(token, id: string) {
// 	let headers = new Headers({
// 		'Content-Type': 'application/json',
// 		'Authorization': token
// 	});

// 	let options = new RequestOptions({ headers: headers });
// 	return this._http.delete(this.url + 'album/' + id, options).pipe(map(res => res.json()));
//   }

}
