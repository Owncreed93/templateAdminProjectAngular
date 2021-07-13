import { Component, OnInit } from '@angular/core';

// ****************************** SERVICE ************************* //

import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';

// ****************************** MODEL ************************* //

import { Usuario } from '../../../models/usuario.models';

// *************************************************************** //
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public user: Usuario;
  public imgUrl: string;
  menuItems: any[];

  constructor(
    private sidebarService: SidebarService,
    private usuarioService: UsuarioService
  ) {

    this.user = usuarioService.usuario;
    this.imgUrl = usuarioService.usuario.imageUrl;
    this.menuItems = this.sidebarService.menu;
    console.log( this.menuItems );

  }

  ngOnInit(): void {
  }

}
