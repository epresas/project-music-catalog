import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { ArtistService } from '../../services/artist.service';
import { Artist } from '../../models/artist';


@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css'],
	providers: [
		UserService, ArtistService
	]
})
export class ArtistListComponent implements OnInit {

	public titulo: string;
	public artists: Artist[];
	public identity;
	public token;
	public url: string;
	public prev_page;
	public next_page;
	public errorMessage: string;
	public successMessage: string;


  constructor(
	  // asignacion de servicios en variables privadas
	  private _route: ActivatedRoute,
	  private _router: Router,
	  private _userService: UserService,
	  private _artistService: ArtistService,
  ) {
	  this.titulo = 'Artists';
	  this.identity = this._userService.getIdentity();
	  this.token = this._userService.getToken();
	  this.url = GLOBAL.url;
	  this.prev_page = 1;
	  this.next_page = 1;
	  this.errorMessage = '';
	  this.successMessage = '';
   }

	ngOnInit() {
		// Obtener el listado de artistas una vez cargado el componente
		this.getArtists();

	}
	getArtists() {
		this._route.params.forEach((params: Params) => {
			let page = +params['page'];
			if (!page) {
				page = 1;
				this.next_page = page + 1; // añadido extra porque por alguna razon page empieza siendo NaN y asi no se rompe el flujo de paginación
				this.prev_page = page - 1;
			} else {
				this.next_page = page + 1;
				this.prev_page = page - 1;
				// forzar que siempre la minima pagina sea 1
				if (this.prev_page === 0) {
					this.prev_page = 1;
				}
			}
			this._artistService.getArtists(this.token, page).subscribe(
				response => {
					if (!response.artists) {
						this._router.navigate(['/']);
					} else {
						this.artists = response.artists;
						console.log(this.artists);
					}
				},
				error => {
					let errorMessage = <any>error;
					if (errorMessage !== null) {
						let body = JSON.parse(error._body); // esto extrae el error del body (enviado por la api)

						console.log(error);
					}
				}
			);
		});
	}

}
