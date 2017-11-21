import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EscritorioRoutingModule } from './escritorio-routing.module';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { GeneralModule } from '../general/general.module';
import { ConsultasComponent } from './componentes/consultas/consultas.component';
import { ReportesModule } from '../reportes/reportes.module';
@NgModule({
  imports: [
    CommonModule,
    EscritorioRoutingModule,
    GeneralModule,
    FormsModule,
    ReportesModule
  ],
  declarations: [PrincipalComponent, ConsultasComponent]
})
export class EscritorioModule { }
