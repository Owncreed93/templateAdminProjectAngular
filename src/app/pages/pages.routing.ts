import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// *********************************** GUARDS **************************************** //

import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';

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
import { BusquedaComponent } from './busqueda/busqueda.component';

// *********************************************************************************** //

const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
          { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
          { path: 'account-settings', component: AccountsettingsComponent, data: { titulo: 'Account Settings' } },
          { path: 'buscar/:termino', component: BusquedaComponent, data: { titulo: 'Busquedas' } },
          { path: 'charts', component: Grafica1Component, data: { titulo: 'Charts' } },
          { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario' } },
          { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress Bar' } },
          { path: 'promises', component: PromesasComponent, data: { titulo: 'Promises' } },
          { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },

          // Mantenimientos
          { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de Hospitales' } },
          { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de Médicos' } },
          { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Mantenimiento de Médico' } },

          // Routes Admin
          { path: 'usuarios', canActivate: [AdminGuard] , component: UsuariosComponent, data: { titulo: 'Mantenimiento de usuarios' } },
        ]
    },


];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}
