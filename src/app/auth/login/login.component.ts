import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

// ****************** THIRD PARTY PACKAGES *********************** //

import Swal from 'sweetalert2';

// *************************** INTERFACE ************************** //

import { UsuarioService } from '../../services/usuario.service';

// **************************************************************** //

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  public fomrSubmitted = false;

  public auth2: any;

  public loginForm = this.fb.group({

    email: [ localStorage.getItem('email') || '' , [ Validators.required, Validators.email ] ],
    password: [ '', Validators.required ],
    remember: [false]

  }) ;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private ngZone: NgZone
     ) { }

  ngOnInit(): void {
    this.renderButton();
  }


  login(): void {

    this.usuarioService.loginUsuario( this.loginForm.value )
      .subscribe(

        resp => {

          if ( this.loginForm.get( 'remember' ).value ) {

            localStorage.setItem( 'email', this.loginForm.get( 'email').value );


          } else {

            localStorage.removeItem( 'email' );

          }

          // NAVIGATE TO DASHBOARD;
          this.router.navigateByUrl('/');

        },

        ( err ) => {

          // IF AN ERROR OCCURS
          Swal.fire({
            title: 'Error!',
            text: `${err.error.msg}`,
            icon: 'error',
            confirmButtonText: 'Ok'
          });

        }

      );
    //console.log( this.loginForm.value );

  }

  renderButton(): void {

    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark'
    });

    this.startApp();

  }

  async startApp(): Promise<void> {

    await this.usuarioService.googleInit();

    this.auth2 = this.usuarioService.auth2;

    this.attachSignin(document.getElementById('my-signin2'));

  }

  attachSignin(element): void {
    console.log(element.id);
    this.auth2.attachClickHandler( element, {},

        (googleUser) => {

          const id_token = googleUser.getAuthResponse().id_token;
          console.log( id_token );
          this.usuarioService.loginGoogle( id_token ).subscribe(

            resp => {

              this.ngZone.run(

                () => {

                  // NAVIGATE TO DASHBOARD;
                  this.router.navigateByUrl('/');

                }

              );

            }

          );

        },
        (error) => {
          alert(JSON.stringify(error, undefined, 2));
        }

    );
  }

}
