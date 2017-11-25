import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralRoutingModule } from './general-routing.module';
import { SedService } from './servicios/sed.service';
import { NavbarTopComponent } from './componentes/navbar-top/navbar-top.component';
import { CapitalizarPipe } from './pipes/capitalizar.pipe';
import { NavbarLeftComponent } from './componentes/navbar-left/navbar-left.component';
import { SedComponent } from './componentes/sed/sed.component';
import { TidService } from './servicios/tid.service';
import { FiltrarPipe } from './pipes/filtrar.pipe';
import { MyLinkDirective } from './directivas/my-link.directive';

@NgModule({
  imports: [
    CommonModule,
    GeneralRoutingModule
  ],
  exports: [NavbarTopComponent, NavbarLeftComponent, CapitalizarPipe, SedComponent, FiltrarPipe, MyLinkDirective],
  declarations: [NavbarTopComponent, CapitalizarPipe, NavbarLeftComponent, SedComponent, FiltrarPipe, MyLinkDirective],
  providers: [SedService, TidService]
})
export class GeneralModule { }
