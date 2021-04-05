import { Component, OnInit } from '@angular/core';

// ****************************** SERVICES ****************************** //

import { SettingsService } from '../../services/settings.service';

// ********************************************************************** //

@Component({
  selector: 'app-accountsettings',
  templateUrl: './accountsettings.component.html',
  styles: [
  ]
})
export class AccountsettingsComponent implements OnInit {

  constructor( private serviceSettings: SettingsService ) { }

  ngOnInit(): void {

    this.serviceSettings.checkCurrentTheme();

  }

  changeTheme( theme: string ): void {

    this.serviceSettings.changeTheme( theme );

    this.serviceSettings.checkCurrentTheme();

  }



}
