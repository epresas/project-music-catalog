import { ModuleWithProviders } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';

/* COMPONENTES */
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { ArtistListComponent } from './components/artist-list/artist-list.component';
import { ArtistAddComponent } from './components/artist-add/artist-add.component';
import { ArtistEditComponent } from './components/artist-edit/artist-edit.component';
import { ArtistDetailComponent } from './components/artist-detail/artist-detail.component';
import { HomeComponent } from './components/home/home.component';
import { AlbumAddComponent } from './components/album-add/album-add.component';



const appRoutes: Routes = [

	{path: '', component: HomeComponent},
	{path: 'artists/1', component: ArtistListComponent},
	{
		path: 'artists/:page',
		component: ArtistListComponent,
		data: {imageUrl: '/app/assets/images/hero-02.png'}
	},
	{path: 'add-artist', component: ArtistAddComponent},
	{path: 'add-album/:artist', component: AlbumAddComponent},
	{path: 'artist/:id', component: ArtistDetailComponent},
	{path: 'edit-artist/:id', component: ArtistEditComponent},
	{path: 'user-data', component: UserEditComponent},
	{path: '**', component: HomeComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
