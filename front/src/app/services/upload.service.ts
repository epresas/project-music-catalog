import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable'; // actualizacion a angular 6
import { GLOBAL } from './global';
import { User } from '../models/user';
import { Artist } from '../models/artist';
import { headersToString } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
	public url: string;


	constructor(private _http: Http) {
	this.url = GLOBAL.url;
	}


	requestFile(url: string, params: Array<string>, files: Array<File>, token: string, imageName: string) {


		return new Promise((resolve, reject) => {
			let formData: any = new FormData();
			let xhr = new XMLHttpRequest();
			for (let i = 0; i < files.length; i++) {
				formData.append(imageName, files[i], files[i].name);
			}
			xhr.open('POST', url, true);
			xhr.setRequestHeader('Authorization', token);
			xhr.send(formData);
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						resolve(JSON.parse(xhr.response));
					} else {
						reject(xhr.response);
					}
				}
			};
		});
	}



} // End UploadService
