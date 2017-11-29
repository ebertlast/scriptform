import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadicacionesComponent } from './radicaciones.component';

describe('RadicacionesComponent', () => {
  let component: RadicacionesComponent;
  let fixture: ComponentFixture<RadicacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadicacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
