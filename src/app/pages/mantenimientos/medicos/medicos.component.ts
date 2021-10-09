import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import Swal from 'sweetalert2';

import { Medico } from 'src/models/medico.models';

import { MedicoService } from '../../../services/medico.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedaService } from '../../../services/busqueda.service';


@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public totalMedicos: number = 0;
  public medicos: Medico[] = [];
  public cargando: boolean = true;
  public medicosTemp: Medico[] = [];

  public imgSubs: Subscription;
  public desde: number = 0;

  constructor(
    private medicoService: MedicoService,
    private modalimagenService: ModalImagenService,
    private busquedaService: BusquedaService
  ) { }

  ngOnInit(): void {

    this.cargarMedicos();
    this.imgSubs = this.modalimagenService.nuevaImagen
      .pipe( delay(100) )
      .subscribe( img => this.cargarMedicos() );

  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  buscar( termino: string ): Medico[]{

    if ( termino.length === 0 ) {

      return this.medicos = this.medicosTemp;

    }

    this.busquedaService.buscar( 'medicos', termino )
      .subscribe(
        (resultados: Medico[]) => {
          this.medicos = resultados;
        }
      );

  }

  cambiarPagina( valor: number ) {

    this.desde += valor;

    if ( this.desde < 0 ) {

      this.desde = 0;

    } else if ( this.desde > this.totalMedicos ) {

      this.desde -= valor;

    }

    this.cargarMedicos( );
  }

  cargarMedicos(): void {

    this.cargando = true;
    this.medicoService.cargarMedicos( this.desde )
      .subscribe( (resp) => {

        this.cargando = false;
        this.medicos = resp.medicos;
        this.totalMedicos = resp.total;

      });


  }

  abrirModal( medico: Medico): void {

    this.modalimagenService.abrirModal( 'medicos', medico._id, medico.img );

  }

  borrarMedico( medico: Medico ) {

    Swal.fire({
      title: '¿Borrar Médico?',
      text: `Está a punto de borrar a ${ medico.nombre }`,
      icon: 'question',
      showCancelButton: true,
      // confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {
        this.medicoService.borrarMedico( medico._id )
        .subscribe( resp => {

          this.cargarMedicos();

          Swal.fire(
            '!Médico Borrado!',
            `${ medico.nombre } fue eliminado correctamente.`,
            'success'
          );

        });


      }
    });

  }

}
