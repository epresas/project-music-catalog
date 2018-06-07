import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

/* CUSTOM SERVICES */
import { UserService } from './services/user.service';
import { ArtistService } from './services/artist.service';
import { AlbumService } from './services/album.service';
import { UploadService } from './services/upload.service';

/* CUSTOM COMPONENTS */
import { routing, appRoutingProviders } from './app.routing';
import { AppComponent } from './app.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { ArtistListComponent } from './components/artist-list/artist-list.component';
import { HomeComponent } from './components/home/home.component';
import { ArtistAddComponent } from './components/artist-add/artist-add.component';
import { ArtistEditComponent } from './components/artist-edit/artist-edit.component';
import { ArtistDetailComponent } from './components/artist-detail/artist-detail.component';
import { AlbumAddComponent } from './components/album-add/album-add.component';

@NgModule({
  declarations: [
	  AppComponent,
	  UserEditComponent,
	  ArtistListComponent,
	  HomeComponent,
	  ArtistAddComponent,
	  ArtistEditComponent,
	  ArtistDetailComponent,
	  AlbumAddComponent,
  ],
  imports: [
	  BrowserModule,
	  FormsModule,
	  BrowserAnimationsModule,
	  HttpModule,
	  HttpClientModule,
	  routing,
  ],
  providers: [
	  UserService,
	  appRoutingProviders,
	  ArtistService,
	  UploadService,
	  AlbumService

],
  bootstrap: [AppComponent]
})
export class AppModule { }
