import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormulariosRoutingModule } from './formularios-routing.module';
import { AfiliacionesNovedadesComponent } from './componentes/afiliaciones-novedades/afiliaciones-novedades.component';
import { FormsModule } from '@angular/forms';
import { GeneralModule } from '../general/general.module';

@NgModule({
  imports: [
    CommonModule,
    FormulariosRoutingModule,
    FormsModule,
    GeneralModule
  ],
  exports: [AfiliacionesNovedadesComponent],
  declarations: [AfiliacionesNovedadesComponent]
})
export class FormulariosModule { }
