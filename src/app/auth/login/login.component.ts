import { Component, OnInit } from '@angular/core';
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
    private usuarioService: UsuarioService
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

    //this.router.navigateByUrl('/');

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

  startApp(): void {

    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '896472125944-1j07djaqrtgnqbsvkoo0ns6knev33rk5.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
      this.attachSignin(document.getElementById('my-signin2'));
    });

  }

  attachSignin(element): void {
    console.log(element.id);
    this.auth2.attachClickHandler( element, {},

        (googleUser) => {

          const id_token = googleUser.getAuthResponse().id_token;
          console.log( id_token );
          this.usuarioService.loginGoogle( id_token ).subscribe();

          // TODO: REDIRECTO TO DASHBOARD;
        },
        (error) => {
          alert(JSON.stringify(error, undefined, 2));
        }

    );
  }

}
