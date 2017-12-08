import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarDireccionComponent } from './generar-direccion.component';

describe('GenerarDireccionComponent', () => {
  let component: GenerarDireccionComponent;
  let fixture: ComponentFixture<GenerarDireccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerarDireccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarDireccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
