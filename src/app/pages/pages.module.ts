import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// ******************************* CUSTOMIZED MODULES ********************************* //
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { ComponentsModule } from '../components/components.module';

// ************************************************************************************ //

// **************************** CUSTOMIZED COMPONENTS ********************************* //

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { AccountsettingsComponent } from './accountsettings/accountsettings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

// ********************************************************************************* //


@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountsettingsComponent,
    PromesasComponent,
    RxjsComponent
  ],
  imports: [
    FormsModule,
    SharedModule,
    AppRoutingModule,
    ComponentsModule
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent
  ]
})
export class PagesModule { }
