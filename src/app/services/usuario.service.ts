import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

// *************************** MODELS ************************** //

import { Usuario } from 'src/models/usuario.models';

// *************************** INTERFACE ************************** //

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

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

  get token(): string {

    return localStorage.getItem('token') || '';

  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' {

    return this.usuario.role;

  }

  get uid(): string {

    return this.usuario.uid || '';
  }

  get headers() {
    return {

      headers: {
        'x-token': this.token
      }

    };
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

  guardarLocalStorage( token: string, menu: any ) {

    localStorage.setItem( 'token', token );
    localStorage.setItem('menu', JSON.stringify(menu));

  }

  logout(): void {

    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    this.auth2.signOut().then( () => {

      this.ngZone.run( () => {

        this.router.navigateByUrl('/login');

      });


    });

  }

  validarToken(): Observable<boolean> {

    return this.http.get( `${ base_url }/login/renew`, 

      this.headers

    ).pipe(

      map(

        ( resp: any ) => {

          const {
            email,
            google,
            nombre,
            role,
            img = '',
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
          this.guardarLocalStorage(resp.token, resp.menu );

          return true;
        }

      ),
      // map( resp => true ),
      catchError( error => of(false) )

    );


  }

  crearUsuario( formData: RegisterForm ): Observable<any>{

    return this.http.post( `${ base_url }/usuarios`, formData )
                  .pipe(
                    tap(

                      resp => {

                        this.guardarLocalStorage(resp.token, resp.menu );
                      }
                    )
                  );

  }

  actualizarPerfil( data: { email: string, nombre: string, role: string } ): Observable<any> {

    data = {
      ...data,
      role: this.usuario.role
    };

    return this.http.put( `${ base_url }/usuarios/${this.uid}`, data, this.headers );

  }

  loginUsuario( formData: LoginForm ): Observable<any>{

    return this.http.post( `${ base_url }/login`, formData )
        .pipe(
          tap(

            resp => {

              this.guardarLocalStorage(resp.token, resp.menu );

            }
          )
         );

  }

  loginGoogle( token ): Observable<any>{

    return this.http.post( `${ base_url }/login/google`, { token } )
        .pipe(
          tap(

            resp => {

              this.guardarLocalStorage(resp.token, resp.menu );

            }
          )
         );

  }

  cargarUsuarios( desde: number = 0 ) {

    const url = `${ base_url }/usuarios?desde=${ desde }`;

    return this.http.get< CargarUsuario >( url, this.headers )
          .pipe(
            map( resp => {

                const usuarios = resp.usuarios.map(
                  user => new Usuario( user.nombre, user.email, '', user.img, user.google, user.role, user.uid )
                );

                return {
                  total: resp.total,
                  usuarios
                };
              }
            )
          );

  }

  eliminarUsuario( usuario: Usuario ) {

    const url = `${ base_url }/usuarios/${ usuario.uid }`;

    return this.http.delete( url, this.headers );

  }

  guardarUsuario( usuario: Usuario ): Observable<any> {

    // data = {
    //   ...data,
    //   role: this.usuario.role
    // };

    return this.http.put( `${ base_url }/usuarios/${this.uid}`, usuario, this.headers );

  }

}
