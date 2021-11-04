import { Component, OnInit } from '@angular/core';

// **************************** SERVICES ******************************* //

import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';

// ********************************************************************* //

declare function customInitFunctions(): () => void;
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor(
    private settingsService: SettingsService,
    private sidebarService: SidebarService
  ) { }

  ngOnInit(): void {

    customInitFunctions();
    this.sidebarService.cargarMenu();

  }



}
