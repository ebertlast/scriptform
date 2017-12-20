import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../app-authguard';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { ConsultasComponent } from './componentes/consultas/consultas.component';
import { DinamicReportComponent } from '../reportes/componentes/dinamic-report/dinamic-report.component';
// tslint:disable-next-line:max-line-length
import { DinamicReportConfiguracionComponent } from '../reportes/componentes/dinamic-report-configuracion/dinamic-report-configuracion.component';
import { ArchivosComponent } from '../archivo/componentes/archivos/archivos.component';
import { RadicacionesComponent } from '../archivo/componentes/radicaciones/radicaciones.component';
import { AfiliacionesNovedadesComponent } from '../formularios/componentes/afiliaciones-novedades/afiliaciones-novedades.component';
import { TgenComponent } from '../general/componentes/tgen/tgen.component';
import { EmplComponent } from '../crud/componentes/empl/empl.component';
import { ArchivoComponent } from '../archivo/componentes/archivo/archivo.component';
import { UsuariosComponent } from '../seguridad/componentes/usuarios/usuarios.component';
import { GruposComponent } from '../seguridad/componentes/grupos/grupos.component';
import { ProcedimientosComponent } from '../seguridad/componentes/procedimientos/procedimientos.component';
import { PerfilUsuarioComponent } from '../seguridad/componentes/perfil-usuario/perfil-usuario.component';
const routes: Routes = [
  { path: '', redirectTo: 'principal', pathMatch: 'full' },
  {
    path: 'principal', component: PrincipalComponent, canActivate: [AuthGuard], children: [
      // { path: 'consultas', component: ConsultasComponent, canActivate: [AuthGuard] }
      { path: '', redirectTo: 'radicaciones', pathMatch: 'full' },
      { path: 'consultas', component: DinamicReportComponent, canActivate: [AuthGuard] },
      { path: 'confconsultas', component: DinamicReportConfiguracionComponent, canActivate: [AuthGuard] },
      { path: 'archivos', component: ArchivosComponent, canActivate: [AuthGuard] },
      { path: 'archivo/:archivoid', component: ArchivoComponent, canActivate: [AuthGuard] },
      { path: 'radicaciones', component: RadicacionesComponent, canActivate: [AuthGuard] },
      { path: 'formulariounico', component: AfiliacionesNovedadesComponent, canActivate: [AuthGuard] },
      { path: 'tablasgenericas', component: TgenComponent, canActivate: [AuthGuard] },
      { path: 'crudempl', component: EmplComponent, canActivate: [AuthGuard] },
      { path: 'seguridad/procedimientos', component: ProcedimientosComponent, canActivate: [AuthGuard] },
      { path: 'seguridad/grupos', component: GruposComponent, canActivate: [AuthGuard] },
      { path: 'seguridad/usuarios', component: UsuariosComponent, canActivate: [AuthGuard] },
      { path: 'seguridad/perfil', component: PerfilUsuarioComponent, canActivate: [AuthGuard] },
      { path: '**', redirectTo: 'radicaciones' }
    ],
  },
  { path: '**', redirectTo: 'principal' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EscritorioRoutingModule { }
