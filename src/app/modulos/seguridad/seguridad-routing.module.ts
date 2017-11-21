import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IngresarComponent } from './componentes/ingresar/ingresar.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { AuthGuard } from '../../app-authguard';

const routes: Routes = [
  { path: '', redirectTo: 'ingresar', pathMatch: 'full' },
  { path: 'ingresar', component: IngresarComponent },
  { path: 'salir', component: IngresarComponent },
  { path: 'principal', component: PrincipalComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'ingresar' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
