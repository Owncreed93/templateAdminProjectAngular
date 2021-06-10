import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {

  public registerForm = this.fb.group({

    nombre: [ 'Fernando', Validators.required ],
    email: [ 'test1000@gmail.com', Validators.required ],
    password: [ '123456', Validators.required ],
    password2: [ '123456', Validators.required ],
    terminos: [ false, Validators.required ]

  }) ;

  constructor( private fb: FormBuilder ) { }

  crearUsuario(): void {
    /**
     * Returns a console.log of the register form
     */
    console.log( this.registerForm.value );

  }


}
