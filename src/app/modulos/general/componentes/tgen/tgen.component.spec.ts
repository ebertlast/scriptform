import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TgenComponent } from './tgen.component';

describe('TgenComponent', () => {
  let component: TgenComponent;
  let fixture: ComponentFixture<TgenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TgenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TgenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
