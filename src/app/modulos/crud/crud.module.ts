import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrudRoutingModule } from './crud-routing.module';
import { EmplComponent } from './componentes/empl/empl.component';
import { FormsModule } from '@angular/forms';
import { GeneralModule } from '../general/general.module';
import { DataTablesModule } from 'angular-datatables';
@NgModule({
  imports: [
    CommonModule,
    CrudRoutingModule,
    FormsModule,
    GeneralModule,
    DataTablesModule
  ],
  exports: [
    EmplComponent
  ],
  declarations: [EmplComponent]
})
export class CrudModule { }
