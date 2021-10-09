import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Hospital } from '../../models/hospitales.models';
import { map } from 'rxjs/operators';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor( private http: HttpClient) { }

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

  cargarHospitales( desde: number = 0 ) {

    const url = `${ base_url }/hospitales?desde=${ desde }`;

    return this.http.get( url, this.headers )
      .pipe(
        map( (resp: {ok: boolean, hospitales: Hospital[], total: number} ) => {
          return {
            ok: resp.ok,
            hospitales: resp.hospitales,
            total: resp.total
          };
        })
      );


  }

  crearHospital( nombre: string ) {

    const url = `${ base_url }/hospitales`;

    return this.http.post( url, { nombre } , this.headers );

  }

  actualizarHospital( _id: string, nombre: string ) {

    const url = `${ base_url }/hospitales/${_id}`;

    return this.http.put( url, { nombre } , this.headers );

  }

  borrarHospital( _id: string ) {

    const url = `${ base_url }/hospitales/${_id}`;

    return this.http.delete( url, this.headers );

  }

}
