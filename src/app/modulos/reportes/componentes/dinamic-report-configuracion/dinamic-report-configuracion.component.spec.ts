import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DinamicReportConfiguracionComponent } from './dinamic-report-configuracion.component';

describe('DinamicReportConfiguracionComponent', () => {
  let component: DinamicReportConfiguracionComponent;
  let fixture: ComponentFixture<DinamicReportConfiguracionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DinamicReportConfiguracionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DinamicReportConfiguracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
