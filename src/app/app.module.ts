import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { Helper } from './app-helper';
import { AuthGuard } from './app-authguard';

import { AppComponent } from './app.component';
import { SeguridadModule } from './modulos/seguridad/seguridad.module';
import { EscritorioModule } from './modulos/escritorio/escritorio.module';
import { GeneralModule } from './modulos/general/general.module';
import { ReportesModule } from './modulos/reportes/reportes.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SeguridadModule,
    EscritorioModule,
    GeneralModule,
    ReportesModule
  ],
  providers: [Helper, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
