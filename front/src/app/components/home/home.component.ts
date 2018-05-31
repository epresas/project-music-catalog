import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	public titulo: string;

	constructor(
		// asignacion de servicios en variables privadas
		private _route: ActivatedRoute,
		private _router: Router,
	) {

	}

	ngOnInit() {
		this.titulo = 'HOME';
	}

}
