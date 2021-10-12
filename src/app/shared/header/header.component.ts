import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// ****************************** SERVICE ************************* //

import { UsuarioService } from '../../services/usuario.service';

// ****************************** MODEL ************************* //

import { Usuario } from '../../../models/usuario.models';

// *************************************************************** //
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public user: Usuario;
  public imgUrl: string;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {

    this.user = usuarioService.usuario;
    this.imgUrl = usuarioService.usuario.imageUrl;

  }

  ngOnInit(): void {
  }

  logout(): void {

    this.usuarioService.logout(  );

  }

  buscar( termino: string): void {

    if ( termino.length === 0 ) {
      this.router.navigateByUrl('/dashboard');
    }
    this.router.navigateByUrl(`/dashboard/buscar/${termino}`);

  }

}
