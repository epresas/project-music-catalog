import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { ArtistService } from '../../services/artist.service';
import { Artist } from '../../models/artist';


@Component({
	selector: 'app-artist-add',
	templateUrl: './artist-add.component.html',
	styleUrls: ['./artist-add.component.css'],
	providers: [
		UserService,
		ArtistService
	]
})

export class ArtistAddComponent implements OnInit {

	public titulo: string;
	public artist: Artist;
	public identity;
	public token;
	public url: string;
	public errorMessage: string;
	public successMessage: string;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _artistService: ArtistService
	) {
		this.titulo = 'Add Artist';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
		this.artist = new Artist('', '', '');
		this.errorMessage = '';
		this.successMessage = '';
	 }

	ngOnInit() {
	}

	public onSubmit() {
		// console.log(this.artist);
		this._artistService.addArtist(this.token, this.artist).subscribe(
			response => {
				if (!response) {
					console.log('Error creando artista.');
				} else {
					this.artist = response;
					this.successMessage = 'Artist created!';
					console.log('Correcto (onSubmit)', response);
					this._router.navigate(['/edit-artist/', response._id]);
					setTimeout(() => {
						this.successMessage = null;
					}, 3000);

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

	}



}
