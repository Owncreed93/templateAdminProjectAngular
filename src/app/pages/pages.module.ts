import { NgModule } from '@angular/core';

// ******************************* CUSTOMIZED MODULES ********************************* //

import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

// ************************************************************************************ //

// **************************** CUSTOMIZED COMPONENTS ********************************* //

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';

// ********************************************************************************* //


@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent
  ]
})
export class PagesModule { }
