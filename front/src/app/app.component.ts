import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { User } from './models/user';
import { UserService } from './services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService],
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

export class AppComponent implements OnInit {
  public title = 'app';
  public user: User;
  public identity;
  public token;

  public loginState: String = 'in';
  public registerState: String = 'out';

  constructor(
    private _userService: UserService
  ) {
    this.user = new User ('', '', '', '', '', 'ROLE_USER', '');
  }

  ngOnInit() {
    
  }

  public onSubmit() {

    console.log(this.user);

  }

  toggleLogin() {

    this.loginState = this.loginState === 'out' ? 'in' : 'out';
    this.registerState = 'in';
  }
  toggleRegister() {

    this.registerState = this.registerState === 'out' ? 'in' : 'out';
    this.loginState = 'in';
  }

} // Fin clase

