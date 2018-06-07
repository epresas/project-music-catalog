import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { ArtistService } from '../../services/artist.service';
import { AlbumService } from '../../services/album.service';
import { Artist } from '../../models/artist';
import { Album } from '../../models/album';

@Component({
	selector: 'app-album-add',
	templateUrl: './album-add.component.html',
	styleUrls: ['./album-add.component.css'],
	providers: [
		UserService,
		ArtistService,
		AlbumService
	]
})
export class AlbumAddComponent implements OnInit {

	public titulo: string;
	public artist: Artist;
	public album: Album;
	public identity;
	public token;
	public url: string;
	public errorMessage: string;
	public successMessage: string;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _artistService: ArtistService,
		private _albumService: AlbumService
	) {
		this.titulo = 'Add album';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
		this.album = new Album('', '', 2017, '', '');
		this.errorMessage = '';
		this.successMessage = '';
	 }

	ngOnInit() {

	}

	onSubmit() {
		// sacar de la url el id del artista
		this._route.params.forEach((params: Params) => {
			let artist_id = params['artist'];
			this.album.artist = artist_id;
			console.log(this.album);

			this._albumService.addAlbum(this.token, this.album).subscribe(
				response => {
					if (!response) {
						console.log('Error creando album.');
					} else {
						this.album = response;
						this.successMessage = 'Album created!';
						console.log('Correcto (onSubmit)', response);
						// this._router.navigate(['/edit-album/', response._id]);
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
		});
	}

}
