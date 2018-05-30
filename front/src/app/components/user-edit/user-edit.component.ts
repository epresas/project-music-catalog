import { Component, OnInit } from '@angular/core';
import {  GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})

export class UserEditComponent implements OnInit {
	public titulo: string;
	public user: User;
  	public identity;
	public token;
	public successMessage;
	public errorMessage;
	public filesToUpload: Array<File>;
	public url: string;

  	constructor(
		private _userService: UserService
	  ) {
			this.titulo = 'Update data';
			// localStorage = > pasar al OnInit
			this.identity = this._userService.getIdentity();
			this.token = this._userService.getToken();
			this.user = this.identity;
			this.url = GLOBAL.url;
	  }

  	ngOnInit() {

	  }

	onSubmit() {
		console.log(this.token);
		this._userService.updateUser(this.user).subscribe(
			response => {

				//  if (!response.user) {
				//  	console.log('Error de actualizacion de usuario (onSubmit).');
				//  	// this.errorMessage = 'Failed to update.';
				//  } else {

					console.log(response);
					this.user = response;
					localStorage.setItem('identity', JSON.stringify(this.user));
					document.getElementById('identity_name').innerHTML = this.user.name;
					if (!this.filesToUpload) {
						// Redirect
					} else {
						this.requestFile(this.url + '/user-upload-avatar/' + this.user._id, [], this.filesToUpload).then(
							(result: any) => {
								// this.user.image = result.image;
								localStorage.setItem('identity', JSON.stringify(this.user));
								let imagePath = this.url + 'user-get-avatar/' + this.user.image;
								document.getElementById('user-image').setAttribute('src', imagePath);
							}
						).catch(e => {
							console.log(e);
						});
					}
					// tslint:disable-next-line:max-line-length
					this.successMessage = 'Update successful!';
					setTimeout(() => {
						this.successMessage = null;
					}, 3000);
					console.log('Usuario actualizado correctamente (onSubmit).');
					// this.user = new User('', '', '', '', '', 'ROLE_USER', '');

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
