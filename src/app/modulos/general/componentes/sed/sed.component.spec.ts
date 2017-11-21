import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SedComponent } from './sed.component';

describe('SedComponent', () => {
  let component: SedComponent;
  let fixture: ComponentFixture<SedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
