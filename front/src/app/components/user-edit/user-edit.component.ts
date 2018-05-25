import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

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

  	constructor(
		private _userService: UserService
	  ) {
			this.titulo = 'Update data';
			// localStorage
			this.identity = this._userService.getIdentity();
			this.token = this._userService.getToken();
			this.user = this.identity;
	  }

  	ngOnInit() {

	  }

	onSubmit() {
		// this.user = user;
		console.log(this.user);

		this._userService.updateUser(this.user).subscribe(
			response => {
				// if (!response.user) {
				// 	console.log('Error de actualizacion de usuario (onSubmit).');
				// 	this.errorMessage = 'Failed to update.';
				// } else {
					console.log(response);
					this.user = response;
					localStorage.setItem('identity', JSON.stringify(this.user));
					// tslint:disable-next-line:max-line-length
					this.successMessage = 'Update successful!';
					setTimeout(() => {
						this.successMessage = null;
					}, 3000);
					console.log('Usuario actualizado correctamente (onSubmit).');
					this.user = new User('', '', '', '', '', 'ROLE_USER', '');

				// }

			},
			error => {
				const errorMessage = <any>error;
				if (errorMessage !== null) {
					const body = JSON.parse(error._body); // esto extrae el error del body (enviado por la api)
					this.errorMessage = body.message;
					setTimeout(() => {
						this.errorMessage = null;
					}, 3000);
					console.log(error);
				}
			}
		);
	}
}
