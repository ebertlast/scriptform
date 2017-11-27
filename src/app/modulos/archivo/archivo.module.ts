import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArchivoRoutingModule } from './archivo-routing.module';
import { ArcService } from './servicios/arc.service';
import { ArchService } from './servicios/arch.service';
import { ArchivosComponent } from './componentes/archivos/archivos.component';
import { GeneralModule } from '../general/general.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ArchivoRoutingModule,
    GeneralModule,
    FormsModule
  ],
  exports: [ArchivosComponent],
  declarations: [ArchivosComponent],
  providers: [ArcService, ArchService]
})
export class ArchivoModule { }
