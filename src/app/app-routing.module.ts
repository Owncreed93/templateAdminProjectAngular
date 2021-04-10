import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// **************************** CUSTOMIZED MODULES ********************************* //

import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

// *********************************************************************************** //

// **************************** CUSTOMIZED COMPONENTS ********************************* //

import { NopagefoundComponent } from './nopagefound/nopagefound.component';

// *********************************************************************************** //


const routes: Routes = [
  // path: '/dashboard' PagesRouting
  // path: '/charts' PagesRouting
  // path: '/progress' PagesRouting
  // path: '/account-settings' PagesRouting
  // path: '/promises' PagesRouting
  // path: '/rxjs' PagesRouting
  // path: '/login' AuthRouting
  // path: '/register' AuthRouting
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: NopagefoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
