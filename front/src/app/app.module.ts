import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { UserService } from './services/user.service';


import { AppComponent } from './app.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';

@NgModule({
  declarations: [
	  AppComponent,
	  UserEditComponent
  ],
  imports: [
	  BrowserModule,
	  FormsModule,
	  BrowserAnimationsModule,
	  HttpModule,
	  HttpClientModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
