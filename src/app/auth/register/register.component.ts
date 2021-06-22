import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// ********************************* THIRD PARTY PACKAGES **************************************** //

import Swal from 'sweetalert2';

// ********************************* SERVICES **************************************** //

import { UsuarioService } from '../../services/usuario.service';

// ********************************************************************************** //
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {

  public fomrSubmitted = false;

  public registerForm = this.fb.group({

    nombre: [ 'Christian', Validators.required ],
    email: [ 'test100@gmail.com', [ Validators.required, Validators.email ] ],
    password: [ '123456', Validators.required ],
    password2: [ '123456', Validators.required ],
    terminos: [ true, Validators.required ]

  }, {
    validators: this.passwordsIguales( 'password', 'password2' )
  }) ;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService
    ) { }

  crearUsuario(): void {
    /**
     * Returns a console.log of the register form
     */
    this.fomrSubmitted = true;
    // console.log( this.registerForm.value );
    console.log( this.registerForm.value );

    if ( this.registerForm.invalid ) {

      return;

    }

    // POST USER
    this.usuarioService.crearUsuario( this.registerForm.value )
      .subscribe( resp => {
        console.log( 'usuario creado' );
        console.log( resp );
      },

        (err) => {

          // IF AN ERROR OCCURS
          Swal.fire({
            title: 'Error!',
            text: `${err.error.msg}`,
            icon: 'error',
            confirmButtonText: 'Ok'
          });

        }

      );

  }

  campoNoValido( campo: string ): boolean {

    if ( this.registerForm.get( campo ).invalid && this.fomrSubmitted ) {

      return true;

    }

    return false;

  }

  aceptaTerminos(): boolean {

    return !this.registerForm.get('terminos').value && this.fomrSubmitted;

  }

  contrasenasNoValidas(  ): boolean {

    const pass1 = this.registerForm.get( 'password' ).value;
    const pass2 = this.registerForm.get( 'password2' ).value;

    return (pass1 !== pass2 && this.fomrSubmitted) ? true : false;

  }

  passwordsIguales( pass1Name: string, pass2Name: string ) {

    return ( formGroup: FormGroup ) => {

      const pass1Control = formGroup.get( pass1Name );
      const pass2Control = formGroup.get( pass2Name );

      if ( pass1Control.value === pass2Control.value ) {

        pass2Control.setErrors( null );

      } else {

        pass2Control.setErrors( { noEsIgual: true } );

      }

    }

  }

}
