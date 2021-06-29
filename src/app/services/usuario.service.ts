import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';

// *************************** INTERFACE ************************** //

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';

// *************************** BASE URLS ************************** //

import { environment } from '../../environments/environment';
const base_url = environment.base_url;

// **************************************************************** //
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private http: HttpClient ) {}

  crearUsuario( formData: RegisterForm ): Observable<any>{

    return this.http.post( `${ base_url }/usuarios`, formData )
                  .pipe(
                    tap(

                      resp => {

                        localStorage.setItem( 'token', resp.token );

                      }
                    )
                  );

  }

  loginUsuario( formData: LoginForm ): Observable<any>{

    return this.http.post( `${ base_url }/login`, formData )
        .pipe(
          tap(

            resp => {

              localStorage.setItem( 'token', resp.token );

            }
          )
         );

  }

  loginGoogle( token ): Observable<any>{

    return this.http.post( `${ base_url }/login/google`, { token } )
        .pipe(
          tap(

            resp => {

              localStorage.setItem( 'token', resp.token );

            }
          )
         );

  }


}
