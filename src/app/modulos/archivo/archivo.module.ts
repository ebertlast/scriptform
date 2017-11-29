import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArchivoRoutingModule } from './archivo-routing.module';
import { ArcService } from './servicios/arc.service';
import { ArchService } from './servicios/arch.service';
import { ArchivosComponent } from './componentes/archivos/archivos.component';
import { GeneralModule } from '../general/general.module';
import { FormsModule } from '@angular/forms';
import { RadicacionesComponent } from './componentes/radicaciones/radicaciones.component';

@NgModule({
  imports: [
    CommonModule,
    ArchivoRoutingModule,
    GeneralModule,
    FormsModule
  ],
  exports: [ArchivosComponent, RadicacionesComponent],
  declarations: [ArchivosComponent, RadicacionesComponent],
  providers: [ArcService, ArchService]
})
export class ArchivoModule { }
