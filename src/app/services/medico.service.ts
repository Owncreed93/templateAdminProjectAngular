import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Medico } from 'src/models/medico.models';
import { Observable } from 'rxjs';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

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

  cargarMedicos( desde: number )  {

    const url = `${base_url}/medicos?desde=${desde}`;

    return this.http.get( url, this.headers )
      .pipe(
        map( (resp: { ok: boolean, medicos: Medico[], total: number }) =>  {

          return {
            ok: resp.ok,
            medicos: resp.medicos,
            total: resp.total
          };

        })
      );

  }

  obtenerMedicoPorId(id: string): Observable<Medico> {

    const url = `${base_url}/medicos/${id}`;

    return this.http.get( url, this.headers )
          .pipe(
            map( (resp: {ok: boolean, medico: Medico}) => resp.medico )
          );

  }

  crearMedico( medico: { nombre: string, hospital: string } ): Observable<object>{

      const url = `${base_url}/medicos`;

      return this.http.post( url, medico , this.headers );

  }

  actualizarMedico( _id: string, medico ): Observable<object> {

    const url = `${base_url}/medicos/${_id}`;

    return this.http.put( url, medico, this.headers );

  }

  borrarMedico( _id: string ): Observable<object> {

    const url = `${base_url}/medicos/${_id}`;

    return this.http.delete( url, this.headers );

  }

}
