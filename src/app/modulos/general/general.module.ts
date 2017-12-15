import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GeneralRoutingModule } from './general-routing.module';
import { SedService } from './servicios/sed.service';
import { NavbarTopComponent } from './componentes/navbar-top/navbar-top.component';
import { CapitalizarPipe } from './pipes/capitalizar.pipe';
import { NavbarLeftComponent } from './componentes/navbar-left/navbar-left.component';
import { SedComponent } from './componentes/sed/sed.component';
import { TidService } from './servicios/tid.service';
import { FiltrarPipe } from './pipes/filtrar.pipe';
import { MyLinkDirective } from './directivas/my-link.directive';
import { AfiService } from './servicios/afi.service';
import { MunService } from './servicios/mun.service';
import { SafePipe } from './pipes/safe.pipe';
import { NovService } from './servicios/nov.service';
import { TgenService } from './servicios/tgen.service';
import { TgenComponent } from './componentes/tgen/tgen.component';
import { GenService } from './servicios/gen.service';
import { GpoService } from './servicios/gpo.service';
import { TdiService } from './servicios/tdi.service';
import { GdiService } from './servicios/gdi.service';
import { GenerarDireccionComponent } from './componentes/generar-direccion/generar-direccion.component';
import { ModalAfiComponent } from './componentes/modal-afi/modal-afi.component';
import { TiprService } from './servicios/tipr.service';
import { ZonService } from './servicios/zon.service';
import { IpsService } from './servicios/ips.service';

@NgModule({
  imports: [
    CommonModule,
    GeneralRoutingModule,
    FormsModule
  ],
  exports: [NavbarTopComponent, NavbarLeftComponent, CapitalizarPipe, SedComponent, FiltrarPipe, MyLinkDirective, SafePipe, TgenComponent,
    GenerarDireccionComponent, ModalAfiComponent],
  declarations: [NavbarTopComponent, CapitalizarPipe, NavbarLeftComponent, SedComponent, FiltrarPipe, MyLinkDirective, SafePipe,
    TgenComponent, GenerarDireccionComponent, ModalAfiComponent],
  providers: [SedService, TidService, AfiService, MunService, NovService, TgenService, GenService, GpoService, TdiService, GdiService, TiprService, ZonService, IpsService]
})
export class GeneralModule { }
