import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepService } from './servicios/rep.service';
import { ReppService } from './servicios/repp.service';
import { DinamicReportComponent } from './componentes/dinamic-report/dinamic-report.component';
import { FormsModule } from '@angular/forms';
import { DinamicReportConfiguracionComponent } from './componentes/dinamic-report-configuracion/dinamic-report-configuracion.component';
import { GeneralModule } from '../general/general.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GeneralModule
  ],
  exports: [DinamicReportComponent, DinamicReportConfiguracionComponent],
  declarations: [DinamicReportComponent, DinamicReportConfiguracionComponent],
  providers: [RepService, ReppService]
})
export class ReportesModule { }
