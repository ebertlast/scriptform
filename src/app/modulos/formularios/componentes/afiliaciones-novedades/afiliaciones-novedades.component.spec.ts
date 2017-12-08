import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfiliacionesNovedadesComponent } from './afiliaciones-novedades.component';

describe('AfiliacionesNovedadesComponent', () => {
  let component: AfiliacionesNovedadesComponent;
  let fixture: ComponentFixture<AfiliacionesNovedadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfiliacionesNovedadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfiliacionesNovedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
