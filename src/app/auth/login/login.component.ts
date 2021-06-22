import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

// ****************** THIRD PARTY PACKAGES *********************** //

import Swal from 'sweetalert2';

// *************************** INTERFACE ************************** //

import { UsuarioService } from '../../services/usuario.service';

// **************************************************************** //

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent {

  public fomrSubmitted = false;

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

}
