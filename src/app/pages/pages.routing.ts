import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// **************************** CUSTOMIZED COMPONENTS ********************************* //

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountsettingsComponent } from './accountsettings/accountsettings.component';

// *********************************************************************************** //

const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        children: [
          { path: '', component: DashboardComponent },
          { path: 'charts', component: Grafica1Component },
          { path: 'progress', component: ProgressComponent },
          { path: 'account-settings', component: AccountsettingsComponent }
        ]
    },


];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}
