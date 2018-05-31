import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { Artist } from '../../models/artist';


@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css'],
  providers: [UserService]
})
export class ArtistListComponent implements OnInit {

	public titulo: string;
	public artists: Artist[];
	public identity;
	public token;
	public url: string;


  constructor(
	  // asignacion de servicios en variables privadas
	  private _route: ActivatedRoute,
	  private _router: Router,
	  private _userService: UserService
  ) {
	  this.titulo = 'Artists';
	  this.identity = this._userService.getIdentity();
	  this.token = this._userService.getToken();
	  this.url = GLOBAL.url;
   }

	ngOnInit() {
		// Obtener el listado de artistas una vez cargado el componente

	}

}
