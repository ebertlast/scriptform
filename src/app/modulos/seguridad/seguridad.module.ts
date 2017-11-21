import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SeguridadRoutingModule } from './seguridad-routing.module';
import { AuthService } from './servicios/auth.service';
import { IngresarComponent } from './componentes/ingresar/ingresar.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { GeneralModule } from '../general/general.module';
@NgModule({
  imports: [
    CommonModule,
    SeguridadRoutingModule,
    FormsModule,
    HttpModule,
    GeneralModule
  ],
  declarations: [IngresarComponent, PrincipalComponent],
  providers: [AuthService]
})
export class SeguridadModule { }
