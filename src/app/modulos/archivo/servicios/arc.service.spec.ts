import { TestBed, inject } from '@angular/core/testing';

import { ArcService } from './arc.service';

describe('ArcService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArcService]
    });
  });

  it('should be created', inject([ArcService], (service: ArcService) => {
    expect(service).toBeTruthy();
  }));
});
