import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DinamicReportComponent } from './dinamic-report.component';

describe('DinamicReportComponent', () => {
  let component: DinamicReportComponent;
  let fixture: ComponentFixture<DinamicReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DinamicReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DinamicReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
