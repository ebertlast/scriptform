import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../app-authguard';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { ConsultasComponent } from './componentes/consultas/consultas.component';
import { DinamicReportComponent } from '../reportes/componentes/dinamic-report/dinamic-report.component';
import { DinamicReportConfiguracionComponent } from '../reportes/componentes/dinamic-report-configuracion/dinamic-report-configuracion.component';
const routes: Routes = [
  { path: '', redirectTo: 'principal', pathMatch: 'full' },
  {
    path: 'principal', component: PrincipalComponent, canActivate: [AuthGuard], children: [
      // { path: 'consultas', component: ConsultasComponent, canActivate: [AuthGuard] }
      { path: 'consultas', component: DinamicReportComponent, canActivate: [AuthGuard] },
      { path: 'confconsultas', component: DinamicReportConfiguracionComponent, canActivate: [AuthGuard] }
      // { path: 'versiones', component: VersionesComponent, canActivate: [AuthGuard] }
    ],
  },
  { path: '**', redirectTo: 'principal' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EscritorioRoutingModule { }
