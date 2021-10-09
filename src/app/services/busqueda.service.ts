import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Hospital } from '../../models/hospitales.models';
import { Usuario } from '../../models/usuario.models';
import { Medico } from 'src/models/medico.models';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {

  constructor( private http: HttpClient ) { }

  get token(): string {

    return localStorage.getItem('token') || '';

  }

  get headers() {

    return {

      headers: {
        'x-token': this.token
      }

    };

  }

  private transformarUsuarios( resultados: any[] ): Usuario[] {

    return resultados.map(
      user => new Usuario( user.nombre, user.email, '', user.img, user.google, user.role, user.uid )
    );

  }

  private transformarHospitales( resultados: any[] ): Hospital[] {

    return resultados;

  }

  private transformarMedicos( resultados: any[] ): Medico[] {

    return resultados;

  }

  buscar(
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    termino: string = ''
  ) {

    const url = `${ base_url }/todo/coleccion/${ tipo }/${ termino }`;

    return this.http.get< any[] >( url, this.headers )
      .pipe(
        map( ( resp: any ) => {

          switch (tipo) {

            case 'usuarios':
              return this.transformarUsuarios( resp.data );
            case 'hospitales':
              return this.transformarHospitales( resp.data );
            case 'medicos':
              return this.transformarMedicos( resp.data );
            default:
              return [];

          }


        })
      );

  }

}
