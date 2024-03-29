import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';


import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';


import { NopagefoundComponent } from './nopagefound/nopagefound.component';

// auth.module.ts

@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    PagesModule,
    AuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
