import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { ArtistService } from '../../services/artist.service';
import { UploadService } from '../../services/upload.service';
import { Artist } from '../../models/artist';

@Component({
	selector: 'app-artist-edit',
	// Se implementará en el mismo componente de añadir solo que agregando un campo más al formulario
	templateUrl: '../artist-add/artist-add.component.html',
	styleUrls: ['../artist-add/artist-add.component.css'],
	providers: [
		UserService,
		ArtistService,
		UploadService
	]
})

export class ArtistEditComponent implements OnInit {

	public titulo: string;
	public artist: Artist;
	public identity;
	public token;
	public url: string;
	public errorMessage: string;
	public successMessage: string;
	public is_edit;
	public filesToUpload: Array<File>;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _artistService: ArtistService,
		private _uploadService: UploadService
	) {
		this.titulo = 'Edit Artist';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
		this.artist = new Artist('', '', '');
		this.errorMessage = '';
		this.successMessage = '';
		this.is_edit = 'true';
	}

	ngOnInit() {
		this.getArtist();
	}
	public getArtist() {
		this._route.params.forEach((params: Params) => {
			let id = params['id'];

			this._artistService.getArtist(this.token, id).subscribe(
				response => {
					if (!response) {
						this._router.navigate(['/']);
					} else {
						this.artist = response;
					}
				},
				error => {
					let errorMessage = <any>error;
					if (errorMessage !== null) {
						let body = JSON.parse(error._body); // esto extrae el error del body (enviado por la api)
						this.errorMessage = body.message;
						setTimeout(() => {
							this.errorMessage = null;
						}, 3000);
						console.log(error);
					}
				}
			);
		});
	}
	public onSubmit() {
		this._route.params.forEach((params: Params) => {
			let id = params['id'];
			this._artistService.editArtist(this.token, id, this.artist).subscribe(
				response => {
					// if (!response.artist) {
					// 	console.log('Error creando artista.');
					// } else {
						// this.artist = response;
					this._uploadService.requestFile(this.url + 'artist-upload-image/' + id, [], this.filesToUpload, this.token, 'image')
						.then(
							(result) => {
								this._router.navigate(['/artists', 1]);
							},
							(error) => {
								console.log(error);
							}
						);
					console.log('Actualizado.');
					this.successMessage = 'Artist updated!';
					console.log('Artist: ', this.artist);
					setTimeout(() => {
						this.successMessage = null;
					}, 3000);
					this._router.navigate(['/artists', 1]);

					// }
				},
				error => {
					let errorMessage = <any>error;
					if (errorMessage !== null) {
						let body = JSON.parse(error._body); // esto extrae el error del body (enviado por la api)
						this.errorMessage = body.message;
						setTimeout(() => {
						this.errorMessage = null;
						}, 3000);
						console.log(error);
					}
				}
			);
		});

	}

	fileChangeEvent(fileInput: any) {
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}

	requestFile(url: string, params: Array<string>, files: Array<File>) {
		let token = this._userService.getToken();

		return new Promise((resolve, reject) => {
			let formData: any = new FormData();
			let xhr = new XMLHttpRequest();
			for (let i = 0; i < files.length; i++) {
				formData.append('image', files[i], files[i].name);
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


}

