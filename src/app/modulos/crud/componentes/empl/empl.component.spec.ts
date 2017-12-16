import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmplComponent } from './empl.component';

describe('EmplComponent', () => {
  let component: EmplComponent;
  let fixture: ComponentFixture<EmplComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmplComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
