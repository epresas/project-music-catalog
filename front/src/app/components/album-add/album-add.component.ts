import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { ArtistService } from '../../services/artist.service';
import { Artist } from '../../models/artist';
import { Album } from '../../models/album';

@Component({
	selector: 'app-album-add',
	templateUrl: './album-add.component.html',
	styleUrls: ['./album-add.component.css'],
	providers: [
		UserService,
		ArtistService
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
		private _artistService: ArtistService
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

}
