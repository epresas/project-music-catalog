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
  public user_register: User;
  public identity;
  public token;
  public errorMessage;

  public loginState: String = 'in';
  public registerState: String = 'out';

  constructor(
    private _userService: UserService
  ) {
    this.user = new User ('', '', '', '', '', 'ROLE_USER', '');
    this.user_register = new User ('', '', '', '', '', 'ROLE_USER', '');
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

    console.log(this.identity);
    console.log(this.token);

  }

  public onSubmit() {
    // Se consiguen los datos del usuario identificado.
    this._userService.logIn(this.user).subscribe(
      response => {
        const identity = response.user;
        this.identity = identity;
        if (!this.identity._id) {

          console.log('Error de identificación');

        } else {
          // crear elemento en localstorage para tener la sesion con el usuario
          // tslint:disable-next-line:max-line-length
          localStorage.setItem('identity', JSON.stringify(identity)); // Con esto guardamos en el localStorage el texto JSON del objeto identity que tiene el usuario devuelto por la api.

          // conseguir token para enviar a peticion http
              this._userService.logIn(this.user, 'true').subscribe(
                // tslint:disable-next-line:no-shadowed-variable
                response => {
                  const token = response.token;
                  this.token = token;
                  if (this.token.length <= 0) {

                    console.log('Token generado incorrectamente.');

                  } else {
                    // crear elemento en localstorage para tener el token disponible
                    localStorage.setItem('token', token);
                    // conseguir token para enviar a peticion http
                    // console.log(identity);
                    // console.log(token);
                  }

                },
                error => {
                  const errorMessage = <any>error;
                  if (errorMessage !== null) {
                    const body = JSON.parse(error._body); // esto extrae el error del body (enviado por la api)
                    this.errorMessage = body.message;
                    setTimeout(() => {
                      this.errorMessage = null;
                    }, 3000);
                    console.log(error);
                  }
                }
              );
        }

      },
      error => {
        const errorMessage = <any>error;
        if (errorMessage !== null) {
          const body = JSON.parse(error._body); // esto extrae el error del body (enviado por la api)
          this.errorMessage = body.message;
          setTimeout(() => {
            this.errorMessage = null;
          }, 3000);
          console.log(error);
        }
      }
    );
    // console.log(this.user);

  }

  public logOut() {
    localStorage.removeItem('identity'); // Eliminando por item específico
    localStorage.removeItem('token');
    localStorage.clear(); // Limpiando el localStorage completamente
    this.identity = null; // Asi queda vacío y carga el HTML del Login
    this.token = null;
  }

  onSubmitRegister() {
    console.log(this.user_register);

    this._userService.register(this.user_register).subscribe(
      response => {
        const user = response.user;
        this.user_register = user;

        if (!user._id) {
          console.log('Error de creación de usuario (onSubmitRegister).');
        } else {

          console.log('Usuario creado correctamente (onSubmitRegister).');
          this.user_register = new User('', '', '', '', '', 'ROLE_USER', '');

        }

      },
      error => {
        const errorMessage = <any>error;
        if (errorMessage !== null) {
          const body = JSON.parse(error._body); // esto extrae el error del body (enviado por la api)
          this.errorMessage = body.message;
          setTimeout(() => {
            this.errorMessage = null;
          }, 3000);
          console.log(error);
        }
      }
    );
  }

  // Metodos para animar los formularios de Login y Registro
  public toggleLogin() {

    this.loginState = this.loginState === 'out' ? 'in' : 'out';
    this.registerState = 'in';
  }
  public toggleRegister() {

    this.registerState = this.registerState === 'out' ? 'in' : 'out';
    this.loginState = 'in';
  }

} // Fin clase

