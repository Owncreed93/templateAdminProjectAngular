import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { delay } from 'rxjs/operators';

import Swal from 'sweetalert2';

import { Hospital } from '../../../../models/hospitales.models';
import { Medico } from '../../../../models/medico.models';

import { HospitalService } from '../../../services/hospital-service.service';
import { MedicoService } from 'src/app/services/medico.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm: FormGroup;
  public hospitales: Hospital[] = [];

  public medicoSeleccionado: Medico;
  public hospitalSeleccionado: Hospital;

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
     ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( ( {id} ) => this.cargarMedico(id) );

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    });

    this.cargarHospitales();

    this.medicoForm.get('hospital').valueChanges
    .subscribe( hospitalId => {

      this.hospitalSeleccionado = this.hospitales.find( h => h._id === hospitalId );

     }
    );

  }

  cargarHospitales(): void {

    this.hospitalService.cargarHospitales().subscribe(
      ( hospitales ) => {
        this.hospitales = hospitales.hospitales;
      }
    );
  }

  cargarMedico(id: string) {

    if ( id === 'nuevo' ) { return; }

    this.medicoService.obtenerMedicoPorId(id)
      .pipe( delay(100) )
      .subscribe( medico => {

        if ( !medico ) {
          return this.router.navigateByUrl('/dashboard/medicos');
        }

        const { nombre, hospital: { _id  } } = medico;

        this.medicoSeleccionado = medico;

        this.medicoForm.setValue({ nombre, hospital: _id });

      });

  }

  guardarMedico(): void {

    const { nombre } = this.medicoForm.value;

    if ( this.medicoSeleccionado ) {


      const _id = this.medicoSeleccionado._id
      const data = {
        ...this.medicoForm.value,
      };

      this.medicoService.actualizarMedico( _id, data )
        .subscribe( resp => {
          Swal.fire( 'Actualizado', `${nombre} actualizado correctamente`, 'success');
        });

    } else {


      this.medicoService.crearMedico( this.medicoForm.value )
        .subscribe( (resp: any) => {

          Swal.fire(
            'Creado',
            `${nombre} creado correctamente`,
            'success'
          );

          this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`);

        });

      }


  }

}
