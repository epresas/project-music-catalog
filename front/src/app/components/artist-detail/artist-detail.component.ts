import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { ArtistService } from '../../services/artist.service';
import { Artist } from '../../models/artist';

@Component({
	selector: 'app-artist-detail',
	templateUrl: './artist-detail.component.html',
	providers: [
		UserService,
		ArtistService
	],
	styleUrls: ['./artist-detail.component.css']
})
export class ArtistDetailComponent implements OnInit {

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

		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
		this.errorMessage = '';
		this.successMessage = '';

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
						// mostrar albums
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

}
