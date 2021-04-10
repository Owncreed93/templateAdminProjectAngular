import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// **************************** CUSTOMIZED COMPONENTS ********************************* //

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountsettingsComponent } from './accountsettings/accountsettings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

// *********************************************************************************** //

const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        children: [
          { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
          { path: 'charts', component: Grafica1Component, data: { titulo: 'Charts' } },
          { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress Bar' } },
          { path: 'account-settings', component: AccountsettingsComponent, data: { titulo: 'Account Settings' } },
          { path: 'promises', component: PromesasComponent, data: { titulo: 'Promises' } },
          { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
        ]
    },


];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}
