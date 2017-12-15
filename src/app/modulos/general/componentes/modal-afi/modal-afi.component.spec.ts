import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAfiComponent } from './modal-afi.component';

describe('ModalAfiComponent', () => {
  let component: ModalAfiComponent;
  let fixture: ComponentFixture<ModalAfiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAfiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAfiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
