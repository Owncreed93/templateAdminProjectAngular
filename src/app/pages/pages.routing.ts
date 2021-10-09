import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// *********************************** GUARDS **************************************** //

import { AuthGuard } from '../guards/auth.guard';

// **************************** CUSTOMIZED COMPONENTS ********************************* //

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountsettingsComponent } from './accountsettings/accountsettings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';

// *********************************************************************************** //

const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
          { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
          { path: 'charts', component: Grafica1Component, data: { titulo: 'Charts' } },
          { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress Bar' } },
          { path: 'account-settings', component: AccountsettingsComponent, data: { titulo: 'Account Settings' } },
          { path: 'promises', component: PromesasComponent, data: { titulo: 'Promises' } },
          { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
          { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario' } },

          // Mantenimientos
          { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Mantenimiento de usuarios' } },
          { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de Hospitales' } },
          { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de Médicos' } },
          { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Mantenimiento de Médico' } }
        ]
    },


];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}
