import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Hospital } from '../../../models/hospitales.models';
import { Medico } from '../../../models/medico.models';
import { Usuario } from '../../../models/usuario.models';

import { BusquedaService } from 'src/app/services/busqueda.service';



@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];

  constructor( private activatedRoute: ActivatedRoute,
               private busquedaService: BusquedaService
     ) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .subscribe( ({ termino }) => this.busquedaGlobal(termino) );

  }

  abrirMedico( medico: Medico ) {

    console.log(medico);

  }

  busquedaGlobal( termino: string ) {

    this.busquedaService.busquedaGlobal(termino).subscribe(
      (resp: any) => {
        console.log(resp);
        this.hospitales = resp.hospitales;
        this.medicos = resp.medicos;
        this.usuarios = resp.usuarios;
      }
    );

  }
}

