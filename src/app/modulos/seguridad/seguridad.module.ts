import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DataTablesModule } from 'angular-datatables';

import { SeguridadRoutingModule } from './seguridad-routing.module';
import { AuthService } from './servicios/auth.service';
import { IngresarComponent } from './componentes/ingresar/ingresar.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { GeneralModule } from '../general/general.module';
import { UsuService } from './servicios/usu.service';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { UsproService } from './servicios/uspro.service';
import { UsprohService } from './servicios/usproh.service';
import { UsgruService } from './servicios/usgru.service';
import { UsgruhService } from './servicios/usgruh.service';
import { GruposComponent } from './componentes/grupos/grupos.component';
import { ProcedimientosComponent } from './componentes/procedimientos/procedimientos.component';
import { PerfilUsuarioComponent } from './componentes/perfil-usuario/perfil-usuario.component';
@NgModule({
  imports: [
    CommonModule,
    SeguridadRoutingModule,
    FormsModule,
    HttpModule,
    GeneralModule,
    DataTablesModule
  ],
  exports: [UsuariosComponent, GruposComponent, ProcedimientosComponent, PerfilUsuarioComponent],
  declarations: [IngresarComponent, PrincipalComponent, UsuariosComponent, GruposComponent, ProcedimientosComponent, PerfilUsuarioComponent],
  providers: [AuthService, UsuService, UsproService, UsprohService, UsgruService, UsgruhService]
})
export class SeguridadModule { }
