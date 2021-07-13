import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

import { Observable, of, pipe } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

// *************************** MODELS ************************** //

import { Usuario } from 'src/models/usuario.models';

// *************************** INTERFACE ************************** //

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';

// *************************** BASE URLS ************************** //

import { environment } from '../../environments/environment';

const base_url = environment.base_url;

// **************************************************************** //

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: Usuario;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {

    this.googleInit();

  }

  googleInit(): Promise<void> {

    return new Promise ( resolve => {

      console.log( 'google init' );

      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '896472125944-1j07djaqrtgnqbsvkoo0ns6knev33rk5.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          // Request scopes in addition to 'profile' and 'email'
          // scope: 'additional_scope'
        });

        resolve();

      });


    });

  }

  logout(): void {

    localStorage.removeItem( 'token' );

    this.auth2.signOut().then( () => {

      this.ngZone.run( () => {

        this.router.navigateByUrl('/login');

      });


    });

  }

  validarToken(): Observable<boolean> {

    const token = localStorage.getItem('token') || '';

    return this.http.get( `${ base_url }/login/renew`, {

      headers: {
        'x-token': token
      }

    }).pipe(

      tap(

        ( resp: any ) => {

          const {
            email,
            google,
            nombre,
            role,
            img,
            uid } = resp.usuario;

          this.usuario = new Usuario(
            nombre,
            email,
            '',
            img,
            google,
            role,
            uid
          );
          localStorage.setItem( 'token', resp.token );

        }

      ),
      map( resp => true ),
      catchError( error => of(false) )

    );


  }

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
