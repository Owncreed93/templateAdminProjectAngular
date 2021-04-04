import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

// ******************************* CUSTOMIZED MODULES ********************************* //

import { ChartsModule } from 'ng2-charts';

// ************************************************************************************ //

// **************************** CUSTOMIZED COMPONENTS ********************************* //

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { DonaComponent } from './dona/dona.component';


// *********************************************************************************** //

@NgModule({
  declarations: [
    IncrementadorComponent,
    DonaComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ChartsModule
  ],
  exports: [
    IncrementadorComponent,
    DonaComponent
  ]
})
export class ComponentsModule { }
