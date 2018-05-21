import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { User } from './models/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('loginState', [
      state('out', style({
        transform: 'translateY(-200%)',
        opacity: 0
      })),
      state('in', style({
        transform: 'translateY(0)',
        opacity: 1
      })),
      transition('out => in', animate('600ms ease-in')),
      transition('in => out', animate('600ms ease-out'))
    ]),
    trigger('registerState', [
      state('out', style({
        transform: 'translateY(-200%)',
        opacity: 0
      })),
      state('in', style({
        transform: 'translateY(0)',
        opacity: 1
      })),
      transition('out => in', animate('600ms ease-in')),
      transition('in => out', animate('600ms ease-out'))
    ])
  ]
})

export class AppComponent {
  public title = 'app';
  public user = User;
  public identity;
  public token;

  public loginState: String = 'in';
  public registerState: String = 'out';

  toggleLogin() {

    this.loginState = this.loginState === 'out' ? 'in' : 'out';
    this.toggleRegister();
  }
  toggleRegister() {
    // if (this.registerState === 'in') {
    //   this.registerState = 'out';
    //   this.loginState = 'in';
    // }
    this.registerState = this.registerState === 'out' ? 'in' : 'out';
    this.toggleLogin();
  }

  // this.loginState = this.loginState === 'out' ? 'in' : 'out';
  // this.registerState = this.loginState === 'out' ? 'in' : 'out';
}

