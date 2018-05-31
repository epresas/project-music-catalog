import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { UserService } from './services/user.service';

import { routing, appRoutingProviders } from './app.routing';
import { AppComponent } from './app.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { ArtistListComponent } from './components/artist-list/artist-list.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
	  AppComponent,
	  UserEditComponent,
	  ArtistListComponent,
	  HomeComponent,
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
],
  bootstrap: [AppComponent]
})
export class AppModule { }
