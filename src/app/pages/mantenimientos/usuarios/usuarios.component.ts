import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';


import Swal from 'sweetalert2';

// ********************************** MODEL ********************************** //

import { Usuario } from '../../../../models/usuario.models';

// ********************************** SERVICES ********************************** //

import { BusquedaService } from '../../../services/busqueda.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { UsuarioService } from '../../../services/usuario.service';


// ****************************************************************************** //

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[];
  public usuariosTemp: Usuario[];

  public imgSubs: Subscription;
  public desde: number = 0;
  public cargando: boolean = true;

  constructor(
    private usuarioService: UsuarioService,
    private busquedaService: BusquedaService,
    private modalImagenService: ModalImagenService
  ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {

    this.cargarUsuarios();

    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe( delay(100) )
    .subscribe( img => this.cargarUsuarios() );

  }

  cargarUsuarios() {

    this.cargando = true;

    this.usuarioService.cargarUsuarios( this.desde )
      .subscribe(

        ( { total, usuarios } ) => {

          this.totalUsuarios = total;

          this.usuarios = usuarios;

          this.cargando = false;

         }

      );

  }

  cambiarPagina( valor: number ) {

    this.desde += valor;

    if ( this.desde < 0 ) {

      this.desde = 0;

    } else if ( this.desde > this.totalUsuarios ) {

      this.desde -= valor;

    }

    this.cargarUsuarios();

  }

  buscar( termino: string ) {

    if ( termino.length === 0 ) {

      return this.usuarios = this.usuariosTemp;

    }

    this.busquedaService.buscar( 'usuarios', termino )
      .subscribe(
        resultados => {
          this.usuarios = resultados;
        }
      );

  }

  eliminarUsuario( usuario: Usuario ) {

    if ( usuario.uid === this.usuarioService.uid ) {

      return Swal.fire('Error', 'No puede borrar ese usuario.', 'error' );

    }

    Swal.fire({
      title: '¿Borrar Usuario?',
      text: `Está a punto de borrar a ${ usuario.nombre }`,
      icon: 'question',
      showCancelButton: true,
      // confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {
        this.usuarioService.eliminarUsuario( usuario )
        .subscribe( resp => {

          this.cargarUsuarios();

          Swal.fire(
            '!Usuario Borrado!',
            `${ usuario.nombre } fue eliminado correctamente.`,
            'success'
          );

        });


      }
    });

  }

  cambiarRole( usuario: Usuario ){

      this.usuarioService.guardarUsuario( usuario )
        .subscribe( resp => {

           console.log(resp);

        });

  }

  abrirModal( usuario: Usuario ) {

    console.log( usuario );
    this.modalImagenService.abrirModal( 'usuarios', usuario.uid, usuario.img );

  }

}
