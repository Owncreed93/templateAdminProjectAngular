import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import Swal from 'sweetalert2';

import { BusquedaService } from '../../../services/busqueda.service';
import { HospitalService } from '../../../services/hospital-service.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';

import { Hospital } from '../../../../models/hospitales.models';


@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public totalHospitales: number = 0;
  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  public hospitalesTemp: Hospital[] = [];

  public imgSubs: Subscription;
  public desde: number = 0;

  constructor(
    private hospitalService: HospitalService,
    private modalImagenService: ModalImagenService,
    private busquedaService: BusquedaService
  ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {

    this.cargarHospitales();

    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe( delay(100) )
    .subscribe( img => this.cargarHospitales() );

  }

  buscar( termino: string ) {

    if ( termino.length === 0 ) {

      return this.hospitales = this.hospitalesTemp;

    }

    this.busquedaService.buscar( 'hospitales', termino )
      .subscribe(
        (resultados: Hospital[]) => {
          this.hospitales = resultados;
        }
      );

  }

  cargarHospitales( ) {

    this.cargando = true;
    this.hospitalService.cargarHospitales( this.desde )
      .subscribe( ( resp  ) => {

        this.cargando = false;
        this.hospitales = resp.hospitales;
        this.totalHospitales = resp.total;

      });

  }

  cambiarPagina( valor: number ) {

    this.desde += valor;

    if ( this.desde < 0 ) {

      this.desde = 0;

    } else if ( this.desde > this.totalHospitales ) {

      this.desde -= valor;

    }

    this.cargarHospitales( );

  }

  guardarCambios( hospital: Hospital ) {

    this.hospitalService.actualizarHospital( hospital._id, hospital.nombre )
      .subscribe( resp => {

        Swal.fire( 'Actualizado', hospital.nombre, 'success' );

      });
  }

  eliminarHospital( hospital: Hospital ) {

    this.hospitalService.borrarHospital( hospital._id )
      .subscribe( resp => {
        this.cargarHospitales();
        Swal.fire( 'Borrado', hospital.nombre, 'success' );

      });
  }

  async abrirSweetAlert( ) {

    const { value = '' } = await Swal.fire<string>({
      title: 'Crear nuevo hospital',
      input: 'text',
      inputLabel: 'Ingrese el nombre del nuevo hospital:',
      inputPlaceholder: 'Nombre de hospital',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
    });

    if ( value.trim().length > 0 ) {

      this.hospitalService.crearHospital( value ).subscribe(
        (resp: any) => {
          this.hospitales.push( resp.hospital );
        }
      );

    }

  }

  abrirModal( hospital: Hospital ) {

      console.log( hospital );
      this.modalImagenService.abrirModal( 'hospitales', hospital._id, hospital.img );


  }


}
